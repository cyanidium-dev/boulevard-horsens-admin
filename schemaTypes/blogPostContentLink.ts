import {defineField, defineType} from 'sanity'

/**
 * Окремий блок посилання в тілі статті: той самий URL і підпис,
 * на фронті — або кнопка, або звичайне текстове посилання.
 */
export const blogPostContentLink = defineType({
  name: 'blogPostContentLink',
  title: 'Посилання (кнопка або текст)',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Текст посилання',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      description:
        'Відносний шлях ("/contact") або повний URL ("https://...").',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blank',
      title: 'Відкривати в новій вкладці',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayAs',
      title: 'Як показувати',
      type: 'string',
      options: {
        list: [
          {title: 'Кнопка', value: 'button'},
          {title: 'Текстове посилання', value: 'text'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonVariant',
      title: 'Стиль кнопки',
      description: 'Застосовується лише для відображення кнопкою.',
      type: 'string',
      options: {
        list: [
          {value: 'primary', title: 'Основна (заповнена)'},
          {value: 'outline', title: 'Контурна'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
      hidden: ({parent}) => parent?.displayAs !== 'button',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      href: 'href',
      displayAs: 'displayAs',
    },
    prepare({
      label,
      href,
      displayAs,
    }: {
      label?: string
      href?: string
      displayAs?: string
    }) {
      const mode = displayAs === 'button' ? 'кнопка' : 'текст'
      return {
        title: label || 'Посилання',
        subtitle: href ? `${href} · ${mode}` : `— · ${mode}`,
      }
    },
  },
})
