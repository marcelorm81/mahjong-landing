import { useEffect, useRef } from 'react'

export function HeroCat() {
  const catRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Start cat float after intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      catRef.current?.classList.add('cat-float-active')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Cat flips horizontally to follow cursor
  useEffect(() => {
    const catDiv = catRef.current
    const catImg = imgRef.current
    if (!catDiv || !catImg) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = catDiv.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      catImg.style.transform = e.clientX < centerX ? 'scaleX(-1)' : 'scaleX(1)'
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={catRef}
      className="parallax-layer hero-cat hero-intro-hidden absolute pointer-events-none"
      data-speed="0.25"
      style={{ right: '28%', top: '28%', zIndex: 3 }}
    >
      <img
        ref={imgRef}
        src="/img/cat_cropped.webp"
        alt="Cat"
        className="w-14 md:w-20 object-contain select-none transition-transform duration-200"
        draggable={false}
      />
    </div>
  )
}
