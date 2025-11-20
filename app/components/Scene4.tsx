'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SceneProps {
  scrollProgress: MotionValue<number>
}

export default function Scene4({ scrollProgress }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacity = useTransform(scrollProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawGDPMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Depth effect background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      )
      gradient.addColorStop(0, 'rgba(26, 115, 109, 0.1)')
      gradient.addColorStop(1, 'rgba(10, 14, 26, 0.9)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // World regions with GDP data
      const regions = [
        { name: 'North America', x: canvas.width * 0.25, y: canvas.height * 0.4, gdp: '-2.1%', size: 180 },
        { name: 'South America', x: canvas.width * 0.3, y: canvas.height * 0.65, gdp: '+3.8%', size: 120 },
        { name: 'Europe', x: canvas.width * 0.52, y: canvas.height * 0.35, gdp: '+1.2%', size: 140 },
        { name: 'Africa', x: canvas.width * 0.55, y: canvas.height * 0.58, gdp: '+4.1%', size: 130 },
        { name: 'Asia', x: canvas.width * 0.72, y: canvas.height * 0.4, gdp: '+5.3%', size: 200 },
        { name: 'Oceania', x: canvas.width * 0.78, y: canvas.height * 0.65, gdp: '+3.5%', size: 90 },
      ]

      regions.forEach((region) => {
        // Glowing region
        ctx.shadowBlur = 35
        ctx.shadowColor = region.gdp.startsWith('-') ? '#8b4513' : '#1a736d'
        ctx.fillStyle = region.gdp.startsWith('-')
          ? 'rgba(139, 69, 19, 0.3)'
          : 'rgba(26, 115, 109, 0.4)'
        ctx.beginPath()
        ctx.arc(region.x, region.y, region.size / 2, 0, Math.PI * 2)
        ctx.fill()

        // GDP numbers
        ctx.shadowBlur = 25
        ctx.fillStyle = region.gdp.startsWith('-') ? '#d4af37' : '#1a736d'
        ctx.font = 'bold 32px Helvetica'
        ctx.textAlign = 'center'
        ctx.fillText(region.gdp, region.x, region.y - 10)

        // Region names
        ctx.shadowBlur = 0
        ctx.fillStyle = '#d4af37'
        ctx.font = '16px Helvetica'
        ctx.fillText(region.name, region.x, region.y + 20)

        // Economic icons
        ctx.font = '24px Arial'
        ctx.fillText(region.gdp.startsWith('-') ? '📉' : '📈', region.x, region.y + 50)
      })

      // Title
      ctx.shadowBlur = 25
      ctx.shadowColor = '#d4af37'
      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 46px Helvetica'
      ctx.textAlign = 'center'
      ctx.fillText('GLOBAL GDP SLOWDOWN', canvas.width / 2, 80)

      ctx.font = '20px Helvetica'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('Economic Growth by Region — 1969', canvas.width / 2, 115)

      // Info box
      const boxX = canvas.width / 2 - 250
      const boxY = canvas.height - 120

      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(26, 115, 109, 0.2)'
      ctx.fillRect(boxX, boxY, 500, 80)

      ctx.fillStyle = '#1a736d'
      ctx.font = '14px Helvetica'
      ctx.textAlign = 'left'
      ctx.fillText('The global economy faced headwinds as the U.S. entered recession.', boxX + 20, boxY + 30)
      ctx.fillText('Tight monetary policy and inflation curbed growth across developed nations.', boxX + 20, boxY + 55)
    }

    drawGDPMap()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGDPMap()
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
