export function HowToPlayContent() {
  return (
    <>
      <p className="text-base leading-relaxed mb-2">Welcome to MahjongStars.</p>
      <p className="text-base leading-relaxed mb-4">A social, skill-based Mahjong game where reading the table matters more than luck.</p>
      <p className="text-sm text-gray-400 italic mb-6">Think patterns, timing, and a bit of instinct.</p>

      <div className="mb-8">
        <img src="/img/handphone copy.png" alt="Gameplay" className="w-[85%] md:w-[95%] object-contain" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">What is MahjongStars?</h3>
      <p className="text-sm text-gray-600 mb-3">A digital Mahjong experience built around:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Strategy over chance</li>
        <li>Pattern building</li>
        <li>Smart decisions under pressure</li>
        <li>Playing with others, not alone</li>
      </ul>
      <p className="text-sm text-gray-700 mb-1">No betting. No real money.</p>
      <p className="text-sm text-gray-500 mb-8">Just StarPoints, used only inside the game.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">How do you learn?</h3>
      <p className="text-sm text-gray-600 mb-3"><strong>Start with the Tutorial.</strong></p>
      <p className="text-sm text-gray-600 mb-2">It walks you through:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Rules and tile types</li>
        <li>Winning hands</li>
        <li>Scoring</li>
        <li>Game flow</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">Step by step, interactive, and made for both beginners and experienced players.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">The core idea</h3>
      <p className="text-sm text-gray-600 mb-3">Mahjong is simple to start, hard to master.</p>
      <p className="text-sm text-gray-600 mb-2">You:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Build combinations</li>
        <li>Complete a valid hand</li>
        <li>Read opponents</li>
        <li>Choose the right moment</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">Every move shapes the outcome.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Getting started</h3>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Create your account</li>
        <li>Log in</li>
        <li>Open the Tutorial</li>
        <li>Play your first table</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">That's it. You're in.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Quick questions</h3>
      <div className="space-y-4 mb-8">
        <div>
          <p className="text-sm font-semibold text-gray-800">Is this gambling?</p>
          <p className="text-sm text-gray-600">No. It's a social game. No betting, no cash prizes.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Can I withdraw money?</p>
          <p className="text-sm text-gray-600">No. StarPoints stay in the game.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Do I need experience?</p>
          <p className="text-sm text-gray-600">Not at all. The Tutorial has you covered.</p>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      <p className="text-sm text-gray-500 text-center">
        If something feels unclear, reach us at<br />
        <a href="mailto:support@mahjongstars.com" className="text-red-600 hover:text-red-700 font-medium">support@mahjongstars.com</a>
      </p>
    </>
  )
}
