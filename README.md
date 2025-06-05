# EchoChain

Skeleton implementation of the EchoChain app.

## Quick Setup

Run `setup.sh` to clone the repo, install dependencies, build the web app, and optionally launch a local preview.

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

## API

See `openapi.yaml` for endpoint specification.
