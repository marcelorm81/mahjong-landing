import { Overlay } from './Overlay'
import { HowToPlayContent } from './HowToPlayContent'
import { SupportContent } from './SupportContent'
import { TermsContent } from './TermsContent'
import { PrivacyContent } from './PrivacyContent'
import { CookiePolicyContent } from './CookiePolicyContent'
import { CookieSettingsContent } from './CookieSettingsContent'

export function OverlayManager() {
  return (
    <>
      <Overlay type="howToPlay" title="How To Play">
        <HowToPlayContent />
      </Overlay>
      <Overlay type="support" title="Support">
        <SupportContent />
      </Overlay>
      <Overlay type="terms" title="Terms of Service">
        <TermsContent />
      </Overlay>
      <Overlay type="privacy" title="Privacy Policy">
        <PrivacyContent />
      </Overlay>
      <Overlay type="cookiePolicy" title="Cookie Policy">
        <CookiePolicyContent />
      </Overlay>
      <Overlay type="cookieSettings" title="Cookie Settings" variant="compact">
        <CookieSettingsContent />
      </Overlay>
    </>
  )
}
