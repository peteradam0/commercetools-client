import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/queryKeys'
import { ProductFilters } from '../domain/Product.types'
import { productService } from './productService'

// React Query hooks
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  })
}

export const useProductSearch = (query: string, filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.search(query, filters),
    queryFn: () =>
      productService.getProducts({ ...filters, searchQuery: query }),
    enabled: query.length > 2,
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.products.categories(),
    queryFn: () => productService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  })
}
