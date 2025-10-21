import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`

const CardContent = styled.div`
  padding: 16px;
`

const CardFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
`

interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  onClick,
  className,
}) => {
  return (
    <CardContainer
      onClick={onClick}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  )
}
