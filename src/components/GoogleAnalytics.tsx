'use client'

import { useEffect } from 'react'

export default function GoogleAnalytics() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!measurementId) return

    const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    if (document.querySelector(`script[src="${gtagSrc}"]`)) return

    const gtagScript = document.createElement('script')
    gtagScript.type = 'text/plain'
    gtagScript.setAttribute('data-categories', 'analytics')
    gtagScript.src = gtagSrc
    gtagScript.async = true
    document.body.appendChild(gtagScript)

    const inlineScript = document.createElement('script')
    inlineScript.type = 'text/plain'
    inlineScript.setAttribute('data-categories', 'analytics')
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `
    document.body.appendChild(inlineScript)
  }, [])

  return null
}
