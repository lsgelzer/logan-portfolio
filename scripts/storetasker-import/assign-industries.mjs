#!/usr/bin/env node
// Assign industry slugs (lib/industries.js) to Sanity projects by name.
//
// Usage:
//   node scripts/storetasker-import/assign-industries.mjs          # dry run
//   node scripts/storetasker-import/assign-industries.mjs --write
//
// Projects not listed here are reported and left untouched (they still
// appear under "All").

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { createClient } from '@sanity/client'

import { INDUSTRY_SLUGS } from '../../lib/industries.js'

const WRITE = process.argv.includes('--write')

const BY_INDUSTRY = {
  apparel: [
    'Chubbies',
    'Alo',
    'Jack Threads',
    'Overtime',
    'Unitus',
    'Turtle Fur',
    'Cotton Citizen',
    'Shut Up & Love Your Neighbor',
    'American Classics Apparel',
    'Holderness & Bourne',
    'Sock Fancy',
    'The Great PNW',
    'Sue Patrick',
    'Threads Of Hope',
    'Urban Expressions',
    'Apollos Jewelry',
    'At Present',
    'The Reelsewhere',
    'GORE-TEX',
  ],
  'health-wellness': [
    'Strong Cell',
    'TruLabs',
    'Gutology',
    'Magic Hour',
    'Naboso',
    'Scents of Mood',
    'Kudos',
    'Designer Bums',
    'Kayode',
  ],
  'food-beverage': [
    'Wild Wonder',
    'TruLabs',
    'Alaskan Salmon',
    'Royo Bread',
    'Luxfit Premium Protein Bars',
    'RxSugar®',
    'The Good Wine Shop Ltd',
    'Boxbar',
  ],
  'home-garden': [
    'Nolah',
    'Sven & Son',
    'Lettuce Grow',
    'Bulbs Direct',
    'Rutland',
    'Tulip Shades',
    'Hawaii Lei Stand',
    'Ikonick',
  ],
  'sports-outdoors': [
    'AbMat',
    'Overtime',
    'Alo',
    'Holderness & Bourne',
    'Flarespace',
    'GORE-TEX',
    'Naboso',
    'Turtle Fur',
  ],
  automotive: [
    'Moto Machines',
    'Otto Car Care',
    'Legends Auto Parts',
    'Flarespace',
  ],
  pets: ['Kayode', 'The Foggy Dog', "Crumps' Naturals", 'GrubTerra'],
  'gifts-lifestyle': [
    'BaronFig',
    'Ikonick',
    'Paperless Post',
    'Cali Poke House',
    'Do Or Drink',
    'Hawaii Lei Stand',
  ],
  agencies: [
    'Red Antler',
    'Pacer',
    'Rebl',
    'PB+J',
    'Pilothouse Digital',
    'Sela Vie Creative',
  ],
}

for (const slug of Object.keys(BY_INDUSTRY)) {
  if (!INDUSTRY_SLUGS.includes(slug))
    throw new Error(`unknown industry ${slug}`)
}

const byProject = new Map()
for (const [slug, names] of Object.entries(BY_INDUSTRY)) {
  for (const n of names) byProject.set(n, [...(byProject.get(n) || []), slug])
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
  `*[_type == "project" && !(_id in path("drafts.**"))]{ _id, client, industries }`,
)
const seen = new Set()
const tx = client.transaction()
let changed = 0
for (const p of projects) {
  const want = byProject.get(p.client)
  if (!want) {
    console.log(`  ? ${p.client}: unassigned`)
    continue
  }
  seen.add(p.client)
  if (JSON.stringify(p.industries || []) === JSON.stringify(want)) continue
  changed += 1
  console.log(`  ~ ${p.client}: ${want.join(', ')}`)
  tx.patch(p._id, (patch) => patch.set({ industries: want }))
}
for (const n of byProject.keys()) {
  if (!seen.has(n)) console.log(`  ! mapping names a missing project: ${n}`)
}

console.log(`\n${changed} of ${projects.length} projects to update.`)
if (WRITE && changed) {
  await tx.commit()
  console.log('Committed.')
} else if (!WRITE) {
  console.log('Dry run. Re-run with --write.')
}
