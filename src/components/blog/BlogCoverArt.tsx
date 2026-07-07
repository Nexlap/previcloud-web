import type { BlogCategoryId } from "@/lib/blogCategories";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

type BlogCoverArtProps = {
  category: BlogCategoryId;
  className?: string;
};

/**
 * Copertine illustrate a linee, disegnate ad hoc per ogni pillar del blog.
 * Sostituiscono le foto stock: stessa texture a pallini dell'hero della
 * landing (LandingHome.tsx), stesso teal di brand, un accento per categoria.
 */
export function BlogCoverArt({ category, className = "" }: BlogCoverArtProps) {
  const meta = BLOG_CATEGORIES[category];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: meta.accentSoft }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(${meta.accent} 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: meta.accent }}
      />
      <svg
        viewBox="0 0 200 140"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {renderIllustration(category, meta.accent)}
      </svg>
    </div>
  );
}

function renderIllustration(category: BlogCategoryId, accent: string) {
  const teal = "#0E9F8E";
  const ink = "#0D1B2A";

  switch (category) {
    case "preventivi":
      // Foglio preventivo con righe di voci e un totale a segno di spunta
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="58" y="18" width="84" height="104" rx="6" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <path d="M76 18 v-6 a4 4 0 0 1 4-4 h40 a4 4 0 0 1 4 4 v6" stroke={ink} strokeWidth="2.5" />
          <line x1="70" y1="40" x2="130" y2="40" stroke={accent} strokeWidth="3" />
          <line x1="70" y1="54" x2="118" y2="54" stroke={ink} strokeWidth="2" opacity="0.35" />
          <line x1="70" y1="64" x2="124" y2="64" stroke={ink} strokeWidth="2" opacity="0.35" />
          <line x1="70" y1="74" x2="110" y2="74" stroke={ink} strokeWidth="2" opacity="0.35" />
          <line x1="70" y1="94" x2="130" y2="94" stroke={ink} strokeWidth="2" opacity="0.5" />
          <rect x="70" y="102" width="60" height="14" rx="3" fill={teal} opacity="0.12" />
          <text x="76" y="112" fontSize="9" fontWeight="700" fill={ink}>TOTALE €</text>
          <circle cx="150" cy="100" r="20" fill={teal} />
          <path d="M141 100 l6 6 l12 -14" stroke="#FFFFFF" strokeWidth="4" fill="none" />
        </g>
      );
    case "firma-digitale":
      // Documento con firma a mano libera e un lucchetto (validità legale)
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="52" y="16" width="80" height="100" rx="6" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <line x1="64" y1="36" x2="120" y2="36" stroke={ink} strokeWidth="2" opacity="0.3" />
          <line x1="64" y1="48" x2="112" y2="48" stroke={ink} strokeWidth="2" opacity="0.3" />
          <line x1="64" y1="60" x2="118" y2="60" stroke={ink} strokeWidth="2" opacity="0.3" />
          <path
            d="M62 92 C 70 80, 78 100, 86 88 S 100 78, 108 90 S 118 82, 122 86"
            stroke={accent}
            strokeWidth="3.5"
          />
          <line x1="60" y1="102" x2="124" y2="102" stroke={ink} strokeWidth="1.5" opacity="0.25" />
          <g transform="translate(140,60)">
            <circle r="26" fill={teal} opacity="0.14" />
            <rect x="-10" y="-2" width="20" height="16" rx="3" fill={teal} />
            <path d="M-6 -2 v-6 a6 6 0 0 1 12 0 v6" stroke={teal} strokeWidth="3" fill="none" />
          </g>
        </g>
      );
    case "pagamenti":
      // Carta e monete/flusso di pagamento verso un conto
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="46" y="46" width="76" height="48" rx="8" fill={ink} />
          <rect x="46" y="58" width="76" height="10" fill={accent} opacity="0.8" />
          <line x1="56" y1="82" x2="82" y2="82" stroke="#FFFFFF" strokeWidth="3" opacity="0.7" />
          <circle cx="140" cy="52" r="16" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
          <text x="140" y="57" fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">€</text>
          <circle cx="162" cy="80" r="11" fill={accent} opacity="0.25" />
          <path d="M104 96 q20 18 44 8" stroke={accent} strokeWidth="2.5" strokeDasharray="1 7" />
          <path d="M140 100 l8 5 l-2 9" stroke={accent} strokeWidth="2.5" fill="none" />
        </g>
      );
    case "content-creator":
      // Fotocamera/otturatore stilizzato con un play button (video/preset)
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="50" y="42" width="90" height="60" rx="10" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <rect x="70" y="30" width="26" height="14" rx="3" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <circle cx="95" cy="72" r="22" fill={accent} opacity="0.12" stroke={accent} strokeWidth="2.5" />
          <path d="M89 62 l18 10 l-18 10 z" fill={accent} />
          <circle cx="126" cy="54" r="4" fill={accent} />
          <g transform="translate(150,96)">
            <circle r="18" fill={teal} opacity="0.14" />
            <path d="M-5 -8 l12 8 l-12 8 z" fill={teal} />
          </g>
        </g>
      );
  }
}
