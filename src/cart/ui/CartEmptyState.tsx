'use client'

import { PrimaryButton } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

import { EmptyState } from '@/app/shared/ui/EmptyState'

const EmptyCartContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContinueShoppingButton = styled(PrimaryButton)`
  margin-top: 8px;
`

interface CartEmptyStateProps {
  onContinueShopping: () => void
}

export const CartEmptyState: React.FC<CartEmptyStateProps> = ({
  onContinueShopping,
}) => {
  return (
    <EmptyCartContainer>
      <EmptyState
        icon='🛒'
        title='Your cart is empty'
        description="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
        action={
          <ContinueShoppingButton
            label='Start Shopping'
            onClick={onContinueShopping}
          />
        }
      />
    </EmptyCartContainer>
  )
}
