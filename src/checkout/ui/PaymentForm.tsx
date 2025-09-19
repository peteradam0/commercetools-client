'use client'

import {
  CheckboxInput,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit'
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  BillingAddress,
  CreditCardInfo,
  PaymentInfo,
  PaymentMethod,
  ShippingAddress,
  ShippingMethod,
  ValidationResult,
} from '../domain/Checkout.types'
import {
  validateBillingAddress,
  validateCreditCard,
} from '../domain/checkout.utils'
import { mockPaymentMethods, mockShippingMethods } from '../domain/mockData'

const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #333;
`

const SectionSubtitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  color: #333;
  padding-top: 24px;
  border-top: 1px solid #e9ecef;

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => (props.$hasError ? '#dc3545' : '#ddd')};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? '#dc3545' : '#007bff')};
  }

  &::placeholder {
    color: #999;
  }
`

const Select = styled.select<{ $hasError?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => (props.$hasError ? '#dc3545' : '#ddd')};
  border-radius: 4px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? '#dc3545' : '#007bff')};
  }
`

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #dc3545;
  margin-top: 4px;
`

const MethodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const MethodCard = styled.div<{ $selected: boolean }>`
  padding: 16px;
  border: 2px solid ${props => (props.$selected ? '#007bff' : '#e9ecef')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => (props.$selected ? '#f8f9ff' : 'white')};

  &:hover {
    border-color: #007bff;
  }
`

const MethodHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

const MethodIcon = styled.span`
  font-size: 20px;
`

const MethodName = styled.span`
  font-weight: 600;
  color: #333;
`

const MethodPrice = styled.span`
  font-size: 14px;
  color: #28a745;
  font-weight: 500;
`

const MethodDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`

const CheckboxContainer = styled.div`
  margin: 16px 0;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`

interface PaymentFormProps {
  shippingAddress: ShippingAddress
  initialBillingAddress?: BillingAddress
  initialShippingMethod?: ShippingMethod
  initialPaymentInfo?: PaymentInfo
  onSubmit: (data: {
    billingAddress: BillingAddress
    shippingMethod: ShippingMethod
    paymentInfo: PaymentInfo
  }) => void
  onBack: () => void
  isSubmitting?: boolean
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  shippingAddress,
  initialBillingAddress,
  initialShippingMethod,
  initialPaymentInfo,
  onSubmit,
  onBack,
  isSubmitting = false,
}) => {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(initialShippingMethod || null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(initialPaymentInfo?.method || null)
  const [sameAsShipping, setSameAsShipping] = useState(
    initialBillingAddress?.sameAsShipping ?? true
  )

  const [billingAddress, setBillingAddress] = useState<BillingAddress>(
    initialBillingAddress || { ...shippingAddress, sameAsShipping: true }
  )

  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>(
    initialPaymentInfo?.creditCard || {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
    }
  )

  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    errors: {},
  })

  const handleBillingAddressChange = (
    field: keyof BillingAddress,
    value: string | boolean
  ) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }))

    if (validation.errors[field]) {
      setValidation(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: '' },
      }))
    }
  }

  const handleCreditCardChange = (
    field: keyof CreditCardInfo,
    value: string
  ) => {
    setCreditCardInfo(prev => ({ ...prev, [field]: value }))

    if (validation.errors[field]) {
      setValidation(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: '' },
      }))
    }
  }

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked)
    if (checked) {
      setBillingAddress({ ...shippingAddress, sameAsShipping: true })
    } else {
      setBillingAddress(prev => ({ ...prev, sameAsShipping: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let errors: Record<string, string> = {}

    // Validate shipping method
    if (!selectedShippingMethod) {
      errors.shippingMethod = 'Please select a shipping method'
    }

    // Validate payment method
    if (!selectedPaymentMethod) {
      errors.paymentMethod = 'Please select a payment method'
    }

    // Validate billing address
    const billingValidation = validateBillingAddress(billingAddress)
    if (!billingValidation.isValid) {
      errors = { ...errors, ...billingValidation.errors }
    }

    // Validate credit card if selected
    if (selectedPaymentMethod?.type === 'credit_card') {
      const cardValidation = validateCreditCard(creditCardInfo)
      if (!cardValidation.isValid) {
        errors = { ...errors, ...cardValidation.errors }
      }
    }

    setValidation({
      isValid: Object.keys(errors).length === 0,
      errors,
    })

    if (
      Object.keys(errors).length === 0 &&
      selectedShippingMethod &&
      selectedPaymentMethod
    ) {
      onSubmit({
        billingAddress,
        shippingMethod: selectedShippingMethod,
        paymentInfo: {
          method: selectedPaymentMethod,
          creditCard:
            selectedPaymentMethod.type === 'credit_card'
              ? creditCardInfo
              : undefined,
        },
      })
    }
  }

  return (
    <FormContainer>
      <SectionTitle>Payment & Shipping</SectionTitle>

      <Form onSubmit={handleSubmit}>
        <SectionSubtitle>Shipping Method</SectionSubtitle>
        {validation.errors.shippingMethod && (
          <ErrorMessage>{validation.errors.shippingMethod}</ErrorMessage>
        )}
        <MethodGrid>
          {mockShippingMethods.map(method => (
            <MethodCard
              key={method.id}
              $selected={selectedShippingMethod?.id === method.id}
              onClick={() => setSelectedShippingMethod(method)}
            >
              <MethodHeader>
                <MethodName>{method.name}</MethodName>
                <MethodPrice>{method.price.formatted}</MethodPrice>
              </MethodHeader>
              <MethodDescription>{method.description}</MethodDescription>
            </MethodCard>
          ))}
        </MethodGrid>

        <SectionSubtitle>Billing Address</SectionSubtitle>
        <CheckboxContainer>
          <CheckboxInput
            isChecked={sameAsShipping}
            onChange={handleSameAsShippingChange}
            isDisabled={isSubmitting}
          >
            Same as shipping address
          </CheckboxInput>
        </CheckboxContainer>

        {!sameAsShipping && (
          <>
            <FormRow>
              <FormGroup>
                <Label htmlFor='billingFirstName'>First Name *</Label>
                <Input
                  id='billingFirstName'
                  type='text'
                  value={billingAddress.firstName}
                  onChange={e =>
                    handleBillingAddressChange('firstName', e.target.value)
                  }
                  $hasError={!!validation.errors.firstName}
                  disabled={isSubmitting}
                />
                {validation.errors.firstName && (
                  <ErrorMessage>{validation.errors.firstName}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor='billingLastName'>Last Name *</Label>
                <Input
                  id='billingLastName'
                  type='text'
                  value={billingAddress.lastName}
                  onChange={e =>
                    handleBillingAddressChange('lastName', e.target.value)
                  }
                  $hasError={!!validation.errors.lastName}
                  disabled={isSubmitting}
                />
                {validation.errors.lastName && (
                  <ErrorMessage>{validation.errors.lastName}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor='billingEmail'>Email *</Label>
                <Input
                  id='billingEmail'
                  type='email'
                  value={billingAddress.email}
                  onChange={e =>
                    handleBillingAddressChange('email', e.target.value)
                  }
                  $hasError={!!validation.errors.email}
                  disabled={isSubmitting}
                />
                {validation.errors.email && (
                  <ErrorMessage>{validation.errors.email}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor='billingCity'>City *</Label>
                <Input
                  id='billingCity'
                  type='text'
                  value={billingAddress.city}
                  onChange={e =>
                    handleBillingAddressChange('city', e.target.value)
                  }
                  $hasError={!!validation.errors.city}
                  disabled={isSubmitting}
                />
                {validation.errors.city && (
                  <ErrorMessage>{validation.errors.city}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>
          </>
        )}

        <SectionSubtitle>Payment Method</SectionSubtitle>
        {validation.errors.paymentMethod && (
          <ErrorMessage>{validation.errors.paymentMethod}</ErrorMessage>
        )}
        <MethodGrid>
          {mockPaymentMethods.map(method => (
            <MethodCard
              key={method.id}
              $selected={selectedPaymentMethod?.id === method.id}
              onClick={() => setSelectedPaymentMethod(method)}
            >
              <MethodHeader>
                <MethodIcon>{method.icon}</MethodIcon>
                <MethodName>{method.name}</MethodName>
              </MethodHeader>
            </MethodCard>
          ))}
        </MethodGrid>

        {selectedPaymentMethod?.type === 'credit_card' && (
          <>
            <FormRow>
              <FormGroup>
                <Label htmlFor='cardNumber'>Card Number *</Label>
                <Input
                  id='cardNumber'
                  type='text'
                  value={creditCardInfo.cardNumber}
                  onChange={e =>
                    handleCreditCardChange('cardNumber', e.target.value)
                  }
                  $hasError={!!validation.errors.cardNumber}
                  disabled={isSubmitting}
                  placeholder='1234 5678 9012 3456'
                  maxLength={19}
                />
                {validation.errors.cardNumber && (
                  <ErrorMessage>{validation.errors.cardNumber}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor='cardholderName'>Cardholder Name *</Label>
                <Input
                  id='cardholderName'
                  type='text'
                  value={creditCardInfo.cardholderName}
                  onChange={e =>
                    handleCreditCardChange('cardholderName', e.target.value)
                  }
                  $hasError={!!validation.errors.cardholderName}
                  disabled={isSubmitting}
                  placeholder='John Doe'
                />
                {validation.errors.cardholderName && (
                  <ErrorMessage>
                    {validation.errors.cardholderName}
                  </ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor='expiryMonth'>Expiry Month *</Label>
                <Select
                  id='expiryMonth'
                  value={creditCardInfo.expiryMonth}
                  onChange={e =>
                    handleCreditCardChange('expiryMonth', e.target.value)
                  }
                  $hasError={!!validation.errors.expiryMonth}
                  disabled={isSubmitting}
                >
                  <option value=''>Month</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, '0')
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    )
                  })}
                </Select>
                {validation.errors.expiryMonth && (
                  <ErrorMessage>{validation.errors.expiryMonth}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor='expiryYear'>Expiry Year *</Label>
                <Select
                  id='expiryYear'
                  value={creditCardInfo.expiryYear}
                  onChange={e =>
                    handleCreditCardChange('expiryYear', e.target.value)
                  }
                  $hasError={!!validation.errors.expiryYear}
                  disabled={isSubmitting}
                >
                  <option value=''>Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = (new Date().getFullYear() + i).toString()
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </Select>
                {validation.errors.expiryYear && (
                  <ErrorMessage>{validation.errors.expiryYear}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor='cvv'>CVV *</Label>
                <Input
                  id='cvv'
                  type='text'
                  value={creditCardInfo.cvv}
                  onChange={e => handleCreditCardChange('cvv', e.target.value)}
                  $hasError={!!validation.errors.cvv}
                  disabled={isSubmitting}
                  placeholder='123'
                  maxLength={4}
                />
                {validation.errors.cvv && (
                  <ErrorMessage>{validation.errors.cvv}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>
          </>
        )}

        <ButtonGroup>
          <SecondaryButton
            label='Back to Shipping'
            onClick={onBack}
            isDisabled={isSubmitting}
          />
          <PrimaryButton
            type='submit'
            label='Review Order'
            isDisabled={isSubmitting}
          />
        </ButtonGroup>
      </Form>
    </FormContainer>
  )
}
