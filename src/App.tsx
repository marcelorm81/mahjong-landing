import { Navbar } from './components/Navbar'
import { HeroSection } from './components/hero/HeroSection'
import { FeaturesSection } from './components/features/FeaturesSection'
import { GameModesSection } from './components/game/GameModesSection'
import { CharactersSection } from './components/characters/CharactersSection'
import { DownloadSection } from './components/DownloadSection'
import { Footer } from './components/Footer'
import { CookieBanner } from './components/CookieBanner'
import { OverlayManager } from './components/overlays/OverlayManager'
import { CursorTileCanvas } from './components/hero/CursorTileCanvas'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  return (
    <>
      <CursorTileCanvas />
      <div className="min-h-screen w-full relative">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <FeaturesSection />
          <GameModesSection />
          <CharactersSection />
          <DownloadSection />
          <Footer />
        </div>
      </div>

      <CookieBanner />
      <OverlayManager />
    </>
  )
}
