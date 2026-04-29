import { useEffect, useRef, useState } from 'react'
import type { Feature } from '@/data/constants'

interface Props {
  feature: Feature
  index: number
}

export function FeatureCard({ feature, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoverReady, setHoverReady] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Observer for scroll reveal
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Enable hover transitions after reveal completes
            hoverTimerRef.current = setTimeout(() => setHoverReady(true), 1200)
          } else {
            setIsVisible(false)
            setHoverReady(false)
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Defer observation until first scroll
    const onScroll = () => {
      observer.observe(card)
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [])

  // AI glow pulse
  const [aiOpacity, setAiOpacity] = useState(0)
  useEffect(() => {
    if (!feature.isAI) return
    let mounted = true

    function pulse() {
      if (!mounted) return
      const opacity = 0.4 + Math.random() * 0.6
      const duration = 200 + Math.random() * 800
      const pause = 100 + Math.random() * 600
      setAiOpacity(opacity)
      setTimeout(() => {
        if (!mounted) return
        const dimTo = Math.random() * 0.15
        setAiOpacity(dimTo)
        const dimDur = 300 + Math.random() * 700
        setTimeout(pulse, dimDur + pause)
      }, duration + pause)
    }
    pulse()
    return () => { mounted = false }
  }, [feature.isAI])

  const delayMs = 0.15 + index * 0.2

  return (
    <div
      ref={cardRef}
      className={`feature-card ${
        isVisible ? 'feature-card-visible' : 'feature-card-reveal'
      } ${hoverReady ? 'feature-card-hover-ready' : ''}`}
      style={{ transitionDelay: `${delayMs}s` }}
      data-index={index}
    >
      <div className="feature-card-inner">
        <div className="feature-card-img">
          <img src={feature.image} alt={feature.title} draggable={false} />
          {feature.isAI && feature.aiGlowImage && (
            <img
              src={feature.aiGlowImage}
              alt=""
              className="feature-card-glow"
              style={{ opacity: aiOpacity, transition: 'opacity 0.3s ease' }}
              draggable={false}
            />
          )}
        </div>
        <div className="feature-card-text">
          <h4>{feature.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: feature.desc }} />
        </div>
      </div>
    </div>
  )
}
