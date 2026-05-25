'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ToggleSwitchProps {
  isCreativeMode: boolean
  onToggle: () => void
}

export default function ToggleSwitch({ isCreativeMode, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <span 
        className={`text-sm font-medium transition-colors duration-300 ${
          !isCreativeMode ? 'text-[#333333] font-sans' : 'text-[#8C6A5E] text-base'
        }`}
        style={{ fontFamily: isCreativeMode ? 'JiangCheng, sans-serif' : undefined }}
      >
        专业模式
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: isCreativeMode ? '#E8A87C' : '#E6C384',
        }}
        aria-label={isCreativeMode ? '切换到专业模式' : '切换到创意模式'}
        aria-checked={isCreativeMode}
      >
        <motion.div
          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ left: isCreativeMode ? '24px' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      <span 
        className={`text-sm font-medium transition-colors duration-300 ${
          isCreativeMode ? 'text-[#333333] text-base' : 'text-[#8C6A5E]/70 font-sans'
        }`}
        style={{ fontFamily: isCreativeMode ? 'JiangCheng, sans-serif' : undefined }}
      >
        创意模式
      </span>
    </div>
  )
}
