import {defineField, defineType} from 'sanity'

export const servicesFaq = defineType({
  name: 'servicesFaq',
  title: 'FAQ для сторінки послуг',
  type: 'document',
  initialValue: {
    title: 'FAQ для сторінки послуг',
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
        title: title || 'FAQ для сторінки послуг',
        subtitle: `Питань: ${count}`,
      }
    },
  },
})
