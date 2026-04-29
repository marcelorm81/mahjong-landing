import { useState, useEffect, useRef } from 'react'

export function useScrollDirection() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  const hideThreshold = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setIsScrolled(y > 80)

      // Hide on scroll down (past 120px), show on scroll up (8px)
      if (y > lastScrollY.current && y > 120) {
        hideThreshold.current = y
        setIsNavHidden(true)
      } else if (lastScrollY.current - y > 8) {
        setIsNavHidden(false)
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollY, isScrolled, isNavHidden }
}
