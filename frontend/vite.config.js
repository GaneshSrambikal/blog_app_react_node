import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ensures the build output goes to 'dist'
  },
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
