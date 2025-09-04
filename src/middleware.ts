import { NextRequest, NextResponse } from 'next/server'

const locales = ['en-US']
const defaultLocale = 'en-US'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return
  }

  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return NextResponse.next()
  }

  const firstSegment = segments[0]

  if (locales.includes(firstSegment)) {
    return NextResponse.next()
  }

  const newUrl = request.nextUrl.clone()
  const restOfPath = segments.slice(1).join('/')
  newUrl.pathname = `/${defaultLocale}${restOfPath ? `/${restOfPath}` : ''}`
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|sitemap.xml|robots.txt).*)'],
}
