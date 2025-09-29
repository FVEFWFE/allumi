"use client"
import { useState, useEffect, useRef } from "react"

interface ImageCyclerProps {
  images?: string[]
  singleImage?: string
  className?: string
  opacity?: number
  pauseOnHover?: boolean
}

export function ImageCycler({ images, singleImage, className = "", opacity = 0.08, pauseOnHover = false }: ImageCyclerProps) {
  // Start at a random index so not all cycling backgrounds start on the same image
  const [currentIndex, setCurrentIndex] = useState(() => {
    const imgs = images || (singleImage ? [singleImage] : [])
    return imgs.length > 1 ? Math.floor(Math.random() * imgs.length) : 0
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const imagesToUse = images || (singleImage ? [singleImage] : [])
  
  // Preload all images
  useEffect(() => {
    if (imagesToUse.length === 0) return
    
    const loadPromises = imagesToUse.map((src) => {
      return new Promise<void>((resolve) => {
        if (loadedImages.has(src)) {
          resolve()
          return
        }
        
        const img = new Image()
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(src))
          resolve()
        }
        img.onerror = () => resolve() // Continue even if an image fails
        img.src = src
      })
    })
    
    Promise.all(loadPromises).then(() => {
      setIsLoaded(true)
    })
  }, [imagesToUse, loadedImages])
  
  // Cycle through images with staggered timing
  useEffect(() => {
    if (!isLoaded || imagesToUse.length <= 1 || isPaused) return
    
    // Add a random delay between 0-2 seconds to stagger animations across different links
    const randomDelay = Math.random() * 2000
    
    const startCycling = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % imagesToUse.length)
        }
      }, 5000) // Change every 5 seconds for less intrusive cycling
    }, randomDelay)
    
    return () => {
      clearTimeout(startCycling)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isLoaded, imagesToUse.length, isPaused])
  
  if (!isLoaded || imagesToUse.length === 0) {
    return null // Don't render anything until images are loaded
  }
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {imagesToUse.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: index === currentIndex ? opacity : 0,
            filter: "blur(0.5px)",
            transition: "opacity 3s ease-in-out", // Very smooth 3 second transition
            zIndex: 0,
          }}
        />
      ))}
    </div>
  )
}