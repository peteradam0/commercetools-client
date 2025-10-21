import React from 'react'
import styled from 'styled-components'
import { Product } from '../domain/Product.types'
import { EmptyState } from '../../shared/ui/EmptyState'
import { ProductCard } from './ProductCard'
import { Grid } from '../../shared/ui/Grid'

const GridContainer = styled.div`
  width: 100%;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 16px;
  color: #666;
`

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`

const ResultsCount = styled.span`
  font-size: 14px;
  color: #666;
`

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  onAddToCart: (productId: string) => void
  onProductClick?: (productId: string) => void
  searchQuery?: string
  sortBy?: SortOption
  onSortChange?: (sortBy: SortOption) => void
  emptyStateTitle?: string
  emptyStateDescription?: string
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onAddToCart,
  onProductClick,
  searchQuery,
  sortBy = 'name-asc',
  onSortChange,
  emptyStateTitle = 'No products found',
  emptyStateDescription,
}) => {
  const sortProducts = (
    products: Product[],
    sortOption: SortOption
  ): Product[] => {
    const sorted = [...products]

    switch (sortOption) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return sorted.sort((a, b) => a.price.amount - b.price.amount)
      case 'price-desc':
        return sorted.sort((a, b) => b.price.amount - a.price.amount)
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating.average - a.rating.average)
      default:
        return sorted
    }
  }

  const getEmptyStateDescription = () => {
    if (emptyStateDescription) return emptyStateDescription
    if (searchQuery)
      return `No products found for "${searchQuery}". Try adjusting your search terms.`
    return 'There are no products to display at the moment.'
  }

  const sortedProducts = sortProducts(products, sortBy)

  if (loading) {
    return <LoadingContainer>Loading products...</LoadingContainer>
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon='🔍'
        title={emptyStateTitle}
        description={getEmptyStateDescription()}
      />
    )
  }

  return (
    <GridContainer>
      <ResultsHeader>
        <ResultsCount>
          {products.length} product{products.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
        </ResultsCount>

        {onSortChange && (
          <SortSelect
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortOption)}
          >
            <option value='name-asc'>Name A-Z</option>
            <option value='name-desc'>Name Z-A</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='rating-desc'>Highest Rated</option>
          </SortSelect>
        )}
      </ResultsHeader>

      <Grid minItemWidth='280px' gap='24px'>
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onClick={onProductClick}
          />
        ))}
      </Grid>
    </GridContainer>
  )
}
