import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'duration',
  title: 'Duration',
  type: 'object',
  fields: [
    defineField({ name: 'start', title: 'Start', type: 'date' }),
    defineField({ name: 'end', title: 'End', type: 'date' }),
  ],
})
