#!/usr/bin/env node
/**
 * post-build.cjs
 * Writes all Vercel Node.js entrypoint variants to the dist folder.
 * Called explicitly after `vite build` in the Vercel buildCommand.
 */

const fs = require('fs');
const path = require('path');

// Resolve dist dir relative to THIS script — works regardless of cwd
const scriptDir = __dirname; // artifacts/os-history/scripts/
const distDir = path.resolve(scriptDir, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error(`[post-build] ERROR: dist dir not found at ${distDir}`);
  process.exit(1);
}

const esmCode = `import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  const url = (req.url || '/').split('?')[0];
  let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.webp': 'image/webp',
  };

  try {
    const data = fs.readFileSync(filePath);
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
    res.statusCode = 200;
    res.end(data);
  } catch {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.end(html);
  }
}
`;

const cjsCode = `const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const url = (req.url || '/').split('?')[0];
  let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.webp': 'image/webp',
  };

  try {
    const data = fs.readFileSync(filePath);
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
    res.statusCode = 200;
    res.end(data);
  } catch {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.end(html);
  }
};
`;

const esmFiles = ['index.js', 'index.mjs', 'app.js', 'app.mjs', 'server.js', 'server.mjs'];
const cjsFiles = ['index.cjs', 'app.cjs', 'server.cjs'];

esmFiles.forEach(f => fs.writeFileSync(path.join(distDir, f), esmCode));
cjsFiles.forEach(f => fs.writeFileSync(path.join(distDir, f), cjsCode));

console.log(`[post-build] Wrote entrypoints to ${distDir}:`);
console.log([...esmFiles, ...cjsFiles].map(f => `  - ${f}`).join('\n'));
