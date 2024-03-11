/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { client } from '@/sanity/lib/client'
import { locate } from '@/sanity/plugins/locate'
import { singletonPlugin } from '@/sanity/plugins/settings'
import clientSchema from '@/sanity/schemas/documents/clients'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import settings from '@/sanity/schemas/singletons/settings'

import ProjectCard from './components/sections/projects-section/project-card'
import { projectsQuery } from './sanity/lib/queries'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Logan's Portfolio"

const projectsPreview = async ({ document }) => {
  const projects = await client.fetch(projectsQuery)
  const projectMatch = projects.find((p) => p._id === document.displayed._id)
  return (
    <div
      style={{ width: '600px' }}
      className="swiper slide swiper-slide-active relative"
    >
      <ProjectCard project={projectMatch} />
    </div>
  )
}
export const defaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'project') {
    return S.document().views([
      S.view.form(),
      S.view.component(projectsPreview).title('Preview'),
    ])
  }
}

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      settings,
      // Documents
      clientSchema,
      duration,
      project,
    ],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentListItem().id('settings').schemaType('settings'),
            S.documentTypeListItem('client'),
            S.documentTypeListItem('project'),
          ]),
      defaultDocumentNode: defaultDocumentNodeResolver,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton

    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
