#!/usr/bin/env node
// Import the curated Nov 2026 client batch into Sanity.
//
// Usage:
//   node scripts/storetasker-import/import-new-clients.mjs <assets-dir>          # dry run
//   node scripts/storetasker-import/import-new-clients.mjs <assets-dir> --write
//
// <assets-dir> holds <slug>-mockup.png (360x778) and optional <slug>-logo.png.
// Case-study copy, tags, stack and order come from new-clients-2026-11.json;
// duration/present come from the storetasker-scraper DB (matched by site domain).
// Also pins the hand-curated flagship projects to the top (orders 1-9) so they
// aren't hidden behind the homepage's "View all" cutoff.
// Idempotent: brands that already have a project doc are skipped.

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { createClient } from '@sanity/client'

const DB = '/Users/logangelzer/github/storetasker-scraper/output/storetasker.db'
const [assetsDir] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const WRITE = process.argv.includes('--write')
if (!assetsDir) {
  console.error('Usage: import-new-clients.mjs <assets-dir> [--write]')
  process.exit(2)
}

const FLAGSHIP = [
  'Chubbies',
  'Nolah',
  'Alo',
  'Overtime',
  'Kudos',
  'BaronFig',
  'Wild Wonder',
  'Ikonick',
  'Jack Threads',
]

const batch = JSON.parse(
  fs.readFileSync(
    path.resolve(import.meta.dirname, 'new-clients-2026-11.json'),
    'utf8',
  ),
)

const domain = (url) => new URL(url).hostname.replace(/^www\./, '')
const day = (iso) => new Date(iso).toISOString().slice(0, 10)

function isPresent(latest) {
  const last = new Date(latest)
  const now = new Date()
  const months =
    (now.getFullYear() - last.getFullYear()) * 12 +
    (now.getMonth() - last.getMonth())
  return months <= 4
}

const websites = JSON.parse(
  execFileSync('sqlite3', [
    '-json',
    DB,
    `select w.url, c.first_event_at, c.last_event_at
     from client_websites w join clients c on c.id = w.client_id
     where c.total_revenue_usd > 0`,
  ]).toString() || '[]',
)

function scraperDates(site) {
  const d = domain(site)
  const hit = websites.find((w) => {
    try {
      return domain(w.url) === d
    } catch {
      return false
    }
  })
  if (!hit) throw new Error(`no scraper match for ${site}`)
  return {
    duration: {
      _type: 'duration',
      start: day(hit.first_event_at),
      end: day(hit.last_event_at),
    },
    present: isPresent(hit.last_event_at),
  }
}

function toBlocks(paragraphs, slug) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `${slug}-b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${slug}-s${i}`, text, marks: [] }],
  }))
}

const cfg = JSON.parse(
  fs.readFileSync(
    path.join(os.homedir(), '.config/sanity/config.json'),
    'utf8',
  ),
)
const client = createClient({
  projectId: 'rbdjvw58',
  dataset: 'production',
  apiVersion: '2024-10-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || cfg.authToken,
})

async function upload(file, label) {
  const asset = await client.assets.upload('image', fs.createReadStream(file), {
    filename: path.basename(file),
    label,
  })
  return asset._id
}

for (const b of batch) {
  const mockup = path.join(assetsDir, `${b.slug}-mockup.png`)
  const logo = path.join(assetsDir, `${b.slug}-logo.png`)
  const hasLogo = fs.existsSync(logo)
  if (!fs.existsSync(mockup)) throw new Error(`missing ${mockup}`)
  const { duration, present } = scraperDates(b.site)

  const existing = await client.fetch(
    `{
      "project": *[_type == "project" && lower(client) == lower($n)][0]._id,
      "client": *[_type == "client" && lower(client) == lower($n)][0]._id
    }`,
    { n: b.name },
  )
  console.log(
    `${b.name}: ${duration.start}→${duration.end} present=${present} logo=${hasLogo}` +
      (existing.project ? ' (exists, skip)' : ''),
  )
  if (existing.project || !WRITE) continue

  const mockupId = await upload(mockup, `${b.name} mobile`)
  const logoId = hasLogo ? await upload(logo, `${b.name} logo`) : null
  const logoRef = logoId && {
    _type: 'image',
    asset: { _type: 'reference', _ref: logoId },
  }

  const tx = client.transaction()
  if (logoRef && !existing.client) {
    tx.create({
      _type: 'client',
      client: b.name,
      site: b.site,
      order: b.order,
      invert: false,
      image: { ...logoRef, alt: b.name },
    })
  }
  tx.create({
    _type: 'project',
    client: b.name,
    site: b.site,
    order: b.order,
    duration,
    present,
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: mockupId },
    },
    ...(logoRef && { clientImage: logoRef }),
    tags: b.tags,
    stack: b.stack,
    overview: toBlocks(b.body, b.slug),
  })
  await tx.commit()
  console.log('  ✓ created')
}

const flagship = await client.fetch(
  `*[_type in ["project", "client"] && client in $names]{ _id, _type, client, order }`,
  { names: FLAGSHIP },
)
const tx = client.transaction()
let pinned = 0
for (const doc of flagship) {
  const order = FLAGSHIP.indexOf(doc.client) + 1
  if (doc.order === order) continue
  pinned += 1
  console.log(`pin ${doc._type} ${doc.client} → order ${order}`)
  tx.patch(doc._id, (p) => p.set({ order }))
}
if (WRITE && pinned) await tx.commit()
console.log(WRITE ? 'Done.' : '\nDry run. Re-run with --write to publish.')
