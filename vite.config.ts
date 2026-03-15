/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Using '/AlOsaimi_Blot/' for GitHub Pages deployment
export default defineConfig(({ command }) => ({
  base: '/AlOsaimi_Blot/',
  plugins: [react()],
  build: {
    // Use default esbuild for minification (fast and efficient)
    minify: 'esbuild',
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // No source maps in production
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  // Drop console in production via esbuild
  esbuild: {
    drop: command === 'build' ? ['console', 'debugger'] : [],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    css: true,
  },
}));
