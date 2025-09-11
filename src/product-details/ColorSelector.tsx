import { Label, Spacings } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

const ColorOptionsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const ColorOption = styled.button<{ $color: string; $selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${props => (props.$selected ? '#007bff' : '#ddd')};
  cursor: pointer;
  transition: border-color 0.2s;
  position: relative;
  background: none;
  padding: 0;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${props => props.$color};
  }
`

const ColorLabel = styled(Label)`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`

export interface ColorOption {
  id: string
  name: string
  hex: string
}

export interface ColorSelectorProps {
  colors: ColorOption[]
  selectedColorId: string
  onColorChange: (color: ColorOption) => void
  label?: string
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColorId,
  onColorChange,
  label = 'Color',
}) => {
  const selectedColor = colors.find(color => color.id === selectedColorId)
  const displayLabel = selectedColor ? `${label}: ${selectedColor.name}` : label

  return (
    <Spacings.Stack scale='s'>
      <ColorLabel>{displayLabel}</ColorLabel>
      <ColorOptionsContainer>
        {colors.map(color => (
          <ColorOption
            key={color.id}
            $color={color.hex}
            $selected={selectedColorId === color.id}
            onClick={() => onColorChange(color)}
            title={color.name}
            aria-label={`Select ${color.name} color`}
            type='button'
          />
        ))}
      </ColorOptionsContainer>
    </Spacings.Stack>
  )
}
