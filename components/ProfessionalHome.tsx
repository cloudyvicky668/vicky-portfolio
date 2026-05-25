'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { X, Compass, User, Network, PenTool } from 'lucide-react'
import { FlipWords } from './FlipWords'

const caseStudies = [
  { id: 1, title: '冷启动增长', stat: '0 → 8000粉', tag: '小红书核心标签', desc: '从零起步，通过精准的用户洞察和内容策略，在小红书平台实现快速粉丝增长' },
  { id: 2, title: '品牌重塑', stat: 'GMV +40%', tag: '单场活动核心', desc: '通过品牌重塑和营销活动，实现单场活动GMV同比增长40%' },
  { id: 3, title: '爆款话题', stat: '史上最高参与度', tag: '话题运营核心', desc: '打造现象级营销话题，创造品牌历史最高用户参与记录' },
  { id: 4, title: '线下爆发', stat: '销量翻倍', tag: '产品内容改造', desc: '通过产品内容改造，驱动线下渠道销量实现翻倍增长' }
]

const SoundWaveVisualizer = ({ isHovered }: { isHovered: boolean }) => {
  const bars = 20
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex items-end gap-1 h-[80px]">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gradient-to-t from-[rgba(160,180,255,0.25)] to-[rgba(200,190,180,0.3)] rounded-full"
            animate={{
              height: isHovered 
                ? `${20 + Math.sin(Date.now() / 500 + i * 0.5) * 30 + Math.random() * 20}px`
                : `${15 + Math.sin(Date.now() / 800 + i * 0.3) * 15 + Math.random() * 10}px`,
              opacity: isHovered ? 0.7 : 0.35
            }}
            transition={{ 
              duration: isHovered ? 0.3 : 0.5,
              ease: 'easeInOut'
            }}
            style={{
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
    </div>
  )
}

const VinylRecord = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-[320px] h-[320px]">
      {/* 声纹涟漪效果 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-[rgba(80,80,80,0.17)]"
            style={{
              width: `${320 + ring * 30}px`,
              height: `${320 + ring * 30}px`,
            }}
            initial={{ opacity: 0.255, scale: 0.9 }}
            animate={{ 
              opacity: [0.255, 0.136, 0.051, 0], 
              scale: [0.9, 0.95, 1, 1.05] 
            }}
            transition={{ 
              duration: isHovered ? 3 : 4.5, 
              repeat: Infinity, 
              delay: ring * 0.8,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="absolute w-[320px] h-[320px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 45, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
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
            radial-gradient(circle at 50% 50%, rgba(200,200,200,0.02) 0%, transparent 100%),
            linear-gradient(135deg, #4a4a4a 0%, #3d3d3d 50%, #424242 100%)
          `,
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.05),
            inset 0 -4px 8px rgba(0,0,0,0.1)
          `,
          border: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full">
            <motion.path
              d="M160 25 Q210 60, 240 120 Q260 180, 240 230 Q210 275, 160 295 Q110 275, 80 230 Q60 180, 80 120 Q110 60, 160 25"
              fill="none"
              stroke="rgba(255,248,230,0.25)"
              strokeWidth="0.5"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.85, isHovered ? 1.7 : 1.5], 
                opacity: [0, isHovered ? 0.5 : 0.35, 0] 
              }}
              transition={{ 
                duration: isHovered ? 3 : 4, 
                repeat: Infinity, 
                delay: 0, 
                ease: 'easeOut' 
              }}
            />
            <motion.path
              d="M160 45 Q200 85, 225 160 Q200 220, 160 275 Q120 220, 95 160 Q120 85, 160 45"
              fill="none"
              stroke="rgba(255,248,230,0.2)"
              strokeWidth="0.5"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.85, isHovered ? 1.8 : 1.6], 
                opacity: [0, isHovered ? 0.45 : 0.3, 0] 
              }}
              transition={{ 
                duration: isHovered ? 3.5 : 4.5, 
                repeat: Infinity, 
                delay: 1.5, 
                ease: 'easeOut' 
              }}
            />
            <motion.path
              d="M160 65 Q190 105, 210 160 Q190 210, 160 255 Q130 210, 110 160 Q130 105, 160 65"
              fill="none"
              stroke="rgba(255,248,230,0.15)"
              strokeWidth="0.5"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [0.85, isHovered ? 1.9 : 1.7], 
                opacity: [0, isHovered ? 0.4 : 0.25, 0] 
              }}
              transition={{ 
                duration: isHovered ? 4 : 5, 
                repeat: Infinity, 
                delay: 3, 
                ease: 'easeOut' 
              }}
            />
          </svg>

          <div 
            className="w-[85px] h-[85px] rounded-full flex items-center justify-center z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(240, 235, 225, 0.92) 0%, rgba(210, 200, 185, 0.88) 100%)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4)'
            }}
          >
            <svg viewBox="0 0 65 65" className="w-[50px] h-[50px]">
              <circle cx="32.5" cy="32.5" r="24" fill="none" stroke="rgba(60,60,60,0.3)" strokeWidth="0.5" />
              <circle cx="32.5" cy="32.5" r="17" fill="none" stroke="rgba(60,60,60,0.2)" strokeWidth="0.5" />
              <line x1="32.5" y1="8" x2="32.5" y2="19" stroke="rgba(60,60,60,0.4)" strokeWidth="0.5" />
              <line x1="32.5" y1="46" x2="32.5" y2="57" stroke="rgba(60,60,60,0.4)" strokeWidth="0.5" />
              <line x1="8" y1="32.5" x2="19" y2="32.5" stroke="rgba(60,60,60,0.4)" strokeWidth="0.5" />
              <line x1="46" y1="32.5" x2="57" y2="32.5" stroke="rgba(60,60,60,0.4)" strokeWidth="0.5" />
              
              <text x="32.5" y="14" textAnchor="middle" fill="rgba(60,60,60,0.65)" fontSize="4.8" fontFamily="system-ui, sans-serif" fontWeight="500" letterSpacing="1.5">BRAND</text>
              <text x="32.5" y="56" textAnchor="middle" fill="rgba(60,60,60,0.65)" fontSize="4.8" fontFamily="system-ui, sans-serif" fontWeight="500" letterSpacing="1.5">PLATFORM</text>
              <text x="6" y="34" textAnchor="middle" fill="rgba(60,60,60,0.65)" fontSize="4.8" fontFamily="system-ui, sans-serif" fontWeight="500" letterSpacing="1.5">CONTENT</text>
              <text x="59" y="34" textAnchor="middle" fill="rgba(60,60,60,0.65)" fontSize="4.8" fontFamily="system-ui, sans-serif" fontWeight="500" letterSpacing="1.5">USER</text>
              
              <circle cx="32.5" cy="32.5" r="4" fill="rgba(60,60,60,0.4)" />
              <circle cx="32.5" cy="32.5" r="1.8" fill="rgba(60,60,60,0.6)" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  )
}

const ParticleFlow = ({ fromNode, toNode, isActive }: { fromNode: string | null; toNode: string; isActive: boolean }) => {
  if (!isActive) return null
  
  const paths = {
    'user-to-center': {
      d: 'M 85% 22% Q 70% 40%, 50% 50%',
      duration: 1.2
    },
    'center-to-content': {
      d: 'M 50% 50% Q 65% 65%, 82% 80%',
      duration: 1
    },
    'center-to-brand': {
      d: 'M 50% 50% Q 35% 35%, 18% 18%',
      duration: 1
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 220, 150, 0)" />
          <stop offset="50%" stopColor="rgba(255, 220, 150, 0.8)" />
          <stop offset="100%" stopColor="rgba(255, 220, 150, 0)" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={paths['user-to-center'].d}
        fill="none"
        stroke="url(#particleGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: paths['user-to-center'].duration, 
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: 'easeInOut'
        }}
      />
      
      <motion.path
        d={paths['center-to-content'].d}
        fill="none"
        stroke="url(#particleGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: paths['center-to-content'].duration, 
          repeat: Infinity,
          repeatDelay: 0.3,
          delay: 0.6,
          ease: 'easeInOut'
        }}
      />

      <motion.path
        d={paths['center-to-brand'].d}
        fill="none"
        stroke="url(#particleGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: paths['center-to-brand'].duration, 
          repeat: Infinity,
          repeatDelay: 0.3,
          delay: 0.8,
          ease: 'easeInOut'
        }}
      />
    </svg>
  )
}

const FloatingNode = ({ node, isHovered, hoveredNode, onHover }: { node: { id: string; x: string; y: string; icon?: typeof Compass; delay?: number; label: string }; isHovered: boolean; hoveredNode: string | null; onHover: (id: string | null) => void }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 200, damping: 25 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  const nodeRef = useRef<HTMLDivElement>(null)

  const floatConfigs = {
    brand: { y: [0, -6, 0], duration: 5.2, delay: 0 },
    user: { y: [0, -4, 0], duration: 6.3, delay: 1.2 },
    content: { y: [0, -5, 0], duration: 5.8, delay: 0.7 },
    platform: { y: [0, -3, 0], duration: 7.1, delay: 1.8 }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!nodeRef.current) return
    const rect = nodeRef.current.getBoundingClientRect()
    const nodeX = rect.left + rect.width / 2
    const nodeY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY
    const distance = Math.sqrt(Math.pow(mouseX - nodeX, 2) + Math.pow(mouseY - nodeY, 2))
    const influenceRadius = 160

    if (distance < influenceRadius) {
      const strength = 1 - distance / influenceRadius
      const move = strength * 30
      x.set((mouseX - nodeX) / (rect.width / 2) * move)
      y.set((mouseY - nodeY) / (rect.height / 2) * move)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseEnter = () => onHover(node.id)
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onHover(null)
  }

  const colors = {
    brand: { accent: '#8BB8E8', bg: 'rgba(147, 197, 253, 0.22)' },
    user: { accent: '#9FC4A8', bg: 'rgba(167, 201, 176, 0.22)' },
    content: { accent: '#E5AEA8', bg: 'rgba(237, 187, 183, 0.22)' },
    platform: { accent: '#E5D09A', bg: 'rgba(238, 212, 164, 0.22)' }
  }

  const shapes = {
    brand: '42% 58% 70% 30% / 45% 45% 55% 55%',
    user: '55% 45% 35% 65% / 50% 55% 45% 50%',
    content: '38% 62% 55% 45% / 40% 50% 50% 60%',
    platform: '52% 48% 60% 40% / 55% 40% 60% 45%'
  }

  const icons = {
    brand: Compass,
    user: User,
    content: PenTool,
    platform: Network
  }

  const Icon = icons[node.id as keyof typeof icons]
  const color = colors[node.id as keyof typeof colors]
  const shape = shapes[node.id as keyof typeof shapes]
  const float = floatConfigs[node.id as keyof typeof floatConfigs]
  const isActive = hoveredNode === node.id

  return (
    <div
      ref={nodeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute"
      style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        style={{ x: xSpring, y: ySpring }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ 
          opacity: 1, 
          scale: isActive ? 1.08 : 1,
          y: float.y
        }}
        transition={{ 
          duration: 0.6, 
          delay: node.delay,
          y: { 
            duration: float.duration, 
            delay: float.delay,
            repeat: Infinity, 
            ease: 'easeInOut' 
          },
          scale: { duration: 0.3 }
        }}
      >
        <div 
          className="w-[115px] h-[115px] md:w-[130px] md:h-[130px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
          style={{ 
            background: color.bg,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${color.accent}35`,
            borderRadius: shape,
            boxShadow: isActive 
              ? `0 8px 30px ${color.accent}40` 
              : '0 4px 15px rgba(0,0,0,0.08)'
          }}
        >
          <motion.div
            animate={isActive ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1.5 }}
          >
            <Icon size={30} strokeWidth={1.5} color={color.accent} className="mb-2" />
          </motion.div>
          <span 
            className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#3F4E4F]"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            {node.label}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

const FloatingNodes = ({ isHovered, hoveredNode, onHover }: { isHovered: boolean; hoveredNode: string | null; onHover: (id: string | null) => void }) => {
  const nodes = [
    { id: 'brand', label: 'BRAND', x: '21%', y: '13%', delay: 0 },
    { id: 'user', label: 'USER', x: '78%', y: '26%', delay: 0.25 },
    { id: 'content', label: 'CONTENT', x: '72%', y: '78%', delay: 0.5 },
    { id: 'platform', label: 'PLATFORM', x: '14%', y: '84%', delay: 0.75 }
  ]

  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(100, 110, 115, 0.45)" />
            <stop offset="50%" stopColor="rgba(120, 130, 135, 0.55)" />
            <stop offset="100%" stopColor="rgba(100, 110, 115, 0.45)" />
          </linearGradient>
        </defs>
        
        <motion.line 
          x1="28%" y1="22%" x2="50%" y2="50%" 
          stroke="url(#lineGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 5"
          animate={{ opacity: hoveredNode === 'brand' || hoveredNode === 'user' ? 0.9 : 0.55 }}
        />
        <motion.line 
          x1="75%" y1="30%" x2="50%" y2="50%" 
          stroke="url(#lineGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 5"
          animate={{ opacity: hoveredNode === 'user' ? 1 : 0.55 }}
        />
        <motion.line 
          x1="68%" y1="72%" x2="50%" y2="50%" 
          stroke="url(#lineGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 5"
          animate={{ opacity: hoveredNode === 'user' ? 1 : 0.55 }}
        />
        <motion.line 
          x1="25%" y1="78%" x2="50%" y2="50%" 
          stroke="url(#lineGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 5"
          animate={{ opacity: hoveredNode === 'platform' || hoveredNode === 'user' ? 0.9 : 0.55 }}
        />
      </svg>

      {nodes.map((node) => (
        <FloatingNode 
          key={node.id} 
          node={node} 
          isHovered={isHovered}
          hoveredNode={hoveredNode}
          onHover={onHover} 
        />
      ))}
    </div>
  )
}

const SoundCatcher = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-[480px] h-[480px] flex items-center justify-center">
        <VinylRecord isHovered={isHovered} />

        <FloatingNodes isHovered={isHovered} hoveredNode={hoveredNode} onHover={setHoveredNode} />

        <ParticleFlow 
          fromNode={hoveredNode} 
          toNode="center" 
          isActive={hoveredNode === 'user'} 
        />

        <SoundWaveVisualizer isHovered={isHovered} />
      </div>
    </div>
  )
}

const ProfessionalHome = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <div className="w-full min-h-screen relative">
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-bg-cream-light)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light',
          opacity: 0.98
        }}
      />

      {/* 左右平分双栏布局 */}
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-center relative z-10">
        {/* 左侧：文案 Brief 容器 */}
        <div className="w-full max-w-2xl flex flex-col justify-center px-8 md:px-16 translate-x-[5%]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1D1D1D] tracking-[0.18em] leading-tight mb-8">
              Hi, I'm<br /><span className="font-architects">Vicky</span>
            </h1>
            
            <div className="mb-8">
              <FlipWords />
            </div>

            <p className="text-base md:text-lg italic text-[#1D1D1D]/55 font-light tracking-wide">
              Craft stories.<br />Build connections.<br />Drive results.
            </p>
          </motion.div>
        </div>

        {/* 右侧：多维图形资产独立主舞台 */}
        <div className="w-full flex items-center justify-center px-8">
          <div className="relative w-[480px] h-[480px]">
            <SoundCatcher />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalHome
