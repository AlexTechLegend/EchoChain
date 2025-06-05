let mediaRecorder;
let chunks = [];
const recordBtn = document.getElementById('record');
const playback = document.getElementById('playback');
const moodSelect = document.getElementById('mood');
const depthInput = document.getElementById('depth');
const personaSelect = document.getElementById('persona');
const title = document.getElementById('title');

personaSelect.addEventListener('change', () => {
  const persona = personaSelect.value;
  if (persona === 'genz') title.textContent = 'Yo drop a vibe';
  else if (persona === 'millennial') title.textContent = "What's on your mind?";
  else title.textContent = 'Say what\'s on your mind';
});

function startRecording() {
  chunks = [];
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    recordBtn.textContent = 'Recording...';
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    setTimeout(stopRecording, 5000);
  }).catch(err => alert('Mic access denied'));
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    recordBtn.textContent = 'Hold to Record';
    mediaRecorder.onstop = sendClip;
  }
}

function sendClip() {
  const blob = new Blob(chunks, { type: 'audio/webm' });
  const params = new URLSearchParams({
    mood: moodSelect.value,
    depth: depthInput.value,
    persona: personaSelect.value
  });
  fetch(`/api/upload?${params.toString()}`, { method: 'POST', body: blob })
    .then(r => r.json())
    .then(data => {
      if (data && data.file) {
        playback.src = `/audio/${data.file}`;
        playback.play();
      }
    });
}

recordBtn.addEventListener('mousedown', startRecording);
recordBtn.addEventListener('mouseup', stopRecording);
