import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: targetUserId } = await params

  // 1. Verifica chi chiama è autenticato E admin
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

  // 2. Valida body
  const body = await req.json()
  const { trial_inizio, trial_ends_at, plan } = body
  if (trial_inizio && isNaN(Date.parse(trial_inizio))) {
    return NextResponse.json({ error: 'trial_inizio non valido' }, { status: 400 })
  }
  if (trial_ends_at && isNaN(Date.parse(trial_ends_at))) {
    return NextResponse.json({ error: 'trial_ends_at non valido' }, { status: 400 })
  }

  // 3. Scrivi sul profilo target con service role
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const updateData: Record<string, string | null> = {}
  if (trial_inizio !== undefined) updateData.trial_inizio = trial_inizio
  if (trial_ends_at !== undefined) updateData.trial_ends_at = trial_ends_at
  if (plan !== undefined) updateData.plan = plan

  const { error } = await supabaseAdmin
    .from('profiles')
    .update(updateData)
    .eq('id', targetUserId)

  if (error) {
    console.error('admin trial update error:', error)
    return NextResponse.json({ error: 'Errore aggiornamento' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
