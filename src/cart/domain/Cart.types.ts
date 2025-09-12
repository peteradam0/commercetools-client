import { Price, Product } from '@/product-listing/domain/Product.types'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  totalPrice: Price
}

export interface CartSummary {
  subtotal: Price
  tax: Price
  total: Price
  itemCount: number
}

export interface Cart {
  id: string
  items: CartItem[]
  summary: CartSummary
  createdAt: string
  updatedAt: string
}

export interface CartState {
  cart: Cart | null
  isLoading: boolean
  error: string | null
}

export interface AddToCartPayload {
  productId: string
  quantity?: number
}

export interface UpdateCartItemPayload {
  itemId: string
  quantity: number
}

export interface RemoveFromCartPayload {
  itemId: string
}

export interface CartActions {
  addToCart: (payload: AddToCartPayload) => Promise<void>
  updateCartItem: (payload: UpdateCartItemPayload) => Promise<void>
  removeFromCart: (payload: RemoveFromCartPayload) => Promise<void>
  clearCart: () => Promise<void>
  loadCart: () => Promise<void>
}

export interface CartContextType extends CartState, CartActions {}

export interface CartStorageData {
  cart: Cart | null
  timestamp: number
}
