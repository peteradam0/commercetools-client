import { Category, Product } from '@/domains/products/domain/Product.types'

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Clothing', slug: 'clothing' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden' },
  { id: '4', name: 'Sports', slug: 'sports' },
  { id: '5', name: 'Books', slug: 'books' },
  { id: '6', name: 'Health & Beauty', slug: 'health-beauty' },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description:
      'Premium quality wireless headphones with noise cancellation and 20-hour battery life.',
    price: { amount: 12999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        alt: 'Wireless Bluetooth Headphones',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '1',
    categoryName: 'Electronics',
    rating: { average: 4.5, count: 127 },
    inStock: true,
    sku: 'WBH-001',
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description:
      'Comfortable 100% cotton t-shirt available in multiple colors and sizes.',
    price: { amount: 2499, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        alt: 'Cotton T-Shirt',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '2',
    categoryName: 'Clothing',
    rating: { average: 4.2, count: 89 },
    inStock: true,
    sku: 'CTS-001',
  },
  {
    id: '3',
    name: 'Smartphone Case',
    description:
      'Durable protective case for your smartphone with shock-absorbing corners.',
    price: { amount: 1999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
        alt: 'Smartphone Case',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '1',
    categoryName: 'Electronics',
    rating: { average: 4.0, count: 234 },
    inStock: false,
    sku: 'SPC-001',
  },
  {
    id: '4',
    name: 'Coffee Mug Set',
    description: 'Set of 4 ceramic coffee mugs, dishwasher and microwave safe.',
    price: { amount: 3999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop',
        alt: 'Coffee Mug Set',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '3',
    categoryName: 'Home & Garden',
    rating: { average: 4.7, count: 156 },
    inStock: true,
    sku: 'CMS-001',
  },
  {
    id: '5',
    name: 'Running Shoes',
    description:
      'Lightweight running shoes with advanced cushioning technology.',
    price: { amount: 8999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
        alt: 'Running Shoes',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '4',
    categoryName: 'Sports',
    rating: { average: 4.4, count: 312 },
    inStock: true,
    sku: 'RS-001',
  },
  {
    id: '6',
    name: 'Programming Guide Book',
    description:
      'Comprehensive guide to modern programming practices and design patterns.',
    price: { amount: 4999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
        alt: 'Programming Guide Book',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '5',
    categoryName: 'Books',
    rating: { average: 4.8, count: 67 },
    inStock: true,
    sku: 'PGB-001',
  },
  {
    id: '7',
    name: 'Face Moisturizer',
    description:
      'Hydrating face moisturizer with SPF 30 protection for daily use.',
    price: { amount: 2799, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
        alt: 'Face Moisturizer',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '6',
    categoryName: 'Health & Beauty',
    rating: { average: 4.3, count: 198 },
    inStock: true,
    sku: 'FM-001',
  },
  {
    id: '8',
    name: 'Laptop Stand',
    description:
      'Adjustable aluminum laptop stand for better ergonomics and cooling.',
    price: { amount: 5999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
        alt: 'Laptop Stand',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '1',
    categoryName: 'Electronics',
    rating: { average: 4.6, count: 89 },
    inStock: true,
    sku: 'LS-001',
  },
  {
    id: '9',
    name: 'Yoga Mat',
    description:
      'Non-slip yoga mat with extra thickness for comfort during practice.',
    price: { amount: 3499, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506629905607-b6f77b81d2ed?w=400&h=300&fit=crop',
        alt: 'Yoga Mat',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '4',
    categoryName: 'Sports',
    rating: { average: 4.1, count: 143 },
    inStock: true,
    sku: 'YM-001',
  },
  {
    id: '10',
    name: 'Denim Jeans',
    description:
      'Classic straight-fit denim jeans made from sustainable materials.',
    price: { amount: 6999, currencyCode: 'USD' },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
        alt: 'Denim Jeans',
        width: 400,
        height: 300,
      },
    ],
    categoryId: '2',
    categoryName: 'Clothing',
    rating: { average: 4.2, count: 276 },
    inStock: false,
    sku: 'DJ-001',
  },
]

export const searchSuggestions: string[] = [
  'wireless headphones',
  'bluetooth speaker',
  'running shoes',
  'coffee mug',
  'smartphone case',
  'laptop stand',
  'yoga mat',
  'face moisturizer',
  'programming book',
  'cotton t-shirt',
]
