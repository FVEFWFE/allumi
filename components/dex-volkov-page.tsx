"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// AGI countdown target date (18 months from now)
const AGI_TARGET_DATE = new Date()
AGI_TARGET_DATE.setMonth(AGI_TARGET_DATE.getMonth() + 18)

const links = [
  {
    id: "1",
    emoji: "📖",
    title: "The AI Kill Switch",
    description: "My book about why researchers keep quitting OpenAI and what's actually coming. $9.99 on Kindle. Took me 8 months to write.",
    url: "#",
    isHighlight: true,
  },
  {
    id: "2",
    emoji: "📊",
    title: "How I Actually Make Money From YouTube",
    description: "People keep asking how I pay rent making AI doom videos. Short answer: community +",
    url: "/gift",
    isHighlight: true,
  },
  {
    id: "3",
    emoji: "❤️",
    title: "Dating App That Actually Works",
    description: "Where I found my Thai (and other) girlfriends. No fake ELO manipulation, no bots, real women. Includes my 70% success rate script",
    url: "#",
    isHighlight: true,
  },
  {
    id: "4",
    emoji: "🎬",
    title: "YouTube Channel",
    description: "Making videos about AI risk from Pattaya. Honest takes on what's happening.",
    url: "https://youtube.com/@DexVolkov",
    isHighlight: false,
  },
  {
    id: "5",
    emoji: "🐦",
    title: "Twitter/X",
    description: "Daily thoughts on AI, survival, and the weird timeline we're in",
    url: "#",
    isHighlight: false,
  },
  {
    id: "6",
    emoji: "💬",
    title: "Discord Community",
    description: "Building communities because human connection might be all we have left",
    url: "#",
    isHighlight: false,
  },
  {
    id: "7",
    emoji: "📧",
    title: "Newsletter",
    description: "Weekly updates on AI developments and how to prepare",
    url: "#",
    isHighlight: false,
  },
]

export default function DexVolkovPage() {
  const [daysUntilAGI, setDaysUntilAGI] = useState(0)
  const [glitchText, setGlitchText] = useState("Dex Volkov")

  useEffect(() => {
    // Calculate days until AGI
    const updateCountdown = () => {
      const now = new Date()
      const timeDiff = AGI_TARGET_DATE.getTime() - now.getTime()
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysUntilAGI(Math.max(0, days))
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Glitch effect for name
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    const originalText = "Dex Volkov"

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance to glitch
        let glitched = ""
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.3) {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            glitched += originalText[i]
          }
        }
        setGlitchText(glitched)

        setTimeout(() => setGlitchText(originalText), 100)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix-style background pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/20 to-transparent"></div>
        <div className="pattern-grid opacity-30"></div>
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 py-8">
        {/* Header with glitch effect */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-cyan-400 glitch-text">{glitchText}</h1>
          <div className="text-green-300 text-sm mb-4 flex items-center justify-center gap-2">
            <span>📍</span>
            <span>Currently: Pattaya, Thailand</span>
          </div>

          {/* AGI Countdown */}
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-6">
            <div className="text-red-400 text-sm font-bold">
              Days until AGI: <span className="text-red-300 text-lg">{daysUntilAGI}</span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <Card className="bg-gray-900/80 border-green-500/30 p-6 mb-8 backdrop-blur-sm">
          <p className="text-green-300 text-sm leading-relaxed">
            Making videos about AI risk from Pattaya. Building communities because human connection might be all we have left. 
            Gaming too much. Documenting the weird timeline we're living through.
          </p>
        </Card>

        {/* Recent Videos Section */}
        <Card className="bg-gray-900/80 border-green-500/30 p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-cyan-400 text-lg font-bold mb-4">🎬 Recent Videos</h2>
          <p className="text-green-300 text-sm mb-4">
            Thai girlfriend trying to understand why I think robots will kill us. Attempting to build sustainable income before everything changes. 
            Honest takes on what's actually happening at OpenAI.
          </p>
          <div className="space-y-3 text-sm">
            <a href="https://youtube.com/@DexVolkov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <span className="text-gray-500">9:43</span>
              <span>Thai GF on AI Jobs Crisis: 'Just Make AI Buddhist'</span>
            </a>
            <a href="https://youtube.com/@DexVolkov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <span className="text-gray-500">14:23</span>
              <span>Thai GF Furnished Our Seaview Condo in One Day</span>
            </a>
            <a href="https://youtube.com/@DexVolkov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <span className="text-gray-500">23:47</span>
              <span>I Tried Every Business Model for 15 Years - Here's What Works</span>
            </a>
            <a href="https://youtube.com/@DexVolkov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <span className="text-gray-500">18:32</span>
              <span>Nobody Gets Away With Anything. Ever</span>
            </a>
            <a href="https://youtube.com/@DexVolkov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <span className="text-gray-500">27:11</span>
              <span>Building Recurring Revenue (Because Jobs Are Ending)</span>
            </a>
            <a href="https://youtube.com/@DexVolkov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-400 hover:text-cyan-300 transition-colors cursor-pointer">
              <span className="text-gray-500">15:56</span>
              <span>Bangkok at 4am: Success & Loneliness</span>
            </a>
          </div>
        </Card>

        {/* Links */}
        <div className="space-y-4 mb-8">
          {links.map((link, index) => (
            <Button
              key={link.id}
              variant="outline"
              className={cn(
                "w-full p-4 h-auto text-left border-2 transition-all duration-300 hover:scale-105 group relative overflow-hidden",
                link.isHighlight
                  ? "border-cyan-400/50 bg-cyan-900/20 hover:border-cyan-300 hover:bg-cyan-900/40 hover:shadow-lg hover:shadow-cyan-400/20"
                  : "border-green-500/30 bg-green-900/20 hover:border-green-400 hover:bg-green-900/40 hover:shadow-lg hover:shadow-green-400/20",
              )}
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 mt-1">{link.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "font-bold text-base mb-1",
                          link.isHighlight ? "text-cyan-300" : "text-green-300",
                        )}
                      >
                        {link.title}
                      </div>
                      <div className="text-xs text-gray-400 leading-relaxed">{link.description}</div>
                    </div>
                  </div>
                </div>
              </a>
            </Button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://youtube.com/@DexVolkov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://x.com/dexvolkov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
            aria-label="X (Twitter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940718  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
            </svg>
          </a>
        </div>

        {/* Footer tagline */}
        <div className="text-center">
          <div className="text-green-500 text-sm font-bold tracking-wider">
            🎮 AI-Funded Expat Escaping the Collapse 🎮
          </div>
        </div>
      </div>
    </div>
  )
}
