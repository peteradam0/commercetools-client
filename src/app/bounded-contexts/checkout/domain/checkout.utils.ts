import { Cart } from '../../cart/domain/Cart.types'
import { Price } from '../../product-listing/domain/Product.types'
import {
  BillingAddress,
  CheckoutData,
  CheckoutStep,
  CheckoutSummary,
  CreditCardInfo,
  ShippingAddress,
  ValidationResult,
} from './Checkout.types'

export const createInitialCheckoutData = (): CheckoutData => ({
  agreeToTerms: false,
  subscribeToNewsletter: false,
})

export const createCheckoutSteps = (): CheckoutStep[] => [
  {
    id: 'shipping',
    title: 'Shipping Information',
    completed: false,
    current: true,
  },
  {
    id: 'payment',
    title: 'Payment Information',
    completed: false,
    current: false,
  },
  {
    id: 'review',
    title: 'Review & Place Order',
    completed: false,
    current: false,
  },
]

export const calculateShippingCost = (
  cart: Cart | null,
  shippingMethodId?: string
): Price => {
  if (!cart || !shippingMethodId) {
    return { amount: 0, currencyCode: 'USD' }
  }

  // Mock shipping calculation - in real app, this would call an API
  const shippingCosts: Record<string, number> = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
    free: 0,
  }

  const cost = shippingCosts[shippingMethodId] || 5.99
  return {
    amount: cost,
    currencyCode: 'USD',
  }
}

export const calculateTax = (cart: Cart | null, shipping: Price): Price => {
  if (!cart) {
    return { amount: 0, currencyCode: 'USD' }
  }

  // Mock tax calculation (8% tax rate)
  const taxableAmount = cart.summary.subtotal.amount + shipping.amount
  const taxAmount = taxableAmount * 0.08

  return {
    amount: taxAmount,
    currencyCode: 'USD',
  }
}

export const calculateCheckoutSummary = (
  cart: Cart | null,
  shippingMethodId?: string
): CheckoutSummary => {
  if (!cart) {
    const zero: Price = { amount: 0, currencyCode: 'USD' }
    return {
      subtotal: zero,
      shipping: zero,
      tax: zero,
      total: zero,
    }
  }

  const subtotal = cart.summary.subtotal
  const shipping = calculateShippingCost(cart, shippingMethodId)
  const tax = calculateTax(cart, shipping)
  const totalAmount = subtotal.amount + shipping.amount + tax.amount

  const total: Price = {
    amount: totalAmount,
    currencyCode: 'USD',
  }

  return {
    subtotal,
    shipping,
    tax,
    total,
  }
}

export const validateShippingAddress = (
  address?: ShippingAddress
): ValidationResult => {
  if (!address) {
    return {
      isValid: false,
      errors: { general: 'Shipping address is required' },
    }
  }

  const errors: Record<string, string> = {}

  if (!address.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!address.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (!address.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
    errors.email = 'Invalid email format'
  }

  if (!address.phone?.trim()) {
    errors.phone = 'Phone number is required'
  }

  if (!address.streetName?.trim()) {
    errors.streetName = 'Street name is required'
  }

  if (!address.streetNumber?.trim()) {
    errors.streetNumber = 'Street number is required'
  }

  if (!address.postalCode?.trim()) {
    errors.postalCode = 'Postal code is required'
  }

  if (!address.city?.trim()) {
    errors.city = 'City is required'
  }

  if (!address.country?.trim()) {
    errors.country = 'Country is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateBillingAddress = (
  address?: BillingAddress
): ValidationResult => {
  if (!address) {
    return {
      isValid: false,
      errors: { general: 'Billing address is required' },
    }
  }

  if (address.sameAsShipping) {
    return { isValid: true, errors: {} }
  }

  return validateShippingAddress(address)
}

export const validateCreditCard = (
  creditCard?: CreditCardInfo
): ValidationResult => {
  if (!creditCard) {
    return {
      isValid: false,
      errors: { general: 'Credit card information is required' },
    }
  }

  const errors: Record<string, string> = {}

  if (!creditCard.cardNumber?.trim()) {
    errors.cardNumber = 'Card number is required'
  } else if (!/^\d{16}$/.test(creditCard.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Invalid card number format'
  }

  if (!creditCard.expiryMonth?.trim()) {
    errors.expiryMonth = 'Expiry month is required'
  } else if (!/^(0[1-9]|1[0-2])$/.test(creditCard.expiryMonth)) {
    errors.expiryMonth = 'Invalid month format'
  }

  if (!creditCard.expiryYear?.trim()) {
    errors.expiryYear = 'Expiry year is required'
  } else if (!/^\d{4}$/.test(creditCard.expiryYear)) {
    errors.expiryYear = 'Invalid year format'
  }

  if (!creditCard.cvv?.trim()) {
    errors.cvv = 'CVV is required'
  } else if (!/^\d{3,4}$/.test(creditCard.cvv)) {
    errors.cvv = 'Invalid CVV format'
  }

  if (!creditCard.cardholderName?.trim()) {
    errors.cardholderName = 'Cardholder name is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateCheckoutStep = (
  step: number,
  checkoutData: CheckoutData
): ValidationResult => {
  switch (step) {
    case 0: // Shipping step
      return validateShippingAddress(checkoutData.shippingAddress)

    case 1: {
      // Payment step
      const billingValidation = validateBillingAddress(
        checkoutData.billingAddress
      )
      if (!billingValidation.isValid) {
        return billingValidation
      }

      if (!checkoutData.shippingMethod) {
        return {
          isValid: false,
          errors: { shippingMethod: 'Please select a shipping method' },
        }
      }

      if (!checkoutData.paymentInfo) {
        return {
          isValid: false,
          errors: { paymentMethod: 'Please select a payment method' },
        }
      }

      if (
        checkoutData.paymentInfo.method.type === 'credit_card' &&
        !validateCreditCard(checkoutData.paymentInfo.creditCard).isValid
      ) {
        return validateCreditCard(checkoutData.paymentInfo.creditCard)
      }

      return { isValid: true, errors: {} }
    }

    case 2: // Review step
      if (!checkoutData.agreeToTerms) {
        return {
          isValid: false,
          errors: { terms: 'You must agree to the terms and conditions' },
        }
      }

      return { isValid: true, errors: {} }

    default:
      return { isValid: false, errors: { general: 'Invalid step' } }
  }
}

export const isStepCompleted = (
  step: number,
  checkoutData: CheckoutData
): boolean => {
  return validateCheckoutStep(step, checkoutData).isValid
}

export const getNextIncompleteStep = (checkoutData: CheckoutData): number => {
  for (let i = 0; i < 3; i++) {
    if (!isStepCompleted(i, checkoutData)) {
      return i
    }
  }
  return 2 // All steps completed, return review step
}

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '')
  if (cleaned.length < 4) return cleaned
  const lastFour = cleaned.slice(-4)
  const masked = '*'.repeat(cleaned.length - 4)
  return formatCardNumber(masked + lastFour)
}
