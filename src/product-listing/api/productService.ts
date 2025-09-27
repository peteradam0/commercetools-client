import {
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk'

import { BaseService } from '@/lib/baseService'

import {
  Product,
  ProductFilters,
  ProductListResponse,
} from '../domain/Product.types'

export class ProductService extends BaseService {
  // Transform CommerceTools ProductProjection to our Product type
  private transformProduct(ctProduct: ProductProjection): Product {
    const masterVariant = ctProduct.masterVariant
    const firstImage = masterVariant.images?.[0]

    return {
      id: ctProduct.id,
      name:
        ctProduct.name['en'] ||
        ctProduct.name[Object.keys(ctProduct.name)[0]] ||
        'Unnamed Product',
      description:
        ctProduct.description?.['en'] ||
        ctProduct.description?.[Object.keys(ctProduct.description || {})[0]] ||
        '',
      price: {
        amount: masterVariant.prices?.[0]?.value.centAmount || 0,
        currencyCode: masterVariant.prices?.[0]?.value.currencyCode || 'USD',
      },
      images: firstImage
        ? [
            {
              url: firstImage.url,
              alt: firstImage.label || ctProduct.name['en'] || 'Product image',
              width: firstImage.dimensions?.w,
              height: firstImage.dimensions?.h,
            },
          ]
        : [],
      categoryId: ctProduct.categories[0]?.id || '',
      categoryName: '', // We'll need to fetch category separately or include in query
      rating: {
        average: 4.0, // CommerceTools doesn't have built-in ratings
        count: 0,
      },
      inStock: masterVariant.availability?.isOnStock ?? true,
      sku: masterVariant.sku || ctProduct.id,
    }
  }

  // Transform CT response to our format
  private transformProductListResponse(
    ctResponse: ProductProjectionPagedQueryResponse
  ): ProductListResponse {
    return {
      products: ctResponse.results.map(product =>
        this.transformProduct(product)
      ),
      total: ctResponse.total || 0,
      hasMore: ctResponse.offset + ctResponse.count < (ctResponse.total || 0),
    }
  }

  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    let queryArgs: any = {
      limit: 20,
      offset: 0,
    }

    // Apply filters
    const whereConditions: string[] = []

    if (filters?.searchQuery) {
      // Full-text search
      queryArgs['text.en'] = filters.searchQuery
    }

    if (filters?.categoryId) {
      whereConditions.push(`categories(id="${filters.categoryId}")`)
    }

    if (filters?.inStockOnly) {
      whereConditions.push('masterVariant(availability(isOnStock=true))')
    }

    if (filters?.priceRange) {
      const { min, max } = filters.priceRange
      if (min !== undefined) {
        whereConditions.push(
          `masterVariant(prices(value(centAmount >= ${min * 100})))`
        )
      }
      if (max !== undefined) {
        whereConditions.push(
          `masterVariant(prices(value(centAmount <= ${max * 100})))`
        )
      }
    }

    if (whereConditions.length > 0) {
      queryArgs.where = whereConditions
    }

    return this.execute(() =>
      this.apiRoot.productProjections().search().get({ queryArgs })
    ).then(response => this.transformProductListResponse(response))
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const ctProduct = await this.execute(() =>
        this.apiRoot.productProjections().withId({ ID: id }).get()
      )

      return this.transformProduct(ctProduct)
    } catch (error) {
      // If product not found, return null instead of throwing
      if (error instanceof Error && 'status' in error && error.status === 404) {
        return null
      }
      throw error
    }
  }

  async getCategories() {
    return this.execute(() => this.apiRoot.categories().get()).then(response =>
      response.results.map(category => ({
        id: category.id,
        name:
          category.name['en'] ||
          category.name[Object.keys(category.name)[0]] ||
          'Unnamed Category',
        slug:
          category.slug['en'] ||
          category.slug[Object.keys(category.slug)[0]] ||
          category.key ||
          category.id,
      }))
    )
  }
}

export const productService = new ProductService()
