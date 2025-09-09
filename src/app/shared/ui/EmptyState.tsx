import React from 'react'
import styled from 'styled-components'

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  min-height: 300px;
`

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`

const EmptyStateTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
`

const EmptyStateDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  max-width: 400px;
  line-height: 1.5;
`

const EmptyStateAction = styled.div`
  margin-top: 16px;
`

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📦',
  title,
  description,
  action,
}) => {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon>{icon}</EmptyStateIcon>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      {description && (
        <EmptyStateDescription>{description}</EmptyStateDescription>
      )}
      {action && <EmptyStateAction>{action}</EmptyStateAction>}
    </EmptyStateContainer>
  )
}
