"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const planDetails: Record<string, { name: string; price: string; type: "subscription" | "credit" }> = {
  standard: { name: "Standard Plan", price: "$29/mo", type: "subscription" },
  "standard-yearly": { name: "Standard Plan (Yearly)", price: "$149/yr", type: "subscription" },
  premium: { name: "Premium Plan", price: "$49/mo", type: "subscription" },
  "premium-yearly": { name: "Premium Plan (Yearly)", price: "$249/yr", type: "subscription" },
  ultimate: { name: "Ultimate Plan", price: "$99/mo", type: "subscription" },
  "ultimate-yearly": { name: "Ultimate Plan (Yearly)", price: "$499/yr", type: "subscription" },
  "credits-5": { name: "Starter Pack", price: "$5", type: "credit" },
  "credits-10": { name: "Popular Pack", price: "$10", type: "credit" },
  "credits-20": { name: "Power Pack", price: "$20", type: "credit" },
  "credits-50": { name: "Mega Pack", price: "$50", type: "credit" },
  "credits-100": { name: "Pro Pack", price: "$100", type: "credit" },
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const plan = planDetails[params.plan as string]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to success page with email
    router.push(`/success?email=${encodeURIComponent(email)}`)
  }

  if (!plan) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <Card className="w-full max-w-md border-border/50 bg-card/50">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Plan not found</p>
            <Button asChild variant="outline" className="mt-4 bg-transparent">
              <Link href="/#pricing">Back to Pricing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <Link href="/" className="mb-8 text-xl font-medium tracking-tight text-foreground">
        allumi
      </Link>

      <Card className="w-full max-w-md border-border/50 bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Checkout</CardTitle>
          <CardDescription className="mt-2">
            <span className="font-medium text-foreground">{plan.name}</span>
            <span className="mx-2 text-muted-foreground">&bull;</span>
            <span className="text-foreground">{plan.price}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Pay with Card"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>Secured by Stripe</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
