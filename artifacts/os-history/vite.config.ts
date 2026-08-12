import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

function vercelEntrypointPlugin() {
  return {
    name: 'vercel-entrypoint-plugin',
    closeBundle() {
      const distPath = path.resolve(import.meta.dirname, 'dist');
      const entryPath = path.join(distPath, 'index.js');
      
      const serverCode = `const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const url = (req.url || '/').split('?')[0];
  let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
  };

  try {
    const data = fs.readFileSync(filePath);
    res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
    res.statusCode = 200;
    res.end(data);
  } catch (err) {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.end(html);
  }
};
`;
      fs.writeFileSync(entryPath, serverCode);
    }
  };
}

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    vercelEntrypointPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
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
