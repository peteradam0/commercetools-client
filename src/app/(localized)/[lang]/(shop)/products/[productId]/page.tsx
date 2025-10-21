import { notFound } from 'next/navigation'
import React from 'react'

import { ProductDetailsPageClient } from '@/app/bounded-contexts/product-details/product-details-page-client'
import { mockProducts } from '@/app/bounded-contexts/product-listing/domain/mockData'

interface ProductDetailsPageProps {
  params
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = params
  const productData = mockProducts.find(p => p.id === productId)

  if (!productData) {
    notFound()
  }

  return <ProductDetailsPageClient productData={productData} />
}
