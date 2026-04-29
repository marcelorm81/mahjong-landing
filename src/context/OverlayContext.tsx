import React, { createContext, useContext, useState, useCallback } from 'react'

export type OverlayType = 'howToPlay' | 'support' | 'terms' | 'privacy' | 'cookiePolicy' | 'cookieSettings' | null

interface OverlayContextType {
  activeOverlay: OverlayType
  openOverlay: (name: OverlayType) => void
  closeOverlay: () => void
}

const OverlayContext = createContext<OverlayContextType>({
  activeOverlay: null,
  openOverlay: () => {},
  closeOverlay: () => {},
})

export const useOverlay = () => useContext(OverlayContext)

export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null)

  const openOverlay = useCallback((name: OverlayType) => {
    setActiveOverlay(name)
    document.body.style.overflow = 'hidden'
    // Signal cursor tile to hide
    window.dispatchEvent(new CustomEvent('overlay-change', { detail: { open: true } }))
  }, [])

  const closeOverlay = useCallback(() => {
    setActiveOverlay(null)
    document.body.style.overflow = ''
    window.dispatchEvent(new CustomEvent('overlay-change', { detail: { open: false } }))
  }, [])

  return (
    <OverlayContext.Provider value={{ activeOverlay, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  )
}
