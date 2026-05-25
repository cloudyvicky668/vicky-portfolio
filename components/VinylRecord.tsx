'use client'

import { motion } from 'framer-motion'

export default function VinylRecord({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full">
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
        className="absolute inset-0"
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
