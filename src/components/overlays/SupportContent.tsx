export function SupportContent() {
  return (
    <>
      <p className="text-base leading-relaxed mb-1">Something not working the way it should?</p>
      <p className="text-base leading-relaxed font-semibold text-gray-900 mb-4">We've got you.</p>
      <p className="text-sm text-gray-600 mb-8">Whether it's your account, a match, or a purchase, just reach out and we'll help you sort it.</p>

      <div className="mb-8">
        <img src="/img/support.png" alt="Support" className="w-[85%] md:w-[52%] object-contain" />
      </div>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Get in touch</h3>
      <p className="text-sm mb-4"><a href="mailto:support@mahjongstars.com" className="text-red-600 hover:text-red-700 font-medium">support@mahjongstars.com</a></p>
      <p className="text-sm text-gray-600 mb-2">A few details help us move faster:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Your username or Player ID</li>
        <li>The email linked to your account</li>
        <li>What happened (short and clear is perfect)</li>
        <li>Screenshots, if you have them</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">We usually reply within 48 hours on business days.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Account &amp; login</h3>
      <p className="text-sm text-gray-600 mb-3">Locked out? Something feels off?</p>
      <p className="text-sm text-gray-600 mb-2">Send us:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Your username</li>
        <li>Last time you accessed your account (roughly)</li>
        <li>Device you were using</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">We may ask a couple of extra questions, just to keep things secure.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Purchases</h3>
      <p className="text-sm text-gray-600 mb-2">Bought something through Apple or Google Play?</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
        <li>Apple &rarr; request refunds via <span className="text-gray-800 font-medium">reportaproblem.apple.com</span></li>
        <li>Google Play &rarr; follow Google Play refund flow</li>
      </ul>
      <p className="text-sm text-gray-600 mb-2">We don't process store refunds directly, but we'll guide you if something feels wrong.</p>
      <p className="text-sm text-gray-600 mb-2">If a payment is reversed, some in-game items may be affected.</p>
      <p className="text-sm text-gray-500 mb-8">Best to contact us first so we can help before things get messy.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">StarPoints</h3>
      <p className="text-sm text-gray-600 mb-3">StarPoints live inside the game.</p>
      <p className="text-sm text-gray-600 mb-2">They:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Have no real-world value</li>
        <li>Can't be withdrawn</li>
        <li>Are used only in MahjongStars</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">If something doesn't look right, tell us and we'll check.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Technical issues</h3>
      <p className="text-sm text-gray-600 mb-3">Game acting weird?</p>
      <p className="text-sm text-gray-600 mb-2">Send us:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Your device</li>
        <li>OS version</li>
        <li>App version</li>
        <li>What happened</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">The clearer it is, the faster we fix it.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Reporting players</h3>
      <p className="text-sm text-gray-600 mb-3">Seen something that doesn't feel fair?</p>
      <p className="text-sm text-gray-600 mb-2">Let us know:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>Username</li>
        <li>What happened</li>
        <li>Screenshots if possible</li>
      </ul>
      <p className="text-sm text-gray-500 mb-8">We take this seriously. Always.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Play, but keep it healthy</h3>
      <p className="text-sm text-gray-600 mb-1">MahjongStars is about fun, not pressure.</p>
      <p className="text-sm text-gray-600 mb-4">No gambling, no real money.</p>
      <p className="text-sm text-gray-500 mb-8">If it stops feeling fun, it's a good moment to pause.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy &amp; legal</h3>
      <p className="text-sm text-gray-600 mb-2">For data, privacy, or legal questions:</p>
      <p className="text-sm mb-8"><a href="mailto:privacy@mahjongstars.com" className="text-red-600 hover:text-red-700 font-medium">privacy@mahjongstars.com</a></p>

      <hr className="border-gray-200 mb-6" />

      <p className="text-sm text-gray-500 text-center">If something's off, just write.<br />We're on the other side.</p>
    </>
  )
}
