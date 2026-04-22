import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Clients',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'site', title: 'Site URL', type: 'url' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({
      name: 'invert',
      title: 'Invert dark logo?',
      type: 'boolean',
      description:
        'Check if the logo is dark/black and needs inverting on dark backgrounds.',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Alternative text for screen readers.',
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
  preview: { select: { title: 'client', media: 'image' } },
})
