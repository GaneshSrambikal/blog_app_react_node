import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// const proxy =
//   import.meta.env.NODE_ENV === 'development'
//     ? 'http://localhost:5000'
//     : 'https://blog-app-react-node.vercel.app';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: 'dist', // ensures the build output goes to 'dist'
  // },
  base: '/',
  // server: {
  //   proxy: {
  //     '/api': 'https://blog-app-react-node.vercel.app',
  //   },
  // },
});
