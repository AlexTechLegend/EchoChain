const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/generate') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const params = JSON.parse(body);
        const result = generateThought(params.depth, params.personality);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400);
        res.end();
      }
    });
    return;
  }

  // static file
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

function generateThought(depth, personality) {
  const moods = ['serene', 'chaotic', 'hopeful', 'nihilistic'];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  const phrases = {
    genz: [
      'Yo, life be like',
      'Real talk, fam –',
      'No cap, but',
      'Bruh, for real,',
    ],
    millennial: [
      'So here\'s the thing –',
      'You know, growing up we learned',
      'Honestly, it feels like',
      'Not gonna lie,',
    ],
    boomer: [
      'Back in my day,',
      'Let me tell you,',
      'Here\'s a nugget of wisdom:',
      'Sonny, remember that',
    ],
  };
  const endings = [
    'the universe never texts back.',
    'hope is just another algorithm.',
    'every meme fades to dust.',
    'wisdom starts with a single typo.',
    'we\'re all buffering, endlessly.',
  ];
  const start = phrases[personality][Math.floor(Math.random() * phrases[personality].length)];
  const end = endings[Math.floor(Math.random() * endings.length)];
  const text = `${start} ${end}`;
  return { text, mood };
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
