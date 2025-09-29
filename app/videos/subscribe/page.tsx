'use client'

import { useEffect } from 'react'

export default function SubscribePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('subscription_page_viewed', {
        price: 399,
        status: 'membership_full'
      })
    }
  }, [])

  const benefits = [
    "Access to 20+ Premium Videos",
    "Monthly Strategy Updates",
    "GPU Arbitrage Playbook",
    "Private Discord Community",
    "Direct Access to Dex",
    "Early Access to New Content"
  ]

  const videoTitles = [
    "The Goldman Exit Strategy: Why I Left a $400k Job",
    "GPU Arbitrage Fundamentals: Finding 10x Opportunities",
    "The Thailand Setup: Building a Remote Trading Empire",
    "Bitcoin Maximalism: Why Everything Else is Noise",
    "AI Risk Assessment: Trading the Apocalypse",
    "Dark Pool Strategies for GPU Markets",
    "The Philosophy of Profit: Nietzsche Meets Wall Street",
    "Advanced Arbitrage: Cross-Border GPU Flipping",
    "Building Anonymous Payment Networks",
    "The $47k Month: Complete System Breakdown",
    "Psychological Warfare in High-Stakes Trading",
    "Escaping the Matrix: Financial Independence Through GPUs",
    "The Sovereign Individual Playbook",
    "Risk Management for Black Swan Events",
    "Creating Untraceable Digital Identities",
    "GPU Mining vs Trading: The Ultimate Comparison",
    "The Art of Market Manipulation (Legal Methods)",
    "Building Your First $100k in Crypto",
    "Advanced OPSEC for Traders",
    "The Future of AI: Investment Thesis 2024-2030"
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0]">
      <header className="bg-[#1A1A1A] border-b border-[#333333] sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-[#00D4FF] tracking-wider">
            DEX VOLKOV
          </a>
          <div className="flex gap-6 items-center">
            <a href="/videos" className="hover:text-[#00D4FF] transition-colors">Videos</a>
            <a href="/videos/premium" className="hover:text-[#00D4FF] transition-colors">Premium</a>
            <a 
              href="/videos/subscribe" 
              className="px-6 py-2 bg-[#00D4FF] text-[#0A0A0A] rounded font-semibold hover:bg-[#00A8CC] transition-colors"
            >
              Subscribe
            </a>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-5xl font-bold text-center mb-12">Join The Mastermind</h1>
        
        <div className="bg-[#242424] p-8 rounded-xl border-2 border-[#00D4FF]">
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold text-[#00D4FF] mb-2">$399</h2>
            <p className="text-2xl">Per Year - Bitcoin Only</p>
            <p className="text-[#F59E0B] font-bold mt-4 text-xl">MEMBERSHIP FULL</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">What You Get:</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center py-3 border-b border-[#333333]">
                  <span className="text-[#00D4FF] mr-3">✅</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#1A1A1A] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-3">Bitcoin Payment Only</h3>
            <p className="text-[#A0A0A0]">
              We accept Bitcoin exclusively to maintain privacy and sovereignty.
              BTCPay Server integration coming soon.
            </p>
            <p className="text-[#00D4FF] font-semibold mt-3">
              Payment instructions will be sent via email after registration.
            </p>
          </div>
          
          <div className="text-center">
            <button 
              className="px-10 py-4 bg-[#00D4FF] text-[#0A0A0A] rounded font-bold text-xl hover:bg-[#00A8CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Coming Soon - BTCPay Integration
            </button>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Premium Video Library Preview:</h3>
          <div className="space-y-3">
            {videoTitles.map((title, index) => (
              <div key={index} className="p-4 bg-[#242424] rounded border-l-4 border-[#00D4FF]">
                <span className="text-[#00D4FF] text-sm">Video {index + 1}</span>
                <h4 className="mt-1">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}