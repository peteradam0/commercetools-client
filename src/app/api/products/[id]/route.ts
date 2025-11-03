import { NextRequest, NextResponse } from 'next/server'
import { ProductProjection } from '@commercetools/platform-sdk'

import { apiRoot } from '@/lib/commercetools'
import { Product } from '@/app/bounded-contexts/product-listing/domain/Product.types'

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const response = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute()

    const product = transformProduct(response.body)

    return NextResponse.json(product)
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      if (error.statusCode === 404) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
    }

    console.error('Error fetching product:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch product',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
