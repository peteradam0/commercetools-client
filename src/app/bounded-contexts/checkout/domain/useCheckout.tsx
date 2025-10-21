'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import {
  BillingAddress,
  CheckoutContextType,
  CheckoutData,
  CheckoutState,
  CheckoutStep,
  OrderResult,
  PaymentInfo,
  ShippingAddress,
  ShippingMethod,
} from './Checkout.types'
import {
  calculateCheckoutSummary,
  createCheckoutSteps,
  createInitialCheckoutData,
  validateCheckoutStep,
} from './checkout.utils'
import { useCart } from '../../cart/domain/useCart'

type CheckoutAction =
  | { type: 'SET_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SET_BILLING_ADDRESS'; payload: BillingAddress }
  | { type: 'SET_SHIPPING_METHOD'; payload: ShippingMethod }
  | { type: 'SET_PAYMENT_INFO'; payload: PaymentInfo }
  | { type: 'UPDATE_CHECKOUT_DATA'; payload: Partial<CheckoutData> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'UPDATE_STEPS'; payload: CheckoutStep[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }

const initialState: CheckoutState = {
  cart: null,
  checkoutData: createInitialCheckoutData(),
  currentStep: 0,
  steps: createCheckoutSteps(),
  summary: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
}

const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        checkoutData: {
          ...state.checkoutData,
          shippingAddress: action.payload,
          billingAddress: state.checkoutData.billingAddress?.sameAsShipping
            ? { ...action.payload, sameAsShipping: true }
            : state.checkoutData.billingAddress,
        },
      }

    case 'SET_BILLING_ADDRESS':
      return {
        ...state,
        checkoutData: {
          ...state.checkoutData,
          billingAddress: action.payload,
        },
      }

    case 'SET_SHIPPING_METHOD':
      return {
        ...state,
        checkoutData: {
          ...state.checkoutData,
          shippingMethod: action.payload,
        },
      }

    case 'SET_PAYMENT_INFO':
      return {
        ...state,
        checkoutData: {
          ...state.checkoutData,
          paymentInfo: action.payload,
        },
      }

    case 'UPDATE_CHECKOUT_DATA':
      return {
        ...state,
        checkoutData: {
          ...state.checkoutData,
          ...action.payload,
        },
      }

    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload }

    case 'UPDATE_STEPS':
      return { ...state, steps: action.payload }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'RESET':
      return {
        ...initialState,
        cart: state.cart,
      }

    default:
      return state
  }
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
)

interface CheckoutProviderProps {
  children: React.ReactNode
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)
  const { cart } = useCart()

  // Update cart and summary when cart changes
  useEffect(() => {
    if (cart) {
      calculateCheckoutSummary(cart, state.checkoutData.shippingMethod?.id)
      dispatch({ type: 'UPDATE_CHECKOUT_DATA', payload: {} })
    }
  }, [cart, state.checkoutData.shippingMethod?.id])

  // Update steps completion status
  useEffect(() => {
    const updatedSteps = state.steps.map((step, index) => ({
      ...step,
      completed: validateCheckoutStep(index, state.checkoutData).isValid,
      current: index === state.currentStep,
    }))

    if (JSON.stringify(updatedSteps) !== JSON.stringify(state.steps)) {
      dispatch({ type: 'UPDATE_STEPS', payload: updatedSteps })
    }
  }, [state.checkoutData, state.currentStep, state.steps])

  const setShippingAddress = useCallback((address: ShippingAddress) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address })
  }, [])

  const setBillingAddress = useCallback((address: BillingAddress) => {
    dispatch({ type: 'SET_BILLING_ADDRESS', payload: address })
  }, [])

  const setShippingMethod = useCallback((method: ShippingMethod) => {
    dispatch({ type: 'SET_SHIPPING_METHOD', payload: method })
  }, [])

  const setPaymentInfo = useCallback((paymentInfo: PaymentInfo) => {
    dispatch({ type: 'SET_PAYMENT_INFO', payload: paymentInfo })
  }, [])

  const updateCheckoutData = useCallback((data: Partial<CheckoutData>) => {
    dispatch({ type: 'UPDATE_CHECKOUT_DATA', payload: data })
  }, [])

  const nextStep = useCallback(() => {
    const validation = validateCheckoutStep(
      state.currentStep,
      state.checkoutData
    )
    if (!validation.isValid) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please complete all required fields',
      })
      return
    }

    if (state.currentStep < state.steps.length - 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 })
      dispatch({ type: 'SET_ERROR', payload: null })
    }
  }, [state.currentStep, state.checkoutData, state.steps.length])

  const previousStep = useCallback(() => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 })
      dispatch({ type: 'SET_ERROR', payload: null })
    }
  }, [state.currentStep])

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < state.steps.length) {
        dispatch({ type: 'SET_CURRENT_STEP', payload: stepIndex })
        dispatch({ type: 'SET_ERROR', payload: null })
      }
    },
    [state.steps.length]
  )

  const submitOrder = useCallback(async (): Promise<OrderResult> => {
    try {
      dispatch({ type: 'SET_SUBMITTING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      // Validate all checkout data
      const validation = validateCheckoutStep(2, state.checkoutData)
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Please complete all required information',
        }
      }

      if (!cart || cart.items.length === 0) {
        return {
          success: false,
          error: 'Your cart is empty',
        }
      }

      // Mock API call - in real app, this would submit to CommerceTools
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock order creation
      const orderId = `ORDER-${Date.now()}`

      return {
        success: true,
        orderId,
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit order'
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false })
    }
  }, [state.checkoutData, cart])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const value: CheckoutContextType = {
    cart,
    checkoutData: state.checkoutData,
    currentStep: state.currentStep,
    steps: state.steps,
    summary: cart
      ? calculateCheckoutSummary(cart, state.checkoutData.shippingMethod?.id)
      : null,
    isLoading: state.isLoading,
    error: state.error,
    isSubmitting: state.isSubmitting,
    setShippingAddress,
    setBillingAddress,
    setShippingMethod,
    setPaymentInfo,
    updateCheckoutData,
    nextStep,
    previousStep,
    goToStep,
    submitOrder,
    reset,
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
