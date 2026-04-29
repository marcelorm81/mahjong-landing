import { useState } from 'react'
import { useOverlay } from '@/context/OverlayContext'
import { useCookieConsent } from '@/context/CookieConsentContext'

export function CookieSettingsContent() {
  const { closeOverlay } = useOverlay()
  const { hideBanner, setPreferences } = useCookieConsent()
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  const save = () => {
    setPreferences({ necessary: true, analytics: analyticsEnabled })
    closeOverlay()
    hideBanner()
  }

  return (
    <>
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold text-gray-900 text-center">Cookie Settings</h2>
      </div>

      {/* Cookie options */}
      <div className="px-6 py-4 space-y-5">
        {/* Necessary */}
        <div className="flex items-start gap-4">
          <label className="cookie-toggle mt-0.5">
            <input type="checkbox" checked disabled />
            <span className="slider" />
          </label>
          <div>
            <p className="text-sm font-semibold text-gray-900">Necessary Cookies</p>
            <p className="text-xs text-gray-500 mt-0.5">Required for the website to function. Cannot be disabled.</p>
          </div>
        </div>

        {/* Analytics */}
        <div className="flex items-start gap-4">
          <label className="cookie-toggle mt-0.5">
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
            />
            <span className="slider" />
          </label>
          <div>
            <p className="text-sm font-semibold text-gray-900">Analytics Cookies</p>
            <p className="text-xs text-gray-500 mt-0.5">Helps us understand how visitors use the site.</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-6 pt-2 flex gap-3 justify-end">
        <button
          onClick={closeOverlay}
          className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={save}
          className="px-5 py-2.5 rounded-lg bg-ms_red text-white text-sm font-medium hover:bg-[#B00400] transition cursor-pointer"
        >
          Save Settings
        </button>
      </div>
    </>
  )
}
