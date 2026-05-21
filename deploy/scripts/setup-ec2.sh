#!/bin/bash
# ============================================
# EC2 Server Setup Script - Main Quiz App
# Run this on a fresh Ubuntu EC2 instance
# ============================================

set -e

echo "=========================================="
echo "  Main Quiz - EC2 Server Setup"
echo "=========================================="

# Update system
echo "[1/7] Updating system packages..."
sudo apt update -y
sudo apt upgrade -y

# Install Git
echo "[2/7] Installing Git..."
sudo apt install -y git
git --version

# Install Node.js 20.x
echo "[3/7] Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version

# Install Nginx
echo "[4/7] Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
nginx -v

# Create deployment directory
echo "[5/7] Creating deployment directories..."
sudo mkdir -p /var/www/main-quiz
sudo chown -R ubuntu:ubuntu /var/www/main-quiz
sudo chmod -R 755 /var/www/main-quiz

# Configure Nginx
echo "[6/7] Configuring Nginx..."
sudo rm -f /etc/nginx/sites-enabled/default
sudo cp ~/main-quiz/deploy/nginx/main-quiz.conf /etc/nginx/sites-available/main-quiz.conf
sudo ln -sf /etc/nginx/sites-available/main-quiz.conf /etc/nginx/sites-enabled/main-quiz.conf
sudo nginx -t
sudo systemctl restart nginx

# Create backup directory
echo "[7/7] Creating backup directory..."
sudo mkdir -p /var/www/main-quiz-backup
sudo chown -R ubuntu:ubuntu /var/www/main-quiz-backup

echo ""
echo "=========================================="
echo "  Server setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <repo_url> ~/main-quiz"
echo "2. Build locally: cd ~/main-quiz/frontend && npm ci && npm run build"
echo "3. Copy build: cp -r dist/* /var/www/main-quiz/"
echo "4. Or set up GitHub Actions for automated deployment"
echo ""
echo "Verify Nginx: curl http://localhost"
echo "Check status: sudo systemctl status nginx"
