import { ColorOption } from '@/product-details/ColorSelector'
import { Category, Product } from '@/product-listing/domain/Product.types'

export const mockCategories: Category[] = [
  { id: '1', name: 'T-Shirts', slug: 't-shirts' },
  { id: '2', name: 'Jeans', slug: 'jeans' },
  { id: '3', name: 'Dresses', slug: 'dresses' },
  { id: '4', name: 'Jackets', slug: 'jackets' },
  { id: '5', name: 'Shoes', slug: 'shoes' },
  { id: '6', name: 'Accessories', slug: 'accessories' },
]

export const getProductVariations = (): {
  colors: ColorOption[]
  sizes: string[]
} => {
  return {
    colors: [
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'white', name: 'White', hex: '#ffffff' },
      { id: 'navy', name: 'Navy', hex: '#001f3f' },
      { id: 'gray', name: 'Gray', hex: '#808080' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }
}

export const getColorImages = (colorId: string, productName: string) => {
  const colorImageMap: Record<string, string[]> = {
    black: ['/clothing-black-1.jpg', '/clothing-black-2.jpg'],
    white: ['/clothing-white-1.jpg', '/clothing-white-2.jpg'],
    navy: ['/clothing-navy-1.jpg', '/clothing-navy-2.jpg'],
    gray: ['/clothing-gray-1.jpg', '/clothing-gray-2.jpg'],
  }

  const urls = colorImageMap[colorId] || []
  return urls.map((url, index) => ({
    url,
    alt: `${productName} ${colorId} ${index + 1}`,
  }))
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description:
      'Comfortable 100% cotton t-shirt available in multiple colors and sizes. Perfect for everyday wear.',
    price: { amount: 2499, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        alt: 'Classic Cotton T-Shirt',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '1',
    categoryName: 'T-Shirts',
    rating: { average: 4.2, count: 89 },
    inStock: true,
    sku: 'CTS-001',
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    description:
      'Classic slim-fit denim jeans made from sustainable materials. Features a modern cut with comfortable stretch.',
    price: { amount: 6999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
        alt: 'Slim Fit Denim Jeans',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '2',
    categoryName: 'Jeans',
    rating: { average: 4.5, count: 276 },
    inStock: true,
    sku: 'SFJ-001',
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    description:
      'Light and airy summer dress with beautiful floral print. Perfect for warm weather and casual occasions.',
    price: { amount: 5499, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop',
        alt: 'Floral Summer Dress',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '3',
    categoryName: 'Dresses',
    rating: { average: 4.7, count: 156 },
    inStock: true,
    sku: 'FSD-001',
  },
  {
    id: '4',
    name: 'Leather Bomber Jacket',
    description:
      'Premium leather bomber jacket with classic styling. Features ribbed cuffs and hem with full zip closure.',
    price: { amount: 18999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
        alt: 'Leather Bomber Jacket',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '4',
    categoryName: 'Jackets',
    rating: { average: 4.8, count: 67 },
    inStock: false,
    sku: 'LBJ-001',
  },
  {
    id: '5',
    name: 'Canvas Sneakers',
    description:
      'Classic canvas sneakers with rubber sole. Comfortable and versatile for everyday wear.',
    price: { amount: 7499, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        alt: 'Canvas Sneakers',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '5',
    categoryName: 'Shoes',
    rating: { average: 4.4, count: 312 },
    inStock: true,
    sku: 'CS-001',
  },
  {
    id: '6',
    name: 'Wool Knit Sweater',
    description:
      'Cozy wool knit sweater perfect for cooler weather. Features a relaxed fit and soft texture.',
    price: { amount: 8999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
        alt: 'Wool Knit Sweater',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '1',
    categoryName: 'T-Shirts',
    rating: { average: 4.6, count: 89 },
    inStock: true,
    sku: 'WKS-001',
  },
  {
    id: '7',
    name: 'Leather Crossbody Bag',
    description:
      'Stylish leather crossbody bag with adjustable strap. Perfect size for essentials with multiple compartments.',
    price: { amount: 12999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        alt: 'Leather Crossbody Bag',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '6',
    categoryName: 'Accessories',
    rating: { average: 4.3, count: 198 },
    inStock: true,
    sku: 'LCB-001',
  },
  {
    id: '8',
    name: 'High-Waisted Wide Leg Jeans',
    description:
      'Trendy high-waisted wide leg jeans with vintage-inspired fit. Made from premium denim with slight stretch.',
    price: { amount: 7999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop',
        alt: 'High-Waisted Wide Leg Jeans',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '2',
    categoryName: 'Jeans',
    rating: { average: 4.7, count: 143 },
    inStock: true,
    sku: 'HWWL-001',
  },
  {
    id: '9',
    name: 'Midi Wrap Dress',
    description:
      'Elegant midi wrap dress perfect for both work and special occasions. Features a flattering silhouette.',
    price: { amount: 6499, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop',
        alt: 'Midi Wrap Dress',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '3',
    categoryName: 'Dresses',
    rating: { average: 4.5, count: 127 },
    inStock: true,
    sku: 'MWD-001',
  },
  {
    id: '10',
    name: 'Ankle Boots',
    description:
      'Versatile ankle boots with block heel. Perfect for transitional seasons and pairs well with jeans or dresses.',
    price: { amount: 11999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
        alt: 'Ankle Boots',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '5',
    categoryName: 'Shoes',
    rating: { average: 4.4, count: 234 },
    inStock: true,
    sku: 'AB-001',
  },
]

export const searchSuggestions: string[] = [
  'cotton t-shirt',
  'denim jeans',
  'summer dress',
  'leather jacket',
  'canvas sneakers',
  'wool sweater',
  'crossbody bag',
  'ankle boots',
  'midi dress',
  'wide leg jeans',
]
