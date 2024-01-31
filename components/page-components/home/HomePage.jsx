import Link from 'next/link'

import HeroSection from '@/components/sections/hero-section/hero-section'
import ImageTextSection from '@/components/sections/image-text-section/image-text-section'
import ThreeDMarqueeSection from '@/components/sections/threed-marquee-section/threed-marquee-section'
import { resolveHref } from '@/sanity/lib/utils'

import { ProjectListItem } from './ProjectListItem'

export function HomePage({ data, encodeDataAttribute }) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '' } = data ?? {}

  return (
    <div>
      {/* Showcase projects */}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
      <HeroSection />
      <ThreeDMarqueeSection />
    </div>
  )
}

export default HomePage
