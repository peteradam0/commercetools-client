import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div<{
  $columns: number
  $gap: string
  $minWidth: string
}>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.$minWidth}, 1fr)
  );
  gap: ${props => props.$gap};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

interface GridProps {
  children: React.ReactNode
  columns?: number
  gap?: string
  minItemWidth?: string
  className?: string
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 4,
  gap = '24px',
  minItemWidth = '280px',
  className,
}) => {
  return (
    <GridContainer
      $columns={columns}
      $gap={gap}
      $minWidth={minItemWidth}
      className={className}
    >
      {children}
    </GridContainer>
  )
}
