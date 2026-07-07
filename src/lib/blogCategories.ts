export type BlogCategoryId =
  | "preventivi"
  | "firma-digitale"
  | "pagamenti"
  | "content-creator";

export type BlogCategoryMeta = {
  id: BlogCategoryId;
  label: string;
  /** Colore accento in hex, usato per tag, copertine e dettagli editoriali */
  accent: string;
  accentSoft: string;
};

export const BLOG_CATEGORIES: Record<BlogCategoryId, BlogCategoryMeta> = {
  preventivi: {
    id: "preventivi",
    label: "Preventivi",
    accent: "#0E9F8E",
    accentSoft: "#E4F5F2",
  },
  "firma-digitale": {
    id: "firma-digitale",
    label: "Firma digitale",
    accent: "#0D1B2A",
    accentSoft: "#E7EAEE",
  },
  pagamenti: {
    id: "pagamenti",
    label: "Pagamenti",
    accent: "#B8842C",
    accentSoft: "#F7EDDC",
  },
  "content-creator": {
    id: "content-creator",
    label: "Content creator",
    accent: "#B24B3E",
    accentSoft: "#F7E4E0",
  },
};

/**
 * Mappa slug → categoria. Derivata dal tema dell'articolo senza toccare
 * il frontmatter MDX esistente: se un nuovo slug non è mappato, ricade
 * su "preventivi" (la categoria più generale del blog).
 */
const SLUG_CATEGORY_MAP: Record<string, BlogCategoryId> = {
  "preventivo-elettricista-voci-esempio": "preventivi",
  "quanto-tempo-costa-preventivo-a-mano": "preventivi",
  "firma-digitale-preventivo-valida-legalmente": "firma-digitale",
  "whatsapp-email-firma-digitale-accettazione-preventivo": "firma-digitale",
  "farsi-pagare-online-cliente-artigiano": "pagamenti",
  "vendere-prodotti-digitali-store-creator": "pagamenti",
  "preventivo-videomaker-content-creator": "content-creator",
  "guadagnare-preset-lut-corsi-senza-ecommerce": "content-creator",
};

export function getCategoryForSlug(slug: string): BlogCategoryMeta {
  const id = SLUG_CATEGORY_MAP[slug] ?? "preventivi";
  return BLOG_CATEGORIES[id];
}

export function getAllCategories(): BlogCategoryMeta[] {
  return Object.values(BLOG_CATEGORIES);
}
