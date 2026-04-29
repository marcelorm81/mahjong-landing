import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function HeroCharacters() {
  const { isMobile, useVideos } = useMediaQuery()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCanvas, setShowCanvas] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (isMobile && useVideos) {
      // Mobile: show looping video
      setShowVideo(true)
      setShowCanvas(false)
      videoRef.current?.play().catch(() => {})
      // Reveal immediately on mobile
      document.querySelectorAll('.hero-intro-hidden').forEach((el) => {
        el.classList.add('hero-revealed')
      })
    } else if (!isMobile && useVideos) {
      // Desktop: show canvas for cursor scrub
      setShowCanvas(true)
      setShowVideo(false)
    } else {
      // No video support
      setShowCanvas(false)
      setShowVideo(false)
      document.querySelectorAll('.hero-intro-hidden').forEach((el) => {
        el.classList.add('hero-revealed')
      })
    }
  }, [isMobile, useVideos])

  // Desktop: cursor-driven frame scrub
  useEffect(() => {
    if (!showCanvas || isMobile || !useVideos) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const heroFrames: ImageBitmap[] = []
    let heroReady = false
    let heroCurrentIdx = 0

    const offV = document.createElement('video')
    offV.muted = true
    offV.playsInline = true
    offV.preload = 'auto'
    const s1 = document.createElement('source')
    s1.src = '/video/characters_hero.mp4'
    s1.type = 'video/mp4; codecs="hvc1"'
    offV.appendChild(s1)
    const s2 = document.createElement('source')
    s2.src = '/video/characters_hero.webm'
    s2.type = 'video/webm'
    offV.appendChild(s2)
    offV.load()

    function startCapture() {
      const w = offV.videoWidth
      const h = offV.videoHeight
      canvas!.width = w
      canvas!.height = h
      ctx!.clearRect(0, 0, w, h)
      ctx!.drawImage(offV, 0, 0)

      const tmp = document.createElement('canvas')
      tmp.width = w
      tmp.height = h
      const tCtx = tmp.getContext('2d')!

      function grab() {
        tCtx.clearRect(0, 0, w, h)
        tCtx.drawImage(offV, 0, 0)
        createImageBitmap(tmp).then((bmp) => {
          heroFrames.push(bmp)
        })
      }

      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
        function onFrame() {
          grab()
          if (!offV.ended) (offV as any).requestVideoFrameCallback(onFrame)
        }
        ;(offV as any).requestVideoFrameCallback(onFrame)
      } else {
        let lastT = -1
        offV.addEventListener('timeupdate', () => {
          if (offV.currentTime !== lastT) {
            lastT = offV.currentTime
            grab()
          }
        })
      }

      offV.playbackRate = 1.0
      offV.play()
      offV.addEventListener('ended', () => {
        setTimeout(() => {
          if (heroFrames.length > 0) heroReady = true
        }, 300)
      })
    }

    if (offV.readyState >= 3) startCapture()
    else offV.addEventListener('canplay', () => startCapture(), { once: true })

    // Safety reveal
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.hero-intro-hidden').forEach((el) => {
        el.classList.add('hero-revealed')
      })
    }, 5000)

    // Segment definitions
    const SEGS = {
      right: { center: 0, extreme: 128, returnEnd: 166 },
      left: { center: 166, extreme: 247, returnEnd: 289 },
      up: { center: 319, extreme: 387, returnEnd: 436 },
      down: { center: 436, extreme: 531, returnEnd: 576 },
    }
    const CENTER_FRAMES = [0, 166, 289, 319, 436]
    const SIDE_EDGE = 0.3
    const VERT_EDGE = 0.3
    const CENTER_DZ = 0.08
    const INPUT_LERP = 0.07
    const FRAME_MS = 1000 / 24

    let _rawX = 0.5, _rawY = 0.5
    let _smoothX = 0.5, _smoothY = 0.5
    let _activeSeg: typeof SEGS.right | null = null
    let _targetIdx = 0
    let _returning = false
    let _lastFrameTime = 0

    const heroSection = document.querySelector('#hero section')

    function heroRelative(e: MouseEvent) {
      if (!heroSection) return { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      const r = heroSection.getBoundingClientRect()
      return {
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      }
    }

    function getDirection(rx: number, ry: number) {
      const dx = rx - 0.5, dy = ry - 0.5
      if (Math.abs(dx) < CENTER_DZ && Math.abs(dy) < CENTER_DZ) return null
      const EXTREME_VERT = 0.15
      if (ry < EXTREME_VERT) return 'up' as const
      if (ry > 1 - EXTREME_VERT) return 'down' as const
      if (rx < SIDE_EDGE) return 'left' as const
      if (rx > 1 - SIDE_EDGE) return 'right' as const
      if (ry < VERT_EDGE) return 'up' as const
      if (ry > 1 - VERT_EDGE) return 'down' as const
      if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' as const : 'left' as const
      return dy < 0 ? 'up' as const : 'down' as const
    }

    function getProgress(rx: number, ry: number) {
      const dir = getDirection(rx, ry)
      if (!dir) return 0
      if (dir === 'left') return Math.min(1, (SIDE_EDGE - rx) / SIDE_EDGE)
      if (dir === 'right') return Math.min(1, (rx - (1 - SIDE_EDGE)) / SIDE_EDGE)
      if (dir === 'up') return Math.min(1, (VERT_EDGE - ry) / VERT_EDGE)
      if (dir === 'down') return Math.min(1, (ry - (1 - VERT_EDGE)) / VERT_EDGE)
      return 0
    }

    function clampFrame(i: number) { return Math.max(0, Math.min(heroFrames.length - 1, i)) }

    function nearestCenter(idx: number) {
      let best = CENTER_FRAMES[0], bestD = Math.abs(idx - best)
      for (let i = 1; i < CENTER_FRAMES.length; i++) {
        const d = Math.abs(idx - CENTER_FRAMES[i])
        if (d < bestD) { bestD = d; best = CENTER_FRAMES[i] }
      }
      return best
    }

    function drawIdx(i: number) {
      i = clampFrame(i)
      if (i === heroCurrentIdx) return
      heroCurrentIdx = i
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(heroFrames[i], 0, 0)
    }

    const onMouseMove = (e: MouseEvent) => {
      const p = heroRelative(e)
      _rawX = p.x
      _rawY = p.y
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId: number
    function scrubLoop(ts: number) {
      animId = requestAnimationFrame(scrubLoop)
      if (heroFrames.length < 30) return

      _smoothX += (_rawX - _smoothX) * INPUT_LERP
      _smoothY += (_rawY - _smoothY) * INPUT_LERP

      const dir = getDirection(_rawX, _rawY)
      const progress = getProgress(_smoothX, _smoothY)

      if (dir !== null) {
        const seg = SEGS[dir]
        if (!_activeSeg || _activeSeg !== seg) {
          _activeSeg = seg
          _returning = false
          drawIdx(seg.center)
        }
        const range = seg.extreme - seg.center
        _targetIdx = clampFrame(seg.center + Math.round(progress * range))
        _returning = false
      } else if (_activeSeg && !_returning) {
        _returning = true
        _targetIdx = clampFrame(_activeSeg.returnEnd)
      }

      if (ts - _lastFrameTime < FRAME_MS) return
      if (heroCurrentIdx === _targetIdx) {
        if (_returning) {
          drawIdx(nearestCenter(heroCurrentIdx))
          _activeSeg = null
          _returning = false
        }
        return
      }
      _lastFrameTime = ts

      const diff = _targetIdx - heroCurrentIdx
      const maxStep = _returning ? 2 : 1
      const step = Math.sign(diff) * Math.min(maxStep, Math.abs(diff))
      drawIdx(heroCurrentIdx + step)
    }
    animId = requestAnimationFrame(scrubLoop)

    return () => {
      clearTimeout(safetyTimer)
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      offV.pause()
      offV.remove()
    }
  }, [showCanvas, isMobile, useVideos])

  return (
    <div
      className="parallax-layer hero-characters hero-intro-hidden absolute inset-0 pointer-events-none flex items-start md:items-center justify-center"
      data-speed="0.35"
      style={{ zIndex: 2 }}
    >
      {/* Desktop: canvas for cursor-driven scrub */}
      <canvas
        ref={canvasRef}
        className="w-[125%] md:w-[145%] lg:w-[52%] md:max-w-none lg:max-w-[780px] mt-[30%] md:mt-[-16%] select-none"
        style={{
          aspectRatio: '1898/1072',
          display: showCanvas ? 'block' : 'none',
          willChange: 'contents',
          clipPath: 'inset(0 2% 3% 2%)',
        }}
      />

      {/* Mobile: looping video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-[150%] md:w-[120%] lg:w-[52%] max-w-none md:max-w-none lg:max-w-[780px] mt-[30%] md:mt-[-8%] lg:mt-[-16%] select-none"
        style={{
          aspectRatio: '1928/1072',
          display: showVideo ? 'block' : 'none',
        }}
        disablePictureInPicture
      >
        <source src="/video/run_hero.mp4" type='video/mp4; codecs="hvc1"' />
        <source src="/video/run_hero.webm" type="video/webm" />
      </video>
    </div>
  )
}
