import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // 支持局域网访问
    host: true,
    // 自动打开浏览器
    open: true,
    // 代理配置
    proxy: {
      '/api': {
        target: 'https://test-admin-api.gooddrama.cc/api/',
        // target: 'https://admin-api.gooddrama.cc/api/',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
