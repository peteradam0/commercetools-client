'use client'

import Card from '@commercetools-uikit/card'
import PasswordInput from '@commercetools-uikit/password-input'
import PrimaryButton from '@commercetools-uikit/primary-button'
import Spacings from '@commercetools-uikit/spacings'
import Text from '@commercetools-uikit/text'
import TextInput from '@commercetools-uikit/text-input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LoginFormData, LoginFormState } from '../domain/Auth.types'
import { useAuth } from '../domain/AuthContext'
import { validateEmail, validatePassword } from '../domain/validation.utils'

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
`

const FormContainer = styled.div`
  width: 100%;
`

const ErrorText = styled(Text.Detail)`
  color: #e60000;
  margin-top: 0.5rem;
`

const LinkText = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #007acc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginForm: React.FC = () => {
  const { login, error: authError, isLoading, clearError } = useAuth()

  const [formState, setFormState] = useState<LoginFormState>({
    data: {
      email: '',
      password: '',
    },
    isSubmitting: false,
    error: null,
    fieldErrors: {},
  })

  useEffect(() => {
    if (authError) {
      setFormState(prev => ({
        ...prev,
        error: authError,
        isSubmitting: false,
      }))
    }
  }, [authError])

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      fieldErrors: { ...prev.fieldErrors, [field]: '' },
      error: null,
    }))
    clearError()
  }

  const validateField = (field: keyof LoginFormData, value: string) => {
    let validationResult

    if (field === 'email') {
      validationResult = validateEmail(value)
    } else if (field === 'password') {
      validationResult = validatePassword(value)
    }

    if (validationResult && !validationResult.isValid) {
      setFormState(prev => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          [field]: validationResult.message,
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setFormState(prev => ({
      ...prev,
      fieldErrors: {},
      error: null,
      isSubmitting: true,
    }))
    clearError()

    // Validate all fields
    const emailValidation = validateEmail(formState.data.email)
    const passwordValidation = validatePassword(formState.data.password)

    const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}

    if (!emailValidation.isValid) {
      fieldErrors.email = emailValidation.message
    }

    if (!passwordValidation.isValid) {
      fieldErrors.password = passwordValidation.message
    }

    if (Object.keys(fieldErrors).length > 0) {
      setFormState(prev => ({
        ...prev,
        fieldErrors,
        isSubmitting: false,
      }))
      return
    }

    try {
      await login(formState.data)
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
      }))
    }
  }

  return (
    <StyledCard>
      <FormContainer>
        <Spacings.Stack scale='l'>
          <div style={{ textAlign: 'center' }}>
            <Text.Headline as='h1'>Sign In</Text.Headline>
            <Text.Detail tone='secondary'>
              Enter your credentials to access your account
            </Text.Detail>
          </div>

          <form onSubmit={handleSubmit}>
            <Spacings.Stack scale='m'>
              <div>
                <TextInput
                  name='email'
                  placeholder='Enter your email'
                  value={formState.data.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  onBlur={() => validateField('email', formState.data.email)}
                  hasError={!!formState.fieldErrors.email}
                  isRequired
                />
                {formState.fieldErrors.email && (
                  <ErrorText>{formState.fieldErrors.email}</ErrorText>
                )}
              </div>

              <div>
                <PasswordInput
                  name='password'
                  placeholder='Enter your password'
                  value={formState.data.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  onBlur={() =>
                    validateField('password', formState.data.password)
                  }
                  hasError={!!formState.fieldErrors.password}
                  isRequired
                />
                {formState.fieldErrors.password && (
                  <ErrorText>{formState.fieldErrors.password}</ErrorText>
                )}
              </div>

              {(formState.error || authError) && (
                <ErrorText>{formState.error || authError}</ErrorText>
              )}

              <PrimaryButton
                type='submit'
                label={
                  isLoading || formState.isSubmitting
                    ? 'Signing in...'
                    : 'Sign In'
                }
                isDisabled={isLoading || formState.isSubmitting}
                size='big'
                tone='primary'
              />
            </Spacings.Stack>
          </form>

          <LinkText>
            <Text.Detail>
              Don't have an account?{' '}
              <Link href='/en-US/register'>Create one here</Link>
            </Text.Detail>
          </LinkText>
        </Spacings.Stack>
      </FormContainer>
    </StyledCard>
  )
}

export default LoginForm
