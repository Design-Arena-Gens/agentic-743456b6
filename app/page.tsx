'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Scene1 from './components/Scene1'
import Scene2 from './components/Scene2'
import Scene3 from './components/Scene3'
import Scene4 from './components/Scene4'
import Scene5 from './components/Scene5'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  return (
    <main ref={containerRef} style={{ position: 'relative' }}>
      <Scene1 scrollProgress={scrollYProgress} />
      <Scene2 scrollProgress={scrollYProgress} />
      <Scene3 scrollProgress={scrollYProgress} />
      <Scene4 scrollProgress={scrollYProgress} />
      <Scene5 scrollProgress={scrollYProgress} />
    </main>
  )
}
