'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'previcloud-cookie-consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180 // 180 giorni

type Consent = 'accepted' | 'rejected'

/**
 * Banner cookie GDPR minimale.
 *
 * Stato attuale: il sito usa solo cookie tecnici essenziali (Stripe, Supabase).
 * La scelta viene ricordata in localStorage + cookie. Eventuali script non
 * essenziali futuri devono essere caricati solo dopo `hasConsent('accepted')`.
 */
export function hasConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'rejected' ? value : null
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hasConsent()) setVisible(true)
  }, [])

  function persist(consent: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, consent)
    } catch {
      // localStorage non disponibile: ricadiamo sul solo cookie
    }
    document.cookie = `${STORAGE_KEY}=${consent}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
    setVisible(false)
    // Segnala il consenso ad eventuali listener che caricano script non essenziali
    window.dispatchEvent(new CustomEvent('previcloud-cookie-consent', { detail: consent }))
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
          Usiamo solo cookie tecnici essenziali per far funzionare il sito (accesso e pagamenti). Non usiamo
          cookie di profilazione o marketing. Maggiori dettagli nella{' '}
          <Link href="/cookie-policy" className="text-[#0E9F8E] font-semibold underline underline-offset-2 hover:text-[#0B7A6D]">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => persist('rejected')}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Rifiuta
          </button>
          <button
            onClick={() => persist('accepted')}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#0E9F8E] hover:bg-[#0B7A6D] transition-colors cursor-pointer"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
