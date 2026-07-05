'use client'

import { useEffect } from 'react'

const POLL_INTERVAL_MS = 500
const POLL_MAX_MS = 15_000
const TERMLY_CACHE_KEY = 'TERMLY_API_CACHE'

type TermlyApiCache = {
  TERMLY_COOKIE_CONSENT?: {
    value?: {
      analytics?: boolean
    }
  }
}

let gaInjected = false

/**
 * Ritorna:
 * - `true` se analytics è stato accettato
 * - `false` se analytics è stato rifiutato esplicitamente
 * - `null` se Termly non ha ancora scritto il consenso in localStorage
 */
function getTermlyAnalyticsConsent(): boolean | null {
  try {
    const raw = localStorage.getItem(TERMLY_CACHE_KEY)
    if (!raw) return null

    const cache = JSON.parse(raw) as TermlyApiCache
    const analytics = cache?.TERMLY_COOKIE_CONSENT?.value?.analytics

    if (typeof analytics !== 'boolean') return null
    return analytics
  } catch {
    return null
  }
}

function injectGoogleAnalytics(measurementId: string): void {
  if (gaInjected) return

  const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  if (document.querySelector(`script[src="${gtagSrc}"]`)) {
    gaInjected = true
    return
  }

  const gtagScript = document.createElement('script')
  gtagScript.async = true
  gtagScript.src = gtagSrc
  gtagScript.setAttribute('data-categories', 'analytics')
  document.body.appendChild(gtagScript)

  const inlineScript = document.createElement('script')
  inlineScript.setAttribute('data-categories', 'analytics')
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `
  document.body.appendChild(inlineScript)

  gaInjected = true
}

export default function GoogleAnalytics() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!measurementId) return

    const tryInject = (): boolean => {
      if (gaInjected) return true

      const consent = getTermlyAnalyticsConsent()
      if (consent === null) return false
      if (consent) injectGoogleAnalytics(measurementId)
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
