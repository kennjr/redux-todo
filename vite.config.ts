import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // we add the line below to change the default dev port from 5173 to 3000
  server: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000', 
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\, ''),
    //   }
    // }
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
