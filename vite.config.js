import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ['@reduxjs/toolkit'], // Add other external dependencies as needed
  //   },
  // },
  // resolve: {
  //   alias: {
  //     '@reduxjs/toolkit': '@reduxjs/toolkit',
  //   },
  // },
  // other configurations...
});
