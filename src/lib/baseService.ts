import { ApiClientError } from './apiClient'
import { apiRoot } from './commercetools'

// Base service class for CommerceTools API interactions
export abstract class BaseService {
  protected apiRoot = apiRoot

  // Handle CommerceTools API errors
  protected handleError(error: any): never {
    if (error?.body) {
      // CommerceTools API error format
      const { statusCode, message, errors } = error.body
      throw new ApiClientError(
        message || 'API request failed',
        statusCode,
        errors?.[0]?.code,
        errors
      )
    }

    // Network or other errors
    throw new ApiClientError(
      error?.message || 'Request failed',
      undefined,
      'NETWORK_ERROR',
      error
    )
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
