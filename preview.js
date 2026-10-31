const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || process.argv[2] || '3000', 10);
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  try {
    let cleanUrl = req.url.split('?')[0].split('#')[0];
    if (cleanUrl === '/' || cleanUrl === '') {
      cleanUrl = '/index.html';
    }

    let filePath = path.join(ROOT, cleanUrl);

    // 1. Directory routing
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }

    // 2. Intelligent Static Asset Fallback
    if (!fs.existsSync(filePath)) {
      const baseName = path.basename(cleanUrl);
      const candidates = [
        path.join(ROOT, cleanUrl),
        path.join(ROOT, 'assets', cleanUrl),
        path.join(ROOT, 'assets', baseName),
        path.join(ROOT, baseName)
      ];
      for (const cand of candidates) {
        if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
          filePath = cand;
          break;
        }
      }
    }

    // 3. Serve File or 404
    if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      const path404 = path.join(ROOT, '404.html');
      if (fs.existsSync(path404)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(path404).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>404: Not Found</h2><p>${cleanUrl}</p>`);
      }
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + err.message);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==============================================`);
  console.log(` MAREA SPA PREVIEW SERVER IS ONLINE!`);
  console.log(` Serving folder: ${ROOT}`);
  console.log(` Local URL:   http://localhost:${PORT}`);
  console.log(` Network URL: http://127.0.0.1:${PORT}`);
  console.log(`==============================================\n`);
});
