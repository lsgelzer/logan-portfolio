import TopBar from '@/components/layout/topbar'
import AboutSection from '@/components/sections/about-section/about-section'
import ClientsSection from '@/components/sections/clients-section/clients-section'
import HeroSection from '@/components/sections/hero-section/hero-section'
import MarqueeSection from '@/components/sections/marquee-section/marquee-section'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import SkillsSection from '@/components/sections/skills-section/skills-section'
import SocialSection from '@/components/sections/social-section/social-section'
import StatsStrip from '@/components/sections/stats-strip/stats-strip'

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
    jobTitle: 'Shopify Expert & Ecommerce Developer',
    description:
      'Miami-based freelance Shopify and ecommerce developer with 12+ years scaling direct-to-consumer brands — specializing in Shopify Plus, Hydrogen, custom theme development, and conversion optimization.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    image: `${profile.url}/portfolio/logan-author-headshot.png`,
    sameAs: (socials || [])
      .filter((s) => s.url && !s.url.startsWith('mailto:'))
      .map((s) => s.url),
    knowsAbout: [
      'Shopify',
      'Shopify Plus',
      'Shopify Hydrogen',
      'Shopify Liquid',
      'Shopify Functions',
      'Checkout Extensibility',
      'Headless Commerce',
      'Builder.io',
      'React',
      'Next.js',
      'Remix',
      'Node.js',
      'TypeScript',
      'Tailwind CSS',
      'Figma',
      'UI/UX Design',
      'Conversion Rate Optimization',
      'A/B Testing',
      'Core Web Vitals',
      'Ecommerce',
      'Direct-to-consumer',
      'Recharge Subscriptions',
      'Klaviyo',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Freelance Shopify Developer',
      occupationLocation: {
        '@type': 'City',
        name: 'Miami',
      },
      skills: (skills || []).map((s) => s.name).join(', '),
    },
    workLocation: {
      '@type': 'Place',
      name: 'Miami, Florida',
    },
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': serviceId,
    name: `${profile.name} — Shopify Development`,
    url: profile.url,
    areaServed: [
      { '@type': 'Place', name: 'Worldwide' },
      { '@type': 'Country', name: 'United States' },
    ],
    provider: { '@id': personId },
    founder: { '@id': personId },
    serviceType: 'Shopify Development, Ecommerce Consulting',
    description:
      'Freelance Shopify Plus, Hydrogen, and custom theme development, plus CRO for direct-to-consumer brands.',
    priceRange: '$$$',
    image: `${profile.url}/og-image.png`,
    knowsLanguage: 'English',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
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

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Logan Gelzer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Logan Gelzer is a Miami-based freelance Shopify developer and UI/UX designer with 12+ years of ecommerce experience, specializing in Shopify Plus, Hydrogen, and conversion-optimized storefronts for DTC brands.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does Logan specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shopify Plus theme development, headless commerce with Hydrogen and Next.js, checkout extensibility, subscription/bundle experiences with Recharge, A/B testing, CRO, and performance optimization for direct-to-consumer brands.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Logan available for freelance work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Logan is currently available for freelance engagements. Contact ${profile.email} to start a project.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Which brands has Logan worked with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Recent clients include ${(clients || [])
            .slice(0, 10)
            .map((c) => c.name)
            .join(', ')}, plus several other DTC brands.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Logan based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Miami, Florida, USA — working remotely with brands worldwide.',
        },
      },
    ],
  }

  return [person, service, website, breadcrumb, portfolio, clientList, faq]
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

  const blocks = structuredDataBlocks({
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
        <SocialSection profile={profile} socials={socials} />
      </main>
    </>
  )
}

export default HomePage
