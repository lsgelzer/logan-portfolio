import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioUrl } from './sanity/env'
import { schemaTypes } from './sanity/schemas'

const SINGLETONS = ['settings']

export default defineConfig({
  name: 'logan-portfolio',
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Logan's Portfolio",
  projectId,
  dataset,
  basePath: studioUrl,
  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? input.filter(
            ({ action }) =>
              !['duplicate', 'delete', 'unpublish'].includes(action),
          )
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter(({ templateId }) => !SINGLETONS.includes(templateId))
        : prev,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document().schemaType('settings').documentId('settings'),
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('client').title('Clients'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
