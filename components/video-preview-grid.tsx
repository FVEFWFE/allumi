"use client"

import { Play } from "lucide-react"

const videoThumbnails = [
  {
    id: "1",
    title: "Thai GF on AI Jobs Crisis: 'Just Make AI Buddhist'",
    duration: "9:43",
    featured: false,
    thumbnail: "/images/THUMB4.png",
  },
  {
    id: "2",
    title: "Thai GF Furnished Our Seaview Condo in One Day",
    duration: "14:23",
    featured: true,
    thumbnail: "/images/Thai GF Furnished Our Seaview Condo in One Day-Cover.jpg",
  },
  {
    id: "3",
    title: "You Don't Get Away With Anything. Ever?",
    duration: "23:47",
    thumbnail: "/images/morality-selfish.png",
  },
  {
    id: "4",
    title: "Nobody Gets Away With Anything. Ever",
    duration: "18:32",
  },
  {
    id: "5",
    title: "Escape Velocity: $10k to $100k",
    duration: "27:11",
  },
  {
    id: "6",
    title: "Bangkok at 4am: Success & Loneliness",
    duration: "15:56",
  },
]

export default function VideoPreviewGrid() {
  return (
    <div 
      className="w-full mt-2 mb-2"
    >
      {/* Grid Container without full-grid hover effect */}
      <div className="relative video-preview-enter">
        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-black/20 rounded-md border border-gray-800/30 transition-all duration-300">
          {videoThumbnails.slice(0, 3).map((video, index) => (
            <div
              key={video.id}
              className="relative aspect-video bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded overflow-hidden group/video cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#00D4FF]/20"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              onClick={() => window.open('https://youtube.com/@DexVolkov?sub_confirmation=1', '_blank')}
            >
              {/* Thumbnail or gradient background */}
              {video.thumbnail ? (
                <>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/0 transition-colors duration-300" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300" />
              )}
              
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-6 h-6 ${video.thumbnail ? 'bg-black/60' : 'bg-black/50'} rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform duration-300`}>
                  <Play 
                    className={`w-3 h-3 ${video.thumbnail ? 'text-white/90' : 'text-[#00D4FF]/70'} ${video.thumbnail ? 'fill-white/90' : 'fill-[#00D4FF]/70'}`} 
                    style={{ filter: 'drop-shadow(0 0 1px black) drop-shadow(0 0 1px black)' }}
                  />
                </div>
              </div>
              
              {/* Duration badge */}
              <div className="absolute bottom-0.5 right-0.5 px-0.5 py-0 bg-black/70 rounded text-[8px] text-gray-300 font-mono">
                {video.duration}
              </div>
              
              {/* Featured badge */}
              {video.featured && (
                <div className="absolute top-0.5 left-0.5 px-0.5 py-0 bg-[#00D4FF]/20 border border-[#00D4FF]/30 rounded text-[7px] text-[#00D4FF] font-bold">
                  HOT
                </div>
              )}
              
              {/* Title on hover */}
              <div className="absolute inset-x-0 bottom-0 p-0.5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                <p className="text-[7px] text-white/90 line-clamp-2 leading-tight">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}