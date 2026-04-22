'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const FORTUNES = [
  'Ship small, ship often.',
  'Conversion rate > pixel perfection (but barely).',
  'Headless is a migration, not a destination.',
  'A/B test your assumptions.',
  'The best Shopify store is one that loads fast.',
]

function buildCommands({ profile, clients, projects, socials, stats }) {
  const whoamiLines = [
    {
      type: 'kv',
      entries: [
        ['name', `"${profile.name}"`, 'str'],
        ['location', `"${profile.location}"`, 'str'],
        ['since', '2013', 'num'],
        [
          'roles',
          `[${(profile.roles || []).map((r) => `"${r}"`).join(', ')}]`,
          'arr',
        ],
      ],
    },
  ]

  const stackGroups = {
    frontend: ['React', 'Next.js', 'Remix', 'Liquid', 'TypeScript'],
    backend: ['Node.js', 'Shopify APIs', 'Postgres', 'MongoDB'],
    design: ['Figma', 'UI/UX systems', 'Prototyping'],
    commerce: ['Shopify', 'WooCommerce', 'BigCommerce', 'Recharge'],
  }

  const commands = {
    help: () => [
      { type: 'out', text: 'available commands:' },
      { type: 'out-key', key: 'whoami', desc: 'who is logan' },
      { type: 'out-key', key: 'stack', desc: 'my tech stack' },
      { type: 'out-key', key: 'clients', desc: 'list all clients' },
      { type: 'out-key', key: 'projects', desc: 'recent projects' },
      { type: 'out-key', key: 'contact', desc: 'how to reach me' },
      { type: 'out-key', key: 'stats', desc: 'by the numbers' },
      { type: 'out-key', key: 'fortune', desc: 'a little wisdom' },
      { type: 'out-key', key: 'clear', desc: 'wipe the screen' },
    ],
    whoami: () => whoamiLines,
    stack: () =>
      Object.entries(stackGroups).map(([k, v]) => ({
        type: 'kv',
        entries: [[k, `[${v.map((x) => `"${x}"`).join(', ')}]`, 'arr']],
      })),
    clients: () =>
      (clients || []).map((c, i) => ({
        type: 'list-num',
        n: String(i + 1).padStart(2, '0'),
        text: c.name,
      })),
    projects: () => [
      ...(projects || []).map((p, i) => ({
        type: 'list-project',
        n: String(i + 1).padStart(2, '0'),
        name: p.name,
        years: p.years,
      })),
      { type: 'comment', text: '// scroll down for details' },
    ],
    contact: () =>
      (socials || []).map((s) => ({
        type: 'social',
        label: s.label,
        handle: s.handle,
        url: s.url,
      })),
    stats: () =>
      (stats || []).map((s) => ({ type: 'stat', k: s.k, v: s.v })),
    fortune: () => [
      {
        type: 'comment',
        text: `// ${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}`,
      },
    ],
    sudo: () => [{ type: 'comment', text: '// nice try.' }],
    cat: () => [{ type: 'comment', text: '// meow.' }],
    vim: () => [{ type: 'comment', text: '// trapped forever.' }],
    exit: () => [
      { type: 'comment', text: "// you can't leave. this is a portfolio." },
    ],
  }
  commands.ls = () => commands.projects()
  return commands
}

function Line({ line }) {
  switch (line.type) {
    case 'comment':
      return (
        <div className="font-mono italic text-[oklch(0.62_0.05_160)]">
          {line.text}
        </div>
      )
    case 'out':
      return <div className="pl-3.5 text-[oklch(0.85_0.04_160)]">{line.text}</div>
    case 'out-key':
      return (
        <div className="pl-3.5 text-[oklch(0.85_0.04_160)]">
          <span className="text-blue-2">{line.key.padEnd(11)}</span>— {line.desc}
        </div>
      )
    case 'kv':
      return (
        <div>
          {line.entries.map(([k, v, kind]) => (
            <div key={k}>
              <span className="text-blue-2">{k}</span>
              <span className="text-[oklch(0.85_0.04_160)]">: </span>
              <span className={kind === 'num' ? 'text-blue' : 'text-peach'}>
                {v}
              </span>
            </div>
          ))}
        </div>
      )
    case 'list-num':
      return (
        <div>
          <span className="text-blue">{line.n}</span>{' '}
          <span className="text-cream">{line.text}</span>
        </div>
      )
    case 'list-project':
      return (
        <div>
          <span className="text-blue">{line.n}</span>{' '}
          <span className="text-blue-2">{line.name}</span>{' '}
          <span className="italic text-[oklch(0.62_0.05_160)]">({line.years})</span>
        </div>
      )
    case 'social':
      return (
        <div>
          <span className="text-blue-2">{line.label.padEnd(11)}</span>
          <a
            className="text-blue hover:underline"
            href={line.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {line.handle}
          </a>
        </div>
      )
    case 'stat':
      return (
        <div>
          <span className="text-blue">{line.k.padEnd(10)}</span>
          {line.v}
        </div>
      )
    case 'prompt':
      return (
        <div>
          <span className="text-blue">logan@miami</span>
          <span className="italic text-[oklch(0.62_0.05_160)]"> ~ </span>${' '}
          <span className="text-cream">{line.cmd}</span>
        </div>
      )
    case 'blank':
      return <div>&nbsp;</div>
    default:
      return null
  }
}

export default function Terminal({
  profile,
  clients,
  projects,
  socials,
  stats,
}) {
  const makeInitialLines = useCallback(() => {
    return [
      { type: 'comment', text: '// logan.os v12.0 — ecommerce runtime' },
      { type: 'comment', text: "// type 'help' to explore. or just vibe." },
      { type: 'blank' },
      {
        type: 'kv',
        entries: [
          ['name', `"${profile.name}"`, 'str'],
          ['location', `"${profile.location}"`, 'str'],
          ['since', '2013', 'num'],
          [
            'roles',
            `[${(profile.roles || []).map((r) => `"${r}"`).join(', ')}]`,
            'arr',
          ],
        ],
      },
      { type: 'blank' },
      {
        type: 'comment',
        text: '// try: stack, clients, projects, stats, fortune',
      },
    ]
  }, [profile])

  const commands = useMemo(
    () => buildCommands({ profile, clients, projects, socials, stats }),
    [profile, clients, projects, socials, stats],
  )

  const [lines, setLines] = useState(makeInitialLines)
  const [value, setValue] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  useEffect(() => {
    const onSlash = (e) => {
      if (
        e.key === '/' &&
        document.activeElement !== inputRef.current &&
        !e.target.matches('input, textarea')
      ) {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    document.addEventListener('keydown', onSlash)
    return () => document.removeEventListener('keydown', onSlash)
  }, [])

  const runCommand = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase()
      if (!cmd) return
      const [c] = cmd.split(/\s+/)
      const result = commands[c]
        ? commands[c]()
        : [
            {
              type: 'comment',
              text: `// command not found: ${c}. type 'help' for options.`,
            },
          ]
      if (c === 'clear') {
        setLines(makeInitialLines())
        return
      }
      setLines((prev) => [
        ...prev,
        { type: 'prompt', cmd: raw },
        ...result,
        { type: 'blank' },
      ])
    },
    [commands, makeInitialLines],
  )

  return (
    <div className="overflow-hidden rounded-[14px] border border-green-deep bg-green-ink font-mono text-[13px] shadow-[0_30px_60px_-20px_oklch(0.25_0.05_165/0.4)]">
      <div className="flex items-center gap-2 border-b border-[oklch(0.15_0.05_165)] bg-green-deep px-3.5 py-2.5 text-[11px] text-blue">
        <div className="mr-3 flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff6b6b]" />
          <span className="size-3 rounded-full bg-[#fbbf24]" />
          <span className="size-3 rounded-full bg-[#34d399]" />
        </div>
        <span>logan@miami — ~/portfolio — 80×24</span>
      </div>
      <div
        ref={bodyRef}
        className="min-h-[380px] max-h-[480px] overflow-y-auto p-4 text-cream"
        role="log"
        aria-live="polite"
        aria-label="Interactive terminal output"
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap break-words">
            <Line line={line} />
          </div>
        ))}
      </div>
      <form
        className="flex items-center gap-2 bg-green-ink px-4 pb-4 pt-1 text-[13px] text-cream"
        onSubmit={(e) => {
          e.preventDefault()
          runCommand(value)
          setValue('')
        }}
      >
        <span className="text-blue">$</span>
        <label htmlFor="terminal-input" className="sr-only">
          Type a terminal command
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="type 'help' and hit enter"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 border-none bg-transparent font-mono text-cream caret-[var(--blue)] outline-none placeholder:text-[oklch(0.70_0.04_165)]"
        />
      </form>
      <div className="flex flex-wrap items-center gap-2 bg-green-ink px-4 pb-3.5 text-[11px] text-[oklch(0.70_0.04_165)]">
        <span>try:</span>
        {['whoami', 'stack', 'clients', 'projects', 'stats', 'fortune'].map(
          (k) => (
            <kbd
              key={k}
              className="rounded border border-[oklch(0.3_0.06_165)] bg-green-deep px-1.5 py-0.5 font-mono text-[10px] text-blue"
            >
              {k}
            </kbd>
          ),
        )}
        <span className="ml-auto">
          press{' '}
          <kbd className="rounded border border-[oklch(0.3_0.06_165)] bg-green-deep px-1.5 py-0.5 font-mono text-[10px] text-blue">
            /
          </kbd>{' '}
          to focus
        </span>
      </div>
    </div>
  )
}
