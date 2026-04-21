'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#clients', label: 'Clients' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function TopBar() {
  const [clock, setClock] = useState('--:--:-- EST')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const miami = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/New_York' }),
      )
      const hh = String(miami.getHours()).padStart(2, '0')
      const mm = String(miami.getMinutes()).padStart(2, '0')
      const ss = String(miami.getSeconds()).padStart(2, '0')
      setClock(`${hh}:${mm}:${ss} EST`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line bg-paper/75 px-6 py-3.5 font-mono text-[12px] text-ink-dim backdrop-blur-lg"
      role="banner"
    >
      <a href="#" className="inline-flex items-center gap-2.5 text-ink" aria-label="Logan Gelzer home">
        <Image
          src="/portfolio/logan-author-headshot.png"
          alt=""
          aria-hidden
          width={28}
          height={28}
          priority
          className="size-7 rounded-full object-cover"
        />
        <b className="font-display text-[15px] font-semibold -tracking-[0.02em] text-green-ink">
          Logan Gelzer
        </b>
      </a>
      <nav className="hidden gap-[22px] md:flex" aria-label="Primary">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="relative transition-colors before:opacity-40 before:content-['↗_'] hover:text-green"
          >
            {n.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2.5">
        <span
          className="size-2 rounded-full bg-green shadow-[0_0_10px_var(--green)] motion-safe:animate-pulse"
          aria-hidden
        />
        <span aria-label="Current time in Miami">{clock}</span>
      </div>
    </header>
  )
}
