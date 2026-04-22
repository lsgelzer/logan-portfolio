import dynamic from 'next/dynamic'

const Terminal = dynamic(() => import('./terminal'), {
  loading: () => (
    <div
      aria-hidden
      className="min-h-[520px] rounded-[14px] border border-green-deep bg-green-ink"
    />
  ),
})

export default function AboutSection({
  profile,
  about,
  clients,
  projects,
  socials,
  stats,
}) {
  const paragraphs = about || []
  return (
    <section
      id="about"
      className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]"
      aria-label="About Logan"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
        <span
          className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
          aria-hidden
        />
        <span>
          02 / <b className="font-semibold text-green-ink">About</b>
        </span>
        <span>— a quick hello</span>
      </div>
      <h2 className="sec-title mb-6 font-display font-medium leading-[0.98] -tracking-[0.035em] text-green-ink text-[clamp(42px,6vw,92px)] text-balance">
        Miami-based freelance <em>Shopify developer</em> for DTC brands.
      </h2>
      <p className="mb-6 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
        Shopify Plus, Hydrogen, and headless storefronts — plus the CRO program
        that actually moves revenue. 12+ years shipping for direct-to-consumer
        brands.
      </p>

      <div className="mt-10 grid items-start gap-12 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-[18px] border border-line bg-paper p-9">
          <span
            className="absolute -right-8 -top-8 size-44 rounded-full bg-blue opacity-30 blur-[20px]"
            aria-hidden
          />
          <div
            className="relative z-[1] mb-5 grid size-20 place-items-center rounded-full bg-gradient-to-br from-green to-blue-deep font-display text-[32px] font-semibold text-cream shadow-[0_10px_30px_oklch(0.3_0.08_165/0.3)]"
            aria-hidden
          >
            LG
          </div>
          <div className="relative z-[1]">
            {paragraphs[0] && (
              <p className="mb-4 font-display text-[20px] font-normal leading-[1.45] text-green-ink text-pretty">
                {paragraphs[0]}
              </p>
            )}
            {paragraphs.slice(1).map((p, i) => (
              <p
                key={i}
                className="mb-4 font-openSans text-[15px] font-normal leading-[1.65] text-ink-dim"
              >
                {p}
              </p>
            ))}
          </div>
        </article>

        <Terminal
          profile={profile}
          clients={clients}
          projects={projects}
          socials={socials}
          stats={stats}
        />
      </div>
    </section>
  )
}
