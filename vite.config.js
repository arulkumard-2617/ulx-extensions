import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Relative base so dist works when uploaded / served from an iframe path
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-app',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
