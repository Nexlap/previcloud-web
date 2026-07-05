import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

const SITE_URL = 'https://previcloud.it'

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy — PreviCloud',
  description:
    'Come PreviCloud tratta i dati personali degli utenti e dei loro clienti: finalità, base giuridica, conservazione, fornitori (Supabase, Stripe, Anthropic) e diritti GDPR.',
  alternates: { canonical: `${SITE_URL}/privacy` },
}

function SectionHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-brand/10 text-teal-brand text-xs font-bold">
        {n}
      </span>
      {children}
    </h2>
  )
}

export default function PrivacyPage() {
  return (
    <div className="landing-root py-12 md:py-16 bg-[#FAFAF9] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-brand hover:text-teal-dark mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Torna alla Homepage
        </Link>

        {/* Page Title Header */}
        <div className="text-left mb-10 border-b border-slate-200 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">Trasparenza e Sicurezza</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Informativa sulla Privacy
          </h1>
          <p className="text-slate-500 mt-2 text-xs">Documento soggetto ad aggiornamento periodico.</p>
        </div>

        <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed text-left">

          <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
            <Shield className="h-6 w-6 text-teal-brand shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Il nostro impegno per la tua sicurezza</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                La privacy degli artigiani e dei loro clienti è al centro di ogni riga di codice di PreviCloud.
                Non vendiamo i tuoi dati, non facciamo profilazione commerciale e adottiamo misure di sicurezza
                adeguate per proteggere ogni preventivo.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <SectionHeading n={1}>Titolare del trattamento</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              Il titolare del trattamento dei dati personali è l&apos;entità che gestisce il servizio PreviCloud.
              Gli estremi identificativi, la sede e i recapiti per le richieste in materia di privacy sono
              pubblicati sul sito web del servizio o comunicati agli utenti nelle informative ufficiali. Ove
              nominato, il responsabile della protezione dei dati può essere contattato tramite i canali indicati
              sul sito.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={2}>Ambito di applicazione</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              La presente informativa descrive come vengono trattati i dati personali degli utenti che accedono a
              PreviCloud tramite sito web, applicazione mobile e applicazione desktop, nonché i dati inseriti dagli
              utenti relativi ai propri clienti finali nell&apos;ambito dell&apos;utilizzo del servizio.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={3}>Tipologie di dati raccolti</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              Possono essere trattate, a seconda delle funzionalità utilizzate, le seguenti categorie di dati:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              <li>
                <strong>Dati di registrazione e account:</strong> indirizzo email, password (conservata in forma
                crittografata), nome azienda e altri dati di profilo inseriti dall&apos;utente.
              </li>
              <li>
                <strong>Dati di iscrizione alla beta:</strong> nome, numero WhatsApp, email, professione e
                informazioni sull&apos;attività, forniti volontariamente tramite il form di candidatura.
              </li>
              <li>
                <strong>Dati relativi ai preventivi:</strong> titoli, importi, testi, stati, date e documenti PDF
                generati o caricati.
              </li>
              <li>
                <strong>Dati dei clienti inseriti dall&apos;utente:</strong> nome, recapiti, note e ogni altra
                informazione che l&apos;utente registra nella propria anagrafica clienti.
              </li>
              <li>
                <strong>Dati di utilizzo:</strong> log tecnici, eventi di utilizzo interni e, ove attivati, dati
                analitici finalizzati al miglioramento del servizio.
              </li>
              <li>
                <strong>Dati di pagamento:</strong> gestiti tramite Stripe; PreviCloud non conserva i dati completi
                delle carte di pagamento.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <SectionHeading n={4}>Finalità e base giuridica</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">I dati sono trattati per le seguenti finalità:</p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              <li>erogazione del servizio PreviCloud e gestione dell&apos;account utente;</li>
              <li>gestione delle candidature e dell&apos;accesso al programma beta;</li>
              <li>creazione, invio, firma e tracciamento dei preventivi;</li>
              <li>gestione di pagamenti, rate e abbonamenti collegati al servizio;</li>
              <li>assistenza tecnica e comunicazioni relative al servizio;</li>
              <li>miglioramento della piattaforma e sicurezza dei sistemi.</li>
            </ul>
            <p className="text-slate-600 text-xs sm:text-sm">
              Le basi giuridiche del trattamento sono l&apos;esecuzione del contratto o di misure precontrattuali
              richieste dall&apos;utente e il consenso dell&apos;interessato, ove richiesto dalla normativa applicabile.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={5}>Modalità del trattamento e sicurezza (RLS &amp; Cloud UE)</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              I dati sono trattati con strumenti informatici e telematici, con logiche strettamente correlate alle
              finalità indicate e nel rispetto di misure di sicurezza adeguate. I dati sono conservati su
              infrastruttura con data center nell&apos;Unione Europea (ove configurato), in conformità con il GDPR.
              Vengono impiegati filtri di sicurezza a livello di database (Row Level Security): i dati della tua
              ditta e dei tuoi clienti sono isolati e non accessibili ad altri utenti.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm">
              L&apos;utente che inserisce dati dei propri clienti agisce, per tali dati, come titolare autonomo del
              trattamento secondo la propria organizzazione; il titolare del servizio tratta tali dati quale
              fornitore della piattaforma, nei limiti previsti dal rapporto contrattuale e dalla normativa applicabile.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={6}>Conservazione e cancellazione</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              I dati dell&apos;account e i contenuti associati sono conservati per tutta la durata del rapporto
              contrattuale e, successivamente alla chiusura dell&apos;account, per un periodo massimo di 12 mesi,
              salvo obblighi di legge o esigenze di tutela in sede giudiziaria. L&apos;utente può richiedere
              l&apos;eliminazione dell&apos;account dalle impostazioni dell&apos;applicazione, fatto salvo quanto
              necessario per adempiere a obblighi di legge.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={7}>Comunicazione e trasferimento a terzi</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              I dati non sono venduti né ceduti a terzi per finalità di marketing autonomo. Possono essere comunicati
              a fornitori tecnologici strettamente necessari all&apos;erogazione del servizio:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              <li>
                <strong>Supabase</strong> — hosting del database e servizi di autenticazione (infrastruttura con data
                center nell&apos;Unione Europea ove configurato);
              </li>
              <li>
                <strong>Stripe</strong> — elaborazione dei pagamenti online;
              </li>
              <li>
                <strong>Resend</strong> — invio delle email transazionali e delle comunicazioni relative al servizio;
              </li>
              <li>
                <strong>Anthropic</strong> — elaborazione dei testi dei preventivi tramite modelli di intelligenza
                artificiale, limitatamente ai contenuti inviati dall&apos;utente per la generazione o il miglioramento
                dei testi.
              </li>
            </ul>
            <p className="text-slate-600 text-xs sm:text-sm">
              Tali fornitori trattano i dati in qualità di responsabili del trattamento o sub-responsabili, secondo i
              rispettivi accordi contrattuali e informative privacy.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={8}>Diritti dell&apos;interessato</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              In qualità di interessato, l&apos;utente può esercitare in qualsiasi momento i diritti previsti dagli
              artt. 15–22 del Regolamento UE 2016/679 (GDPR), tra cui:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              <li>accesso ai propri dati personali;</li>
              <li>rettifica dei dati inesatti o integrazione di quelli incompleti;</li>
              <li>cancellazione dei dati, ove applicabile;</li>
              <li>limitazione del trattamento;</li>
              <li>portabilità dei dati, nei casi previsti dalla legge;</li>
              <li>opposizione al trattamento, nei casi previsti dalla legge.</li>
            </ul>
            <p className="text-slate-600 text-xs sm:text-sm">
              Le richieste possono essere inviate tramite i recapiti pubblicati sul sito del servizio. È inoltre
              possibile eliminare l&apos;account direttamente dalle impostazioni dell&apos;applicazione. L&apos;interessato
              ha diritto di proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali
              (www.garanteprivacy.it).
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={9}>Sicurezza</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              Il titolare del servizio adotta misure tecniche e organizzative adeguate a proteggere i dati da accessi
              non autorizzati, perdita, distruzione o divulgazione. Nessun sistema è tuttavia completamente immune da
              rischi; si invita l&apos;utente a proteggere le proprie credenziali.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={10}>Modifiche alla presente informativa</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              La presente Privacy Policy può essere aggiornata periodicamente. La versione aggiornata sarà pubblicata
              su questa pagina.
            </p>
          </section>

          <section className="space-y-3">
            <SectionHeading n={11}>Contatti</SectionHeading>
            <p className="text-slate-600 text-xs sm:text-sm">
              Per domande sulla privacy o per esercitare i propri diritti è possibile contattare il titolare del
              trattamento tramite i recapiti pubblicati sul sito web del servizio.
            </p>
          </section>

          <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-500 text-center">
            I dati inseriti nel form d&apos;iscrizione beta non saranno mai ceduti a società terze per finalità
            pubblicitarie.
          </div>

        </div>
      </div>
    </div>
  )
}
