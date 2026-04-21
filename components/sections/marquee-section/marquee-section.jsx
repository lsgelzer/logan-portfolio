export default function MarqueeSection({ clients = [] }) {
  const items = clients.length ? [...clients, ...clients] : []
  return (
    <div
      className="overflow-hidden whitespace-nowrap border-y border-line bg-green-ink py-4 text-cream"
      aria-hidden
    >
      <div className="inline-flex gap-11 font-display text-[36px] font-medium -tracking-[0.03em] motion-safe:animate-scroll-x">
        {items.map((c, i) => (
          <span key={`${c.name}-${i}`} className="inline-flex items-center gap-11">
            <span className={i % 4 === 0 ? 'italic text-blue' : 'opacity-95'}>
              {c.name}
            </span>
            <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
