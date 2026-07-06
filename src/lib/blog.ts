import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

export type BlogPostMeta = BlogPostFrontmatter;

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

  return files
    .map((filename) => {
      const { content: _content, ...meta } = parsePost(filename);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
