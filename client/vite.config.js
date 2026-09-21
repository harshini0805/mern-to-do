import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Forward /api/* calls to the Express server, so no CORS or hard-coded URLs in components
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
