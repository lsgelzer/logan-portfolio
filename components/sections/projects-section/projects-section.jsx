'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { ICONS } from '@/components/shared/icons'

const ProjectModal = dynamic(() => import('./project-modal'), { ssr: false })

const ART_GRADIENTS = [
  'bg-gradient-to-br from-[var(--green)] to-[var(--green-deep)]',
  'bg-gradient-to-br from-[var(--blue-deep)] to-[var(--green)]',
  'bg-gradient-to-br from-[var(--green-ink)] to-[var(--blue-deep)]',
  'bg-gradient-to-br from-[var(--green-deep)] to-[oklch(0.45_0.1_170)]',
  'bg-gradient-to-br from-[oklch(0.38_0.08_180)] to-[var(--green-ink)]',
  'bg-gradient-to-br from-[var(--green)] to-[oklch(0.55_0.11_220)]',
  'bg-gradient-to-br from-[oklch(0.40_0.09_155)] to-[var(--green-deep)]',
  'bg-gradient-to-br from-[var(--blue-deep)] to-[var(--green-ink)]',
  'bg-gradient-to-br from-[var(--green-deep)] to-[oklch(0.50_0.10_195)]',
]

function StackIcon({ name }) {
  const C = ICONS[name]
  if (!C) return null
  return (
    <span className="grid size-6.5 w-[26px] h-[26px] place-items-center rounded-[6px] bg-bg-3 text-green-ink transition-colors group-hover:bg-green group-hover:text-cream [&_svg]:size-[15px]">
      <C />
    </span>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const { name, years, stack, mockup, logo, tags, id } = project
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      className="group relative flex min-h-[340px] flex-col gap-3.5 overflow-hidden rounded-[16px] border border-line bg-paper p-[22px] text-left transition-all duration-300 [transition-timing-function:cubic-bezier(0.2,0.7,0,1)] hover:-translate-y-1.5 hover:border-green hover:shadow-[0_30px_60px_-30px_oklch(0.3_0.08_165/0.4)] focus-visible:-translate-y-1.5 focus-visible:border-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
    >
      <span className="sr-only">{`${name} case study`}</span>
      <span
        aria-hidden
        className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-bg-3 text-[14px] text-green-ink transition-all group-hover:rotate-45 group-hover:bg-green group-hover:text-cream"
      >
        ↗
      </span>
      <div
        className={`relative grid h-[220px] place-items-center overflow-hidden rounded-[10px] ${ART_GRADIENTS[index % 9]}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,oklch(0.95_0.02_230/0.15)_1px,transparent_1px)] [background-size:12px_12px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-[oklch(0.86_0.07_230/0.35)] blur-[1px] opacity-55"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-3 left-2 size-20 rounded-full bg-[oklch(0.95_0.04_95/0.3)] blur-[1px] opacity-55"
        />
        <div className="absolute left-3 top-2.5 z-[2] font-mono text-[10px] tracking-[0.15em] text-cream opacity-85">
          P / {String(index + 1).padStart(2, '0')}
        </div>
        {mockup ? (
          <Image
            src={mockup}
            alt={`${name} mockup`}
            width={240}
            height={480}
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 48vw"
            className="relative z-[2] h-auto max-h-[92%] w-auto max-w-[48%] translate-y-3 -rotate-2 rounded-xl border-2 border-[oklch(0.1_0.02_160)] shadow-[0_18px_36px_-12px_oklch(0.15_0.04_165/0.55),0_4px_10px_oklch(0.15_0.04_165/0.2)] transition-transform duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="relative z-[2] px-3 text-center font-display text-[32px] font-medium -tracking-[0.03em] text-cream">
            {name}
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.05em] text-ink-mute">
        <span>{years}</span>
        <span>CASE · {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="flex min-h-7 items-center">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={100}
            height={24}
            sizes="100px"
            className="h-auto max-h-6 w-auto max-w-[70%] object-contain opacity-85 [filter:grayscale(1)_contrast(0.9)] transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:[filter:none]"
            loading="lazy"
            unoptimized={logo.endsWith('.svg')}
          />
        ) : (
          <div className="font-display text-[24px] font-medium leading-none -tracking-[0.02em] text-green-ink">
            {name}
          </div>
        )}
      </div>
      <div className="mt-1 flex gap-1.5">
        {(stack || []).map((s) => (
          <StackIcon key={s} name={s} />
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded bg-blue px-2 py-1 font-mono text-[10px] text-green-ink"
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  )
}

export default function ProjectsSection({ projects = [] }) {
  const [activeId, setActiveId] = useState(null)
  const open = useCallback((id) => setActiveId(id), [])
  const close = useCallback(() => setActiveId(null), [])
  const active = activeId ? projects.find((p) => p.id === activeId) : null

  return (
    <section
      id="projects"
      className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]"
      aria-label="Recent projects"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
        <span
          className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
          aria-hidden
        />
        <span>
          04 / <b className="font-semibold text-green-ink">Recent Projects</b>
        </span>
        <span>— click any card</span>
      </div>
      <div className="mb-10 grid items-end gap-14 md:grid-cols-[1.2fr_1fr]">
        <h2 className="sec-title font-display font-medium leading-[0.98] -tracking-[0.035em] text-green-ink text-[clamp(42px,6vw,92px)] text-balance">
          Shopify builds that <em>converted</em>.
        </h2>
        <p className="max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
          Case studies across custom PDPs, headless migrations, variant
          switchers, subscription and bundle flows, gift-with-purchase in
          checkout, and performance wins. Click any card for the story.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={open} />
        ))}
      </div>
      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}
