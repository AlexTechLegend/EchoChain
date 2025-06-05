const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const clipsDir = path.join(__dirname, 'clips');
if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir);

let lastClip = null; // { file, mood, depth, persona, caption }

function serveStatic(req, res) {
  const filePath = path.join(__dirname, 'static', req.url.replace(/^\/static\//, ''));
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    const type = ext === '.js' ? 'text/javascript' : ext === '.css' ? 'text/css' : 'text/html';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

function serveAudio(file, res) {
  const filePath = path.join(clipsDir, file);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'audio/webm' });
    res.end(data);
  });
}

function handleUpload(req, res) {
  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    const buffer = Buffer.concat(body);
    const id = Date.now() + '.webm';
    fs.writeFileSync(path.join(clipsDir, id), buffer);

    const params = new URL(req.url, 'http://localhost').searchParams;
    const mood = params.get('mood') || 'neutral';
    const depth = params.get('depth') || '1';
    const persona = params.get('persona') || 'genz';

    const previous = lastClip;
    lastClip = { file: id, mood, depth, persona };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(previous || {}));
  });
}

function handleAPI(req, res) {
  if (req.method === 'POST' && req.url.startsWith('/api/upload')) {
    handleUpload(req, res);
  } else if (req.method === 'GET' && req.url.startsWith('/api/last')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(lastClip || {}));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/static/')) {
    serveStatic(req, res);
  } else if (req.url.startsWith('/api/')) {
    handleAPI(req, res);
  } else if (req.url.startsWith('/audio/')) {
    const file = req.url.replace('/audio/', '');
    serveAudio(file, res);
  } else if (req.url === '/' || req.url === '/index.html') {
    req.url = '/static/index.html';
    serveStatic(req, res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
