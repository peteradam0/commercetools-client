'use client'

import { PrimaryButton, SecondaryButton } from '@commercetools-frontend/ui-kit'
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  ShippingAddress,
  ValidationResult,
} from '@/checkout/domain/Checkout.types'
import { validateShippingAddress } from '@/checkout/domain/checkout.utils'
import { mockCountries } from '@/checkout/domain/mockData'

const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
`

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #333;
`

const Form = styled.form`
  display: grid;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 8px;
  }
`

type ShippingFormProps = {
  initialData?: ShippingAddress
  onSubmit: (address: ShippingAddress) => void
  onCancel?: () => void
  isSubmitting?: boolean
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ShippingAddress>(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      streetName: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
    }
  )

  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    errors: {},
  })

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear validation errors for this field
    if (validation.errors[field]) {
      setValidation(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: '' },
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationResult = validateShippingAddress(formData)
    setValidation(validationResult)

    if (validationResult.isValid) {
      onSubmit(formData)
    }
  }

  return (
    <FormContainer>
      <FormTitle>Shipping Address</FormTitle>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor='firstName'>First Name *</Label>
            <Input
              id='firstName'
              type='text'
              value={formData.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              $hasError={!!validation.errors.firstName}
              disabled={isSubmitting}
              placeholder='Enter your first name'
            />
            {validation.errors.firstName && (
              <ErrorMessage>{validation.errors.firstName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='lastName'>Last Name *</Label>
            <Input
              id='lastName'
              type='text'
              value={formData.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              $hasError={!!validation.errors.lastName}
              disabled={isSubmitting}
              placeholder='Enter your last name'
            />
            {validation.errors.lastName && (
              <ErrorMessage>{validation.errors.lastName}</ErrorMessage>
            )}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor='email'>Email Address *</Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              $hasError={!!validation.errors.email}
              disabled={isSubmitting}
              placeholder='Enter your email address'
            />
            {validation.errors.email && (
              <ErrorMessage>{validation.errors.email}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='phone'>Phone Number *</Label>
            <Input
              id='phone'
              type='tel'
              value={formData.phone}
              onChange={e => handleChange('phone', e.target.value)}
              $hasError={!!validation.errors.phone}
              disabled={isSubmitting}
              placeholder='Enter your phone number'
            />
            {validation.errors.phone && (
              <ErrorMessage>{validation.errors.phone}</ErrorMessage>
            )}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor='streetName'>Street Name *</Label>
            <Input
              id='streetName'
              type='text'
              value={formData.streetName}
              onChange={e => handleChange('streetName', e.target.value)}
              $hasError={!!validation.errors.streetName}
              disabled={isSubmitting}
              placeholder='Enter street name'
            />
            {validation.errors.streetName && (
              <ErrorMessage>{validation.errors.streetName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='streetNumber'>Street Number *</Label>
            <Input
              id='streetNumber'
              type='text'
              value={formData.streetNumber}
              onChange={e => handleChange('streetNumber', e.target.value)}
              $hasError={!!validation.errors.streetNumber}
              disabled={isSubmitting}
              placeholder='Enter street number'
            />
            {validation.errors.streetNumber && (
              <ErrorMessage>{validation.errors.streetNumber}</ErrorMessage>
            )}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor='city'>City *</Label>
            <Input
              id='city'
              type='text'
              value={formData.city}
              onChange={e => handleChange('city', e.target.value)}
              $hasError={!!validation.errors.city}
              disabled={isSubmitting}
              placeholder='Enter your city'
            />
            {validation.errors.city && (
              <ErrorMessage>{validation.errors.city}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor='postalCode'>Postal Code *</Label>
            <Input
              id='postalCode'
              type='text'
              value={formData.postalCode}
              onChange={e => handleChange('postalCode', e.target.value)}
              $hasError={!!validation.errors.postalCode}
              disabled={isSubmitting}
              placeholder='Enter postal code'
            />
            {validation.errors.postalCode && (
              <ErrorMessage>{validation.errors.postalCode}</ErrorMessage>
            )}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor='region'>State/Region</Label>
            <Input
              id='region'
              type='text'
              value={formData.region}
              onChange={e => handleChange('region', e.target.value)}
              disabled={isSubmitting}
              placeholder='Enter state/region (optional)'
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor='country'>Country *</Label>
            <Select
              id='country'
              value={formData.country}
              onChange={e => handleChange('country', e.target.value)}
              $hasError={!!validation.errors.country}
              disabled={isSubmitting}
            >
              <option value=''>Select a country</option>
              {mockCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Select>
            {validation.errors.country && (
              <ErrorMessage>{validation.errors.country}</ErrorMessage>
            )}
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          {onCancel && (
            <SecondaryButton
              label='Cancel'
              onClick={onCancel}
              isDisabled={isSubmitting}
            />
          )}
          <PrimaryButton
            type='submit'
            label='Continue to Payment'
            isDisabled={isSubmitting}
          />
        </ButtonGroup>
      </Form>
    </FormContainer>
  )
}
