'use client'

import {
  CheckboxInput,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit'
import React, { useState } from 'react'
import styled from 'styled-components'

import { CartItem } from '@/cart/domain/Cart.types'

import { CheckoutData, CheckoutSummary } from '../domain/Checkout.types'
import { maskCardNumber } from '../domain/checkout.utils'

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 300px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ReviewSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #333;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
`

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e9ecef;
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #333;
`

const ItemQuantity = styled.span`
  font-size: 14px;
  color: #666;
`

const ItemPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`

const AddressSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const AddressBlock = styled.div``

const AddressTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const AddressText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  color: #666;
`

const InfoSection = styled.div`
  margin-bottom: 20px;
`

const InfoTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InfoText = styled.p`
  font-size: 14px;
  margin: 0;
  color: #666;
`

const PaymentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const PaymentIcon = styled.span`
  font-size: 16px;
`

const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
  position: sticky;
  top: 24px;
`

const SummaryTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #333;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
`

const SummaryRow = styled.div<{ $isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: ${props => (props.$isTotal ? '16px' : '14px')};
  font-weight: ${props => (props.$isTotal ? '600' : '400')};
  color: ${props => (props.$isTotal ? '#333' : '#666')};

  ${props =>
    props.$isTotal &&
    `
    padding-top: 16px;
    border-top: 1px solid #e9ecef;
    margin-top: 16px;
  `}
`

const CheckboxContainer = styled.div`
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid #e9ecef;
`

const CheckboxRow = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`

interface OrderReviewProps {
  items: CartItem[]
  checkoutData: CheckoutData
  summary: CheckoutSummary
  onSubmit: (data: {
    agreeToTerms: boolean
    subscribeToNewsletter: boolean
  }) => void
  onBack: () => void
  isSubmitting?: boolean
}

export const OrderReview: React.FC<OrderReviewProps> = ({
  items,
  checkoutData,
  summary,
  onSubmit,
  onBack,
  isSubmitting = false,
}) => {
  const [agreeToTerms, setAgreeToTerms] = useState(checkoutData.agreeToTerms)
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(
    checkoutData.subscribeToNewsletter
  )

  const handleSubmit = () => {
    if (agreeToTerms) {
      onSubmit({ agreeToTerms, subscribeToNewsletter })
    }
  }

  return (
    <ReviewContainer>
      <div>
        <ReviewSection>
          <SectionTitle>Order Items ({items.length})</SectionTitle>
          <OrderItems>
            {items.map(item => (
              <OrderItem key={item.id}>
                <ItemImage
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  onError={e => {
                    e.currentTarget.src = '/placeholder-product.jpg'
                  }}
                />
                <ItemDetails>
                  <ItemName>{item.product.name}</ItemName>
                  <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                </ItemDetails>
                <ItemPrice>{item.totalPrice.formatted}</ItemPrice>
              </OrderItem>
            ))}
          </OrderItems>
        </ReviewSection>

        <ReviewSection>
          <SectionTitle>Shipping & Billing</SectionTitle>
          <AddressSection>
            <AddressBlock>
              <AddressTitle>Shipping Address</AddressTitle>
              {checkoutData.shippingAddress && (
                <AddressText>
                  {checkoutData.shippingAddress.firstName}{' '}
                  {checkoutData.shippingAddress.lastName}
                  <br />
                  {checkoutData.shippingAddress.streetNumber}{' '}
                  {checkoutData.shippingAddress.streetName}
                  <br />
                  {checkoutData.shippingAddress.city},{' '}
                  {checkoutData.shippingAddress.region}{' '}
                  {checkoutData.shippingAddress.postalCode}
                  <br />
                  {checkoutData.shippingAddress.country}
                </AddressText>
              )}
            </AddressBlock>

            <AddressBlock>
              <AddressTitle>Billing Address</AddressTitle>
              {checkoutData.billingAddress && (
                <AddressText>
                  {checkoutData.billingAddress.sameAsShipping
                    ? 'Same as shipping address'
                    : `${checkoutData.billingAddress.firstName} ${checkoutData.billingAddress.lastName}
                       ${checkoutData.billingAddress.streetNumber} ${checkoutData.billingAddress.streetName}
                       ${checkoutData.billingAddress.city}, ${checkoutData.billingAddress.region} ${checkoutData.billingAddress.postalCode}
                       ${checkoutData.billingAddress.country}`}
                </AddressText>
              )}
            </AddressBlock>
          </AddressSection>
        </ReviewSection>

        <ReviewSection>
          <SectionTitle>Shipping & Payment</SectionTitle>

          <InfoSection>
            <InfoTitle>Shipping Method</InfoTitle>
            {checkoutData.shippingMethod && (
              <InfoText>
                {checkoutData.shippingMethod.name} -{' '}
                {checkoutData.shippingMethod.price.formatted} (
                {checkoutData.shippingMethod.deliveryTime})
              </InfoText>
            )}
          </InfoSection>

          <InfoSection>
            <InfoTitle>Payment Method</InfoTitle>
            {checkoutData.paymentInfo && (
              <PaymentInfo>
                <PaymentIcon>
                  {checkoutData.paymentInfo.method.icon}
                </PaymentIcon>
                <InfoText>
                  {checkoutData.paymentInfo.method.name}
                  {checkoutData.paymentInfo.creditCard && (
                    <span>
                      {' '}
                      ending in{' '}
                      {maskCardNumber(
                        checkoutData.paymentInfo.creditCard.cardNumber
                      ).slice(-4)}
                    </span>
                  )}
                </InfoText>
              </PaymentInfo>
            )}
          </InfoSection>
        </ReviewSection>

        <ReviewSection>
          <CheckboxContainer>
            <CheckboxRow>
              <CheckboxInput
                isChecked={agreeToTerms}
                onChange={setAgreeToTerms}
                isDisabled={isSubmitting}
              >
                I agree to the Terms and Conditions and Privacy Policy *
              </CheckboxInput>
            </CheckboxRow>

            <CheckboxRow>
              <CheckboxInput
                isChecked={subscribeToNewsletter}
                onChange={setSubscribeToNewsletter}
                isDisabled={isSubmitting}
              >
                Subscribe to our newsletter for updates and promotions
              </CheckboxInput>
            </CheckboxRow>
          </CheckboxContainer>

          <ButtonGroup>
            <SecondaryButton
              label='Back to Payment'
              onClick={onBack}
              isDisabled={isSubmitting}
            />
            <PrimaryButton
              label={isSubmitting ? 'Placing Order...' : 'Place Order'}
              onClick={handleSubmit}
              isDisabled={!agreeToTerms || isSubmitting}
            />
          </ButtonGroup>
        </ReviewSection>
      </div>

      <SummaryCard>
        <SummaryTitle>Order Summary</SummaryTitle>

        <SummaryRow>
          <span>Subtotal</span>
          <span>{summary.subtotal.formatted}</span>
        </SummaryRow>

        <SummaryRow>
          <span>Shipping</span>
          <span>{summary.shipping.formatted}</span>
        </SummaryRow>

        <SummaryRow>
          <span>Tax</span>
          <span>{summary.tax.formatted}</span>
        </SummaryRow>

        <SummaryRow $isTotal>
          <span>Total</span>
          <span>{summary.total.formatted}</span>
        </SummaryRow>
      </SummaryCard>
    </ReviewContainer>
  )
}
