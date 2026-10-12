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
  const orgId = `${profile.url}/#org`
  const personId = `${profile.url}/#person`
  const serviceId = `${profile.url}/#service`
  const websiteId = `${profile.url}/#website`

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: 'Logan Gelzer',
    alternateName: 'Logan Gelzer Shopify Development',
    url: profile.url,
    logo: `${profile.url}/icon.png`,
    image: `${profile.url}/og-image.png`,
    email: profile.email,
    founder: { '@id': personId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: ['US', 'Worldwide'],
    sameAs: [
      'https://www.linkedin.com/in/logan-gelzer/',
      'https://github.com/lsgelzer',
      'https://x.com/logangelzer',
      'https://www.instagram.com/logangelzer',
    ],
  }

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    givenName: 'Logan',
    familyName: 'Gelzer',
    url: `${profile.url}/about`,
    email: `mailto:${profile.email}`,
    jobTitle: 'Shopify Plus & Hydrogen Developer',
    worksFor: { '@id': orgId },
    description:
      'Senior Shopify Plus and Hydrogen developer with 12+ years building ecommerce for DTC brands — specializing in custom themes, headless storefronts, Checkout Extensibility, and CRO.',
    homeLocation: { '@type': 'Place', name: 'Miami, Florida' },
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
    name: 'Logan Gelzer: Shopify Plus Development',
    url: profile.url,
    image: `${profile.url}/og-image.png`,
    email: profile.email,
    priceRange: '$$$',
    parentOrganization: { '@id': orgId },
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
    publisher: { '@id': orgId },
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
        'Engagements start at $100/hr with a $1,000 minimum project size. Logan Gelzer is a Shopify Plus studio led by a senior developer, so you work directly with the person writing the code. Most projects are scoped up front after a short technical discovery, and ongoing retainers are available.',
    },
    {
      question: 'Who is Logan Gelzer?',
      answer:
        'Logan Gelzer is a Shopify Plus studio led by a senior developer, based in Miami with 12+ years of ecommerce experience, specializing in Shopify Plus, Hydrogen, and conversion-optimized storefronts for DTC brands.',
    },
    {
      question: 'What does Logan specialize in?',
      answer:
        'Shopify Plus theme development, headless commerce with Hydrogen and Next.js, Checkout Extensibility and Shopify Functions, subscription and bundle flows with Recharge and Shopify Scripts, A/B testing, CRO, and performance optimization.',
    },
    {
      question: 'Are you a freelancer or an agency?',
      answer:
        'Logan Gelzer is a Shopify Plus studio led by a senior developer: you get senior-level hands on every project, with trusted specialists added only when scope requires it.',
    },
    {
      question: 'Which brands has Logan worked with?',
      answer: `Recent clients include ${(clients || [])
        .slice(0, 10)
        .map((c) => c.name)
        .join(', ')}, plus several other DTC brands.`,
    },
    {
      question: 'Where is Logan based?',
      answer: 'Miami, Florida, USA — working remotely with brands worldwide.',
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
    blocks: [organization, person, service, website, breadcrumb, portfolio, clientList, faq],
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
