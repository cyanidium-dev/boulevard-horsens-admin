import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Послуга',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Формується автоматично з заголовка; можна відредагувати вручну.',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]+/gu, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homePageImage',
      title: 'Зображення для головної сторінки',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicesPageImageMobile',
      title: 'Зображення для сторінки послуг (мобільна версія)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicesPageImageDesktop',
      title: 'Зображення для сторінки послуг (десктоп)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'button',
      title: 'Кнопка',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'label',
          title: 'Назва кнопки',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Посилання',
          type: 'url',
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
    defineField({
      name: 'desktopImageSide',
      title: 'Розташування зображення на сторінці «Послуги» (десктоп)',
      description: 'Зліва або справа від тексту на великому екрані.',
      type: 'string',
      options: {
        list: [
          {title: 'Зліва', value: 'left'},
          {title: 'Справа', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'homePageImage',
    },
  },
})
