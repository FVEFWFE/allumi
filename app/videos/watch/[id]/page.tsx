"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Play, ArrowLeft, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CrossDomainLink } from "@/components/cross-domain-link"

// Video data - same as in the main videos page
const freeVideos = [
  {
    id: "DEX_001_GPU_ARBITRAGE",
    title: "I Tried Every Business Model for 15 Years - GPUs Win (Closing Soon)",
    description: "Why I liquidated everything for graphics cards. The math behind $47k/month. This is the most important video I've ever made about business. After 15 years of trying every model imaginable - dropshipping, agencies, SaaS, consulting, info products - I finally found the one that actually works. Physical arbitrage, specifically GPU flipping, is the only business model that AI can't destroy. In fact, AI makes it more profitable. I'll show you exactly why I liquidated my entire portfolio to go all-in on graphics cards, the exact math that convinced me, and why this opportunity is closing fast.",
    featured: true,
    duration: "23:47",
    fullDescription: `In this video, I break down:
    
    • Why physical arbitrage is AI-proof (and actually benefits from AI)
    • The exact math behind my $47k/month GPU flipping operation
    • Why I liquidated everything else to focus on this
    • The specific sources I use (yes, including Arbvault)
    • Why this opportunity closes in less than 18 months
    • How to start with as little as $5k
    
    This isn't theory. I show actual receipts, actual sales, actual profit margins. No course to sell, no coaching program. Just the raw truth about the only business model that still makes sense in 2024.`
  },
  {
    id: "DEX_002_KARMA",
    title: "Nobody Gets Away With Anything. Ever",
    description: "Three stories from Goldman. Why the universe keeps score.",
    duration: "18:32",
    fullDescription: `Three stories from my time at Goldman Sachs that prove karma is real and inescapable. The universe keeps perfect score, and nobody - NOBODY - gets away with anything. These aren't feel-good morality tales. These are brutal, real stories about what happens when you think you're smarter than the system.`
  },
  {
    id: "DEX_003_INTP_GF",
    title: "Thai Girlfriend Reacts to INTP Personality Type",
    description: 'She calls it "broken brain syndrome". She\'s not wrong.',
    duration: "12:15",
    fullDescription: `My Thai girlfriend discovers what INTP personality type means and her reaction is priceless. She can't understand why anyone would choose to live this way. The cultural clash between Thai emotional intelligence and INTP robot brain is comedy gold.`
  },
  {
    id: "DEX_004_BUDDHIST_AI",
    title: "Thai GF on AI Job Crisis Just Make it Buddhist",
    description: "Her solution to technological unemployment: acceptance and noodles.",
    duration: "9:43",
    fullDescription: `When I explained to my Thai girlfriend that AI will replace 80% of jobs, her solution was simple: 'Just make the AI Buddhist.' Her reasoning is actually brilliant in its simplicity. This is what happens when Eastern philosophy meets Western tech anxiety.`
  },
  {
    id: "DEX_005_BITCOIN_FREEDOM",
    title: "Your Bank Funds Wars. Bitcoin Protects Your Freedom",
    description: "Why I only accept Bitcoin. Recorded at 3am after too much Mekhong.",
    duration: "31:28",
    fullDescription: `A drunk rant at 3am about why I only accept Bitcoin for everything. Your bank funds wars whether you like it or not. Every transaction you make supports a system designed to extract value from you. Bitcoin is the only escape. This is the video that got me banned from three platforms.`
  },
  {
    id: "DEX_006_ESCAPE_VELOCITY",
    title: "Escape Velocity: When $10k/Month Becomes $100k",
    description: "The exponential moment. Why most people never see it coming.",
    duration: "27:11",
    fullDescription: `There's a moment in every successful business where everything changes. I call it escape velocity. It's when $10k/month suddenly becomes $100k/month and you can't explain why. This video breaks down the exact mechanics of exponential growth and why most people quit right before it happens.`
  },
  {
    id: "DEX_007_BANGKOK_NIGHTS",
    title: "Bangkok at 4am: Thoughts on Success and Loneliness",
    description: "What they don't tell you about making it. Recorded from my balcony.",
    duration: "15:56",
    fullDescription: `Recorded at 4am from my Bangkok balcony. The truth about what 'making it' actually feels like. Spoiler: it's not what you think. This is the video I never wanted to make, but needed to. Raw thoughts on success, loneliness, and why paradise can feel like prison.`
  },
  {
    id: "DEX_008_AI_KILL_SWITCH",
    title: "Why I Profit From AI While Writing About Its Extinction Risk",
    description: "The paradox explained. Make money from the thing that might kill us all.",
    duration: "41:22",
    fullDescription: `Yes, I wrote a book about AI killing everyone. Yes, I make money from AI. No, this isn't a contradiction. This video explains why profiting from existential risk is not only logical but necessary. If we have 18 months left, you better make them count.`
  },
]

export default function VideoPlayerPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = params?.id as string
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [relatedVideos, setRelatedVideos] = useState<typeof freeVideos>([])
  
  const video = freeVideos.find(v => v.id === videoId)
  
  useEffect(() => {
    // Get 3 random videos for related section (excluding current)
    const otherVideos = freeVideos.filter(v => v.id !== videoId)
    const shuffled = [...otherVideos].sort(() => 0.5 - Math.random())
    setRelatedVideos(shuffled.slice(0, 3))
  }, [videoId])
  
  if (!video) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <Link href="/videos" className="text-[#00D4FF] hover:text-[#00A8CC]">
            ← Back to videos
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
      {/* Header */}
      <nav className="border-b border-gray-800 bg-[#0A0A0A]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/videos" 
                className="flex items-center space-x-2 text-gray-400 hover:text-[#00D4FF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to videos</span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <CrossDomainLink 
                href="https://theaikillswitch.com" 
                className="text-gray-300 hover:text-[#00D4FF] transition-colors font-medium"
              >
                Free Book
              </CrossDomainLink>
              <Link href="/" className="text-gray-300 hover:text-[#00D4FF] transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 relative group">
              {!isPlaying ? (
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#00D4FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00D4FF]/30 transition-colors">
                      <Play className="w-10 h-10 text-[#00D4FF] ml-1" />
                    </div>
                    <p className="text-gray-400">Click to play</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <p className="text-gray-500">Video player would load here</p>
                </div>
              )}
              
              {/* Duration overlay */}
              <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-xs text-gray-300">
                {video.duration}
              </div>
            </div>
            
            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-100">
                {video.title}
              </h1>
              
              {video.featured && (
                <div className="inline-flex items-center px-3 py-1 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded text-sm text-[#00D4FF]">
                  FEATURED VIDEO
                </div>
              )}
              
              <div className="text-sm text-gray-400">
                Duration: {video.duration}
              </div>
              
              {/* Full Description */}
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">About this video</h2>
                <div className="text-gray-300 space-y-4 whitespace-pre-line">
                  {video.fullDescription || video.description}
                </div>
                
                {video.id === "DEX_001_GPU_ARBITRAGE" && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <p className="text-sm text-gray-400">
                      Resources mentioned: I source GPUs from <CrossDomainLink href="https://arbvault.io?aff=dexv" className="text-[#00D4FF] hover:text-[#00A8CC]">Arbvault.io</CrossDomainLink> (use code DEX5 for 5% off)
                    </p>
                  </div>
                )}
              </div>
              
              {/* Call to Action */}
              <Card className="bg-gradient-to-r from-[#00D4FF]/10 to-transparent border-[#00D4FF]/30 p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-2">Want more content like this?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Get my free book on AI extinction risk, or check out the premium vault for 400+ exclusive videos.
                </p>
                <div className="flex flex-wrap gap-3">
                  <CrossDomainLink 
                    href="https://theaikillswitch.com"
                    className="px-4 py-2 bg-[#00D4FF] text-[#0A0A0A] rounded-lg font-semibold hover:bg-[#00A8CC] hover:text-white transition-all text-sm"
                  >
                    Get Free Book →
                  </CrossDomainLink>
                  <Link 
                    href="/videos/premium"
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
                  >
                    View Premium Video Vault
                  </Link>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link href={`/videos/watch/${relatedVideo.id}`} key={relatedVideo.id}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-[#00D4FF]/30 transition-all duration-300 cursor-pointer group">
                    <div className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-3 flex items-center justify-center group-hover:from-[#00D4FF]/10 group-hover:to-gray-900 transition-all">
                        <Play className="w-8 h-8 text-[#00D4FF] opacity-70 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-medium text-sm text-gray-100 leading-tight group-hover:text-[#00D4FF] transition-colors line-clamp-2">
                        {relatedVideo.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2">{relatedVideo.duration}</p>
                    </div>
                  </Card>
                </Link>
              ))}
              
              {/* Premium Videos Teaser */}
              <Card className="bg-gray-900/30 border-gray-700 p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Lock className="w-4 h-4 text-[#00D4FF]" />
                  <h3 className="font-medium text-sm text-gray-100">Premium Vault</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  400+ exclusive videos on AI, arbitrage, and escaping the collapse
                </p>
                <Link 
                  href="/videos#premium"
                  className="text-xs text-[#00D4FF] hover:text-[#00A8CC] transition-colors"
                >
                  View all premium videos →
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}