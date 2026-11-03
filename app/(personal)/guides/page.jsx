import Link from 'next/link'

import TopBar from '@/components/layout/topbar'

export const metadata = {
  title: 'Shopify Development Guides | Logan Gelzer',
  description:
    'In-depth guides on Shopify development: Claude Code workflows, Cursor setup, Shopify Functions, and AI-assisted development for themes and apps.',
  alternates: {
    canonical: 'https://logangelzer.com/guides',
  },
}

const GUIDES = [
  {
    slug: 'claude-code-shopify',
    title: "Claude Code for Shopify: A Senior Dev's AI Workflow (2026)",
    description:
      "How I use Claude Code, Cursor, Gemini and ChatGPT with Shopify's AI Toolkit and CLI to ship themes, Functions and apps faster, without breaking stores.",
    tags: ['Claude Code', 'AI Development', 'Shopify'],
    featured: true,
  },
]

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <TopBar />
      <main className="pt-[72px]">
        <section className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">Guides</b>
            </span>
          </div>

          <div className="mb-14 grid items-end gap-14 md:grid-cols-[1.2fr_1fr]">
            <h1 className="font-display text-[clamp(42px,6vw,92px)] font-medium leading-[0.98] -tracking-[0.035em] text-green-ink">
              Shopify development <em>guides</em>.
            </h1>
            <p className="max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
              In-depth tutorials and workflows for Shopify theme development, AI
              coding agents, Shopify Functions, and headless commerce.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-paper p-8 transition-all duration-300 hover:border-green hover:shadow-[0_20px_40px_-20px_oklch(0.25_0.06_165/0.3)]"
              >
                {guide.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-green px-2 py-0.5 font-mono text-[10px] text-cream">
                    Featured
                  </span>
                )}
                <span
                  aria-hidden
                  className="absolute -right-8 -top-8 size-40 rounded-full bg-blue opacity-20 blur-[20px] transition-opacity group-hover:opacity-40"
                />
                <h2 className="relative z-[1] mb-3 font-display text-[22px] font-medium -tracking-[0.02em] text-green-ink">
                  {guide.title}
                </h2>
                <p className="relative z-[1] mb-5 flex-1 font-openSans text-[15px] leading-[1.6] text-ink-dim">
                  {guide.description}
                </p>
                <div className="relative z-[1] flex flex-wrap gap-1.5">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-bg px-2 py-0.5 font-mono text-[10px] text-ink-mute"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="relative z-[1] mt-5 font-mono text-[12px] text-green transition-colors group-hover:text-green-ink">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Need help with Shopify development?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  I'm a Senior Shopify Expert with 12+ years of experience. Let's
                  discuss your project.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  View services →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-paper px-10 py-8 max-md:px-5">
        <div className="flex items-center justify-between font-mono text-[11px] text-ink-mute max-sm:flex-col max-sm:gap-2">
          <div>
            © {new Date().getFullYear()} Logan Gelzer — made with coffee in
            Miami
          </div>
          <Link href="/" className="hover:text-green">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  )
}
