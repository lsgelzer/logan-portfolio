import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const ICON_OPTIONS = [
  'shopify',
  'react',
  'nextjs',
  'liquid',
  'figma',
  'node',
  'postgres',
  'mongodb',
  'remix',
  'ab',
  'bolt',
  'cart',
  'layers',
  'spark',
  'palette',
  'javascript',
  'typescript',
  'wordpress',
  'bigcommerce',
  'git',
  'tailwind',
  'code',
]

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'client',
      title: 'Project Name',
      type: 'string',
      description: 'Usually the client name — displayed as the project title.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show first. 1–99.',
    }),
    defineField({
      name: 'site',
      title: 'Site URL',
      type: 'url',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
    }),
    defineField({
      name: 'present',
      title: 'Currently active?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Phone Mockup)',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'clientImage',
      title: 'Client Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'stack',
      title: 'Tech Stack Icons',
      description:
        'Icon names shown on the project card. Pick 3–4 most relevant.',
      type: 'array',
      of: [
        {
          type: 'string',
          options: { list: ICON_OPTIONS },
        },
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview / Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
            annotations: [],
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'client', media: 'clientImage' },
  },
})
