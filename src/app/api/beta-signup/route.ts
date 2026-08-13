import { NextRequest, NextResponse } from 'next/server'

const DESTINATARIO = 'info@previcloud.it'

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

function buildUserEmailHtml(nome: string): string {
  const nomeSafe = escapeHtml(nome)
  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Richiesta presa in carico</title>
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
            <td style="padding:36px 40px 8px;text-align:center;">
              <p style="margin:0 0 16px;font-size:40px;line-height:1;">✅</p>
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0D1B2A;line-height:1.3;">
                Grazie${nomeSafe ? `, ${nomeSafe}` : ''}! La tua richiesta è stata presa in carico
              </h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4B5563;">
                Abbiamo ricevuto la tua richiesta di accesso alla <strong>Beta privata di PreviCloud</strong>.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4B5563;">
                Ti ricontatteremo a breve per creare i tuoi dati di accesso, che ti comunicheremo
                direttamente <strong>via WhatsApp</strong> al numero che ci hai indicato.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0FAF8;border:1px solid #CDEDE7;border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;font-size:13px;line-height:1.6;color:#0B7A6D;">
                    Non serve fare altro adesso: pensiamo a tutto noi. Tieni d'occhio WhatsApp nei prossimi giorni.
                    La beta è totalmente gratuita e non è richiesta alcuna carta di credito.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 36px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#9CA3AF;">
                Se non hai richiesto tu questo accesso, puoi ignorare questa email.<br />
                PreviCloud · previcloud.it
              </p>
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

function buildUserEmailText(nome: string): string {
  return [
    `Grazie${nome ? `, ${nome}` : ''}! La tua richiesta è stata presa in carico.`,
    '',
    'Abbiamo ricevuto la tua richiesta di accesso alla Beta privata di PreviCloud.',
    'Ti ricontatteremo a breve per creare i tuoi dati di accesso, che ti comunicheremo',
    'direttamente via WhatsApp al numero che ci hai indicato.',
    '',
    'Non serve fare altro adesso: pensiamo a tutto noi. La beta è totalmente gratuita.',
    '',
    'PreviCloud · previcloud.it',
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

    // 1) Notifica all'amministratore — critica: se fallisce, la richiesta non è
    //    registrata da nessuna parte, quindi restituiamo errore all'utente.
    const { error: adminError } = await resend.emails.send({
      from: 'PreviCloud Beta <noreply@previcloud.it>',
      to: DESTINATARIO,
      replyTo: data.email.trim(),
      subject: `Nuova iscrizione beta — ${data.nome.trim()}`,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    })

    if (adminError) {
      console.error('[beta-signup] errore invio email admin:', adminError)
      return NextResponse.json({ error: 'Errore durante l\'invio della richiesta' }, { status: 502 })
    }

    // 2) Email di conferma all'utente — best effort: la richiesta è già stata
    //    acquisita dall'admin, quindi un errore qui non deve far fallire il flusso.
    try {
      const { error: userError } = await resend.emails.send({
        from: 'PreviCloud <noreply@previcloud.it>',
        to: data.email.trim(),
        subject: 'Abbiamo ricevuto la tua richiesta — PreviCloud Beta',
        html: buildUserEmailHtml(data.nome.trim()),
        text: buildUserEmailText(data.nome.trim()),
      })
      if (userError) {
        console.error('[beta-signup] errore invio email conferma utente:', userError)
      }
    } catch (err) {
      console.error('[beta-signup] errore imprevisto email conferma utente:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[beta-signup] errore imprevisto:', err)
    return NextResponse.json({ error: 'Errore durante l\'invio della richiesta' }, { status: 500 })
  }
}
