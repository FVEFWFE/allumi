"use client"

import SplashCursor from "@/components/splash-cursor"
import { useState, useEffect } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      {/* Background Layer with enhanced visibility */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/collage-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
          zIndex: 0,
          filter: 'brightness(0.7) contrast(1.2)',
        }}
      />

      {/* Enhanced vignette overlay for edge darkening */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `radial-gradient(ellipse at center,
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.4) 40%,
            rgba(0,0,0,0.75) 70%,
            rgba(0,0,0,0.95) 100%)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          padding: '0',
          color: 'white',
        }}
      >
        <SplashCursor />

        {/* Main LinkTree Content */}
        <div style={{
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto',
          padding: '20px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)'
        }}>

          {/* Paradise Header Banner with feminine touch */}
          <div style={{
            marginBottom: '32px',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRadius: '16px',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
          }}>
            <p style={{ color: '#f9a8d4', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', textShadow: '0 3px 6px rgba(0,0,0,0.95)' }}>
              🌸 Village Girl in the City • Chasing Dreams 🌸
            </p>
            <p style={{ color: '#f3f4f6', fontSize: '12px', textShadow: '0 2px 5px rgba(0,0,0,0.95)' }}>
              Shy but curious • Matcha & anime lover • Your support means everything
            </p>
          </div>

          {/* Profile Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            {/* Profile Photo */}
            <div style={{
              width: '150px',
              height: '150px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid rgba(236, 72, 153, 0.4)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))',
            }}>
              <img
                src="/allumi-profile.png"
                alt="TinyAllumi"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  e.currentTarget.src = '/placeholder-user.jpg'
                }}
              />
            </div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              letterSpacing: '-1px'
            }}>
              TinyAllumi
            </h1>
            <p style={{
              color: '#e5e7eb',
              fontSize: '18px',
              marginBottom: '20px',
              textShadow: '0 3px 6px rgba(0,0,0,0.9)'
            }}>
              22 • Thai • Village girl 🌾
            </p>
            <div style={{ marginBottom: '24px', lineHeight: '1.8' }}>
              <p style={{
                color: '#f9a8d4',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                textShadow: '0 2px 5px rgba(0,0,0,0.8)'
              }}>
                Top 0.1% Creator 💕 Still learning
              </p>
              <p style={{
                color: '#e5e7eb',
                fontSize: '14px',
                lineHeight: '1.8',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
                Moved from countryside to Bangkok<br/>
                Sharing my journey with you<br/>
                Dog mom wannabe 🐕 • Anime addict
              </p>
            </div>
          </div>

          {/* Primary Adult Platform Links */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#f9a8d4',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '0 3px 6px rgba(0,0,0,0.95)'
            }}>
              💗 Exclusive Content 💗
            </h2>

            {/* Fansly - Primary */}
            <a href="https://fansly.com/TinyAllumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(251, 113, 133, 0.9))',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(251, 113, 133, 0.5)',
                boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(236, 72, 153, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(236, 72, 153, 0.4)'
              }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  💕 Fansly - Support My Journey
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.95, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Help me stay in the city • Intimate moments • I reply to everyone
                </p>
              </div>
              <span style={{ fontSize: '24px' }}>→</span>
            </a>

            {/* ManyVids */}
            <a href="https://www.manyvids.com/Profile/1007434020/TinyAllumi/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(168, 85, 247, 0.4)',
                boxShadow: '0 6px 20px rgba(168, 85, 247, 0.3)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(168, 85, 247, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  📹 ManyVids Store
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  My first videos • Still shy • Learning what you like
                </p>
              </div>
              <span style={{ fontSize: '20px' }}>→</span>
            </a>

            {/* PornHub */}
            <a href="https://www.pornhub.com/model/tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                marginBottom: '12px',
                backgroundColor: 'rgba(255, 144, 0, 0.85)',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(255, 144, 0, 0.5)',
                boxShadow: '0 6px 20px rgba(255, 144, 0, 0.3)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(255, 144, 0, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 144, 0, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  🔥 PornHub Channel
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Free previews • Please be gentle with comments
                </p>
              </div>
              <span style={{ fontSize: '20px' }}>→</span>
            </a>
          </div>

          {/* Social Media Links */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#f9a8d4',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '0 3px 6px rgba(0,0,0,0.95)'
            }}>
              Follow My Journey
            </h2>

            {/* Instagram */}
            <a href="https://instagram.com/tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px',
                marginBottom: '10px',
                background: 'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(221, 42, 123, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(221, 42, 123, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(221, 42, 123, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  📸 Instagram
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Daily lifestyle & behind the scenes
                </p>
              </div>
              <span style={{ fontSize: '18px' }}>→</span>
            </a>

            {/* Twitter */}
            <a href="https://twitter.com/tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px',
                marginBottom: '10px',
                backgroundColor: 'rgba(29, 161, 242, 0.85)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(29, 161, 242, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(29, 161, 242, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(29, 161, 242, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  🐦 Twitter / X
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Spicy updates & previews
                </p>
              </div>
              <span style={{ fontSize: '18px' }}>→</span>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/@tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px',
                marginBottom: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(255, 0, 80, 0.5)',
                boxShadow: '0 4px 16px rgba(255, 0, 80, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 0, 80, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 0, 80, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  🎵 TikTok
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Dance & lifestyle content
                </p>
              </div>
              <span style={{ fontSize: '18px' }}>→</span>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com/@tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px',
                marginBottom: '10px',
                backgroundColor: 'rgba(255, 0, 0, 0.85)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(255, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 0, 0, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 0, 0, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  📺 YouTube
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Thailand travel & lifestyle vlogs
                </p>
              </div>
              <span style={{ fontSize: '18px' }}>→</span>
            </a>
          </div>

          {/* Sugar/Support Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#f9a8d4',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '0 3px 6px rgba(0,0,0,0.95)'
            }}>
              Help Me Achieve My Dreams
            </h2>

            {/* Wishlist */}
            <a href="https://throne.me/tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px',
                marginBottom: '10px',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.85), rgba(245, 158, 11, 0.85))',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(251, 191, 36, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(251, 191, 36, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  🎁 My Wishlist
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Help me get my first dog! 🐕
                </p>
              </div>
              <span style={{ fontSize: '18px' }}>→</span>
            </a>

            {/* Telegram Community */}
            <a href="https://t.me/tinyallumi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px',
                marginBottom: '10px',
                backgroundColor: 'rgba(0, 136, 204, 0.85)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0, 136, 204, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 136, 204, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 136, 204, 0.3)'
              }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  💬 Telegram Community
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Free chat & exclusive updates
                </p>
              </div>
              <span style={{ fontSize: '18px' }}>→</span>
            </a>
          </div>

          {/* Cross-Promotion */}
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.6), rgba(60, 30, 60, 0.6))',
            borderRadius: '12px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#e5e7eb', fontSize: '14px', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              🎬 My boyfriend helps me film
            </p>
            <a href="https://baspalms.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#a78bfa',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c084fc'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a78bfa'
                e.currentTarget.style.transform = 'scale(1)'
              }}>
              BasPalms.com
            </a>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#9ca3af',
            fontSize: '12px'
          }}>
            <p style={{ marginBottom: '8px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              © 2025 TinyAllumi • All Rights Reserved
            </p>
            <p style={{ fontSize: '11px', opacity: 0.8, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              Village girl trying her best in the big city 🌾
            </p>
          </div>
        </div>
      </div>
    </>
  )
}