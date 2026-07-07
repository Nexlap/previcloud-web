import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { formatGuideNumber } from "@/lib/blogFormat";
import { getCategoryForSlug } from "@/lib/blogCategories";

/** Guide correlate in coda all'articolo, rese come righe di registro. */
export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif-editorial text-2xl font-semibold text-slate-900">
          Continua a leggere
        </h2>
        <Link
          href="/blog"
          className="font-mono-meta text-[0.65rem] font-semibold uppercase text-teal-dark hover:text-teal-brand transition-colors"
        >
          Tutte le guide
        </Link>
      </div>

      <ol className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-card">
        {posts.map((post) => {
          const category = getCategoryForSlug(post.slug);
          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-teal-brand/[0.04] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-brand"
              >
                <span className="font-mono-meta shrink-0 text-xs font-semibold text-slate-400">
                  {formatGuideNumber(post.guideNumber)}
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: category.accent }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-serif-editorial text-base font-semibold text-slate-900 group-hover:text-teal-dark transition-colors">
                    {post.title}
                  </span>
                  <span className="font-mono-meta mt-0.5 block text-[0.62rem] uppercase text-slate-400">
                    {category.label} · {post.readingTime} min
                  </span>
                </span>
                <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-brand" />
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
