import { ProductListingPageClient } from '@/product-listing/product-listing-page-client'

import { mockProducts } from '../../../../../product-listing/domain/mockData'

export default function ProductsPage() {
  return <ProductListingPageClient mockProducts={mockProducts} />
}
