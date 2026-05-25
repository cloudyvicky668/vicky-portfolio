import { createContext, useContext } from 'react'

interface ViewModeContextType {
  isCreativeMode: boolean
  setIsCreativeMode: (value: boolean) => void
}

export const ViewModeContext = createContext<ViewModeContextType | null>(null)

export const useViewMode = () => {
  const context = useContext(ViewModeContext)
  if (!context) {
    throw new Error('useViewMode must be used within ViewModeProvider')
  }
  return context
}
