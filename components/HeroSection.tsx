'use client'

import { motion, AnimatePresence } from 'framer-motion'
import ToggleSwitch from './ToggleSwitch'
import CreativeMode from './CreativeMode'
import ProfessionalHome from './ProfessionalHome'
import { useViewMode } from '@/app/ViewModeContext'
import { useModal } from '@/app/ModalContext'

export default function HeroSection() {
  const { isCreativeMode, setIsCreativeMode } = useViewMode()
  const { isModalOpen } = useModal()

  const handleToggle = () => {
    setIsCreativeMode(!isCreativeMode)
  }

  return (
    <div className="relative min-h-screen">
      {/* Toggle Switch - 固定在右上角，模态打开时隐藏 */}
      <motion.div
        className={`fixed top-6 right-6 z-[100] transition-all duration-300 ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isModalOpen ? 0 : 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="px-4 py-2 rounded-full backdrop-blur-md bg-white/30 shadow-sm">
          <ToggleSwitch isCreativeMode={isCreativeMode} onToggle={handleToggle} />
        </div>
      </motion.div>

      {/* 内容层 - 只显示当前模式的内容 */}
      <AnimatePresence mode="wait">
        {isCreativeMode ? (
          <motion.div
            key="creative-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CreativeMode onToggle={handleToggle} />
          </motion.div>
        ) : (
          <motion.div
            key="professional-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfessionalHome />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
