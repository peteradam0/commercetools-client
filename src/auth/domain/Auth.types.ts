export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginFormData) => Promise<void>
  logout: () => void
  clearError: () => void
}

export interface LoginFormState {
  data: LoginFormData
  isSubmitting: boolean
  error: string | null
  fieldErrors: Partial<Record<keyof LoginFormData, string>>
}
