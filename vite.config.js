import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path' // 主要用于alias文件路径别名
import path from 'path'


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
        less: {
            // modifyVars: {
            //     hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
            // },
            javascriptEnabled: true,
        },
    },
},
})
