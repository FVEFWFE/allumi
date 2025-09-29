"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SqueezePage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNzZkNDdmZTcxODYyNWMzMDA5OGQ0ODFjY2M1ZWFlY2ZhZDA3ZmFiNzJhYTAxY2Y3MjBmODQxMGFjYzAyMzRiNWE4MDdiOTFlMzhlODUzNjAiLCJpYXQiOjE3NTc5Mjk1NjguNTEyMzUsIm5iZiI6MTc1NzkyOTU2OC41MTIzNTIsImV4cCI6NDkxMzYwMzE2OC41MDYwNywic3ViIjoiMTc1MTAyOCIsInNjb3BlcyI6W119.sJY34Gebogl6fdvaASjxuSZWQVWfeRjRbmPVegNyUEa-Ai1O_clVIYFmuOHuerI6pDJSxMMO4aAlP-DdSMAmkkzAVr54jq-oegXbyYxDGjjTqFPMgZ2ujIEGIcwToY-mUGBINtKAtHAJWGSsuXTSJm9GnClEhcvEBK1d8gnoolfQ-2-jgHRXEaadMirJbveRR9yI0tE351xewzxgkaBhiac9d6bIprAnyMi-4CvEmQlwz_jNLB4zTABVrlWyF7IWvxXdwpohIFwL0qMOCoX8LDEVciemAYRwt_lWsA4iOcUFJP0k2NBPD246qkRA54czQrJLWyihy0LmCSpiDuygg7XxUGqmTHFhv_MHdD_42TtKLqcOWzpHEqL7kL7QkzuItS4_w7stCWTrZEs15-grtHRU_5ps5ad_hXbfBXDSV7Cuz7S3pUFYutUq0-Q2cM_6cfYxrZq-JJZwHVNt2TD0dJTGLoSSpfxiIFDIWZscXQ72MmoTBNSLMx7YzIj2BOepidk5KXZwZ-f2KP0v_DvB96rSjnN91m6m1lGPW68PkocVAsCQ0MZ7ofCNQRViAbR8bDMN60qkLFHntbSwse19_wOc8-c6h-BGJShmwQwFxpy_vMDHPKxiTs7A7hotkoC9OwG8KajOF5AktI23U6D8jwBeg0RqWlrOV9Ds6DOvFVQ'
        },
        body: JSON.stringify({
          email: email,
          fields: {
            source: 'dexvolkov_gift_page'
          },
          groups: ['165601198217365283']
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Failed to subscribe:', response.status)
        // Still show success to user to avoid revealing API issues
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      // Still show success to user to avoid revealing API issues
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/backgrounds/4k colage.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
          filter: 'blur(2px)',
        }}
      />
      <div className="relative z-10">
      {/* Above the Fold */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            I Built a $10K/Month Community While Everyone Else Gets Replaced by AI
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-12 text-balance">
            Here's the exact attribution data that proved Skool was scamming me (and you)
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
          <div className="flex-1 max-w-2xl text-lg leading-relaxed space-y-4">
            <p>I spent 18 months building communities wrong.</p>
            <p>Burning money on Instagram ads that didn't work.</p>
            <p>Creating content nobody paid for.</p>
            <p>Sending my audience to Skool's MLM mall.</p>
            <p className="pt-4">Then I saw my attribution data for the first time.</p>

            <div className="font-mono text-xl py-8 space-y-2">
              <div>YouTube: $8,400/month</div>
              <div>Newsletter: $1,200/month</div>
              <div>Instagram: $0</div>
              <div>Twitter: $0</div>
            </div>

            <p className="text-xl">I was literally setting money on fire.</p>
          </div>

          <div className="flex-shrink-0 lg:mt-8">
            <img
              src="/hacker-setup.png"
              alt="Hacker workstation with financial data"
              className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-lg opacity-90 shadow-2xl"
            />
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-white text-white placeholder:text-gray-400 text-lg py-3"
              />
              <Button type="submit" className="w-full !bg-white !text-black hover:!bg-gray-200 text-lg py-3 font-semibold">
                Send Me The Data →
              </Button>
              <p className="text-sm text-gray-400 text-center">No spam. Unsubscribe whenever.</p>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-green-400 mb-4">✓ Check your email!</p>
              <p className="text-gray-300">The data dump is on its way.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <div className="max-w-2xl mx-auto text-lg leading-relaxed space-y-4">
          <p>Everyone's talking about AI replacing jobs.</p>
          <p>They're right.</p>
          <p>Copywriters? Gone.</p>
          <p>Designers? Gone.</p>
          <p>Coders? Almost gone.</p>

          <div className="py-4">
            <p>But communities?</p>
            <p>AI can't replace human connection.</p>
            <p>AI can't build trust.</p>
            <p>AI can't create status games.</p>
          </div>

          <p>That's why I'm all-in on communities.</p>
          <p>And why I left Skool after seeing what they hide from you.</p>
        </div>
      </section>

      {/* The Skool Scam Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center">The Skool Cartel Doesn't Want You to Know:</h3>

        <div className="max-w-2xl mx-auto text-lg leading-relaxed space-y-4">
          <div>- They charge $99 for features that cost $30 to deliver</div>
          <div>- They hide your attribution data on purpose</div>
          <div>- Their Discovery page sends your paying members to competitors</div>
          <div>- You're building on skool.com/you like it's 2010</div>
          <div>- The platform is becoming MLM central (check Reddit)</div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center">The Raw Data Dump:</h3>

        <div className="max-w-2xl mx-auto text-lg leading-relaxed space-y-6">
          <div>
            <span className="font-mono text-xl">1.</span> My actual attribution dashboard screenshots (the $8K YouTube
            surprise)
          </div>
          <div>
            <span className="font-mono text-xl">2.</span> The 48-hour migration that didn't lose a single member
          </div>
          <div>
            <span className="font-mono text-xl">3.</span> Why communities are the only AI-proof business model
          </div>
          <div>
            <span className="font-mono text-xl">4.</span> The platform that costs less than Skool but shows everything
          </div>
          <div>
            <span className="font-mono text-xl">5.</span> My exact content-to-community funnel (with real numbers)
          </div>
        </div>
      </section>

      {/* Who TF Am I */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
            <img src="/profile-photo.png" alt="Profile photo" className="w-full h-full object-cover" />
          </div>
          <div className="text-lg leading-relaxed space-y-4">
            <p>I make videos about AI ending humanity.</p>
            <p>Not exactly 'profitable niche' material.</p>
            <p>But I built a $10K/month community anyway.</p>
            <p>Because I can see what actually drives revenue.</p>
            <p>While everyone else flies blind on Skool.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center">Want to See What You're Missing?</h3>

        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-white text-white placeholder:text-gray-400 text-lg py-3"
              />
              <Button type="submit" className="w-full !bg-white !text-black hover:!bg-gray-200 text-lg py-3 font-semibold">
                Send Me The Data →
              </Button>
              <p className="text-sm text-gray-400 text-center">No spam. Unsubscribe whenever.</p>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-green-400 mb-4">✓ Check your email!</p>
              <p className="text-gray-300">The data dump is on its way.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-16 max-w-4xl mx-auto border-t border-gray-800">
        <p className="text-lg leading-relaxed text-center text-gray-300">
          <strong>PS</strong> - AGI is probably coming in 2-3 years. You have a small window to build something
          AI-proof. Communities are it. But only if you can see what actually works.
        </p>
      </footer>
      </div>
    </div>
  )
}
