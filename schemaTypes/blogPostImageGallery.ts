import {defineField, defineType} from 'sanity'

/** Блок у тілі статті: кілька зображень з alt (як у monopools imageGallery), одна мова. */
export const blogPostImageGallery = defineType({
  name: 'blogPostImageGallery',
  title: 'Галерея зображень',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Зображення',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Альтернативний текст',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {images: 'images'},
    prepare({images}: {images?: unknown[]}) {
      const count = images?.length ?? 0
      return {title: `Галерея (${count} зображ.)`}
    },
  },
})
