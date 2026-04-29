import { useState, useEffect, useRef, useCallback } from 'react'
import { NAV_SECTIONS, LOGO_URL, GAME_URL } from '@/data/constants'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useOverlay } from '@/context/OverlayContext'

export function Navbar() {
  const { isScrolled, isNavHidden } = useScrollDirection()
  const { openOverlay } = useOverlay()
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navClickLock = useRef(false)
  const pillRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update pill position
  const updatePill = useCallback(() => {
    if (!pillRef.current || !containerRef.current) return
    const activeBtn = containerRef.current.querySelector('.nav-btn-active') as HTMLElement
    if (!activeBtn) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const btnRect = activeBtn.getBoundingClientRect()
    pillRef.current.style.left = `${btnRect.left - containerRect.left}px`
    pillRef.current.style.width = `${btnRect.width}px`
  }, [])

  // Scroll spy
  useEffect(() => {
    const sections = ['hero', 'features', 'game', 'characters', 'download']
    const onScroll = () => {
      if (navClickLock.current) return
      let current = 'hero'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Update pill when active section changes
  useEffect(() => {
    requestAnimationFrame(updatePill)
  }, [activeSection, updatePill])

  useEffect(() => {
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [updatePill])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      navClickLock.current = true
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => { navClickLock.current = false }, 800)
    }
    setActiveSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`site-nav fixed top-0 left-0 w-full z-50 ${isScrolled ? 'scrolled' : ''} ${isNavHidden ? 'nav-hidden' : ''}`}
        style={{
          background: 'transparent',
          transition: 'background 0.6s ease, backdrop-filter 0.6s ease, -webkit-backdrop-filter 0.6s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Blur backdrop pseudo-element via CSS */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer flex flex-col h-8 w-8 justify-center items-center gap-[4px] group"
            >
              <div className="h-[1.5px] w-5 rounded-full bg-white/50 transition ease transform duration-300 group-hover:bg-white/80" />
              <div className="h-[1.5px] w-5 rounded-full bg-white/50 transition ease transform duration-300 group-hover:bg-white/80" />
            </button>
          </div>

          {/* Logo */}
          <img
            alt="Logo"
            className="h-10 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-0"
            src={LOGO_URL}
          />

          {/* Desktop Nav Links */}
          <div
            ref={containerRef}
            className="nav-container hidden md:flex items-center gap-0 text-white font-semibold rounded-full bg-white/5 px-0 py-0 relative"
          >
            <div ref={pillRef} className="nav-pill" />
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-btn px-4 py-1.5 rounded-full transition cursor-pointer text-sm ${
                  activeSection === section.id ? 'nav-btn-active active' : ''
                }`}
              >
                {section.label}
              </button>
            ))}
            <button
              onClick={() => openOverlay('support')}
              className="nav-btn px-4 py-1.5 rounded-full transition cursor-pointer text-sm"
            >
              SUPPORT
            </button>
          </div>

          {/* Login Button */}
          <a href={GAME_URL} className="hidden md:block">
            <button className="bg-ms_red hover:bg-[#B00400] text-white font-bold px-5 py-2 rounded-md transition cursor-pointer text-sm">
              LOG IN / REGISTER
            </button>
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-[72px] left-4 right-4 z-40 md:hidden ${
          mobileMenuOpen ? 'visible-menu' : 'hidden-menu'
        }`}
      >
        <div className="glass-panel rounded-2xl px-3 py-3 flex flex-col gap-1">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="glass-btn text-white/90 font-semibold py-3 px-4 text-left text-sm tracking-wide"
            >
              {section.label}
            </button>
          ))}
          <button
            onClick={() => { setMobileMenuOpen(false); openOverlay('support') }}
            className="glass-btn text-white/90 font-semibold py-3 px-4 text-left text-sm tracking-wide"
          >
            SUPPORT
          </button>
        </div>
      </div>
    </>
  )
}
