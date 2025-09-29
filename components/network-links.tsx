'use client'

import { CrossDomainLink } from '@/components/cross-domain-link'

// Link to ArbVault
export function ArbVaultLink({ 
  children, 
  className,
  path = '' 
}: { 
  children: React.ReactNode
  className?: string
  path?: string 
}) {
  return (
    <CrossDomainLink 
      href={`https://arbvault.io${path}${path.includes('?') ? '&' : '?'}aff=dexv`}
      className={className}
      trackingData={{
        link_source: 'dexvolkov',
        link_type: 'to_marketplace'
      }}
    >
      {children}
    </CrossDomainLink>
  )
}

// Link to The AI Kill Switch
export function TheAIKillSwitchLink({ 
  children, 
  className,
  path = '' 
}: { 
  children: React.ReactNode
  className?: string
  path?: string 
}) {
  return (
    <CrossDomainLink 
      href={`https://theaikillswitch.com${path}`}
      className={className}
      trackingData={{
        link_source: 'dexvolkov',
        link_type: 'to_book'
      }}
    >
      {children}
    </CrossDomainLink>
  )
}