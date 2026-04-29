import { GAME_URL } from '@/data/constants'

export function HeroContent() {
  return (
    <div className="relative z-30 flex h-full w-full items-end justify-center pb-[26%] md:pb-[8%]">
      <div className="hero-content hero-intro-hidden flex flex-col items-center text-center px-6">
        <h1 className="font-title text-white text-5xl md:text-7xl font-bold leading-[0.9] md:leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          <span className="md:hidden">Race for the Win.</span>
          <span className="hidden md:inline">Reach for the Win.</span>
        </h1>
        <p className="mt-1.5 md:mt-2 text-gray-200 max-w-xl text-sm md:text-lg drop-shadow-lg">
          A modern, social take on Mahjong. Bold characters, fast&nbsp;rounds.
          <br className="hidden md:inline" /> Smart AI that learns how you play. Same soul, new&nbsp;rhythm.
        </p>

        <a id="heroPlayBtn" href={GAME_URL} className="mt-4 md:mt-6" style={{ transition: 'opacity 0.4s ease' }}>
          <button className="bg-ms_red hover:bg-red-700 text-white font-bold text-base md:text-lg px-8 md:px-10 py-3 rounded-md shadow-[0_4px_30px_rgba(208,5,1,0.5)] transition cursor-pointer hover:shadow-[0_4px_40px_rgba(208,5,1,0.7)]">
            PLAY NOW
          </button>
        </a>
      </div>
    </div>
  )
}
