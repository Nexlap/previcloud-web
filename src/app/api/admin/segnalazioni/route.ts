import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: segnalazioni, error } = await supabaseAdmin
    .from('segnalazioni')
    .select('id, user_id, tipo, titolo, descrizione, schermata, piattaforma, priorita, stato, screenshot_url, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('admin segnalazioni error:', error)
    return NextResponse.json({ error: 'Errore caricamento' }, { status: 500 })
  }

  // Arricchisci con email utente
  const userIds = [...new Set(segnalazioni?.map(s => s.user_id).filter(Boolean))]
  const { data: profili } = await supabaseAdmin
    .from('profiles')
    .select('id, nome_azienda')
    .in('id', userIds as string[])

  const result = segnalazioni?.map(s => ({
    ...s,
    nome_azienda: profili?.find(p => p.id === s.user_id)?.nome_azienda || null,
  }))

  const resultConSignedUrl = await Promise.all(
    (result || []).map(async (s) => {
      if (!s.screenshot_url) return s
      const { data: signedData } = await supabaseAdmin.storage
        .from('segnalazioni')
        .createSignedUrl(s.screenshot_url, 3600)
      return { ...s, screenshot_url: signedData?.signedUrl || null }
    })
  )

  return NextResponse.json({ segnalazioni: resultConSignedUrl })
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
  }

  const body = await req.json()
  const { id, stato } = body

  if (!id || !stato) {
    return NextResponse.json({ error: 'id e stato obbligatori' }, { status: 400 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabaseAdmin
    .from('segnalazioni')
    .update({ stato })
    .eq('id', id)

  if (error) {
    console.error('admin segnalazioni PATCH error:', error)
    return NextResponse.json({ error: 'Errore aggiornamento' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
