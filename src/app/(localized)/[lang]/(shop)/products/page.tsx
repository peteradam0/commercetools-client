import { mockProducts } from '@/product-listing/domain/mockData'
import { ProductListingPageClient } from '@/product-listing/product-listing-page-client'

export default function ProductsPage() {
  return <ProductListingPageClient mockProducts={mockProducts} />
}
