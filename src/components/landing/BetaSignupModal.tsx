"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, CheckCircle2, ChevronRight, ChevronLeft, ShieldAlert, Smartphone, Monitor, SmartphoneNfc } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfession?: string;
}

export default function BetaSignupModal({
  isOpen,
  onClose,
  initialProfession = "",
}: BetaSignupModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const [profession, setProfession] = useState("");
  const [customProfession, setCustomProfession] = useState("");
  const [monthlyEstimates, setMonthlyEstimates] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [customTool, setCustomTool] = useState("");

  const [primaryDevice, setPrimaryDevice] = useState("");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  // Auto-fill initial profession if provided
  useEffect(() => {
    if (initialProfession) {
      const lowerProf = initialProfession.toLowerCase();
      if (["elettricista", "idraulico", "videomaker", "consulente"].includes(lowerProf)) {
        setProfession(lowerProf);
      } else if (lowerProf) {
        setProfession("altro");
        setCustomProfession(initialProfession);
      }
    }
  }, [initialProfession, isOpen]);

  // Reset form when opening/closing
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Validation helpers
  const isEmailValid = (val: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

  const isStep1Valid = () => {
    return name.trim().length > 0 && whatsapp.trim().length > 0 && isEmailValid(email);
  };

  const isStep2Valid = () => {
    if (!profession) return false;
    if (profession === "altro" && !customProfession.trim()) return false;
    if (!monthlyEstimates) return false;
    if (selectedTools.length === 0) return false;
    if (selectedTools.includes("Altro") && !customTool.trim()) return false;
    return true;
  };

  const isStep3Valid = () => {
    return primaryDevice.length > 0 && acceptPrivacy;
  };

  const handleNext = () => {
    if (step === 1 && isStep1Valid()) setStep(2);
    else if (step === 2 && isStep2Valid()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid() || !isStep2Valid() || !isStep3Valid()) return;

    setLoading(true);
    setErrorMsg("");

    const compiledData = {
      nome: name,
      whatsapp: whatsapp,
      email: email,
      professione: profession === "altro" ? `Altro (${customProfession})` : profession,
      preventiviMensili: monthlyEstimates,
      metodiAttuali: selectedTools.map((t) => (t === "Altro" ? `Altro (${customTool})` : t)),
      dispositivoPrincipale: primaryDevice,
      accettaPrivacy: acceptPrivacy,
    };

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(compiledData),
      });

      if (!response.ok) {
        throw new Error("Errore nell'invio dell'iscrizione");
      }

      setSuccess(true);
    } catch (err) {
      console.error("Errore invio iscrizione:", err);
      setErrorMsg(
        "Non siamo riusciti a inviare la tua iscrizione. Controlla la connessione e riprova tra qualche istante."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative border-b border-slate-100 p-5 sm:p-6 bg-slate-50 shrink-0">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-brand">
              Fase Beta Privata • Sconto Speciale
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
              Iscrizione alla Beta Privata
            </h3>

            {/* Step Indicators */}
            {!success && (
              <div className="flex items-center gap-1.5 mt-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`h-1.5 rounded-full w-full transition-all duration-300 ${
                        s <= step ? "bg-teal-brand" : "bg-slate-200"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Motivational Ribbon inside/above Form */}
          {!success && (
            <div className="bg-gradient-to-r from-[#0B7A6D] to-teal-brand text-white px-5 py-2.5 text-center text-xs font-bold shrink-0">
              💡 I beta tester ricevono uno sconto speciale e l&apos;app gratuita al lancio ufficiale
            </div>
          )}

          {/* Form Scroll Container */}
          <div className="p-5 sm:p-6 overflow-y-auto">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
                        Passo 1: I tuoi dati di contatto
                      </h4>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Nome e Cognome <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Es. Mario Rossi"
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Numero WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="Es. +39 333 1234567"
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Lo usiamo per attivare l&apos;accesso e darti supporto.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Es. mario.rossi@gmail.com"
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
                        Passo 2: Profilo professionale
                      </h4>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Che mestiere fai? <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all bg-white"
                        >
                          <option value="">Seleziona...</option>
                          <option value="Elettricista">Elettricista</option>
                          <option value="Idraulico">Idraulico</option>
                          <option value="Videomaker">Videomaker</option>
                          <option value="Consulente">Consulente</option>
                          <option value="altro">Altro...</option>
                        </select>
                      </div>

                      {profession === "altro" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="overflow-hidden"
                        >
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Specifica il tuo mestiere <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={customProfession}
                            onChange={(e) => setCustomProfession(e.target.value)}
                            placeholder="Es. Giardiniere, Pittore..."
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all"
                          />
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Quanti preventivi fai in media al mese? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 mt-1.5">
                          {["0-5", "6-15", "16-30", "30+"].map((range) => (
                            <label
                              key={range}
                              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                                monthlyEstimates === range
                                  ? "bg-teal-brand/5 border-teal-brand text-teal-dark"
                                  : "border-slate-200 hover:border-slate-300 bg-white"
                              }`}
                            >
                              <input
                                type="radio"
                                name="estimates"
                                required
                                checked={monthlyEstimates === range}
                                onChange={() => setMonthlyEstimates(range)}
                                className="accent-teal-brand"
                              />
                              <span>{range} preventivi</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Come fai i preventivi oggi? <span className="text-red-500">*</span> <span className="text-[10px] text-slate-400 font-normal">(Seleziona almeno uno)</span>
                        </label>
                        <div className="space-y-2 mt-1.5">
                          {[
                            { id: "carta", label: "A mano su carta/WhatsApp" },
                            { id: "word_excel", label: "Word o Excel" },
                            { id: "gestionale", label: "Un gestionale già esistente" },
                            { id: "altro_metodo", label: "Altro" }
                          ].map((item) => {
                            const isChecked = selectedTools.includes(item.label);
                            return (
                              <label
                                key={item.id}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                                  isChecked
                                    ? "bg-teal-brand/5 border-teal-brand text-teal-dark"
                                    : "border-slate-200 hover:border-slate-300 bg-white"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedTools([...selectedTools, item.label]);
                                    } else {
                                      setSelectedTools(selectedTools.filter((t) => t !== item.label));
                                    }
                                  }}
                                  className="accent-teal-brand h-4 w-4 rounded border-slate-300 text-teal-brand focus:ring-teal-brand"
                                />
                                <span>{item.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {selectedTools.includes("Altro") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="overflow-hidden mt-2"
                        >
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Con cosa fai i preventivi? <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={customTool}
                            onChange={(e) => setCustomTool(e.target.value)}
                            placeholder="Specifica lo strumento che utilizzi..."
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-teal-brand focus:outline-none focus:ring-2 focus:ring-teal-brand/10 transition-all"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
                        Passo 3: Preferenze e Privacy
                      </h4>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Da dove vuoi usarlo principalmente? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1.5">
                          {[
                            { id: "ios_android", label: "iOS / Android", icon: Smartphone },
                            { id: "windows_macos", label: "Windows / MacBook", icon: Monitor },
                            { id: "entrambi", label: "Entrambi", icon: SmartphoneNfc }
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <button
                                type="button"
                                key={item.id}
                                onClick={() => setPrimaryDevice(item.label)}
                                className={`flex sm:flex-col items-center justify-start sm:justify-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all text-left sm:text-center cursor-pointer ${
                                  primaryDevice === item.label
                                    ? "bg-teal-brand/5 border-teal-brand text-teal-dark shadow-sm"
                                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
                                }`}
                              >
                                <IconComp className="h-5 w-5 text-teal-brand shrink-0" />
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={acceptPrivacy}
                            onChange={(e) => setAcceptPrivacy(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-brand focus:ring-teal-brand accent-teal-brand"
                          />
                          <span className="text-xs text-slate-500 leading-tight">
                            Ho letto e accetto la{" "}
                            <Link
                              href="/privacy"
                              onClick={onClose}
                              className="text-teal-brand font-bold underline hover:text-teal-dark transition-all"
                            >
                              Privacy Policy
                            </Link>{" "}
                            di PreviCloud conforme al GDPR. Accetto di essere contattato via WhatsApp per l&apos;invio delle credenziali. <span className="text-red-500">*</span>
                          </span>
                        </label>
                      </div>

                      <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 p-3 text-[11px] text-amber-800 border border-amber-200/50 mt-2">
                        <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                        <p>
                          <strong>Nessun vincolo:</strong> La beta è totalmente gratuita. Riceverai uno sconto fisso permanente per quando deciderai di passare alla versione pubblica.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {errorMsg && (
                  <div className="flex items-start gap-2.5 rounded-lg bg-red-50 p-3 text-[12px] text-red-700 border border-red-200">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                {/* Footer buttons within the scroll view */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Indietro
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={(step === 1 && !isStep1Valid()) || (step === 2 && !isStep2Valid())}
                      className="px-5 py-2.5 bg-teal-brand hover:bg-teal-dark text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      Continua
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !isStep3Valid()}
                      className="px-6 py-2.5 bg-[#0B7A6D] hover:bg-[#096359] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        "Invia Iscrizione"
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-brand">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Iscrizione completata con successo!</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Grazie, <strong className="text-slate-800">{name}</strong>! Ti ricontatteremo su WhatsApp entro pochi giorni per attivare il tuo accesso alla beta.
                </p>
                <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-xs text-slate-500 space-y-2.5 border border-slate-100">
                  <p className="font-bold text-slate-700">I tuoi vantaggi da Beta Tester:</p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-brand" />
                    Accesso illimitato totalmente gratuito durante la beta.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-brand" />
                    Supporto diretto con gli sviluppatori per i tuoi listini.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-brand" />
                    Sconto a vita garantito sul futuro piano a pagamento.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-6 w-full rounded-lg bg-slate-900 hover:bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition-all active:scale-98 cursor-pointer"
                >
                  Chiudi ed esplora l&apos;app
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
