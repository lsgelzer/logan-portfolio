const DISPLAY_SOCIALS = [
  { label: 'Email', find: 'Email' },
  { label: 'GitHub', find: 'Github' },
  { label: 'LinkedIn', find: 'LinkedIn' },
  { label: 'Elsewhere', find: 'Twitter / X' },
]

export default function SocialSection({ profile, socials = [] }) {
  const socialByLabel = Object.fromEntries(socials.map((s) => [s.label, s]))
  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden border-t border-line bg-paper px-10 pb-10 pt-[140px] max-md:px-5"
        aria-label="Contact"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-[10%] size-[60%] opacity-80 blur-[40px] [background:radial-gradient(circle,var(--blue),transparent_60%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-[10%] bottom-[20%] size-[50%] blur-[40px] [background:radial-gradient(circle,oklch(0.82_0.08_155/0.4),transparent_60%)]"
        />
        <div className="relative z-[1]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              06 / <b className="font-semibold text-green-ink">Connect</b>
            </span>
            <span>— let&apos;s build something</span>
          </div>
          <h2 className="mb-10 font-display font-medium leading-[0.9] -tracking-[0.04em] text-green-ink text-[clamp(60px,9vw,160px)] text-balance">
            Hire a Shopify dev.
            <br />
            <a
              href={`mailto:${profile?.email || ''}`}
              className="italic text-green hover:[text-decoration:underline_var(--blue)_3px] hover:underline-offset-8"
            >
              Let&apos;s talk →
            </a>
          </h2>
          <p className="mb-10 -mt-4 max-w-[680px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            Freelance Shopify Plus, Hydrogen, and CRO work for DTC brands.
            Remote-friendly from Miami. Currently booking new projects.
          </p>
          <dl className="grid gap-8 border-y border-line py-9 md:grid-cols-4 max-md:grid-cols-2">
            {DISPLAY_SOCIALS.map((d) => {
              const s = socialByLabel[d.find]
              if (!s) return null
              const href =
                d.label === 'Email' ? `mailto:${profile?.email || ''}` : s.url
              const value = d.label === 'Email' ? profile?.email || '' : s.handle
              return (
                <div key={d.label}>
                  <dt className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-mute">
                    {d.label}
                  </dt>
                  <dd>
                    <a
                      href={href}
                      target={d.label === 'Email' ? undefined : '_blank'}
                      rel={d.label === 'Email' ? undefined : 'noreferrer noopener'}
                      className="font-display text-[22px] font-medium -tracking-[0.015em] text-green-ink hover:text-green"
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              )
            })}
          </dl>
          <div className="flex items-center justify-between px-0 pb-2.5 pt-8 font-mono text-[11px] text-ink-mute max-sm:flex-col max-sm:gap-2">
            <div>© {new Date().getFullYear()} Logan Gelzer — made with coffee in Miami</div>
            <div>v12.0 / last deploy: today</div>
          </div>
        </div>
      </section>
    </>
  )
}
