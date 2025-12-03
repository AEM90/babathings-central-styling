import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'BabaThingsCentralStyling',
      fileName: (format) => `babathings-central-styling.${format}.js`
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ['vue'],
      output: {
        // Provide global variables to use in UMD build
        globals: {
          vue: 'Vue'
        },
        // Ensure CSS is named consistently for easy CDN reference
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name;
        }
      }
    },
    cssCodeSplit: false
  }
});
