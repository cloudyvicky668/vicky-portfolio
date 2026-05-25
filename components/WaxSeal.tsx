'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface WaxSealProps {
  onOpen: () => void
}

export default function WaxSeal({ onOpen }: WaxSealProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ right: '-15%', bottom: '8%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        scale: { duration: 0.3, ease: 'easeInOut' },
      }}
    >
      {/* 黑胶唱片 SVG */}
      <div className="relative w-[80px] h-[80px]">
        {/* 声纹涟漪效果 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-[rgba(80,80,80,0.2)]"
              style={{
                width: `${80 + ring * 12}px`,
                height: `${80 + ring * 12}px`,
              }}
              initial={{ opacity: 0.3, scale: 0.9 }}
              animate={{ 
                opacity: [0.3, 0.15, 0], 
                scale: [0.9, 0.98, 1.05] 
              }}
              transition={{ 
                duration: isHovered ? 2 : 3, 
                repeat: Infinity, 
                delay: ring * 0.6,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
        
        {/* 唱片主体 */}
        <motion.div 
          className="absolute w-[80px] h-[80px]"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 25, 
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
                linear-gradient(135deg, #4a4a4a 0%, #3d3d3d 50%, #424242 100%)
              `,
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.05),
                inset 0 -4px 8px rgba(0,0,0,0.1),
                ${isHovered ? '0 0 15px rgba(100,100,100,0.4)' : '0 4px 12px rgba(0,0,0,0.2)'}
              `,
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* 装饰曲线 */}
            <svg viewBox="0 0 80 80" className="absolute inset-0 w-full h-full">
              <motion.path
                d="M40 8 Q52 20, 60 40 Q52 55, 40 72 Q28 55, 20 40 Q28 20, 40 8"
                fill="none"
                stroke="rgba(255,248,230,0.25)"
                strokeWidth="0.5"
                animate={{ 
                  scale: [0.85, isHovered ? 1.6 : 1.4], 
                  opacity: [0, isHovered ? 0.4 : 0.25, 0] 
                }}
                transition={{ 
                  duration: isHovered ? 2.5 : 3.5, 
                  repeat: Infinity, 
                  ease: 'easeOut' 
                }}
              />
            </svg>
            
            {/* 中心标签 */}
            <div 
              className="absolute inset-[35%] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #252525 50%, #1f1f1f 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              <div 
                className="w-[60%] h-[60%] rounded-full"
                style={{
                  background: 'linear-gradient(145deg, #8B7355 0%, #6B5344 50%, #7B6354 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span 
                  className="text-white text-[8px] font-bold"
                  style={{ fontFamily: 'serif', letterSpacing: '1px' }}
                >
                  V
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 悬停提示文字 */}
      <motion.p
        className="text-center text-xs tracking-[0.3em] text-neutral-600/70 mt-2 font-serif"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
        transition={{ duration: 0.3 }}
      >
        Click to unfold Vicky's Secret
      </motion.p>
    </motion.div>
  )
}
