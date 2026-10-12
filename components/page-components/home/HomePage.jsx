import TopBar from '@/components/layout/topbar'
import AboutSection from '@/components/sections/about-section/about-section'
import ClientsSection from '@/components/sections/clients-section/clients-section'
import FaqSection from '@/components/sections/faq-section/faq-section'
import HeroSection from '@/components/sections/hero-section/hero-section'
import MarqueeSection from '@/components/sections/marquee-section/marquee-section'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import SkillsSection from '@/components/sections/skills-section/skills-section'
import SocialSection from '@/components/sections/social-section/social-section'
import StatsStrip from '@/components/sections/stats-strip/stats-strip'
import TestimonialsSection from '@/components/sections/testimonials-section/testimonials-section'

function structuredDataBlocks({ profile, socials, projects, clients, skills }) {
  const personId = `${profile.url}/#person`
  const serviceId = `${profile.url}/#service`
  const websiteId = `${profile.url}/#website`

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    givenName: 'Logan',
    familyName: 'Gelzer',
    url: profile.url,
    email: `mailto:${profile.email}`,
    jobTitle: 'Senior Shopify Expert',
    description:
      'Senior Shopify Expert with 12+ years building ecommerce for DTC brands — specializing in Shopify Plus, Hydrogen, headless storefronts, Checkout Extensibility, and CRO.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    image: `${profile.url}/portfolio/logan-author-headshot.png`,
    sameAs: [
      'https://www.linkedin.com/in/logan-gelzer/',
      'https://github.com/lsgelzer',
      'https://x.com/logangelzer',
      'https://twitter.com/logangelzer',
      'https://www.instagram.com/logangelzer',
      'https://www.facebook.com/lsgelzer/',
    ],
    knowsAbout: [
      'Shopify Plus',
      'Shopify Hydrogen',
      'Headless commerce',
      'Checkout Extensibility',
      'Shopify Functions',
      'Liquid',
      'Conversion rate optimization',
      'Core Web Vitals',
      'Recharge',
      'Klaviyo',
      'Builder.io',
    ],
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': serviceId,
    name: 'Logan Gelzer: Senior Shopify Expert',
    url: profile.url,
    image: `${profile.url}/og-image.png`,
    email: profile.email,
    priceRange: '$$$',
    provider: { '@id': personId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Miami' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Shopify development services',
      itemListElement: [
        'Shopify Plus theme development',
        'Headless / Hydrogen storefronts',
        'Checkout Extensibility & Shopify Functions',
        'Subscription, bundle, and gift-with-purchase flows',
        'A/B testing and CRO audits',
        'Site performance & Core Web Vitals',
        'Analytics & GA4/GTM implementation',
        'Design-to-code handoff from Figma',
      ].map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: s },
      })),
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: profile.url,
    name: profile.name,
    publisher: { '@id': personId },
    inLanguage: 'en-US',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: profile.url,
      },
    ],
  }

  const portfolio = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Recent Projects',
    numberOfItems: (projects || []).length,
    itemListElement: (projects || []).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        about: (p.tags || []).join(', '),
        url: p.url,
        temporalCoverage: p.years,
        creator: { '@id': personId },
      },
    })),
  }

  const clientList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Clients',
    numberOfItems: (clients || []).length,
    itemListElement: (clients || []).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Organization', name: c.name },
    })),
  }

  const faqData = [
    {
      question: 'How much does it cost to work with Logan Gelzer?',
      answer:
        'Engagements start at $100/hr with a $1,000 minimum project size. I work directly with you — no account managers or handoffs. Most projects are scoped up front after a short technical discovery, and ongoing retainers are available.',
    },
    {
      question: 'Who is Logan Gelzer?',
      answer:
        'Logan Gelzer is a Senior Shopify Expert based in Miami with 12+ years of ecommerce experience, specializing in Shopify Plus, Hydrogen, and conversion-optimized storefronts for DTC brands.',
    },
    {
      question: 'What do you specialize in?',
      answer:
        'Shopify Plus theme development, headless commerce with Hydrogen and Next.js, Checkout Extensibility and Shopify Functions, subscription and bundle flows with Recharge, A/B testing, CRO, and performance optimization.',
    },
    {
      question: 'Are you a freelancer or an agency?',
      answer:
        "I'm an independent Senior Shopify Expert: you get senior-level hands on every project, with trusted specialists added only when scope requires it.",
    },
    {
      question: 'Which brands have you worked with?',
      answer: `Recent clients include ${(clients || [])
        .slice(0, 10)
        .map((c) => c.name)
        .join(', ')}, plus several other DTC brands.`,
    },
    {
      question: 'Where are you based?',
      answer: 'Miami, Florida, USA — I work remotely with brands worldwide.',
    },
  ]

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return {
    blocks: [person, service, website, breadcrumb, portfolio, clientList, faq],
    faqData,
  }
}

export function HomePage({ data }) {
  const {
    profile,
    socials,
    about,
    stats,
    heroStats,
    statsStrip,
    skills,
    asideChips,
    clients,
    projects,
  } = data

  const { blocks, faqData } = structuredDataBlocks({
    profile,
    socials,
    projects,
    clients,
    skills,
  })

  return (
    <>
      {blocks.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
        >
          {JSON.stringify(data).replace(/</g, '\\u003c')}
        </script>
      ))}
      <TopBar />
      <main className="pt-[72px]">
        <HeroSection profile={profile} heroStats={heroStats} />
        <MarqueeSection clients={clients} />
        <AboutSection
          profile={profile}
          about={about}
          clients={clients}
          projects={projects}
          socials={socials}
          stats={stats}
        />
        <ClientsSection clients={clients} />
        <StatsStrip statsStrip={statsStrip} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} asideChips={asideChips} />
        <TestimonialsSection />
        <FaqSection faqData={faqData} />
        <SocialSection profile={profile} socials={socials} />
      </main>
    </>
  )
}

export default HomePage
