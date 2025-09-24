import { Price, Product } from '@/product-listing/domain/Product.types'

import { Cart, CartItem, CartSummary } from './Cart.types'

const TAX_RATE = 0.08

export const calculateItemTotal = (
  product: Product,
  quantity: number
): Price => {
  return {
    amount: product.price.amount * quantity,
    currencyCode: product.price.currencyCode,
  }
}

export const calculateCartSummary = (items: CartItem[]): CartSummary => {
  const subtotalAmount = items.reduce(
    (total, item) => total + item.totalPrice.amount,
    0
  )
  const taxAmount = Math.round(subtotalAmount * TAX_RATE)
  const totalAmount = subtotalAmount + taxAmount

  const currencyCode =
    items.length > 0 ? items[0].product.price.currencyCode : 'USD'

  return {
    subtotal: { amount: subtotalAmount, currencyCode },
    tax: { amount: taxAmount, currencyCode },
    total: { amount: totalAmount, currencyCode },
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
  }
}

export const createCartItem = (product: Product, quantity = 1): CartItem => {
  const totalPrice = calculateItemTotal(product, quantity)

  return {
    id: `${product.id}-${Date.now()}`,
    product,
    quantity,
    totalPrice,
  }
}

export const updateCartItem = (
  item: CartItem,
  newQuantity: number
): CartItem => {
  const totalPrice = calculateItemTotal(item.product, newQuantity)

  return {
    ...item,
    quantity: newQuantity,
    totalPrice,
  }
}

export const createEmptyCart = (): Cart => {
  return {
    id: `cart-${Date.now()}`,
    items: [],
    summary: {
      subtotal: { amount: 0, currencyCode: 'USD' },
      tax: { amount: 0, currencyCode: 'USD' },
      total: { amount: 0, currencyCode: 'USD' },
      itemCount: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const updateCartSummary = (cart: Cart): Cart => {
  return {
    ...cart,
    summary: calculateCartSummary(cart.items),
    updatedAt: new Date().toISOString(),
  }
}

export const formatPrice = (price: Price): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(price.amount / 100)
}

export const isCartEmpty = (cart: Cart | null): boolean => {
  return !cart || cart.items.length === 0
}

export const getCartItemById = (
  cart: Cart,
  itemId: string
): CartItem | undefined => {
  return cart.items.find(item => item.id === itemId)
}

export const getCartItemByProductId = (
  cart: Cart,
  productId: string
): CartItem | undefined => {
  return cart.items.find(item => item.product.id === productId)
}
