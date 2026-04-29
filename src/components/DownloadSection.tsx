import { useEffect, useRef } from 'react'
import { GAME_URL } from '@/data/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function DownloadSection() {
  const { useVideos } = useMediaQuery()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Lazy playback: pause when not in viewport
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div id="download">
      <section className="px-4 md:px-6 py-12 md:py-20 bg-ms_bg text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Cat with phone */}
          <div className="flex-shrink-0 relative w-[60%] md:w-full max-w-sm mx-auto reveal-left">
            {useVideos ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full relative z-10"
                disablePictureInPicture
              >
                <source src="/video/catmoving.mp4" type='video/mp4; codecs="hvc1"' />
                <source src="/video/catmoving.webm" type="video/webm" />
                <img src="/img/catphone.webp" alt="Cat playing" className="w-full" />
              </video>
            ) : (
              <img src="/img/catphone.webp" alt="Cat playing" className="w-full relative z-10" />
            )}
          </div>

          {/* Text + Button */}
          <div className="text-center md:text-left reveal-right reveal-delay-1">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg">Play Anywhere</h1>
            <p className="text-gray-300 mb-8 text-lg">
              Couch. Commute. Lunch break. We&nbsp;don't&nbsp;judge.
            </p>
            <a href={GAME_URL}>
              <button className="bg-ms_red hover:bg-[#B00400] text-white font-bold px-10 py-3 rounded-md shadow-lg transition cursor-pointer mb-6">
                PLAY NOW
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
