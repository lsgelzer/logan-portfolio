import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import { getBookingHref } from '@/lib/site-config'

export const metadata = {
  title: 'Claude Code for Shopify: A Senior Dev\'s AI Workflow (2026)',
  description:
    'How I use Claude Code, Cursor, Gemini and ChatGPT with Shopify\'s AI Toolkit and CLI to ship themes, Functions and apps faster, without breaking stores.',
  alternates: {
    canonical: 'https://logangelzer.com/guides/claude-code-shopify',
  },
  openGraph: {
    title: 'Claude Code for Shopify: A Senior Dev\'s AI Workflow',
    description:
      'How I use Claude Code, Cursor, Gemini and ChatGPT with Shopify\'s AI Toolkit and CLI to ship themes, Functions and apps faster, without breaking stores.',
    url: 'https://logangelzer.com/guides/claude-code-shopify',
    type: 'article',
  },
}

const FAQ_ITEMS = [
  {
    question: 'Can Claude Code build a Shopify theme?',
    answer:
      'Yes. With Shopify CLI and the Shopify AI Toolkit, Claude Code can scaffold and edit Liquid sections, blocks and templates and validate them against Shopify\'s schemas. It works best with a senior developer planning the changes, testing in the theme editor and reviewing before publishing.',
  },
  {
    question: 'Do I need the Shopify Dev MCP or AI Toolkit?',
    answer:
      'For serious work, yes. They give the agent current shopify.dev docs and API schemas, and they validate GraphQL, Liquid and UI-extension code. Without them, AI tools often use outdated APIs.',
  },
  {
    question: 'Claude Code or Cursor for Shopify?',
    answer:
      'Both. Claude Code is stronger for multi-file features and refactors. Cursor is faster for precise edits and diff review. Many Shopify developers, me included, use both.',
  },
  {
    question: 'Can Gemini or ChatGPT write Shopify code?',
    answer:
      'Yes. Gemini via Google Antigravity and ChatGPT via Codex can both use the Shopify AI Toolkit. I mainly use them for browser QA, research and second-opinion code review.',
  },
]

const TOOL_COMPARISON = [
  {
    job: 'New sections/blocks, metafield-driven templates, multi-file refactors',
    tool: 'Claude Code',
    reason:
      'Reads the whole theme or app, plans before editing, and runs hooks such as Theme Check after edits',
  },
  {
    job: 'Line-level Liquid, CSS and JS fixes, and reviewing diffs',
    tool: 'Cursor',
    reason:
      'A fast editor loop with rules scoped to sections/ or snippets/',
  },
  {
    job: 'Clicking through preview themes, visual QA, a second opinion',
    tool: 'Gemini (Antigravity)',
    reason:
      'Its agents can work in the browser as well as the editor and terminal',
  },
  {
    job: 'Research, migration mapping, content drafts, PR review',
    tool: 'ChatGPT / Codex',
    reason:
      'A different model catches different mistakes, and Codex can review PRs',
  },
  {
    job: 'Docs, schemas, validation, local preview, deploys',
    tool: 'Shopify AI Toolkit, Dev MCP, Shopify CLI',
    reason: "Shopify's own source of truth",
  },
]

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Set up a safe sandbox',
    content:
      'Every project starts on a duplicate or unpublished theme, or on a dev store for apps and Functions, and everything goes into Git. I pull the theme with `shopify theme pull`, preview it locally with `shopify theme dev`, and only push with `shopify theme push --unpublished`. The agent never edits the live theme.',
  },
  {
    step: 2,
    title: 'Give the agent project memory',
    content:
      'In Claude Code, a `CLAUDE.md` file holds the rules for the project: theme architecture, naming conventions, which apps inject blocks, performance budgets, "never use jQuery", "always use `image_url` with `srcset`", and so on. Cursor gets the same rules in `.cursor/rules`, and Codex gets them in `AGENTS.md`. Ten minutes spent here saves hours of corrections later.',
  },
  {
    step: 3,
    title: 'Map the codebase before changing it',
    content:
      "On an inherited store, I first ask Claude Code to explain: how the product template is put together, which snippets the cart drawer depends on, where app scripts load. This is where AI saves the most time. Reading a messy 1.0-era theme used to take me half a day, and now I get a first-pass map in minutes. I still verify it, because a confident summary can be wrong.",
  },
  {
    step: 4,
    title: 'Plan, then edit',
    content:
      "For anything beyond a one-liner, I use plan mode: the agent proposes which files change and why, and I edit the plan before any code is written. Most AI mistakes are planning mistakes, and they're cheap to catch at this stage.",
  },
  {
    step: 5,
    title: 'Build with validation in the loop',
    content:
      'Claude Code drafts the section, Function or GraphQL operation and validates it through the AI Toolkit. A hook runs `shopify theme check` after edits. For Shopify Functions, I scaffold with `shopify app generate extension`, have the agent write the input query and logic, then run it locally against fixture carts with `shopify app function run` before it goes anywhere near a checkout.',
  },
  {
    step: 6,
    title: 'QA like a senior developer, not like a demo',
    content:
      "This is where the saved time goes. I test the theme editor settings merchants will actually use, translations, mobile layouts, accessibility, app blocks, and edge cases like sold-out variants, stacked discounts and subscriptions. I run Lighthouse before and after. Gemini in Antigravity can click through flows in a browser, and that adds coverage on top of my own testing. It doesn't replace it.",
  },
  {
    step: 7,
    title: 'Second-model review, then human review',
    content:
      "Before merging, a different model (Codex or ChatGPT) reviews the diff. Then I review it line by line, because I'm the one accountable for it.",
  },
  {
    step: 8,
    title: 'Ship with a human on the button',
    content:
      'The client approves the preview link, I publish, and I watch the launch. With Git, rolling back takes seconds.',
  },
]

const TRUST_ISSUES = [
  {
    title: 'Checkout and discount logic',
    description:
      'AI-drafted Functions often look right and fail on the edge cases: combinations, rounding, B2B, markets. These always get a hand-written test matrix.',
  },
  {
    title: 'Performance',
    description:
      'Agents happily add JavaScript. Every change gets measured.',
  },
  {
    title: 'Store-changing commands',
    description:
      'The AI Toolkit can run store tasks through Shopify CLI, but only when I choose to run them, and never in bulk on production without a backup.',
  },
  {
    title: 'Business judgment',
    description:
      "What to build, what to cut, what to A/B test. That's the job I was hired for.",
  },
  {
    title: 'Client data',
    description:
      "No customer PII or secrets go into prompts. If a client prefers no AI, I don't use it.",
  },
]

function FaqItem({ question, answer }) {
  return (
    <details className="group border-b border-line last:border-b-0">
      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors hover:text-green [&::-webkit-details-marker]:hidden">
        <span className="font-display text-[18px] font-medium -tracking-[0.01em] text-green-ink md:text-[20px]">
          {question}
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-paper text-[18px] text-green-ink transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-5">
        <p className="max-w-[720px] font-openSans text-[15px] leading-[1.7] text-ink-dim">
          {answer}
        </p>
      </div>
    </details>
  )
}

export default function ClaudeCodeShopifyGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://logangelzer.com/guides/claude-code-shopify#article',
        headline: "Claude Code for Shopify: A Senior Dev's AI Workflow (2026)",
        description:
          "How I use Claude Code, Cursor, Gemini and ChatGPT with Shopify's AI Toolkit and CLI to ship themes, Functions and apps faster, without breaking stores.",
        author: { '@id': 'https://logangelzer.com/#person' },
        publisher: { '@id': 'https://logangelzer.com/#person' },
        datePublished: new Date().toISOString().split('T')[0],
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: 'https://logangelzer.com/guides/claude-code-shopify',
        image: 'https://logangelzer.com/og-image.png',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://logangelzer.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guides',
            item: 'https://logangelzer.com/guides',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Claude Code for Shopify',
            item: 'https://logangelzer.com/guides/claude-code-shopify',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <TopBar />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="px-10 pt-8 max-md:px-5" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-[11px] text-ink-mute">
            <li>
              <Link href="/" className="hover:text-green">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/guides" className="hover:text-green">
                Guides
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-green-ink">Claude Code for Shopify</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="px-10 py-[60px] max-md:px-5 max-md:py-[40px]">
          <header className="mb-12 max-w-[900px]">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-green px-3 py-1 font-mono text-[11px] text-cream">
                Guide
              </span>
              <span className="font-mono text-[11px] text-ink-mute">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h1 className="mb-6 font-display text-[clamp(32px,5vw,56px)] font-medium leading-[1.1] -tracking-[0.035em] text-green-ink">
              Claude Code for Shopify: My AI Development Workflow (with Cursor,
              Gemini & ChatGPT)
            </h1>
            <p className="mb-6 font-openSans text-[15px] text-ink-mute">
              By{' '}
              <Link href="/about" className="text-green-ink hover:underline">
                Logan Gelzer
              </Link>
              , Senior Shopify Expert
            </p>

            {/* TL;DR Box */}
            <div className="rounded-[14px] border border-green bg-blue p-6">
              <p className="font-display text-[14px] font-medium uppercase tracking-wider text-green">
                TL;DR
              </p>
              <p className="mt-2 font-openSans text-[16px] leading-[1.7] text-green-ink">
                Claude Code works well for Shopify development once it's connected
                to Shopify's AI Toolkit or Dev MCP, so it reads current docs and
                validates Liquid and GraphQL against Shopify's schemas. I use it
                for multi-file theme, app and Functions work, Cursor for precise
                edits, Gemini for browser QA, and ChatGPT for research and review.
                A human still owns the plan, the tests and the publish button.
              </p>
            </div>
          </header>

          {/* Intro */}
          <div className="prose-section mb-12 max-w-[800px] space-y-4 font-openSans text-[16px] leading-[1.8] text-ink-dim">
            <p>
              I've been building on Shopify since 2014, for more than 200 brands.
              In that time the tools have changed a lot, from FTP and the old
              theme editor to Theme Kit, Shopify CLI, Online Store 2.0 and
              Hydrogen. AI coding agents are the biggest change yet. They don't
              change <em>what</em> good Shopify work looks like. They change how
              fast you can get there, and how much time is left over for testing.
            </p>
            <p>
              Here's the workflow I actually use on client projects, what each
              tool is good at, and where I don't trust them.
            </p>
          </div>

          {/* Why generic AI struggles */}
          <section className="mb-12 max-w-[800px]">
            <h2 className="mb-4 font-display text-[28px] font-medium -tracking-[0.02em] text-green-ink">
              Why generic AI struggles with Shopify (and what fixed it)
            </h2>
            <div className="space-y-4 font-openSans text-[16px] leading-[1.8] text-ink-dim">
              <p>
                Ask a general chatbot for a Shopify section and you'll often get
                something that <em>looks</em> right: valid-looking Liquid, a
                plausible <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-[14px]">{`{% schema %}`}</code> block, a GraphQL query with
                sensible field names. The trouble is that Shopify moves fast. API
                versions ship quarterly, checkout moved from{' '}
                <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-[14px]">checkout.liquid</code> to Checkout Extensibility,
                and Shopify Scripts gave way to Functions. A model working from
                memory will confidently use fields, filters and patterns that are
                out of date.
              </p>
              <p>
                Shopify's answer is a proper context layer. The{' '}
                <strong>Shopify Dev MCP server</strong> (released March 2025) and
                the <strong>Shopify AI Toolkit</strong> (April 2026) connect
                coding agents to shopify.dev documentation and API schemas, and
                they <strong>validate GraphQL, Liquid and UI-extension code against
                Shopify's schemas</strong> before you ever run it. The toolkit
                supports Claude Code, Cursor, Codex, Antigravity CLI and VS Code.
              </p>
              <p>
                Hydrogen goes a step further.{' '}
                <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-[14px]">npx @shopify/hydrogen setup</code> writes agent
                skills that match your installed Hydrogen version into{' '}
                <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-[14px]">.claude/skills</code> and{' '}
                <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-[14px]">.agents/skills</code>, so the agent follows the
                version you actually run.
              </p>
              <div className="rounded-[10px] border border-line bg-paper p-4">
                <p className="font-display text-[14px] font-medium text-green-ink">
                  Rule #1 of my workflow
                </p>
                <p className="mt-1 text-[15px] text-ink-dim">
                  No agent touches a Shopify codebase until it has this context
                  layer.
                </p>
              </div>
            </div>
          </section>

          {/* Tool comparison */}
          <section className="mb-12 max-w-[900px]">
            <h2 className="mb-6 font-display text-[28px] font-medium -tracking-[0.02em] text-green-ink">
              My stack: which AI tool for which Shopify job
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-openSans text-[14px]">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                      Job
                    </th>
                    <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                      Tool
                    </th>
                    <th className="pb-3 font-display font-medium text-green-ink">
                      Why
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TOOL_COMPARISON.map((row, i) => (
                    <tr key={i} className="border-b border-line">
                      <td className="py-3 pr-4 text-ink-dim">{row.job}</td>
                      <td className="py-3 pr-4 font-medium text-green">
                        {row.tool}
                      </td>
                      <td className="py-3 text-ink-dim">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-openSans text-[15px] text-ink-dim">
              I'm not loyal to any one vendor. Models leapfrog each other every
              few months. The workflow around them (context, plan, validate,
              review) is what stays the same.
            </p>
          </section>

          {/* Workflow steps */}
          <section className="mb-12 max-w-[800px]">
            <h2 className="mb-6 font-display text-[28px] font-medium -tracking-[0.02em] text-green-ink">
              The workflow, step by step
            </h2>
            <div className="space-y-6">
              {WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-5 rounded-[14px] border border-line bg-paper p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green font-display text-[18px] font-medium text-cream">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="mb-2 font-display text-[18px] font-medium text-green-ink">
                      {step.title}
                    </h3>
                    <p className="font-openSans text-[15px] leading-[1.7] text-ink-dim">
                      {step.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Where I don't trust AI */}
          <section className="mb-12 max-w-[800px]">
            <h2 className="mb-6 font-display text-[28px] font-medium -tracking-[0.02em] text-green-ink">
              Where I don't trust AI on Shopify
            </h2>
            <div className="space-y-3">
              {TRUST_ISSUES.map((issue, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                  <span>
                    <strong className="text-green-ink">{issue.title}.</strong>{' '}
                    {issue.description}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-openSans text-[15px] leading-[1.7] text-ink-dim">
              Shopify draws a similar line in its own product. Sidekick can now
              generate simple admin apps for merchants, but those apps{' '}
              <strong>can't touch Functions, themes or checkout</strong>. The
              storefront and checkout work still needs a developer.
            </p>
          </section>

          {/* Hiring advice */}
          <section className="mb-12 max-w-[800px]">
            <h2 className="mb-4 font-display text-[28px] font-medium -tracking-[0.02em] text-green-ink">
              What this means if you're hiring a Shopify developer
            </h2>
            <div className="space-y-4 font-openSans text-[16px] leading-[1.8] text-ink-dim">
              <p>
                You shouldn't pay agency rates for a developer to hand-type
                boilerplate. You also shouldn't hire someone who pastes chatbot
                output into your live theme. The right question to ask a Shopify
                developer in 2026 is:{' '}
                <em>
                  "How do you use AI, and how do you check its work?"
                </em>{' '}
                If the answer includes a sandbox, schema validation, a test plan
                and human review, you're in good hands.
              </p>
              <p>
                That's how I work. My rates start at $100/hr with a $1,000 minimum
                project, and the time AI saves goes into scope and QA, not into
                cutting corners.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="mb-12 flex flex-wrap gap-4">
            <Link
              href="/services/ai-shopify-development"
              className="inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
            >
              See AI-assisted Shopify development →
            </Link>
            <a
              href={getBookingHref()}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-[13px] text-green-ink transition-colors hover:border-green hover:bg-blue"
            >
              Book a 20-min scoping call →
            </a>
          </div>

          {/* FAQ */}
          <section className="mb-12 max-w-[800px]">
            <h2 className="mb-6 font-display text-[28px] font-medium -tracking-[0.02em] text-green-ink">
              FAQ
            </h2>
            <div className="rounded-[14px] border border-line bg-paper px-8 py-2">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </section>

          {/* Related links */}
          <section className="max-w-[800px]">
            <h3 className="mb-4 font-display text-[18px] font-medium text-green-ink">
              Related
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: 'AI-assisted Shopify development',
                  href: '/services/ai-shopify-development',
                },
                { label: 'All Shopify services', href: '/services' },
                { label: 'About Logan', href: '/about' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-line bg-paper px-4 py-2 font-mono text-[12px] text-green-ink transition-colors hover:border-green hover:bg-blue"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </section>
        </article>
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
