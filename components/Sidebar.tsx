'use client'

import { useState, useCallback } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useViewMode } from '@/app/ViewModeContext'
import { useModal } from '@/app/ModalContext'

// 导航数据结构
type NavAction = 'goHome' | 'openAbout' | 'openPortfolio' | 'toggleCreativeMode' | null

const navItems: Array<{
  id: string
  label: string
  labelEn: string
  href: string
  isActive: boolean
  children: Array<{
    id: string
    label: string
    labelEn: string
    href: string
    isActive: boolean
    children: null
    action: NavAction
  }> | null
  action: NavAction
}> = [
  {
    id: 'home',
    label: '首页',
    labelEn: 'HOME',
    href: '#home',
    isActive: false,
    children: null,
    action: 'goHome',
  },
  {
    id: 'portfolio',
    label: '作品集',
    labelEn: 'PORTFOLIO',
    href: '#portfolio',
    isActive: false,
    children: [
      { id: 'marketing', label: '营销实战', labelEn: 'MARKETING SHOWCASE', href: '#marketing', isActive: false, children: null, action: 'openPortfolio' },
      { id: 'creative', label: '创作世界', labelEn: 'CREATIVE WORLD', href: '#creative', isActive: false, children: null, action: 'toggleCreativeMode' },
    ],
    action: null,
  },
  {
    id: 'about',
    label: '关于我',
    labelEn: 'ABOUT ME',
    href: '#about',
    isActive: false,
    children: null,
    action: 'openAbout',
  },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>('portfolio')
  const [isDownloading, setIsDownloading] = useState(false)
  const { isCreativeMode, setIsCreativeMode } = useViewMode()
  const { openModal, closeModal } = useModal()

  // 处理按钮点击星星特效
  const handleButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const textCn = button.querySelector('.nav-item-text-cn')
    
    if (!textCn) return

    const textRect = textCn.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    
    // 创建星星元素
    const star = document.createElement('span')
    star.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" class="text-amber-400" style="width: 14px; height: 14px; filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.8));">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `
    star.style.cssText = `
      position: absolute;
      left: ${textRect.right - buttonRect.left + 8}px;
      top: ${textRect.top - buttonRect.top + textRect.height / 2}px;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 1;
      transition: all 0.8s ease-out;
    `
    
    button.appendChild(star)

    // 触发动画
    requestAnimationFrame(() => {
      star.style.cssText = `
        position: absolute;
        left: ${textRect.right - buttonRect.left + 20}px;
        top: ${textRect.top - buttonRect.top - 20}px;
        transform: translateY(-50%);
        pointer-events: none;
        opacity: 0;
        transition: all 0.8s ease-out;
      `
    })

    // 动画结束后移除星星
    setTimeout(() => {
      star.remove()
    }, 800)
  }, [])

  // 处理作品集展开/折叠
  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  // 处理PDF下载
  const handleDownloadCV = () => {
    setIsDownloading(true)
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Vicky_Zhao_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setIsDownloading(false), 1500)
  }

  // 处理导航点击
  const handleNavClick = (item: typeof navItems[0]) => {
    // 如果有子菜单，先切换展开状态
    if (item.children) {
      toggleExpand(item.id)
      return
    }

    // 根据 action 执行不同操作
    switch (item.action) {
      case 'goHome':
        // 关闭所有模态，切换到专业模式，回到首页
        closeModal()
        setIsCreativeMode(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        break
      case 'openAbout':
        // 打开 About Me 模态
        openModal('about')
        break
      case 'openPortfolio':
        // 打开 Portfolio 模态
        openModal('portfolio')
        break
      case 'toggleCreativeMode':
        // 关闭所有模态，切换到创意模式
        closeModal()
        setIsCreativeMode(true)
        break
      default:
        break
    }
  }

  // 渲染导航项
  const renderNavItem = (item: typeof navItems[0], level: number = 0) => {
    const isExpanded = expandedItem === item.id
    const paddingLeft = level === 0 ? 'pl-6' : 'pl-12'

    return (
      <li key={item.id} className="nav-item-wrapper">
        <button
          onClick={(e) => {
            handleButtonClick(e)
            handleNavClick(item)
            // 延迟关闭侧边栏，避免干扰滚动行为
            setTimeout(() => setIsOpen(false), 100)
          }}
          className={`nav-item ${paddingLeft} ${level === 0 ? 'nav-item-main' : 'nav-item-child'} w-full text-left relative`}
          aria-expanded={item.children ? isExpanded : undefined}
          aria-controls={item.children ? `${item.id}-submenu` : undefined}
          tabIndex={0}
        >
          <span className="nav-item-content">
            {item.children && (
              <span className="nav-item-icon">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </span>
            )}
            <span className="nav-item-text-wrapper">
              <span className="nav-item-text-en">{item.labelEn}</span>
              <span className="nav-item-text-cn">{item.label}</span>
            </span>
          </span>
          <span className="nav-item-indicator" />
          <span className="nav-item-underline" />
        </button>

        {/* 子菜单 */}
        {item.children && (
          <ul
            id={`${item.id}-submenu`}
            className={`nav-submenu transition-all duration-300 ease-in-out ${
              isExpanded ? 'nav-submenu-open' : 'nav-submenu-closed'
            }`}
            aria-hidden={!isExpanded}
          >
            {item.children.map((child) => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  // 根据模式设置侧边栏样式
  const sidebarStyle = isCreativeMode 
    ? {
        backdropFilter: 'blur(20px)',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRight: '1px solid rgba(255, 255, 255, 0.2)',
      }
    : {
        backdropFilter: 'blur(20px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
        background: 'linear-gradient(180deg, rgba(248, 242, 232, 0.98) 0%, rgba(245, 237, 224, 0.98) 58%, rgba(241, 230, 216, 0.98) 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 4px 24px rgba(0, 0, 0, 0.04)',
      }

  // Logo文字颜色
  const logoTextColor = isCreativeMode ? 'text-white' : 'text-[var(--color-ink)]'
  const subtitleTextColor = isCreativeMode ? 'text-white/70' : 'text-[var(--color-muted)]'

  return (
    <>
      {/* 移动端汉堡菜单按钮 */}
      <button
        className="sidebar-mobile-toggle fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-[#F5F0E6]/80 backdrop-blur-sm rounded-lg shadow-sm lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="打开导航菜单"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5 text-[var(--color-ink)]" />
      </button>

      {/* 侧边栏主容器 */}
      <aside
        className={`sidebar fixed left-0 top-0 z-50 h-screen w-[260px] transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCreativeMode ? 'creative-mode' : ''}`}
        style={sidebarStyle}
        role="navigation"
        aria-label="主导航"
      >
        {/* 噪点纹理层（仅专业模式） */}
        {!isCreativeMode && (
          <div 
            className="noise-overlay absolute inset-0 pointer-events-none z-10"
            style={{
              opacity: 0.28,
              mixBlendMode: 'multiply',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* 移动端关闭按钮 */}
        <button
          className="sidebar-close-btn absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
          aria-label="关闭导航菜单"
        >
          <X className={`w-5 h-5 ${logoTextColor}`} />
        </button>

        <div className="sidebar-content flex flex-col h-full pt-10 pb-[50px] z-20">
          {/* Logo区域 */}
          <div className="sidebar-logo px-6 mb-10">
            <h1 className={`text-2xl font-serif font-bold ${logoTextColor}`}>Vicky</h1>
            <p className={`text-xs ${subtitleTextColor} mt-2 tracking-widest uppercase`}>专注好内容</p>
          </div>

          {/* 导航区域 */}
          <nav className="sidebar-nav flex-1 px-4">
            <ul className="nav-list space-y-1">
              {navItems.map((item) => renderNavItem(item))}
            </ul>
          </nav>

          {/* 底部下载按钮 */}
          <div className="sidebar-footer px-4">
            <button
              className={`download-cv-btn download-btn w-full h-[42px] flex items-center justify-center rounded-lg font-medium tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                isCreativeMode 
                  ? 'text-white hover:bg-white/10' 
                  : ''
              }`}
              onClick={handleDownloadCV}
              disabled={isDownloading}
              aria-label="下载PDF简历"
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <span className="download-spinner w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  下载中...
                </span>
              ) : (
                '下载 PDF 简历'
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="sidebar-overlay fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
