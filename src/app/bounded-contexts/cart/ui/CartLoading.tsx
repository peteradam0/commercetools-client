'use client'

import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

const LoadingContainer = styled.div`
  padding: 24px 0;
`

const LoadingItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  animation: ${pulse} 1.5s ease-in-out infinite;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`

const LoadingImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  border-radius: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    align-self: center;
  }
`

const LoadingDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const LoadingLine = styled.div<{ width?: string }>`
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
`

const LoadingPrice = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`

const LoadingSummary = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e9ecef;
  margin-top: 24px;
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LoadingTitle = styled.div`
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 150px;
  margin-bottom: 8px;
`

const LoadingSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LoadingSummaryLabel = styled.div`
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 80px;
`

const LoadingSummaryValue = styled.div`
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 60px;
`

const LoadingButton = styled.div`
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 24px;
`

interface CartLoadingProps {
  itemCount?: number
}

export const CartLoading: React.FC<CartLoadingProps> = ({ itemCount = 3 }) => {
  return (
    <div>
      <LoadingContainer>
        {Array.from({ length: itemCount }).map((_, index) => (
          <LoadingItem key={index}>
            <LoadingImage />
            <LoadingDetails>
              <LoadingLine width='40%' />
              <LoadingLine width='80%' />
              <LoadingLine width='120px' />
            </LoadingDetails>
            <LoadingPrice>
              <LoadingLine width='60px' />
              <LoadingLine width='80px' />
            </LoadingPrice>
          </LoadingItem>
        ))}
      </LoadingContainer>

      <LoadingSummary>
        <LoadingTitle />

        <LoadingSummaryRow>
          <LoadingSummaryLabel />
          <LoadingSummaryValue />
        </LoadingSummaryRow>

        <LoadingSummaryRow>
          <LoadingSummaryLabel />
          <LoadingSummaryValue />
        </LoadingSummaryRow>

        <LoadingSummaryRow>
          <LoadingSummaryLabel />
          <LoadingSummaryValue />
        </LoadingSummaryRow>

        <LoadingButton />
        <LoadingButton />
      </LoadingSummary>
    </div>
  )
}
