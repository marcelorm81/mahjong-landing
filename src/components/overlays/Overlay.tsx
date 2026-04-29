import { useEffect, useRef, useState } from 'react'
import { useOverlay } from '@/context/OverlayContext'
import type { OverlayType } from '@/context/OverlayContext'

interface Props {
  type: OverlayType
  title: string
  children: React.ReactNode
  variant?: 'default' | 'compact'
}

export function Overlay({ type, title, children, variant = 'default' }: Props) {
  const { activeOverlay, closeOverlay } = useOverlay()
  const isOpen = activeOverlay === type
  const [display, setDisplay] = useState(false)
  const [animate, setAnimate] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (isOpen) {
      setDisplay(true)
      requestAnimationFrame(() => setAnimate(true))
    } else {
      setAnimate(false)
      const timer = setTimeout(() => setDisplay(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Scrollbar auto-hide
  useEffect(() => {
    if (!isOpen) return
    const body = bodyRef.current
    if (!body) return

    const onScroll = () => {
      body.classList.add('is-scrolling')
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = setTimeout(() => body.classList.remove('is-scrolling'), 1200)
    }
    body.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      body.removeEventListener('scroll', onScroll)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [isOpen])

  if (!display) return null

  if (variant === 'compact') {
    return (
      <div
        className={`fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 transition-opacity duration-400 ${
          animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => { if (e.target === e.currentTarget) closeOverlay() }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div
          className={`cs-panel relative bg-white rounded-xl max-w-md w-full shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ${
            animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-[0.97]'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 transition-opacity duration-400 ${
        animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) closeOverlay() }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`htp-panel relative bg-white md:rounded-xl max-w-2xl w-full h-full md:h-auto md:max-h-[90vh] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ${
          animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-[0.97]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Red header bar */}
        <div className="flex-shrink-0 bg-ms_red px-5 py-3.5 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg tracking-wide">{title}</h2>
          <button
            onClick={closeOverlay}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div ref={bodyRef} className="htp-body flex-1 overflow-y-auto px-6 md:px-10 py-8 text-gray-700">
          <div className={`htp-content ${animate ? 'htp-animate' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
