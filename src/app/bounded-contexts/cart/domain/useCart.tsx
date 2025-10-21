'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import {
  AddToCartPayload,
  Cart,
  CartContextType,
  CartState,
  RemoveFromCartPayload,
  UpdateCartItemPayload,
} from './Cart.types'
import {
  createCartItem,
  createEmptyCart,
  getCartItemById,
  getCartItemByProductId,
  updateCartItem as updateCartItemUtil,
  updateCartSummary,
} from './cart.utils'
import { Product } from '../../product-listing/domain/Product.types'
import { CartStorageService } from '../api/cartStorage.service'

type CartAction =
  | { type: 'LOAD_CART_START' }
  | { type: 'LOAD_CART_SUCCESS'; payload: Cart }
  | { type: 'LOAD_CART_ERROR'; payload: string }
  | { type: 'ADD_TO_CART_START' }
  | { type: 'ADD_TO_CART_SUCCESS'; payload: Cart }
  | { type: 'ADD_TO_CART_ERROR'; payload: string }
  | { type: 'UPDATE_CART_START' }
  | { type: 'UPDATE_CART_SUCCESS'; payload: Cart }
  | { type: 'UPDATE_CART_ERROR'; payload: string }
  | { type: 'REMOVE_FROM_CART_START' }
  | { type: 'REMOVE_FROM_CART_SUCCESS'; payload: Cart }
  | { type: 'REMOVE_FROM_CART_ERROR'; payload: string }
  | { type: 'CLEAR_CART_SUCCESS'; payload: Cart }

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART_START':
    case 'ADD_TO_CART_START':
    case 'UPDATE_CART_START':
    case 'REMOVE_FROM_CART_START':
      return { ...state, isLoading: true, error: null }

    case 'LOAD_CART_SUCCESS':
    case 'ADD_TO_CART_SUCCESS':
    case 'UPDATE_CART_SUCCESS':
    case 'REMOVE_FROM_CART_SUCCESS':
    case 'CLEAR_CART_SUCCESS':
      return { ...state, cart: action.payload, isLoading: false, error: null }

    case 'LOAD_CART_ERROR':
    case 'ADD_TO_CART_ERROR':
    case 'UPDATE_CART_ERROR':
    case 'REMOVE_FROM_CART_ERROR':
      return { ...state, isLoading: false, error: action.payload }

    default:
      return state
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const getProductById = useCallback(
    async (productId: string): Promise<Product | null> => {
      const { mockProducts } = await import('./mockProducts')
      return mockProducts['product-' + productId] || null
    },
    []
  )

  const loadCart = useCallback(async () => {
    try {
      dispatch({ type: 'LOAD_CART_START' })

      const savedCart = CartStorageService.loadCart()
      if (savedCart) {
        dispatch({ type: 'LOAD_CART_SUCCESS', payload: savedCart })
      } else {
        const emptyCart = createEmptyCart()
        dispatch({ type: 'LOAD_CART_SUCCESS', payload: emptyCart })
      }
    } catch (_error) {
      console.log(_error)
      dispatch({ type: 'LOAD_CART_ERROR', payload: 'Failed to load cart' })
    }
  }, [])

  const addToCart = useCallback(
    async ({ productId, quantity = 1 }: AddToCartPayload) => {
      try {
        dispatch({ type: 'ADD_TO_CART_START' })

        const product = await getProductById(productId)
        if (!product) {
          throw new Error('Product not found')
        }

        if (!product.inStock) {
          throw new Error('Product is out of stock')
        }

        let updatedCart: Cart
        if (!state.cart) {
          updatedCart = createEmptyCart()
        } else {
          updatedCart = { ...state.cart }
        }

        const existingItem = getCartItemByProductId(updatedCart, productId)

        if (existingItem) {
          const updatedItem = updateCartItemUtil(
            existingItem,
            existingItem.quantity + quantity
          )
          updatedCart.items = updatedCart.items.map(item =>
            item.id === existingItem.id ? updatedItem : item
          )
        } else {
          const newItem = createCartItem(product, quantity)
          updatedCart.items.push(newItem)
        }

        updatedCart = updateCartSummary(updatedCart)
        CartStorageService.saveCart(updatedCart)

        dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: updatedCart })
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to add item to cart'
        dispatch({ type: 'ADD_TO_CART_ERROR', payload: errorMessage })
      }
    },
    [state.cart, getProductById]
  )

  const updateCartItem = useCallback(
    async ({ itemId, quantity }: UpdateCartItemPayload) => {
      try {
        dispatch({ type: 'UPDATE_CART_START' })

        if (!state.cart) {
          throw new Error('No cart found')
        }

        if (quantity < 0) {
          throw new Error('Quantity cannot be negative')
        }

        if (quantity === 0) {
          // Remove item from cart when quantity is 0
          const updatedItems = state.cart.items.filter(
            item => item.id !== itemId
          )
          let updatedCart = {
            ...state.cart,
            items: updatedItems,
          }
          updatedCart = updateCartSummary(updatedCart)
          CartStorageService.saveCart(updatedCart)
          dispatch({ type: 'UPDATE_CART_SUCCESS', payload: updatedCart })
          return
        }

        const existingItem = getCartItemById(state.cart, itemId)
        if (!existingItem) {
          throw new Error('Item not found in cart')
        }

        const updatedItem = updateCartItemUtil(existingItem, quantity)
        let updatedCart = {
          ...state.cart,
          items: state.cart.items.map(item =>
            item.id === itemId ? updatedItem : item
          ),
        }

        updatedCart = updateCartSummary(updatedCart)
        CartStorageService.saveCart(updatedCart)

        dispatch({ type: 'UPDATE_CART_SUCCESS', payload: updatedCart })
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update cart item'
        dispatch({ type: 'UPDATE_CART_ERROR', payload: errorMessage })
      }
    },
    [state.cart]
  )

  const removeFromCart = useCallback(
    async ({ itemId }: RemoveFromCartPayload) => {
      try {
        dispatch({ type: 'REMOVE_FROM_CART_START' })

        if (!state.cart) {
          throw new Error('No cart found')
        }

        let updatedCart = {
          ...state.cart,
          items: state.cart.items.filter(item => item.id !== itemId),
        }

        updatedCart = updateCartSummary(updatedCart)
        CartStorageService.saveCart(updatedCart)

        dispatch({ type: 'REMOVE_FROM_CART_SUCCESS', payload: updatedCart })
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to remove item from cart'
        dispatch({ type: 'REMOVE_FROM_CART_ERROR', payload: errorMessage })
      }
    },
    [state.cart]
  )

  const clearCart = useCallback(async () => {
    try {
      const emptyCart = createEmptyCart()
      CartStorageService.clearCart()
      dispatch({ type: 'CLEAR_CART_SUCCESS', payload: emptyCart })
    } catch (_error) {
      console.log(_error)
      const emptyCart = createEmptyCart()
      dispatch({ type: 'CLEAR_CART_SUCCESS', payload: emptyCart })
    }
  }, [])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  const value: CartContextType = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
