#!/bin/bash
# ============================================
# Rollback Script - Main Quiz App
# Run this on EC2 to rollback to previous version
# ============================================

set -e

DEPLOY_DIR="/var/www/main-quiz"
BACKUP_DIR="/var/www/main-quiz-backup"

echo "=========================================="
echo "  Rolling back Main Quiz App"
echo "=========================================="

if [ ! -d "$BACKUP_DIR" ] || [ -z "$(ls -A $BACKUP_DIR)" ]; then
    echo "ERROR: No backup found at $BACKUP_DIR"
    echo "Cannot rollback without a backup."
    exit 1
fi

echo "Current deployment:"
ls -la "$DEPLOY_DIR" | head -5
echo ""

echo "Rolling back to backup..."
rm -rf "$DEPLOY_DIR"/*
cp -r "$BACKUP_DIR"/* "$DEPLOY_DIR/"

sudo systemctl restart nginx

echo ""
echo "=========================================="
echo "  Rollback complete!"
echo "=========================================="
echo ""
echo "Verify at: http://$(curl -s ifconfig.me)"
