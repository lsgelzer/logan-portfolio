import Image from 'next/image'

export default function ClientsSection({ clients = [] }) {
  return (
    <section
      id="clients"
      className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]"
      aria-label="Clients"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
        <span
          className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
          aria-hidden
        />
        <span>
          03 / <b className="font-semibold text-green-ink">Clients</b>
        </span>
        <span>— a partial list</span>
      </div>
      <h2 className="sec-title mb-3.5 font-display font-medium leading-[0.98] -tracking-[0.035em] text-green-ink text-[clamp(42px,6vw,92px)] text-balance">
        DTC brands from startups to <em>household names</em>.
      </h2>
      <p className="mt-3.5 max-w-[620px] font-openSans leading-[1.7] text-ink-dim">
        12+ years partnering with Shopify and Shopify Plus merchants —
        including Chubbies, Nolah, Alo Yoga, Overtime, Wild Wonder, BaronFig,
        and Kudos — on theme builds, headless migrations, checkout
        customization, and CRO programs.
      </p>
      <ul
        role="list"
        className="mt-10 grid grid-cols-2 overflow-hidden rounded-[14px] border border-line bg-paper md:grid-cols-5"
      >
        {clients.map((c, i) => (
          <li
            key={c.name}
            className="group relative flex min-h-[170px] flex-col justify-between gap-3.5 overflow-hidden border-b border-r border-line p-5 pt-6 transition-colors hover:bg-blue [&:nth-child(5n)]:md:border-r-0 last:border-b-0"
          >
            <div className="font-mono text-[10px] tracking-[0.1em] text-ink-mute group-hover:text-green-ink">
              {String(i + 1).padStart(2, '0')} / CLIENT
            </div>
            <div className="flex min-h-[60px] flex-1 items-center justify-center px-2.5 py-1">
              <Image
                src={c.logo}
                alt={`${c.name} logo`}
                width={140}
                height={48}
                sizes="(min-width: 768px) 140px, 40vw"
                className={`h-auto max-h-14 w-auto max-w-full object-contain opacity-75 transition-[filter,opacity] duration-300 group-hover:opacity-100 ${
                  c.invert
                    ? '[filter:grayscale(1)_brightness(0.3)_contrast(1.2)] group-hover:[filter:none]'
                    : '[filter:grayscale(1)_contrast(0.85)] group-hover:[filter:none]'
                }`}
                loading="lazy"
                unoptimized={c.logo.endsWith('.svg')}
              />
            </div>
            <div className="font-display text-[18px] font-medium leading-none -tracking-[0.02em] text-green-ink">
              {c.name}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
