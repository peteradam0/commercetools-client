import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { SearchInput } from '@/app/shared/ui/SearchInput'
import { debounce } from '@/product-listing/domain/search.utils'

const SearchContainer = styled.div`
  margin-bottom: 24px;
`

const SearchResults = styled.div`
  margin-top: 16px;
`

const SearchSuggestions = styled.div`
  position: relative;
`

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
`

const SuggestionItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`

const SearchStats = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`

interface ProductSearchProps {
  onSearch: (query: string) => void
  searchQuery: string
  suggestions?: string[]
  loading?: boolean
  resultCount?: number
  debounceMs?: number
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onSearch,
  searchQuery,
  suggestions = [],
  loading = false,
  resultCount,
  debounceMs = 300,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query)
    }, debounceMs),
    [onSearch, debounceMs]
  )

  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    if (inputValue !== searchQuery) {
      debouncedSearch(inputValue)
    }
  }, [inputValue, searchQuery, debouncedSearch])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setShowSuggestions(value.length > 0 && suggestions.length > 0)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  const handleSubmit = () => {
    onSearch(inputValue)
    setShowSuggestions(false)
  }

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const handleInputFocus = () => {
    if (inputValue.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <SearchContainer>
      <SearchSuggestions>
        <SearchInput
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          placeholder='Search for products...'
          disabled={loading}
        />
        <div onBlur={handleInputBlur} onFocus={handleInputFocus}>
          {showSuggestions && suggestions.length > 0 && (
            <SuggestionsList>
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </div>
      </SearchSuggestions>

      {searchQuery && (
        <SearchResults>
          <SearchStats>
            {loading
              ? 'Searching...'
              : resultCount !== undefined
                ? `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "${searchQuery}"`
                : null}
          </SearchStats>
        </SearchResults>
      )}
    </SearchContainer>
  )
}
