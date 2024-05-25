import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // ↓ 追記
    alias: {
      '@/': `${__dirname}/src/` // path.join(__dirname, "src/") でも可
    }
    // alias: [
    //   { find: "~/", replacement: `${__dirname}/src/` }
    // ],
  }
})
