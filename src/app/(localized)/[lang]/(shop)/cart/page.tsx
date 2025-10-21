import { CartPageClient } from '@/app/bounded-contexts/cart/ui/CartPageClient'
import React from 'react'

interface CartPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function CartPage({ params }: CartPageProps) {
  const { lang } = await params

  return <CartPageClient lang={lang} />
}
