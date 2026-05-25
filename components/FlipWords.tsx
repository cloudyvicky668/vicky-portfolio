'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlipWords = () => {
  const words = ['审美驱动的内容创作者', '10年品牌营销专家']
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
          setIsAnimating(false)
        }, 500)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isAnimating, words.length])

  return (
    <div className="relative h-14 md:h-16 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-0"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-serif text-[#1D1D1D] tracking-wide">
            {words[currentIndex]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export { FlipWords };
