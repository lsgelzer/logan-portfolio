import { PROFILE } from '@/lib/portfolio-data'

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
      // Explicitly welcome AI crawlers (GEO) so Logan's profile can appear
      // in generative answers about Shopify developers.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
    ],
    sitemap: `${PROFILE.url}/sitemap.xml`,
    host: PROFILE.url,
  }
}
