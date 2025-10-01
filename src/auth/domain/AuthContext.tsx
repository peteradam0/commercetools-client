'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, createContext, useContext, useReducer } from 'react'

import {
  AuthContextType,
  AuthState,
  LoginFormData,
  User,
} from '@/auth/domain/Auth.types'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const router = useRouter()

  const login = async (credentials: LoginFormData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' })

    // Simulate login processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simple validation - in real app this would be handled by server
    if (!credentials.email || !credentials.password) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: 'Email and password are required',
      })
      return
    }

    if (credentials.password.length < 6) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials' })
      return
    }

    // Simulate successful login - create mock user from email
    const [firstName] = credentials.email.split('@')[0].split('.')
    const user: User = {
      id: '1',
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: 'User',
      email: credentials.email,
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: user })

    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user))

    // Redirect to home page after successful login
    router.push('/en-US/home')
  }

  const logout = (): void => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('user')
    router.push('/en-US/home')
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // Initialize user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } catch (_error) {
        console.log(_error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
