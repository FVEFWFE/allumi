/**
 * Example Usage of Cross-Domain Tracking
 * 
 * This file demonstrates how to use the cross-domain tracking components
 * in your DexVolkov.com website.
 */

import { ArbVaultLink, TheAIKillSwitchLink } from '@/components/network-links'
import { CrossDomainLink } from '@/components/cross-domain-link'

export function NavigationExample() {
  return (
    <nav className="flex gap-4">
      {/* Link to ArbVault marketplace */}
      <ArbVaultLink className="text-blue-500 hover:underline">
        Shop on ArbVault
      </ArbVaultLink>
      
      {/* Link to specific product on ArbVault */}
      <ArbVaultLink path="/products/ai-tools" className="text-blue-500 hover:underline">
        Browse AI Tools
      </ArbVaultLink>
      
      {/* Link to The AI Kill Switch book site */}
      <TheAIKillSwitchLink className="text-green-500 hover:underline">
        Get My Book
      </TheAIKillSwitchLink>
      
      {/* Link to specific chapter */}
      <TheAIKillSwitchLink path="/chapter-1" className="text-green-500 hover:underline">
        Read Chapter 1
      </TheAIKillSwitchLink>
    </nav>
  )
}

export function CustomLinkExample() {
  return (
    <div>
      {/* Direct usage of CrossDomainLink for more control */}
      <CrossDomainLink 
        href="https://arbvault.io/special-offer"
        className="btn btn-primary"
        trackingData={{
          link_source: 'dexvolkov',
          link_type: 'special_offer',
          campaign: 'summer_sale'
        }}
      >
        Special Summer Sale
      </CrossDomainLink>
      
      {/* External link (won't have tracking) */}
      <a href="https://google.com" className="text-gray-500">
        External Link (No Tracking)
      </a>
    </div>
  )
}

export function FooterExample() {
  return (
    <footer className="mt-8 p-4 border-t">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold mb-2">Marketplace</h3>
          <ArbVaultLink className="block text-sm text-gray-600 hover:text-gray-900">
            Visit ArbVault
          </ArbVaultLink>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">My Book</h3>
          <TheAIKillSwitchLink className="block text-sm text-gray-600 hover:text-gray-900">
            The AI Kill Switch
          </TheAIKillSwitchLink>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">Connect</h3>
          <CrossDomainLink 
            href="https://arbvault.io/contact"
            className="block text-sm text-gray-600 hover:text-gray-900"
            trackingData={{
              link_source: 'dexvolkov_footer',
              link_type: 'contact'
            }}
          >
            Contact Us
          </CrossDomainLink>
        </div>
      </div>
    </footer>
  )
}