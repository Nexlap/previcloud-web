'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    Termly?: {
      initialize: () => void
    }
  }
}

function initializeTermly() {
  if (typeof window === 'undefined' || !window.Termly) return false
  try {
    window.Termly.initialize()
    return true
  } catch {
    return false
  }
}

/** Reinizializza Termly a ogni navigazione client-side (App Router). */
export default function TermlyInit() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (initializeTermly()) return

    // Lo script beforeInteractive può non aver esposto ancora window.Termly
    const intervalId = window.setInterval(() => {
      if (initializeTermly()) {
        window.clearInterval(intervalId)
      }
    }, 100)

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId)
    }, 10000)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [pathname, searchParams])

  return null
}
