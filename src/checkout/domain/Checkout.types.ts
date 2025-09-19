import { Cart } from '@/cart/domain/Cart.types'
import { Price } from '@/product-listing/domain/Product.types'

export interface ShippingAddress {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  region?: string
  country: string
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping?: boolean
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: Price
  deliveryTime: string
}

export interface PaymentMethod {
  id: string
  type: 'credit_card' | 'paypal' | 'bank_transfer'
  name: string
  icon?: string
}

export interface CreditCardInfo {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
}

export interface PaymentInfo {
  method: PaymentMethod
  creditCard?: CreditCardInfo
}

export interface CheckoutStep {
  id: string
  title: string
  completed: boolean
  current: boolean
}

export interface CheckoutData {
  shippingAddress?: ShippingAddress
  billingAddress?: BillingAddress
  shippingMethod?: ShippingMethod
  paymentInfo?: PaymentInfo
  agreeToTerms: boolean
  subscribeToNewsletter: boolean
}

export interface CheckoutSummary {
  subtotal: Price
  shipping: Price
  tax: Price
  total: Price
}

export interface CheckoutState {
  cart: Cart | null
  checkoutData: CheckoutData
  currentStep: number
  steps: CheckoutStep[]
  summary: CheckoutSummary | null
  isLoading: boolean
  error: string | null
  isSubmitting: boolean
}

export interface CheckoutActions {
  setShippingAddress: (address: ShippingAddress) => void
  setBillingAddress: (address: BillingAddress) => void
  setShippingMethod: (method: ShippingMethod) => void
  setPaymentInfo: (paymentInfo: PaymentInfo) => void
  updateCheckoutData: (data: Partial<CheckoutData>) => void
  nextStep: () => void
  previousStep: () => void
  goToStep: (stepIndex: number) => void
  submitOrder: () => Promise<{
    success: boolean
    orderId?: string
    error?: string
  }>
  reset: () => void
}

export interface CheckoutContextType extends CheckoutState, CheckoutActions {}

export interface OrderResult {
  success: boolean
  orderId?: string
  error?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}
