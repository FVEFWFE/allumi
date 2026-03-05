"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Standard",
    monthlyPrice: 29,
    yearlyPrice: 149,
    features: [
      "Full maxims library (843)",
      "Productivity system access",
      "Basic LLM prompts",
      "Email support",
    ],
    highlighted: false,
    slug: "standard",
  },
  {
    name: "Premium",
    monthlyPrice: 49,
    yearlyPrice: 249,
    features: [
      "Everything in Standard",
      "Advanced LLM prompts",
      "API workflow templates",
      "Priority support",
      "Early access to new features",
    ],
    highlighted: true,
    slug: "premium",
  },
  {
    name: "Ultimate",
    monthlyPrice: 99,
    yearlyPrice: 499,
    features: [
      "Everything in Premium",
      "Custom API integrations",
      "Dedicated account manager",
      "Unlimited team seats",
      "White label options",
    ],
    highlighted: false,
    slug: "ultimate",
  },
]

const creditPacks = [
  { name: "Starter", amount: "$5", credits: "500", bonus: "", slug: "credits-5" },
  { name: "Popular", amount: "$10", credits: "1,200", bonus: "+20%", slug: "credits-10" },
  { name: "Power", amount: "$20", credits: "2,600", bonus: "+30%", slug: "credits-20" },
  { name: "Mega", amount: "$50", credits: "7,000", bonus: "+40%", slug: "credits-50" },
  { name: "Pro", amount: "$100", credits: "15,000", bonus: "+50%", slug: "credits-100" },
]

function getMonthsFree(monthlyPrice: number, yearlyPrice: number) {
  return Math.round((monthlyPrice * 12 - yearlyPrice) / monthlyPrice)
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Pricing</h2>
          <p className="mt-4 text-muted-foreground">Simple, transparent pricing. Cancel anytime.</p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Yearly
          </span>
          {isYearly && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Save up to 58%
            </span>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const displayPrice = isYearly
              ? `$${Math.round(plan.yearlyPrice / 12)}`
              : `$${plan.monthlyPrice}`
            const monthsFree = getMonthsFree(plan.monthlyPrice, plan.yearlyPrice)

            return (
              <Card
                key={plan.name}
                className={`relative transition-all hover:border-primary/50 ${plan.highlighted ? "border-primary/30 bg-card" : "border-border/50 bg-card/50"}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3" fill="currentColor" />
                    Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">
                    <span className="text-4xl font-semibold text-foreground">{displayPrice}</span>
                    <span className="text-muted-foreground">/mo</span>
                    {isYearly && (
                      <span className="ml-2 text-sm text-primary">
                        {monthsFree} months free
                      </span>
                    )}
                  </CardDescription>
                  {isYearly && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Billed annually at ${plan.yearlyPrice}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full"
                    variant={plan.highlighted ? "default" : "secondary"}
                  >
                    <Link href={`/checkout/${plan.slug}${isYearly ? "-yearly" : ""}`}>
                      Subscribe
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16">
          <div className="text-center">
            <h3 className="text-lg font-medium text-foreground">Credit Packs</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              One time purchases for additional usage and features
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {creditPacks.map((pack) => (
              <Card key={pack.slug} className="border-border/50 bg-card/50 transition-all hover:border-primary/30">
                <CardContent className="p-4 text-center">
                  <p className="text-lg font-medium text-foreground">{pack.amount}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{pack.credits} credits</p>
                  {pack.bonus && (
                    <p className="mt-0.5 text-xs text-primary">{pack.bonus} bonus</p>
                  )}
                  <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                    <Link href={`/checkout/${pack.slug}`}>Buy</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
