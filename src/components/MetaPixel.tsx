'use client'

import { useEffect } from 'react'

const POLL_INTERVAL_MS = 500
const POLL_MAX_MS = 15_000
const TERMLY_CACHE_KEY = 'TERMLY_API_CACHE'
const PIXEL_ID = '1014945258103711'
const FB_EVENTS_SRC = 'https://connect.facebook.net/en_US/fbevents.js'

type TermlyApiCache = {
  TERMLY_COOKIE_CONSENT?: {
    value?: {
      advertising?: boolean
    }
  }
}

let metaPixelInjected = false

/**
 * Ritorna:
 * - `true` se advertising è stato accettato
 * - `false` se advertising è stato rifiutato esplicitamente
 * - `null` se Termly non ha ancora scritto il consenso in localStorage
 */
function getTermlyAdvertisingConsent(): boolean | null {
  try {
    const raw = localStorage.getItem(TERMLY_CACHE_KEY)
    if (!raw) return null

    const cache = JSON.parse(raw) as TermlyApiCache
    const advertising = cache?.TERMLY_COOKIE_CONSENT?.value?.advertising

    if (typeof advertising !== 'boolean') return null
    return advertising
  } catch {
    return null
  }
}

function injectMetaPixel(): void {
  if (metaPixelInjected) return

  if (document.querySelector(`script[src="${FB_EVENTS_SRC}"]`)) {
    metaPixelInjected = true
    return
  }

  const fbScript = document.createElement('script')
  fbScript.async = true
  fbScript.src = FB_EVENTS_SRC
  fbScript.setAttribute('data-categories', 'advertising')
  document.body.appendChild(fbScript)

  const inlineScript = document.createElement('script')
  inlineScript.setAttribute('data-categories', 'advertising')
  inlineScript.textContent = `
    if(!window.fbq){var n=window.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!window._fbq)window._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}
    fbq('init', '${PIXEL_ID}');
    fbq('track', 'PageView');
  `
  document.body.appendChild(inlineScript)

  metaPixelInjected = true
}

export default function MetaPixel() {
  useEffect(() => {
    const tryInject = (): boolean => {
      if (metaPixelInjected) return true

      const consent = getTermlyAdvertisingConsent()
      if (consent === null) return false
      if (consent) injectMetaPixel()
      return true
    }

    if (tryInject()) return

    const startedAt = Date.now()
    const intervalId = window.setInterval(() => {
      if (tryInject()) {
        window.clearInterval(intervalId)
        return
      }
      if (Date.now() - startedAt >= POLL_MAX_MS) {
        window.clearInterval(intervalId)
      }
    }, POLL_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  return null
}
