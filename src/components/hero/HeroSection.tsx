import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BgTilesCanvas } from './BgTilesCanvas'
import { HeroCharacters } from './HeroCharacters'
import { HeroCat } from './HeroCat'
import { HeroContent } from './HeroContent'

export function HeroSection() {
  const { isMobile } = useMediaQuery()
  const heroRef = useRef<HTMLElement>(null)

  // Parallax scroll effect
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const layers = hero.querySelectorAll<HTMLElement>('.parallax-layer')

    const onScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = hero.offsetHeight || 900
      if (scrollY < heroHeight * 1.2) {
        layers.forEach((layer) => {
          const speed = parseFloat(layer.dataset.speed || '0.2')
          layer.style.transform = `translateY(${scrollY * speed}px)`
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="hero">
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ background: '#590505' }}
      >
        {/* Radial gradient glow behind characters */}
        <div className="parallax-layer hero-intro-hidden absolute inset-0 pointer-events-none" data-speed="0.1">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[600px] h-[600px] md:w-[1400px] md:h-[1400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, #FF0000 0%, #dd0000 20%, #990000 45%, transparent 70%)',
              opacity: 0.85,
              filter: 'blur(30px)',
            }}
          />
        </div>

        {/* LAYER 1: 3D floating tiles */}
        <BgTilesCanvas />

        {/* LAYER 2: Characters */}
        <HeroCharacters />

        {/* LAYER 3: Cat (desktop only) */}
        {!isMobile && <HeroCat />}

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to top, #620000 0%, transparent 100%)' }}
        />

        {/* Hero Content */}
        <HeroContent />
      </section>
    </div>
  )
}
