import React from 'react'
import styled from 'styled-components'
import { Label, Spacings, designTokens } from '@commercetools-frontend/ui-kit'

const SizeOptionsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const SizeOption = styled.button<{ $selected: boolean; $available: boolean }>`
  padding: 12px 16px;
  border: 2px solid
    ${props => {
      if (!props.$available) return designTokens.colorNeutral60
      return props.$selected
        ? designTokens.colorPrimary
        : designTokens.colorNeutral60
    }};
  background-color: ${props => {
    if (!props.$available) return designTokens.colorNeutral95
    return props.$selected
      ? designTokens.colorPrimary
      : designTokens.colorSurface
  }};
  color: ${props => {
    if (!props.$available) return designTokens.colorNeutral60
    return props.$selected ? designTokens.colorSurface : designTokens.colorSolid
  }};
  border-radius: ${designTokens.borderRadius4};
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => (props.$available ? 'pointer' : 'not-allowed')};
  transition: all 0.2s ease;
  min-width: 44px;
  font-family: inherit;

  &:hover:not(:disabled) {
    border-color: ${designTokens.colorPrimary};
    background-color: ${props =>
      props.$selected
        ? designTokens.colorPrimary
        : designTokens.colorNeutral98};
  }

  &:focus {
    outline: 2px solid ${designTokens.colorPrimary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SizeLabel = styled(Label)`
  font-size: 16px;
  font-weight: 600;
  color: ${designTokens.colorSolid};
`

const RequiredIndicator = styled.span`
  color: ${designTokens.colorError};
  margin-left: 4px;
`

export interface SizeSelectorProps {
  sizes: string[]
  selectedSize?: string
  onSizeChange: (size: string) => void
  unavailableSizes?: string[]
  label?: string
  required?: boolean
  error?: boolean
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
  unavailableSizes = [],
  label = 'Size',
  required = false,
  error = false,
}) => {
  const handleSizeClick = (size: string) => {
    if (unavailableSizes.includes(size)) return
    onSizeChange(size)
  }

  return (
    <Spacings.Stack scale='s'>
      <SizeLabel tone={error ? 'inverted' : undefined}>
        {label}
        {required && <RequiredIndicator>*</RequiredIndicator>}
      </SizeLabel>
      <SizeOptionsContainer>
        {sizes.map(size => {
          const isUnavailable = unavailableSizes.includes(size)
          const isSelected = selectedSize === size

          return (
            <SizeOption
              key={size}
              $selected={isSelected}
              $available={!isUnavailable}
              onClick={() => handleSizeClick(size)}
              disabled={isUnavailable}
              title={
                isUnavailable
                  ? `Size ${size} is unavailable`
                  : `Select size ${size}`
              }
              aria-label={`Size ${size}${isSelected ? ' (selected)' : ''}${isUnavailable ? ' (unavailable)' : ''}`}
              type='button'
            >
              {size}
            </SizeOption>
          )
        })}
      </SizeOptionsContainer>
    </Spacings.Stack>
  )
}
