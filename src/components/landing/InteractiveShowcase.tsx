"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Smartphone,
  Laptop,
  ChevronRight,
  Plus,
  FileText,
  Calculator,
  Users,
  TrendingUp,
  Sliders,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from "lucide-react";

export default function InteractiveShowcase({ onOpenBeta }: { onOpenBeta: () => void }) {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");
  const [activeTab, setActiveTab] = useState<"dashboard" | "fisco" | "pdf" | "clienti">("dashboard");

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate dynamic scale for the desktop mockup on mobile screens to prevent squishing
  const maxMockupWidth = 620;
  const containerWidth = Math.min(maxMockupWidth, windowWidth - 32);
  const desktopScale = Math.min(1, containerWidth / maxMockupWidth);
  const scaledHeight = 390 * desktopScale;

  // PDF state
  const [pdfTemplate, setPdfTemplate] = useState<"pulito" | "classico" | "bold">("pulito");

  // Fisco calculator state
  const [desiredNetto, setDesiredNetto] = useState("2000");
  const [calcValues, setCalcValues] = useState({
    lordo: 2508.78,
    rivalsa: 100.35,
    totaleFattura: 2609.13,
    imponibile: 2035.12,
    contributi: 530.15,
    imposta: 101.76,
    netto: 2000.00
  });

  const handleCalculate = () => {
    const value = parseFloat(desiredNetto);
    if (isNaN(value) || value <= 0) return;

    const scale = value / 199.41;
    setCalcValues({
      lordo: Math.round(250.00 * scale * 100) / 100,
      rivalsa: Math.round(10.00 * scale * 100) / 100,
      totaleFattura: Math.round(260.00 * scale * 100) / 100,
      imponibile: Math.round(195.00 * scale * 100) / 100,
      contributi: Math.round(50.84 * scale * 100) / 100,
      imposta: Math.round(9.75 * scale * 100) / 100,
      netto: Math.round(value * 100) / 100
    });
  };

  return (
    <section id="piattaforme" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block bg-teal-brand/10 text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-brand/20">
            Interactive Tour &amp; Screenshots
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Esplora l&apos;Applicazione Real-Time
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Abbiamo ricostruito gli screenshot reali dell&apos;applicazione. Scegli il dispositivo e tocca le schede per testare con mano la semplicità di utilizzo.
          </p>
        </div>

        {/* Device & Screen Selectors */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 mb-10">

          {/* Device Toggles */}
          <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setDeviceType("mobile"); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceType === "mobile"
                  ? "bg-teal-brand text-white shadow-lg shadow-teal-brand/15"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Vista Mobile</span>
            </button>
            <button
              onClick={() => { setDeviceType("desktop"); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceType === "desktop"
                  ? "bg-teal-brand text-white shadow-lg shadow-teal-brand/15"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="h-4 w-4" />
              <span>Vista Desktop</span>
            </button>
          </div>

          {/* Screen Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "fisco", label: "Analisi Fiscale", icon: Calculator },
              { id: "pdf", label: "Template PDF", icon: FileText },
              { id: "clienti", label: "Anagrafica Clienti", icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-slate-800 text-teal-300 border border-teal-brand/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Main Interface Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left panel: Context/Description based on active screen */}
          <div className="lg:col-span-4 space-y-6 text-left order-2 lg:order-1">
            {activeTab === "dashboard" && (
              <div className="space-y-4">
                <div className="w-10 h-10 bg-teal-brand/10 text-teal-400 rounded-xl flex items-center justify-center border border-teal-brand/20">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Un Quadro di Controllo Sempre in Tasca</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Il pannello principale riassume istantaneamente il fatturato mensile, i minuti stimati risparmiati con l&apos;AI e i preventivi in attesa di riscossione.
                </p>
                <ul className="space-y-3 pt-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Statistiche automatiche:</strong> Monitora quanto hai incassato e quante bozze hai pronte.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Scadenziario rapido:</strong> Stato del preventivo tracciato in tempo reale: bozza, inviato, in attesa o pagato.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "fisco" && (
              <div className="space-y-4">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Analisi Fiscale e Calcolatore di Margine</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Uno dei punti più apprezzati dai professionisti italiani. Inserisci la cifra netta che vuoi intascare o guarda il riparto delle tasse stimato automaticamente sul lordo fatturato.
                </p>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-[11px] font-bold text-teal-300 uppercase block tracking-wider">Simulatore di Calcolo</span>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2 text-slate-500 text-xs font-bold">€</span>
                      <input
                        type="number"
                        value={desiredNetto}
                        onChange={(e) => setDesiredNetto(e.target.value)}
                        placeholder="Es. 2000"
                        className="w-full pl-7 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-teal-brand"
                      />
                    </div>
                    <button
                      onClick={handleCalculate}
                      className="px-4 py-1.5 bg-teal-brand hover:bg-teal-dark text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Calcola
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Inserisci il netto desiderato e clicca Calcola per aggiornare i dettagli a destra in tempo reale!
                  </p>
                </div>
              </div>
            )}

            {activeTab === "pdf" && (
              <div className="space-y-4">
                <div className="w-10 h-10 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center border border-sky-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Preventivi PDF in Tempo Reale</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Un&apos;impaginazione elegante e professionale studiata per adattarsi perfettamente alla tipologia del cliente, garantendo la massima chiarezza e affidabilità.
                </p>
              </div>
            )}

            {activeTab === "clienti" && (
              <div className="space-y-4">
                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Anagrafica Clienti e Storico Integrato</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tieni traccia di ogni cliente e dei relativi preventivi associati, piani a rate e abbonamenti attivi. Tutta la storia contabile a portata di mano.
                </p>
                <div className="bg-teal-950/20 border border-teal-900/30 p-3.5 rounded-xl text-xs text-teal-300 flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Rispetto Privacy &amp; GDPR:</strong> Tutti i dati personali dei clienti sono crittografati in totale conformità con le leggi sulla privacy vigenti in Italia.
                  </p>
                </div>
              </div>
            )}

            {/* General CTA under descriptions */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onOpenBeta}
                className="w-full sm:w-auto px-6 py-3 bg-teal-brand hover:bg-teal-dark text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 group shadow-xl shadow-teal-brand/10 transition-all cursor-pointer"
              >
                <span>Accedi alla Beta Privata</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Panel: Interactive Emulator (Mockup Window) */}
          <div className="lg:col-span-8 flex justify-center order-1 lg:order-2">
            {deviceType === "mobile" ? (

              /* ==========================================================
                 MOBILE DEVICE WRAPPER (Smartphone Frame)
                 ========================================================== */
              <div className="w-[320px] h-[640px] rounded-[40px] border-8 border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden flex flex-col select-none ring-1 ring-slate-700/50">
                {/* Speaker/Camera notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-full z-40 flex justify-center items-center">
                  <div className="w-12 h-1 bg-slate-900 rounded-full" />
                </div>

                {/* Mobile Screen Content */}
                <div className="flex-1 bg-slate-50 text-slate-800 pt-7 flex flex-col overflow-hidden text-left">

                  {/* App Status Bar / Navigation */}
                  <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="tracking-tight text-slate-300">PreviCloud Mobile</span>
                    </div>
                    <span className="text-[10px] text-slate-400">16:12</span>
                  </div>

                  {/* App Inner Content Scrollable */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-none">

                    {/* CASE 1: DASHBOARD MOBILE */}
                    {activeTab === "dashboard" && (
                      <div className="space-y-3 animate-fade-in">
                        {/* Greeting header */}
                        <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-2xl">
                          <div>
                            <div className="text-[10px] text-slate-400">Buon pomeriggio,</div>
                            <div className="text-sm font-black flex items-center gap-1">Studio Nova <span className="text-amber-400">🖐️</span></div>
                          </div>
                          <div className="h-7 w-7 rounded-full bg-teal-brand text-white flex items-center justify-center font-bold text-xs">
                            S
                          </div>
                        </div>

                        {/* Top metric row */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-sm">
                            <span className="text-[18px] font-black text-slate-900 block">15</span>
                            <span className="text-[8px] text-slate-500 font-semibold block leading-tight">Questo mese</span>
                            <span className="text-[7px] text-emerald-600 font-bold block mt-0.5">↑ 13 mese scorso</span>
                          </div>
                          <div className="bg-slate-900 text-white p-2.5 rounded-xl text-center shadow-sm">
                            <span className="text-[14px] font-black block leading-tight mt-1">€2.023</span>
                            <span className="text-[8px] text-slate-400 font-semibold block mt-1">Incassato</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-sm">
                            <span className="text-[18px] font-black text-teal-brand block">644</span>
                            <span className="text-[8px] text-slate-500 font-semibold block leading-tight">Minuti risparmiati</span>
                          </div>
                        </div>

                        {/* Highlight strip */}
                        <div className="bg-teal-50 border border-teal-100 p-2.5 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-[9px] font-black text-teal-900">Vendi servizi &amp; cataloghi</div>
                              <div className="text-[8px] text-teal-700">Guide, manutenzioni — incassa online</div>
                            </div>
                          </div>
                          <ChevronRight className="h-3 w-3 text-teal-600" />
                        </div>

                        {/* Document List */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-black uppercase text-slate-500">Ultimi preventivi</span>
                            <span className="text-[9px] font-bold text-teal-brand">Vedi tutti →</span>
                          </div>

                          {/* Item 1 */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                                MR
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-slate-800">Preventivo Marco Rinaldi</div>
                                <div className="text-[8px] text-slate-400">04 lug • Elettricista</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] font-black text-slate-900">€501,00</div>
                              <span className="text-[7px] font-bold uppercase bg-amber-100 text-amber-800 px-1 py-0.5 rounded">da incassare</span>
                            </div>
                          </div>

                          {/* Item 2 */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-[10px]">
                                PR
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-slate-800">PRV-2026-0048</div>
                                <div className="text-[8px] text-teal-600 flex items-center gap-0.5">
                                  <Calendar className="h-2 w-2" />
                                  <span>Piano a rate collegato</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] font-black text-slate-900">€470,00</div>
                              <span className="text-[7px] font-bold uppercase bg-slate-100 text-slate-600 px-1 py-0.5 rounded">inviato</span>
                            </div>
                          </div>

                          {/* Item 3 */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                                PR
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-slate-800">PRV-2026-0047</div>
                                <div className="text-[8px] text-teal-600 flex items-center gap-0.5">
                                  <Calendar className="h-2 w-2" />
                                  <span>Piano a rate collegato</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] font-black text-slate-900">€470,00</div>
                              <span className="text-[7px] font-bold uppercase bg-slate-100 text-slate-600 px-1 py-0.5 rounded">inviato</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* CASE 2: ANALISI FISCALE MOBILE */}
                    {activeTab === "fisco" && (
                      <div className="space-y-3 animate-fade-in">
                        {/* Header Box */}
                        <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-900 flex items-center gap-3">
                          <Calculator className="h-5 w-5 text-emerald-400 shrink-0" />
                          <div>
                            <h4 className="text-[11px] font-black">Analisi fiscale</h4>
                            <p className="text-[8px] text-emerald-300">Stima netto, imposte e lordo necessario</p>
                          </div>
                        </div>

                        {/* Breakdown block */}
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5 text-xs">

                          <div className="flex justify-between pb-1 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">Fatturato lordo:</span>
                            <span className="font-bold text-slate-900">€{calcValues.lordo.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between text-[11px] text-emerald-600">
                            <span className="font-medium">+ Rivalsa INPS (4%):</span>
                            <span className="font-semibold">+€{calcValues.rivalsa.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between py-1.5 border-y border-slate-100 font-extrabold text-slate-950 text-[13px]">
                            <span>= Totale fatturato cliente:</span>
                            <span>€{calcValues.totaleFattura.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between text-[11px] text-slate-600">
                            <span className="font-medium">Reddito imponibile (78%):</span>
                            <span>€{calcValues.imponibile.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between text-[11px] text-rose-600">
                            <span className="font-medium">- Contributi INPS:</span>
                            <span>-€{calcValues.contributi.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between text-[11px] text-rose-600">
                            <span className="font-medium">- Imposta sostitutiva (5%):</span>
                            <span>-€{calcValues.imposta.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex justify-between pt-2 border-t border-slate-200 font-black text-teal-brand text-sm">
                            <span>Netto stimato:</span>
                            <span>€{calcValues.netto.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* Warning tag */}
                        <div className="bg-slate-100 p-2.5 rounded-xl text-[8px] text-slate-500 leading-normal text-center">
                          ⚠ Calcolo indicativo — consulta sempre il tuo commercialista
                        </div>
                      </div>
                    )}

                    {/* CASE 3: TEMPLATE PDF MOBILE */}
                    {activeTab === "pdf" && (
                      <div className="space-y-3 animate-fade-in flex flex-col h-full">

                        {/* Mock mini PDF container */}
                        <div className={`flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-3.5 space-y-3 text-[9px] relative overflow-hidden transition-all ${
                          pdfTemplate === "bold" ? "border-t-8 border-t-teal-700" : ""
                        }`}>
                          {/* PDF Logo & Brand */}
                          <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                            <div>
                              <div className="font-extrabold text-[10px] text-slate-800">STUDIO ROSSI</div>
                              <div className="text-[7px] text-slate-400">Roma</div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-slate-900 block text-[10px]">PREVENTIVO</span>
                              <span className="text-[7px] text-slate-400">N. PRV-2026-0051</span>
                            </div>
                          </div>

                          {/* Grid for invoice meta info */}
                          <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-[7px] text-slate-600">
                            <div>
                              <span className="font-semibold block text-slate-400 text-[6px]">DATA</span>
                              <span className="font-bold">05/07/2026</span>
                            </div>
                            <div>
                              <span className="font-semibold block text-slate-400 text-[6px]">N. PREVENTIVO</span>
                              <span className="font-bold">PRV-2026-0051</span>
                            </div>
                            <div>
                              <span className="font-semibold block text-slate-400 text-[6px]">VALIDITÀ</span>
                              <span className="font-bold">30 giorni</span>
                            </div>
                          </div>

                          {/* Line items table */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between font-bold text-slate-400 text-[7px] border-b border-slate-100 pb-1">
                              <span>SERVIZIO</span>
                              <span>TOTALE</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between items-start">
                                <div className="max-w-[150px]">
                                  <div className="font-bold text-slate-800">Sostituzione quadro elettrico</div>
                                  <div className="text-[6.5px] text-slate-400">Intervento sul quadro elettrico per adeguamento componenti.</div>
                                </div>
                                <span className="font-extrabold text-slate-800">€250,00</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-500 text-[7.5px] pt-1">
                                <span>Trasferta km (100km)</span>
                                <span>€25,00</span>
                              </div>
                            </div>
                          </div>

                          {/* Invoice Footer total */}
                          <div className="pt-2 border-t border-slate-100 text-right space-y-0.5 text-[7px]">
                            <div className="flex justify-end gap-3 text-slate-500">
                              <span>Totale:</span>
                              <span>€275,00</span>
                            </div>
                            <div className="flex justify-end gap-3 text-rose-500 font-bold">
                              <span>Sconto:</span>
                              <span>-€50,00</span>
                            </div>
                            <div className="flex justify-end gap-3 text-sm font-black text-slate-950">
                              <span>TOTALE:</span>
                              <span>€225,00</span>
                            </div>
                          </div>

                          {/* Mini digital pay badge */}
                          <div className="pt-2">
                            <div className="w-full py-1.5 bg-teal-brand text-white rounded font-bold text-center text-[7px] flex items-center justify-center gap-1">
                              <span>Clicca qui per pagare online con carta</span>
                              <ArrowRight className="h-1.5 w-1.5" />
                            </div>
                          </div>
                        </div>

                        {/* Mini Quick Selector */}
                        <div className="bg-slate-900 text-white p-2.5 rounded-xl border border-slate-800 text-center text-[8px] font-bold">
                          💡 Preventivo impaginato automaticamente in formato A4, pronto per l&apos;invio via WhatsApp o Email.
                        </div>
                      </div>
                    )}

                    {/* CASE 4: ANAGRAFICA CLIENTI MOBILE */}
                    {activeTab === "clienti" && (
                      <div className="space-y-3 animate-fade-in">
                        {/* Selected Client header card */}
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md">
                              E
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900 text-sm">Elettro Nova S.r.l.</h4>
                              <p className="text-[10px] text-slate-400">+39 02 5555 1420</p>
                            </div>
                          </div>

                          {/* Metrics rows */}
                          <div className="grid grid-cols-3 gap-1.5 border-t border-slate-100 pt-3 text-center">
                            <div>
                              <span className="font-black text-slate-900 text-sm block">12</span>
                              <span className="text-[8px] text-slate-400 font-bold block">Preventivi</span>
                            </div>
                            <div className="border-x border-slate-100">
                              <span className="font-black text-teal-brand text-sm block">€1.713</span>
                              <span className="text-[8px] text-slate-400 font-bold block">Incassato</span>
                            </div>
                            <div>
                              <span className="font-black text-indigo-600 text-sm block">€470</span>
                              <span className="text-[8px] text-slate-400 font-bold block">Abbonamento</span>
                            </div>
                          </div>
                        </div>

                        {/* Recent clients mini catalog list */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black uppercase text-slate-400 px-1">Altri contatti salvati</span>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px]">
                                LP
                              </div>
                              <span className="text-[10px] font-bold text-slate-700">Lorenzo Pagnotta</span>
                            </div>
                            <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">3 preventivi</span>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px]">
                                MR
                              </div>
                              <span className="text-[10px] font-bold text-slate-700">Marco Rinaldi</span>
                            </div>
                            <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">2 preventivi</span>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[9px]">
                                TI
                              </div>
                              <span className="text-[10px] font-bold text-slate-700">Tecnoimpianti Italia</span>
                            </div>
                            <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">0 preventivi</span>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>

                  {/* App Bottom bar */}
                  <div className="bg-white border-t border-slate-200 p-2.5 flex items-center text-slate-400 text-[9px] font-bold">
                    <button className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${activeTab === "dashboard" ? "text-teal-brand" : ""}`}>
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>Home</span>
                    </button>
                    <button className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${activeTab === "pdf" ? "text-teal-brand" : ""}`}>
                      <FileText className="h-3.5 w-3.5" />
                      <span>Storico</span>
                    </button>
                    <div className="flex-1 flex items-center justify-center">
                      <button className="flex items-center justify-center bg-teal-brand text-white h-7 w-7 rounded-full -mt-2 shadow-lg shadow-teal-brand/20 shrink-0">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${activeTab === "clienti" ? "text-teal-brand" : ""}`}>
                      <Users className="h-3.5 w-3.5" />
                      <span>Clienti</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center justify-center gap-0.5 hover:text-slate-700">
                      <Sliders className="h-3.5 w-3.5" />
                      <span>Impostazioni</span>
                    </button>
                  </div>

                </div>
              </div>
            ) : (

              /* ==========================================================
                 DESKTOP DEVICE WRAPPER (Laptop Screen mockup with dynamic scale)
                 ========================================================== */
              <div
                style={{ height: `${scaledHeight}px` }}
                className="w-full relative flex items-center justify-center overflow-visible transition-all duration-300"
              >
                <div
                  style={{
                    transform: `scale(${desktopScale})`,
                    transformOrigin: "center center",
                    width: "620px",
                    height: "390px"
                  }}
                  className="absolute shrink-0 rounded-2xl border-8 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col select-none ring-1 ring-slate-700/50"
                >
                 {/* Laptop Inner Screen Content */}
                 <div className="flex-1 bg-slate-50 text-slate-800 flex overflow-hidden text-left">

                  {/* Left Sidebar Menu */}
                  <div className="w-[120px] bg-[#0A1521] text-slate-400 p-2.5 flex flex-col justify-between text-[9px]">
                    <div className="space-y-4">
                      {/* Logo and title */}
                      <div className="flex items-center gap-1 px-1.5">
                        <Image
                          src="/previcloud-logo.jpg"
                          alt="Logo"
                          width={18}
                          height={18}
                          className="w-4.5 h-4.5 rounded object-cover"
                        />
                        <span className="font-extrabold text-white text-[10px]">Previ<span className="text-teal-brand">Cloud</span></span>
                      </div>

                      {/* Menu items */}
                      <div className="space-y-1">
                        <button className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-1.5 font-bold ${activeTab === "dashboard" ? "bg-slate-800 text-white" : "hover:text-white"}`}>
                          <TrendingUp className="h-3 w-3" />
                          <span>Home</span>
                        </button>
                        <button className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-1.5 font-bold ${activeTab === "pdf" ? "bg-slate-800 text-white" : "hover:text-white"}`}>
                          <FileText className="h-3 w-3" />
                          <span>Storico</span>
                        </button>
                        <button className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-1.5 font-bold ${activeTab === "clienti" ? "bg-slate-800 text-white" : "hover:text-white"}`}>
                          <Users className="h-3 w-3" />
                          <span>Clienti</span>
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-2 text-[7px] text-slate-500 text-center">
                      Powered by Nexlap
                    </div>
                  </div>

                  {/* Main Work Area desktop mockup */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">

                    {/* Header bar desktop */}
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                      <div>
                        <span className="text-[7px] font-black uppercase text-slate-400 block tracking-wider">Pannello Web</span>
                        <h4 className="text-xs font-black text-slate-900">
                          {activeTab === "dashboard" && "Pannello di Monitoraggio"}
                          {activeTab === "fisco" && "Dettaglio Analisi Fiscale"}
                          {activeTab === "pdf" && "Anteprima Editor Preventivi"}
                          {activeTab === "clienti" && "Archivio Anagrafico Clienti"}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[8px] font-bold text-slate-500">Amministratore</span>
                      </div>
                    </div>

                    {/* CASE 1: DASHBOARD DESKTOP */}
                    {activeTab === "dashboard" && (
                      <div className="space-y-3 animate-fade-in">
                        {/* Desktop Stats Grid */}
                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-[7px] uppercase font-bold text-slate-400 block">Questo mese</span>
                            <span className="text-sm font-black text-slate-900 block mt-0.5">15 preventivi</span>
                            <span className="text-[6.5px] text-emerald-600 font-bold block mt-0.5">↑ +15% rispetto a maggio</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-[7px] uppercase font-bold text-slate-400 block">Totale incassato</span>
                            <span className="text-sm font-black text-teal-brand block mt-0.5">€2.023,00</span>
                            <span className="text-[6.5px] text-slate-500 block mt-0.5">Saldato via carta/Stripe</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-[7px] uppercase font-bold text-slate-400 block">Tempo stimato risparmiato</span>
                            <span className="text-sm font-black text-indigo-600 block mt-0.5">644 minuti</span>
                            <span className="text-[6.5px] text-slate-500 block mt-0.5">Velocità AI PreviCloud</span>
                          </div>
                        </div>

                        {/* Recent list */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[9px]">
                          <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-200 font-bold text-slate-600">
                            Fatturazione e Preventivi in Evidenza
                          </div>
                          <div className="divide-y divide-slate-100">
                            {[
                              { doc: "PRV-2026-0048", client: "Elettro Nova S.r.l.", amount: "€470,00", status: "in attesa", stateColor: "bg-amber-100 text-amber-800" },
                              { doc: "PRV-2026-0047", client: "Elettro Nova S.r.l.", amount: "€470,00", status: "inviato", stateColor: "bg-slate-100 text-slate-600" },
                              { doc: "PRV-2026-0046", client: "Elettro Nova S.r.l.", amount: "€470,00", status: "bozza", stateColor: "bg-slate-100 text-slate-500" },
                            ].map((row, idx) => (
                              <div key={idx} className="px-3 py-2 flex justify-between items-center">
                                <div className="flex gap-3">
                                  <span className="font-extrabold text-slate-900">{row.doc}</span>
                                  <span className="text-slate-500">{row.client}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-extrabold text-slate-800">{row.amount}</span>
                                  <span className={`text-[7px] font-bold uppercase px-1.5 py-0.5 rounded ${row.stateColor}`}>{row.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CASE 2: ANALISI FISCALE DESKTOP */}
                    {activeTab === "fisco" && (
                      <div className="grid grid-cols-2 gap-3 animate-fade-in">
                        {/* Breakdown block */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-1.5 text-[9px]">
                          <span className="text-[8px] uppercase font-bold text-slate-400 block border-b border-slate-100 pb-1">Dettaglio Imposte e Contributi</span>

                          <div className="flex justify-between">
                            <span className="text-slate-500">Fatturato lordo:</span>
                            <span className="font-bold">€{calcValues.lordo.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-emerald-600 text-[8.5px]">
                            <span>+ Rivalsa INPS (4%):</span>
                            <span>+€{calcValues.rivalsa.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between font-black text-slate-950 py-1 border-y border-slate-100">
                            <span>Totale fattura:</span>
                            <span>€{calcValues.totaleFattura.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>Reddito imponibile (78%):</span>
                            <span>€{calcValues.imponibile.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-rose-600">
                            <span>- Contributi INPS:</span>
                            <span>-€{calcValues.contributi.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-rose-600">
                            <span>- Imposta sostitutiva (5%):</span>
                            <span>-€{calcValues.imposta.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between font-black text-teal-brand pt-1.5 border-t border-slate-100 text-xs">
                            <span>Netto Stimato:</span>
                            <span>€{calcValues.netto.toLocaleString("it-IT", { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* Interactive pocket calculator */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2 text-[9px] flex flex-col justify-between">
                          <div>
                            <span className="text-[8px] uppercase font-bold text-slate-400 block border-b border-slate-100 pb-1">Margine desiderato</span>
                            <p className="text-slate-500 leading-relaxed mt-1 text-[8.5px]">
                              Definisci quanto vorresti in tasca (netto) da questo preventivo. L&apos;algoritmo calcolerà il lordo e il totale fattura che devi inviare al cliente.
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-bold block text-slate-600">Cifra netta in tasca:</label>
                            <div className="flex gap-1.5">
                              <input
                                type="number"
                                value={desiredNetto}
                                onChange={(e) => setDesiredNetto(e.target.value)}
                                className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-[9px] font-bold focus:outline-none"
                              />
                              <button onClick={handleCalculate} className="px-3 py-1.5 bg-slate-900 text-white rounded font-bold hover:bg-slate-800">
                                Calcola
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CASE 3: TEMPLATE PDF DESKTOP */}
                    {activeTab === "pdf" && (
                      <div className="grid grid-cols-12 gap-3.5 animate-fade-in h-[260px]">

                        {/* Selector sidebar inside desktop preview */}
                        <div className="col-span-4 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between text-[8px]">
                          <div className="space-y-1.5">
                            <span className="font-bold text-slate-500 block">STILI PDF</span>
                            {[
                              { id: "pulito", label: "Template Pulito" },
                              { id: "classico", label: "Template Classico" },
                              { id: "bold", label: "Template Bold" }
                            ].map((tpl) => (
                              <button
                                key={tpl.id}
                                onClick={() => setPdfTemplate(tpl.id as typeof pdfTemplate)}
                                className={`w-full text-left px-2 py-1.5 rounded border transition-all cursor-pointer font-bold ${
                                  pdfTemplate === tpl.id
                                    ? "bg-teal-50 border-teal-brand text-teal-800"
                                    : "border-slate-100 hover:bg-slate-50 text-slate-600"
                                }`}
                              >
                                {tpl.label}
                              </button>
                            ))}
                          </div>
                          <div className="bg-slate-50 p-2 rounded text-[7.5px] text-slate-500 leading-normal border border-slate-100">
                            I template si aggiornano in tempo reale e supportano l&apos;aggiunta di loghi aziendali e note personalizzate.
                          </div>
                        </div>

                        {/* Interactive Invoice PDF page */}
                        <div className={`col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 p-3.5 space-y-3.5 text-[8px] overflow-hidden ${
                          pdfTemplate === "bold" ? "border-t-8 border-t-teal-700" : ""
                        }`}>

                          {/* Invoice heading */}
                          <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                            <div>
                              <div className="font-extrabold text-[9px] text-slate-800">STUDIO ROSSI</div>
                              <div className="text-[7px] text-slate-400">Roma</div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-slate-900 block text-[9px]">PREVENTIVO</span>
                              <span className="text-[7px] text-slate-400">N. PRV-2026-0051</span>
                            </div>
                          </div>

                          {/* Line items list */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between font-bold text-slate-400 border-b border-slate-100 pb-1">
                              <span>DESCRIZIONE</span>
                              <span>PREZZO</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-800">
                              <span>Sostituzione o riparazione quadro elettrico</span>
                              <span className="font-extrabold">€250,00</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500">
                              <span>Trasferta km (100km)</span>
                              <span>€25,00</span>
                            </div>
                          </div>

                          {/* Sum block */}
                          <div className="border-t border-slate-100 pt-1.5 text-right space-y-0.5 text-[7px]">
                            <div className="flex justify-end gap-3 text-slate-500">
                              <span>Subtotale:</span>
                              <span>€275,00</span>
                            </div>
                            <div className="flex justify-end gap-3 text-rose-500 font-bold">
                              <span>Sconto applicato:</span>
                              <span>-€50,00</span>
                            </div>
                            <div className="flex justify-end gap-3 text-[10px] font-black text-slate-950">
                              <span>TOTALE DA PAGARE:</span>
                              <span>€225,00</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* CASE 4: ANAGRAFICA CLIENTI DESKTOP */}
                    {activeTab === "clienti" && (
                      <div className="space-y-3.5 animate-fade-in">
                        {/* Main detailed view of active client */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-[9px] space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2.5">
                              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black">E</div>
                              <div>
                                <h5 className="font-black text-slate-900 text-[11px]">Elettro Nova S.r.l.</h5>
                                <p className="text-slate-400 text-[8px]">+39 02 5555 1420</p>
                              </div>
                            </div>
                            <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded">
                              Modifica Profilo
                            </button>
                          </div>

                          {/* Client specific metrics */}
                          <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
                            <div className="bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                              <span className="font-extrabold text-slate-800 block text-xs">12</span>
                              <span className="text-[7.5px] text-slate-400 font-bold block">Preventivi Generati</span>
                            </div>
                            <div className="bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                              <span className="font-extrabold text-teal-brand block text-xs">€1.713,00</span>
                              <span className="text-[7.5px] text-slate-400 font-bold block">Fatturato Incassato</span>
                            </div>
                            <div className="bg-slate-50/50 p-1.5 rounded-lg border border-slate-100">
                              <span className="font-extrabold text-indigo-600 block text-xs">€470,00</span>
                              <span className="text-[7.5px] text-slate-400 font-bold block">Quota Abbonamento</span>
                            </div>
                          </div>
                        </div>

                        {/* List of other customers */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm text-[8px] divide-y divide-slate-100">
                          <div className="px-3 py-1.5 font-bold text-slate-500 bg-slate-50">Altri Clienti Salvati</div>
                          <div className="px-3 py-2 flex justify-between items-center text-slate-700">
                            <span>Lorenzo Pagnotta (lorenzo@example.com)</span>
                            <span className="font-bold text-slate-500">3 preventivi • Attivo</span>
                          </div>
                          <div className="px-3 py-2 flex justify-between items-center text-slate-700">
                            <span>Marco Rinaldi (+39 347 555 1284)</span>
                            <span className="font-bold text-slate-500">2 preventivi • Attivo</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
