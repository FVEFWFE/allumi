"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <>
      <Link href="/" className="mb-8 text-xl font-medium tracking-tight text-foreground">
        allumi
      </Link>

      <Card className="w-full max-w-md border-border/50 bg-card">
        <CardContent className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <Check className="h-8 w-8 text-green-500" strokeWidth={2.5} />
          </div>

          <h1 className="mt-6 text-2xl font-semibold text-foreground">Payment Successful</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for your purchase. You&apos;ll receive a confirmation email shortly with your access details.
          </p>

          {sessionId && (
            <p className="mt-4 text-xs text-muted-foreground">
              Reference: <span className="font-mono">{sessionId.slice(0, 20)}...</span>
            </p>
          )}

          <Button asChild className="mt-8 w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
