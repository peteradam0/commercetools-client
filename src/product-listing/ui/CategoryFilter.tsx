import React from 'react'
import styled from 'styled-components'

import { FilterChip } from '@/app/shared/ui/FilterChip'
import { Category } from '@/product-listing/domain/Product.types'

const FilterContainer = styled.div`
  margin-bottom: 24px;
`

const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
`

const FilterChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 12px;

  &:hover {
    color: #0056b3;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    text-decoration: none;
  }
`

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const ActiveFiltersCount = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 8px;
`

interface CategoryFilterProps {
  categories: Category[]
  selectedCategoryIds: string[]
  onCategoryToggle: (categoryId: string) => void
  onClearAll: () => void
  loading?: boolean
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryIds,
  onCategoryToggle,
  onClearAll,
  loading = false,
}) => {
  if (categories.length === 0) {
    return null
  }

  const hasActiveFilters = selectedCategoryIds.length > 0

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>Categories</FilterTitle>
        {hasActiveFilters && (
          <>
            <ActiveFiltersCount>
              ({selectedCategoryIds.length} selected)
            </ActiveFiltersCount>
            <ClearAllButton onClick={onClearAll} disabled={loading}>
              Clear all
            </ClearAllButton>
          </>
        )}
      </FilterHeader>

      <FilterChips>
        {categories.map(category => {
          const isActive = selectedCategoryIds.includes(category.id)

          return (
            <FilterChip
              key={category.id}
              label={category.name}
              isActive={isActive}
              onToggle={() => onCategoryToggle(category.id)}
              showRemove={isActive}
              disabled={loading}
            />
          )
        })}
      </FilterChips>
    </FilterContainer>
  )
}
