"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Suspense } from "react"

// GG tier names → allumi plan slugs
const TIER_MAP: Record<string, string> = {
  pro: "standard",
  premium: "premium",
  ultra: "ultimate",
}

function GGRedirect() {
  const searchParams = useSearchParams()
  const tier = searchParams.get("tier")
  const duration = searchParams.get("duration") || "monthly"
  const ref = searchParams.get("ref")
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    // Store referral code in cookie if present
    if (ref) {
      document.cookie = `gg_ref=${encodeURIComponent(ref)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
    }

    if (tier && TIER_MAP[tier]) {
      const planSlug = TIER_MAP[tier]
      const suffix = duration === "yearly" ? "-yearly" : ""
      setRedirecting(true)
      window.location.href = `/checkout/${planSlug}${suffix}`
    }
  }, [tier, duration, ref])

  if (redirecting || (tier && TIER_MAP[tier])) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Redirecting to checkout...</p>
      </div>
    )
  }

  // No tier specified or invalid: show plan selection
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-2 text-2xl font-semibold text-foreground">Choose Your Plan</h1>
      <p className="mb-8 text-muted-foreground">Select a plan to continue.</p>
      <div className="grid w-full max-w-2xl gap-4 md:grid-cols-3">
        {Object.entries(TIER_MAP).map(([ggTier, allumiSlug]) => {
          const prices: Record<string, string> = {
            pro: "$29/mo",
            premium: "$49/mo",
            ultra: "$99/mo",
          }
          return (
            <a
              key={ggTier}
              href={`/checkout/${allumiSlug}`}
              className="rounded-xl border border-border/50 bg-card p-6 text-center transition-colors hover:border-primary/50"
            >
              <p className="text-lg font-semibold capitalize text-foreground">{ggTier}</p>
              <p className="mt-1 text-muted-foreground">{prices[ggTier]}</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function GGPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <GGRedirect />
    </Suspense>
  )
}
