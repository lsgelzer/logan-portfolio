import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'site', title: 'Site / SEO', default: true },
    { name: 'profile', title: 'Profile' },
    { name: 'about', title: 'About' },
    { name: 'stats', title: 'Stats' },
    { name: 'skills', title: 'Skills' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'site',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'overview',
      title: 'SEO Description',
      type: 'array',
      group: 'site',
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
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'site',
      options: { hotspot: true },
    }),

    defineField({
      name: 'profile',
      title: 'Profile',
      type: 'object',
      group: 'profile',
      fields: [
        defineField({ name: 'name', title: 'Full Name', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'url', title: 'Website URL', type: 'url' }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({
          name: 'roles',
          title: 'Role chips',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        }),
      ],
    }),

    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      group: 'profile',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'social',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({
              name: 'handle',
              title: 'Display / Handle',
              type: 'string',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'handle' } },
        }),
      ],
    }),

    defineField({
      name: 'about',
      title: 'About Paragraphs',
      type: 'array',
      group: 'about',
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

    defineField({
      name: 'stats',
      title: 'About Stats (terminal)',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'k', title: 'Value', type: 'string' }),
            defineField({ name: 'v', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'k', subtitle: 'v' } },
        }),
      ],
    }),

    defineField({
      name: 'heroStats',
      title: 'Hero Stats Row',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroStat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    defineField({
      name: 'statsStrip',
      title: 'Big Stats Strip',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statsStripItem',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'skills',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'skill',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'years', title: 'Years', type: 'number' }),
            defineField({
              name: 'pct',
              title: 'Proficiency %',
              type: 'number',
              validation: (r) => r.min(0).max(100),
            }),
            defineField({
              name: 'group',
              title: 'Group',
              type: 'string',
              options: { list: ['ecom', 'code', 'design', 'data'] },
            }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'years' } },
        }),
      ],
    }),

    defineField({
      name: 'asideChips',
      title: 'Skills Aside Chips',
      type: 'array',
      group: 'skills',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'asideChip',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'icon' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
