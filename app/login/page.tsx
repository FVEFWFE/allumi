"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [licenseKey, setLicenseKey] = useState("")
  const [loginMethod, setLoginMethod] = useState<"credentials" | "license">("credentials")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (loginMethod === "credentials") {
      if (email && password) {
        // Demo: accept any credentials
        router.push("/")
      } else {
        setError("Please enter your email and password.")
      }
    } else {
      if (licenseKey && licenseKey.length >= 10) {
        router.push("/")
      } else {
        setError("Please enter a valid license key.")
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-6 pt-16 pb-16">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to access your Allumi account</p>
          </div>

          <div className="mt-8 rounded-xl border border-border/50 bg-card p-8">
            <div className="flex rounded-lg border border-border/50 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod("credentials")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  loginMethod === "credentials"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("license")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  loginMethod === "license"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                License Key
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {loginMethod === "credentials" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/support" className="text-xs text-muted-foreground hover:text-primary">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="licenseKey">License Key</Label>
                  <Input
                    id="licenseKey"
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                    className="bg-background font-mono"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Enter the license key you received after purchase.</p>
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/#pricing" className="text-primary hover:underline">
                  Get started
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
