'use client'

import React from 'react'
import styled from 'styled-components'
import { CheckoutStep } from '../domain/Checkout.types'

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
  }
`

const StepsList = styled.ol`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: step-counter;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`

const StepItem = styled.li<{ $completed: boolean; $current: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  counter-increment: step-counter;
  color: ${props =>
    props.$completed ? '#28a745' : props.$current ? '#007bff' : '#6c757d'};

  &:not(:last-child) {
    margin-right: 40px;

    &::after {
      content: '';
      position: absolute;
      top: 15px;
      left: calc(100% + 20px);
      width: 40px;
      height: 2px;
      background: ${props => (props.$completed ? '#28a745' : '#e9ecef')};

      @media (max-width: 640px) {
        display: none;
      }
    }
  }

  @media (max-width: 640px) {
    margin-right: 0;
  }
`

const StepIcon = styled.div<{ $completed: boolean; $current: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;

  background: ${props =>
    props.$completed ? '#28a745' : props.$current ? '#007bff' : '#e9ecef'};
  color: ${props => (props.$completed || props.$current ? 'white' : '#6c757d')};

  ${props =>
    props.$completed &&
    `
    &::before {
      content: '✓';
    }
  `}

  ${props =>
    !props.$completed &&
    `
    &::before {
      content: counter(step-counter);
    }
  `}
`

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const StepTitle = styled.h3<{ $completed: boolean; $current: boolean }>`
  font-size: 14px;
  font-weight: ${props => (props.$current ? '600' : '500')};
  margin: 0;
  color: ${props =>
    props.$completed ? '#28a745' : props.$current ? '#007bff' : '#6c757d'};

  @media (max-width: 640px) {
    text-align: center;
  }
`

interface CheckoutStepsProps {
  steps: CheckoutStep[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <StepsContainer>
      <StepsList>
        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            $completed={step.completed}
            $current={index === currentStep}
            onClick={() => onStepClick?.(index)}
            style={{ cursor: onStepClick ? 'pointer' : 'default' }}
          >
            <StepIcon
              $completed={step.completed}
              $current={index === currentStep}
            />
            <StepContent>
              <StepTitle
                $completed={step.completed}
                $current={index === currentStep}
              >
                {step.title}
              </StepTitle>
            </StepContent>
          </StepItem>
        ))}
      </StepsList>
    </StepsContainer>
  )
}
