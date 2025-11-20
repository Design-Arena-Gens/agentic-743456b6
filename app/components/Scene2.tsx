'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SceneProps {
  scrollProgress: MotionValue<number>
}

export default function Scene2({ scrollProgress }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacity = useTransform(scrollProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0])
  const scale = useTransform(scrollProgress, [0.15, 0.2], [0.8, 1])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawInflationChart = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const chartWidth = Math.min(canvas.width * 0.7, 800)
      const chartHeight = Math.min(canvas.height * 0.5, 400)
      const startX = centerX - chartWidth / 2
      const startY = centerY + chartHeight / 2

      // Background vignette
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height) / 2
      )
      gradient.addColorStop(0, 'rgba(10, 14, 26, 0)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      ctx.strokeStyle = 'rgba(26, 115, 109, 0.2)'
      ctx.lineWidth = 1

      for (let i = 0; i <= 5; i++) {
        ctx.beginPath()
        ctx.moveTo(startX, startY - (chartHeight / 5) * i)
        ctx.lineTo(startX + chartWidth, startY - (chartHeight / 5) * i)
        ctx.stroke()
      }

      // Inflation curve data points
      const inflationData = [
        { year: '1965', rate: 1.6, x: 0 },
        { year: '1966', rate: 2.9, x: 0.2 },
        { year: '1967', rate: 3.1, x: 0.4 },
        { year: '1968', rate: 4.2, x: 0.6 },
        { year: '1969', rate: 5.5, x: 0.8 },
        { year: '1970', rate: 5.7, x: 1.0 },
      ]

      // Draw glowing curve
      ctx.shadowBlur = 25
      ctx.shadowColor = '#d4af37'
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 4
      ctx.beginPath()

      inflationData.forEach((point, i) => {
        const x = startX + chartWidth * point.x
        const y = startY - (point.rate / 6) * chartHeight
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw data points
      inflationData.forEach((point) => {
        const x = startX + chartWidth * point.x
        const y = startY - (point.rate / 6) * chartHeight

        ctx.shadowBlur = 20
        ctx.fillStyle = '#d4af37'
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Labels
        ctx.shadowBlur = 0
        ctx.fillStyle = '#1a736d'
        ctx.font = '14px Helvetica'
        ctx.textAlign = 'center'
        ctx.fillText(point.year, x, startY + 30)

        ctx.fillStyle = '#d4af37'
        ctx.fillText(`${point.rate}%`, x, y - 20)
      })

      // Title
      ctx.shadowBlur = 20
      ctx.shadowColor = '#d4af37'
      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 42px Helvetica'
      ctx.textAlign = 'center'
      ctx.fillText('INFLATION RISING', centerX, centerY - chartHeight / 2 - 60)

      ctx.font = '18px Helvetica'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('Consumer Price Index 1965-1970', centerX, centerY - chartHeight / 2 - 30)
    }

    drawInflationChart()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawInflationChart()
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
        scale,
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
