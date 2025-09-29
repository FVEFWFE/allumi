"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useProfile } from "@/hooks/use-profile"
import { useLinks } from "@/hooks/use-links"
import { ProfileView } from "@/components/link-tree/profile-view"
import { useThemeSettings } from "@/hooks/use-theme-settings"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Play, Heart, DollarSign, Mail, Users, Sparkles, Star } from "lucide-react"

// Bas Content Section (Blue Theme)
const basLinks = [
  {
    id: "bas-1",
    title: "🔥 Natural POV Content - ManyVids",
    url: "https://manyvids.com/BasPalms",
    description: "100% authentic POV from my glasses. No fake moaning. No staging. Just real paradise life with Thai models.",
    backgroundImage: "/backgrounds/shotgun.jpg",
    category: "bas",
    isPrimary: true,
    badge: "$30K/MO REVENUE",
  },
  {
    id: "bas-2",
    title: "🎬 YouTube - Lifestyle Vlogs",
    url: "https://youtube.com/@BasPalms?sub_confirmation=1",
    description: "Thailand paradise lifestyle. Dating culture. Building wealth abroad. The real unfiltered truth.",
    backgroundImages: [
      "/backgrounds/vids1.webp",
      "/backgrounds/vids2.webp",
      "/backgrounds/vids3.webp"
    ],
    category: "bas",
  },
  {
    id: "bas-3",
    title: "🏴‍☠️ Reddit Community",
    url: "https://reddit.com/u/BasPalms",
    description: "Join the controversy. Uncensored discussions about the lifestyle.",
    category: "bas",
  },
  {
    id: "bas-4",
    title: "🐦 Twitter/X Updates",
    url: "https://x.com/BasPalms",
    description: "Daily paradise updates. Hot takes on modern dating.",
    category: "bas",
  },
]

// Gayla Content Section (Pink Theme)
const gaylaLinks = [
  {
    id: "gayla-1",
    title: "💎 GaylaGirl2007 - Exclusive Content",
    url: "https://manyvids.com/gaylagirl2007",
    description: "Thai paradise princess. Natural POV scenes. Real chemistry, no acting. Custom videos available.",
    backgroundImages: [
      "/backgrounds/date1.webp",
      "/backgrounds/date2.webp",
      "/backgrounds/date3.webp"
    ],
    category: "gayla",
    isPrimary: true,
    badge: "TOP 1% CREATOR",
  },
  {
    id: "gayla-2",
    title: "🌺 Behind The Scenes",
    url: "https://instagram.com/gaylagirl2007",
    description: "Daily life in Pattaya paradise. Beach days, luxury lifestyle, BTS content.",
    backgroundImages: [
      "/backgrounds/date1.webp",
      "/backgrounds/date2.webp",
      "/backgrounds/date3.webp"
    ],
    category: "gayla",
  },
  {
    id: "gayla-3",
    title: "💬 Direct Updates",
    url: "https://x.com/gaylagirl2007",
    description: "Personal thoughts from paradise. Exclusive announcements.",
    category: "gayla",
  },
]

// Combined/Couple Content (Gradient Theme)
const coupleLinks = [
  {
    id: "couple-1",
    title: "🔥 POV Paradise Collection - BESTSELLER",
    url: "https://manyvids.com/BasPalms",
    description: "100% real couple content. Natural chemistry. POV glasses footage you can't find anywhere else.",
    backgroundImage: "/backgrounds/hometheater.jpg",
    category: "couple",
    isPrimary: true,
    isSpecial: true,
    badge: "500+ VIDEOS",
  },
  {
    id: "couple-2",
    title: "💑 Bundle Deal - Save 40%",
    url: "https://manyvids.com/gaylagirl2007",
    description: "Access both our ManyVids stores. Over 1000 videos total. Limited spots available.",
    category: "couple",
    isSpecial: true,
    badge: "BEST VALUE",
  },
]

// Business/Education (Gold Theme)
const businessLinks = [
  {
    id: "biz-1",
    title: "🏆 CamRiches.ai - Copy Our $30K/Month System",
    url: "https://camriches.ai",
    description: "The exact blueprint we use. $397/mo gets you EVERYTHING: POV content strategy, Reddit automation, AI tools, plus FREE Allumi software ($497 value).",
    backgroundImage: "/backgrounds/hometheater.jpg",
    category: "business",
    isPrimary: true,
    isCTA: true,
    badge: "ONLY 50 SPOTS",
  },
  {
    id: "biz-2",
    title: "🎓 Private Skool Community",
    url: "https://skool.com/camriches",
    description: "Weekly calls with me. See my live metrics. Network with other creators making $10K+/mo.",
    category: "business",
    badge: "MEMBERS ONLY",
  },
  {
    id: "biz-3",
    title: "📖 FREE: Paradise POV Blueprint",
    url: "#email-capture",
    description: "My exact POV content strategy that generates $30K/mo. Natural content secrets revealed.",
    category: "business",
    isEmailCapture: true,
    badge: "INSTANT ACCESS",
  },
]

const defaultProfile = {
  name: "🌴 Bas Palms 🌴",
  bio: "$30K/Month from Paradise | Natural POV Content Creator | Living in Pattaya with Thai GF | No Fake Moaning, Just Real Life | Teaching You The System That Works",
  avatarUrl: "/dex.png",
  secondaryBg: "bg-secondary",
  verified: true,
  stats: {
    revenue: "$30K/MO",
    location: "PATTAYA, THAILAND",
    videos: "500+ POV VIDEOS"
  }
}

export default function LinkTree() {
  const { toast } = useToast()
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  // Combine all links with proper ordering
  const allLinks = [
    ...coupleLinks,
    ...basLinks,
    ...gaylaLinks,
    ...businessLinks,
  ]

  const { profile, handleProfileChange, toggleVerified, updateSecondaryBg, saveProfileChanges } =
    useProfile(defaultProfile)

  const { links, newLink, addLink, deleteLink, updateLink, handleNewLinkChange } = useLinks(allLinks)

  const { themeSettings } = useThemeSettings()

  // Apply font family to the entire application when it changes
  useEffect(() => {
    document.documentElement.classList.remove("font-sans", "font-serif", "font-mono")
    document.documentElement.classList.add(themeSettings.font)
  }, [themeSettings.font, theme])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast({
        title: "Success! 🎉",
        description: "Check your email for the Paradise Blueprint",
      })
      setEmail("")
      setShowEmailForm(false)
    }
  }

  const handleLinkClick = (link: any) => {
    if (link.isEmailCapture) {
      setShowEmailForm(!showEmailForm)
      return
    }
    window.open(link.url, '_blank')
  }

  const getLinkStyle = (category: string, isHovered: boolean) => {
    const baseStyle = "relative overflow-hidden transition-all duration-500 ease-out transform backdrop-blur-3xl backdrop-saturate-200"

    switch (category) {
      case 'bas':
        return cn(
          baseStyle,
          "bg-gradient-to-br from-blue-950/60 via-blue-900/50 to-blue-950/60",
          "border border-blue-400/30 shadow-xl shadow-black/50",
          isHovered && "scale-[1.02] shadow-2xl shadow-blue-500/50 border-blue-400/50 bg-gradient-to-br from-blue-950/70 via-blue-900/60 to-blue-950/70"
        )
      case 'gayla':
        return cn(
          baseStyle,
          "bg-gradient-to-br from-pink-950/60 via-pink-900/50 to-pink-950/60",
          "border border-pink-400/30 shadow-xl shadow-black/50",
          isHovered && "scale-[1.02] shadow-2xl shadow-pink-500/50 border-pink-400/50 bg-gradient-to-br from-pink-950/70 via-pink-900/60 to-pink-950/70"
        )
      case 'couple':
        return cn(
          baseStyle,
          "bg-gradient-to-br from-purple-950/60 via-purple-900/50 to-purple-950/60",
          "border border-purple-400/30 shadow-xl shadow-black/50",
          isHovered && "scale-[1.02] shadow-2xl shadow-purple-500/50 border-purple-400/50 bg-gradient-to-br from-purple-950/70 via-purple-900/60 to-purple-950/70"
        )
      case 'business':
        return cn(
          baseStyle,
          "bg-gradient-to-br from-yellow-950/60 via-amber-900/50 to-yellow-950/60",
          "border border-yellow-400/30 shadow-xl shadow-black/50",
          isHovered && "scale-[1.02] shadow-2xl shadow-yellow-500/50 border-yellow-400/50 bg-gradient-to-br from-yellow-950/70 via-amber-900/60 to-yellow-950/70"
        )
      default:
        return baseStyle
    }
  }

  const getGlowEffect = (category: string) => {
    switch (category) {
      case 'bas':
        return "absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      case 'gayla':
        return "absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      case 'couple':
        return "absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      case 'business':
        return "absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      default:
        return ""
    }
  }

  return (
    <div className={cn("w-full", themeSettings.font)} style={{ backgroundColor: 'transparent' }}>

      <div className="relative w-full max-w-[780px] mx-auto px-4 sm:px-5 py-8">
        {/* Paradise Header Banner */}
        <div className="mb-8 p-4 bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-purple-950/60 backdrop-blur-3xl backdrop-saturate-200 rounded-2xl border border-cyan-400/30 shadow-xl shadow-black/50">
          <div className="text-center">
            <p className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-1">
              🌴 Living The Dream in Pattaya, Thailand 🌴
            </p>
            <p className="text-gray-300 text-xs">
              Natural POV Content • No Fake Scenes • Real Paradise Life
            </p>
          </div>
        </div>

        {/* Custom Profile Section - removed floating animation for better readability */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 to-pink-500 p-[2px]"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 blur-xl"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              {profile.name}
            </span>
          </h1>

          <p className="text-gray-200 max-w-2xl mx-auto px-4 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {profile.bio}
          </p>

        </div>

        {/* Section: Couples Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-400 fill-purple-400" />
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              COUPLES CONTENT
            </span>
          </h2>
          {links.filter(l => l.category === 'couple').map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className={cn(
                "w-full text-left p-5 mb-4 rounded-2xl group",
                getLinkStyle(link.category, hoveredLink === link.id)
              )}
            >
              <div className={getGlowEffect(link.category)} />
              <div className="relative z-10">
                <h3 className="font-bold text-white text-lg mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{link.title}</h3>
                <p className="text-gray-200/95 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{link.description}</p>
              </div>
              {link.isSpecial && (
                <Star className="absolute top-4 right-4 w-5 h-5 text-yellow-400 animate-spin-slow" />
              )}
            </button>
          ))}
        </div>

        {/* Section: Bas Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow" />
            BAS PALMS
          </h2>
          {links.filter(l => l.category === 'bas').map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className={cn(
                "w-full text-left p-5 mb-4 rounded-2xl group",
                getLinkStyle(link.category, hoveredLink === link.id)
              )}
            >
              <div className={getGlowEffect(link.category)} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-white text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{link.title}</h3>
                  {link.badge && (
                    <span className="inline-block px-2 py-1 text-xs font-bold bg-blue-500/30 backdrop-blur-sm text-blue-300 rounded-full border border-blue-400/30">
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-200/95 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{link.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Section: Gayla Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse-slow" />
            GAYLA
          </h2>
          {links.filter(l => l.category === 'gayla').map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className={cn(
                "w-full text-left p-5 mb-4 rounded-2xl group",
                getLinkStyle(link.category, hoveredLink === link.id)
              )}
            >
              <div className={getGlowEffect(link.category)} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-white text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{link.title}</h3>
                  {link.badge && (
                    <span className="inline-block px-2 py-1 text-xs font-bold bg-pink-500/30 backdrop-blur-sm text-pink-300 rounded-full border border-pink-400/30">
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-200/95 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{link.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Section: Learn & Earn */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse-slow" />
            LEARN THE SYSTEM
          </h2>
          {links.filter(l => l.category === 'business').map((link) => (
            <div key={link.id}>
              <button
                onClick={() => handleLinkClick(link)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={cn(
                  "w-full text-left p-5 mb-4 rounded-2xl group",
                  getLinkStyle(link.category, hoveredLink === link.id),
                  link.isCTA && "ring-2 ring-yellow-500/30"
                )}
              >
                <div className={getGlowEffect(link.category)} />
                <div className="relative z-10">
                  <h3 className="font-bold text-white text-lg mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{link.title}</h3>
                  <p className="text-gray-200/95 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{link.description}</p>
                </div>
              </button>

              {/* Email Capture Form with glass effect */}
              {link.isEmailCapture && showEmailForm && (
                <form onSubmit={handleEmailSubmit} className="mb-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-white/10 placeholder-gray-400"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-yellow-500/25"
                    >
                      Get Access
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>

        {/* Social icons footer with hover effects */}
        <div className="flex justify-center items-center gap-6 mt-10 pb-6">
          <a
            href="https://youtube.com/@BasPalms?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Subscribe on YouTube"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://x.com/BasPalms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Follow on X"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/gaylaparadise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Follow on Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
            </svg>
          </a>
          <a
            href="https://reddit.com/u/BasPalms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Reddit Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
          </a>
        </div>

        {/* Final CTA Section */}
        <div className="mt-12 mb-8 p-6 bg-gradient-to-r from-yellow-950/60 via-amber-950/60 to-orange-950/60 backdrop-blur-3xl backdrop-saturate-200 rounded-2xl border border-yellow-400/30 shadow-xl shadow-black/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Want My $30K/Month Blueprint?
              </span>
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              I'm sharing my exact POV content system with 50 people. <br />
              Natural content. Reddit automation. Real revenue.
            </p>
            <a
              href="https://camriches.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
            >
              Get Instant Access →
            </a>
            <p className="text-xs text-yellow-400/70 mt-3">
              ⚠️ Price increases to $497 after first 50 members
            </p>
          </div>
        </div>

        {/* Footer Text with subtle animation */}
        <div className="text-center text-gray-500 text-sm pb-8">
          <p className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            Live the Dream | Build the System | Join the Movement
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }


        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }


        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}