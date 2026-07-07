import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogCoverArt } from "@/components/blog/BlogCoverArt";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { blogMdxComponents } from "@/components/blog/mdxComponents";
import {
  estimateReadingTime,
  formatBlogDate,
  getAllPosts,
  getAllSlugs,
  getPostBySlug,
  getPostOgImage,
} from "@/lib/blog";
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

  const category = getCategoryForSlug(post.slug);
  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);
  const relatedPosts = getAllPosts()
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
        <div className="border-b border-slate-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-brand hover:text-teal-dark transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Torna al blog
            </Link>
          </div>
        </div>

        <div className="relative h-44 sm:h-56 md:h-64 w-full">
          <BlogCoverArt category={category.id} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-6">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: category.accent }}
              >
                {category.label}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-x-12 gap-y-10 items-start">
          <div className="min-w-0">
            <header className="mb-10">
              <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-5 pt-5 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-teal-brand" />
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-teal-brand" />
                  {readingTime} min di lettura
                </span>
              </div>
            </header>

            <div className="blog-prose">{content}</div>

            <RelatedPosts posts={relatedPosts} />
          </div>

          <aside className="hidden lg:flex lg:flex-col lg:gap-5 lg:sticky lg:top-24">
            <ArticleToc headings={headings} />
            <div className="bg-gradient-to-br from-teal-brand to-[#0B7A6D] text-white rounded-2xl p-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal-100">
                PreviCloud
              </span>
              <p className="mt-2 text-sm font-semibold leading-snug">
                Preventivi così, generati con l&apos;AI in due minuti.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold bg-white text-teal-dark px-3 py-2 rounded-lg hover:bg-teal-50 transition-all"
              >
                Prova la beta gratuita
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </BlogLayout>
  );
}
