#!/usr/bin/env bash
# Deploy built artifacts from your machine to EC2.
# Run from repo root:
#
#   EC2_HOST=3.15.x.x EC2_USER=ubuntu SSH_KEY=~/.ssh/your-key.pem bash deploy/deploy.sh
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

: "${EC2_HOST:?Set EC2_HOST (public IP or DNS)}"
EC2_USER="${EC2_USER:-ubuntu}"
SSH_KEY="${SSH_KEY:-}"
REMOTE_DIR="${REMOTE_DIR:-/home/ubuntu/portfolio-dev}"

SSH_OPTS=(-o StrictHostKeyChecking=accept-new)
if [[ -n "$SSH_KEY" ]]; then
  SSH_OPTS+=(-i "$SSH_KEY")
fi

ssh_cmd() { ssh "${SSH_OPTS[@]}" "${EC2_USER}@${EC2_HOST}" "$@"; }
scp_cmd() { scp "${SSH_OPTS[@]}" "$@"; }

echo "==> Building..."
export NODE_ENV=production
export BASE_PATH="${BASE_PATH:-/}"
export SERVER_PORT="${SERVER_PORT:-8080}"
export CLIENT_PORT="${CLIENT_PORT:-21113}"
npm run build:deploy

echo "==> Preparing remote directories..."
ssh_cmd "mkdir -p ${REMOTE_DIR}/server/dist ${REMOTE_DIR}/client/dist/public ${REMOTE_DIR}/deploy"

echo "==> Uploading artifacts..."
scp_cmd -r server/dist "${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}/server/"
scp_cmd -r client/dist/public "${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}/client/dist/"
scp_cmd deploy/ecosystem.config.cjs "${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}/deploy/"

echo "==> Restarting PM2..."
ssh_cmd bash -s <<REMOTE
set -euo pipefail
cd "${REMOTE_DIR}"
if [[ ! -f .env ]]; then
  echo "ERROR: Missing ${REMOTE_DIR}/.env"
  echo "Copy deploy/env.ec2.example to .env on the server and fill in values."
  exit 1
fi
if ! command -v pm2 >/dev/null; then
  sudo npm install -g pm2
fi
pm2 delete portfolio 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 status
REMOTE

echo ""
echo "Deployed. App should be on http://${EC2_HOST}:8080 (or port 80 if nginx is configured)."
