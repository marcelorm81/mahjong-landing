import { useOverlay } from '@/context/OverlayContext'
import type { OverlayType } from '@/context/OverlayContext'

export function Footer() {
  const { openOverlay } = useOverlay()

  const links: { label: string; overlay: OverlayType }[] = [
    { label: 'How To Play', overlay: 'howToPlay' },
    { label: 'Support', overlay: 'support' },
    { label: 'Terms and Conditions', overlay: 'terms' },
    { label: 'Privacy Policy', overlay: 'privacy' },
    { label: 'Cookie Policy', overlay: 'cookiePolicy' },
    { label: 'Cookie Settings', overlay: 'cookieSettings' },
  ]

  return (
    <footer id="footer" className="bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-6 justify-center mb-8 text-sm">
          {links.map(({ label, overlay }) => (
            <a
              key={label}
              href="#"
              onClick={(e) => { e.preventDefault(); openOverlay(overlay) }}
              className="text-gray-300 hover:text-white transition"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="text-center">
          <h4 className="font-bold text-sm mb-2">RESPONSIBLE PLAY NOTICE</h4>
          <p className="text-gray-400 text-xs max-w-2xl mx-auto leading-relaxed">
            Mahjong Stars is a social game intended for an adult audience. The game does not offer
            real-money gambling or prizes. In-game currency has no real-world value and cannot be
            exchanged for cash or goods. Play responsibly and set your own limits.
          </p>
        </div>

        <div className="flex items-center justify-between mt-8 border-t border-white/10 pt-6">
          <p className="text-gray-500 text-xs">&copy;2026 WASABI GAMES DMCC</p>
          <a
            href="https://www.instagram.com/mahjongstars"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
