export const queryKeys = {
  // Product queries
  products: {
    all: ['products'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.products.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.products.all, 'detail', id] as const,
    search: (query: string, filters?: Record<string, any>) =>
      [...queryKeys.products.all, 'search', query, filters] as const,
    categories: () => [...queryKeys.products.all, 'categories'] as const,
  },

  // Cart queries
  cart: {
    all: ['cart'] as const,
    active: () => [...queryKeys.cart.all, 'active'] as const,
  },

  // Auth queries
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Checkout queries
  checkout: {
    all: ['checkout'] as const,
    shippingMethods: () =>
      [...queryKeys.checkout.all, 'shipping-methods'] as const,
    paymentMethods: () =>
      [...queryKeys.checkout.all, 'payment-methods'] as const,
  },
} as const
