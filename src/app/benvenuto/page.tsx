'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ExternalLink, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function BenvenutoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    void verificaAccesso()
  }, [])

  async function verificaAccesso() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
      return
    }

    const { data: prof } = await supabase
      .from('profiles')
      .select('termini_accettati')
      .eq('id', user.id)
      .single()

    if (prof?.termini_accettati) {
      router.replace('/dashboard')
      return
    }

    setLoading(false)
  }

  async function handleContinua() {
    if (!accepted) return
    setError('')
    setSubmitting(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
      return
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        termini_accettati: true,
        termini_accettati_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      setError('Impossibile salvare l\'accettazione. Riprova.')
      setSubmitting(false)
      return
    }

    router.push('/scarica')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-[#0E9F8E]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <header className="bg-[#0D1B2A] px-6 py-4">
        <span className="text-lg font-semibold text-white tracking-tight">
          Previ<span className="text-[#2DD4BF]">Cloud</span>
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-[#0D1B2A] text-center">
            Benvenuto su PreviCloud 👋
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Prima di continuare, leggi e accetta i termini
          </p>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                I Termini di Servizio ufficiali sono pubblicati sul sito. Aprili e leggili prima di
                continuare.
              </p>
              <Link
                href="/termini"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#0E9F8E]/30 bg-[#0E9F8E]/5 text-sm font-semibold text-[#0E9F8E] hover:bg-[#0E9F8E]/10 transition-all"
              >
                Apri i Termini di Servizio
                <ExternalLink size={15} />
              </Link>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#0E9F8E] focus:ring-[#0E9F8E]"
                />
                <span className="text-sm text-gray-700">
                  Ho letto e accetto i{' '}
                  <Link
                    href="/termini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E9F8E] font-medium hover:underline underline-offset-2"
                  >
                    Termini di Servizio
                  </Link>
                </span>
              </label>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={() => void handleContinua()}
                disabled={!accepted || submitting}
                className="w-full py-2.5 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#162540] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 size={15} className="animate-spin" />}
                Continua
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
