"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Loader2, AlertTriangle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface KeyData {
  key: string
  tier: string
  duration: string
  expiresAt: string
  activationUrl: string
}

export function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [keyData, setKeyData] = useState<KeyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found.")
      setLoading(false)
      return
    }

    let attempts = 0
    const maxAttempts = 15
    let cancelled = false

    const poll = async () => {
      if (cancelled) return

      try {
        const res = await fetch(`/api/get-key?session_id=${sessionId}`)
        if (res.ok) {
          const data = await res.json()
          if (!data.pending) {
            setKeyData(data)
            setLoading(false)
            return
          }
        }
      } catch {
        // Network error, keep polling
      }

      attempts++
      if (attempts >= maxAttempts) {
        setError("Key generation is taking longer than expected. Check your email for the key.")
        setLoading(false)
        return
      }

      setTimeout(poll, 2000)
    }

    poll()

    return () => { cancelled = true }
  }, [sessionId])

  const copyKey = async () => {
    if (!keyData) return
    await navigator.clipboard.writeText(keyData.key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tierLabel = keyData?.tier ? keyData.tier.charAt(0).toUpperCase() + keyData.tier.slice(1) : ""
  const durationLabel = keyData?.duration === "1year" ? "1 Year" : "1 Month"

  return (
    <>
      <Link href="/" className="mb-8 text-xl font-medium tracking-tight text-foreground">
        allumi
      </Link>

      <Card className="w-full max-w-md border-border/50 bg-card">
        <CardContent className="p-8 text-center">
          {loading ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
              <h1 className="mt-6 text-2xl font-semibold text-foreground">Generating your key...</h1>
              <p className="mt-3 text-muted-foreground">This usually takes a few seconds.</p>
            </>
          ) : error ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
              <h1 className="mt-6 text-2xl font-semibold text-foreground">Payment Successful</h1>
              <p className="mt-3 text-muted-foreground">{error}</p>
              <Button asChild className="mt-8 w-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </>
          ) : keyData ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-8 w-8 text-green-500" strokeWidth={2.5} />
              </div>

              <h1 className="mt-6 text-2xl font-semibold text-foreground">Payment Successful</h1>
              <p className="mt-3 text-muted-foreground">Here is your license key.</p>

              {/* Key display with copy */}
              <div
                onClick={copyKey}
                className="mt-6 cursor-pointer rounded-xl border border-border/50 bg-muted/50 p-6 transition-colors hover:border-primary/50"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">License Key</p>
                <p className="mt-2 font-mono text-2xl font-bold tracking-wider text-primary">{keyData.key}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Copy className="h-3 w-3" />
                  {copied ? "Copied!" : "Click to copy"}
                </div>
              </div>

              {/* Plan details */}
              <div className="mt-4 rounded-xl border border-border/50 p-4 text-left text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-foreground">{tierLabel}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground">{durationLabel}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Activate within</span>
                  <span className="text-foreground">30 days</span>
                </div>
              </div>

              <Button asChild className="mt-6 w-full">
                <a href={keyData.activationUrl}>Activate Key on GetGooned.ai</a>
              </Button>

              <p className="mt-4 text-xs text-muted-foreground">
                Key also sent to your email.
              </p>
            </>
          ) : null}
        </CardContent>
      </Card>
    </>
  )
}
