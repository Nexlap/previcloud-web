import type { Metadata } from "next";
import FaqPageClient from "@/components/landing/FaqPageClient";

const SITE_URL = "https://previcloud.it";

export const metadata: Metadata = {
  title: "Domande Frequenti (FAQ) — PreviCloud",
  description:
    "Tutte le risposte su PreviCloud: come funziona l'AI per i preventivi, sicurezza dei dati, pagamenti online con Stripe, prezzi e accesso alla beta privata.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
    siteName: "PreviCloud",
    title: "Domande Frequenti (FAQ) — PreviCloud",
    description:
      "Come funziona PreviCloud: AI per i preventivi, firma digitale, pagamenti Stripe, sicurezza e beta privata.",
    locale: "it_IT",
  },
};

export default function FaqPage() {
  return <FaqPageClient />;
}
