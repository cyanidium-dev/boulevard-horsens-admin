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
      name: 'image',
      title: 'Зображення картки',
      description: 'Фото для банера. Підтримує hotspot для центрування.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-текст',
          type: 'string',
        }),
      ],
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
      media: 'image',
    },
    prepare({amount, description, popular, media}) {
      return {
        title: `${amount} kr`,
        subtitle: popular ? `★ ${description}` : description,
        media,
      }
    },
  },
})
