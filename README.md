# EchoChain

Skeleton implementation of the EchoChain app.

## Quick Setup

Run `setup.sh` to clone the repo, install dependencies, build the web and desktop versions, and optionally launch the app.

```bash
./setup.sh [repo-url] [target-dir]
```

By default it clones `https://github.com/yourname/EchoChain.git` into `echochain`.

## Development

1. Install dependencies (requires internet):
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Cloudflare worker dev:
   ```bash
   npm run serve
   ```

### Desktop

Run the Electron desktop shell alongside the Vite dev server:

```bash
npm run electron:dev
```

Build a production desktop bundle:

```bash
npm run electron:build
```

## API

See `openapi.yaml` for endpoint specification.
