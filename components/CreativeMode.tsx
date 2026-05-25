'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ToggleSwitch from './ToggleSwitch'

// 引入霞鹜文楷字体
if (typeof window !== 'undefined') {
  const link = document.createElement('link')
  link.href = 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

const folderConfig = [
  {
    id: 1,
    name: '手作集',
    nameEn: 'Handmade',
    left: '28%',
    top: '45%',
    width: '18.5%',
    rotate: '-10deg',
    cover: '/images/folder1-cover.png',
    inner: '/images/folder1-inner.png',
    leftPng: '/images/folder1-left.png',
    rightPng: '/images/folder1-right.png',
    dialogColor: 'linear-gradient(135deg, #D4E6F1 0%, #AED6F1 100%)',
    dialogBorder: '#5DADE2',
    dialogShadow: '#2980B9',
    dialogTail: '#D4E6F1',
    dialogText: '做手作时整个世界都安静了，每个作品都是我个人审美的体现；当然一人做全流程也体会到了创业不易。',
    highlightedWords: [],
  },
  {
    id: 2,
    name: '旅人手账',
    nameEn: 'Travel',
    left: '52%',
    top: '45%',
    width: '18.2%',
    rotate: '-3deg',
    cover: '/images/folder2-cover.png',
    inner: '/images/folder2-inner.png',
    leftPng: '/images/folder2-left.png',
    rightPng: '/images/folder2-right.png',
    dialogColor: 'linear-gradient(135deg, #FFF8E7 0%, #FFECB3 100%)',
    dialogBorder: '#D4A574',
    dialogShadow: '#8B6914',
    dialogTail: '#FFF8E7',
    dialogText: '我喜欢从旅行中获得正能量，并写成攻略传递给更多人~旅行手账将美好回忆定格，为未来的自己持续应援！',
    highlightedWords: [],
  },
  {
    id: 3,
    name: '品牌创意',
    nameEn: 'Assets',
    left: '76%',
    top: '44.5%',
    width: '18.8%',
    rotate: '9deg',
    cover: '/images/folder3-cover.png',        
    inner: '/images/folder3-inner.png',        
    leftPng: '/images/folder3-left.png',       
    rightPng: '/images/folder3-right.png',     
    dialogColor: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    dialogBorder: '#66BB6A',
    dialogShadow: '#2E7D32',
    dialogTail: '#E8F5E9',
    dialogText: 'AI制图帮助我自己做demo，提高了效率；平时也会画一些日历周边送给朋友们。',
    highlightedWords: [],
  },
]

interface CreativeModeProps {
  onToggle: () => void
}

// 打字机文字组件
const TypingText = ({ text, speed, key: resetKey, isHtml = false }: { text: string; speed: number; key?: string; isHtml?: boolean }) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // 重置状态
    setDisplayText('')
    setIsComplete(false)
    
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        const char = text[index]
        if (char === '\n') {
          setDisplayText(prev => prev + '\n')
        } else {
          setDisplayText(prev => prev + char)
        }
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, resetKey])

  const textStyle = {
    fontFamily: 'LXGW WenKai, serif',
    fontSize: '14px',
    lineHeight: 2,
    letterSpacing: '0.3px',
    color: '#4a3f35',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  }

  // HTML 模式：直接渲染带 HTML 标签的文本
  if (isHtml) {
    return (
      <div style={textStyle}>
        <span dangerouslySetInnerHTML={{ __html: displayText }} />
        {!isComplete && <span className="inline-block w-0.5 h-4 bg-[#6B5344] ml-1 animate-pulse" />}
      </div>
    )
  }

  return (
    <p className="text-left" style={textStyle}>
      {displayText}
      {!isComplete && <span className="inline-block w-0.5 h-4 bg-[#6B5344] ml-1 animate-pulse" />}
    </p>
  )
}

// 手绘星星组件
const HandDrawnStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" style={{ color: '#FFB347' }}>
    <path 
      d="M12 2l3.5 6.5L22 9.5l-5 4.5 1 6.5L12 17l-6 3.5 1-6.5-5-4.5L8.5 8.5 12 2z"
      style={{ 
        stroke: '#D4A574', 
        strokeWidth: '1.5', 
        strokeLinejoin: 'round',
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))'
      }}
    />
  </svg>
)

// 手绘唱片组件
const HandDrawnVinyl = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* 唱片外圈 */}
    <circle cx="16" cy="16" r="14" fill="#1A1A1A" stroke="#5A5A5A" strokeWidth="2" />
    {/* 唱片纹路 - 增加数量和粗细 */}
    <circle cx="16" cy="16" r="13" fill="none" stroke="#444444" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="12" fill="none" stroke="#3A3A3A" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="11" fill="none" stroke="#444444" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="10" fill="none" stroke="#3A3A3A" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="9" fill="none" stroke="#444444" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="8" fill="none" stroke="#3A3A3A" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="7" fill="none" stroke="#444444" strokeWidth="0.8" />
    <circle cx="16" cy="16" r="6" fill="none" stroke="#3A3A3A" strokeWidth="0.8" />
    {/* 唱片中心 */}
    <circle cx="16" cy="16" r="3.5" fill="#F5EFEB" stroke="#C4B5A0" strokeWidth="1.5" />
    {/* 中心小圆 */}
    <circle cx="16" cy="16" r="1" fill="#C4B5A0" />
    {/* 手绘风格不规则效果 */}
    <path 
      d="M2 16 Q4 13 6 16 T10 14" 
      fill="none" 
      stroke="#555555" 
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    <path 
      d="M30 16 Q28 19 26 16 T22 18" 
      fill="none" 
      stroke="#555555" 
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
)

const CreativeMode = ({ onToggle }: CreativeModeProps) => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null)
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogKey, setDialogKey] = useState(0)

  const activeFolder = folderConfig.find(f => f.id === activeFolderId)

  const handleFolderClick = (id: number) => {
    if (activeFolderId === id) {
      setIsFolderOpen(true)
    } else {
      setActiveFolderId(id)
      setIsFolderOpen(false)
    }
  }

  const handleOverlayClick = () => {
    setActiveFolderId(null)
    setIsFolderOpen(false)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleOverlayClick()
  }

  // 过滤出非活跃的文件夹用于显示
  const visibleFolders = folderConfig.filter(f => f.id !== activeFolderId)

  return (
    <div className="fixed inset-0 z-[10]" style={{ width: '100vw', height: '100vh' }}>
      {/* 全局背景已在 ViewModeProvider 中处理 */}

      {/* 标题文字层 */}
      <motion.div
        className="fixed top-[8%] left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1
          className="text-white text-3xl md:text-4xl mb-3"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)', fontFamily: 'JiangCheng, sans-serif' }}
        >
          探索我的创意世界
        </h1>
        <p
          className="text-white/80 text-sm"
          style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)', fontFamily: 'JiangCheng, sans-serif' }}
        >
          点击任意文件夹开启旅程
        </p>
      </motion.div>

      {/* 三个文件夹容器 */}
      <div
        className="absolute inset-0 z-[40]"
        style={{ width: '100vw', height: '100vh' }}
      >
          {folderConfig.map((folder, index) => (
            <motion.div
              key={folder.id}
              className="absolute cursor-pointer"
              initial={{ opacity: 0, y: 120, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotate: folder.rotate,
              }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 100,
                mass: 0.8,
                delay: 0.4 + index * 0.2,
              }}
              whileHover={{ 
                scale: 1.08, 
                rotate: 0,
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }}
              onClick={() => handleFolderClick(folder.id)}
              style={{
                left: folder.left,
                top: folder.top,
                width: folder.width,
                rotate: folder.rotate,
                zIndex: 45 + index,
                position: 'absolute',
              }}
            >
              <motion.img
                src={folder.cover}
                alt={folder.name}
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(6px 8px 12px rgba(0,0,0,0.18))',
                }}
                animate={{
                  rotate: [0, 1.5, -1.5, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
              />
              
              {/* 文件夹标签 */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white font-semibold text-sm tracking-wider" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>
                  {folder.nameEn}
                </p>
                <p className="text-white/70 text-xs" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)' }}>
                  {folder.name}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      {/* 全屏弹窗 */}
      <AnimatePresence>
        {activeFolderId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[50] flex items-center justify-center"
            onClick={handleOverlayClick}
          >
            {/* 黑色遮罩背景 */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* 关闭按钮 */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              onClick={handleClose}
              className="fixed top-6 right-6 z-[60] w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[#8C6A5E] hover:bg-white hover:scale-105 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* 居中容器 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 60, damping: 22 }}
              className="relative z-[55]"
              style={{
                width: 'min(85vh, 600px)',
                perspective: '1200px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 文件夹封面 - 3D翻转动画 */}
              <motion.div
                style={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: isFolderOpen ? -110 : 0,
                  opacity: isFolderOpen ? 0.1 : 1,
                }}
                transition={{
                  rotateY: { duration: 0.8, ease: 'easeOut' },
                  opacity: { duration: 0.6, ease: 'easeOut' },
                }}
                onClick={() => isFolderOpen || handleFolderClick(activeFolderId)}
              >
                <img
                  src={activeFolder?.cover}
                  alt={activeFolder?.name}
                  className="w-full h-auto object-contain cursor-pointer"
                />
              </motion.div>

              {/* 文件夹内页 */}
              <AnimatePresence>
                {isFolderOpen && activeFolder && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    onMouseEnter={() => {
                      setDialogKey(prev => prev + 1)
                      setShowDialog(true)
                    }}
                    onMouseLeave={() => setShowDialog(false)}
                  >
                    {/* 内页底图 */}
                    <img
                      src={activeFolder.inner}
                      alt={`${activeFolder.name}内页`}
                      className="w-full h-auto object-contain"
                    />

                    {/* 左侧拼贴 */}
                    <motion.img
                      src={activeFolder.leftPng}
                      alt={`${activeFolder.name}左侧`}
                      initial={{ opacity: 0, x: '-20%' }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0 w-full h-auto object-contain"
                    />

                    {/* 右侧拼贴 */}
                    <motion.img
                      src={activeFolder.rightPng}
                      alt={`${activeFolder.name}右侧`}
                      initial={{ opacity: 0, x: '20%' }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0 w-full h-auto object-contain"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 文件夹对话框 */}
              <AnimatePresence>
                {isFolderOpen && showDialog && activeFolder && (
                  <motion.div
                    className="absolute"
                    style={{
                      left: '105%',
                      top: '45%',
                      width: '280px',
                      zIndex: 60,
                    }}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* 精致对话框 */}
                    <div 
                      className="relative max-w-[320px] p-[28px_32px] transition-all duration-300 ease-out hover:translate-y-[-2px] dialog-box"
                    >
                      {/* 和纸胶带装饰 */}
                      <div className="washi-tape" />

                      {/* 左上角大引号装饰 */}
                      <div 
                        className="absolute top-3 left-4 pointer-events-none"
                        style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '48px',
                          color: 'rgba(180,160,130,0.25)',
                          lineHeight: 1,
                        }}
                      >
                        "
                      </div>

                      {/* 打字机文字 */}
                      <div className="relative z-10">
                        <TypingText 
                          key={String(dialogKey)}
                          text={activeFolder.dialogText}
                          speed={80}
                          isHtml={true}
                        />
                      </div>

                      {/* 右上角相机图标 */}
                      <div className="absolute -top-1 -right-1 opacity-60">
                        <HandDrawnVinyl className="w-4 h-4" />
                      </div>
                    </div>

                    {/* 连接虚线 */}
                    <div 
                      className="absolute"
                      style={{
                        left: '-60px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '60px',
                        height: '1px',
                        background: 'transparent',
                        border: '1px dashed rgba(180,160,130,0.5)',
                        borderLeft: 'none',
                        borderTop: 'none',
                      }}
                    />
                    <div 
                      className="absolute"
                      style={{
                        left: '-63px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(180,160,130,0.7)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CreativeMode
