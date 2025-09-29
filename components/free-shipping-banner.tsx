"use client"

import { useEffect, useState } from "react"
import { X, Truck, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShippingDeadlineData {
  deadline: string
  formattedDeadline: string
  daysRemaining: number
  hoursRemaining: number
  isExtended: boolean
  lastExtended: string
}

export function FreeShippingBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [deadlineData, setDeadlineData] = useState<ShippingDeadlineData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)

  useEffect(() => {
    // Check if banner was previously dismissed in this session
    const dismissed = sessionStorage.getItem('freeShippingBannerDismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }

    // Fetch deadline data
    fetchDeadlineData()
  }, [])

  useEffect(() => {
    if (!deadlineData) return

    // Update countdown every second
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const deadline = new Date(deadlineData.deadline).getTime()
      const distance = deadline - now

      if (distance < 0) {
        // Deadline passed, fetch new data
        fetchDeadlineData()
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [deadlineData])

  const fetchDeadlineData = async () => {
    try {
      const response = await fetch('/api/shipping-deadline')
      const data = await response.json()
      setDeadlineData(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch shipping deadline:', error)
      setIsLoading(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('freeShippingBannerDismissed', 'true')
  }

  if (!isVisible || isLoading || !deadlineData) return null

  const urgencyMessage = deadlineData.daysRemaining <= 1 
    ? "🔥 LAST DAY" 
    : deadlineData.daysRemaining <= 2 
    ? "⚡ ENDING SOON" 
    : deadlineData.daysRemaining <= 3 
    ? "⏰ LIMITED TIME" 
    : "🎉 EXCLUSIVE OFFER"

  const mainMessage = deadlineData.isExtended
    ? "Great news! We've EXTENDED FREE WORLDWIDE SHIPPING"
    : "FREE WORLDWIDE SHIPPING on ALL orders"

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50",
      "bg-gradient-to-r",
      deadlineData.daysRemaining <= 1 
        ? "from-red-600 via-orange-600 to-red-600"
        : deadlineData.daysRemaining <= 2
        ? "from-orange-600 via-amber-600 to-orange-600"
        : "from-emerald-600 via-green-600 to-teal-600",
      "text-white shadow-lg",
      "animate-in slide-in-from-top-5 duration-500"
    )}>
      <div className="relative">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        
        <div className="relative px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex-1 flex items-center space-x-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Truck className={cn(
                  "h-5 w-5 sm:h-6 sm:w-6",
                  deadlineData.daysRemaining <= 2 ? "animate-bounce" : "animate-pulse"
                )} />
              </div>
              
              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                  <span className="text-xs font-bold tracking-wider opacity-90">
                    {urgencyMessage}
                  </span>
                  <span className="text-sm sm:text-base font-semibold">
                    {mainMessage}
                  </span>
                </div>
                
                {/* Countdown and deadline */}
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm">
                  {timeLeft && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="font-mono font-bold">
                        {timeLeft.days > 0 && `${timeLeft.days}d `}
                        {String(timeLeft.hours).padStart(2, '0')}:
                        {String(timeLeft.minutes).padStart(2, '0')}:
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  <span className="opacity-90">
                    Expires {deadlineData.formattedDeadline}
                  </span>
                </div>
                
                {/* Extended or promotional message */}
                <div className="mt-1 flex items-center space-x-1 text-xs">
                  <Sparkles className="h-3 w-3" />
                  <span className="italic">
                    {deadlineData.isExtended 
                      ? "Due to overwhelming demand, we've extended this offer for 5 more days!"
                      : deadlineData.daysRemaining <= 2
                      ? "Don't miss out - this offer won't last!"
                      : "No minimum purchase • No hidden fees • Worldwide delivery"
                    }
                  </span>
                </div>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}