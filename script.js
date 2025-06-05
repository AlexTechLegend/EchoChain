document.getElementById('generate').addEventListener('click', async () => {
  const depth = document.getElementById('depth').value;
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
  }
});
