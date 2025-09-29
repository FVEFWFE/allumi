import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get country from Vercel's geo detection
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country')

  // Redirect Thailand and Netherlands IPs to smartlink
  if (country === 'TH' || country === 'NL') {
    return NextResponse.redirect('https://t.acrsmartcam.com/254877/3664/0?bo=2779,2778,2777,2776,2775&target=domainredirects&po=6533&aff_sub5=SF_006OG000004lmDN')
  }

  return NextResponse.next()
}

// Apply to all routes except API, static files, and Next.js internals
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}