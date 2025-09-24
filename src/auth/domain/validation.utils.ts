import {
  FieldValidationResult,
  RegistrationFormData,
  ValidationResult,
} from './Registration.types'

export const validateEmail = (email: string): FieldValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' }
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email' }
  }

  return { isValid: true }
}

export const validatePassword = (password: string): FieldValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' }
  }

  return { isValid: true }
}

export const validateRequired = (
  value: string,
  fieldName: string
): FieldValidationResult => {
  if (!value.trim()) {
    return { isValid: false, message: `${fieldName} is required` }
  }

  return { isValid: true }
}

export const validateRegistrationForm = (
  data: RegistrationFormData
): ValidationResult => {
  const errors = []

  const firstNameResult = validateRequired(data.firstName, 'First name')
  if (!firstNameResult.isValid) {
    errors.push({
      field: 'firstName' as const,
      message: firstNameResult.message!,
    })
  }

  const lastNameResult = validateRequired(data.lastName, 'Last name')
  if (!lastNameResult.isValid) {
    errors.push({
      field: 'lastName' as const,
      message: lastNameResult.message!,
    })
  }

  const emailResult = validateEmail(data.email)
  if (!emailResult.isValid) {
    errors.push({ field: 'email' as const, message: emailResult.message! })
  }

  const passwordResult = validatePassword(data.password)
  if (!passwordResult.isValid) {
    errors.push({
      field: 'password' as const,
      message: passwordResult.message!,
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
