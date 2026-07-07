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
      {/* Masthead editoriale */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#0E9F8E 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-brand/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-brand hover:text-teal-dark mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Torna alla Homepage
          </Link>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">
              Guide per il mestiere
            </span>
            <h1 className="font-serif-editorial mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.05] max-w-3xl">
              Il blog di PreviCloud
            </h1>
            <p className="text-slate-600 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl">
              Guide pratiche, senza fronzoli, per artigiani, freelance e content creator che
              vogliono preventivi chiari, incassi puntuali e meno tempo perso alla scrivania.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {posts.length > 0 ? (
            <BlogIndexClient posts={posts} />
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
              Nessun articolo pubblicato al momento. Torna presto!
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
}
