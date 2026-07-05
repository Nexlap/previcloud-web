import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import TermlyInit from "@/components/TermlyInit";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const TERMLY_WEBSITE_UUID = "520c2b0c-0f03-4ed3-a2e6-09768566ac2e";
const TERMLY_SCRIPT_SRC = `https://app.termly.io/resource-blocker/${TERMLY_WEBSITE_UUID}?autoBlock=on`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Font editoriale per titoli/numeri della landing page — rompe l'estetica
// "generico SaaS" data da un sans-serif system-ui usato ovunque.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

// Font della landing page (portato da previcloud-gemini). Applicato solo alle
// pagine marketing tramite la classe `.landing-root`; la dashboard resta su Geist.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const SITE_URL = "https://previcloud.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PreviCloud — Preventivi con AI, firma digitale e pagamenti",
    template: "%s | PreviCloud",
  },
  description:
    "PreviCloud è il SaaS italiano per artigiani: preventivi professionali con AI, firma digitale e incassi con Stripe. Beta privata gratuita, posti limitati.",
  applicationName: "PreviCloud",
  keywords: [
    "preventivi",
    "preventivi AI",
    "artigiani",
    "firma digitale",
    "Stripe",
    "SaaS italiano",
    "preventivo PDF",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script src={TERMLY_SCRIPT_SRC} strategy="afterInteractive" />
        {children}
        <Suspense fallback={null}>
          <TermlyInit />
        </Suspense>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
