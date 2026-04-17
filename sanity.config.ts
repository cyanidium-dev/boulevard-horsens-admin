import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'boulevard-admin',

  projectId: '8nzg1eu4',
  dataset: 'production',

  plugins: [
    table(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.listItem()
              .title('Статті блогу')
              .schemaType('blogPost')
              .child(
                S.documentList()
                  .title('Статті блогу')
                  .filter('_type == "blogPost"')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
              ),
            S.listItem()
              .title('Послуги')
              .schemaType('service')
              .child(
                S.documentList()
                  .title('Послуги')
                  .filter('_type == "service"')
                  .defaultOrdering([{field: 'title', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Команда')
              .schemaType('teamMember')
              .child(
                S.documentList()
                  .title('Команда')
                  .filter('_type == "teamMember"')
                  .defaultOrdering([
                    {field: 'order', direction: 'asc'},
                    {field: 'name', direction: 'asc'},
                  ]),
              ),
            S.listItem()
              .id('homeFaq')
              .title('FAQ для головної сторінки')
              .child(
                S.editor()
                  .id('homeFaq')
                  .title('FAQ для головної сторінки')
                  .schemaType('homeFaq')
                  .documentId('homeFaq'),
              ),
            S.listItem()
              .id('servicesFaq')
              .title('FAQ для сторінки послуг')
              .child(
                S.editor()
                  .id('servicesFaq')
                  .title('FAQ для сторінки послуг')
                  .schemaType('servicesFaq')
                  .documentId('servicesFaq'),
              ),
            S.listItem()
              .id('workingHours')
              .title('Години роботи')
              .child(
                S.editor()
                  .id('workingHours')
                  .title('Години роботи')
                  .schemaType('workingHours')
                  .documentId('workingHours'),
              ),
          ]),
    }),
    visionTool(),
  ],

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            !['homeFaq', 'servicesFaq', 'workingHours'].includes(templateItem.templateId),
        )
      }
      return prev
    },
    actions: (prev, context) => {
      if (['homeFaq', 'servicesFaq', 'workingHours'].includes(context.schemaType)) {
        return prev.filter(({action}) => action !== 'duplicate')
      }
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
