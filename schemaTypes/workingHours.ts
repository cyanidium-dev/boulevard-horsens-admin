import {defineField, defineType} from 'sanity'
import {TimeInput} from './components/TimeInput'

const timeValidationMessage = 'Вкажіть час у форматі HH:mm, наприклад 09:00'

export const workingHours = defineType({
  name: 'workingHours',
  title: 'Години роботи',
  type: 'document',
  initialValue: {
    title: 'Години роботи',
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
      name: 'from',
      title: 'Час від',
      type: 'string',
      components: {
        input: TimeInput,
      },
      validation: (Rule) =>
        Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: 'time',
          invert: false,
        }).error(timeValidationMessage),
    }),
    defineField({
      name: 'to',
      title: 'Час до',
      type: 'string',
      components: {
        input: TimeInput,
      },
      validation: (Rule) =>
        Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
          name: 'time',
          invert: false,
        }).error(timeValidationMessage),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      from: 'from',
      to: 'to',
    },
    prepare({title, from, to}) {
      return {
        title: title || 'Години роботи',
        subtitle: from && to ? `${from} - ${to}` : 'Вкажіть час роботи',
      }
    },
  },
})
