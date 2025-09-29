import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get country from Vercel's geo detection
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country')

  // Block Thailand IPs
  if (country === 'TH') {
    return NextResponse.redirect('https://google.com')
  }

  return NextResponse.next()
}

// Apply to all routes except API, static files, and Next.js internals
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}