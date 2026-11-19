#!/usr/bin/env node
// Sync Sanity project durations + "present" flags with the latest
// storetasker-scraper SQLite snapshot.
//
// Usage:
//   node scripts/storetasker-import/refresh-durations.mjs          # dry run
//   node scripts/storetasker-import/refresh-durations.mjs --write  # patch Sanity
//
// Rules:
//   - start = earliest of (Sanity start, scraper first_event_at)
//   - end   = latest of (Sanity end, scraper last_event_at)
//   - present = last activity within 4 months (same rule as build-candidates)
//   - projects with no scraper match are left untouched

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { createClient } from '@sanity/client'

const DB = '/Users/logangelzer/github/storetasker-scraper/output/storetasker.db'
const WRITE = process.argv.includes('--write')

// Sanity display name -> scraper brand name, where they differ.
const ALIASES = {
  chubbies: 'chubbies shorts',
  nolah: 'nolah sleep',
  alo: 'alo yoga',
  'american classics apparel': 'americanclassicsapparel',
  'scents of mood': 'scentsofmood',
  'apollos jewelry': 'apollosjewelry',
  'hawaii lei stand': 'hawaiileistandcom',
  'tulip shades': 'tulipshadescom',
  'sue patrick': 'suepatrickcom',
  'the reelsewhere': 'thereelsewherecom',
}

function norm(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '')
}

function domain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function isPresent(latest) {
  const last = new Date(latest)
  const now = new Date()
  const months =
    (now.getFullYear() - last.getFullYear()) * 12 +
    (now.getMonth() - last.getMonth())
  return months <= 4
}

const day = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : null)

const rows = JSON.parse(
  execFileSync(
    'sqlite3',
    [
      '-json',
      DB,
      `select name, brand_title, site_url, first_event_at, last_event_at
       from clients where total_revenue_usd > 0`,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  ).toString() || '[]',
)

const byName = new Map()
const byDomain = new Map()
for (const r of rows) {
  for (const n of [r.name, r.brand_title]) if (n) byName.set(norm(n), r)
  const d = domain(r.site_url)
  if (d) byDomain.set(d, r)
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

const projects = await client.fetch(
  `*[_type == "project" && !(_id in path("drafts.**"))]{ _id, client, site, duration, present }`,
)

let changed = 0
const tx = client.transaction()
for (const p of projects) {
  const key = norm(p.client)
  const match =
    byName.get(key) ||
    byName.get(norm(ALIASES[p.client?.toLowerCase()] ?? '')) ||
    byDomain.get(domain(p.site))
  if (!match) {
    console.log(`  ? ${p.client}: no scraper match, skipped`)
    continue
  }

  const curStart = day(p.duration?.start)
  const curEnd = day(p.duration?.end)
  const scStart = day(match.first_event_at)
  const scEnd = day(match.last_event_at)
  const start = [curStart, scStart].filter(Boolean).sort()[0]
  const end = [curEnd, scEnd].filter(Boolean).sort().at(-1)
  const present = isPresent(end)

  if (start === curStart && end === curEnd && present === !!p.present) continue

  changed += 1
  console.log(
    `  ~ ${p.client}: ${curStart}→${curEnd} (${!!p.present}) => ${start}→${end} (${present})`,
  )
  tx.patch(p._id, (patch) =>
    patch.set({ duration: { _type: 'duration', start, end }, present }),
  )
}

console.log(`\n${changed} of ${projects.length} projects need updates.`)
if (WRITE && changed) {
  await tx.commit()
  console.log('Committed to Sanity.')
} else if (!WRITE) {
  console.log('Dry run. Re-run with --write to patch Sanity.')
}
