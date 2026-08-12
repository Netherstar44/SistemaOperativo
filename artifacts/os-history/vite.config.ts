import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const cwd = process.cwd();
const currentDir = (cwd.endsWith('os-history') || cwd.endsWith('os-history/'))
  ? cwd
  : path.resolve(cwd, 'artifacts/os-history');

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(currentDir, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: currentDir,
  build: {
    outDir: path.resolve(currentDir, 'dist'),
    // Do NOT empty outDir — we commit entrypoint stubs there so Vercel can find them
    emptyOutDir: false,
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    host: '0.0.0.0',
    fs: {
      strict: true,
    },
  },
  preview: {
    port: Number(process.env.PREVIEW_PORT) || 4173,
    host: '0.0.0.0',
  },
});
