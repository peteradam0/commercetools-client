'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'

import { isCartEmpty } from '@/cart/domain/cart.utils'
import { useCart } from '@/cart/domain/useCart'
import { CartEmptyState } from '@/cart/ui/CartEmptyState'
import { CartItem } from '@/cart/ui/CartItem'
import { CartLoading } from '@/cart/ui/CartLoading'
import { CartSummary } from '@/cart/ui/CartSummary'

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

const CartHeader = styled.div`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`

const CartTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const CartSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 300px;
    gap: 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const CartItemsSection = styled.section`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
`

const CartItemsHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
`

const CartItemsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
`

const CartItemsList = styled.div`
  padding: 24px;
`

const CartSummarySection = styled.section`
  position: sticky;
  top: 24px;
`

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`

interface CartPageClientProps {
  lang: string
}

export const CartPageClient: React.FC<CartPageClientProps> = ({ lang }) => {
  const router = useRouter()
  const { cart, isLoading, error, updateCartItem, removeFromCart } = useCart()

  const handleContinueShopping = () => {
    router.push(`/${lang}/products`)
  }

  const handleCheckout = () => {
    router.push(`/${lang}/checkout`)
  }

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateCartItem({ itemId, quantity })
    } catch (error) {
      console.error('Failed to update item quantity:', error)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart({ itemId })
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  if (isLoading && !cart) {
    return (
      <CartContainer>
        <CartHeader>
          <CartTitle>Shopping Cart</CartTitle>
          <CartSubtitle>Loading your cart...</CartSubtitle>
        </CartHeader>
        <CartContent>
          <CartLoading />
        </CartContent>
      </CartContainer>
    )
  }

  if (isCartEmpty(cart)) {
    return (
      <CartContainer>
        <CartHeader>
          <CartTitle>Shopping Cart</CartTitle>
          <CartSubtitle>Your cart is currently empty</CartSubtitle>
        </CartHeader>
        <CartEmptyState onContinueShopping={handleContinueShopping} />
      </CartContainer>
    )
  }

  if (!cart) {
    return (
      <CartContainer>
        <CartHeader>
          <CartTitle>Shopping Cart</CartTitle>
          <CartSubtitle>Unable to load cart</CartSubtitle>
        </CartHeader>
        <ErrorMessage>
          Failed to load your cart. Please try refreshing the page.
        </ErrorMessage>
      </CartContainer>
    )
  }

  const itemCountText = cart.summary.itemCount === 1 ? 'item' : 'items'

  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>Shopping Cart</CartTitle>
        <CartSubtitle>
          {cart.summary.itemCount} {itemCountText} in your cart
        </CartSubtitle>
      </CartHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <CartContent>
        <CartItemsSection>
          <CartItemsHeader>
            <CartItemsTitle id='cart-items-title'>
              Items in Your Cart
            </CartItemsTitle>
          </CartItemsHeader>

          <CartItemsList role='list' aria-labelledby='cart-items-title'>
            {cart.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                isUpdating={isLoading}
              />
            ))}
          </CartItemsList>
        </CartItemsSection>

        <CartSummarySection>
          <CartSummary
            summary={cart.summary}
            onContinueShopping={handleContinueShopping}
            onCheckout={handleCheckout}
            isCheckoutDisabled={isLoading}
          />
        </CartSummarySection>
      </CartContent>
    </CartContainer>
  )
}
