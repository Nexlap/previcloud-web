export const ATTRIBUTION_STORAGE_KEY = 'pc_beta_attribution'

export type AttributionSnapshot = {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  utmTerm: string
  referrer: string
  landingPage: string
}

const emptyAttribution = (): AttributionSnapshot => ({
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
  referrer: '',
  landingPage: '',
})

/** Salva first-touch UTM/referrer in sessionStorage (una sola volta per sessione). */
export function captureFirstTouchAttribution(): AttributionSnapshot {
  if (typeof window === 'undefined') return emptyAttribution()

  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (stored) {
      return { ...emptyAttribution(), ...(JSON.parse(stored) as Partial<AttributionSnapshot>) }
    }

    const params = new URLSearchParams(window.location.search)
    const snapshot: AttributionSnapshot = {
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      utmContent: params.get('utm_content') ?? '',
      utmTerm: params.get('utm_term') ?? '',
      referrer: document.referrer || '',
      landingPage: window.location.href,
    }
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(snapshot))
    return snapshot
  } catch {
    return emptyAttribution()
  }
}
