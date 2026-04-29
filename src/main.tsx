import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OverlayProvider } from './context/OverlayContext'
import { CookieConsentProvider } from './context/CookieConsentContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OverlayProvider>
      <CookieConsentProvider>
        <App />
      </CookieConsentProvider>
    </OverlayProvider>
  </StrictMode>,
)
