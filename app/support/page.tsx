"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, FileText } from "lucide-react"

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 px-6 pt-24 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">Support</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re here to help. Choose how you&apos;d like to reach us.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium text-foreground">Email Us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Send us an email and we&apos;ll respond within 24 hours.
              </p>
              <a href="mailto:support@allumi.app" className="mt-4 inline-block text-sm text-primary hover:underline">
                support@allumi.app
              </a>
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium text-foreground">FAQ</h3>
              <p className="mt-2 text-sm text-muted-foreground">Find quick answers to commonly asked questions.</p>
              <Link href="#faq" className="mt-4 inline-block text-sm text-primary hover:underline">
                View FAQ
              </Link>
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium text-foreground">Documentation</h3>
              <p className="mt-2 text-sm text-muted-foreground">Learn how to get the most out of Allumi.</p>
              <span className="mt-4 inline-block text-sm text-muted-foreground">Coming soon</span>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-foreground text-center">Contact Us</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            {submitted ? (
              <div className="mx-auto mt-8 max-w-md rounded-xl border border-border/50 bg-card p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 font-medium text-foreground">Message Sent</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. We&apos;ll respond within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 bg-transparent"
                  onClick={() => {
                    setSubmitted(false)
                    setEmail("")
                    setSubject("")
                    setMessage("")
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="bg-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question or issue..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="bg-card resize-none"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          <div id="faq" className="mt-20">
            <h2 className="text-2xl font-semibold text-foreground text-center">Frequently Asked Questions</h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="font-medium text-foreground">How do I access Allumi after purchase?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  After completing your purchase, you&apos;ll receive a license key via email. Use this key to log in
                  and access all features included in your plan.
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="font-medium text-foreground">Can I upgrade my plan later?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Yes, you can upgrade from Standard to Premium or Ultimate at any time. Contact our support team and we&apos;ll
                  help you with the upgrade process, prorating the cost based on your remaining subscription.
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="font-medium text-foreground">What&apos;s included in the 843 maxims?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The 843 maxims are carefully curated wisdom principles covering productivity, decision-making,
                  personal growth, and life philosophy. They&apos;re organized into categories for easy reference and
                  daily reflection.
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="font-medium text-foreground">Do you offer refunds?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Yes, we offer a 14-day money-back guarantee. If you&apos;re not satisfied with Allumi, contact us
                  within 14 days of purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
