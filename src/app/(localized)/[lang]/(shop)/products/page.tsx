import { productServiceServer } from '@/app/bounded-contexts/product-listing/api/productService.server'
import { ProductListingPageClient } from '@/app/bounded-contexts/product-listing/product-listing-page-client'

export default async function ProductsPage() {
  // Fetch data server-side
  const [productsData, categories] = await Promise.all([
    productServiceServer.getProducts(),
    productServiceServer.getCategories(),
  ])

  return (
    <ProductListingPageClient
      initialProducts={productsData.products}
      initialCategories={categories}
    />
  )
}
