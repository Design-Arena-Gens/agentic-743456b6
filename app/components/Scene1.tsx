'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SceneProps {
  scrollProgress: MotionValue<number>
}

export default function Scene1({ scrollProgress }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.2], [1, 1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Draw world map stylized
    const drawWorldMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background grain
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 10
        imageData.data[i] = noise
        imageData.data[i + 1] = noise
        imageData.data[i + 2] = noise
        imageData.data[i + 3] = 8
      }
      ctx.putImageData(imageData, 0, 0)

      // Glow effect
      ctx.shadowBlur = 30
      ctx.shadowColor = '#d4af37'

      // Draw continents (simplified)
      const continents = [
        // North America
        { x: canvas.width * 0.25, y: canvas.height * 0.35, w: 180, h: 140 },
        // South America
        { x: canvas.width * 0.3, y: canvas.height * 0.55, w: 100, h: 160 },
        // Europe
        { x: canvas.width * 0.5, y: canvas.height * 0.32, w: 90, h: 70 },
        // Africa
        { x: canvas.width * 0.52, y: canvas.height * 0.45, w: 120, h: 150 },
        // Asia
        { x: canvas.width * 0.65, y: canvas.height * 0.35, w: 200, h: 130 },
        // Australia
        { x: canvas.width * 0.75, y: canvas.height * 0.62, w: 100, h: 80 },
      ]

      continents.forEach((cont, idx) => {
        ctx.fillStyle = `rgba(26, 115, 109, ${0.3 + idx * 0.05})`
        ctx.beginPath()
        ctx.ellipse(cont.x, cont.y, cont.w / 2, cont.h / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        // Economic icons
        ctx.fillStyle = '#d4af37'
        ctx.font = '24px Arial'
        ctx.fillText('$', cont.x - 10, cont.y)
      })

      // Title
      ctx.shadowBlur = 20
      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 48px Helvetica'
      ctx.textAlign = 'center'
      ctx.fillText('THE WORLD OF 1969', canvas.width / 2, canvas.height * 0.15)

      ctx.font = '20px Helvetica'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('An Economic Documentary', canvas.width / 2, canvas.height * 0.19)
    }

    drawWorldMap()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawWorldMap()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.section
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </motion.section>
  )
}
