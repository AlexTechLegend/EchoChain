#!/usr/bin/env bash
set -e
REPO_URL="${1:-https://github.com/yourname/EchoChain.git}"
TARGET_DIR="${2:-echochain}"

if [ -d "$TARGET_DIR" ]; then
  echo "Target directory $TARGET_DIR already exists. Remove it or specify a new directory." >&2
  exit 1
fi

echo "Cloning $REPO_URL into $TARGET_DIR"
git clone "$REPO_URL" "$TARGET_DIR"
cd "$TARGET_DIR"

echo "Installing dependencies..."
npm install

echo "Building web app..."
npm run build

echo "Packaging desktop app..."
npm run electron:build

read -p "Launch desktop app now? (y/N) " answer
if [[ "$answer" =~ ^[Yy]$ ]]; then
  npm run electron:dev
else
  echo "Done. Run 'npm run electron:dev' inside $TARGET_DIR to start the app." 
fi
