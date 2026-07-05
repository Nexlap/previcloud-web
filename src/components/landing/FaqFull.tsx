"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, ArrowLeft, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "generale" | "prezzi" | "funzionamento" | "sicurezza" | "supporto";
}

export default function FaqFull({ onOpenBeta }: { onOpenBeta: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "Posso esportare i preventivi per mandarli al mio commercialista o caricarli sul mio gestionale?",
      a: "Sì, ogni preventivo può essere scaricato in PDF ed esportato in qualsiasi momento, pronto per essere inviato al commercialista o archiviato nel tuo gestionale.",
      category: "funzionamento"
    },
    {
      q: "Come fa l'AI a calcolare l'IVA corretta?",
      a: "L'AI usa il tuo regime fiscale (es. forfettario, ordinario) impostato nel profilo per applicare automaticamente l'IVA e le voci corrette a ogni preventivo, senza che tu debba calcolare nulla a mano.",
      category: "funzionamento"
    },
    {
      q: "Devo pagare per forza dopo il periodo di Beta?",
      a: "No, durante la beta puoi usare PreviCloud gratuitamente. Inoltre, chi partecipa alla beta riceverà uno sconto speciale e l'accesso gratuito quando l'app verrà pubblicata ufficialmente.",
      category: "prezzi"
    },
    {
      q: "Posso inserire il logo della mia ditta e il mio listino?",
      a: "Sì, puoi caricare il tuo logo, scegliere il colore del brand e creare il tuo listino personalizzato di servizi e prezzi, che verrà richiamato automaticamente in ogni preventivo.",
      category: "funzionamento"
    },
    {
      q: "Funziona senza connessione internet in cantiere?",
      a: "PreviCloud richiede una connessione internet per generare e salvare i preventivi, la chat AI e la trascrizione vocale. Ti consigliamo di usarlo con almeno una connessione dati minima (anche solo 3G).",
      category: "funzionamento"
    },
    {
      q: "Come funziona l'incasso tramite Stripe?",
      a: "Colleghi il tuo conto Stripe una sola volta: da quel momento ogni pagamento del cliente arriva direttamente sul tuo conto, PreviCloud trattiene solo una piccola commissione di piattaforma.",
      category: "sicurezza"
    },
    {
      q: "I dati dei miei clienti sono al sicuro?",
      a: "Sì, ogni utente vede solo i propri dati grazie a un sistema di sicurezza a livello di database (RLS), e tutte le comunicazioni sono cifrate.",
      category: "sicurezza"
    },
    {
      q: "Quanto costerà PreviCloud dopo la beta?",
      a: "Le funzionalità base saranno disponibili con un pagamento una tantum, mentre le funzionalità complete (come i pagamenti online e la gestione avanzata) richiederanno un abbonamento. I beta tester avranno uno sconto speciale dedicato e l'app gratuita al momento del lancio pubblico.",
      category: "prezzi"
    },
    {
      q: "Posso usarlo sia da telefono che da computer con gli stessi dati?",
      a: "Sì, l'app Android e l'app Windows condividono automaticamente gli stessi dati: un preventivo creato dal telefono lo ritrovi identico anche sul computer.",
      category: "funzionamento"
    },
    {
      q: "Il cliente deve scaricare un'app o creare un account per accettare il preventivo?",
      a: "No, il cliente riceve un link (via WhatsApp o email), lo apre dal browser ed accetta direttamente con un clic, senza installare nulla e senza registrarsi.",
      category: "funzionamento"
    },
    {
      q: "Se durante la beta trovo un problema, chi contatto?",
      a: "Durante la beta avrai un contatto diretto via WhatsApp per segnalare bug o chiedere aiuto, con risposta rapida da parte nostra.",
      category: "supporto"
    },
    {
      q: "Posso disdire quando voglio, anche durante la beta?",
      a: "Sì, puoi interrompere la partecipazione alla beta in qualsiasi momento, senza vincoli e senza costi.",
      category: "prezzi"
    },
    {
      q: "Posso vendere anche file digitali (guide, listini, video) oltre ai preventivi?",
      a: "Sì, puoi caricare i tuoi file su un tuo spazio cloud (es. Google Drive) e venderli tramite lo store PreviCloud: il cliente paga online e riceve subito il link di download.",
      category: "funzionamento"
    }
  ];

  const categories = [
    { id: "all", label: "Tutte le domande" },
    { id: "funzionamento", label: "Funzionamento" },
    { id: "prezzi", label: "Prezzi & Beta" },
    { id: "sicurezza", label: "Pagamenti & Sicurezza" },
    { id: "supporto", label: "Supporto" }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAFAF9] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-brand hover:text-teal-dark mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Torna alla Homepage
        </Link>

        {/* Page Title Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">Centro Supporto</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Domande Frequenti (FAQ)
          </h1>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl">
            Tutto quello che c&apos;è da sapere su PreviCloud, la sicurezza dei dati, i pagamenti online e l&apos;accesso esclusivo alla Beta per gli artigiani italiani.
          </p>
        </div>

        {/* Search & Categories Header */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca una domanda o parola chiave..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null);
              }}
              className="w-full pl-12 pr-4 py-3.5 bg-[#FAFAF9] rounded-xl border border-slate-200 text-sm focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-teal-brand text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 py-4 text-left font-bold text-slate-800 hover:text-teal-brand flex items-center justify-between text-sm sm:text-base gap-4 cursor-pointer"
                >
                  <span className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-teal-brand/40 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform text-slate-400 ${
                      openIndex === idx ? "rotate-180 text-teal-brand" : ""
                    }`}
                  />
                </button>

                {openIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-[#FAFAF9]/40 ml-8 pr-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-sm">Nessuna domanda trovata per i criteri di ricerca inseriti.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all"
            >
              Azzera i filtri
            </button>
          </div>
        )}

        {/* Callout box */}
        <div className="mt-12 bg-gradient-to-br from-[#0B7A6D] to-teal-brand text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/10 px-2.5 py-1 rounded-full">
              Posti in esaurimento
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Partecipa alla Beta Privata Gratuita</h3>
            <p className="text-teal-50 text-xs sm:text-sm max-w-xl">
              I beta tester ottengono uno sconto speciale e l&apos;app gratuita al momento del lancio pubblico. Nessuna carta di credito richiesta.
            </p>
          </div>
          <button
            onClick={onOpenBeta}
            className="px-6 py-3.5 bg-white hover:bg-teal-50 text-teal-dark font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-98 cursor-pointer shrink-0"
          >
            Iscriviti Ora alla Beta
          </button>
        </div>

        {/* WhatsApp support CTA */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500">
          <MessageSquare className="h-4 w-4 text-emerald-500" />
          <span>Hai altre domande? Durante la beta ricevi assistenza dedicata diretta via WhatsApp.</span>
        </div>

      </div>
    </div>
  );
}
