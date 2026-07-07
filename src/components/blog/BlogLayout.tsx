import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type BlogLayoutProps = {
  children: ReactNode;
};

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="landing-root min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-teal-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Salta al contenuto
      </a>
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/previcloud-logo.jpg"
              alt="PreviCloud Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-sm object-cover transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Previ<span className="text-teal-brand">Cloud</span>
            </span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-600">
            <Link href="/blog" className="text-teal-brand">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-teal-brand transition-colors">
              FAQ
            </Link>
            <Link
              href="/"
              className="hidden sm:inline hover:text-teal-brand transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main id="contenuto" className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/" className="font-extrabold text-slate-900 hover:opacity-90">
            Previ<span className="text-teal-brand">Cloud</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-4 font-semibold">
            <Link href="/blog" className="hover:text-teal-brand transition-colors">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-teal-brand transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-teal-brand transition-colors">
              Privacy
            </Link>
            <Link href="/termini" className="hover:text-teal-brand transition-colors">
              Termini
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
