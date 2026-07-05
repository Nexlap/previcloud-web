"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  FileText,
  User,
  CheckCircle,
  Check,
  ChevronDown,
  Lock,
  Mic,
  CreditCard,
  FileCheck,
  Clock,
  ArrowRight
} from "lucide-react";
import BetaSignupModal from "./BetaSignupModal";
import InteractiveShowcase from "./InteractiveShowcase";

export default function LandingHome() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const [betaInitialProfession, setBetaInitialProfession] = useState("");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const openBetaWithProfession = (prof: string) => {
    setBetaInitialProfession(prof);
    setIsBetaModalOpen(true);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="landing-root min-h-screen bg-[#FAFAF9] text-slate-800 selection:bg-teal-brand/20 selection:text-teal-dark">

      {/* Background Dots Grid decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" style={{ backgroundImage: "radial-gradient(#0E9F8E 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      {/* Header Banner for Beta */}
      <div className="relative z-50 bg-[#0B7A6D] text-white py-2 px-4 text-center text-xs font-semibold tracking-wide">
        🚀 PreviCloud è in Beta Privata • <button onClick={() => openBetaWithProfession("altro")} className="underline hover:text-teal-100 font-bold cursor-pointer">Iscriviti ora</button> — posti limitati fino a 20 beta tester.
      </div>

      {/* Navigation */}
      <header className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer select-none group">
          <Image
            src="/previcloud-logo.jpg"
            alt="PreviCloud Logo"
            width={36}
            height={36}
            className="w-9 h-9 rounded-xl shadow-lg shadow-teal-brand/20 object-cover transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Previ<span className="text-teal-brand">Cloud</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#problema" className="hover:text-teal-brand transition-colors">Il problema</a>
          <a href="#funzionalita" className="hover:text-teal-brand transition-colors">Funzionalità</a>
          <a href="#piattaforme" className="hover:text-teal-brand transition-colors">Dispositivi</a>
          <Link href="/faq" className="hover:text-teal-brand transition-colors">Domande Frequenti</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="px-4 py-2.5 text-slate-700 hover:text-teal-brand rounded-full font-bold text-sm transition-colors cursor-pointer"
          >
            Accedi
          </Link>
          <button
            onClick={() => openBetaWithProfession("")}
            className="px-5 py-2.5 bg-teal-brand hover:bg-teal-dark text-white rounded-full font-bold text-sm shadow-md shadow-teal-brand/10 hover:shadow-lg transition-all cursor-pointer"
          >
            Iscriviti alla Beta
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 bg-teal-brand/10 text-teal-dark rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-teal-brand" />
              Creato per Idraulici, Elettricisti e Freelance Italiani
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight text-slate-900">
              Dallo smartphone al PDF professionale in <span className="text-teal-brand relative inline-block">2 minuti<span className="absolute left-0 bottom-1 w-full h-2 bg-teal-brand/15 -z-10 rounded-full" /></span>.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Smetti di sprecare le tue serate a fare preventivi su WhatsApp o Word. Parla con l&apos;AI di PreviCloud, genera un preventivo impeccabile in cantiere ed invialo subito al cliente per farti pagare l&apos;acconto.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <button
                onClick={() => openBetaWithProfession("")}
                className="px-8 py-4 bg-teal-brand hover:bg-teal-dark text-white rounded-xl font-bold text-base shadow-lg shadow-teal-brand/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Inizia Ora Gratis (Beta)
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#funzionalita"
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all text-center"
              >
                Scopri le Funzionalità
              </a>
            </div>

            {/* Micro proof points */}
            <div className="pt-6 border-t border-slate-200/80 mt-4 flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <span className="block text-2xl font-black text-slate-950 tracking-tight">In Beta</span>
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">posti limitati</span>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div>
                <span className="block text-2xl font-black text-slate-950 tracking-tight">Sconto Beta</span>
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">tester + app gratuita al lancio</span>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div>
                <span className="block text-2xl font-black text-slate-950 tracking-tight">Pagamenti Sicuri</span>
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">con Stripe</span>
              </div>
            </div>
          </div>

          {/* Hero Interactive Visualization Right */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-brand/10 to-teal-dark/5 rounded-[40px] blur-2xl opacity-80 pointer-events-none" />

            {/* The Floating UI Elements */}
            <div className="relative border border-slate-200 bg-white rounded-3xl p-5 shadow-2xl overflow-hidden">

              {/* Header inside simulated phone/screen */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-mono text-slate-400">
                  ASSISTENTE AI PREVICLOUD
                </div>
              </div>

              {/* Chat simulator inside visual */}
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-[10px] font-bold">
                    ME
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-700">
                    &quot;Sono sul furgone. Fai un preventivo per imbiancatura appartamento di Rossi: rasatura pareti, pittura lavabile bianca su 120mq e una parete spatolato&quot;
                  </div>
                </div>

                <div className="flex items-start gap-2 max-w-[85%] ml-auto justify-end">
                  <div className="bg-teal-50 border border-teal-100 p-3 rounded-2xl rounded-tr-none text-slate-800 text-right">
                    <p className="font-semibold text-teal-brand mb-1">PreviCloud AI ✨</p>
                    Ecco il preventivo generato con listino aggiornato e IVA al 22% per ufficio commerciale.
                  </div>
                  <div className="w-7 h-7 rounded-full bg-teal-brand/10 flex items-center justify-center shrink-0 border border-teal-brand/20 text-[10px] font-bold text-teal-brand">
                    PC
                  </div>
                </div>

                {/* Simulated PDF Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-md flex items-start gap-3 hover:border-teal-brand/30 transition-all">
                  <div className="w-10 h-14 bg-red-50 text-red-500 border border-red-200 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase font-bold text-teal-brand tracking-wider">DOCUMENTO GENERATO</div>
                    <div className="font-bold text-slate-900 truncate">Preventivo_Tinteggiatura_Rossi.pdf</div>
                    <div className="text-slate-500 text-[11px] flex justify-between mt-0.5">
                      <span>Totale: €2.340,00</span>
                      <span className="font-semibold text-teal-brand">Pronto per l&apos;invio</span>
                    </div>
                  </div>
                </div>

                {/* Call to action within simulated UI */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openBetaWithProfession("")}
                    className="flex-1 py-2.5 bg-teal-brand hover:bg-teal-dark text-white rounded-lg font-bold text-center transition-all cursor-pointer"
                  >
                    Inizia Ora la Beta
                  </button>
                  <button
                    onClick={() => openBetaWithProfession("")}
                    className="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold cursor-pointer"
                  >
                    Beta
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PAIN & SOLUTION COMPARISON ("IL PROBLEMA") */}
      <section id="problema" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">La dura realtà degli artigiani</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Perché fare preventivi ti ruba la vita?
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Ogni sera torni a casa stanco dal lavoro in cantiere o dai clienti, e invece di riposare devi accendere il computer per impaginare preventivi che forse non verranno nemmeno accettati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* The Hard Way Card */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-rose-500/10 text-rose-700 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">
                Prima • Senza PreviCloud
              </div>

              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm">
                <Clock className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Il calvario manuale la sera</h3>
                <p className="text-sm text-slate-600 mt-1">Prendere appunti su fogli volanti, cercare i prezzi dei materiali sul catalogo, aprire Word, sbagliare l&apos;IVA e perdere 25 minuti per un solo cliente.</p>
              </div>

              <ul className="space-y-3.5 text-slate-700 text-sm">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 mt-0.5 font-bold text-xs">×</div>
                  <span><strong>Tempo sprecato:</strong> Almeno 20-30 minuti a preventivo seduto alla scrivania.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 mt-0.5 font-bold text-xs">×</div>
                  <span><strong>Errori costosi:</strong> Dimenticare di calcolare il trasporto o confondere l&apos;aliquota IVA ordinaria e agevolata.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 mt-0.5 font-bold text-xs">×</div>
                  <span><strong>Bassa conversione:</strong> Preventivi impaginati male, inviati in ritardo su WhatsApp, che sembrano poco professionali.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600 mt-0.5 font-bold text-xs">×</div>
                  <span><strong>Inseguire i pagamenti:</strong> Chiamare il cliente dieci volte per farti confermare il lavoro o versare l&apos;acconto.</span>
                </li>
              </ul>
            </div>

            {/* The PreviCloud Way Card */}
            <div className="bg-teal-50/50 border border-teal-100 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-brand text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">
                Dopo • Con PreviCloud
              </div>

              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-teal-brand shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">La chat con l&apos;AI mentre lavori</h3>
                <p className="text-sm text-slate-600 mt-1">Registra la tua voce o scrivi due righe in chat prima di rimetterti alla guida. L&apos;AI impagina tutto con il tuo listino e crea il PDF professionale pronto da inviare.</p>
              </div>

              <ul className="space-y-3.5 text-slate-700 text-sm">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-teal-brand/10 text-teal-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                  <span><strong>Pronto in 2 minuti:</strong> Generazione automatica in tempo reale direttamente in cantiere.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-teal-brand/10 text-teal-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                  <span><strong>Formule e IVA Sicure:</strong> L&apos;AI propone l&apos;IVA corretta e calcola i totali al centesimo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-teal-brand/10 text-teal-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                  <span><strong>Accettazione Istantanea:</strong> Il cliente riceve un link via SMS/WhatsApp, approva il preventivo online con un clic ed è fatta.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-teal-brand/10 text-teal-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                  <span><strong>Incassi Veloci con Stripe:</strong> Ricevi l&apos;acconto con carta di credito, Google Pay o bonifico direttamente dall&apos;app.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES DEEP DIVE ("FUNZIONALITÀ") */}
      <section id="funzionalita" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">Semplicità sul campo</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Tutto quello che serve per gestire il tuo lavoro
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              PreviCloud non è un gestionale complicato per multinazionali. È un&apos;applicazione snella progettata appositamente per chi lavora con le mani e non vuole perdere tempo davanti a uno schermo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-4 hover:border-teal-brand/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-brand shadow-sm border border-slate-100 group-hover:bg-teal-brand group-hover:text-white transition-all">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Preventivatore via Chat AI</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Scrivi i lavori fatti a voce o con parole semplici. L&apos;AI capisce il senso, estrae i prezzi, consiglia le aliquote IVA e genera una bozza formale in pochissimi secondi.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-4 hover:border-teal-brand/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-brand shadow-sm border border-slate-100 group-hover:bg-teal-brand group-hover:text-white transition-all">
                <Mic className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Registrazione Vocale</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Parla in italiano mentre sei alla guida o in cantiere. L&apos;applicazione registra il tuo vocale, trascrive fedelmente i dettagli dei lavori eseguiti e compila automaticamente la bozza del preventivo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-4 hover:border-teal-brand/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-brand shadow-sm border border-slate-100 group-hover:bg-teal-brand group-hover:text-white transition-all">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">5 Template PDF Personalizzati</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cambia impaginazione a seconda del tipo di cliente: elegante per gli architetti, minimale per i privati, classico per le aziende industriali. Tutto in conformità fiscale italiana.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-4 hover:border-teal-brand/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-brand shadow-sm border border-slate-100 group-hover:bg-teal-brand group-hover:text-white transition-all">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Gestione Clienti &amp; Storico</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trova all&apos;istante l&apos;indirizzo, il codice fiscale e tutti i preventivi passati inviati a ciascun cliente. Basta scartoffie perse tra i sedili del furgone.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-4 hover:border-teal-brand/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-brand shadow-sm border border-slate-100 group-hover:bg-teal-brand group-hover:text-white transition-all">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Rate e Abbonamenti Ricorrenti</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fissa piani di pagamento flessibili: 30% d&apos;acconto, saldo a fine lavori, oppure canoni di manutenzione ricorrenti addebitati in automatico su carta ogni mese.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col gap-4 hover:border-teal-brand/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-brand shadow-sm border border-slate-100 group-hover:bg-teal-brand group-hover:text-white transition-all">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Firma digitale con OTP</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Non chiedere ai clienti di stampare e scansionare fogli. Ricevono un codice OTP temporaneo via SMS sul cellulare per autorizzare l&apos;accordo in 5 secondi con pieno valore legale.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MULTI-PLATFORM AVAILABILITY ("DISPOSITIVI") */}
      <InteractiveShowcase onOpenBeta={() => openBetaWithProfession("")} />

      {/* TRUST & SECURITY ("FIDUCIA") */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-teal-brand/10 text-teal-brand rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <Lock className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Sicurezza dei Dati</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                I tuoi listini commerciali, i dati personali dei clienti e lo storico contabile sono protetti con crittografia AES-256 su server europei ad altissima affidabilità.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 bg-teal-brand/10 text-teal-brand rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Transazioni Stripe Protette</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gli incassi online avvengono tramite la piattaforma sicura Stripe, con certificazione PCI-DSS livello 1. Nessun dato bancario viene memorizzato da noi.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 bg-teal-brand/10 text-teal-brand rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Accettazione Chiara e Tracciata</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                L&apos;approvazione online traccia la conferma del cliente, l&apos;orario preciso e le generalità, producendo una prova digitale solida dell&apos;accettazione del preventivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">Domande Frequenti</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Hai dei dubbi? Rispondiamo con chiarezza
            </h2>
            <p className="text-slate-600 mt-3 text-sm">
              Siamo artigiani ed ex professionisti della ditta anche noi, sappiamo cosa conta davvero per te.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Posso esportare i preventivi per mandarli al mio commercialista o caricarli sul mio gestionale?",
                a: "Sì, ogni preventivo può essere scaricato in PDF ed esportato in qualsiasi momento, pronto per essere inviato al commercialista o archiviato nel tuo gestionale."
              },
              {
                q: "Come fa l'AI a calcolare l'IVA corretta?",
                a: "L'AI usa il tuo regime fiscale (es. forfettario, ordinario) impostato nel profilo per applicare automaticamente l'IVA e le voci corrette a ogni preventivo, senza che tu debba calcolare nulla a mano."
              },
              {
                q: "Devo pagare per forza dopo il periodo di Beta?",
                a: "No, durante la beta puoi usare PreviCloud gratuitamente. Inoltre, chi partecipa alla beta riceverà uno sconto speciale e l'accesso gratuito quando l'app verrà pubblicata ufficialmente."
              },
              {
                q: "Come funziona l'incasso tramite Stripe?",
                a: "Colleghi il tuo conto Stripe una sola volta: da quel momento ogni pagamento del cliente arriva direttamente sul tuo conto, PreviCloud trattiene solo una piccola commissione di piattaforma."
              },
              {
                q: "I dati dei miei clienti sono al sicuro?",
                a: "Sì, ogni utente vede solo i propri dati grazie a un sistema di sicurezza a livello di database (RLS), e tutte le comunicazioni sono cifrate."
              },
              {
                q: "Quanto costerà PreviCloud dopo la beta?",
                a: "Le funzionalità base saranno disponibili con un pagamento una tantum, mentre le funzionalità complete (come i pagamenti online e la gestione avanzata) richiederanno un abbonamento. I beta tester avranno uno sconto speciale dedicato e l'app gratuita al momento del lancio pubblico."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 text-left font-bold text-slate-800 hover:text-teal-brand flex items-center justify-between text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform text-slate-400 ${activeFAQ === idx ? "rotate-180 text-teal-brand" : ""}`} />
                </button>

                {activeFAQ === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-brand/10 hover:bg-teal-brand/15 text-teal-dark hover:text-teal-brand font-bold text-sm rounded-xl transition-all cursor-pointer group"
            >
              Scopri tutte le FAQ
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-teal-brand to-[#0B7A6D] text-white relative overflow-hidden text-center px-4">

        {/* Abstract design vector */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="inline-block bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-teal-100">
            Fase Beta Privata • Posti limitati fino a 20 beta tester
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Riprenditi le tue serate libere.<br />Sali a bordo di PreviCloud.
          </h2>

          <p className="text-teal-50 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Iscriviti oggi per testare l&apos;applicazione gratuitamente durante la beta. Avrai un canale WhatsApp diretto con gli sviluppatori italiani per guidarti nella configurazione dei tuoi primi modelli.
          </p>

          <div className="pt-4">
            <button
              onClick={() => openBetaWithProfession("")}
              className="px-8 py-4 bg-white hover:bg-teal-50 text-teal-dark rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              Richiedi l&apos;Accesso alla Beta
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-xs text-teal-200">
            Nessuna carta richiesta • Assistenza telefonica gratuita inclusa • 100% Sviluppato in Italia
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 relative z-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/previcloud-logo.jpg"
                  alt="PreviCloud Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <span className="text-lg font-black tracking-tight text-white">
                  Previ<span className="text-teal-brand">Cloud</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm">
                L&apos;applicazione intelligente per generare preventivi professionali in PDF sul cellulare con l&apos;AI, riscuotere pagamenti ed ottenere l&apos;accettazione dei clienti online. Sviluppato in sinergia tecnologica con <a href="https://nexlap.it" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-brand font-bold underline">Nexlap</a>.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 font-semibold uppercase tracking-wider text-[11px]">
              <a href="#problema" className="hover:text-white transition-colors">Il problema</a>
              <a href="#funzionalita" className="hover:text-white transition-colors">Funzionalità</a>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-slate-500 text-[11px]">
            <div className="flex gap-4">
              <Link href="/termini" className="hover:text-white transition-colors">Termini di Servizio</Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-white transition-colors font-bold text-slate-400">Privacy Policy</Link>
              <span>•</span>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-teal-brand" />
              <span>Made in Italy with Pride</span>
            </div>

            <div className="text-center sm:text-right bg-slate-950/80 border border-slate-800/80 px-4 py-3 rounded-xl flex flex-col sm:flex-row items-center gap-3">
              <span className="text-slate-400 font-medium">© 2026 PreviCloud</span>
              <span className="hidden sm:inline text-slate-800">|</span>
              <span className="text-slate-300">
                Prodotto sviluppato da{" "}
                <a
                  href="https://nexlap.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-brand hover:text-teal-light font-extrabold underline decoration-2 decoration-teal-brand/30 hover:decoration-teal-brand transition-all inline-flex items-center gap-1"
                >
                  Nexlap
                  <span className="text-[10px]">↗</span>
                </a>
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* SIGNUP MODAL */}
      <BetaSignupModal
        isOpen={isBetaModalOpen}
        onClose={() => setIsBetaModalOpen(false)}
        initialProfession={betaInitialProfession}
      />

    </div>
  );
}
