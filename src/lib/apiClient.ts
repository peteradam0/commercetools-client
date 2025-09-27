export interface ApiError extends Error {
  status?: number
  code?: string
  details?: any
}

export class ApiClientError extends Error implements ApiError {
  status?: number
  code?: string
  details?: any

  constructor(message: string, status?: number, code?: string, details?: any) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface PaginatedResponse<T = any> {
  results: T[]
  total: number
  offset: number
  limit: number
  count: number
}

// Base API client utility functions
export const apiClient = {
  async request<T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const responseHeaders: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      if (!response.ok) {
        let errorDetails
        try {
          errorDetails = await response.json()
        } catch {
          // If response is not JSON, use status text
        }

        throw new ApiClientError(
          errorDetails?.message || response.statusText || 'Request failed',
          response.status,
          errorDetails?.code,
          errorDetails
        )
      }

      let data
      try {
        data = await response.json()
      } catch {
        // If response is not JSON, set data to null
        data = null
      }

      return {
        data,
        status: response.status,
        headers: responseHeaders,
      }
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }

      // Network or other errors
      throw new ApiClientError(
        error instanceof Error ? error.message : 'Network error',
        undefined,
        'NETWORK_ERROR',
        error
      )
    }
  },

  async get<T = any>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'GET', ...options })
  },

  async post<T = any>(
    url: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },

  async put<T = any>(
    url: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },

  async patch<T = any>(
    url: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },

  async delete<T = any>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'DELETE', ...options })
  },
}
