const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type ArticleHeading = { id: string; text: string };

/**
 * Estrae i titoli di sezione (## ) dal markdown grezzo per costruire il
 * sommario laterale dell'articolo. Usa la stessa slugify() applicata agli
 * heading renderizzati (vedi mdxComponents.tsx) cosi gli id combaciano.
 */
export function extractHeadings(content: string): ArticleHeading[] {
  const matches = content.matchAll(/^##\s+(.+)$/gm);
  const seen = new Map<string, number>();

  return Array.from(matches, (match) => {
    const text = match[1].replace(/\*\*/g, "").replace(/[*_`]/g, "").trim();
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    return { id, text };
  });
}
