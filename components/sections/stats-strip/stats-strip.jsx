import { STATS_STRIP } from '@/lib/portfolio-data'

export default function StatsStrip() {
  return (
    <div
      className="relative grid grid-cols-2 gap-10 overflow-hidden bg-green-ink px-10 py-20 text-cream md:grid-cols-4"
      aria-label="Career statistics"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_40%,oklch(0.86_0.07_230/0.35),transparent_45%),radial-gradient(circle_at_80%_70%,oklch(0.65_0.12_155/0.3),transparent_45%)]"
      />
      {STATS_STRIP.map((s) => (
        <div key={s.label} className="relative z-[1] border-l-2 border-blue pl-4">
          <b className="mb-2.5 block font-display font-medium leading-none -tracking-[0.04em] text-cream text-[clamp(40px,5vw,68px)]">
            {s.value}
            <em className="not-italic text-blue">{s.suffix}</em>
          </b>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[oklch(0.85_0.04_165)]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}
