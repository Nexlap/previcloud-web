import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Lightbulb } from "lucide-react";
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
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm !my-0" {...props} />
    </div>
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <div className="not-prose my-8 flex gap-3 rounded-2xl bg-teal-brand/[0.06] border border-teal-brand/20 px-5 py-4">
      <Lightbulb className="h-5 w-5 text-teal-brand shrink-0 mt-0.5" />
      <blockquote
        className="text-[15px] text-slate-700 leading-relaxed [&>p]:m-0 [&_strong]:text-slate-900"
        {...props}
      />
    </div>
  ),
};
