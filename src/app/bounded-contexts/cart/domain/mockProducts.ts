import { Product } from '../../product-listing/domain/Product.types'

export const mockProducts: Record<string, Product> = {
  'product-1': {
    id: 'product-1',
    name: 'Classic Blue Jeans',
    description:
      'Comfortable and durable classic blue jeans made from premium denim.',
    price: {
      amount: 7999, // $79.99 in cents
      currencyCode: 'USD',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
        alt: 'Classic Blue Jeans',
        width: 400,
        height: 400,
      },
    ],
    categoryId: 'pants',
    categoryName: 'Pants',
    rating: {
      average: 4.5,
      count: 128,
    },
    inStock: true,
    sku: 'JEANS-CLASSIC-BLUE-001',
  },
  'product-2': {
    id: 'product-2',
    name: 'White Cotton T-Shirt',
    description: 'Premium 100% cotton t-shirt in classic white.',
    price: {
      amount: 2999, // $29.99 in cents
      currencyCode: 'USD',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        alt: 'White Cotton T-Shirt',
        width: 400,
        height: 400,
      },
    ],
    categoryId: 't-shirts',
    categoryName: 'T-Shirts',
    rating: {
      average: 4.8,
      count: 95,
    },
    inStock: true,
    sku: 'TSHIRT-WHITE-COTTON-001',
  },
  'product-3': {
    id: 'product-3',
    name: 'Black Hoodie',
    description: 'Cozy black hoodie with drawstring hood and front pocket.',
    price: {
      amount: 5999, // $59.99 in cents
      currencyCode: 'USD',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        alt: 'Black Hoodie',
        width: 400,
        height: 400,
      },
    ],
    categoryId: 'hoodies',
    categoryName: 'Hoodies',
    rating: {
      average: 4.6,
      count: 73,
    },
    inStock: true,
    sku: 'HOODIE-BLACK-001',
  },
  'product-4': {
    id: 'product-4',
    name: 'Leather Jacket',
    description:
      'Premium leather jacket with zipper closure and multiple pockets.',
    price: {
      amount: 19999, // $199.99 in cents
      currencyCode: 'USD',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
        alt: 'Leather Jacket',
        width: 400,
        height: 400,
      },
    ],
    categoryId: 'jackets',
    categoryName: 'Jackets',
    rating: {
      average: 4.9,
      count: 42,
    },
    inStock: false,
    sku: 'JACKET-LEATHER-001',
  },
}
