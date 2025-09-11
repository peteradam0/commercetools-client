import { TextInput } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
`

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSubmit?: () => void
  disabled?: boolean
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search products...',
  onSubmit,
  disabled = false,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit()
    }
  }

  return (
    <SearchContainer>
      <SearchIcon>🔍</SearchIcon>
      <TextInput
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        isDisabled={disabled}
        style={{ paddingLeft: '40px' }}
      />
    </SearchContainer>
  )
}
