import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogCoverArt } from "@/components/blog/BlogCoverArt";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { blogMdxComponents } from "@/components/blog/mdxComponents";
import {
  getAllPosts,
  getAllSlugs,
  getPostBySlug,
  getPostOgImage,
} from "@/lib/blog";
import { formatBlogDate, formatGuideNumber } from "@/lib/blogFormat";
import { getCategoryForSlug } from "@/lib/blogCategories";
import { extractHeadings } from "@/lib/slugify";

const SITE_URL = "https://previcloud.it";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = getPostOgImage(post);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "PreviCloud",
      title: post.title,
      description: post.description,
      locale: "it_IT",
      publishedTime: post.date,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: blogMdxComponents,
  });

  const allPosts = getAllPosts();
  const meta = allPosts.find((p) => p.slug === post.slug);
  const category = getCategoryForSlug(post.slug);
  const headings = extractHeadings(post.content);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && getCategoryForSlug(p.slug).id === category.id)
    .slice(0, 3);

  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = getPostOgImage(post);
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "PreviCloud",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PreviCloud",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/previcloud-logo.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <BlogLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        {/* Barra di navigazione del documento */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-brand transition-colors hover:text-teal-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-brand"
            >
              <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Torna al blog
            </Link>
            {meta && (
              <span className="font-mono-meta text-[0.65rem] font-semibold uppercase text-slate-400">
                Guida {formatGuideNumber(meta.guideNumber)}
              </span>
            )}
          </div>
        </div>

        {/* Copertina */}
        <div className="relative h-40 w-full sm:h-52 md:h-60">
          <BlogCoverArt category={category.id} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-6xl px-4 pb-5 sm:px-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: category.accent }}
                />
                {category.label}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-x-12 gap-y-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            {/* Frontespizio */}
            <header className="mb-10">
              <div className="font-mono-meta flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase text-teal-dark">
                {meta && <span>Guida {formatGuideNumber(meta.guideNumber)}</span>}
                <span aria-hidden className="text-slate-300">/</span>
                <span>{category.label}</span>
              </div>
              <h1 className="font-serif-editorial mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                {post.description}
              </p>
              <div className="font-mono-meta mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 text-[0.68rem] uppercase text-slate-400">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                <span aria-hidden>·</span>
                {meta && <span>{meta.readingTime} min di lettura</span>}
                <span aria-hidden>·</span>
                <span>PreviCloud</span>
              </div>
            </header>

            <div className="blog-prose">{content}</div>

            <RelatedPosts posts={relatedPosts} />
          </div>

          <aside className="hidden lg:sticky lg:top-24 lg:flex lg:flex-col lg:gap-5">
            <ArticleToc headings={headings} />
            <div className="relative overflow-hidden rounded-2xl bg-[#0D1B2A] p-6 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: "radial-gradient(#0E9F8E 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative">
                <span className="font-mono-meta text-[0.62rem] font-semibold uppercase text-teal-brand">
                  PreviCloud
                </span>
                <p className="font-serif-editorial mt-3 text-lg font-semibold leading-snug">
                  Il prossimo preventivo scrivilo in due minuti, non in una serata.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Detti il lavoro in chat, l&apos;AI impagina il PDF, il cliente firma e
                  paga online.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-brand px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Prova la beta gratuita
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </BlogLayout>
  );
}
