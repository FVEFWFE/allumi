"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SplashCursorProps {
  SIM_RESOLUTION?: number
  DYE_RESOLUTION?: number
  CAPTURE_RESOLUTION?: number
  DENSITY_DISSIPATION?: number
  VELOCITY_DISSIPATION?: number
  PRESSURE?: number
  PRESSURE_ITERATIONS?: number
  CURL?: number
  SPLAT_RADIUS?: number
  SPLAT_FORCE?: number
  SHADING?: boolean
  COLOR_UPDATE_SPEED?: number
  BACK_COLOR?: { r: number; g: number; b: number }
  TRANSPARENT?: boolean
}

const SplashCursor: React.FC<SplashCursorProps> = ({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 1,
  VELOCITY_DISSIPATION = 0.2,
  PRESSURE = 0.8,
  PRESSURE_ITERATIONS = 20,
  CURL = 30,
  SPLAT_RADIUS = 0.25,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) return

    // Simplified fluid simulation implementation
    const pointer = { x: 0, y: 0, dx: 0, dy: 0, down: false }
    let lastTime = Date.now()

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height

      pointer.dx = x - pointer.x
      pointer.dy = y - pointer.y
      pointer.x = x
      pointer.y = y
    }

    const render = () => {
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Clear canvas with transparent background
      gl.clearColor(BACK_COLOR.r, BACK_COLOR.g, BACK_COLOR.b, TRANSPARENT ? 0 : 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Simple particle effect on mouse movement
      if (Math.abs(pointer.dx) > 0.01 || Math.abs(pointer.dy) > 0.01) {
        // Create splash effect
        const intensity = Math.min(Math.sqrt(pointer.dx * pointer.dx + pointer.dy * pointer.dy) * 10, 1)

        // Simple color based on movement
        gl.clearColor(intensity * 0.2, intensity * 0.4, intensity * 0.8, 0.1)
      }

      pointer.dx *= 0.95
      pointer.dy *= 0.95

      requestAnimationFrame(render)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handlePointerMove)

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handlePointerMove)
    }
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    BACK_COLOR,
    TRANSPARENT,
  ])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" style={{ mixBlendMode: "screen" }} />
}

export default SplashCursor
