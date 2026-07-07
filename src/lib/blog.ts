import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { estimateReadingTime, formatBlogDate } from "./blogFormat";

export { estimateReadingTime, formatBlogDate } from "./blogFormat";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export const DEFAULT_OG_IMAGE = "/opengraph-image.png";

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  ogImage?: string;
};

export type BlogPost = BlogPostFrontmatter & {
  content: string;
};

export type BlogPostMeta = BlogPostFrontmatter & {
  readingTime: number;
  /** Numero di protocollo della guida (1 = la più vecchia), stile registro */
  guideNumber: number;
};

function parsePost(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;

  return {
    ...frontmatter,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const { content, ...meta } = parsePost(filename);
      return { ...meta, readingTime: estimateReadingTime(content) };
    })
    // Ordine cronologico ascendente (slug come spareggio) per assegnare il
    // numero di protocollo: la guida più vecchia è la N. 1, come in un registro.
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime() ||
        a.slug.localeCompare(b.slug)
    )
    .map((meta, index) => ({ ...meta, guideNumber: index + 1 }));

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.guideNumber - a.guideNumber
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"));

  for (const filename of files) {
    const post = parsePost(filename);
    if (post.slug === slug) {
      return post;
    }
  }

  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostOgImage(post: BlogPostFrontmatter): string {
  return post.ogImage ?? DEFAULT_OG_IMAGE;
}
