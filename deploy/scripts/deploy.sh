#!/bin/bash
# ============================================
# Deploy Script - Main Quiz App
# Run this on EC2 after pulling latest code
# ============================================

set -e

PROJECT_DIR="$HOME/main-quiz/frontend"
DEPLOY_DIR="/var/www/main-quiz"
BACKUP_DIR="/var/www/main-quiz-backup"

echo "=========================================="
echo "  Deploying Main Quiz App"
echo "=========================================="
echo ""

# Navigate to project
cd "$PROJECT_DIR"

# Pull latest code
echo "[1/5] Pulling latest code..."
git pull origin main

# Install dependencies
echo "[2/5] Installing dependencies..."
npm ci --production=false

# Build
echo "[3/5] Building project..."
npm run build

# Backup current deployment
echo "[4/5] Creating backup..."
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
    rm -rf "$BACKUP_DIR"
    cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
    echo "  Backup created at $BACKUP_DIR"
fi

# Deploy
echo "[5/5] Deploying to Nginx..."
rm -rf "$DEPLOY_DIR"/*
cp -r dist/* "$DEPLOY_DIR/"

# Restart Nginx
sudo systemctl restart nginx

echo ""
echo "=========================================="
echo "  Deployment successful!"
echo "=========================================="
echo ""
echo "Access your app at: http://$(curl -s ifconfig.me)"
echo ""

# Health check
echo "Running health check..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
if [ "$HTTP_CODE" = "200" ]; then
    echo "Health check PASSED (HTTP $HTTP_CODE)"
else
    echo "Health check FAILED (HTTP $HTTP_CODE)"
    echo "Rolling back to previous version..."
    rm -rf "$DEPLOY_DIR"/*
    cp -r "$BACKUP_DIR"/* "$DEPLOY_DIR/"
    sudo systemctl restart nginx
    echo "Rollback complete."
    exit 1
fi
