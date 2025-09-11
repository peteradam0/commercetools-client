'use client'

import { useState, useMemo } from 'react'
import styled from 'styled-components'
import {
  ProductGrid,
  SortOption,
} from '../../../../../domains/products/ui/ProductGrid'
import { ProductSearch } from '../../../../../domains/products/ui/ProductSearch'
import { CategoryFilter } from '../../../../../domains/products/ui/CategoryFilter'
import {
  mockProducts,
  mockCategories,
  searchSuggestions,
} from '../../../../../domains/products/domain/mockData'
import { filterProducts } from '../../../../../domains/products/domain/search.utils'
import { ProductFilters } from '../../../../../domains/products/domain/Product.types'
import { useSearchParams, useRouter } from 'next/navigation'

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const PageHeader = styled.div`
  margin-bottom: 32px;
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
`

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`

const FiltersSection = styled.div`
  margin-bottom: 24px;
`

const FiltersHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 16px;
`

const ClearAllFiltersButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #666;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #007bff;
    color: #007bff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ProductsSection = styled.div`
  margin-top: 24px;
`

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters: ProductFilters = {
    searchQuery: searchQuery.trim(),
    categoryId: selectedCategoryIds[0],
    inStockOnly: false,
  }

  const filteredProducts = useMemo(() => {
    return filterProducts(mockProducts, filters)
  }, [filters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategoryIds(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [categoryId]
      }
    })
  }

  const handleClearCategories = () => {
    setSelectedCategoryIds([])
  }

  const handleClearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategoryIds([])
  }

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId)
    if (product) {
      console.log('Adding to cart:', product.name)
      alert(`Added \"${product.name}\" to cart!`)
    }
  }

  const handleProductClick = (productId: string) => {
    const pathSegments = window.location.pathname.split('/')
    const lang = pathSegments[1] || 'en' // fallback to 'en' if no lang found
    router.push(`/${lang}/products/${productId}`)
  }

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedCategoryIds.length > 0

  const getFilteredSuggestions = (query: string) => {
    if (!query.trim()) return []
    return searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
  }

  const category = searchParams.get('category')

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{category ? category : 'Products'}</PageTitle>
        <PageSubtitle>
          Discover our wide range of products across different categories
        </PageSubtitle>
      </PageHeader>

      <FiltersSection>
        <ProductSearch
          searchQuery={searchQuery}
          onSearch={handleSearch}
          suggestions={getFilteredSuggestions(searchQuery)}
          resultCount={filteredProducts.length}
          loading={false}
        />

        <CategoryFilter
          categories={mockCategories}
          selectedCategoryIds={selectedCategoryIds}
          onCategoryToggle={handleCategoryToggle}
          onClearAll={handleClearCategories}
        />

        {hasActiveFilters && (
          <FiltersHeader>
            <ClearAllFiltersButton onClick={handleClearAllFilters}>
              Clear all filters
            </ClearAllFiltersButton>
          </FiltersHeader>
        )}
      </FiltersSection>

      <ProductsSection>
        <ProductGrid
          products={filteredProducts}
          loading={false}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          emptyStateTitle={
            searchQuery ? 'No products found' : 'No products available'
          }
          emptyStateDescription={
            searchQuery
              ? `No products match your search for \"${searchQuery}\". Try different keywords or browse our categories.`
              : 'There are no products available at the moment.'
          }
        />
      </ProductsSection>
    </PageContainer>
  )
}
