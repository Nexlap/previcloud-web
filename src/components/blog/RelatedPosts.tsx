import Link from "next/link";
import { Clock } from "lucide-react";
import { BlogCoverArt } from "@/components/blog/BlogCoverArt";
import type { BlogPostMeta } from "@/lib/blog";
import { getCategoryForSlug } from "@/lib/blogCategories";

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-slate-200">
      <h2 className="font-serif-editorial text-2xl font-semibold text-slate-900 mb-6">
        Continua a leggere
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => {
          const category = getCategoryForSlug(post.slug);
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-teal-brand/30 transition-all"
            >
              <div className="relative aspect-[16/10]">
                <BlogCoverArt category={category.id} className="h-full w-full" />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-serif-editorial text-base font-semibold text-slate-900 leading-snug group-hover:text-teal-brand transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-teal-brand" />
                  {post.readingTime} min di lettura
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
