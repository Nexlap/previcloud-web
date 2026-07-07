"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogCoverArt } from "@/components/blog/BlogCoverArt";
import type { BlogPostMeta } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blogFormat";
import { getAllCategories, getCategoryForSlug } from "@/lib/blogCategories";

type BlogIndexClientProps = {
  posts: BlogPostMeta[];
};

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = getAllCategories();

  const [featured, ...rest] = posts;

  const filteredRest = useMemo(() => {
    if (activeCategory === "all") return rest;
    return rest.filter((post) => getCategoryForSlug(post.slug).id === activeCategory);
  }, [activeCategory, rest]);

  const showFeatured = activeCategory === "all" && featured;

  return (
    <>
      {/* Filtro categorie */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-teal-brand text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Tutte le guide
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeCategory === cat.id
                ? "text-white shadow-sm border-transparent"
                : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
            }`}
            style={activeCategory === cat.id ? { backgroundColor: cat.accent } : undefined}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {showFeatured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid grid-cols-1 md:grid-cols-5 gap-0 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg hover:border-teal-brand/30 transition-all overflow-hidden mb-12"
        >
          <div className="md:col-span-2 relative min-h-[220px] md:min-h-full">
            <BlogCoverArt
              category={getCategoryForSlug(featured.slug).id}
              className="h-full w-full"
            />
          </div>
          <div className="md:col-span-3 p-6 sm:p-8 md:p-10 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
              <span
                className="px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: getCategoryForSlug(featured.slug).accent }}
              >
                {getCategoryForSlug(featured.slug).label}
              </span>
              <span className="text-slate-400">Ultima guida</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 leading-tight tracking-tight group-hover:text-teal-brand transition-colors">
              {featured.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">{featured.description}</p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-teal-brand" />
                <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-teal-brand" />
                {featured.readingTime} min di lettura
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-brand group-hover:text-teal-dark transition-colors mt-1">
              Leggi la guida
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      )}

      {/* Griglia articoli */}
      {filteredRest.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRest.map((post) => {
            const category = getCategoryForSlug(post.slug);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-teal-brand/30 transition-all overflow-hidden"
              >
                <div className="relative aspect-[16/10]">
                  <BlogCoverArt category={category.id} className="h-full w-full" />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                    style={{ backgroundColor: category.accent }}
                  >
                    {category.label}
                  </span>
                </div>
                <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-serif-editorial text-lg sm:text-xl font-semibold text-slate-900 leading-snug tracking-tight group-hover:text-teal-brand transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-teal-brand" />
                      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-teal-brand" />
                      {post.readingTime} min
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400">
          Nessun articolo in questa categoria per ora.
        </div>
      )}
    </>
  );
}
