/**
 * Funzioni pure per il blog, senza dipendenze Node (fs/path) — sicure da
 * importare sia lato server sia da componenti "use client". Le funzioni
 * che leggono il filesystem restano in src/lib/blog.ts.
 */

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
