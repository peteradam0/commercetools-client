'use client'

import { IconButton } from '@commercetools-frontend/ui-kit'
import {
  BinLinearIcon,
  MinimizeIcon,
  PlusBoldIcon,
} from '@commercetools-uikit/icons'
import React, { useState } from 'react'
import styled from 'styled-components'

import { CartItem as CartItemType } from '../domain/Cart.types'
import { formatPrice } from '../domain/cart.utils'

const CartItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:focus-within {
    outline: 2px solid #007bff;
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f5f5f5;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    align-self: center;
  }
`

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ProductCategory = styled.span`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
`

const UnitPrice = styled.span`
  font-size: 14px;
  color: #666;
`

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
`

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`

const QuantityButton = styled(IconButton)`
  min-width: 32px;
  min-height: 32px;
`

const QuantityInput = styled.input`
  width: 60px;
  height: 32px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

const ActionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: space-between;
    margin-top: 12px;
  }
`

const RemoveButton = styled(IconButton)`
  color: #dc3545;

  &:hover {
    background-color: #f8f9fa;
  }
`

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (itemId: string, quantity: number) => Promise<void>
  onRemove: (itemId: string) => Promise<void>
  isUpdating?: boolean
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
}) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantity)
  const [isLocalUpdating, setIsLocalUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity === item.quantity) return

    setIsLocalUpdating(true)
    try {
      await onUpdateQuantity(item.id, newQuantity)
      setLocalQuantity(newQuantity)
    } catch (error) {
      // Reset to previous value on error
      setLocalQuantity(item.quantity)
    } finally {
      setIsLocalUpdating(false)
    }
  }

  const handleIncrement = () => {
    handleQuantityChange(localQuantity + 1)
  }

  const handleDecrement = () => {
    if (localQuantity > 1) {
      handleQuantityChange(localQuantity - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    setLocalQuantity(Math.max(1, value))
  }

  const handleInputBlur = () => {
    if (localQuantity !== item.quantity) {
      handleQuantityChange(localQuantity)
    }
  }

  const handleRemove = async () => {
    setIsLocalUpdating(true)
    try {
      await onRemove(item.id)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setIsLocalUpdating(false)
    }
  }

  const unitPrice = formatPrice(item.product.price)
  const totalPrice = formatPrice(item.totalPrice)

  const isDisabled = isUpdating || isLocalUpdating

  return (
    <CartItemContainer
      role='article'
      aria-label={`${item.product.name} cart item`}
    >
      <ProductImage
        src={item.product.images[0]?.url || '/placeholder-product.jpg'}
        alt={item.product.images[0]?.alt || item.product.name}
        onError={e => {
          const target = e.target as HTMLImageElement
          target.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='
        }}
      />

      <ItemDetails>
        <ProductCategory>{item.product.categoryName}</ProductCategory>
        <ProductName>{item.product.name}</ProductName>

        <QuantityContainer>
          <QuantityButton
            icon={<MinimizeIcon />}
            label='Decrease quantity'
            onClick={handleDecrement}
            isDisabled={isDisabled || localQuantity <= 1}
            size='small'
          />

          <QuantityInput
            type='number'
            min='1'
            value={localQuantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={isDisabled}
            aria-label={`Quantity for ${item.product.name}`}
          />

          <QuantityButton
            icon={<PlusBoldIcon />}
            label='Increase quantity'
            onClick={handleIncrement}
            isDisabled={isDisabled}
            size='small'
          />
        </QuantityContainer>
      </ItemDetails>

      <PriceContainer>
        <UnitPrice>{unitPrice} each</UnitPrice>
        <TotalPrice>{totalPrice}</TotalPrice>

        <ActionContainer>
          <RemoveButton
            icon={<BinLinearIcon />}
            label={`Remove ${item.product.name} from cart`}
            onClick={handleRemove}
            isDisabled={isDisabled}
            size='small'
          />
        </ActionContainer>
      </PriceContainer>
    </CartItemContainer>
  )
}
