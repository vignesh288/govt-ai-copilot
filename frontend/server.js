const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 3100;
const host = process.env.HOST || '0.0.0.0';
const backendBaseUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8081';
const distRoot = path.join(__dirname, 'dist');
const root = fs.existsSync(path.join(distRoot, 'assets')) ? distRoot : __dirname;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    const backendUrl = new URL(req.url, backendBaseUrl);
    const proxyReq = http.request(
      {
        hostname: backendUrl.hostname,
        port: backendUrl.port || 80,
        path: `${backendUrl.pathname}${backendUrl.search}`,
        method: req.method,
        headers: req.headers
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    proxyReq.on('error', (error) => {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Backend unavailable', detail: error.message }));
    });

    req.pipe(proxyReq);
    return;
  }

  const requestPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(root, requestPath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT' && root === distRoot) {
      fs.readFile(path.join(root, 'index.html'), (fallbackError, fallbackData) => {
        if (fallbackError) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }

        res.writeHead(200, { 'Content-Type': mimeTypes['.html'] });
        res.end(fallbackData);
      });
      return;
    }

    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Frontend listening on ${host}:${port}`);
  console.log(`API proxy forwarding to ${backendBaseUrl}`);
});
