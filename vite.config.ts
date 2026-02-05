import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Using '/' as base since we have a custom domain (aalosaimi.com)
export default defineConfig(({ command }) => ({
  base: '/',
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
}));
