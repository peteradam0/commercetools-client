'use client'

import { PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

import { CartSummary as CartSummaryType } from '@/cart/domain/Cart.types'
import { formatPrice } from '@/cart/domain/cart.utils'

const SummaryContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e9ecef;
`

const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #333;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 16px;
    padding-top: 12px;
    border-top: 1px solid #dee2e6;
    font-weight: 600;
    font-size: 18px;
  }
`

const SummaryLabel = styled.span`
  color: #666;
  font-size: 14px;

  &.total {
    color: #333;
    font-weight: 600;
    font-size: 18px;
  }
`

const SummaryValue = styled.span`
  font-weight: 500;
  color: #333;

  &.total {
    color: #007bff;
    font-weight: 700;
    font-size: 20px;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`

const ContinueShoppingButton = styled(SecondaryButton)`
  width: 100%;
`

const CheckoutButton = styled(PrimaryButton)`
  width: 100%;
`

const ItemCount = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`

interface CartSummaryProps {
  summary: CartSummaryType
  onContinueShopping: () => void
  onCheckout: () => void
  isCheckoutDisabled?: boolean
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  summary,
  onContinueShopping,
  onCheckout,
  isCheckoutDisabled = false,
}) => {
  const itemText = summary.itemCount === 1 ? 'item' : 'items'

  return (
    <SummaryContainer role='complementary' aria-label='Order summary'>
      <SummaryTitle id='order-summary-title'>Order Summary</SummaryTitle>

      <ItemCount>
        {summary.itemCount} {itemText} in cart
      </ItemCount>

      <SummaryRow>
        <SummaryLabel>Subtotal</SummaryLabel>
        <SummaryValue>{formatPrice(summary.subtotal)}</SummaryValue>
      </SummaryRow>

      <SummaryRow>
        <SummaryLabel>Tax</SummaryLabel>
        <SummaryValue>{formatPrice(summary.tax)}</SummaryValue>
      </SummaryRow>

      <SummaryRow>
        <SummaryLabel className='total'>Total</SummaryLabel>
        <SummaryValue className='total'>
          {formatPrice(summary.total)}
        </SummaryValue>
      </SummaryRow>

      <ActionContainer>
        <CheckoutButton
          label='Proceed to Checkout'
          onClick={onCheckout}
          isDisabled={isCheckoutDisabled || summary.itemCount === 0}
          aria-describedby='order-summary-title'
        />

        <ContinueShoppingButton
          label='Continue Shopping'
          onClick={onContinueShopping}
        />
      </ActionContainer>
    </SummaryContainer>
  )
}
