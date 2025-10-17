#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const [, , rootDirArg, portArg] = process.argv;

if (!rootDirArg || !portArg) {
  console.error('Usage: node scripts/serve-static.js <rootDir> <port>');
  process.exit(1);
}

const rootDir = path.resolve(process.cwd(), rootDirArg);
const port = Number(portArg);

if (!fs.existsSync(rootDir)) {
  console.error(`Directory not found: ${rootDir}`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname.endsWith('/')) {
    pathname = path.join(pathname, 'index.html');
  }

  const filePath = path.join(rootDir, pathname);

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (indexErr || !indexStats.isFile()) {
          res.writeHead(403);
          res.end('Forbidden');
        } else {
          streamFile(indexPath, res);
        }
      });
      return;
    }

    streamFile(filePath, res);
  });
});

function streamFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = getContentType(ext);

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });

  const stream = fs.createReadStream(filePath);
  stream.on('error', (err) => {
    res.writeHead(500);
    res.end('Server Error');
  });
  stream.pipe(res);
}

function getContentType(ext) {
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

server.listen(port, () => {
  console.log(`Serving ${rootDir} on http://localhost:${port}`);
});
