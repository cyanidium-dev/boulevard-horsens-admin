import {defineField, defineType} from 'sanity'

/** До / після — на фронті розпізнавати за `_type === 'resultsBeforeAfterCard'`. */
export const resultsBeforeAfterCard = defineType({
  name: 'resultsBeforeAfterCard',
  title: 'Картка: до / після',
  type: 'object',
  fields: [
    defineField({
      name: 'beforeImage',
      title: 'До',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Альтернативний текст',
          type: 'string',
          description: 'Для доступності та SEO',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'Після',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Альтернативний текст',
          type: 'string',
          description: 'Для доступності та SEO',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      before: 'beforeImage',
      after: 'afterImage',
    },
    prepare({before, after}) {
      return {
        title: 'До / після',
        subtitle: 'resultsBeforeAfterCard',
        media: after || before,
      }
    },
  },
})
