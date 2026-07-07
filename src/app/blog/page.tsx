import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://previcloud.it";

export const metadata: Metadata = {
  title: "Blog — Guide e consigli per artigiani",
  description:
    "Il blog di PreviCloud: guide pratiche su preventivi, pagamenti online, firma digitale e produttività per artigiani e freelance italiani.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "PreviCloud",
    title: "Blog PreviCloud — Guide per artigiani",
    description:
      "Guide pratiche su preventivi, pagamenti online e produttività per artigiani italiani.",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog PreviCloud — Guide per artigiani",
    description:
      "Guide pratiche su preventivi, pagamenti online e produttività per artigiani italiani.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <BlogLayout>
      {/* Masthead: la copertina del registro */}
      <div className="relative overflow-hidden bg-[#0D1B2A] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(#0E9F8E 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-brand/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-teal-dark/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-100/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-brand"
          >
            <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Torna alla Homepage
          </Link>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono-meta text-[0.7rem] font-semibold uppercase text-teal-brand">
                Registro guide · PreviCloud
              </span>
              <h1 className="font-serif-editorial mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
                Il mestiere,
                <br />
                messo per iscritto.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Guide pratiche su preventivi, firma digitale e incassi per artigiani,
                freelance e creator. Scritte come i tuoi documenti di lavoro: chiare,
                numerate, senza fronzoli.
              </p>
            </div>

            <dl className="font-mono-meta flex gap-8 text-left lg:pb-2">
              <div>
                <dt className="text-[0.62rem] uppercase text-slate-400">Guide</dt>
                <dd className="font-serif-editorial mt-1 text-3xl font-semibold text-white">
                  {String(posts.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="border-l border-white/10 pl-8">
                <dt className="text-[0.62rem] uppercase text-slate-400">Edizione</dt>
                <dd className="font-serif-editorial mt-1 text-3xl font-semibold text-white">
                  2026
                </dd>
              </div>
              <div className="border-l border-white/10 pl-8">
                <dt className="text-[0.62rem] uppercase text-slate-400">Costo</dt>
                <dd className="font-serif-editorial mt-1 text-3xl font-semibold text-teal-brand">
                  Zero
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {posts.length > 0 ? (
            <BlogIndexClient posts={posts} />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              Nessun articolo pubblicato al momento. Torna presto!
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
}
