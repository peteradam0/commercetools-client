import { NextRequest, NextResponse } from 'next/server'
import {
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk'

import { apiRoot } from '@/lib/commercetools'
import {
  Product,
  ProductFilters,
  ProductListResponse,
} from '@/app/bounded-contexts/product-listing/domain/Product.types'

// Transform CommerceTools ProductProjection to our Product type
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

// Transform CT response to our format
function transformProductListResponse(
  ctResponse: ProductProjectionPagedQueryResponse
): ProductListResponse {
  return {
    products: ctResponse.results.map(product => transformProduct(product)),
    total: ctResponse.total || 0,
    hasMore: ctResponse.offset + ctResponse.count < (ctResponse.total || 0),
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Build filters from query params
    const filters: ProductFilters = {}

    const searchQuery = searchParams.get('searchQuery')
    if (searchQuery) {
      filters.searchQuery = searchQuery
    }

    const categoryId = searchParams.get('categoryId')
    if (categoryId) {
      filters.categoryId = categoryId
    }

    const inStockOnly = searchParams.get('inStockOnly')
    if (inStockOnly === 'true') {
      filters.inStockOnly = true
    }

    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    if (minPrice || maxPrice) {
      filters.priceRange = {
        min: minPrice ? parseFloat(minPrice) : undefined,
        max: maxPrice ? parseFloat(maxPrice) : undefined,
      }
    }

    // Build query args for CommerceTools
    const queryArgs: { [key: string]: string | number | boolean | string[] } = {
      limit: 20,
      offset: 0,
    }

    const whereConditions: string[] = []

    if (filters.categoryId) {
      whereConditions.push(`categories(id="${filters.categoryId}")`)
    }

    if (filters.inStockOnly) {
      whereConditions.push('masterVariant(availability(isOnStock=true))')
    }

    if (filters.priceRange) {
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

    // Note: Full-text search requires the search endpoint
    // For now we'll fetch all and filter client-side for search queries
    // Fetch products from CommerceTools
    const response = await apiRoot
      .productProjections()
      .get({ queryArgs })
      .execute()

    const result = transformProductListResponse(response.body)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
