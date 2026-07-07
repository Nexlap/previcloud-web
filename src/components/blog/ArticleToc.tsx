"use client";

import { useEffect, useState } from "react";
import type { ArticleHeading } from "@/lib/slugify";

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
    <nav className="bg-white border border-slate-200 rounded-2xl p-5" aria-label="Sommario articolo">
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
        In questo articolo
      </span>
      <ul className="mt-3 space-y-0.5 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
                activeId === h.id
                  ? "border-teal-brand text-teal-brand font-semibold"
                  : "border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
