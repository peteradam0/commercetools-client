import { CheckoutPageClient } from '@/app/bounded-contexts/checkout/ui/CheckoutPageClient'
import React from 'react'

interface CheckoutPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { lang } = await params

  return <CheckoutPageClient lang={lang} />
}
