'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Loader2, CheckCircle2, Building2, ListChecks, MessageSquare } from 'lucide-react'

export default function Settings() {
  const [form, setForm] = useState({
    nome_azienda: '',
    categoria: 'idraulico',
    citta: '',
    piva: '',
    telefono: '',
    listino: '',
    tono: 'professionale e diretto',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { caricaProfilo() }, [])

  async function caricaProfilo() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (data) setForm({
      nome_azienda: data.nome_azienda || '',
      categoria: data.categoria || 'idraulico',
      citta: data.citta || '',
      piva: data.piva || '',
      telefono: data.telefono || '',
      listino: data.listino || '',
      tono: data.tono || 'professionale e diretto',
    })
    setLoading(false)
  }

  async function salva() {
    setSaving(true)
    setSaved(false)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update(form).eq('id', user.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function addVoce(v: string) {
    setForm(f => ({ ...f, listino: f.listino ? f.listino + '\n' + v : v }))
  }

  if (loading) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <DashboardLayout nomeAzienda={form.nome_azienda || 'Artigiano'} activeRoute="/dashboard/settings">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy tracking-tight">Impostazioni</h1>
        <p className="text-sm text-brand-muted mt-1">Dati azienda, listino e tono usati dall&apos;AI</p>
      </div>

      <div className="bg-white border border-brand-border rounded-card-lg p-6 shadow-card mb-4">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center shrink-0">
              <Building2 size={16} className="text-brand-muted" />
            </div>
            <h2 className="text-base font-semibold text-brand-navy">Dati azienda</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1.5">Nome / Azienda</label>
              <input value={form.nome_azienda} onChange={e => set('nome_azienda', e.target.value)}
                placeholder="es. Rossi Impianti"
                className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1.5">Categoria</label>
              <select value={form.categoria} onChange={e => set('categoria', e.target.value)}
                className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none transition-colors">
                <option value="idraulico">🔧 Idraulico</option>
                <option value="elettricista">⚡ Elettricista</option>
                <option value="falegname">🪵 Falegname</option>
                <option value="estetista">💇 Estetista</option>
                <option value="imbianchino">🖌️ Imbianchino</option>
                <option value="fotografo">📸 Fotografo</option>
                <option value="altro">🔨 Altro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1.5">Città</label>
              <input value={form.citta} onChange={e => set('citta', e.target.value)}
                placeholder="es. Roma"
                className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1.5">P.IVA</label>
              <input value={form.piva} onChange={e => set('piva', e.target.value)}
                placeholder="es. 12345678901"
                className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wide mb-1.5">Telefono</label>
            <input value={form.telefono} onChange={e => set('telefono', e.target.value)}
              placeholder="es. 339 1234567"
              className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none transition-colors" />
          </div>
        </div>

        <div className="bg-white border border-brand-border rounded-card-lg p-6 shadow-card mb-4">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center shrink-0">
              <ListChecks size={16} className="text-brand-muted" />
            </div>
            <h2 className="text-base font-semibold text-brand-navy">Listino prezzi</h2>
          </div>
          <p className="text-xs text-brand-muted-2 mb-4 ml-[42px]">L&apos;AI userà questi prezzi per ogni preventivo. Aggiornalo quando vuoi.</p>

          <div className="bg-brand-bg rounded-xl p-3 mb-3">
            <p className="text-xs text-brand-muted mb-2 font-medium">Aggiungi voci rapide:</p>
            <div className="flex flex-wrap gap-2">
              {['Sostituzione rubinetto: €80', 'Perdita tubo: €60-120', 'Cassetta WC: €70', 'Sblocco scarico: €55', 'Caldaia: €90', 'Urgenza: +50%'].map(v => (
                <button key={v} type="button" onClick={() => addVoce(v)}
                  className="text-xs px-3 py-2 bg-white border border-brand-border rounded-full cursor-pointer hover:border-brand-teal hover:text-brand-teal transition-all">
                  + {v}
                </button>
              ))}
            </div>
          </div>

          <textarea value={form.listino} onChange={e => set('listino', e.target.value)}
            rows={7} placeholder={'es. Sostituzione rubinetto: €80 manodopera + materiali\nPerdita tubo: €60-120\nUrgenza fuori orario: +50%'}
            className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none resize-none leading-relaxed transition-colors" />
        </div>

        <div className="bg-white border border-brand-border rounded-card-lg p-6 shadow-card mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-brand-muted" />
            </div>
            <h2 className="text-base font-semibold text-brand-navy">Tono di comunicazione</h2>
          </div>
          <select value={form.tono} onChange={e => set('tono', e.target.value)}
            className="w-full px-3 py-2.5 border border-brand-border rounded-xl text-sm bg-brand-bg focus:bg-white focus:border-brand-teal outline-none transition-colors">
            <option value="professionale e diretto, come parlerei di persona">Professionale e diretto</option>
            <option value="cordiale e molto disponibile">Cordiale e disponibile</option>
            <option value="formale e preciso">Formale e preciso</option>
            <option value="semplice e informale">Semplice e informale</option>
          </select>
        </div>

        <button onClick={salva} disabled={saving}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
            saved ? 'bg-brand-teal text-white' : 'bg-brand-navy text-white hover:bg-[#162540]'
          }`}>
          {saving && <Loader2 size={15} className="animate-spin" />}
          {saved && <CheckCircle2 size={16} />}
          {saved ? 'Salvato!' : 'Salva impostazioni'}
        </button>

    </DashboardLayout>
  )
}