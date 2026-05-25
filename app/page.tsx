'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import HeroSection from '@/components/HeroSection'
import EasterEgg from '@/components/EasterEgg'
import { ModalProvider } from '@/app/ModalContext'
import ModalContainer from '@/components/ModalContainer'

export default function Home() {
  const [isEggOpen, setIsEggOpen] = useState(false)

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
      <div className="min-h-screen relative">
        <Sidebar />
        <main className="lg:ml-[260px] relative min-h-screen home-page-container">
          <HeroSection />
        </main>
        <EasterEgg isOpen={isEggOpen} onClose={handleCloseEgg} />
        <ModalContainer />
      </div>
    </ModalProvider>
  )
}
