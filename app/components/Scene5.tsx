'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SceneProps {
  scrollProgress: MotionValue<number>
}

export default function Scene5({ scrollProgress }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const opacity = useTransform(scrollProgress, [0.75, 0.8, 1], [0, 1, 1])
  const scale = useTransform(scrollProgress, [0.75, 0.85], [1.2, 1])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrame: number

    const drawMoonLanding = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Retro film grain
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 15
        imageData.data[i] = noise
        imageData.data[i + 1] = noise * 0.9
        imageData.data[i + 2] = noise * 0.7
        imageData.data[i + 3] = 12
      }
      ctx.putImageData(imageData, 0, 0)

      // Rocket launch glow
      const rocketGradient = ctx.createRadialGradient(
        centerX,
        canvas.height * 0.7,
        50,
        centerX,
        canvas.height * 0.7,
        300
      )
      rocketGradient.addColorStop(0, 'rgba(212, 175, 55, 0.8)')
      rocketGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.3)')
      rocketGradient.addColorStop(1, 'rgba(212, 175, 55, 0)')
      ctx.fillStyle = rocketGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Simplified Saturn V rocket
      ctx.shadowBlur = 30
      ctx.shadowColor = '#d4af37'

      // Rocket body
      ctx.fillStyle = '#1a736d'
      ctx.fillRect(centerX - 20, canvas.height * 0.4, 40, 300)

      // Rocket nose
      ctx.beginPath()
      ctx.moveTo(centerX, canvas.height * 0.35)
      ctx.lineTo(centerX - 25, canvas.height * 0.4)
      ctx.lineTo(centerX + 25, canvas.height * 0.4)
      ctx.closePath()
      ctx.fill()

      // Flames
      ctx.shadowBlur = 40
      ctx.shadowColor = '#d4af37'
      ctx.fillStyle = '#d4af37'
      ctx.beginPath()
      ctx.moveTo(centerX - 20, canvas.height * 0.7)
      ctx.lineTo(centerX - 35, canvas.height * 0.78)
      ctx.lineTo(centerX, canvas.height * 0.85)
      ctx.lineTo(centerX + 35, canvas.height * 0.78)
      ctx.lineTo(centerX + 20, canvas.height * 0.7)
      ctx.closePath()
      ctx.fill()

      // Smoke clouds
      for (let i = 0; i < 3; i++) {
        ctx.shadowBlur = 25
        ctx.fillStyle = `rgba(26, 115, 109, ${0.2 - i * 0.05})`
        ctx.beginPath()
        ctx.arc(centerX + (Math.random() - 0.5) * 100, canvas.height * 0.8 + i * 30, 60 + i * 20, 0, Math.PI * 2)
        ctx.fill()
      }

      // Economic overlay
      const overlayY = canvas.height * 0.2

      ctx.shadowBlur = 20
      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 48px Helvetica'
      ctx.textAlign = 'center'
      ctx.fillText('MOON LANDING', centerX, overlayY)

      ctx.font = '22px Helvetica'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('July 20, 1969', centerX, overlayY + 35)

      // Economic data overlay
      const dataBoxY = 150
      const dataBoxX = centerX - 220

      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(10, 14, 26, 0.8)'
      ctx.fillRect(dataBoxX, dataBoxY, 440, 180)

      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 2
      ctx.strokeRect(dataBoxX, dataBoxY, 440, 180)

      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 18px Helvetica'
      ctx.textAlign = 'left'
      ctx.fillText('Economic Impact Analysis', dataBoxX + 20, dataBoxY + 30)

      ctx.font = '15px Helvetica'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('Total Apollo Program Cost: $25.4 billion', dataBoxX + 20, dataBoxY + 60)
      ctx.fillText('1969 GDP Impact: 0.8% of U.S. GDP', dataBoxX + 20, dataBoxY + 85)
      ctx.fillText('Technology Jobs Created: 400,000+', dataBoxX + 20, dataBoxY + 110)
      ctx.fillText('Private Sector Contracts: 20,000+ companies', dataBoxX + 20, dataBoxY + 135)

      ctx.fillStyle = '#d4af37'
      ctx.font = 'italic 14px Helvetica'
      ctx.fillText('One small step... One giant economic leap', dataBoxX + 20, dataBoxY + 165)

      // Bottom caption
      ctx.font = '16px Helvetica'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#1a736d'
      ctx.fillText('A moment of triumph amid economic turbulence', centerX, canvas.height - 50)
    }

    drawMoonLanding()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawMoonLanding()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
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
