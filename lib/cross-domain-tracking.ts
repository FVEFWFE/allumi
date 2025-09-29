/**
 * Cross-Domain Tracking Utility for PostHog
 * 
 * This module handles cross-domain tracking between:
 * - arbvault.io (main domain)
 * - dexvolkov.com
 * - theaikillswitch.com
 * 
 * Privacy-focused implementation that:
 * 1. Uses URL fragments (#) instead of query params to avoid server logs
 * 2. Encrypts tracking data to obscure common ownership
 * 3. Cleans up tracking params immediately after use
 * 4. Uses separate session namespaces per domain
 */

import posthog from 'posthog-js'

// Domain configuration
export const TRACKED_DOMAINS = {
  arbvault: 'arbvault.io',
  dexvolkov: 'dexvolkov.com',
  aikillswitch: 'theaikillswitch.com'
} as const

// Check if current domain is one of our tracked domains
export function getCurrentDomain(): string {
  if (typeof window === 'undefined') return ''
  const hostname = window.location.hostname
  
  // Handle localhost and preview deployments
  if (hostname.includes('localhost') || hostname.includes('vercel.app')) {
    return 'arbvault' // Default to arbvault for dev
  }
  
  // Check which domain we're on
  if (hostname.includes('dexvolkov')) return 'dexvolkov'
  if (hostname.includes('aikillswitch') || hostname.includes('theaikillswitch')) return 'aikillswitch'
  return 'arbvault'
}

// Simple obfuscation for tracking data (not secure, just for privacy from casual inspection)
function obfuscateData(data: string): string {
  // Simple base64 encoding with a twist
  const encoded = btoa(data)
  // Reverse the string and add some noise
  return encoded.split('').reverse().join('') + '_' + Date.now()
}

function deobfuscateData(data: string): string {
  try {
    // Remove timestamp noise
    const parts = data.split('_')
    if (parts.length < 1) return ''
    
    // Reverse back and decode
    const reversed = parts[0].split('').reverse().join('')
    return atob(reversed)
  } catch {
    return ''
  }
}

export interface CrossDomainData {
  distinctId: string
  sessionId: string
  source: string
  timestamp: number
}

/**
 * Generate a cross-domain tracking link
 * Adds tracking parameters to external domain links
 */
export function generateCrossDomainLink(
  targetUrl: string,
  options?: {
    preserveParams?: boolean
    customData?: Record<string, any>
  }
): string {
  // Only add tracking if PostHog is initialized
  if (typeof window === 'undefined' || !posthog) {
    return targetUrl
  }

  try {
    const url = new URL(targetUrl)
    
    // Check if this is one of our tracked domains
    const isTrackedDomain = Object.values(TRACKED_DOMAINS).some(domain => 
      url.hostname.includes(domain)
    )
    
    if (!isTrackedDomain) {
      return targetUrl // Don't track external domains
    }
    
    // Get current tracking data
    const distinctId = posthog.get_distinct_id()
    const sessionId = posthog.get_session_id()
    const sourceDomain = getCurrentDomain()
    
    if (!distinctId || !sessionId) {
      return targetUrl
    }
    
    // Create tracking data object
    const trackingData: CrossDomainData = {
      distinctId,
      sessionId,
      source: sourceDomain,
      timestamp: Date.now()
    }
    
    // Add any custom data
    if (options?.customData) {
      Object.assign(trackingData, options.customData)
    }
    
    // Obfuscate and add to URL fragment
    const obfuscated = obfuscateData(JSON.stringify(trackingData))
    
    // Use fragment (#) instead of query params for privacy
    // Fragments are not sent to the server in HTTP requests
    url.hash = `_td=${obfuscated}`
    
    // Preserve existing params if requested
    if (options?.preserveParams && url.search) {
      // Keep existing query params
    }
    
    return url.toString()
  } catch (error) {
    console.error('[CrossDomainTracking] Error generating link:', error)
    return targetUrl
  }
}

/**
 * Extract and apply cross-domain tracking data
 * Should be called on page load to check for tracking params
 */
export function applyCrossDomainTracking(): void {
  if (typeof window === 'undefined' || !posthog) {
    return
  }
  
  try {
    // Check URL fragment for tracking data
    const hash = window.location.hash
    if (!hash || !hash.includes('_td=')) {
      return
    }
    
    // Extract tracking data
    const match = hash.match(/_td=([^&]+)/)
    if (!match || !match[1]) {
      return
    }
    
    // Deobfuscate data
    const deobfuscated = deobfuscateData(match[1])
    if (!deobfuscated) {
      return
    }
    
    const trackingData: CrossDomainData = JSON.parse(deobfuscated)
    
    // Validate timestamp (max 5 minutes old)
    const maxAge = 5 * 60 * 1000 // 5 minutes
    if (Date.now() - trackingData.timestamp > maxAge) {
      console.log('[CrossDomainTracking] Tracking data expired')
      cleanupTrackingParams()
      return
    }
    
    // Apply tracking data to PostHog
    if (trackingData.distinctId && trackingData.sessionId) {
      // Bootstrap PostHog with the cross-domain data
      // Note: This needs to happen before PostHog init
      console.log('[CrossDomainTracking] Applying cross-domain data from:', trackingData.source)
      
      // Store in sessionStorage for PostHog bootstrap
      sessionStorage.setItem('ph_cross_domain_distinct_id', trackingData.distinctId)
      sessionStorage.setItem('ph_cross_domain_session_id', trackingData.sessionId)
      sessionStorage.setItem('ph_cross_domain_source', trackingData.source)
      
      // Track the cross-domain navigation
      posthog.capture('$cross_domain_navigation', {
        source_domain: trackingData.source,
        target_domain: getCurrentDomain(),
        distinct_id: trackingData.distinctId,
        session_id: trackingData.sessionId
      })
    }
    
    // Clean up the URL to hide tracking params
    cleanupTrackingParams()
    
  } catch (error) {
    console.error('[CrossDomainTracking] Error applying tracking:', error)
    cleanupTrackingParams()
  }
}

/**
 * Remove tracking parameters from URL
 * Cleans up the URL after extracting tracking data
 */
function cleanupTrackingParams(): void {
  if (typeof window === 'undefined') return
  
  try {
    // Remove tracking data from hash
    let hash = window.location.hash
    if (hash && hash.includes('_td=')) {
      hash = hash.replace(/_td=[^&]+(&|$)/, '')
      
      // Update URL without causing a page reload
      const newUrl = window.location.pathname + window.location.search + (hash.length > 1 ? hash : '')
      window.history.replaceState(null, '', newUrl)
    }
  } catch (error) {
    console.error('[CrossDomainTracking] Error cleaning up params:', error)
  }
}

/**
 * Get bootstrap data for PostHog initialization
 * Should be called before PostHog.init()
 */
export function getCrossDomainBootstrap(): {
  distinctID?: string
  sessionID?: string
} | null {
  if (typeof window === 'undefined') return null
  
  const distinctId = sessionStorage.getItem('ph_cross_domain_distinct_id')
  const sessionId = sessionStorage.getItem('ph_cross_domain_session_id')
  
  if (distinctId && sessionId) {
    // Clear after reading to prevent reuse
    sessionStorage.removeItem('ph_cross_domain_distinct_id')
    sessionStorage.removeItem('ph_cross_domain_session_id')
    sessionStorage.removeItem('ph_cross_domain_source')
    
    return {
      distinctID: distinctId,
      sessionID: sessionId
    }
  }
  
  return null
}

/**
 * Enhanced link component props
 */
export interface CrossDomainLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent) => void
  trackingData?: Record<string, any>
}

/**
 * Check if a URL is one of our tracked domains
 */
export function isTrackedDomain(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin)
    return Object.values(TRACKED_DOMAINS).some(domain => 
      urlObj.hostname.includes(domain)
    )
  } catch {
    return false
  }
}

/**
 * Initialize cross-domain tracking
 * Should be called once on app initialization
 */
export function initCrossDomainTracking(): void {
  if (typeof window === 'undefined') return
  
  // Apply any incoming tracking data
  applyCrossDomainTracking()
  
  // Set up automatic link tracking for external domains
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAutoTracking)
  } else {
    setupAutoTracking()
  }
}

/**
 * Automatically add tracking to external domain links
 */
function setupAutoTracking(): void {
  // Listen for clicks on links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const link = target.closest('a')
    
    if (!link || !link.href) return
    
    // Check if this is an external tracked domain
    if (isTrackedDomain(link.href) && !link.href.includes('#_td=')) {
      // Add tracking parameters
      const trackedUrl = generateCrossDomainLink(link.href)
      link.href = trackedUrl
    }
  }, true) // Use capture phase to intercept before other handlers
}
