import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VueRouter({
      exclude: ['**/components/**'],
      dts: 'src/types/typed-router.d.ts'
    }),

    Vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
        'pinia',
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
        {
          yup: [
            ['*', 'yup'],
          ],
        },
        {
          '~/api/generated': [['*', 'api']]
        }
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/composables/*/index.{ts,tsx}', // 导入子目录的 index.ts/tsx 文件
        'src/stores/**',
        'src/stores/*/*.ts'
      ],
      vueTemplate: true,
    }),
  ],
})
