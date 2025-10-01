export interface Product {
  id: string
  name: string
  description: string
  price: Price
  images: ProductImage[]
  categoryId: string
  categoryName: string
  rating: Rating
  inStock: boolean
  sku: string
}

export interface Price {
  amount: number
  currencyCode: string
}

export interface ProductImage {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Rating {
  average: number
  count: number
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface ProductFilters {
  searchQuery?: string
  categoryId?: string
  priceRange?: {
    min: number
    max: number
  }
  inStockOnly?: boolean
  [key: string]: unknown
}

export interface ProductListResponse {
  products: Product[]
  total: number
  hasMore: boolean
}
