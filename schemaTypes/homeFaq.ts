import {defineField, defineType} from 'sanity'

export const homeFaq = defineType({
  name: 'homeFaq',
  title: 'FAQ для головної сторінки',
  type: 'document',
  initialValue: {
    title: 'FAQ для головної сторінки',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ',
      type: 'faqSection',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'faqSection.items',
    },
    prepare({title, items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'FAQ для головної сторінки',
        subtitle: `Питань: ${count}`,
      }
    },
  },
})
