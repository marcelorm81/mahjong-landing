import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface CookieConsentContextType {
  bannerVisible: boolean
  showBanner: () => void
  hideBanner: () => void
  preferences: { necessary: boolean; analytics: boolean }
  setPreferences: (prefs: { necessary: boolean; analytics: boolean }) => void
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  bannerVisible: false,
  showBanner: () => {},
  hideBanner: () => {},
  preferences: { necessary: true, analytics: false },
  setPreferences: () => {},
})

export const useCookieConsent = () => useContext(CookieConsentContext)

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bannerVisible, setBannerVisible] = useState(false)
  const [preferences, setPreferences] = useState({ necessary: true, analytics: false })

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('cookieBannerDismissed')
    if (dismissed) return

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBannerVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hideBanner = useCallback(() => {
    setBannerVisible(false)
    localStorage.setItem('cookieBannerDismissed', 'true')
  }, [])

  const showBanner = useCallback(() => {
    setBannerVisible(true)
  }, [])

  return (
    <CookieConsentContext.Provider value={{ bannerVisible, showBanner, hideBanner, preferences, setPreferences }}>
      {children}
    </CookieConsentContext.Provider>
  )
}
