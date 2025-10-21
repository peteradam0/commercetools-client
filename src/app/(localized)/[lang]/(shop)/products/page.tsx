import { mockProducts } from '@/app/bounded-contexts/product-listing/domain/mockData'
import { ProductListingPageClient } from '@/app/bounded-contexts/product-listing/product-listing-page-client'

export default function ProductsPage() {
  return <ProductListingPageClient mockProducts={mockProducts} />
}
