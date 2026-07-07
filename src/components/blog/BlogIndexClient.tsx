"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCoverArt } from "@/components/blog/BlogCoverArt";
import type { BlogPostMeta } from "@/lib/blog";
import { formatBlogDate, formatGuideNumber } from "@/lib/blogFormat";
import { getAllCategories, getCategoryForSlug } from "@/lib/blogCategories";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

type BlogIndexClientProps = {
  posts: BlogPostMeta[];
};

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = getAllCategories();

  // Il filtro attivo vive anche nell'URL (?categoria=...) così le viste
  // filtrate sono linkabili; replaceState evita di sporcare la history.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("categoria");
    if (fromUrl && fromUrl in BLOG_CATEGORIES) {
      setActiveCategory(fromUrl);
    }
  }, []);

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    const url = new URL(window.location.href);
    if (id === "all") {
      url.searchParams.delete("categoria");
    } else {
      url.searchParams.set("categoria", id);
    }
    window.history.replaceState(null, "", url);
  };

  const countByCategory = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      const id = getCategoryForSlug(post.slug).id;
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  }, [posts]);

  const [featured, ...rest] = posts;
  const showFeatured = activeCategory === "all" && featured;

  const filteredRest = useMemo(() => {
    if (activeCategory === "all") return rest;
    return posts.filter((post) => getCategoryForSlug(post.slug).id === activeCategory);
  }, [activeCategory, posts, rest]);

  return (
    <>
      {/* Filtro categorie */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra le guide per categoria">
        <button
          onClick={() => selectCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-brand ${
            activeCategory === "all"
              ? "bg-teal-brand text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Tutte le guide
          <span className={`font-mono-meta ml-1.5 text-[0.62rem] ${activeCategory === "all" ? "text-teal-100" : "text-slate-400"}`}>
            {String(posts.length).padStart(2, "0")}
          </span>
        </button>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = countByCategory.get(cat.id) ?? 0;
          return (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-brand ${
                isActive
                  ? "bg-teal-brand text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span
                aria-hidden
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ backgroundColor: isActive ? "#FFFFFF" : cat.accent }}
              />
              {cat.label}
              <span className={`font-mono-meta ml-1.5 text-[0.62rem] ${isActive ? "text-teal-100" : "text-slate-400"}`}>
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ultima guida in evidenza */}
      {showFeatured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="blog-reveal group mt-8 grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:border-teal-brand/30 hover:shadow-card-hover md:grid-cols-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-brand"
        >
          <div className="relative min-h-[220px] md:col-span-2 md:min-h-full">
            <BlogCoverArt
              category={getCategoryForSlug(featured.slug).id}
              className="h-full w-full"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: getCategoryForSlug(featured.slug).accent }}
              />
              {getCategoryForSlug(featured.slug).label}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:col-span-3 md:p-10">
            <span className="font-mono-meta text-[0.65rem] font-semibold uppercase text-teal-dark">
              Ultima guida · {formatGuideNumber(featured.guideNumber)}
            </span>
            <h2 className="font-serif-editorial text-pretty text-2xl font-semibold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-teal-dark sm:text-3xl md:text-4xl">
              {featured.title}
            </h2>
            <p className="leading-relaxed text-slate-600">{featured.description}</p>
            <div className="font-mono-meta flex items-center gap-3 text-[0.68rem] uppercase text-slate-400">
              <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
              <span aria-hidden>·</span>
              <span>{featured.readingTime} min di lettura</span>
            </div>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-teal-brand transition-colors group-hover:text-teal-dark">
              Leggi la guida
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      )}

      {/* Registro delle guide */}
      <div className="mt-10 flex items-baseline justify-between gap-4">
        <h2 className="font-serif-editorial text-xl font-semibold text-slate-900">
          {activeCategory === "all" ? "Tutte le guide" : "Guide in archivio"}
        </h2>
        <span className="font-mono-meta text-[0.65rem] uppercase text-slate-400">
          {String(filteredRest.length).padStart(2, "0")} {filteredRest.length === 1 ? "guida" : "guide"}
        </span>
      </div>

      {filteredRest.length > 0 ? (
        <ol className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          {filteredRest.map((post, index) => {
            const category = getCategoryForSlug(post.slug);
            return (
              <li
                key={post.slug}
                className="blog-reveal"
                style={{ animationDelay: `${Math.min(index * 45, 400)}ms` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-teal-brand/[0.04] sm:gap-5 sm:px-6 sm:py-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-brand"
                >
                  <span className="font-mono-meta hidden w-12 shrink-0 text-xs font-semibold text-slate-400 sm:block">
                    {formatGuideNumber(post.guideNumber)}
                  </span>
                  <span className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 sm:block">
                    <BlogCoverArt category={category.id} className="h-full w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-mono-meta flex items-center gap-2 text-[0.62rem] font-semibold uppercase text-slate-500">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                      {category.label}
                      <span className="text-slate-300 sm:hidden" aria-hidden>·</span>
                      <span className="text-slate-400 sm:hidden">{formatGuideNumber(post.guideNumber)}</span>
                    </span>
                    <span className="mt-1.5 block font-serif-editorial text-lg font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-teal-dark sm:text-xl">
                      {post.title}
                    </span>
                    <span className="mt-1 hidden text-sm leading-relaxed text-slate-500 sm:line-clamp-1">
                      {post.description}
                    </span>
                    <span className="font-mono-meta mt-1.5 block text-[0.62rem] uppercase text-slate-400">
                      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                      {" · "}
                      {post.readingTime} min
                    </span>
                  </span>
                  <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-brand" />
                </Link>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-400">
          Nessuna guida in questa categoria, per ora.
        </div>
      )}
    </>
  );
}
