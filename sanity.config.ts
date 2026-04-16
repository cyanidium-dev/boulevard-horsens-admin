import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'boulevard-admin',

  projectId: '8nzg1eu4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
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
        return prev.filter((templateItem) => templateItem.templateId !== 'workingHours')
      }
      return prev
    },
    actions: (prev, context) => {
      if (context.schemaType === 'workingHours') {
        return prev.filter(({action}) => action !== 'duplicate')
      }
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
