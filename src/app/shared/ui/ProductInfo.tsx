import { Spacings, Text, designTokens } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

import { Product } from '@/domains/products/domain/Product.types'

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Category = styled(Text.Detail)`
  color: ${designTokens.colorNeutral60};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`

const ProductTitle = styled(Text.Headline)`
  color: ${designTokens.colorSolid};
  margin: 0;
  line-height: 1.2;
`

const Price = styled(Text.Headline)`
  color: ${designTokens.colorPrimary};
  margin: 0;
  font-weight: 700;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Stars = styled.span`
  color: #ffc107;
  font-size: 18px;
  line-height: 1;
`

const RatingText = styled(Text.Body)`
  color: ${designTokens.colorNeutral60};
  margin: 0;
`

const Description = styled(Text.Body)`
  color: ${designTokens.colorNeutral40};
  line-height: 1.6;
  margin: 0;
`

const StockStatus = styled(Text.Body)<{ $inStock: boolean }>`
  color: ${props =>
    props.$inStock ? designTokens.colorSuccess : designTokens.colorError};
  font-weight: 500;
  margin: 0;
`

export interface ProductInfoProps {
  product: Product
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const formatPrice = (price: { amount: number; currencyCode: string }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(price.amount / 100)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push('★')
    }
    if (hasHalfStar) {
      stars.push('☆')
    }
    while (stars.length < 5) {
      stars.push('☆')
    }

    return stars.join('')
  }

  return (
    <ProductInfoContainer>
      <Spacings.Stack scale='xs'>
        <Category>{product.categoryName}</Category>
        <ProductTitle as='h1'>{product.name}</ProductTitle>
      </Spacings.Stack>

      <RatingContainer>
        <Stars>{renderStars(product.rating.average)}</Stars>
        <RatingText>({product.rating.count} reviews)</RatingText>
      </RatingContainer>

      <Price>{formatPrice(product.price)}</Price>

      <Description>{product.description}</Description>

      <StockStatus $inStock={product.inStock}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </StockStatus>
    </ProductInfoContainer>
  )
}
