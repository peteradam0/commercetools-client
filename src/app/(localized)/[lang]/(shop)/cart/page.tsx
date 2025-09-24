import React from 'react'

import { CartPageClient } from '@/cart/ui/CartPageClient'

interface CartPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function CartPage({ params }: CartPageProps) {
  const { lang } = await params

  return <CartPageClient lang={lang} />
}
