'use client'

import React from 'react'
import { generateCrossDomainLink, isTrackedDomain, CrossDomainLinkProps } from '@/lib/cross-domain-tracking'

/**
 * CrossDomainLink Component
 * 
 * A link component that automatically adds cross-domain tracking
 * for our tracked domains (dexvolkov.com, theaikillswitch.com, arbvault.io)
 * 
 * Usage:
 * <CrossDomainLink href="https://dexvolkov.com">Visit Dex Volkov</CrossDomainLink>
 */
export function CrossDomainLink({
  href,
  children,
  className,
  target = '_blank',  // Always open in new tab by default
  rel = 'noopener noreferrer',
  onClick,
  trackingData
}: CrossDomainLinkProps) {
  // Generate tracked URL if it's one of our domains
  const trackedHref = React.useMemo(() => {
    if (isTrackedDomain(href)) {
      return generateCrossDomainLink(href, { customData: trackingData })
    }
    return href
  }, [href, trackingData])
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e)
    }
    
    // Log the cross-domain navigation for debugging
    if (isTrackedDomain(href)) {
      console.log('[CrossDomainLink] Navigating to tracked domain:', href)
    }
  }
  
  return (
    <a
      href={trackedHref}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

/**
 * Hook to generate cross-domain URLs programmatically
 */
export function useCrossDomainUrl(url: string, trackingData?: Record<string, any>) {
  return React.useMemo(() => {
    if (isTrackedDomain(url)) {
      return generateCrossDomainLink(url, { customData: trackingData })
    }
    return url
  }, [url, trackingData])
}
