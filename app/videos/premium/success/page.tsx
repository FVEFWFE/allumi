"use client"

import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { usePostHog } from 'posthog-js/react'

export default function SuccessPage() {
  const posthog = usePostHog()
  
  useEffect(() => {
    // Track successful payment page view
    if (posthog) {
      posthog.capture('payment_success_viewed', {
        product: 'Premium Video Vault',
        source: 'btcpay_redirect'
      })
    }
  }, [posthog])
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <CheckCircle className="w-16 h-16 text-[#00D4FF] mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Your Premium Vault access has been activated. You now have access to all 480+ exclusive videos.
        </p>
        <Link 
          href="/videos"
          className="inline-block px-8 py-3 bg-[#00D4FF] text-[#0A0A0A] rounded-lg font-semibold hover:bg-[#00A8CC] hover:text-white transition-all"
        >
          Start Watching →
        </Link>
        <p className="text-xs text-gray-600 mt-8">
          If you have any issues, save your invoice ID and contact support.
        </p>
      </div>
    </div>
  )
}