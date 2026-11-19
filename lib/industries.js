/**
 * Industry taxonomy for portfolio filtering. Each slug becomes a shareable
 * landing page at /work/<slug>. Projects reference slugs via the Sanity
 * `industries` field (a project can belong to more than one).
 */
export const INDUSTRIES = [
  {
    slug: 'apparel',
    label: 'Fashion & Apparel',
    title: 'Shopify Developer for Fashion & Apparel Brands',
    intro:
      'Apparel, footwear, jewelry, and accessories brands I have built for on Shopify: size and fit tools, variant and color swatch logic, PDP and cart conversion work, B2B quick-order, and full theme redesigns.',
  },
  {
    slug: 'health-wellness',
    label: 'Health, Wellness & Beauty',
    title: 'Shopify Developer for Supplement, Wellness & Beauty Brands',
    intro:
      'Supplement, wellness, beauty, and personal care brands: subscribe-and-save buy boxes, Recharge integrations, bundle builders, and landing pages built for paid traffic.',
  },
  {
    slug: 'food-beverage',
    label: 'Food & Beverage',
    title: 'Shopify Developer for Food & Beverage Brands',
    intro:
      'CPG food, beverage, and wine brands: subscription widgets, mix-and-match bundles, shipping-zone logic, and PDPs built to convert ad traffic.',
  },
  {
    slug: 'home-garden',
    label: 'Home & Garden',
    title: 'Shopify Developer for Home & Garden Brands',
    intro:
      'Mattress, bedding, home goods, and garden brands: headless storefronts, product configurators, quantity-break pricing, and large-catalog merchandising.',
  },
  {
    slug: 'sports-outdoors',
    label: 'Sports, Fitness & Outdoors',
    title: 'Shopify Developer for Sports, Fitness & Outdoor Brands',
    intro:
      'Fitness, sports, golf, and outdoor brands: drops and launch landing pages, subscription programs, and fast mobile PDPs.',
  },
  {
    slug: 'automotive',
    label: 'Automotive & Powersports',
    title: 'Shopify Developer for Automotive & Powersports Brands',
    intro:
      'Auto, motorcycle, and vehicle accessory stores: year/make/model fitment finders, large parts catalogs, mega-menus, and platform migrations to Shopify.',
  },
  {
    slug: 'pets',
    label: 'Pet',
    title: 'Shopify Developer for Pet Brands',
    intro:
      'Pet food, supplement, and accessories brands: subscription-first PDPs, bundles, and replenishment flows.',
  },
  {
    slug: 'gifts-lifestyle',
    label: 'Gifts, Lifestyle & Collectibles',
    title: 'Shopify Developer for Gift, Lifestyle & Collectibles Brands',
    intro:
      'Stationery, art, party, gifting, and collectibles stores: bundle and starter-kit flows, seasonal landing pages, and custom Shopify builds.',
  },
  {
    slug: 'agencies',
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
