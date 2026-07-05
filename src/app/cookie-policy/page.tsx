import type { Metadata } from 'next'
import { LegalPageLayout, LegalSection } from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy — PreviCloud',
  description:
    'Informativa sui cookie utilizzati da PreviCloud. Al momento il sito usa solo cookie tecnici essenziali (Stripe, Supabase); nessun cookie di profilazione o marketing.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy">
      <LegalSection title="1. Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell&apos;utente,
          dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. La
          presente informativa descrive i cookie e le tecnologie analoghe utilizzati da PreviCloud.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookie tecnici essenziali">
        <p>
          PreviCloud utilizza esclusivamente cookie e archiviazione locale strettamente necessari al
          funzionamento del servizio, per i quali non è richiesto il consenso preventivo:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Autenticazione (Supabase):</strong> mantengono la sessione dell&apos;utente dopo
            l&apos;accesso all&apos;area riservata.
          </li>
          <li>
            <strong>Pagamenti (Stripe):</strong> necessari per il corretto e sicuro funzionamento del
            processo di pagamento e per la prevenzione delle frodi.
          </li>
          <li>
            <strong>Preferenza consenso cookie:</strong> memorizza la scelta effettuata sul banner cookie
            per non riproporlo a ogni visita.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Cookie di profilazione e marketing">
        <p>
          Allo stato attuale PreviCloud <strong>non</strong> utilizza cookie di profilazione, pubblicitari
          o di tracciamento di terze parti a fini di marketing. Qualora in futuro venissero introdotti,
          questa informativa sarà aggiornata e il loro utilizzo sarà subordinato al consenso esplicito
          dell&apos;utente tramite il banner cookie.
        </p>
      </LegalSection>

      <LegalSection title="4. Gestione delle preferenze">
        <p>
          L&apos;utente può gestire o revocare in qualsiasi momento il proprio consenso ai cookie non
          essenziali tramite il banner presente sul sito o modificando le impostazioni del proprio browser.
          La disabilitazione dei cookie tecnici essenziali può compromettere il corretto funzionamento del
          servizio.
        </p>
      </LegalSection>

      <LegalSection title="5. Aggiornamenti">
        <p>
          La presente Cookie Policy può essere aggiornata periodicamente. La versione aggiornata sarà
          sempre pubblicata su questa pagina.
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
