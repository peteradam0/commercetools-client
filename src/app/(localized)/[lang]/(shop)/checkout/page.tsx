import React from 'react'

import { CheckoutPageClient } from '@/checkout/ui/CheckoutPageClient'

interface CheckoutPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { lang } = await params

  return <CheckoutPageClient lang={lang} />
}
