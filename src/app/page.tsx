import type { Metadata } from "next";
import LandingHome from "@/components/landing/LandingHome";

const SITE_URL = "https://previcloud.it";

export const metadata: Metadata = {
  title: "PreviCloud — Preventivi con AI, firma digitale e pagamenti per artigiani",
  description:
    "PreviCloud è il SaaS italiano per artigiani e freelance: crea preventivi professionali con l'AI, falli firmare online e incassa con Stripe. Beta privata gratuita, posti limitati.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PreviCloud",
    title: "PreviCloud — Preventivi con AI, firma digitale e pagamenti",
    description:
      "Crea preventivi professionali con l'AI, falli firmare online e incassa con Stripe. Beta privata gratuita per artigiani italiani.",
    locale: "it_IT",
    images: [
      {
        url: `${SITE_URL}/previcloud-logo.jpg`,
        width: 512,
        height: 512,
        alt: "PreviCloud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PreviCloud — Preventivi con AI, firma digitale e pagamenti",
    description:
      "Il SaaS italiano per artigiani: preventivi con AI, firma digitale e incassi con Stripe. Beta privata gratuita.",
    images: [`${SITE_URL}/previcloud-logo.jpg`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PreviCloud",
      url: SITE_URL,
      logo: `${SITE_URL}/previcloud-logo.jpg`,
      description:
        "PreviCloud è il SaaS italiano per artigiani e freelance: preventivi con AI, firma digitale e incassi con Stripe.",
      areaServed: "IT",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "PreviCloud",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS, Windows, macOS",
      url: SITE_URL,
      inLanguage: "it-IT",
      description:
        "App per creare preventivi professionali con l'AI, firmarli digitalmente e incassare online con Stripe. Pensata per artigiani e freelance italiani.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Accesso gratuito durante la beta privata.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHome />
    </>
  );
}
