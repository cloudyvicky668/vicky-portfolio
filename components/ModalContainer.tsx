'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal, ModalType } from '@/app/ModalContext'
import AboutMeModal from './AboutMeModal'
import PortfolioModal from './PortfolioModal'

export default function ModalContainer() {
  const { activeModal, isModalOpen, closeModal } = useModal()
  const contentRef = useRef<HTMLDivElement>(null)

  // 锁定/解锁页面滚动 - 使用 useEffect 确保只在客户端执行
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      // 关闭时释放全局滚动，并将视口无缝回弹
      document.body.style.overflow = 'unset'
      window.scrollTo(0, 0)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleClose = () => {
    // 关闭时重置滚动位置到顶部
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
    closeModal()
  }

  const renderModalContent = (modalType: ModalType) => {
    switch (modalType) {
      case 'about':
        return <AboutMeModal />
      case 'portfolio':
        return <PortfolioModal />
      default:
        return null
    }
  }

  // 组件永远常驻DOM，不销毁，纯粹通过CSS状态控制显隐
  return (
    <div className={`fixed inset-0 w-screen h-screen z-50 transition-all duration-500 ${
      isModalOpen 
        ? 'opacity-100 pointer-events-auto' 
        : 'opacity-0 pointer-events-none'
    }`}>
      {/* 全屏手账翻页容器 */}
      <motion.div
        className="absolute inset-0 w-screen h-screen bg-gradient-to-br from-[#FAF6F0] via-[#F5EDE0] to-[#F4F1EA] overflow-y-auto"
        animate={{
          clipPath: isModalOpen 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
            : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* 纸张纹理 */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 手账装订线装饰 */}
        <div className="fixed left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4C4A8] to-transparent opacity-30" />

        {/* 悬浮关闭按钮 */}
        <motion.button
          onClick={handleClose}
          className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all duration-300 shadow-sm"
          aria-label="关闭"
          animate={{ 
            opacity: isModalOpen ? 1 : 0,
            scale: isModalOpen ? 1 : 0.8
          }}
          transition={{ delay: isModalOpen ? 0.3 : 0 }}
        >
          <X className="w-5 h-5 text-[#6B5B4F]" />
        </motion.button>

        {/* 内容区域 */}
        <motion.div
          ref={contentRef}
          className="min-h-screen py-16 px-20 lg:px-32"
          animate={{ opacity: isModalOpen ? 1 : 0 }}
          transition={{ delay: isModalOpen ? 0.2 : 0, duration: 0.4 }}
        >
          <div className="max-w-5xl mx-auto">
            {activeModal && renderModalContent(activeModal)}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}