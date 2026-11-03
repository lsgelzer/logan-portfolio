const TESTIMONIALS = [
  {
    quote:
      "Logan is great. Very detailed and follows through on his commitments. He hears feedback and is willing to accommodate requests - but also pushes back when the feedback pushes against best practice. Would definitely work with Logan again!",
    brand: 'Unitus',
  },
  {
    quote:
      "Excellent! We threw a messy Shopify 1.0 build at Logan with years of wonky code / legacy app garbage, and Logan worked through multiple revisions to fully refactor the site to Shopify 2.0. Thanks!",
    brand: 'Gladskin',
  },
  {
    quote:
      "Logan was given a challenging and difficult project that he handled with incredible skill, confidence, and grace -- all in ~24 hours during one of the busiest times of the year! I'm in awe. Hire him!",
    brand: 'Museum Quality Art',
  },
  {
    quote:
      "I asked Logan to develop a rather complex PDP page for our store and he nailed it. Worked seamlessly and was scalable across our products.",
    brand: 'Kayode',
  },
  {
    quote:
      "We worked with Logan on sitespeed optimization. He was quick to respond and conduct a thorough audit before we proceeded with the changes. Any issues that came up, Logan would be proactive to flag and optimize.",
    brand: 'ONDO',
  },
  {
    quote:
      "Logan is an excellent partner. We were so grateful for this knowledge, speed, attention to detail and communication!",
    brand: 'Táche Pistachio Milk',
  },
]

function TestimonialCard({ quote, brand }) {
  return (
    <blockquote className="group relative flex flex-col gap-4 overflow-hidden rounded-[14px] border border-line bg-paper p-6 transition-all duration-300 hover:border-green hover:shadow-[0_20px_40px_-20px_oklch(0.25_0.06_165/0.3)]">
      <span
        aria-hidden
        className="absolute -right-4 -top-4 font-display text-[120px] leading-none text-blue opacity-20"
      >
        "
      </span>
      <p className="relative z-[1] font-openSans text-[15px] leading-[1.7] text-ink-dim">
        "{quote}"
      </p>
      <cite className="relative z-[1] mt-auto not-italic">
        <span className="font-display text-[16px] font-medium text-green-ink">
          {brand}
        </span>
      </cite>
    </blockquote>
  )
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]"
      aria-label="What clients say"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
        <span
          className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
          aria-hidden
        />
        <span>
          06 / <b className="font-semibold text-green-ink">Testimonials</b>
        </span>
        <span>— what clients say</span>
      </div>
      <div className="mb-10 grid items-end gap-14 md:grid-cols-[1.2fr_1fr]">
        <h2 className="sec-title font-display font-medium leading-[0.98] -tracking-[0.035em] text-green-ink text-[clamp(42px,6vw,92px)] text-balance">
          What <em>clients say</em>.
        </h2>
        <p className="max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
          Feedback from DTC brands on Shopify Plus, headless migrations,
          performance work, and custom development projects.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} quote={t.quote} brand={t.brand} />
        ))}
      </div>
    </section>
  )
}
