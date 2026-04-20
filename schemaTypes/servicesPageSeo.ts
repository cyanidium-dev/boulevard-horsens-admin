import {defineField, defineType} from 'sanity'

const SERVICES_PAGE_SEO_TITLE = 'SEO для сторінки послуг'

export const servicesPageSeo = defineType({
  name: 'servicesPageSeo',
  title: SERVICES_PAGE_SEO_TITLE,
  type: 'document',
  initialValue: {
    title: SERVICES_PAGE_SEO_TITLE,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: SERVICES_PAGE_SEO_TITLE,
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
        title: title || SERVICES_PAGE_SEO_TITLE,
      }
    },
  },
})
