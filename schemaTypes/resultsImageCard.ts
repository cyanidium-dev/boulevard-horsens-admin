import {defineField, defineType} from 'sanity'

/** Одна картинка — на фронті розпізнавати за `_type === 'resultsImageCard'`. */
export const resultsImageCard = defineType({
  name: 'resultsImageCard',
  title: 'Картка: одне зображення',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Зображення',
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
      media: 'image',
    },
    prepare({media}) {
      return {
        title: 'Одне зображення',
        subtitle: 'resultsImageCard',
        media,
      }
    },
  },
})
