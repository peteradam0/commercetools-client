import {
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk'

import { apiRoot } from '@/lib/commercetools'
import { Product, ProductListResponse } from '../domain/Product.types'

function transformProduct(ctProduct: ProductProjection): Product {
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
    categoryName: '',
    rating: {
      average: 4.0,
      count: 0,
    },
    inStock: masterVariant.availability?.isOnStock ?? true,
    sku: masterVariant.sku || ctProduct.id,
  }
}

function transformProductListResponse(
  ctResponse: ProductProjectionPagedQueryResponse
): ProductListResponse {
  return {
    products: ctResponse.results.map(product => transformProduct(product)),
    total: ctResponse.total || 0,
    hasMore: ctResponse.offset + ctResponse.count < (ctResponse.total || 0),
  }
}

export class ProductServiceServer {
  async getProducts(): Promise<ProductListResponse> {
    try {
      const response = await apiRoot
        .productProjections()
        .get({
          queryArgs: {
            limit: 100, // Fetch more products for client-side filtering
            offset: 0,
          },
        })
        .execute()

      return transformProductListResponse(response.body)
    } catch (error) {
      console.error('Error fetching products from CommerceTools:', error)
      throw new Error('Failed to fetch products')
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const response = await apiRoot
        .productProjections()
        .withId({ ID: id })
        .get()
        .execute()

      return transformProduct(response.body)
    } catch (error) {
      if (error && typeof error === 'object' && 'statusCode' in error) {
        if (error.statusCode === 404) {
          return null
        }
      }
      console.error('Error fetching product from CommerceTools:', error)
      throw new Error('Failed to fetch product')
    }
  }

  async getCategories() {
    try {
      const response = await apiRoot.categories().get().execute()

      return response.body.results.map(category => ({
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
    } catch (error) {
      console.error('Error fetching categories from CommerceTools:', error)
      // Return empty array if no categories exist
      return []
    }
  }
}

export const productServiceServer = new ProductServiceServer()
