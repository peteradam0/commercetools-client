import { Product, ProductFilters } from './Product.types'

export const filterProducts = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  let filteredProducts = [...products]

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase().trim()
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query)
    )
  }

  if (filters.categoryId) {
    filteredProducts = filteredProducts.filter(
      product => product.categoryId === filters.categoryId
    )
  }

  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter(
      product =>
        product.price.amount >= filters.priceRange!.min &&
        product.price.amount <= filters.priceRange!.max
    )
  }

  if (filters.inStockOnly) {
    filteredProducts = filteredProducts.filter(product => product.inStock)
  }

  return filteredProducts
}

export const highlightSearchTerm = (
  text: string,
  searchTerm: string
): string => {
  if (!searchTerm) return text

  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
