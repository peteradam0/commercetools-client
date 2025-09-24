export interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ValidationError {
  field: keyof RegistrationFormData
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export interface FieldValidationResult {
  isValid: boolean
  message?: string
}

export interface RegistrationFormState {
  data: RegistrationFormData
  isSubmitting: boolean
  error: string | null
  fieldErrors: Partial<Record<keyof RegistrationFormData, string>>
}
