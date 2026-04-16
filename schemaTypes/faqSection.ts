import {defineArrayMember, defineField, defineType} from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      type: 'text',
      title: 'Опис',
      rows: 3,
      description: 'Коротке пояснення або вступ до блоку FAQ',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Питання та відповіді',
      description: 'Додайте одне або кілька питань з відповідями',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'Питання',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Питання',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              title: 'Відповідь',
              description: 'Текст відповіді (можна додати перенос рядків)',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              answer: 'answer',
            },
            prepare({title, answer}) {
              return {
                title: title || 'Питання без заголовка',
                subtitle: answer ? 'FAQ елемент' : 'Порожня відповідь',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'FAQ',
        subtitle: `Питань: ${count}`,
      }
    },
  },
})
