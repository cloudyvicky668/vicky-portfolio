'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ViewModeContext } from './ViewModeContext'
import Image from 'next/image'

export default function ViewModeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCreativeMode, setIsCreativeMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleModeChange = (value: boolean) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIsCreativeMode(value)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  return (
    <ViewModeContext.Provider value={{ isCreativeMode, setIsCreativeMode: handleModeChange }}>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* 1. 全局背景大底座（永久置底，撑满全屏，严禁嵌套在任何子区域内） */}
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
          <AnimatePresence mode="wait">
            {isCreativeMode ? (
              <motion.div
                key="creative-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src="/images/real-vicky-forest.jpeg"
                  alt="Creative Background"
                  fill
                  priority
                  className="object-cover"
                  style={{ backgroundColor: '#F5F2EB' }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="professional-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 80% 50% at 20% 10%, rgba(250, 249, 246, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 40% at 85% 85%, rgba(235, 231, 222, 0.25) 0%, transparent 50%),
                    radial-gradient(ellipse 40% 30% at 10% 80%, rgba(245, 242, 235, 0.2) 0%, transparent 50%),
                    radial-gradient(ellipse 50% 35% at 90% 15%, rgba(240, 237, 230, 0.15) 0%, transparent 50%),
                    transparent
                  `,
                  backgroundAttachment: 'fixed'
                }}
              >
                {/* 噪点纹理 */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.035,
                    mixBlendMode: 'overlay'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. 前台内容层（浮在全局背景之上） */}
        <motion.div 
          className="relative z-10 flex min-h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </ViewModeContext.Provider>
  )
}
