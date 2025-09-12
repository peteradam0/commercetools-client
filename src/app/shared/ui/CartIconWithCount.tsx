'use client'

import { CartIcon } from '@commercetools-uikit/icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'

import { useCart } from '@/cart/domain/useCart'

const CartContainer = styled.div`
  position: relative;
  display: inline-block;
`

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`

const CartBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  padding: 0 4px;
`

export const CartIconWithCount: React.FC = () => {
  const params = useParams()
  const { cart } = useCart()
  const lang = (params?.lang as string) || 'en-US'

  const itemCount = cart?.summary?.itemCount || 0

  return (
    <CartContainer>
      <CartLink
        href={`/${lang}/cart`}
        aria-label={`Cart with ${itemCount} items`}
      >
        <CartIcon />
      </CartLink>
      {itemCount > 0 && (
        <CartBadge aria-hidden='true'>
          {itemCount > 99 ? '99+' : itemCount}
        </CartBadge>
      )}
    </CartContainer>
  )
}
