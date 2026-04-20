import {defineField, defineType} from 'sanity'

const HOME_PAGE_SEO_TITLE = 'SEO для головної сторінки'

export const homePageSeo = defineType({
  name: 'homePageSeo',
  title: HOME_PAGE_SEO_TITLE,
  type: 'document',
  initialValue: {
    title: HOME_PAGE_SEO_TITLE,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: HOME_PAGE_SEO_TITLE,
    }),
    defineField({
      name: 'seo',
      type: 'seoSettings',
      title: 'SEO блок',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || HOME_PAGE_SEO_TITLE,
      }
    },
  },
})
