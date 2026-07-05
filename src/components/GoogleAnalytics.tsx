'use client'

import { useEffect } from 'react'

const POLL_INTERVAL_MS = 500
const POLL_MAX_MS = 15_000

/**
 * Cookie Termly che memorizza le policy/categorie accettate dall'utente.
 * Nome reale: `_tltpl` + suffisso (es. `_tltpl520c2b0c...`); vedi cookie policy Termly.
 */
const TERMLY_POLICY_COOKIE_PREFIX = '_tltpl'

type TermlyConsentState = {
  analytics?: boolean
}

type TermlyWithConsent = {
  getConsentState?: () => TermlyConsentState | undefined
}

let gaInjected = false

function getTermlyConsentApi(): TermlyWithConsent | undefined {
  return (window as Window & { Termly?: TermlyWithConsent }).Termly
}

function parsePolicyCookieValue(value: string): boolean | null {
  if (/\banalytics\b/i.test(value)) return true

  try {
    const parsed = JSON.parse(value) as unknown
    if (Array.isArray(parsed)) {
      return parsed.includes('analytics')
    }
    if (parsed && typeof parsed === 'object') {
      const record = parsed as Record<string, unknown>
      if (typeof record.analytics === 'boolean') return record.analytics
      if (Array.isArray(record.categories)) {
        return record.categories.includes('analytics')
      }
    }
  } catch {
    /* valore non-JSON */
  }

  return null
}

/**
 * Ritorna:
 * - `true` / `false` se il consenso analytics è determinato
 * - `null` se Termly non ha ancora scritto cookie né esposto getConsentState
 */
function hasTermlyAnalyticsConsent(): boolean | null {
  const apiState = getTermlyConsentApi()?.getConsentState?.()
  if (apiState !== undefined && typeof apiState.analytics === 'boolean') {
    return apiState.analytics
  }

  let foundPolicyCookie = false
  for (const entry of document.cookie.split(';')) {
    const trimmed = entry.trim()
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const name = trimmed.slice(0, eq)
    if (!name.startsWith(TERMLY_POLICY_COOKIE_PREFIX)) continue

    foundPolicyCookie = true
    const value = decodeURIComponent(trimmed.slice(eq + 1))
    const parsed = parsePolicyCookieValue(value)
    if (parsed !== null) return parsed
  }

  if (foundPolicyCookie) return false

  return null
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

      const consent = hasTermlyAnalyticsConsent()
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
