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
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const params = JSON.parse(body);
        const result = generateThought(parseInt(params.depth, 10), params.personality);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch {
        res.writeHead(400);
        res.end();
      }
    });
    return;
  }

  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';
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

function generateThought(depth = 3, personality = 'genz') {
  const moods = ['serene', 'chaotic', 'hopeful', 'nihilistic'];
  const mood = moods[Math.floor(Math.random() * moods.length)];

  const intro = {
    genz: ['Yo,', 'Real talk,', 'Fam,', 'Bruh,'],
    millennial: ['So here\'s the thing,', 'Honestly,', 'Not gonna lie,', 'You know,'],
    boomer: ['Let me tell you,', 'Back in my day,', 'Here\'s a thought:', 'Sonny,']
  }[personality];

  const middle = {
    1: ['life is a meme,', 'the vibes are weird,', 'everything\'s low-key silly,', 'nothing is serious,'],
    2: ['we\'re all figuring it out,', 'adulting is hard,', 'the grind never stops,', 'coffee keeps us going,'],
    3: ['deep down we\'re just stardust,', 'time keeps slipping,', 'every choice echoes,', 'we chase meaning,'],
    4: ['existence is a puzzle,', 'truth hides in plain sight,', 'dreams shape reality,', 'silence speaks volumes,'],
    5: ['the cosmos watches silently,', 'infinity bends around us,', 'consciousness is a loop,', 'reality glitches sometimes,']
  }[depth] || ['life is strange,'];

  const ending = {
    serene: ['breathe and let go.', 'just float with it.', 'peace comes quietly.', 'enjoy the stillness.'],
    chaotic: ['everything is on fire!', 'just roll with the chaos!', 'embrace the madness!', 'nothing stays still!'],
    hopeful: ['better days await.', 'keep moving forward.', 'the light is ahead.', 'believe in the journey.'],
    nihilistic: ['nothing really matters.', 'it\'s all dust anyway.', 'the void is patient.', 'meaning is optional.']
  }[mood];

  const part1 = intro[Math.floor(Math.random() * intro.length)];
  const part2 = middle[Math.floor(Math.random() * middle.length)];
  const part3 = ending[Math.floor(Math.random() * ending.length)];

  return { text: `${part1} ${part2} ${part3}`, mood };
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
