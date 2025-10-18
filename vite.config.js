import { defineConfig } from 'vite'

export default defineConfig({
  root: './',       // Make sure root points to project root where index.html is
  build: {
    outDir: 'dist'
  }
})
