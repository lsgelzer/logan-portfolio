import Link from 'next/link'

import HeroSection from '@/components/sections/hero-section/hero-section'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import SocialSection from '@/components/sections/social-section/social-section'
import ThreeDMarqueeSection from '@/components/sections/threed-marquee-section/threed-marquee-section'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { loadProjects } from '@/sanity/loader/loadQuery'

export async function HomePage({ data, encodeDataAttribute }) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '' } = data ?? {}
  const projects = await loadProjects()
  return (
    <>
      <HeroSection />
      <ThreeDMarqueeSection />
      <ProjectsSection projects={projects} />
      <SocialSection />
    </>
  )
}

export default HomePage
