import { PrimaryButton } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

import { Card } from '@/app/shared/ui/Card'
import { Product } from '@/product-listing/domain/Product.types'

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f5f5f5;
`

const ProductInfo = styled.div`
  padding: 16px;
`

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductCategory = styled.span`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
  margin: 8px 0;
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`

const Stars = styled.div`
  color: #ffc107;
`

const StockStatus = styled.span<{ $inStock: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${props => (props.$inStock ? '#28a745' : '#dc3545')};
  margin-bottom: 12px;
  display: block;
`

const AddToCartButton = styled(PrimaryButton)`
  width: 100%;
`

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string) => void
  onClick?: (productId: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
}) => {
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

  const handleCardClick = () => {
    if (onClick) {
      onClick(product.id)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product.id)
  }

  return (
    <Card onClick={handleCardClick}>
      <ProductImage
        src={product.images[0]?.url || '/placeholder-product.jpg'}
        alt={product.images[0]?.alt || product.name}
        onError={e => {
          const target = e.target as HTMLImageElement
          target.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
        }}
      />
      <ProductInfo>
        <ProductCategory>{product.categoryName}</ProductCategory>
        <ProductName>{product.name}</ProductName>

        <ProductRating>
          <Stars>{renderStars(product.rating.average)}</Stars>
          <span>({product.rating.count})</span>
        </ProductRating>

        <ProductPrice>{formatPrice(product.price)}</ProductPrice>

        <StockStatus $inStock={product.inStock}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </StockStatus>

        <AddToCartButton
          onClick={handleAddToCart}
          isDisabled={!product.inStock}
          label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
        />
      </ProductInfo>
    </Card>
  )
}
