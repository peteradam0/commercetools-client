import { NextResponse } from 'next/server'

import { apiRoot } from '@/lib/commercetools'

export async function GET() {
  try {
    const response = await apiRoot.categories().get().execute()

    const categories = response.body.results.map(category => ({
      id: category.id,
      name:
        category.name['en'] ||
        category.name[Object.keys(category.name)[0]] ||
        'Unnamed Category',
      slug:
        category.slug['en'] ||
        category.slug[Object.keys(category.slug)[0]] ||
        category.key ||
        category.id,
    }))

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Return empty array if no categories exist instead of error
    return NextResponse.json([])
  }
}
