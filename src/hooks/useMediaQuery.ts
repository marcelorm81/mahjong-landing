import { useState, useEffect } from 'react'

export function useMediaQuery() {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    prefersReducedMotion: false,
    saveData: false,
  })

  useEffect(() => {
    const update = () => {
      const pointerCoarse = window.matchMedia('(pointer: coarse)').matches
      const narrow = window.innerWidth < 768
      setState({
        isMobile: pointerCoarse || narrow,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        saveData: !!(navigator as any).connection?.saveData,
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const useVideos = !state.prefersReducedMotion && !state.saveData

  return { ...state, useVideos }
}
