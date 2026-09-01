import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'tour-cms',

  projectId: 'lpgl0cqt',   // ✅ NEW PROJECT ID
  dataset: 'production',   // ✅ SAME DATASET

  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})