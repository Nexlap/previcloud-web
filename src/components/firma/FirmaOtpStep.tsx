"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Mail, ShieldCheck } from "lucide-react";

const COUNTDOWN_SEC = 60;

type Props = {
  token: string;
  backendUrl: string;
  emailCliente?: string | null;
  onVerified: (sessionToken: string) => void;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function parseErrorMessage(data: Record<string, unknown>, fallback: string) {
  const msg = data.error ?? data.message ?? data.errore;
  return typeof msg === "string" && msg.trim() ? msg : fallback;
}

function parseTentativiRimasti(data: Record<string, unknown>) {
  const raw = data.tentativiRimasti ?? data.tentativi_rimasti;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : null;
}

function parseSessionToken(data: Record<string, unknown>) {
  const token = data.sessionToken ?? data.session_token;
  return typeof token === "string" && token.trim() ? token : null;
}

function isCodiceScaduto(message: string) {
  const lower = message.toLowerCase();
  return lower.includes("scadut") || lower.includes("expired");
}

export function FirmaOtpStep({ token, backendUrl, emailCliente, onVerified }: Props) {
  const emailNota = emailCliente?.trim() || "";
  const richiedeEmail = !emailNota;

  const [email, setEmail] = useState("");
  const [codice, setCodice] = useState("");
  const [codiceInviato, setCodiceInviato] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loadingRichiedi, setLoadingRichiedi] = useState(false);
  const [loadingVerifica, setLoadingVerifica] = useState(false);
  const [errore, setErrore] = useState("");
  const [emailDestinazione, setEmailDestinazione] = useState(emailNota);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [countdown]);

  const inviaCodice = useCallback(async () => {
    setErrore("");

    const destinatario = richiedeEmail ? email.trim() : emailNota;
    if (richiedeEmail && !isValidEmail(destinatario)) {
      setErrore("Inserisci un indirizzo email valido.");
      return;
    }

    setLoadingRichiedi(true);
    try {
      const body = richiedeEmail ? { email: destinatario } : {};
      const res = await fetch(`${backendUrl}/api/firma/${token}/otp/richiedi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Record<string, unknown>;

      if (!res.ok) {
        setErrore(parseErrorMessage(data, "Impossibile inviare il codice. Riprova."));
        return;
      }

      setEmailDestinazione(destinatario);
      setCodiceInviato(true);
      setCodice("");
      setCountdown(COUNTDOWN_SEC);
    } catch {
      setErrore("Connessione non disponibile. Riprova.");
    } finally {
      setLoadingRichiedi(false);
    }
  }, [backendUrl, email, emailNota, richiedeEmail, token]);

  async function verificaCodice() {
    setErrore("");

    const normalized = codice.replace(/\D/g, "");
    if (normalized.length !== 6) {
      setErrore("Inserisci il codice a 6 cifre ricevuto via email.");
      return;
    }

    setLoadingVerifica(true);
    try {
      const payload: { codice: string; email?: string } = { codice: normalized };
      if (emailDestinazione) payload.email = emailDestinazione;

      const res = await fetch(`${backendUrl}/api/firma/${token}/otp/verifica`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as Record<string, unknown>;

      if (!res.ok) {
        const message = parseErrorMessage(data, "Codice non valido.");
        const tentativi = parseTentativiRimasti(data);
        let full = message;
        if (tentativi !== null) {
          full +=
            tentativi === 0
              ? " Non restano altri tentativi: richiedi un nuovo codice."
              : ` Tentativi rimasti: ${tentativi}.`;
        }
        if (isCodiceScaduto(message)) {
          full = "Il codice è scaduto. Richiedi un nuovo codice di verifica.";
          setCodiceInviato(false);
          setCountdown(0);
        }
        setErrore(full);
        return;
      }

      const sessionToken = parseSessionToken(data);
      if (!sessionToken) {
        setErrore("Risposta non valida dal server. Riprova.");
        return;
      }

      onVerified(sessionToken);
    } catch {
      setErrore("Connessione non disponibile. Riprova.");
    } finally {
      setLoadingVerifica(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#0E9F8E]/20 bg-[#0E9F8E]/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0E9F8E]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-[#0D1B2A]">Verifica la tua identità</p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">
            Per firmare il preventivo, conferma l&apos;accesso con un codice inviato alla tua
            email.
          </p>
        </div>
      </div>

      {!codiceInviato ? (
        <>
          {richiedeEmail ? (
            <div className="mb-4">
              <label htmlFor="firma-otp-email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" aria-hidden />
                <input
                  id="firma-otp-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@esempio.it"
                  className="w-full rounded-xl border border-[#E5E7EB] bg-white py-3 pl-10 pr-3 text-sm text-[#0D1B2A] outline-none transition focus:border-[#0E9F8E] focus:ring-2 focus:ring-[#0E9F8E]/20"
                />
              </div>
            </div>
          ) : (
            <p className="mb-4 text-sm text-[#6B7280]">
              Invieremo il codice a{" "}
              <span className="font-medium text-[#0D1B2A]">{emailNota}</span>.
            </p>
          )}

          <button
            type="button"
            disabled={loadingRichiedi}
            onClick={() => void inviaCodice()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0E9F8E] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0c8a7c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingRichiedi ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Invio in corso…
              </>
            ) : (
              "Invia codice di verifica"
            )}
          </button>
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-[#6B7280]">
            Codice inviato a{" "}
            <span className="font-medium text-[#0D1B2A]">{emailDestinazione}</span>.
            Controlla anche lo spam.
          </p>

          <div className="mb-4">
            <label htmlFor="firma-otp-codice" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
              Codice a 6 cifre
            </label>
            <input
              id="firma-otp-codice"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={codice}
              onChange={(e) => setCodice(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-3 text-center text-lg font-semibold tracking-[0.35em] text-[#0D1B2A] outline-none transition focus:border-[#0E9F8E] focus:ring-2 focus:ring-[#0E9F8E]/20"
            />
          </div>

          <button
            type="button"
            disabled={loadingVerifica || codice.length !== 6}
            onClick={() => void verificaCodice()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0E9F8E] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0c8a7c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingVerifica ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Verifica in corso…
              </>
            ) : (
              "Verifica"
            )}
          </button>

          <div className="mt-4 text-center">
            {countdown > 0 ? (
              <p className="text-xs text-[#9CA3AF]">
                Puoi richiedere un nuovo codice tra{" "}
                <span className="font-semibold text-[#6B7280]">{countdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                disabled={loadingRichiedi}
                onClick={() => void inviaCodice()}
                className="text-sm font-medium text-[#0E9F8E] underline-offset-2 hover:underline disabled:opacity-60"
              >
                {loadingRichiedi ? "Invio in corso…" : "Invia un nuovo codice"}
              </button>
            )}
          </div>
        </>
      )}

      {errore ? (
        <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errore}
        </p>
      ) : null}
    </div>
  );
}
