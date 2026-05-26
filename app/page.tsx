'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import HeroSection from '@/components/HeroSection'
import EasterEgg from '@/components/EasterEgg'
import { ModalProvider } from '@/app/ModalContext'
import ModalContainer from '@/components/ModalContainer'
import { useViewMode } from '@/app/ViewModeContext'

export default function Home() {
  const [isEggOpen, setIsEggOpen] = useState(false)
  const { isCreativeMode } = useViewMode()

  useEffect(() => {
    const handleOpenEgg = () => setIsEggOpen(true)
    document.addEventListener('openEasterEgg', handleOpenEgg)
    return () => document.removeEventListener('openEasterEgg', handleOpenEgg)
  }, [])

  const handleCloseEgg = () => {
    setIsEggOpen(false)
  }

  return (
    <ModalProvider>
      <div className={`min-h-screen relative ${isCreativeMode ? 'bg-transparent' : 'bg-[#FAF6EF]'}`}>
        <Sidebar />
        <main className={`lg:ml-[260px] relative min-h-screen home-page-container ${isCreativeMode ? 'bg-transparent' : 'bg-[#FAF6EF]'}`}>
          <HeroSection />
        </main>
        <EasterEgg isOpen={isEggOpen} onClose={handleCloseEgg} />
        <ModalContainer />
      </div>
    </ModalProvider>
  )
}
