'use client'

import { PrimaryButton, TextInput } from '@commercetools-frontend/ui-kit'
import React from 'react'
import styled from 'styled-components'

import {
  RegistrationFormData,
  RegistrationFormState,
} from '@/auth/domain/Registration.types'

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const FormField = styled.div`
  margin-bottom: 16px;
`

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`

const GeneralError = styled.div`
  color: #e74c3c;
  background: #fdf2f2;
  border: 1px solid #fecaca;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`

interface RegistrationFormProps {
  formState: RegistrationFormState
  onFieldChange: (field: keyof RegistrationFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formState,
  onFieldChange,
  onSubmit,
}) => {
  const { data, isSubmitting, error, fieldErrors } = formState

  return (
    <FormContainer onSubmit={onSubmit}>
      <h2>Create Account</h2>

      {error && <GeneralError>{error}</GeneralError>}

      <FormField>
        <TextInput
          value={data.firstName}
          onChange={e => onFieldChange('firstName', e.target.value)}
          placeholder='First Name'
          isDisabled={isSubmitting}
        />
        {fieldErrors.firstName && (
          <ErrorMessage>{fieldErrors.firstName}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <TextInput
          value={data.lastName}
          onChange={e => onFieldChange('lastName', e.target.value)}
          placeholder='Last Name'
          isDisabled={isSubmitting}
        />
        {fieldErrors.lastName && (
          <ErrorMessage>{fieldErrors.lastName}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <TextInput
          value={data.email}
          onChange={e => onFieldChange('email', e.target.value)}
          placeholder='Email'
          isDisabled={isSubmitting}
        />
        {fieldErrors.email && <ErrorMessage>{fieldErrors.email}</ErrorMessage>}
      </FormField>

      <FormField>
        <TextInput
          value={data.password}
          onChange={e => onFieldChange('password', e.target.value)}
          placeholder='Password'
          isDisabled={isSubmitting}
        />
        {fieldErrors.password && (
          <ErrorMessage>{fieldErrors.password}</ErrorMessage>
        )}
      </FormField>

      <PrimaryButton
        type='submit'
        isDisabled={isSubmitting}
        label={isSubmitting ? 'Creating Account...' : 'Create Account'}
      />
    </FormContainer>
  )
}
