import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import { getBookingHref } from '@/lib/site-config'

export const metadata = {
  title: 'AI Shopify Developer: Claude Code & Cursor | Logan Gelzer',
  description:
    'Senior Shopify Expert using Claude Code, Cursor, Gemini & ChatGPT to ship themes, Hydrogen, Functions and apps faster, with senior review on every change.',
  alternates: {
    canonical: 'https://logangelzer.com/services/ai-shopify-development',
  },
  openGraph: {
    title: 'AI-Assisted Shopify Development, Reviewed by a Senior Expert',
    description:
      'Senior Shopify Expert using Claude Code, Cursor, Gemini & ChatGPT to ship themes, Hydrogen, Functions and apps faster, with senior review on every change.',
    url: 'https://logangelzer.com/services/ai-shopify-development',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    question: 'Do you use AI to write Shopify code?',
    answer:
      'Yes. I use Claude Code, Cursor, Gemini and ChatGPT, connected to Shopify\'s AI Toolkit and Dev MCP, to draft, validate and test code faster. I review, refine and test every change myself before it reaches your store, so you get senior-quality work delivered sooner.',
  },
  {
    question: 'Will AI-written code break my Shopify store?',
    answer:
      'Not if it\'s handled properly. All work happens on an unpublished theme, dev store or Git branch. Code is validated against Shopify\'s schemas, linted with Theme Check, tested in the browser and reviewed by me. Nothing goes live until you approve the preview.',
  },
  {
    question: 'Is AI-assisted Shopify development cheaper?',
    answer:
      'My rates stay the same, from $100/hr with a $1,000 minimum project. AI cuts the time spent on repetitive work, so most of the benefit shows up as faster delivery, more QA coverage, or more scope for the same budget, not a lower hourly rate.',
  },
  {
    question: 'Which AI tools do you use for Shopify development?',
    answer:
      'Claude Code for multi-file theme, app and Functions work, Cursor for precise Liquid and CSS edits, Gemini in Google Antigravity for browser-based QA, and ChatGPT and Codex for research, content drafts and second-opinion code review. Shopify\'s AI Toolkit and Dev MCP connect them to current docs.',
  },
  {
    question: 'Can AI build Shopify Functions and checkout customizations?',
    answer:
      'AI can draft Function input queries and logic in JavaScript or Rust, and Shopify\'s tools can validate the code. Checkout logic still needs careful senior testing with real carts, discounts and edge cases. I rebuild legacy Scripts as Functions and test every scenario before launch.',
  },
  {
    question: 'Is my store data safe when you use AI?',
    answer:
      'Yes. I don\'t put customer personal data, API secrets or private business data into AI prompts. I work from code and dev stores, and store-changing commands only run with my explicit approval. If your company has an AI policy, I\'ll follow it, including working with no AI at all.',
  },
  {
    question: 'Can you set up Claude Code or Cursor for my in-house Shopify team?',
    answer:
      'Yes. I can install Shopify\'s AI Toolkit or Dev MCP, write project rules for your theme or app, add Theme Check and schema validation to your workflow, and train your developers on a review process that keeps AI-generated code safe to ship.',
  },
  {
    question: 'Are you an AI agency?',
    answer:
      'No. I\'m an independent Senior Shopify Expert. AI tools speed up my workflow, but you work directly with me on every project, from scoping to code review to launch. There are no account managers and no junior hand-offs.',
  },
]

const WHAT_I_BUILD = [
  {
    title: 'Liquid theme development and OS 2.0 refactors',
    description:
      'Custom sections and blocks, metafield/metaobject content, legacy 1.0 → 2.0 migrations, app-bloat cleanup.',
  },
  {
    title: 'Hydrogen and headless storefronts',
    description:
      'Hydrogen, Next.js and Builder.io builds, with Hydrogen agent skills kept in sync with the installed version.',
  },
  {
    title: 'Shopify Functions and Checkout Extensibility',
    description:
      'Discount, delivery, payment and cart-validation Functions; Checkout UI extensions; rebuilding legacy Shopify Scripts logic.',
  },
  {
    title: 'Custom and public Shopify apps',
    description:
      'Admin GraphQL integrations, app extensions, Polaris UI and App Store readiness reviews.',
  },
  {
    title: 'Migrations',
    description:
      'Theme migrations, Scripts → Functions, Liquid → Hydrogen, and data and metafield migrations, mapped and diffed with AI and verified by hand.',
  },
  {
    title: 'QA and performance',
    description:
      'Test plans, regression checklists, Theme Check, Lighthouse and Core Web Vitals passes.',
  },
  {
    title: 'Content and technical SEO',
    description:
      'Structured product content drafts, metafield-driven FAQs, JSON-LD, alt text and redirect maps, all edited by a human before they go live.',
  },
]

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Scope (human)',
    description:
      'We agree on the outcome, constraints and acceptance criteria on a short call. I get collaborator access and set up a dev store or duplicate theme.',
  },
  {
    step: 2,
    title: 'Map the codebase (AI-assisted)',
    description:
      'Agents read the theme or app and summarize how it\'s built, where the risks are and which apps are loaded. I check the summary before I trust it.',
  },
  {
    step: 3,
    title: 'Plan (human-approved)',
    description:
      'The agent proposes a change plan, and I edit it before any code is written.',
  },
  {
    step: 4,
    title: 'Build (AI-assisted, senior-led)',
    description:
      'Agents draft the code using Shopify\'s docs and schemas. I refine the architecture, naming, performance and UX.',
  },
  {
    step: 5,
    title: 'Validate and QA (both)',
    description:
      'Schema validation, Theme Check, local Function runs, browser click-throughs, device testing and Lighthouse. A second model reviews the diff, and I review it last.',
  },
  {
    step: 6,
    title: 'Ship (human)',
    description:
      'You approve the preview, I publish, and I watch the launch. Everything is in Git, so any change can be rolled back.',
  },
]

const AI_STACK = [
  {
    name: 'Claude Code',
    role: 'Multi-file theme, app and Functions work',
    description:
      'Claude Code reads the whole repository, so it\'s my main agent for changes that cut across a theme or app: new OS 2.0 sections and blocks, metafield- and metaobject-driven templates, Shopify Functions, and Admin GraphQL work. I keep project rules in CLAUDE.md, plan changes before any edits happen, and use hooks to run Shopify Theme Check after edits.',
  },
  {
    name: 'Cursor',
    role: 'Liquid, CSS and fast, precise edits',
    description:
      'Cursor is my editor for line-level Liquid, CSS and JavaScript changes, with project rules scoped to folders like sections/ and snippets/. It\'s fast for refinement, debugging and reviewing an agent\'s diff before I commit it.',
  },
  {
    name: 'Gemini (Google Antigravity)',
    role: 'Browser-level QA and a second opinion',
    description:
      'Antigravity\'s agents can work in the browser as well as the editor. I use them for click-through QA on preview themes (variant pickers, cart drawers, bundle flows) and as an independent second opinion on tricky logic.',
  },
  {
    name: 'ChatGPT and Codex',
    role: 'Research, content and PR review',
    description:
      'I use ChatGPT for research, migration mapping, structured product and SEO content drafts, and an independent review pass on pull requests. A second model catches different mistakes than the first one.',
  },
  {
    name: 'Shopify AI Toolkit, Dev MCP and Shopify CLI',
    role: 'Foundation layer',
    description:
      'Shopify\'s AI Toolkit and Dev MCP server give each agent current shopify.dev documentation and API schemas, and they validate GraphQL, Liquid and UI-extension code against Shopify\'s schemas. Shopify CLI handles local preview, linting, unpublished theme pushes and local Function runs. Hydrogen projects get Shopify\'s version-matched agent skills.',
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

export default function AIShopifyDevelopmentPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id':
          'https://logangelzer.com/services/ai-shopify-development#service',
        name: 'AI-assisted Shopify development',
        alternateName: 'AI Shopify developer',
        serviceType: 'Shopify development',
        url: 'https://logangelzer.com/services/ai-shopify-development',
        description:
          "Shopify theme, Hydrogen, Shopify Functions and app development using Claude Code, Cursor, Gemini and ChatGPT with Shopify's AI Toolkit and Dev MCP, with senior human review, testing and approval on every change.",
        provider: { '@id': 'https://logangelzer.com/#person' },
        brand: { '@id': 'https://logangelzer.com/#org' },
        areaServed: 'Worldwide',
        audience: {
          '@type': 'BusinessAudience',
          audienceType:
            'DTC brands, in-house ecommerce teams and agencies on Shopify and Shopify Plus',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI-assisted Shopify development',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI-assisted Liquid theme development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI-assisted Hydrogen and headless development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Shopify Functions and Checkout Extensibility with AI-assisted QA',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI workflow setup for Shopify teams',
              },
            },
          ],
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: 100,
            priceCurrency: 'USD',
            unitText: 'HOUR',
            description: 'Rates from $100/hr; $1,000 minimum project',
          },
        },
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
            name: 'Services',
            item: 'https://logangelzer.com/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI-Assisted Shopify Development',
            item: 'https://logangelzer.com/services/ai-shopify-development',
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
        <nav
          className="px-10 pt-8 max-md:px-5"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 font-mono text-[11px] text-ink-mute">
            <li>
              <Link href="/" className="hover:text-green">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/services" className="hover:text-green">
                Services
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-green-ink">AI-Assisted Shopify Development</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">AI-Assisted Development</b>
            </span>
          </div>

          <h1 className="mb-6 max-w-[900px] font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] -tracking-[0.035em] text-green-ink">
            AI Shopify Developer: Faster Shopify Builds, Senior Review on Every
            Change
          </h1>

          <p className="mb-8 max-w-[720px] font-openSans text-[18px] leading-[1.7] text-ink-dim">
            I'm Logan Gelzer, a Senior Shopify Expert. Since 2014 I've built for
            200+ brands, and today I use AI coding agents (Claude Code, Cursor,
            Gemini and ChatGPT) connected to Shopify's own docs and validation
            tools. The result is faster delivery and more thorough QA. I still
            review, test and ship every change myself.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-4">
            <a
              href={getBookingHref()}
              className="inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
            >
              Book a 20-min scoping call →
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-[13px] text-green-ink transition-colors hover:border-green hover:bg-blue"
            >
              See Shopify services
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-[12px] text-ink-dim">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-green" />
              12+ years on Shopify
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-green" />
              200+ brands
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-green" />
              Rates from $100/hr
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-green" />
              $1,000 minimum project
            </span>
          </div>
        </section>

        {/* What AI-assisted means */}
        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            What AI-assisted Shopify development means (and what it doesn't)
          </h2>
          <div className="max-w-[800px] space-y-4 font-openSans text-[16px] leading-[1.7] text-ink-dim">
            <p>
              AI doesn't replace the developer. It removes the slow, repetitive
              parts of the job: reading an unfamiliar theme, writing boilerplate
              sections, looking up API fields, drafting test cases and checking
              work against Shopify's schemas. That leaves more of your budget for
              the parts that need 12 years of judgment, like architecture,
              checkout logic, performance, UX and the decision to publish.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[14px] border border-line bg-bg p-6">
              <h3 className="mb-4 font-display text-[20px] font-medium text-green-ink">
                What you get
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                  <span>
                    <strong className="text-green-ink">The same senior expert.</strong>{' '}
                    You work with me directly. There are no account managers and
                    no junior hand-offs, and you're not paying for a black-box
                    "AI agency."
                  </span>
                </li>
                <li className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                  <span>
                    <strong className="text-green-ink">Faster first drafts.</strong>{' '}
                    Agents scaffold sections, Function logic and GraphQL queries
                    in minutes. Then I refine them.
                  </span>
                </li>
                <li className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                  <span>
                    <strong className="text-green-ink">More QA, not less.</strong>{' '}
                    The time AI saves goes back into testing: theme linting,
                    schema validation, cross-device checks and Lighthouse runs.
                  </span>
                </li>
                <li className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                  <span>
                    <strong className="text-green-ink">
                      No surprises on live stores.
                    </strong>{' '}
                    Work happens on a duplicate or unpublished theme or a dev
                    store. Nothing gets published without my review and your
                    approval.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-[14px] border border-line bg-bg p-6">
              <h3 className="mb-4 font-display text-[20px] font-medium text-green-ink">
                What it isn't
              </h3>
              <p className="font-openSans text-[15px] leading-[1.7] text-ink-dim">
                It's not an AI theme generator, a "store in a day" promise, or
                copy-pasted ChatGPT code. Every line that reaches your store is
                reviewed and tested by me.
              </p>
            </div>
          </div>
        </section>

        {/* My AI Stack */}
        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            My AI Shopify development stack
          </h2>
          <p className="mb-10 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            I pick the tool for the task, not the other way round. Every agent is
            connected to Shopify's official context layer, so it works from
            current docs and schemas instead of memory.
          </p>

          <div className="space-y-4">
            {AI_STACK.map((tool) => (
              <div
                key={tool.name}
                className="rounded-[14px] border border-line bg-paper p-6 transition-all hover:border-green"
              >
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-[20px] font-medium text-green-ink">
                    {tool.name}
                  </h3>
                  <span className="font-mono text-[12px] text-green">
                    {tool.role}
                  </span>
                </div>
                <p className="font-openSans text-[15px] leading-[1.7] text-ink-dim">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 font-openSans text-[15px] leading-[1.7] text-ink-dim">
            <Link
              href="/guides/claude-code-shopify"
              className="text-green hover:underline"
            >
              Read my full Claude Code for Shopify workflow →
            </Link>
          </p>
        </section>

        {/* What I Build */}
        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-10 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            What I build with AI-assisted workflows
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WHAT_I_BUILD.map((item) => (
              <div
                key={item.title}
                className="rounded-[14px] border border-line bg-bg p-5"
              >
                <h3 className="mb-2 font-display text-[17px] font-medium text-green-ink">
                  {item.title}
                </h3>
                <p className="font-openSans text-[14px] leading-[1.6] text-ink-dim">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-10 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            My process: AI speed, senior judgment
          </h2>

          <div className="space-y-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex gap-5 rounded-[14px] border border-line bg-paper p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green font-display text-[18px] font-medium text-cream">
                  {step.step}
                </span>
                <div>
                  <h3 className="mb-1 font-display text-[18px] font-medium text-green-ink">
                    {step.title}
                  </h3>
                  <p className="font-openSans text-[15px] leading-[1.6] text-ink-dim">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guardrails */}
        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Guardrails for your store and your data
          </h2>
          <ul className="max-w-[800px] space-y-3">
            {[
              'Work happens on unpublished themes, dev stores and Git branches, never by editing a live theme directly.',
              'Store-changing commands run only after my explicit approval. Publishing needs yours too.',
              'No customer PII, API secrets or private data go into AI prompts. Client code stays in your repository or my private one.',
              "If your company has an AI policy, or prefers no AI at all, I follow it. The price and the senior attention stay the same.",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Who this is for */}
        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Who this is for
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'DTC brands on Shopify or Shopify Plus',
                description:
                  'That want senior-quality work without agency overhead or agency timelines.',
              },
              {
                title: 'In-house teams',
                description:
                  'That want their developers using Claude Code or Cursor safely on Shopify, with rules, validation and review built in.',
              },
              {
                title: 'Agencies',
                description:
                  'That need white-label Shopify Plus, Hydrogen or Functions capacity from someone who already works this way.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[14px] border border-line bg-paper p-5"
              >
                <h3 className="mb-2 font-display text-[18px] font-medium text-green-ink">
                  {item.title}
                </h3>
                <p className="font-openSans text-[14px] leading-[1.6] text-ink-dim">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Pricing for AI-assisted Shopify development
          </h2>
          <div className="max-w-[800px] space-y-4 font-openSans text-[16px] leading-[1.7] text-ink-dim">
            <p>
              Same rates as everything I do:{' '}
              <strong className="text-green-ink">
                from $100/hr with a $1,000 minimum project
              </strong>
              . AI doesn't add a surcharge. When it saves time, that time goes
              into scope or QA, or comes off your bill. Fixed-scope projects are
              quoted after a short technical discovery, and retainers are
              available.
            </p>
            <div className="mt-6 rounded-[14px] border border-green bg-blue p-5">
              <h3 className="mb-2 font-display text-[18px] font-medium text-green-ink">
                AI Workflow Setup for Shopify teams, from $1,000
              </h3>
              <p className="font-openSans text-[14px] leading-[1.6] text-ink-dim">
                I set up the Shopify AI Toolkit/Dev MCP, write CLAUDE.md/AGENTS.md
                and Cursor rules for your theme or app, add Theme Check and
                validation to your CI, and run a 60-minute walkthrough with your
                developers.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-10 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            AI Shopify development FAQ
          </h2>
          <div className="mx-auto max-w-[800px] rounded-[14px] border border-line bg-paper px-8 py-2">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Want senior Shopify work, delivered faster?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  Tell me what you need built, fixed or migrated. I'll reply with
                  a scoped plan and an honest view of where AI helps and where it
                  doesn't.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href={getBookingHref()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Book a 20-min scoping call →
                </a>
                <span className="font-mono text-[11px] text-[oklch(0.75_0.03_160)]">
                  hello@logangelzer.com
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="relative px-10 pb-[80px] max-md:px-5 max-md:pb-[60px]">
          <h3 className="mb-4 font-display text-[18px] font-medium text-green-ink">
            Related services
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Shopify Plus development', href: '/services' },
              { label: 'Claude Code for Shopify', href: '/guides/claude-code-shopify' },
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
