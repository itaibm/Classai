#!/usr/bin/env bash
# Classai launcher — installs what's needed (first run only), builds, and opens
# the app in your browser. Run with:  bash start.sh
set -e
cd "$(dirname "$0")"

PORT="${PORT:-8787}"
URL="http://localhost:${PORT}"

echo ""
echo "  🎓  Classai — your at-home AI tutor"
echo "  ───────────────────────────────────"

# 1. Node.js check
if ! command -v node >/dev/null 2>&1; then
  echo "  ✗ Node.js isn't installed."
  echo "    Install the LTS version (22 or newer) from https://nodejs.org, then run this again."
  exit 1
fi
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "  ✗ Classai needs Node.js 22 or newer (you have $(node -v))."
  echo "    Update from https://nodejs.org, then run this again."
  exit 1
fi

# 2. Install dependencies (first run only)
if [ ! -d node_modules ]; then
  echo "  • Installing (one time, may take a minute)…"
  npm install --include=dev --silent
fi

# 3. Build the app if it hasn't been built yet
if [ ! -f client/dist/index.html ]; then
  echo "  • Building the app (one time)…"
  npm run build --silent
fi

# 4. Open the browser once the server is up
(
  for _ in $(seq 1 40); do
    if curl -fsS "$URL" >/dev/null 2>&1; then break; fi
    sleep 0.5
  done
  if command -v open >/dev/null 2>&1; then open "$URL"            # macOS
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"  # Linux
  fi
) >/dev/null 2>&1 &

echo "  • Starting Classai at ${URL}"
echo "    A browser tab will open. First time? Click “Connect your brain”."
echo "    (Leave this window open while you use Classai. Press Ctrl+C to stop.)"
echo ""

PORT="$PORT" npm start
