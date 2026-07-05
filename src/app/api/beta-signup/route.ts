import { NextRequest, NextResponse } from 'next/server'

const DESTINATARIO = 'previ_cloud@proton.me'

interface BetaSignupPayload {
  nome?: string
  whatsapp?: string
  email?: string
  professione?: string
  preventiviMensili?: string
  metodiAttuali?: string[]
  dispositivoPrincipale?: string
  accettaPrivacy?: boolean
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildEmailHtml(data: BetaSignupPayload): string {
  const metodi = Array.isArray(data.metodiAttuali) ? data.metodiAttuali.join(', ') : ''
  const righe: Array<[string, string]> = [
    ['Nome e cognome', data.nome ?? ''],
    ['WhatsApp', data.whatsapp ?? ''],
    ['Email', data.email ?? ''],
    ['Professione', data.professione ?? ''],
    ['Preventivi mensili', data.preventiviMensili ?? ''],
    ['Metodi attuali', metodi],
    ['Dispositivo principale', data.dispositivoPrincipale ?? ''],
    ['Privacy accettata', data.accettaPrivacy ? 'Sì' : 'No'],
  ]

  const rowsHtml = righe
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #E5E7EB;font-weight:600;color:#0D1B2A;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #E5E7EB;color:#374151;">${escapeHtml(value) || '<span style="color:#9CA3AF;">—</span>'}</td>
        </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuova iscrizione beta</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F8FA;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F8FA;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,27,42,0.08);">
          <tr>
            <td style="background-color:#0D1B2A;padding:24px;text-align:center;">
              <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                Previ<span style="color:#0E9F8E;">Cloud</span>
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <h1 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#0D1B2A;">Nuova iscrizione alla Beta 🚀</h1>
              <p style="margin:0 0 20px;font-size:14px;color:#6B7280;">Un nuovo artigiano ha compilato il form di iscrizione beta tester.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:8px;border-collapse:separate;overflow:hidden;font-size:14px;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;">Email generata automaticamente dal form beta di previcloud.it</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function buildEmailText(data: BetaSignupPayload): string {
  const metodi = Array.isArray(data.metodiAttuali) ? data.metodiAttuali.join(', ') : ''
  return [
    'Nuova iscrizione alla Beta PreviCloud',
    '',
    `Nome e cognome: ${data.nome ?? ''}`,
    `WhatsApp: ${data.whatsapp ?? ''}`,
    `Email: ${data.email ?? ''}`,
    `Professione: ${data.professione ?? ''}`,
    `Preventivi mensili: ${data.preventiviMensili ?? ''}`,
    `Metodi attuali: ${metodi}`,
    `Dispositivo principale: ${data.dispositivoPrincipale ?? ''}`,
    `Privacy accettata: ${data.accettaPrivacy ? 'Sì' : 'No'}`,
  ].join('\n')
}

export async function POST(req: NextRequest) {
  let data: BetaSignupPayload
  try {
    data = (await req.json()) as BetaSignupPayload
  } catch {
    return NextResponse.json({ error: 'Corpo della richiesta non valido' }, { status: 400 })
  }

  // Validazione minima lato server
  if (!data.nome?.trim() || !data.whatsapp?.trim() || !data.email?.trim()) {
    return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[beta-signup] RESEND_API_KEY non configurata')
    return NextResponse.json({ error: 'Servizio email non configurato' }, { status: 500 })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'PreviCloud Beta <noreply@previcloud.it>',
      to: DESTINATARIO,
      replyTo: data.email.trim(),
      subject: `Nuova iscrizione beta — ${data.nome.trim()}`,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    })

    if (error) {
      console.error('[beta-signup] errore invio Resend:', error)
      return NextResponse.json({ error: 'Errore durante l\'invio della richiesta' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[beta-signup] errore imprevisto:', err)
    return NextResponse.json({ error: 'Errore durante l\'invio della richiesta' }, { status: 500 })
  }
}
