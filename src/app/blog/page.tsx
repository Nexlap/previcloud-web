import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { formatBlogDate, getAllPosts } from "@/lib/blog";

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
      <div className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-brand hover:text-teal-dark mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Torna alla Homepage
          </Link>

          <div className="text-left mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-brand">
              Risorse
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Blog PreviCloud
            </h1>
            <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl">
              Guide, consigli e novità per artigiani e freelance che vogliono creare
              preventivi professionali, incassare online e risparmiare tempo in cantiere.
            </p>
          </div>

          {posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-teal-brand/30 transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                      <Calendar className="h-3.5 w-3.5 text-teal-brand" />
                      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-teal-brand transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {post.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-brand group-hover:text-teal-dark transition-colors">
                      Leggi l&apos;articolo
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
