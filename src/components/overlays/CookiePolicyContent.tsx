export function CookiePolicyContent() {
  return (
    <>
      <p className="text-xs text-gray-400 mb-1">Effective Date: 1 January 2026</p>
      <p className="text-xs text-gray-400 mb-6">Last Updated: 12 February 2026</p>

      <div className="mb-8">
        <img src="/img/cookies.png" alt="Cookies" className="w-[85%] md:w-[37%] object-contain" />
      </div>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">1. What Cookies Are</h3>
      <p className="text-sm text-gray-600 mb-8">Cookies are small text files stored on your device when you visit a website. Similar technologies include pixels and local storage.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">2. Why We Use Cookies</h3>
      <p className="text-sm text-gray-600 mb-2">We use cookies to:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-8 space-y-1">
        <li>keep the site secure and functioning</li>
        <li>remember preferences</li>
        <li>understand site usage to improve performance</li>
        <li>help prevent fraud and abuse</li>
      </ul>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">3. Types of Cookies We Use</h3>

      <h4 className="text-base font-semibold text-gray-800 mb-2">3.1 Strictly Necessary Cookies</h4>
      <p className="text-sm text-gray-600 mb-4">Required for core functionality such as login, session security, and fraud prevention. These cannot be disabled.</p>

      <h4 className="text-base font-semibold text-gray-800 mb-2">3.2 Preferences Cookies</h4>
      <p className="text-sm text-gray-600 mb-4">Help remember choices like language or region (if enabled).</p>

      <h4 className="text-base font-semibold text-gray-800 mb-2">3.3 Analytics Cookies</h4>
      <p className="text-sm text-gray-600 mb-4">Help us understand how users interact with the site so we can improve performance and user experience.</p>

      <h4 className="text-base font-semibold text-gray-800 mb-2">3.4 Marketing Cookies (If Ever Enabled)</h4>
      <p className="text-sm text-gray-600 mb-8">Used to measure advertising effectiveness and show relevant marketing. If enabled, we will request consent where required.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">4. Consent (EU/UK)</h3>
      <p className="text-sm text-gray-600 mb-2">Where required by law, we will request your consent before setting non-essential cookies. You can change cookie preferences at any time via:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-8 space-y-1">
        <li>our cookie banner/settings (if available), and/or</li>
        <li>your browser settings.</li>
      </ul>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">5. Managing Cookies</h3>
      <p className="text-sm text-gray-600 mb-2">Most browsers allow you to:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
        <li>delete cookies</li>
        <li>block cookies</li>
        <li>control cookie behavior per site</li>
      </ul>
      <p className="text-sm text-gray-600 mb-8">Blocking some cookies may affect site functionality.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">6. Third-Party Cookies</h3>
      <p className="text-sm text-gray-600 mb-8">Some cookies may be set by third-party service providers we use (for example, analytics or security providers).</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">7. Analytics Cookies</h3>
      <p className="text-sm text-gray-600 mb-3">If you consent to analytics, our website uses Google Analytics 4 ("GA4") to understand how visitors use the site.</p>
      <p className="text-sm text-gray-600 mb-8">If you later withdraw consent, analytics cookies may remain stored in your browser until they expire, but they are no longer used by our website.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">8. Data Collected by Analytics Cookies</h3>
      <p className="text-sm text-gray-600 mb-2">If you consent to analytics, GA4 may collect information such as:</p>
      <ul className="text-sm text-gray-600 list-disc pl-5 mb-8 space-y-1">
        <li>IP address (anonymized where applicable)</li>
        <li>Device type, operating system, and browser version</li>
        <li>Screen resolution and device settings</li>
        <li>Pages visited and time spent on each page</li>
        <li>Clicks, scrolls, and general interaction data</li>
        <li>Referrer URL (the site you came from)</li>
        <li>Approximate geographic region (city/country level)</li>
        <li>Session duration and navigation paths</li>
      </ul>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">9. Google Analytics 4 Cookies</h3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-3 py-2 font-semibold text-gray-800 border-b border-gray-200">Cookie Name</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-800 border-b border-gray-200">Purpose</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-800 border-b border-gray-200">Expiration</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr>
              <td className="px-3 py-2 border-b border-gray-100 font-mono text-xs">_ga</td>
              <td className="px-3 py-2 border-b border-gray-100">Used to distinguish unique users by assigning a random identifier.</td>
              <td className="px-3 py-2 border-b border-gray-100">2 years</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-mono text-xs">_ga_&lt;container-id&gt;</td>
              <td className="px-3 py-2">Stores session state and helps GA4 track session counts and engagement.</td>
              <td className="px-3 py-2">2 years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600 mb-8">GA4 may also operate without cookies when consent is denied.</p>

      <hr className="border-gray-200 mb-8" />

      <h3 className="text-xl font-bold text-gray-900 mb-3">10. Updates</h3>
      <p className="text-sm text-gray-600">We may update this Cookie Policy as our website evolves.</p>
    </>
  )
}
