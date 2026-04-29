import { useCookieConsent } from '@/context/CookieConsentContext'
import { useOverlay } from '@/context/OverlayContext'

export function CookieBanner() {
  const { bannerVisible, hideBanner } = useCookieConsent()
  const { openOverlay } = useOverlay()

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-t border-white/20 px-6 py-4 text-white transition-all duration-500 ${
        bannerVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-gray-300 text-sm leading-relaxed text-left">
          We use cookies to improve your experience and analyze traffic. You can accept all, reject
          non-essential cookies, or customize your preferences.
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); openOverlay('cookiePolicy') }}
            className="underline text-gray-200 hover:text-white ml-1 cursor-pointer"
          >
            Read more
          </button>
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={hideBanner}
            className="bg-white/10 border border-white/20 px-4 py-2 rounded hover:bg-white/20 transition cursor-pointer"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); openOverlay('cookieSettings') }}
            className="bg-white/10 border border-white/20 px-4 py-2 rounded hover:bg-white/20 transition cursor-pointer"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={hideBanner}
            className="bg-ms_red hover:bg-[#B00400] text-white font-semibold px-6 py-2 rounded transition cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
