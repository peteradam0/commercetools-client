import { ApiClientError } from '@/lib/apiClient'
import { apiRoot } from '@/lib/commercetools'

// Base service class for CommerceTools API interactions
export abstract class BaseService {
  protected apiRoot = apiRoot

  // Handle CommerceTools API errors
  protected handleError(error: unknown): never {
    if (error && typeof error === 'object' && 'body' in error) {
      // CommerceTools API error format
      const errorBody = error.body as {
        statusCode?: number
        message?: string
        errors?: Array<{ code?: string }>
      }
      const { statusCode, message, errors } = errorBody
      throw new ApiClientError(
        message || 'API request failed',
        statusCode,
        errors?.[0]?.code,
        errors
      )
    }

    // Network or other errors
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Request failed'
    throw new ApiClientError(errorMessage, undefined, 'NETWORK_ERROR', error)
  }

  // Execute API request with error handling
  protected async execute<T>(apiCall: () => Promise<{ body: T }>): Promise<T> {
    try {
      const response = await apiCall()
      return response.body
    } catch (error) {
      this.handleError(error)
    }
  }
}
