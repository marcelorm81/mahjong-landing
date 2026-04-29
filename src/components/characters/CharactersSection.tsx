import { useState, useEffect, useRef, useCallback } from 'react'
import { CHARACTERS, CHARACTER_OVERLAY_URL, CHARACTER_BG_URL } from '@/data/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Direction = 'left' | 'right'

export function CharactersSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<Direction>('left')
  const [phase, setPhase] = useState<'active' | 'exiting' | 'entering'>('active')
  const { useVideos } = useMediaQuery()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)

  const char = CHARACTERS[current]

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      switchChar('left', (prev) => (prev + 1) % CHARACTERS.length)
    }, 8000)
  }, [])

  const switchChar = useCallback((dir: Direction, getNext: (prev: number) => number) => {
    setDirection(dir)
    setPhase('exiting')
    setTimeout(() => {
      setCurrent(getNext)
      setPhase('entering')
      requestAnimationFrame(() => setPhase('active'))
    }, 300)
  }, [])

  const nextChar = () => {
    switchChar('left', (prev) => (prev + 1) % CHARACTERS.length)
    startAutoPlay()
  }

  const prevChar = () => {
    switchChar('right', (prev) => (prev - 1 + CHARACTERS.length) % CHARACTERS.length)
    startAutoPlay()
  }

  const goToChar = (index: number) => {
    const dir = index > current ? 'left' : 'right'
    switchChar(dir, () => index)
    startAutoPlay()
  }

  // Defer autoplay until visible
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAutoPlay()
          else {
            if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
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

  // Swipe / drag support
  useEffect(() => {
    const container = mediaContainerRef.current
    if (!container) return

    let startX = 0
    let startY = 0
    let tracking = false
    let swipeLocked = false

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      tracking = true
      swipeLocked = false
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return
      const dx = Math.abs(e.touches[0].clientX - startX)
      const dy = Math.abs(e.touches[0].clientY - startY)
      if (!swipeLocked && dx > 10 && dx > dy * 1.2) swipeLocked = true
      if (swipeLocked) e.preventDefault()
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking) return
      tracking = false
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) nextChar()
        else prevChar()
      }
      swipeLocked = false
    }

    // Mouse drag
    let mouseDown = false
    let mouseStartX = 0
    const onMouseDown = (e: MouseEvent) => { mouseDown = true; mouseStartX = e.clientX; container.style.cursor = 'grabbing' }
    const onMouseUp = (e: MouseEvent) => {
      if (!mouseDown) return
      mouseDown = false
      container.style.cursor = ''
      const dx = e.clientX - mouseStartX
      if (Math.abs(dx) > 50) {
        if (dx < 0) nextChar()
        else prevChar()
      }
    }
    const onMouseLeave = () => { mouseDown = false; container.style.cursor = '' }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mouseleave', onMouseLeave)

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const exitClass = direction === 'left' ? 'char-img-exit-left' : 'char-img-exit-right'
  const enterClass = direction === 'left' ? 'char-img-enter-right' : 'char-img-enter-left'

  const imgAnimClass =
    phase === 'exiting' ? exitClass :
    phase === 'entering' ? enterClass :
    'char-img-active'

  const textAnimClass =
    phase === 'exiting' ? 'char-fade-enter' :
    phase === 'entering' ? 'char-fade-enter' :
    'char-fade-active'

  return (
    <div id="characters" ref={sectionRef}>
      <section className="relative bg-ms_bg px-4 md:px-6 py-8 md:py-16 overflow-hidden">
        {/* Background overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${CHARACTER_OVERLAY_URL}')`,
            backgroundSize: '263px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed',
            opacity: 0.15,
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${CHARACTER_BG_URL}')`,
            backgroundSize: '315px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed',
            opacity: 0.12,
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)',
          }}
        />

        {/* Gradients */}
        <div className="absolute top-0 left-0 w-full h-140 pointer-events-none bg-gradient-to-b from-[#620000] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-80 pointer-events-none bg-gradient-to-t from-[#620000] to-transparent" />

        {/* Title */}
        <div className="relative z-10 max-w-3xl mx-auto text-center mb-6 md:mb-12">
          <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-lg reveal">Meet the Stars</h1>
          <p className="mt-3 text-sm md:text-base text-gray-300 max-w-md mx-auto drop-shadow-lg reveal">
            Earn them. Unlock them. Each one plays&nbsp;different.<br className="hidden md:inline" /> Your roster, your&nbsp;style.
          </p>
        </div>

        {/* Character Carousel */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            {/* Left: Character Media */}
            <div className="flex-shrink-0 w-64 md:w-[340px] h-[360px] md:h-[480px] flex items-end justify-center overflow-hidden reveal-left">
              <div
                ref={mediaContainerRef}
                className="h-full w-full flex items-end justify-center"
                style={{ touchAction: 'pan-y pinch-zoom' }}
              >
                {useVideos ? (
                  <video
                    key={`video-${current}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={`h-full w-auto object-contain ${imgAnimClass}`}
                    draggable={false}
                    disablePictureInPicture
                  >
                    <source src={char.videoMp4} type='video/mp4; codecs="hvc1"' />
                    <source src={char.videoWebm} type="video/webm" />
                  </video>
                ) : (
                  <img
                    key={`img-${current}`}
                    src={char.img}
                    alt={char.name}
                    className={`h-full w-auto object-contain ${imgAnimClass}`}
                    draggable={false}
                  />
                )}
              </div>
            </div>

            {/* Right: Text + Controls */}
            <div className="flex-1 text-center md:text-left max-w-xs md:max-w-sm reveal-right reveal-delay-2">
              <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3 ${textAnimClass}`}>
                {char.name}
              </h2>
              <p
                className={`text-white/70 text-base md:text-lg italic mb-4 ${textAnimClass}`}
                style={{ transitionDelay: '0.1s' }}
              >
                {char.quote}
              </p>
              <p
                className={`text-white text-sm md:text-base leading-relaxed mb-8 ${textAnimClass}`}
                style={{ transitionDelay: '0.2s' }}
              >
                {char.desc}
              </p>

              {/* Progress Bars */}
              <div className="flex gap-2 mb-6 justify-center md:justify-start">
                {CHARACTERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToChar(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-white w-12' : 'bg-white/30 w-8'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3 justify-center md:justify-start">
                <button
                  onClick={prevChar}
                  className="cursor-pointer hover:scale-110 transition w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={nextChar}
                  className="cursor-pointer hover:scale-110 transition w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
