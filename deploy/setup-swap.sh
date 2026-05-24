#!/usr/bin/env bash
# Adds 2GB swap so `npm run build:deploy` can finish on t2/t3.micro instances.
set -euo pipefail

if swapon --show | grep -q '/swapfile'; then
  echo "Swap already enabled."
  swapon --show
  free -h
  exit 0
fi

sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10

echo "Swap enabled:"
swapon --show
free -h
