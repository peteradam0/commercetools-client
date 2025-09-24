'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { isCartEmpty } from '@/cart/domain/cart.utils'
import { useCart } from '@/cart/domain/useCart'
import { CheckoutProvider, useCheckout } from '@/checkout/domain/useCheckout'
import { CheckoutSteps } from '@/checkout/ui/CheckoutSteps'
import { OrderReview } from '@/checkout/ui/OrderReview'
import { PaymentForm } from '@/checkout/ui/PaymentForm'
import { ShippingForm } from '@/checkout/ui/ShippingForm'

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`

const CheckoutHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`

const CheckoutTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const CheckoutSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`

const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 16px;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`

const EmptyCartMessage = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 40px 24px;
  text-align: center;
`

const EmptyCartTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`

const EmptyCartText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 24px 0;
`

const BackToShopButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`

const SuccessMessage = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 40px 24px;
  text-align: center;
`

const SuccessIcon = styled.div`
  font-size: 48px;
  color: #28a745;
  margin-bottom: 20px;
`

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`

const SuccessText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 8px 0;
`

const OrderId = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 16px 0 24px 0;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
`

interface CheckoutPageClientProps {
  lang: string
}

const CheckoutPageContent: React.FC<CheckoutPageClientProps> = ({ lang }) => {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const {
    currentStep,
    steps,
    checkoutData,
    summary,
    error,
    isSubmitting,
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
  } = useCheckout()

  const [orderSuccess, setOrderSuccess] = React.useState<{
    success: boolean
    orderId?: string
  } | null>(null)

  useEffect(() => {
    if (isCartEmpty(cart)) {
      router.push(`/${lang}/products`)
    }
  }, [cart, lang, router])

  const handleShippingSubmit = (
    address: typeof checkoutData.shippingAddress
  ) => {
    if (address) {
      setShippingAddress(address)
      nextStep()
    }
  }

  const handlePaymentSubmit = (data: {
    billingAddress: NonNullable<typeof checkoutData.billingAddress>
    shippingMethod: NonNullable<typeof checkoutData.shippingMethod>
    paymentInfo: NonNullable<typeof checkoutData.paymentInfo>
  }) => {
    setBillingAddress(data.billingAddress)
    setShippingMethod(data.shippingMethod)
    setPaymentInfo(data.paymentInfo)
    nextStep()
  }

  const handleOrderSubmit = async (data: {
    agreeToTerms: boolean
    subscribeToNewsletter: boolean
  }) => {
    updateCheckoutData(data)

    const result = await submitOrder()

    if (result.success) {
      setOrderSuccess({
        success: true,
        orderId: result.orderId,
      })
      await clearCart()
      reset()
    }
  }

  const handleBackToShop = () => {
    router.push(`/${lang}/products`)
  }

  const handleBackToCart = () => {
    router.push(`/${lang}/cart`)
  }

  if (isCartEmpty(cart)) {
    return (
      <CheckoutContainer>
        <CheckoutHeader>
          <CheckoutTitle>Checkout</CheckoutTitle>
          <CheckoutSubtitle>Your cart is empty</CheckoutSubtitle>
        </CheckoutHeader>

        <EmptyCartMessage>
          <EmptyCartTitle>No Items in Cart</EmptyCartTitle>
          <EmptyCartText>
            You need to add some items to your cart before you can checkout.
          </EmptyCartText>
          <BackToShopButton onClick={handleBackToShop}>
            Continue Shopping
          </BackToShopButton>
        </EmptyCartMessage>
      </CheckoutContainer>
    )
  }

  if (orderSuccess?.success) {
    return (
      <CheckoutContainer>
        <SuccessMessage>
          <SuccessIcon>✅</SuccessIcon>
          <SuccessTitle>Order Placed Successfully!</SuccessTitle>
          <SuccessText>
            Thank you for your purchase. Your order has been confirmed and will
            be processed shortly.
          </SuccessText>
          <SuccessText>
            You will receive a confirmation email with your order details.
          </SuccessText>
          {orderSuccess.orderId && (
            <OrderId>Order ID: {orderSuccess.orderId}</OrderId>
          )}
          <BackToShopButton onClick={handleBackToShop}>
            Continue Shopping
          </BackToShopButton>
        </SuccessMessage>
      </CheckoutContainer>
    )
  }

  if (!cart || !summary) {
    return (
      <CheckoutContainer>
        <CheckoutHeader>
          <CheckoutTitle>Checkout</CheckoutTitle>
          <CheckoutSubtitle>Loading...</CheckoutSubtitle>
        </CheckoutHeader>
      </CheckoutContainer>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingForm
            initialData={checkoutData.shippingAddress}
            onSubmit={handleShippingSubmit}
            onCancel={handleBackToCart}
            isSubmitting={isSubmitting}
          />
        )

      case 1:
        if (!checkoutData.shippingAddress) {
          goToStep(0)
          return null
        }

        return (
          <PaymentForm
            shippingAddress={checkoutData.shippingAddress}
            initialBillingAddress={checkoutData.billingAddress}
            initialShippingMethod={checkoutData.shippingMethod}
            initialPaymentInfo={checkoutData.paymentInfo}
            onSubmit={handlePaymentSubmit}
            onBack={previousStep}
            isSubmitting={isSubmitting}
          />
        )

      case 2:
        if (
          !checkoutData.shippingAddress ||
          !checkoutData.billingAddress ||
          !summary
        ) {
          goToStep(0)
          return null
        }

        return (
          <OrderReview
            items={cart.items}
            checkoutData={checkoutData}
            summary={summary}
            onSubmit={handleOrderSubmit}
            onBack={previousStep}
            isSubmitting={isSubmitting}
          />
        )

      default:
        return null
    }
  }

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <CheckoutSubtitle>
          Complete your purchase - {cart.summary.itemCount} item
          {cart.summary.itemCount !== 1 ? 's' : ''} in your cart
        </CheckoutSubtitle>
      </CheckoutHeader>

      <CheckoutContent>
        <CheckoutSteps
          steps={steps}
          currentStep={currentStep}
          onStepClick={stepIndex => {
            if (stepIndex < currentStep || steps[stepIndex].completed) {
              goToStep(stepIndex)
            }
          }}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {renderCurrentStep()}
      </CheckoutContent>
    </CheckoutContainer>
  )
}

export const CheckoutPageClient: React.FC<CheckoutPageClientProps> = ({
  lang,
}) => {
  return (
    <CheckoutProvider>
      <CheckoutPageContent lang={lang} />
    </CheckoutProvider>
  )
}
