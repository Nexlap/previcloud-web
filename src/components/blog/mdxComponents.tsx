import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { slugify } from "@/lib/slugify";

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    node.props &&
    typeof node.props === "object" &&
    "children" in node.props
  ) {
    return getNodeText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/**
 * Override dei tag HTML generati dal Markdown per l'articolo blog.
 * Passati a compileMDX({ components }) — non tocca il contenuto MDX in
 * sé, solo come viene reso a schermo.
 */
export const blogMdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
    const id = slugify(getNodeText(children));
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm !my-0" {...props} />
    </div>
  ),
  // I blockquote degli articoli sono i riquadri "In breve": resi come nota
  // di registro con filo teal, in linea con il resto del blog.
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <aside className="not-prose my-8 rounded-xl border border-teal-brand/25 border-l-4 border-l-teal-brand bg-teal-brand/[0.05] px-5 py-4 sm:px-6 sm:py-5">
      <blockquote
        className="text-[15px] leading-relaxed text-slate-700 [&>p]:m-0 [&_strong]:text-teal-dark"
        {...props}
      />
    </aside>
  ),
};
