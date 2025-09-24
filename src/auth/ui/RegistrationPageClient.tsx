'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  RegistrationFormData,
  RegistrationFormState,
} from '@/auth/domain/Registration.types'
import { validateRegistrationForm } from '@/auth/domain/validation.utils'
import { RegistrationForm } from '@/auth/ui/RegistrationForm'

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 20px;
`

const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export const RegistrationPageClient: React.FC = () => {
  const router = useRouter()
  const [formState, setFormState] = useState<RegistrationFormState>({
    data: initialFormData,
    isSubmitting: false,
    error: null,
    fieldErrors: {},
  })

  const handleFieldChange = (
    field: keyof RegistrationFormData,
    value: string
  ) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      fieldErrors: {
        ...prev.fieldErrors,
        [field]: undefined,
      },
      error: null,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateRegistrationForm(formState.data)

    if (!validation.isValid) {
      const fieldErrors = validation.errors.reduce(
        (acc, error) => {
          acc[error.field] = error.message
          return acc
        },
        {} as Partial<Record<keyof RegistrationFormData, string>>
      )

      setFormState(prev => ({
        ...prev,
        fieldErrors,
        error: null,
      }))
      return
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
      fieldErrors: {},
    }))

    // For POC, just simulate validation and redirect
    setTimeout(() => {
      alert('Registration successful!')
      router.push('/login')
    }, 1000)
  }

  return (
    <PageContainer>
      <RegistrationForm
        formState={formState}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  )
}
