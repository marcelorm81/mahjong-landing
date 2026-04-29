import { useRef, useState, useEffect, useCallback } from 'react'
import { FEATURES } from '@/data/constants'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  // Mobile scroll snap: update dots
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const onScroll = () => {
      const card = carousel.querySelector('.feature-card') as HTMLElement
      if (!card) return
      const cardWidth = card.offsetWidth
      const gap = 16
      const index = Math.round(carousel.scrollLeft / (cardWidth + gap))
      setActiveDot(index)
    }

    carousel.addEventListener('scroll', onScroll, { passive: true })
    return () => carousel.removeEventListener('scroll', onScroll)
  }, [])

  const goToFeature = useCallback((index: number) => {
    const carousel = carouselRef.current
    const card = carousel?.querySelector('.feature-card') as HTMLElement
    if (carousel && card) {
      const cardWidth = card.offsetWidth + 16
      carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    }
  }, [])

  return (
    <div id="features">
      <section className="px-4 md:px-6 pt-8 md:pt-14 pb-12 md:pb-20 bg-ms_bg text-white overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-5 md:mb-8">
          <h1 className="font-title text-4xl md:text-7xl font-bold mb-4 leading-[0.9] reveal">
            Easy to learn.<br />Hard to stop.
          </h1>
          <p className="text-gray-300 reveal reveal-delay-1">
            Classic Mahjong. Fresh characters. Fair matches.<br />
            No pay-to-win. Just play.
          </p>
        </div>

        {/* Carousel */}
        <div className="feature-carousel-wrapper relative max-w-7xl mx-auto">
          <div ref={carouselRef} className="feature-carousel" id="featureCarousel">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>

          {/* Mobile nav dots */}
          <div className="flex justify-center gap-3 mt-8 md:hidden" id="featureDots">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToFeature(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeDot ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
