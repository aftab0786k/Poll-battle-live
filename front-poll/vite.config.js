// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true
//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://poll-battle-live-7ja4.vercel.app',
        ws: true, // Enable WebSocket proxying
        changeOrigin: true,
      },
      '/api': {
        target: 'https://poll-battle-live-7ja4.vercel.app',
        changeOrigin: true,
      },
    },
  },
})