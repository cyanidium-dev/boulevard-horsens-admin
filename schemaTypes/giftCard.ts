import {defineField, defineType} from 'sanity'

export const giftCard = defineType({
  name: 'giftCard',
  title: 'Подарунковий сертифікат',
  type: 'document',
  fields: [
    defineField({
      name: 'amount',
      title: 'Номінал (DKK)',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      description: 'Коротке речення — наприклад «Mest populære valg».',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'gradient',
      title: 'Дизайн картки',
      description: 'Градієнт банера на картці.',
      type: 'string',
      options: {
        list: [
          {title: 'Світлий беж', value: 'light'},
          {title: 'Карамель', value: 'caramel'},
          {title: 'Темний', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'popular',
      title: 'Позначка «Mest populære»',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'primary',
      title: 'Виділена кнопка (чорна)',
      description: 'Якщо вимкнено — кнопка з контурним стилем.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'stripeCheckoutUrl',
      title: 'Stripe Checkout посилання',
      description:
        'Готове посилання Stripe Payment Link (напр. https://buy.stripe.com/…). Кнопка «Køb» веде на нього.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({scheme: ['https'], allowRelative: false}),
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID (опційно)',
      description: 'Якщо використовуєте власний checkout-API замість Payment Link.',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Порядок в списку',
      description: 'Менше число показується ліворуч.',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      amount: 'amount',
      description: 'description',
      popular: 'popular',
    },
    prepare({amount, description, popular}) {
      return {
        title: `${amount} kr`,
        subtitle: popular ? `★ ${description}` : description,
      }
    },
  },
})
