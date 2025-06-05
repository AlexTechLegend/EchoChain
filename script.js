const depthInput = document.getElementById('depth');
const depthLabel = document.getElementById('depth-label');
const generateBtn = document.getElementById('generate');
const historyEl = document.getElementById('history');
const personalities = document.querySelectorAll('input[name="personality"]');
const ping = document.getElementById('ping');

const microcopy = {
  genz: {
    button: 'Hit this baddie \uD83D\uDE80',
    instructions: 'Click this baddie to get your brain juice \uD83E\uDDE0\uD83D\uDCA5'
  },
  millennial: {
    button: 'Generate Thought',
    instructions: "Hit the button and vibe with a lil' insight."
  },
  boomer: {
    button: 'Get Wisdom',
    instructions: 'Push the button, get a nugget of wisdom.'
  }
};

const history = JSON.parse(localStorage.getItem('history') || '[]');

function renderHistory() {
  historyEl.innerHTML = history
    .map(item => `<div class="history-item ${item.mood}">${item.text}</div>`)
    .join('');
}

function updateMicrocopy() {
  const p = document.querySelector('input[name="personality"]:checked').value;
  generateBtn.textContent = microcopy[p].button;
  document.getElementById('instructions').textContent = microcopy[p].instructions;
}

function updateDepthLabel() {
  depthLabel.textContent = depthInput.value;
}

function addToHistory(text, mood) {
  history.unshift({ text, mood });
  if (history.length > 5) history.pop();
  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
}

async function generateThought() {
  const depth = depthInput.value;
  const personality = document.querySelector('input[name="personality"]:checked').value;
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ depth, personality })
  });
  if (res.ok) {
    const data = await res.json();
    const thoughtEl = document.getElementById('thought');
    thoughtEl.className = data.mood;
    thoughtEl.textContent = data.text;
    addToHistory(data.text, data.mood);
    ping.currentTime = 0;
    ping.play();
  }
}

generateBtn.addEventListener('click', generateThought);
personalities.forEach(el => el.addEventListener('change', updateMicrocopy));
depthInput.addEventListener('input', updateDepthLabel);

window.addEventListener('DOMContentLoaded', () => {
  updateMicrocopy();
  updateDepthLabel();
  renderHistory();
});
