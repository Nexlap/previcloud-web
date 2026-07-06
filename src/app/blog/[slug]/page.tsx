import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogLayout } from "@/components/blog/BlogLayout";
import {
  formatBlogDate,
  getAllSlugs,
  getPostBySlug,
  getPostOgImage,
} from "@/lib/blog";

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
  });

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
      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-brand hover:text-teal-dark mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Torna al blog
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
              <Calendar className="h-3.5 w-3.5 text-teal-brand" />
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="blog-prose">{content}</div>
        </div>
      </article>
    </BlogLayout>
  );
}
