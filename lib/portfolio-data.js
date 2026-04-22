export const PROFILE = {
  name: 'Logan Gelzer',
  location: 'Miami, FL',
  email: 'hello@logangelzer.com',
  tagline:
    'Freelance Shopify Plus & Hydrogen developer in Miami — 12+ years scaling DTC brands.',
  roles: [
    'Shopify Plus Expert',
    'Hydrogen / Headless Dev',
    'CRO & A/B Testing',
    'UI/UX Designer',
  ],
  url: 'https://logangelzer.com',
}

export const SOCIALS = [
  {
    label: 'Github',
    url: 'https://github.com/lsgelzer',
    handle: '@lsgelzer',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/logan-gelzer/',
    handle: '/logan-gelzer',
  },
  {
    label: 'Twitter / X',
    url: 'https://twitter.com/logangelzer',
    handle: '@logangelzer',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/logangelzer',
    handle: '@logangelzer',
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/lsgelzer/',
    handle: '/lsgelzer',
  },
  {
    label: 'Email',
    url: 'mailto:hello@logangelzer.com',
    handle: 'hello@logangelzer.com',
  },
]

export const ABOUT = [
  "Hey, I'm Logan — a Miami-based freelance Shopify developer and UI/UX designer. For 12+ years I've been building, shipping, and scaling ecommerce experiences for direct-to-consumer brands.",
  'My start was hands-on: customer service and sales at an online training company. I ended up running the whole site — WooCommerce builds, automations, a Learning Management System. From there I joined an ecommerce agency, leading projects across Shopify, Shopify Plus, WooCommerce, and BigCommerce.',
  'I specialize in Shopify Plus and headless commerce with Hydrogen and Next.js. Day-to-day that means custom Liquid themes, Shopify Functions, Checkout Extensibility, Checkout Blocks, and subscription/bundle flows with Recharge and Shopify Scripts.',
  'A defining project was a Miami food brand where I took their ecommerce channel from $200/month to $250,000/month across three channels in two years — a 1,250× multiplier driven by CRO, A/B testing, and a performance-first rebuild.',
  "Since 2020 I've been full-time freelance, working with brands like Chubbies, Nolah, Alo Yoga, Overtime, Wild Wonder, BaronFig, and Kudos. If you're a DTC brand looking for a senior Shopify developer who also owns the design and the CRO program, let's talk.",
]

export const STATS = [
  { k: '12+', v: 'Years in eCommerce' },
  { k: '17', v: 'Recent clients' },
  { k: '1,250x', v: 'Revenue scaled (Miami food brand)' },
]

export const HERO_STATS = [
  { value: '12', suffix: '+', label: 'years shipping ecommerce' },
  { value: '1,250', suffix: 'x', label: 'revenue multiplier' },
  { value: '9', suffix: '', label: 'recent project case studies' },
]

export const STATS_STRIP = [
  { value: '12', suffix: '+', label: 'Years of experience' },
  { value: '17', suffix: '+', label: 'Clients & brands' },
  { value: '$250k', suffix: '/mo', label: 'Peak scaled revenue' },
  { value: '9', suffix: '', label: 'Recent case studies' },
]

export const CLIENTS = [
  { name: 'The Ntwrk', logo: '/portfolio/clients/ntwrk.svg', invert: true },
  { name: 'Tea Drops', logo: '/portfolio/clients/teadrops.png' },
  { name: 'Alo Yoga', logo: '/portfolio/clients/alo.png' },
  { name: 'Complex', logo: '/portfolio/clients/complex.png' },
  { name: 'Live Tinted', logo: '/portfolio/clients/livetinted.png' },
  { name: 'Overtime', logo: '/portfolio/clients/overtime.png' },
  { name: 'Gladskin', logo: '/portfolio/clients/gladskin.png' },
  { name: 'Boll & Branch', logo: '/portfolio/clients/bollbranch.png' },
  { name: 'Nolah', logo: '/portfolio/clients/nolah.png' },
  { name: 'Baronfig', logo: '/portfolio/clients/baronfig.png' },
  { name: 'Kudos', logo: '/portfolio/clients/kudos.png' },
  { name: 'Wild Wonder', logo: '/portfolio/clients/wildwonder.png' },
  { name: 'Simply', logo: '/portfolio/clients/simply.png' },
  { name: 'Judy', logo: '/portfolio/clients/judy.png' },
  { name: 'Krave Beauty', logo: '/portfolio/clients/kravebeauty.png' },
  { name: 'Chubbies', logo: '/portfolio/clients/chubbies.png' },
  { name: 'Ikonick', logo: '/portfolio/clients/ikonick.png' },
  { name: 'Jack Threads', logo: '/portfolio/clients/jackthreads.png' },
]

export const PROJECTS = [
  {
    id: 'wildwonder',
    name: 'Wild Wonder',
    years: '2023 – 2024',
    stack: ['shopify', 'liquid', 'react'],
    mockup: '/portfolio/projects/wildwonder.png',
    logo: '/portfolio/clients/wildwonder.png',
    tags: ['PDP Landing Page', 'Variant Switcher', 'Subscription Widget'],
    url: 'https://drinkwildwonder.com',
    body: [
      'Partnered with Wild Wonder on several projects. The first cleaned up and implemented a better-performing subscription widget on a custom landing page they were running paid traffic to.',
      'Later, we overhauled the PDP pages and I shipped custom functionality to switch products through a variant selector without a hard page refresh.',
    ],
  },
  {
    id: 'nolah',
    name: 'Nolah',
    years: '2023',
    stack: ['nextjs', 'shopify', 'layers'],
    mockup: '/portfolio/projects/nolah.png',
    logo: '/portfolio/clients/nolah.png',
    tags: ['Headless Migration', 'Bug Fixes'],
    url: 'https://nolahsmattress.com',
    body: [
      "Launched Nolah Mattress's headless storefront on Next.js, Builder.io, and Shopify.",
      'They had hired an agency that took an extremely long time to handover a buggy site — I helped clean up the codebase so they could actually launch, then implemented features to improve the buying experience.',
    ],
  },
  {
    id: 'ikonick',
    name: 'Ikonick',
    years: '2022 – 2024',
    stack: ['shopify', 'liquid', 'ab'],
    mockup: '/portfolio/projects/ikonick.png',
    logo: '/portfolio/clients/ikonick.png',
    tags: ['Theme Customization', 'CRO', 'Bug Fixes', 'Performance'],
    url: 'https://ikonick.com',
    body: [
      'Worked with Ikonick on many projects over the past year. Initially CRO updates from an Oddit report.',
      'From there: additional optimizations and theme customizations including discount displays, variant displays, and performance wins.',
    ],
  },
  {
    id: 'chubbies',
    name: 'Chubbies',
    years: '2020 – Present',
    stack: ['shopify', 'react', 'ab', 'bolt'],
    mockup: '/portfolio/projects/chubbies.png',
    logo: '/portfolio/clients/chubbies.png',
    tags: ['Headless Migration', 'Custom Features', 'Analytics', 'A/B Testing'],
    url: 'https://chubbiesshorts.com',
    body: [
      'On retainer with Chubbies offering a broad spectrum of development support for their Shopify site.',
      'A/B tests that optimize user experience, third-party app integrations, site performance and speed wins, and guiding them through the transition to a headless / composable architecture.',
    ],
  },
  {
    id: 'baronfig',
    name: 'BaronFig',
    years: '2023 – Present',
    stack: ['shopify', 'liquid', 'cart'],
    mockup: '/portfolio/projects/baronfig.png',
    logo: '/portfolio/clients/baronfig.png',
    tags: ['Custom Bundles', 'Discounts', 'Wholesale', 'Theme Updates'],
    url: 'https://baronfig.com',
    body: [
      'Several projects to enhance the buying experience, mostly around bundles. Built a Starter Kit — a stepped flow of selecting a pen & journal, upgrade, and add-to-cart with custom discounting.',
      'Later shipped a custom bundle design using Bundle Builder, then migrated away from that app to a custom bundling template leveraging metafields and Shopify Scripts for discounting.',
    ],
  },
  {
    id: 'overtime',
    name: 'Overtime',
    years: '2023 – Present',
    stack: ['shopify', 'react', 'cart'],
    mockup: '/portfolio/projects/overtime.png',
    logo: '/portfolio/clients/overtime.png',
    tags: ['Custom PDP', 'Metafield Migrations', 'Gift with Purchase'],
    url: 'https://shop.overtime.tv',
    body: [
      "Ongoing partnership since summer 2023. Built a custom PDP experience called 'Kits' where shoppers can combine a top and bottom and add to cart at once.",
      'For holiday, implemented Gift With Purchase functionality in the cart and extended it into the checkout flow using Checkout Blocks. Also provided bug fix, performance, and accessibility support.',
    ],
  },
  {
    id: 'alo',
    name: 'Alo Yoga',
    years: '2022',
    stack: ['shopify', 'layers', 'liquid'],
    mockup: '/portfolio/projects/alo.png',
    logo: '/portfolio/clients/alo.png',
    tags: ['Landing Page Dev', 'CMS Integration'],
    url: 'https://aloyoga.com',
    body: [
      'Built landing pages during fall and holiday 2022. The first — the Aspen Collection — featured a 3-phase drop powered by Builder.io, integrated with their Shopify store.',
      'The second was the Gift Shop landing page, giving their team the ability to quickly update content throughout drops and season changes.',
    ],
  },
  {
    id: 'kudos',
    name: 'Kudos',
    years: '2021 – Present',
    stack: ['shopify', 'liquid', 'spark'],
    mockup: '/portfolio/projects/kudos.png',
    logo: '/portfolio/clients/kudos.png',
    tags: ['Custom Subscription Portal', 'PDP Redesign', 'Theme Sections'],
    url: 'https://mykudos.com',
    body: [
      'Partnered with Kudos since before launch. First project was a complex custom stepper flow inside a Recharge portal.',
      "Since then, they've moved to a more traditional PDP that I helped build. Also supported their Shark Tank moment in January 2023 — cool to see them earn an investment from the Sharks.",
    ],
  },
  {
    id: 'jack',
    name: 'Jack Threads',
    years: '2024',
    stack: ['shopify', 'figma', 'palette'],
    mockup: '/portfolio/projects/jackthreads.png',
    logo: '/portfolio/clients/jackthreads.png',
    tags: ['CRO', 'PDP Redesign'],
    url: 'https://jackthreads.com',
    body: [
      'Overhauled the product page to improve conversions. Mocked up improvements to the hero section — reorganizing information in the buy box, adding feature/benefit callouts, reducing description, and using accordions.',
      'Changed product images into a grid format to better show off clothing views. Light cleanup of the About page, moving off GemPages to native theme sections.',
    ],
  },
]

export const SKILLS = [
  { name: 'Shopify / Liquid', years: 10, pct: 98, group: 'ecom', icon: 'shopify' },
  { name: 'JavaScript / TypeScript', years: 8, pct: 92, group: 'code', icon: 'typescript' },
  { name: 'React / Next.js', years: 6, pct: 88, group: 'code', icon: 'react' },
  { name: 'Remix', years: 3, pct: 76, group: 'code', icon: 'remix' },
  { name: 'Node.js', years: 7, pct: 84, group: 'code', icon: 'node' },
  { name: 'Figma / UI Design', years: 6, pct: 82, group: 'design', icon: 'figma' },
  { name: 'Postgres & MongoDB', years: 5, pct: 72, group: 'data', icon: 'postgres' },
  { name: 'WooCommerce / WordPress', years: 9, pct: 86, group: 'ecom', icon: 'wordpress' },
  { name: 'BigCommerce', years: 4, pct: 65, group: 'ecom', icon: 'bigcommerce' },
  { name: 'A/B Testing & CRO', years: 7, pct: 90, group: 'ecom', icon: 'ab' },
]

export const ASIDE_CHIPS = [
  { label: 'Shopify Plus', icon: 'shopify' },
  { label: 'Hydrogen', icon: 'react' },
  { label: 'Oxygen', icon: 'layers' },
  { label: 'Builder.io', icon: 'code' },
  { label: 'Recharge', icon: 'spark' },
  { label: 'Klaviyo', icon: 'bolt' },
  { label: 'Checkout Blocks', icon: 'cart' },
  { label: 'Shopify Scripts', icon: 'liquid' },
  { label: 'Metafields', icon: 'layers' },
  { label: 'GA4 & GTM', icon: 'ab' },
  { label: 'Git', icon: 'git' },
  { label: 'Tailwind', icon: 'tailwind' },
]
