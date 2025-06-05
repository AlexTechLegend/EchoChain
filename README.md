# EchoChain

Simple prototype of the EchoChain concept. Users can record a 5 second audio clip and immediately hear the previous user.

## Usage

1. Start the server:
   ```bash
   node server.js
   ```
   The server runs on `http://localhost:3000`.

2. Open the page in your browser and allow microphone access.

3. Hold the **Record** button to record your message. After 5 seconds it stops automatically and uploads the clip. You will then hear the last recorded clip.

Uploaded clips are stored in the `clips` folder.
