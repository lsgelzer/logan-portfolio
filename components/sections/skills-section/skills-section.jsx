'use client'

import { useEffect, useRef } from 'react'

import { ICONS } from '@/components/shared/icons'

function SkillIcon({ name, className = '' }) {
  const C = ICONS[name]
  if (!C) return null
  return <C className={className} />
}

export default function SkillsSection({ skills = [], asideChips = [] }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const nodes = root.querySelectorAll('.skill-row')
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            obs.unobserve(e.target)
          }
        }
      },
      { threshold: 0.3 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [skills])

  return (
    <section
      id="skills"
      ref={rootRef}
      className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]"
      aria-label="Stack and skills"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
        <span
          className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
          aria-hidden
        />
        <span>
          05 / <b className="font-semibold text-green-ink">Stack &amp; Skills</b>
        </span>
        <span>— tools of the trade</span>
      </div>
      <h2 className="sec-title mb-6 font-display font-medium leading-[0.98] -tracking-[0.035em] text-green-ink text-[clamp(42px,6vw,92px)] text-balance">
        A <em>full-stack</em> ecommerce kit.
      </h2>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-2">
        <ul
          className="flex flex-col gap-0.5 rounded-[14px] border border-line bg-paper px-6 py-2"
          role="list"
        >
          {skills.map((s, i) => (
            <li
              key={s.name}
              className="skill-row grid grid-cols-[28px_24px_1fr_auto_140px] items-center gap-4 border-b border-line py-3.5 font-mono text-[12px] text-ink-dim transition-transform duration-300 last:border-b-0 hover:translate-x-1.5 [&:hover_.s-name]:text-green [&:hover_.s-ic]:bg-green [&:hover_.s-ic]:text-cream"
              style={{ '--pct': `${s.pct}%` }}
              role="listitem"
              aria-label={`${s.name}, ${s.years} years, ${s.pct}% proficiency`}
            >
              <span className="text-ink-mute">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="s-ic grid size-5.5 h-[22px] w-[22px] place-items-center rounded-[6px] bg-blue text-green-ink transition-colors [&_svg]:size-[14px]">
                <SkillIcon name={s.icon} />
              </span>
              <span className="s-name font-display text-[22px] font-medium leading-none -tracking-[0.02em] text-green-ink transition-colors">
                {s.name}
              </span>
              <span className="font-mono text-[11px] text-ink-mute">
                {s.years}y
              </span>
              <span
                className="bar relative h-2.5 w-full overflow-hidden rounded-[5px] bg-bg-3"
                role="progressbar"
                aria-valuenow={s.pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <i className="absolute left-0 top-0 bottom-0 w-0 rounded-[5px] bg-gradient-to-r from-green to-blue-deep transition-[width] duration-[1.2s] ease-[cubic-bezier(0.2,0.7,0,1)]" />
              </span>
            </li>
          ))}
        </ul>
        <aside className="relative sticky top-[100px] overflow-hidden rounded-[18px] bg-green-ink p-8 text-cream shadow-[0_30px_60px_-25px_oklch(0.25_0.06_165/0.4)]">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 size-40 rounded-full bg-blue opacity-25 blur-[20px]"
          />
          <div className="relative z-[1]">
            <h3 className="mb-4 font-display text-[30px] font-medium -tracking-[0.03em] text-cream">
              Full-stack, <em className="italic font-medium text-blue">commerce-first</em>.
            </h3>
            <p className="mb-5 font-openSans text-[14px] leading-[1.7] text-[oklch(0.90_0.03_160)]">
              I specialize in the overlap between storefront design, custom
              Shopify development, and the checkout flows that actually move the
              needle. I write the code, I run the A/B test, and I help translate
              the result into a design system you can ship against.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {asideChips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.35_0.07_165)] bg-green-deep px-2 py-1 pl-1.5 font-mono text-[10px] tracking-[0.02em] text-blue"
                >
                  <span className="grid size-4 shrink-0 place-items-center rounded-[4px] bg-green text-cream [&_svg]:size-[11px]">
                    <SkillIcon name={c.icon} />
                  </span>
                  {c.label}
                </span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-4 gap-3">
              {[
                { icon: 'shopify', cls: 'bg-green text-cream' },
                { icon: 'react', cls: 'bg-blue text-green-ink' },
                { icon: 'figma', cls: 'bg-green-ink text-blue' },
                { icon: 'bolt', cls: 'bg-peach text-green-ink' },
              ].map((s) => (
                <div
                  key={s.icon}
                  className={`grid aspect-square place-items-center rounded-[14px] ${s.cls} [&_svg]:size-[44%]`}
                  aria-hidden
                >
                  <SkillIcon name={s.icon} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
