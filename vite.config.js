import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../static', // static folder outside src
  server: { open: true },
})
