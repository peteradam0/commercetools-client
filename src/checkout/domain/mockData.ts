import { PaymentMethod, ShippingMethod } from './Checkout.types'

export const mockShippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivered in 5-7 business days',
    price: { amount: 5.99, currencyCode: 'USD', formatted: '$5.99' },
    deliveryTime: '5-7 business days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivered in 2-3 business days',
    price: { amount: 12.99, currencyCode: 'USD', formatted: '$12.99' },
    deliveryTime: '2-3 business days',
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Delivered next business day',
    price: { amount: 24.99, currencyCode: 'USD', formatted: '$24.99' },
    deliveryTime: 'Next business day',
  },
  {
    id: 'free',
    name: 'Free Shipping',
    description: 'Delivered in 7-10 business days (orders over $50)',
    price: { amount: 0, currencyCode: 'USD', formatted: 'Free' },
    deliveryTime: '7-10 business days',
  },
]

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    type: 'credit_card',
    name: 'Credit Card',
    icon: '💳',
  },
  {
    id: 'paypal',
    type: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
  },
  {
    id: 'bank_transfer',
    type: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
  },
]

export const mockCountries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'AU', name: 'Australia' },
  { code: 'JP', name: 'Japan' },
]
