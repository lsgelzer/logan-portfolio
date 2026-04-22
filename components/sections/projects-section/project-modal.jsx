'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  if (!project) return null
  const urlDisplay = project.url.replace(/^https?:\/\//, '')
  return (
    <div
      className="fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="absolute inset-0 bg-[oklch(0.22_0.04_165/0.5)] backdrop-blur-[6px]"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 grid max-h-[86vh] w-[min(960px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[18px] border border-line bg-paper shadow-[0_40px_100px_oklch(0.25_0.05_165/0.4)] md:grid-cols-[320px_1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-green to-green-deep p-7 text-cream">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_80%_20%,oklch(0.86_0.07_230/0.4),transparent_50%)]"
          />
          <div className="relative z-[1] font-mono text-[10px] tracking-[0.15em] text-blue">
            PROJECT DOSSIER
          </div>
          <div className="relative z-[1]">
            {project.logo ? (
              <Image
                src={project.logo}
                alt={project.name}
                width={200}
                height={60}
                sizes="200px"
                className="h-auto max-h-[60px] w-auto max-w-[85%] object-contain [filter:brightness(0)_invert(1)]"
                unoptimized={project.logo.endsWith('.svg')}
              />
            ) : (
              <div className="font-display text-[48px] font-medium leading-[0.95] -tracking-[0.03em] text-cream">
                {project.name}
              </div>
            )}
          </div>
          {project.mockup && (
            <Image
              src={project.mockup}
              alt={`${project.name} mockup`}
              width={480}
              height={960}
              sizes="(min-width: 768px) 320px, 70vw"
              className="relative z-[1] mx-auto my-3.5 h-auto max-h-[62%] w-auto max-w-[70%] self-center rounded-[14px] border-2 border-[oklch(0.1_0.02_160)] shadow-[0_24px_50px_-15px_oklch(0.1_0.03_165/0.6)]"
            />
          )}
          <div className="relative z-[1] font-mono text-[10px] tracking-[0.15em] text-blue">
            LOGAN GELZER · MIAMI
          </div>
        </div>
        <div className="p-9 max-md:p-6">
          <div className="font-mono text-[12px] tracking-[0.1em] text-green">
            {project.years}
          </div>
          <h3
            id="project-modal-title"
            className="my-2.5 mb-5 font-display text-[48px] font-medium leading-none -tracking-[0.03em] text-green-ink max-md:text-[32px]"
          >
            {project.name}
          </h3>
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-blue px-2.5 py-1.5 font-mono text-[11px] text-green-ink"
              >
                {t}
              </span>
            ))}
          </div>
          <div>
            {project.body.map((b, i) => (
              <p
                key={i}
                className="mb-3.5 font-openSans leading-[1.7] text-ink-dim"
              >
                {b}
              </p>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3.5 inline-flex items-center gap-2.5 rounded-full bg-green px-4.5 px-[18px] py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-cream transition-colors hover:bg-green-ink"
          >
            Visit site <span>{urlDisplay}</span> →
          </a>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3.5 top-3.5 z-[2] grid size-9 place-items-center rounded-full border border-line bg-paper font-mono text-[18px] leading-none text-green-ink hover:border-green hover:bg-green hover:text-cream"
        >
          ×
        </button>
      </div>
    </div>
  )
}
