import {defineArrayMember, defineField, defineType} from 'sanity'

const RESULTS_DOCUMENT_TITLE = 'Слайдер Results для головної сторінки'

export const results = defineType({
  name: 'results',
  title: RESULTS_DOCUMENT_TITLE,
  type: 'document',
  initialValue: {
    title: RESULTS_DOCUMENT_TITLE,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: RESULTS_DOCUMENT_TITLE,
    }),
    defineField({
      name: 'cards',
      title: 'Картки слайдера',
      type: 'array',
      description: 'Додайте картки слайдера',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({type: 'resultsImageCard'}),
        defineArrayMember({type: 'resultsBeforeAfterCard'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cards: 'cards',
    },
    prepare({title, cards}) {
      const n = Array.isArray(cards) ? cards.length : 0
      return {
        title: title || RESULTS_DOCUMENT_TITLE,
        subtitle: `Карток: ${n}`,
      }
    },
  },
})
