import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter, Merriweather, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSettingsProvider } from "@/hooks/use-theme-settings"
import { Toaster } from "@/components/ui/toaster"
import { PHProvider, PostHogPageView } from "./providers/posthog"


// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TinyAllumi - Your Thai Princess",
  description: "22yo Thai content creator living in paradise. Top 0.1% creator making $30K/month. Exclusive POV content, lifestyle vlogs, and authentic moments from Thailand & Kenya.",
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans dark">
      <body className={`${inter.variable} ${merriweather.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <PHProvider>
          <PostHogPageView />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <ThemeSettingsProvider>
              {children}
              <Toaster />
            </ThemeSettingsProvider>
          </ThemeProvider>
        </PHProvider>
      </body>
    </html>
  )
}
