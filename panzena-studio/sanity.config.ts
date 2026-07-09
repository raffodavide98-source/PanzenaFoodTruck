import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// projectId e dataset arrivano da variabili d'ambiente lette da
// sanity.cli.ts / .env — non vanno scritti qui direttamente.
export default defineConfig({
  name: 'panzena-studio',
  title: 'Panzena — pannello di gestione',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
