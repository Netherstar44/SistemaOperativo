const fs = require('fs');
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
