'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EasterEggProps {
  isOpen: boolean
  onClose: () => void
}

export default function EasterEgg({ isOpen, onClose }: EasterEggProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setPhase(0)
      // 场景一：海压 / 晦 - 0.5秒后狂风突起
      const timer1 = setTimeout(() => setPhase(1), 500)
      // 场景二：复举 / 明 - 3秒后狂风骤降，竹子缓缓挺直
      const timer2 = setTimeout(() => setPhase(2), 3000)
      // 场景三：落款浮现
      const timer3 = setTimeout(() => setPhase(3), 5500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setPhase(0)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* 暗夜墨绿黑背景 */}
          <motion.div 
            className="absolute inset-0 bg-[#0A110C]"
            animate={{
              backgroundColor: phase === 1 ? '#080D0A' : '#0A110C',
            }}
            transition={{ duration: 1.5 }}
          />
          
          {/* 宣纸纤维肌理 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* 墨竹剪影 - 左下角 */}
          <svg className="absolute bottom-0 left-0 w-64 h-96" viewBox="0 0 200 300">
            <motion.g
              style={{ transformOrigin: 'bottom center' }}
              animate={{
                rotate: phase === 1 ? -15 : phase >= 2 ? [ -15, 0 ] : 0,
              }}
              transition={{
                rotate: phase === 1 ? { duration: 1.5, ease: 'easeInOut' } : 
                        phase >= 2 ? { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] } :
                        { duration: 0.5 },
              }}
            >
              {/* 主干 */}
              <path
                d="M60 300 L70 200 L65 100 L75 20"
                stroke="#1A2F1E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* 枝叶1 */}
              <path d="M65 220 L40 180" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              <path d="M68 210 L95 175" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              {/* 枝叶2 */}
              <path d="M68 140 L35 110" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              <path d="M72 130 L105 95" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              {/* 枝叶3 */}
              <path d="M70 70 L45 50" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
            </motion.g>
          </svg>

          {/* 墨竹剪影 - 右下角 */}
          <svg className="absolute bottom-0 right-0 w-64 h-96" viewBox="0 0 200 300">
            <motion.g
              style={{ transformOrigin: 'bottom center' }}
              animate={{
                rotate: phase === 1 ? 12 : phase >= 2 ? [ 12, 0 ] : 0,
              }}
              transition={{
                rotate: phase === 1 ? { duration: 1.5, ease: 'easeInOut' } : 
                        phase >= 2 ? { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] } :
                        { duration: 0.5 },
              }}
            >
              {/* 主干 */}
              <path
                d="M140 300 L130 200 L135 100 L125 20"
                stroke="#1A2F1E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* 枝叶1 */}
              <path d="M135 220 L160 180" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              <path d="M132 210 L105 175" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              {/* 枝叶2 */}
              <path d="M132 140 L165 110" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              <path d="M128 130 L95 95" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
              {/* 枝叶3 */}
              <path d="M130 70 L155 50" stroke="#1A2F1E" strokeWidth="1.5" fill="none" />
            </motion.g>
          </svg>

          {/* 第一句诗 */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              filter: phase >= 1 ? 'blur(0px)' : 'blur(12px)',
            }}
            transition={{ duration: 1.2, delay: phase >= 1 ? 0.3 : 0 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-emerald-800/90 font-serif tracking-widest">
              海压竹枝低复举，
            </h2>
          </motion.div>

          {/* 第二句诗 */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pt-16"
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            animate={{
              opacity: phase >= 2 ? 1 : 0,
              filter: phase >= 2 ? 'blur(0px)' : 'blur(12px)',
            }}
            transition={{ duration: 1.5, delay: phase >= 2 ? 0.5 : 0 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#D4AF37] font-serif tracking-widest">
              风吹山角晦还明。
            </h2>
            
            {/* 金色流光 */}
            <motion.div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              animate={{
                opacity: phase >= 2 ? [0, 0.8, 0] : 0,
              }}
              transition={{ duration: 2.5, delay: phase >= 2 ? 0.8 : 0 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
                }}
                animate={{
                  x: phase >= 2 ? ['-100%', '100%'] : '-100%',
                }}
                transition={{ duration: 2.5, delay: phase >= 2 ? 1 : 0 }}
              />
            </motion.div>
          </motion.div>

          {/* 落款 */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center"
            style={{ marginTop: '180px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 1.2, delay: phase >= 3 ? 0.5 : 0 }}
          >
            <p className="text-neutral-500/50 text-xs tracking-widest font-serif">
              谢谢你读到这里，我是 Vicky。
            </p>
            
            {/* 合上手账按钮 */}
            <motion.button
              className="mt-8 px-6 py-2 border border-neutral-600/30 rounded-full text-neutral-400/80 text-sm tracking-wider font-serif hover:border-neutral-400/50 hover:text-neutral-300 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
              transition={{ duration: 0.8, delay: phase >= 3 ? 1.2 : 0 }}
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ［ 合上手账 ］
            </motion.button>
          </motion.div>

          {/* 微风粒子效果 */}
          {phase < 1 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-8 bg-gradient-to-t from-emerald-900/20 to-transparent"
                  style={{
                    left: `${10 + i * 5}%`,
                    bottom: '-20px',
                  }}
                  animate={{
                    y: [0, -400],
                    x: [0, 50],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
