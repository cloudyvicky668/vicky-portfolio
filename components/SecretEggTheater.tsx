'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  note: string
}

interface FloatingNoteProps {
  note: string
  size: number
  startX: number
  duration: number
  delay: number
  swayDuration: number
}

function FloatingNote({ note, size, startX, duration, delay, swayDuration }: FloatingNoteProps) {
  const [key, setKey] = useState(0)
  
  const handleComplete = () => {
    setTimeout(() => {
      setKey(prev => prev + 1)
    }, Math.random() * 3000)
  }
  
  return (
    <motion.div
      key={key}
      className="absolute pointer-events-none"
      style={{
        left: `${startX}vw`,
        fontSize: `${size}px`,
        fontFamily: 'Arial, sans-serif',
        color: 'rgba(255, 240, 200, 0.55)',
        textShadow: '0 0 12px rgba(255, 255, 255, 0.3)',
      }}
      initial={{ y: '100vh', opacity: 0, x: 0 }}
      animate={{
        y: '-10vh',
        opacity: [0, 0.6, 0.6, 0],
        x: [0, 30, -20, 25, 0],
      }}
      transition={{
        y: { duration, ease: 'linear', delay },
        opacity: {
          duration,
          delay,
          times: [0, 0.2, 0.8, 1],
        },
        x: {
          duration: swayDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
      onAnimationComplete={handleComplete}
    >
      {note}
    </motion.div>
  )
}

export default function SecretEggTheater() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSecondLine, setShowSecondLine] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [fogSweep, setFogSweep] = useState(false)
  const [showTyndallLight, setShowTyndallLight] = useState(false)
  const [isFullyBright, setIsFullyBright] = useState(false)
  const [showFloatingNotes, setShowFloatingNotes] = useState(false)
  const [isFirstAct, setIsFirstAct] = useState(true)
  const [isSecondAct, setIsSecondAct] = useState(false)
  const [isThirdAct, setIsThirdAct] = useState(false)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const animationRef = useRef<number>(0)
  const mouseActiveRef = useRef(false)

  const spawnMouseNote = useCallback((x: number, y: number) => {
    const notes = ['♪', '♫', '♬']
    const count = 2 + Math.floor(Math.random() * 2)
    
    for (let i = 0; i < count; i++) {
      if (particlesRef.current.length >= 50) {
        particlesRef.current.shift()
      }
      
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2
      
      particlesRef.current.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 14 + Math.random() * 8,
        opacity: 0.75,
        life: 0,
        maxLife: 90,
        note: notes[Math.floor(Math.random() * notes.length)]
      })
    }
  }, [])

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    
    const lifeRatio = particle.life / particle.maxLife
    const fadeOpacity = particle.opacity * (1 - lifeRatio)
    const scale = 1 - lifeRatio * 0.3
    
    ctx.globalAlpha = fadeOpacity
    ctx.font = `${particle.size * scale}px Arial`
    ctx.fillStyle = 'rgba(255, 245, 220, 0.85)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
    ctx.shadowBlur = 10
    
    ctx.fillText(particle.note, particle.x, particle.y)
    
    ctx.restore()
  }

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.97
      particle.vy *= 0.97
      particle.life++

      drawParticle(ctx, particle)

      return particle.life < particle.maxLife
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseActiveRef.current) return
      
      const dx = e.clientX - mouseRef.current.x
      const dy = e.clientY - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 15) {
        spawnMouseNote(e.clientX, e.clientY)
        mouseRef.current.x = e.clientX
        mouseRef.current.y = e.clientY
      }
    }

    if (isOpen) {
      handleResize()
      window.addEventListener('resize', handleResize)
      window.addEventListener('mousemove', handleMouseMove)
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isOpen, animate, spawnMouseNote])

  useEffect(() => {
    if (!isOpen) {
      setShowSecondLine(false)
      setShowSignature(false)
      setShowParticles(false)
      setFogSweep(false)
      setShowTyndallLight(false)
      setIsFullyBright(false)
      setShowFloatingNotes(false)
      setIsFirstAct(true)
      setIsSecondAct(false)
      setIsThirdAct(false)
      mouseActiveRef.current = false
      return
    }

    const timer1 = setTimeout(() => {
      setShowSecondLine(true)
    }, 3000)

    const timer2 = setTimeout(() => {
      setFogSweep(true)
      setShowTyndallLight(true)
      setIsFirstAct(false)
      setIsSecondAct(true)
    }, 2500)

    const timer3 = setTimeout(() => {
      setIsFullyBright(true)
      setIsThirdAct(true)
    }, 4200)

    const timer4 = setTimeout(() => {
      setShowSignature(true)
      setShowParticles(true)
      mouseActiveRef.current = true
    }, 4500)

    const timer5 = setTimeout(() => {
      setShowFloatingNotes(true)
    }, 5200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsOpen(false)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 800)
  }

  return (
    <>
      <motion.div
        className="absolute cursor-pointer"
        style={{ right: '-15%', bottom: '8%' }}
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-14 h-14"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              background: `
                repeating-radial-gradient(circle at center, 
                  #4a4a4a 0px, 
                  #525252 0.3px, 
                  #4a4a4a 0.6px,
                  #4e4e4e 0.9px,
                  #4a4a4a 1.2px
                ),
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 45%),
                radial-gradient(circle at 70% 65%, rgba(255,255,255,0.04) 0%, transparent 35%),
                linear-gradient(135deg, #4a4a4a 0%, #3d3d3d 50%, #424242 100%)
              `,
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.05),
                inset 0 -4px 8px rgba(0,0,0,0.1),
                0 4px 12px rgba(0,0,0,0.2)
              `,
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full">
              <motion.path
                d="M28 5.6 Q36.4 14, 42 28 Q36.4 38.5, 28 49 Q20 38.5, 14 28 Q20 14, 28 5.6"
                fill="none"
                stroke="rgba(255,248,230,0.25)"
                strokeWidth="0.3"
                animate={{
                  scale: [0.85, 1.4],
                  opacity: [0, 0.25, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            </svg>

            <div
              className="absolute inset-[35%] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #252525 50%, #1f1f1f 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              <div
                className="w-[60%] h-[60%] rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #8B7355 0%, #6B5344 50%, #7B6354 100%)'
                }}
              >
                <span className="text-white text-[6px] font-bold font-serif" style={{ letterSpacing: '1px' }}>
                  V
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-[10px] text-neutral-400 font-light tracking-[0.2em] block mt-2 text-center"
          initial={{ opacity: 0, y: -5 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Click to play Vicky's Secret
        </motion.p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="theater"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
            onClick={handleClose}
          >
            <motion.img
              src="/images/bg-theater-hd.webp"
              alt="Theater Background"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ zIndex: 0, willChange: 'transform, filter' }}
              initial={{ filter: 'brightness(0.35) blur(4px) saturate(0.8)', scale: 1.05, y: 0 }}
              animate={{
                filter: fogSweep ? 'brightness(1) blur(0) saturate(1.2)' : 'brightness(0.35) blur(4px) saturate(0.8)',
                scale: fogSweep ? 1 : 1.05,
                y: showParticles ? [0, -6, 0, -4, 0] : 0
              }}
              transition={{
                filter: { ease: 'easeOut', duration: 2, delay: 0.05 },
                scale: { ease: 'easeOut', duration: 2 },
                y: {
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'loop'
                }
              }}
            />

            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 140% 110% at 50% 65%, rgba(8, 15, 10, 0.88) 0%, rgba(10, 18, 12, 0.78) 100%)',
                  filter: 'blur(120px)',
                  willChange: 'transform',
                }}
                initial={{ opacity: 1, x: 0 }}
                animate={isFirstAct ? {
                  opacity: 1,
                  x: [0, -20, 0, -15, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  opacity: { duration: 0 },
                  x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                } : {
                  duration: 2,
                  ease: "easeOut"
                }}
              />

              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 160% 120% at 40% 50%, rgba(10, 18, 12, 0.65) 0%, rgba(12, 20, 14, 0.45) 70%, transparent 100%)',
                  filter: 'blur(100px)',
                }}
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={isFirstAct ? {
                  opacity: 1,
                  x: [-30, 30, -30],
                  y: [0, -10, 0, -8, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  opacity: { duration: 0 },
                  x: { duration: 10, repeat: Infinity, ease: "linear" },
                  y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                } : {
                  duration: 2,
                  ease: "easeOut"
                }}
              />

              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 180% 140% at 60% 35%, rgba(20, 30, 22, 0.45) 0%, rgba(15, 22, 18, 0.25) 60%, transparent 100%)',
                  filter: 'blur(140px)',
                  willChange: 'transform',
                }}
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={isFirstAct ? {
                  opacity: 1,
                  x: [-50, 50, -50],
                  y: [0, -15, 0, -12, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  opacity: { duration: 0 },
                  x: { duration: 6, repeat: Infinity, ease: "linear" },
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                } : {
                  duration: 2,
                  ease: "easeOut"
                }}
              />

              <motion.div
                className="absolute"
                style={{
                  top: '15%',
                  left: '-20%',
                  width: '280px',
                  height: '180px',
                  background: 'radial-gradient(ellipse at center, rgba(30, 40, 35, 0.3) 0%, rgba(25, 35, 30, 0.15) 50%, transparent 100%)',
                  filter: 'blur(80px)',
                  borderRadius: '50%',
                  willChange: 'transform, opacity',
                }}
                initial={{ x: 0, opacity: 0.8 }}
                animate={isFirstAct ? {
                  x: ['0vw', '120vw'],
                  opacity: [0, 0.8, 0.8, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  x: { duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 },
                  opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }
                } : {
                  duration: 2
                }}
              />

              <motion.div
                className="absolute"
                style={{
                  top: '45%',
                  left: '-15%',
                  width: '220px',
                  height: '220px',
                  background: 'radial-gradient(circle at center, rgba(25, 35, 28, 0.35) 0%, rgba(20, 30, 25, 0.18) 50%, transparent 100%)',
                  filter: 'blur(70px)',
                  borderRadius: '50%',
                }}
                initial={{ x: 0, opacity: 0.7 }}
                animate={isFirstAct ? {
                  x: ['0vw', '120vw'],
                  opacity: [0, 0.7, 0.7, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  x: { duration: 6.5, repeat: Infinity, ease: "linear", delay: 1.5, repeatDelay: 2.5 },
                  opacity: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5, repeatDelay: 2.5 }
                } : {
                  duration: 2
                }}
              />

              <motion.div
                className="absolute"
                style={{
                  top: '65%',
                  left: '-25%',
                  width: '320px',
                  height: '200px',
                  background: 'radial-gradient(ellipse at center, rgba(28, 38, 32, 0.28) 0%, rgba(22, 32, 26, 0.12) 60%, transparent 100%)',
                  filter: 'blur(90px)',
                  borderRadius: '50%',
                  willChange: 'transform, opacity',
                }}
                initial={{ x: 0, opacity: 0.6 }}
                animate={isFirstAct ? {
                  x: ['0vw', '120vw'],
                  opacity: [0, 0.6, 0.6, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  x: { duration: 7.2, repeat: Infinity, ease: "linear", delay: 3, repeatDelay: 3 },
                  opacity: { duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 3, repeatDelay: 3 }
                } : {
                  duration: 2
                }}
              />

              <motion.div
                className="absolute"
                style={{
                  top: '28%',
                  left: '-18%',
                  width: '260px',
                  height: '160px',
                  background: 'radial-gradient(ellipse at center, rgba(32, 42, 36, 0.32) 0%, rgba(26, 36, 30, 0.16) 55%, transparent 100%)',
                  filter: 'blur(75px)',
                  borderRadius: '50%',
                  willChange: 'transform, opacity',
                }}
                initial={{ x: 0, opacity: 0.75 }}
                animate={isFirstAct ? {
                  x: ['0vw', '120vw'],
                  opacity: [0, 0.75, 0.75, 0]
                } : {
                  opacity: 0
                }}
                transition={isFirstAct ? {
                  x: { duration: 5.8, repeat: Infinity, ease: "linear", delay: 4.5, repeatDelay: 4 },
                  opacity: { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 4.5, repeatDelay: 4 }
                } : {
                  duration: 2
                }}
              />
            </div>

            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ zIndex: 5 }}
            >
              <motion.div
                className="absolute"
                style={{
                  top: '5%',
                  right: '10%',
                  width: '65%',
                  height: '70%',
                  background: 'radial-gradient(ellipse at center, rgba(255, 248, 220, 0.75) 0%, rgba(255, 245, 215, 0.45) 25%, rgba(255, 250, 225, 0.2) 50%, transparent 75%)',
                  filter: 'blur(60px)',
                  willChange: 'transform, opacity',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isSecondAct ? (isThirdAct ? 0.25 : 1) : 0,
                  scale: isSecondAct ? 1.3 : 0.5
                }}
                transition={{
                  duration: 2,
                  delay: 0.08,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />

              <div
                className="absolute"
                style={{
                  top: '-3%',
                  right: '-3%',
                  width: '1px',
                  height: '1px'
                }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    top: 0,
                    right: 0,
                    width: '10px',
                    height: '110vh',
                    background: 'linear-gradient(to bottom, rgba(255, 250, 235, 0.85) 0%, rgba(255, 248, 225, 0.5) 35%, rgba(255, 245, 215, 0.25) 65%, transparent 100%)',
                    transformOrigin: 'top right',
                    transform: 'rotate(-38deg)',
                    filter: 'blur(4px)',
                    boxShadow: '0 0 25px rgba(255, 250, 235, 0.65)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: isSecondAct ? 1 : 0,
                    opacity: isSecondAct ? (isThirdAct ? 0.9 : 1) : 0
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />

                <motion.div
                  className="absolute"
                  style={{
                    top: 0,
                    right: 0,
                    width: '5px',
                    height: '105vh',
                    background: 'linear-gradient(to bottom, rgba(255, 250, 235, 0.7) 0%, rgba(255, 248, 225, 0.42) 40%, rgba(255, 245, 215, 0.2) 70%, transparent 100%)',
                    transformOrigin: 'top right',
                    transform: 'rotate(-32deg)',
                    filter: 'blur(3px)',
                    boxShadow: '0 0 18px rgba(255, 250, 235, 0.5)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: isSecondAct ? 1 : 0,
                    opacity: isSecondAct ? (isThirdAct ? 0.85 : 1) : 0
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.7,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />

                <motion.div
                  className="absolute"
                  style={{
                    top: 0,
                    right: 0,
                    width: '4px',
                    height: '115vh',
                    background: 'linear-gradient(to bottom, rgba(255, 250, 235, 0.65) 0%, rgba(255, 248, 225, 0.35) 45%, rgba(255, 245, 215, 0.15) 75%, transparent 100%)',
                    transformOrigin: 'top right',
                    transform: 'rotate(-46deg)',
                    filter: 'blur(5px)',
                    boxShadow: '0 0 15px rgba(255, 250, 235, 0.4)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: isSecondAct ? 1 : 0,
                    opacity: isSecondAct ? (isThirdAct ? 0.8 : 1) : 0
                  }}
                  transition={{
                    duration: 2.2,
                    delay: 0.9,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />

                <motion.div
                  className="absolute"
                  style={{
                    top: 0,
                    right: 0,
                    width: '3px',
                    height: '100vh',
                    background: 'linear-gradient(to bottom, rgba(255, 250, 235, 0.58) 0%, rgba(255, 248, 225, 0.28) 50%, transparent 100%)',
                    transformOrigin: 'top right',
                    transform: 'rotate(-28deg)',
                    filter: 'blur(6px)',
                    boxShadow: '0 0 12px rgba(255, 250, 235, 0.35)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: isSecondAct ? 1 : 0,
                    opacity: isSecondAct ? (isThirdAct ? 0.75 : 1) : 0
                  }}
                  transition={{
                    duration: 2.4,
                    delay: 1.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              </div>
            </motion.div>

            {showFloatingNotes && (
              <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
                {Array.from({ length: 18 }).map((_, i) => {
                  const notes = ['♪', '♫', '♬']
                  const note = notes[Math.floor(Math.random() * notes.length)]
                  const size = 16 + Math.random() * 10
                  const startX = 10 + Math.random() * 80
                  const duration = 10 + Math.random() * 8
                  const delay = Math.random() * 5
                  const swayDuration = 4 + Math.random() * 2
                  
                  return (
                    <FloatingNote
                      key={i}
                      note={note}
                      size={size}
                      startX={startX}
                      duration={duration}
                      delay={delay}
                      swayDuration={swayDuration}
                    />
                  )
                })}
              </div>
            )}

            <canvas
              ref={canvasRef}
              className="fixed inset-0 w-full h-full"
              style={{ zIndex: 4, opacity: showParticles ? 1 : 0 }}
            />

            <div className="flex flex-col items-center justify-center space-y-10" style={{ zIndex: 10 }}>
              <motion.h2
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: 1.1, duration: 2.5, ease: "easeOut" }}
                className="text-2xl md:text-3xl lg:text-4xl text-neutral-200/80"
                style={{
                  fontFamily: '"HuiWenMingChao", "STKaiti", "KaiTi", "楷体", serif',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  willChange: 'transform, opacity, filter',
                }}
              >
                海压竹枝低复举，
              </motion.h2>

              <motion.h2
                animate={{
                  filter: isFullyBright
                    ? 'drop-shadow(0 0 18px rgba(212, 188, 150, 0.5))'
                    : 'drop-shadow(0 0 0px rgba(212, 188, 150, 0))'
                }}
                transition={{ duration: 1.5, delay: 0.12 }}
                className="text-2xl md:text-3xl lg:text-4xl text-[#D4BC96]"
                style={{
                  fontFamily: '"HuiWenMingChao", "STKaiti", "KaiTi", "楷体", serif',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  willChange: 'filter',
                }}
              >
                {['风', '吹', '山', '角', '晦', '还', '明', '。'].map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{
                      opacity: 0,
                      y: 12,
                      filter: 'brightness(0.4) blur(3px)'
                    }}
                    animate={{
                      opacity: showSecondLine ? 1 : 0,
                      y: showSecondLine ? 0 : 12,
                      filter: showSecondLine ? 'brightness(1.15) blur(0)' : 'brightness(0.4) blur(3px)'
                    }}
                    transition={{
                      delay: i * 0.12,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showSignature ? 0.55 : 0, y: showSignature ? 0 : 20 }}
                transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                className="text-neutral-500 text-sm md:text-base tracking-[0.25em] pt-6 font-serif"
              >
                谢谢你读到这里，我是 Vicky。
              </motion.p>

              <motion.div
                className="relative mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isThirdAct ? 1 : 0,
                  y: isThirdAct ? 0 : 20
                }}
                transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
              >
                <motion.span
                  className="absolute text-xl select-none pointer-events-none"
                  style={{
                    top: '-28px',
                    left: '-28px',
                    color: 'rgba(255, 220, 150, 0.45)',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  initial={{ opacity: 0, y: 0, rotate: 0 }}
                  animate={isThirdAct ? {
                    opacity: 0.45,
                    y: 0,
                    rotate: 0
                  } : {
                    opacity: 0
                  }}
                  whileHover={{
                    y: -5,
                    rotate: 15,
                    opacity: 0.7,
                    transition: { duration: 0.4, ease: 'easeOut' }
                  }}
                  transition={{ duration: 1, delay: 2.3 }}
                >
                  ♪
                </motion.span>

                <motion.span
                  className="absolute text-lg select-none pointer-events-none"
                  style={{
                    top: '-26px',
                    right: '-26px',
                    color: 'rgba(255, 220, 150, 0.4)',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  initial={{ opacity: 0, y: 0, rotate: 0 }}
                  animate={isThirdAct ? {
                    opacity: 0.4,
                    y: 0,
                    rotate: 0
                  } : {
                    opacity: 0
                  }}
                  whileHover={{
                    y: -4,
                    rotate: -12,
                    opacity: 0.65,
                    transition: { duration: 0.45, ease: 'easeOut', delay: 0.05 }
                  }}
                  transition={{ duration: 1, delay: 2.4 }}
                >
                  ♫
                </motion.span>

                <motion.span
                  className="absolute text-base select-none pointer-events-none"
                  style={{
                    bottom: '-24px',
                    left: '-32px',
                    color: 'rgba(255, 220, 150, 0.35)',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  initial={{ opacity: 0, y: 0, rotate: 0 }}
                  animate={isThirdAct ? {
                    opacity: 0.35,
                    y: 0,
                    rotate: 0
                  } : {
                    opacity: 0
                  }}
                  whileHover={{
                    y: -6,
                    rotate: 20,
                    opacity: 0.6,
                    transition: { duration: 0.42, ease: 'easeOut', delay: 0.08 }
                  }}
                  transition={{ duration: 1, delay: 2.5 }}
                >
                  ♬
                </motion.span>

                <motion.span
                  className="absolute text-xl select-none pointer-events-none"
                  style={{
                    bottom: '-28px',
                    right: '-20px',
                    color: 'rgba(255, 220, 150, 0.42)',
                    fontFamily: 'Arial, sans-serif',
                  }}
                  initial={{ opacity: 0, y: 0, rotate: 0 }}
                  animate={isThirdAct ? {
                    opacity: 0.42,
                    y: 0,
                    rotate: 0
                  } : {
                    opacity: 0
                  }}
                  whileHover={{
                    y: -5,
                    rotate: -18,
                    opacity: 0.68,
                    transition: { duration: 0.48, ease: 'easeOut', delay: 0.03 }
                  }}
                  transition={{ duration: 1, delay: 2.6 }}
                >
                  ♪
                </motion.span>

                <motion.button
                  onClick={handleClose}
                  className="relative px-9 py-3 font-serif font-extralight tracking-[0.25em] text-sm"
                  style={{
                    background: 'rgba(243, 238, 228, 0.08)',
                    border: '0.5px solid rgba(212, 188, 150, 0.3)',
                    color: '#6B7280',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                  whileHover={{
                    background: 'rgba(243, 238, 228, 0.18)',
                    borderColor: 'rgba(212, 188, 150, 0.65)',
                    boxShadow: '0 0 25px rgba(212, 188, 150, 0.35), inset 0 0 15px rgba(255, 245, 220, 0.1)',
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  返回页面
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}