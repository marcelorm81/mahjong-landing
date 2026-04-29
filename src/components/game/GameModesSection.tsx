import { useState, useEffect, useRef, useCallback } from 'react'
import { GAME_MODES } from '@/data/constants'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function GameModesSection() {
  const [current, setCurrent] = useState(0)
  const [animState, setAnimState] = useState<'active' | 'exiting' | 'entering'>('active')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const mode = GAME_MODES[current]

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      switchMode((prev) => (prev + 1) % GAME_MODES.length)
    }, 7000)
  }, [])

  const switchMode = useCallback((getNext: (prev: number) => number) => {
    setAnimState('exiting')
    setTimeout(() => {
      setCurrent(getNext)
      setAnimState('entering')
      requestAnimationFrame(() => setAnimState('active'))
    }, 300)
  }, [])

  const next = () => {
    switchMode((prev) => (prev + 1) % GAME_MODES.length)
    startAutoPlay()
  }

  const prev = () => {
    switchMode((prev) => (prev - 1 + GAME_MODES.length) % GAME_MODES.length)
    startAutoPlay()
  }

  const goTo = (index: number) => {
    switchMode(() => index)
    startAutoPlay()
  }

  // Defer autoplay until section is in viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoPlay()
          } else {
            if (timerRef.current) {
              clearInterval(timerRef.current)
              timerRef.current = null
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startAutoPlay])

  const textClass = animState === 'exiting'
    ? 'char-fade-enter'
    : animState === 'entering'
    ? 'char-fade-enter'
    : 'char-fade-active'

  const imgClass = animState === 'exiting'
    ? 'char-img-exit-left'
    : animState === 'entering'
    ? 'char-img-enter-right'
    : 'char-img-active'

  return (
    <div id="game" ref={sectionRef}>
      <section className="px-4 md:px-6 py-12 md:py-20 bg-ms_bg text-white">
        <div className="max-w-3xl mx-auto">
          {/* Name + Description */}
          <div className="text-center max-w-md mx-auto mb-8 md:mb-12 reveal">
            <h1 className={`text-4xl md:text-7xl font-bold text-white mb-3 drop-shadow-lg ${textClass}`}>
              {mode.name}
            </h1>
            <p className={`text-white text-sm md:text-base ${textClass}`} style={{ transitionDelay: '0.1s' }}>
              {mode.desc}
            </p>
          </div>

          {/* Game Mode Image */}
          <div className="flex justify-center mb-8 reveal-scale reveal-delay-1">
            <img
              src={mode.img}
              alt="Game Mode"
              className={`w-[110%] max-w-none md:w-full md:max-w-2xl rounded-2xl ${imgClass}`}
              draggable={false}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="cursor-pointer hover:scale-110 transition w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div className="flex gap-2">
              {GAME_MODES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="cursor-pointer hover:scale-110 transition w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
