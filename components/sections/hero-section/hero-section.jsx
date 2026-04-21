'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ICONS } from '@/components/shared/icons'

const ROLES = [
  'Shopify expert.',
  'Software developer.',
  'UI/UX designer.',
  'Ecommerce strategist.',
]

const Shopify = ICONS.shopify
const Figma = ICONS.figma
const React_ = ICONS.react
const NextJsIcon = ICONS.nextjs

function useTypewriter(words, { typeMs = 55, holdMs = 1800, eraseMs = 30 } = {}) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[idx]
    let id
    if (phase === 'typing') {
      if (text.length < word.length) {
        id = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs)
      } else {
        id = setTimeout(() => setPhase('holding'), holdMs)
      }
    } else if (phase === 'holding') {
      id = setTimeout(() => setPhase('erasing'), 0)
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        id = setTimeout(() => setText(word.slice(0, text.length - 1)), eraseMs)
      } else {
        setIdx((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(id)
  }, [text, phase, idx, words, typeMs, holdMs, eraseMs])

  return text
}

function PhoneMockup() {
  return (
    <div
      className="relative z-[2] flex h-[540px] w-[270px] shrink-0 -rotate-3 flex-col rounded-[44px] bg-[#0e1612] p-2.5 shadow-[0_40px_80px_-30px_oklch(0.25_0.06_165/0.55),0_10px_30px_-10px_oklch(0.25_0.06_165/0.35),inset_0_0_0_2px_oklch(0.35_0.04_160),inset_0_0_0_4px_oklch(0.2_0.03_160)] transition-transform duration-500 [cubic-bezier(.2,.8,.2,1)] motion-safe:hover:rotate-0 motion-safe:hover:-translate-y-1"
      role="img"
      aria-label="Mobile mockup of Logan's store"
    >
      <span
        className="absolute left-1/2 top-[18px] z-[3] h-[22px] w-[84px] -translate-x-1/2 rounded-[12px] bg-[#0e1612] after:absolute after:right-[14px] after:top-1/2 after:size-2 after:-translate-y-1/2 after:rounded-full after:bg-[oklch(0.35_0.05_230)] after:[box-shadow:inset_0_0_0_1.5px_oklch(0.2_0.03_160)]"
        aria-hidden
      />
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-cream">
        <div className="flex items-center justify-between px-6 pb-1.5 pt-3.5 font-mono text-[11px] font-semibold text-green-ink">
          <span>9:41</span>
          <span className="tracking-[-1px] text-[7px] opacity-70">●●●●●</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pb-4 pt-4.5">
          <div className="flex items-center justify-between gap-1.5">
            <Image
              src="/portfolio/logan-author-headshot.png"
              alt=""
              aria-hidden
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <div className="flex-1 font-mono text-[9px] text-ink-mute">
              @logangelzer
            </div>
            <div className="relative size-6 shrink-0 text-green-ink">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-full"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v6l4 2" />
              </svg>
            </div>
          </div>
          <div className="relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-[14px] bg-gradient-to-br from-green-ink to-[oklch(0.28_0.08_180)] p-3.5 text-cream">
            <span
              className="absolute -right-5 -top-5 size-[100px] rounded-full bg-blue opacity-40 blur-md"
              aria-hidden
            />
            <div className="relative z-[1] font-mono text-[8px] tracking-[0.2em] text-blue">
              AVAILABLE · Q2 &apos;26
            </div>
            <Image
              src="/portfolio/logan-portrait.png"
              alt=""
              aria-hidden
              width={236}
              height={320}
              priority
              fetchPriority="high"
              sizes="120px"
              className="pointer-events-none absolute -bottom-2 -right-2 z-[1] h-auto w-[118px] drop-shadow-[0_6px_12px_oklch(0.2_0.05_165/0.4)]"
            />
            <div className="relative z-[1] font-display text-[22px] font-medium -tracking-[0.03em] leading-none">
              Freelance
              <br />
              <em className="italic text-blue not-italic [font-style:italic]">
                Shopify Dev
              </em>
            </div>
            <div className="relative z-[1] self-start rounded-[20px] border border-[oklch(0.86_0.07_230/0.3)] bg-[oklch(0.25_0.04_165/0.6)] px-2.5 py-1.5 font-mono text-[10px] text-blue">
              Book a call →
            </div>
          </div>
          <div className="flex items-baseline justify-between font-display text-[13px] font-medium text-green-ink">
            <span>Recent wins</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-green">
              All
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1 rounded-[10px] bg-bg-2 p-2">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[6px] bg-gradient-to-br from-[oklch(0.88_0.05_90)] to-[oklch(0.75_0.08_75)]">
                <div className="grid size-[56%] place-items-center rounded-full bg-cream p-2 shadow-[0_4px_10px_-2px_oklch(0.2_0.04_165/0.3)] [&_svg]:size-full">
                  <Shopify />
                </div>
              </div>
              <div className="font-mono text-[8px] text-green-ink">$250k / mo</div>
              <div className="font-display text-[11px] font-semibold text-green-ink">
                1,250× growth
              </div>
            </div>
            <div className="flex flex-col gap-1 rounded-[10px] bg-bg-2 p-2">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[6px] bg-gradient-to-br from-blue to-blue-deep">
                <div className="grid size-[56%] place-items-center rounded-full bg-cream p-2 shadow-[0_4px_10px_-2px_oklch(0.2_0.04_165/0.3)] [&_svg]:size-full">
                  <NextJsIcon />
                </div>
              </div>
              <div className="font-mono text-[8px] text-green-ink">+142% CVR</div>
              <div className="font-display text-[11px] font-semibold text-green-ink">
                A/B winner
              </div>
            </div>
          </div>
          <div className="mt-auto grid grid-cols-3 gap-1 rounded-[10px] bg-green-ink p-2 text-cream">
            {[
              ['+142%', 'CVR'],
              ['2.1s', 'LCP'],
              ['98', 'PSI'],
            ].map(([v, k], i) => (
              <div
                key={k}
                className={`flex flex-col items-center gap-[1px] ${i < 2 ? 'border-r border-[oklch(0.45_0.05_165)]' : ''}`}
              >
                <b className="font-display text-[13px] font-medium -tracking-[0.02em] text-blue">
                  {v}
                </b>
                <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-cream opacity-75">
                  {k}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatCard({ icon, title, subtitle, className, alt, delay }) {
  return (
    <div
      className={`absolute z-[3] flex min-w-[130px] items-center gap-2.5 rounded-[14px] border border-line bg-paper px-3.5 py-2.5 font-mono text-[10px] shadow-[0_14px_30px_-12px_oklch(0.25_0.06_165/0.35)] motion-safe:animate-float-y ${className}`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <div
        className={`grid size-9 shrink-0 place-items-center rounded-[8px] border p-1.5 ${alt ? 'border-blue bg-paper' : 'border-line bg-cream'} [&_svg]:size-full`}
      >
        {icon}
      </div>
      <div>
        <b className="block font-display text-[14px] font-medium -tracking-[0.02em] text-green-ink">
          {title}
        </b>
        <span className="text-[9px] uppercase tracking-[0.08em] text-ink-mute">
          {subtitle}
        </span>
      </div>
    </div>
  )
}

export default function HeroSection({ profile, heroStats }) {
  const typed = useTypewriter(ROLES)
  const roles = profile?.roles || []
  const stats = heroStats || []

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between px-10 pb-10 pt-[100px] max-md:px-5"
      aria-label="Introduction"
    >
      <div className="mt-[60px] grid flex-1 items-stretch gap-8 md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between gap-6">
          <dl className="flex flex-col gap-2 font-mono text-[12px] text-ink-dim">
            {[
              ['/ based', 'Miami, Florida · USA'],
              ['/ years', '12+ in ecommerce'],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-wrap gap-3">
                <dt className="w-[72px] shrink-0 text-ink-mute">{k}</dt>
                <dd className="font-medium text-green-ink">{v}</dd>
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <dt className="w-[72px] shrink-0 text-ink-mute">/ status</dt>
              <dd className="font-medium text-green">● available for freelance</dd>
            </div>
          </dl>

          <h1 className="flex flex-col font-display font-medium leading-[0.86] -tracking-[0.055em] text-green-ink text-[clamp(64px,11vw,180px)]">
            <span>Logan</span>
            <span className="italic text-green after:text-blue-deep after:content-['.'] after:not-italic">
              Gelzer
            </span>
          </h1>

          <div>
            <h2 className="max-w-[520px] font-display font-normal leading-[1.2] -tracking-[0.01em] text-ink text-[clamp(22px,2.4vw,32px)]">
              An{' '}
              <span className="font-medium italic text-green-ink" aria-live="polite">
                {typed || 'ecommerce expert for 12+ years.'}
                <span
                  className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-green motion-safe:animate-blink"
                  aria-hidden
                />
              </span>
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2 font-mono text-[12px]">
              {roles.map((r) => (
                <li
                  key={r}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-3.5 py-1.5 text-green-ink transition-colors hover:border-green hover:bg-blue"
                >
                  <span className="size-1.5 rounded-full bg-green" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative flex max-h-[620px] min-h-[560px] items-center justify-center overflow-hidden rounded-[20px] border border-line bg-gradient-to-br from-[oklch(0.96_0.035_155)] to-[oklch(0.92_0.05_230)] px-6 py-8 shadow-[0_30px_70px_-30px_oklch(0.25_0.05_165/0.25)]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -left-20 -top-20 size-80 rounded-full bg-green opacity-55 blur-[40px]" />
            <span className="absolute -bottom-16 -right-16 size-72 rounded-full bg-blue opacity-70 blur-[40px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_20%,oklch(0.88_0.08_160/0.2),transparent_50%),repeating-linear-gradient(0deg,transparent,transparent_23px,oklch(0.32_0.08_160/0.05)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,oklch(0.32_0.08_160/0.05)_24px)]"
            aria-hidden
          />
          <PhoneMockup />
          <FloatCard
            icon={<Shopify />}
            title="Shopify"
            subtitle="built on"
            className="left-[4%] top-[12%]"
          />
          <FloatCard
            icon={<Figma />}
            title="+142% CVR"
            subtitle="A/B winner"
            alt
            className="right-[4%] top-[44%]"
            delay="-1.5s"
          />
          <FloatCard
            icon={<React_ />}
            title="98 / 100"
            subtitle="PageSpeed"
            className="bottom-[10%] left-[6%]"
            delay="-3s"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 border-t border-line pt-7 font-mono text-[11px] text-ink-mute md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {stats.map((s) => (
          <div key={s.label}>
            <b className="mb-1.5 block font-display text-[44px] font-medium leading-none -tracking-[0.03em] text-green-ink">
              {s.value}
              <em className="not-italic text-green">{s.suffix}</em>
            </b>
            {s.label}
          </div>
        ))}
        <div className="flex flex-col items-end gap-2">
          <div>scroll to explore</div>
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="grid size-7 place-items-center rounded-full border border-green-ink text-green-ink motion-safe:animate-bob"
          >
            ↓
          </a>
        </div>
      </div>
    </section>
  )
}
