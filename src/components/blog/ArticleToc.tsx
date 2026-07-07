"use client";

import { useEffect, useState } from "react";
import type { ArticleHeading } from "@/lib/slugify";

/**
 * Sommario laterale dell'articolo, in stile indice di capitolato: le voci
 * riprendono la stessa numerazione progressiva stampata sugli H2 dal CSS
 * (counter blog-section in globals.css).
 */
export function ArticleToc({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
      aria-label="Indice dell'articolo"
    >
      <span className="font-mono-meta text-[0.65rem] font-semibold uppercase text-slate-400">
        Indice
      </span>
      <ol className="mt-3 space-y-0.5 text-sm">
        {headings.map((h, index) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-baseline gap-2.5 rounded-md border-l-2 py-1.5 pl-3 pr-2 leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-brand ${
                  isActive
                    ? "border-teal-brand bg-teal-brand/[0.06] font-semibold text-teal-dark"
                    : "border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                <span
                  className={`font-mono-meta shrink-0 text-[0.62rem] ${
                    isActive ? "text-teal-brand" : "text-slate-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
