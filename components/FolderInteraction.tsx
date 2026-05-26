'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FolderState = 'idle' | 'zoomed' | 'opened'

const FolderInteraction = () => {
  const [state, setState] = useState<FolderState>('idle')
  const [containerSize, setContainerSize] = useState({ width: 300, height: 214 })

  useEffect(() => {
    const updateSize = () => {
      const height = window.innerHeight
      const baseWidth = Math.min(height * 0.5, 380)
      const aspectRatio = 1.4
      const baseHeight = baseWidth / aspectRatio

      const zoomedWidth = Math.min(height * 0.85, 600)
      const zoomedHeight = zoomedWidth / aspectRatio

      setContainerSize({ width: state === 'idle' ? baseWidth : zoomedWidth, height: state === 'idle' ? baseHeight : zoomedHeight })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [state])

  useEffect(() => {
    const updateSize = () => {
      const height = window.innerHeight
      const zoomedWidth = Math.min(height * 0.85, 600)
      const aspectRatio = 1.4
      const zoomedHeight = zoomedWidth / aspectRatio
      setContainerSize(prev => ({ ...prev, width: zoomedWidth, height: zoomedHeight }))
    }

    if (state !== 'idle') {
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [state])

  const handleFolderClick = () => {
    if (state === 'idle') {
      setState('zoomed')
    } else if (state === 'zoomed') {
      setState('opened')
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && state !== 'idle') {
      setState('idle')
    }
  }

  const containerStyle = {
    width: containerSize.width,
    height: containerSize.height,
    aspectRatio: '1.4 / 1',
    position: 'fixed' as const,
    left: '50%',
    top: '50%',
    transform: `translate(-50%, -50%)`,
    transformOrigin: 'center center',
    perspective: '1200px',
    zIndex: state !== 'idle' ? 100 : 10,
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden cursor-default"
      onClick={handleBackdropClick}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/real-vicky-forest-optimized.webp"
          alt="Creative Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/30" />
      </motion.div>

      <motion.div
        layoutId="folder-container"
        style={containerStyle}
        onClick={handleFolderClick}
        initial={{ scale: 1 }}
        animate={{ scale: state === 'idle' ? 1 : 1 }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 22,
          mass: 0.9,
        }}
      >
        {/* 文件夹封面 - 3D翻转动画 */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          initial={{ rotateY: 0 }}
          animate={{
            rotateY: state === 'opened' ? -110 : 0,
            opacity: state === 'opened' ? 0.2 : 1,
          }}
          transition={{
            rotateY: { duration: 0.8, ease: 'easeOut' },
            opacity: { duration: 0.6, ease: 'easeOut' },
          }}
        >
          <img
            src="/images/folder cover.png"
            alt="文件夹封面"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: state === 'idle'
                ? 'drop-shadow(6px 8px 12px rgba(0,0,0,0.18))'
                : 'drop-shadow(10px 14px 24px rgba(0,0,0,0.22))',
            }}
          />
        </motion.div>

        {/* 文件夹内页 */}
        <AnimatePresence>
          {state === 'opened' && (
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* 内页底图 */}
              <img
                src="/images/folder2.png"
                alt="文件夹内页"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />

              {/* 左侧拼贴全组 - 与底图完全重叠 */}
              <motion.img
                src="/images/左侧拼贴全组.png"
                alt="左侧拼贴"
                initial={{
                  opacity: 0,
                  x: '-30%',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />

              {/* 右侧拼贴全组 - 与底图完全重叠 */}
              <motion.img
                src="/images/右侧拼贴全组.png"
                alt="右侧拼贴"
                initial={{
                  opacity: 0,
                  x: '30%',
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 提示文字 */}
      <AnimatePresence>
        {state === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="font-handwriting text-xl md:text-2xl text-[#8C6A5E]">
              点击文件夹探索我的创意世界 ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 关闭提示 */}
      <AnimatePresence>
        {state === 'opened' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-sm text-[#8C6A5E]/60 font-sans">
              点击任意区域返回
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 left-4 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm"
      >
        <span className="text-xs font-sans text-[#666666]">
          状态: {state === 'idle' ? '待点击' : state === 'zoomed' ? '已放大' : '已打开'}
        </span>
      </motion.div>
    </div>
  )
}

export default FolderInteraction
