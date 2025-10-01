export interface ApiError extends Error {
  status?: number
  code?: string
  details?: unknown
}

export class ApiClientError extends Error implements ApiError {
  status?: number
  code?: string
  details?: unknown

  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: unknown
  ) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export interface ApiResponse<T = unknown> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface PaginatedResponse<T = unknown> {
  results: T[]
  total: number
  offset: number
  limit: number
  count: number
}

// Base API client utility functions
export const apiClient: {
  request: <T = unknown>(
    url: string,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>
  get: <T = unknown>(
    url: string,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>
  post: <T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>
  put: <T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>
  patch: <T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>
  delete: <T = unknown>(
    url: string,
    options?: RequestInit
  ) => Promise<ApiResponse<T>>
} = {
  async request<T = unknown>(
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

  async get<T = unknown>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return apiClient.request<T>(url, { method: 'GET', ...options })
  },

  async post<T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return apiClient.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },

  async put<T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return apiClient.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return apiClient.request<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },

  async delete<T = unknown>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return apiClient.request<T>(url, { method: 'DELETE', ...options })
  },
}
