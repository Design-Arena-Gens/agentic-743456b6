'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SceneProps {
  scrollProgress: MotionValue<number>
}

export default function Scene3({ scrollProgress }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacity = useTransform(scrollProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0])
  const y = useTransform(scrollProgress, [0.35, 0.4], [50, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawInterestRates = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const chartWidth = Math.min(canvas.width * 0.75, 900)
      const chartHeight = Math.min(canvas.height * 0.5, 400)
      const startX = centerX - chartWidth / 2
      const startY = centerY + chartHeight / 2

      // Grid
      ctx.strokeStyle = 'rgba(26, 115, 109, 0.15)'
      ctx.lineWidth = 1

      for (let i = 0; i <= 10; i++) {
        ctx.beginPath()
        ctx.moveTo(startX, startY - (chartHeight / 10) * i)
        ctx.lineTo(startX + chartWidth, startY - (chartHeight / 10) * i)
        ctx.stroke()
      }

      // Interest rate data
      const months = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Dec']
      const fedRate = [5.5, 5.75, 6.0, 6.5, 7.0, 8.0, 8.5]
      const marketRate = [6.0, 6.25, 6.5, 7.0, 7.5, 8.5, 9.0]

      // Draw Federal Rate (teal)
      ctx.shadowBlur = 20
      ctx.shadowColor = '#1a736d'
      ctx.strokeStyle = '#1a736d'
      ctx.lineWidth = 3
      ctx.beginPath()

      fedRate.forEach((rate, i) => {
        const x = startX + (chartWidth / (fedRate.length - 1)) * i
        const y = startY - (rate / 10) * chartHeight
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw Market Rate (gold)
      ctx.shadowColor = '#d4af37'
      ctx.strokeStyle = '#d4af37'
      ctx.beginPath()

      marketRate.forEach((rate, i) => {
        const x = startX + (chartWidth / (marketRate.length - 1)) * i
        const y = startY - (rate / 10) * chartHeight
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Data points and labels
      months.forEach((month, i) => {
        const x = startX + (chartWidth / (months.length - 1)) * i

        // Federal rate point
        const fedY = startY - (fedRate[i] / 10) * chartHeight
        ctx.shadowBlur = 15
        ctx.fillStyle = '#1a736d'
        ctx.beginPath()
        ctx.arc(x, fedY, 6, 0, Math.PI * 2)
        ctx.fill()

        // Market rate point
        const marketY = startY - (marketRate[i] / 10) * chartHeight
        ctx.fillStyle = '#d4af37'
        ctx.beginPath()
        ctx.arc(x, marketY, 6, 0, Math.PI * 2)
        ctx.fill()

        // Month labels
        ctx.shadowBlur = 0
        ctx.fillStyle = '#1a736d'
        ctx.font = '14px Helvetica'
        ctx.textAlign = 'center'
        ctx.fillText(month, x, startY + 30)
      })

      // Legend
      ctx.shadowBlur = 0
      ctx.fillStyle = '#1a736d'
      ctx.fillRect(startX, startY - chartHeight - 60, 20, 3)
      ctx.font = '16px Helvetica'
      ctx.textAlign = 'left'
      ctx.fillText('Federal Reserve Rate', startX + 30, startY - chartHeight - 55)

      ctx.fillStyle = '#d4af37'
      ctx.fillRect(startX + 250, startY - chartHeight - 60, 20, 3)
      ctx.fillText('Market Rate', startX + 280, startY - chartHeight - 55)

      // Title
      ctx.shadowBlur = 20
      ctx.shadowColor = '#d4af37'
      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 42px Helvetica'
      ctx.textAlign = 'center'
      ctx.fillText('1969 INTEREST RATES', centerX, centerY - chartHeight / 2 - 120)

      ctx.font = '18px Helvetica'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('The Federal Reserve Tightens', centerX, centerY - chartHeight / 2 - 90)
    }

    drawInterestRates()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawInterestRates()
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
        y,
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
