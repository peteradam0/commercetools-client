import {
  Product,
  ProductFilters,
  ProductListResponse,
} from '../domain/Product.types'

export class ProductService {
  private baseUrl = '/api'

  private buildQueryString(filters?: ProductFilters): string {
    if (!filters) return ''

    // eslint-disable-next-line no-undef
    const params = new URLSearchParams()

    if (filters.searchQuery) {
      params.append('searchQuery', filters.searchQuery)
    }

    if (filters.categoryId) {
      params.append('categoryId', filters.categoryId)
    }

    if (filters.inStockOnly) {
      params.append('inStockOnly', 'true')
    }

    if (filters.priceRange?.min !== undefined) {
      params.append('minPrice', filters.priceRange.min.toString())
    }

    if (filters.priceRange?.max !== undefined) {
      params.append('maxPrice', filters.priceRange.max.toString())
    }

    const queryString = params.toString()
    return queryString ? `?${queryString}` : ''
  }

  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    const queryString = this.buildQueryString(filters)
    const response = await fetch(`${this.baseUrl}/products${queryString}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    return response.json()
  }

  async getProduct(id: string): Promise<Product | null> {
    const response = await fetch(`${this.baseUrl}/products/${id}`)

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    return response.json()
  }

  async getCategories() {
    const response = await fetch(`${this.baseUrl}/categories`)

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    return response.json()
  }
}

export const productService = new ProductService()
