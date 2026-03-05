"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Check, Copy, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function generateKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const segments = []
  for (let i = 0; i < 4; i++) {
    let segment = ""
    for (let j = 0; j < 4; j++) {
      segment += chars[Math.floor(Math.random() * chars.length)]
    }
    segments.push(segment)
  }
  return segments.join("-")
}

export function SuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email"
  const [licenseKey] = useState(() => generateKey())
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(licenseKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card">
      <CardContent className="p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-8 w-8 text-primary" strokeWidth={2.5} />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-foreground">You&apos;re all set</h1>
        <p className="mt-2 text-muted-foreground">Your key:</p>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border/50 bg-secondary p-4">
          <code className="text-lg font-medium tracking-wider text-foreground">{licenseKey}</code>
          <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
            {copied ? <CheckCheck className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy license key</span>
          </Button>
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-primary" />
          <span>Also sent to {email}</span>
        </p>

        <p className="mt-6 text-sm text-muted-foreground">Enter this key in your app to activate.</p>
      </CardContent>
    </Card>
  )
}
