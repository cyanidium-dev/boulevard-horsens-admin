import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Команда',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: "Ім'я",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Посада',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Посилання',
      description:
        'Необовʼязково: повний URL (наприклад профіль у соцмережах) або відносний шлях на сайті.',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Порядок в списку',
      description: 'Менше число показується вище в списку.',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
  },
})
