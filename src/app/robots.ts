import type { MetadataRoute } from 'next'

const SITE_URL = 'https://previcloud.it'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Crawler generici: indicizzano le pagine pubbliche, non le aree private
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api/', '/benvenuto', '/stripe-callback', '/stripe-connesso'],
      },
      // Crawler AI esplicitamente ammessi
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
