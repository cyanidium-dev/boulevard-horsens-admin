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
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
