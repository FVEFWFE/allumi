"use client"

import SplashCursor from "@/components/splash-cursor"
import { useState, useEffect } from "react"

export default function DemoPage() {
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

      {/* Vignette overlay for edge darkening */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `radial-gradient(ellipse at center,
            transparent 0%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.7) 80%,
            rgba(0,0,0,0.9) 100%)`,
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

        {/* Main LinkTree Content - Built Manually */}
        <div style={{
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto',
          padding: '20px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}>

          {/* Paradise Header Banner */}
          <div style={{
            marginBottom: '32px',
            padding: '16px',
            backgroundColor: 'rgba(0, 50, 100, 0.4)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '16px',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
          }}>
            <p style={{ color: '#22d3ee', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              🌴 Living The Dream in Pattaya, Thailand 🌴
            </p>
            <p style={{ color: '#f3f4f6', fontSize: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              Natural POV Content • No Fake Scenes • Real Paradise Life
            </p>
          </div>

          {/* Profile Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', textShadow: '0 4px 8px rgba(0,0,0,0.9)' }}>
              Bas Palms
            </h1>
            <p style={{ fontSize: '18px', color: '#e5e7eb', marginBottom: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Paradise Lifestyle • $30K/Month Empire
            </p>
            <div style={{
              fontSize: '14px',
              color: '#f9fafb',
              marginBottom: '8px',
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.1)',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>
              📍 Pattaya, Thailand | 🎬 POV Content Creator
            </div>
          </div>

          {/* Main Links */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#00D4FF' }}>
              💰 MAIN CONTENT
            </h2>

            {/* Link 1 */}
            <a href="https://manyvids.com/BasPalms"
               style={{
                 display: 'block',
                 padding: '20px',
                 marginBottom: '12px',
                 backgroundColor: 'rgba(0, 50, 150, 0.4)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(0, 123, 255, 0.4)',
                 borderRadius: '12px',
                 textDecoration: 'none',
                 color: 'white',
                 transition: 'all 0.3s',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(0, 50, 150, 0.6)';
                 e.currentTarget.style.transform = 'translateY(-2px)';
                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 123, 255, 0.4)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(0, 50, 150, 0.4)';
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
               }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                🔥 Natural POV Content - ManyVids
              </div>
              <div style={{ fontSize: '14px', color: '#e5e7eb', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                100% authentic POV from my glasses. No fake moaning. No staging. Just real paradise life with Thai models.
              </div>
            </a>

            {/* Link 2 - Fansly */}
            <a href="https://fansly.com/BasPalms"
               style={{
                 display: 'block',
                 padding: '20px',
                 marginBottom: '12px',
                 backgroundColor: 'rgba(0, 100, 150, 0.4)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(0, 212, 255, 0.4)',
                 borderRadius: '12px',
                 textDecoration: 'none',
                 color: 'white',
                 transition: 'all 0.3s',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.2)';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                💎 Exclusive Content - Fansly
              </div>
              <div style={{ fontSize: '14px', color: '#e5e7eb', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                Premium POV content. Behind the scenes. Raw uncut footage from paradise.
              </div>
            </a>

            {/* Link 3 - YouTube */}
            <a href="https://youtube.com/@BasPalms?sub_confirmation=1"
               style={{
                 display: 'block',
                 padding: '20px',
                 marginBottom: '12px',
                 backgroundColor: 'rgba(150, 0, 0, 0.4)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(255, 0, 0, 0.4)',
                 borderRadius: '12px',
                 textDecoration: 'none',
                 color: 'white',
                 transition: 'all 0.3s',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                🎬 YouTube - Lifestyle Vlogs
              </div>
              <div style={{ fontSize: '14px', color: '#e5e7eb', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                Thailand paradise lifestyle. Dating culture. Building wealth abroad. The real unfiltered truth.
              </div>
            </a>
          </div>

          {/* Model Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#FF69B4' }}>
              👯‍♀️ FEATURED MODELS
            </h2>

            {/* Model 1 - Gaylagirl */}
            <a href="https://onlyfans.com/gaylagirl2007"
               style={{
                 display: 'block',
                 padding: '20px',
                 marginBottom: '12px',
                 backgroundColor: 'rgba(150, 20, 100, 0.4)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(255, 20, 147, 0.4)',
                 borderRadius: '12px',
                 textDecoration: 'none',
                 color: 'white',
                 transition: 'all 0.3s',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(255, 20, 147, 0.2)';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(255, 20, 147, 0.1)';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                🔥 Gaylagirl2007 - Thai Star
              </div>
              <div style={{ fontSize: '14px', color: '#e5e7eb', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                My top performer. Authentic Thai beauty. Natural content. $20K/month star.
              </div>
              <div style={{
                fontSize: '12px',
                color: '#fde047',
                marginTop: '8px',
                textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(250,204,21,0.3)',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}>
                ⭐ TOP 0.5% CREATOR
              </div>
            </a>

            {/* Model 2 - Kenya Models */}
            <a href="https://linktr.ee/KenyaModels"
               style={{
                 display: 'block',
                 padding: '20px',
                 marginBottom: '12px',
                 backgroundColor: 'rgba(20, 100, 50, 0.4)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(34, 197, 94, 0.4)',
                 borderRadius: '12px',
                 textDecoration: 'none',
                 color: 'white',
                 transition: 'all 0.3s',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                🌍 Kenya Collection (Coming Soon)
              </div>
              <div style={{ fontSize: '14px', color: '#f9fafb', textShadow: '0 2px 6px rgba(0,0,0,0.9)', fontWeight: '400' }}>
                Expansion into Africa. Natural beauties. Authentic content.
              </div>
            </a>
          </div>

          {/* Business & Coaching */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#FFD700' }}>
              💼 LEARN THE BUSINESS
            </h2>

            <a href="https://calendly.com/baspalms"
               style={{
                 display: 'block',
                 padding: '20px',
                 marginBottom: '12px',
                 backgroundColor: 'rgba(150, 100, 0, 0.4)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(255, 215, 0, 0.4)',
                 borderRadius: '12px',
                 textDecoration: 'none',
                 color: 'white',
                 transition: 'all 0.3s',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2))';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                📅 1-on-1 Coaching ($500/hour)
              </div>
              <div style={{ fontSize: '14px', color: '#f9fafb', textShadow: '0 2px 6px rgba(0,0,0,0.9)', fontWeight: '400' }}>
                Learn how I built a $30K/month adult content empire from Thailand.
              </div>
              <div style={{
                fontSize: '12px',
                color: '#67e8f9',
                marginTop: '8px',
                textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(34,211,238,0.3)',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}>
                Limited Spots Available
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#FF00FF' }}>
              📱 SOCIAL MEDIA
            </h2>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://reddit.com/u/BasPalms"
                 style={{
                   flex: '1',
                   minWidth: '150px',
                   padding: '12px',
                   backgroundColor: 'rgba(150, 40, 0, 0.4)',
                   backdropFilter: 'blur(15px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(15px) saturate(180%)',
                   border: '1px solid rgba(255, 69, 0, 0.4)',
                   borderRadius: '8px',
                   textAlign: 'center',
                   textDecoration: 'none',
                   color: 'white',
                   transition: 'all 0.3s',
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                   fontWeight: 'bold',
                   textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                 }}>
                🏴‍☠️ Reddit
              </a>

              <a href="https://twitter.com/BasPalms"
                 style={{
                   flex: '1',
                   minWidth: '150px',
                   padding: '12px',
                   backgroundColor: 'rgba(20, 80, 120, 0.4)',
                   backdropFilter: 'blur(15px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(15px) saturate(180%)',
                   border: '1px solid rgba(29, 161, 242, 0.4)',
                   borderRadius: '8px',
                   textAlign: 'center',
                   textDecoration: 'none',
                   color: 'white',
                   transition: 'all 0.3s',
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                   fontWeight: 'bold',
                   textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                 }}>
                🐦 Twitter/X
              </a>

              <a href="https://instagram.com/BasPalms"
                 style={{
                   flex: '1',
                   minWidth: '150px',
                   padding: '12px',
                   backgroundColor: 'rgba(150, 30, 80, 0.4)',
                   backdropFilter: 'blur(15px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(15px) saturate(180%)',
                   border: '1px solid rgba(224, 48, 108, 0.4)',
                   borderRadius: '8px',
                   textAlign: 'center',
                   textDecoration: 'none',
                   color: 'white',
                   transition: 'all 0.3s',
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                   fontWeight: 'bold',
                   textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                 }}>
                📸 Instagram
              </a>

              <a href="https://discord.gg/baspalms"
                 style={{
                   flex: '1',
                   minWidth: '150px',
                   padding: '12px',
                   backgroundColor: 'rgba(50, 50, 120, 0.4)',
                   backdropFilter: 'blur(15px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(15px) saturate(180%)',
                   border: '1px solid rgba(88, 101, 242, 0.4)',
                   borderRadius: '8px',
                   textAlign: 'center',
                   textDecoration: 'none',
                   color: 'white',
                   transition: 'all 0.3s',
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                   fontWeight: 'bold',
                   textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                 }}>
                💬 Discord
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            padding: '40px 20px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '14px'
          }}>
            <p style={{
              marginBottom: '8px',
              color: '#f3f4f6',
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.1)',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>
              📍 Living in Pattaya, Thailand 🇹🇭
            </p>
            <p style={{
              marginBottom: '16px',
              color: '#f3f4f6',
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.1)',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>
              Building a $1M/year adult content empire
            </p>
            <p style={{
              fontSize: '12px',
              color: '#e5e7eb',
              textShadow: '0 1px 6px rgba(0,0,0,0.8)',
              opacity: 0.9,
              letterSpacing: '0.2px'
            }}>
              © 2024 Bas Palms • Paradise Lifestyle
            </p>
          </div>

        </div>
      </div>
    </>
  );
}