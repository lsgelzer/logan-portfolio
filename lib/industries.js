/**
 * Industry taxonomy for portfolio filtering. Each slug becomes a shareable
 * landing page at /work/<slug>. Projects reference slugs via the Sanity
 * `industries` field (a project can belong to more than one).
 */
export const INDUSTRIES = [
  {
    slug: 'apparel',
    audience: 'fashion & apparel brands',
    label: 'Fashion & Apparel',
    title: 'Shopify Developer for Fashion & Apparel Brands',
    intro:
      'Apparel, footwear, jewelry, and accessories brands I have built for on Shopify: size and fit tools, variant and color swatch logic, PDP and cart conversion work, B2B quick-order, and full theme redesigns.',
  },
  {
    slug: 'health-wellness',
    audience: 'supplement, wellness & beauty brands',
    label: 'Health, Wellness & Beauty',
    title: 'Shopify Developer for Supplement, Wellness & Beauty Brands',
    intro:
      'Supplement, wellness, beauty, and personal care brands: subscribe-and-save buy boxes, Recharge integrations, bundle builders, and landing pages built for paid traffic.',
  },
  {
    slug: 'food-beverage',
    audience: 'food & beverage brands',
    label: 'Food & Beverage',
    title: 'Shopify Developer for Food & Beverage Brands',
    intro:
      'CPG food, beverage, and wine brands: subscription widgets, mix-and-match bundles, shipping-zone logic, and PDPs built to convert ad traffic.',
  },
  {
    slug: 'home-garden',
    audience: 'home & garden brands',
    label: 'Home & Garden',
    title: 'Shopify Developer for Home & Garden Brands',
    intro:
      'Mattress, bedding, home goods, and garden brands: headless storefronts, product configurators, quantity-break pricing, and large-catalog merchandising.',
  },
  {
    slug: 'sports-outdoors',
    audience: 'sports, fitness & outdoor brands',
    label: 'Sports, Fitness & Outdoors',
    title: 'Shopify Developer for Sports, Fitness & Outdoor Brands',
    intro:
      'Fitness, sports, golf, and outdoor brands: drops and launch landing pages, subscription programs, and fast mobile PDPs.',
  },
  {
    slug: 'automotive',
    audience: 'automotive & powersports brands',
    label: 'Automotive & Powersports',
    title: 'Shopify Developer for Automotive & Powersports Brands',
    intro:
      'Auto, motorcycle, and vehicle accessory stores: year/make/model fitment finders, large parts catalogs, mega-menus, and platform migrations to Shopify.',
  },
  {
    slug: 'pets',
    audience: 'pet brands',
    label: 'Pet',
    title: 'Shopify Developer for Pet Brands',
    intro:
      'Pet food, supplement, and accessories brands: subscription-first PDPs, bundles, and replenishment flows.',
  },
  {
    slug: 'gifts-lifestyle',
    audience: 'gift, lifestyle & collectibles brands',
    label: 'Gifts, Lifestyle & Collectibles',
    title: 'Shopify Developer for Gift, Lifestyle & Collectibles Brands',
    intro:
      'Stationery, art, party, gifting, and collectibles stores: bundle and starter-kit flows, seasonal landing pages, and custom Shopify builds.',
  },
  {
    slug: 'agencies',
    audience: 'agencies',
    label: 'Agency Partners',
    title: 'White-Label Shopify Developer for Agencies',
    intro:
      'Agencies I have partnered with as a white-label Shopify Plus and Hydrogen developer, shipping builds for their brand clients under their name.',
  },
]

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug)

export function getIndustry(slug) {
  return INDUSTRIES.find((i) => i.slug === slug) || null
}

/** Industries that have at least one project, with counts, in taxonomy order. */
export function industryFilters(projects) {
  return INDUSTRIES.map((i) => ({
    slug: i.slug,
    label: i.label,
    count: projects.filter((p) => p.industries?.includes(i.slug)).length,
  })).filter((f) => f.count > 0)
}

const GENERIC_TAGS = new Set(['Bug Fixes', 'Theme Customization'])

function listNames(names, max = 5) {
  const shown = names.slice(0, max)
  if (shown.length < 2) return shown.join('')
  return `${shown.slice(0, -1).join(', ')} and ${shown.at(-1)}`
}

function clip(text, max) {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:]$/, '')}…`
}

/**
 * Data-derived copy for an industry page: a quotable summary sentence (for
 * answer engines), a meta description, top capabilities, and FAQs. All of it
 * comes from the projects actually tagged with the industry, so it stays
 * accurate as Sanity changes.
 */
export function industryContent(industry, projects, rates) {
  const names = projects.map((p) => p.name)
  const n = projects.length
  const tagCounts = new Map()
  for (const p of projects) {
    for (const t of p.tags) {
      if (!GENERIC_TAGS.has(t)) tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
    }
  }
  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t)
  const isAgency = industry.slug === 'agencies'
  const who = isAgency ? `${n} agencies` : `${n} ${industry.audience}`

  const summary = isAgency
    ? `Logan Gelzer has partnered with ${who} as a white-label Shopify developer, including ${listNames(names)}.`
    : `Logan Gelzer has built on Shopify for ${who}, including ${listNames(names)}.`

  const description = clip(
    `${isAgency ? 'White-label Shopify developer' : 'Shopify developer'} for ${industry.audience}: ${n} case studies including ${listNames(names, 3)}. ${topTags.slice(0, 3).join(', ')}.`,
    158,
  )

  const faqs = [
    {
      question: isAgency
        ? 'Do you work white-label for agencies?'
        : `Have you built Shopify stores for ${industry.audience}?`,
      answer: isAgency
        ? `Yes. I've partnered with ${who}, including ${listNames(names)}, building Shopify Plus themes, Hydrogen storefronts, and custom features for their brand clients under the agency's name.`
        : `Yes. I've worked with ${who} on Shopify, including ${listNames(names)}. The case studies on this page cover what I built for each.`,
    },
    {
      question: isAgency
        ? 'What can you take on for an agency?'
        : `What Shopify work do you do for ${industry.audience}?`,
      answer: `${industry.intro.includes(': ') ? `Typical work: ${industry.intro.split(': ').slice(1).join(': ')}` : industry.intro}${topTags.length ? ` Common projects in this group: ${topTags.join(', ')}.` : ''}`,
    },
    {
      question: `How much does it cost to hire you for a ${isAgency ? 'white-label' : industry.label.toLowerCase()} Shopify project?`,
      answer: `Engagements start at $${rates.hourly}/hr with a $${rates.minimum.toLocaleString('en-US')} minimum. Most projects are scoped up front after a short technical discovery, and ongoing retainers are available.`,
    },
  ]

  return { summary, description, faqs, topTags }
}
