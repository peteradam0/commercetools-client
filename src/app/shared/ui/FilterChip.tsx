import React from 'react'
import styled from 'styled-components'

const ChipContainer = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => (props.$isActive ? '#007bff' : '#ddd')};
  background-color: ${props => (props.$isActive ? '#007bff' : 'white')};
  color: ${props => (props.$isActive ? 'white' : '#333')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    background-color: ${props => (props.$isActive ? '#0056b3' : '#f8f9fa')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const RemoveIcon = styled.span`
  margin-left: 8px;
  font-size: 16px;
  line-height: 1;
`

interface FilterChipProps {
  label: string
  isActive?: boolean
  onToggle: () => void
  showRemove?: boolean
  disabled?: boolean
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive = false,
  onToggle,
  showRemove = false,
  disabled = false,
}) => {
  return (
    <ChipContainer
      $isActive={isActive}
      onClick={onToggle}
      disabled={disabled}
      type='button'
    >
      {label}
      {showRemove && isActive && <RemoveIcon>×</RemoveIcon>}
    </ChipContainer>
  )
}
