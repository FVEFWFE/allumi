'use client'

import Link from 'next/link'
import React from 'react'

interface EnhancedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  [key: string]: any
}

/**
 * Enhanced Link component that:
 * 1. Opens external links in new tabs
 * 2. Keeps internal navigation in same tab (for better UX)
 * 3. Preserves PostHog tracking
 */
export function EnhancedLink({ href, children, className, onClick, ...props }: EnhancedLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  const isInternalNavigation = href.startsWith('/') || href.startsWith('#')
  
  // For internal navigation, use regular Link behavior
  if (isInternalNavigation) {
    return (
      <Link href={href} className={className} onClick={onClick} {...props}>
        {children}
      </Link>
    )
  }
  
  // For external links, open in new tab
  return (
    <a 
      href={href} 
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  )
}