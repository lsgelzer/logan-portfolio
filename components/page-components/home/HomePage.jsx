import TopBar from '@/components/layout/topbar'
import AboutSection from '@/components/sections/about-section/about-section'
import ClientsSection from '@/components/sections/clients-section/clients-section'
import HeroSection from '@/components/sections/hero-section/hero-section'
import MarqueeSection from '@/components/sections/marquee-section/marquee-section'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import SkillsSection from '@/components/sections/skills-section/skills-section'
import SocialSection from '@/components/sections/social-section/social-section'
import StatsStrip from '@/components/sections/stats-strip/stats-strip'

function structuredDataBlocks({ profile, socials, projects }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
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
    image: `${profile.url}/portfolio/logan-author.png`,
    sameAs: (socials || [])
      .filter((s) => s.url && !s.url.startsWith('mailto:'))
      .map((s) => s.url),
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
    name: `${profile.name} — Shopify Development`,
    url: profile.url,
    areaServed: 'Worldwide',
    provider: { '@type': 'Person', name: profile.name },
    serviceType: 'Shopify Development, Ecommerce Consulting',
    description:
      'Freelance Shopify Plus, Hydrogen, and custom theme development, plus CRO for direct-to-consumer brands.',
  }
  const portfolio = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Recent Projects',
    itemListElement: (projects || []).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        about: (p.tags || []).join(', '),
        url: p.url,
        temporalCoverage: p.years,
      },
    })),
  }
  return [person, service, portfolio]
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

  const blocks = structuredDataBlocks({ profile, socials, projects })

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
