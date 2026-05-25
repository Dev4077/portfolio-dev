#!/usr/bin/env bash
# One-time setup on a fresh Ubuntu EC2 instance (22.04 / 24.04).
# Run on the server: bash deploy/ec2-setup.sh
# Or copy this file over SSH and run it.
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/portfolio-dev}"

echo "==> Updating packages..."
sudo apt-get update -y
sudo apt-get install -y curl git nginx

echo "==> Installing Node.js 24..."
if ! command -v node >/dev/null || [[ "$(node -v)" != v24* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
node -v
npm -v

echo "==> Installing PM2..."
if ! command -v pm2 >/dev/null; then
  sudo npm install -g pm2
fi

echo "==> Creating app directory: $APP_DIR"
mkdir -p "$APP_DIR"

if [[ ! -f "$APP_DIR/.env" ]]; then
  cat <<'EOF'

NEXT: Create production .env on the server:

  nano ~/portfolio-dev/.env

Use deploy/env.ec2.example as a template. Required:
  DATABASE_URL, SESSION_SECRET, SERVER_PORT=8080, BASE_PATH=/

EOF
fi

echo "==> PM2 startup on boot (run the sudo command PM2 prints if prompted)..."
pm2 startup systemd -u "${USER}" --hp "${HOME}" || true

echo ""
echo "Setup complete."
echo "  1. Create $APP_DIR/.env"
echo "  2. Deploy app (GitHub Actions or: EC2_HOST=... SSH_KEY=... bash deploy/deploy.sh)"
echo "  3. Optional nginx: sudo cp deploy/nginx-portfolio.conf /etc/nginx/sites-available/portfolio"
echo "     sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/"
echo "     sudo nginx -t && sudo systemctl reload nginx"
