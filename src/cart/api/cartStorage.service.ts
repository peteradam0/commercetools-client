'use client'

import { Cart, CartStorageData } from '../domain/Cart.types'

const CART_STORAGE_KEY = 'commercetools_cart'
const STORAGE_EXPIRY_HOURS = 24 * 7 // 7 days

export class CartStorageService {
  static saveCart(cart: Cart): void {
    try {
      const data: CartStorageData = {
        cart,
        timestamp: Date.now(),
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save cart to localStorage:', error)
    }
  }

  static loadCart(): Cart | null {
    try {
      const storedData = localStorage.getItem(CART_STORAGE_KEY)
      if (!storedData) return null

      const data: CartStorageData = JSON.parse(storedData)

      // Check if data has expired
      const isExpired =
        Date.now() - data.timestamp > STORAGE_EXPIRY_HOURS * 60 * 60 * 1000
      if (isExpired) {
        this.clearCart()
        return null
      }

      return data.cart
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
      this.clearCart()
      return null
    }
  }

  static clearCart(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error)
    }
  }

  static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }
}
