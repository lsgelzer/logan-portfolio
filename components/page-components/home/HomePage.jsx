import Script from 'next/script'

import TopBar from '@/components/layout/topbar'
import AboutSection from '@/components/sections/about-section/about-section'
import ClientsSection from '@/components/sections/clients-section/clients-section'
import HeroSection from '@/components/sections/hero-section/hero-section'
import MarqueeSection from '@/components/sections/marquee-section/marquee-section'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import SkillsSection from '@/components/sections/skills-section/skills-section'
import SocialSection from '@/components/sections/social-section/social-section'
import StatsStrip from '@/components/sections/stats-strip/stats-strip'
import { PROFILE, PROJECTS, SOCIALS } from '@/lib/portfolio-data'

function structuredDataBlocks() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    url: PROFILE.url,
    email: `mailto:${PROFILE.email}`,
    jobTitle: 'Shopify Expert & Ecommerce Developer',
    description:
      'Miami-based freelance Shopify and ecommerce developer with 12+ years scaling direct-to-consumer brands — specializing in Shopify Plus, Hydrogen, custom theme development, and conversion optimization.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    image: `${PROFILE.url}/portfolio/logan-author.png`,
    sameAs: SOCIALS.filter((s) => !s.url.startsWith('mailto:')).map(
      (s) => s.url,
    ),
    knowsAbout: [
      'Shopify',
      'Shopify Plus',
      'Shopify Hydrogen',
      'Shopify Liquid',
      'Headless Commerce',
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'Remix',
      'Figma',
      'UI/UX Design',
      'Conversion Rate Optimization',
      'A/B Testing',
      'Ecommerce',
    ],
  }
  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${PROFILE.name} — Shopify Development`,
    url: PROFILE.url,
    areaServed: 'Worldwide',
    provider: { '@type': 'Person', name: PROFILE.name },
    serviceType: 'Shopify Development, Ecommerce Consulting',
    description:
      'Freelance Shopify Plus, Hydrogen, and custom theme development, plus CRO for direct-to-consumer brands.',
  }
  const portfolio = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Recent Projects',
    itemListElement: PROJECTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        about: p.tags.join(', '),
        url: p.url,
        temporalCoverage: p.years,
      },
    })),
  }
  return [person, service, portfolio]
}

export function HomePage() {
  const blocks = structuredDataBlocks()
  return (
    <>
      {blocks.map((data, i) => (
        <Script
          key={i}
          id={`jsonld-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(data)}
        </Script>
      ))}
      <TopBar />
      <main className="pt-[72px]">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ClientsSection />
        <StatsStrip />
        <ProjectsSection />
        <SkillsSection />
        <SocialSection />
      </main>
    </>
  )
}

export default HomePage
