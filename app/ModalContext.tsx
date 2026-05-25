'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// 模态类型
export type ModalType = 'about' | 'portfolio' | null

interface ModalContextType {
  activeModal: ModalType
  isModalOpen: boolean
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openModal = useCallback((modal: ModalType) => {
    setActiveModal(modal)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <ModalContext.Provider value={{ activeModal, isModalOpen: activeModal !== null, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}
