'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { getCrossDomainBootstrap, initCrossDomainTracking } from '@/lib/cross-domain-tracking'

// Initialize PostHog
if (typeof window !== 'undefined') {
  // Using the PostHog key from environment variable
  const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_oUOltiY34o8lPcP7m6zHm7CJME3XjdjbbmYonIMMZ4u'
  
  // Get cross-domain bootstrap data if coming from another domain
  const crossDomainBootstrap = getCrossDomainBootstrap()
  
  posthog.init(POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    bootstrap: crossDomainBootstrap, // Apply cross-domain data if available
    capture_pageview: false, // Manual pageview tracking for Next.js
    capture_pageleave: true,
    autocapture: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        posthog.debug()
      }
    }
  })
  
  // Initialize cross-domain tracking
  initCrossDomainTracking()
  
  console.log('[PostHog] Initialized with cross-domain tracking')
}

// Inner PageView tracking component that uses useSearchParams
function PostHogPageViewInner(): JSX.Element | null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + '?' + searchParams.toString()
      }
      posthog.capture('$pageview', {
        '$current_url': url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// PageView tracking component wrapped in Suspense
export function PostHogPageView(): JSX.Element | null {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  )
}

// Provider component
export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}