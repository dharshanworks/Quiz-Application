#!/bin/bash
# ============================================
# SSL Setup Script - Main Quiz App
# Run this after pointing your domain to EC2
# ============================================

set -e

# Prompt for domain
read -p "Enter your domain (e.g., quiz.example.com): " DOMAIN

echo "=========================================="
echo "  Setting up SSL for $DOMAIN"
echo "=========================================="

# Install Certbot
echo "[1/3] Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Update Nginx config with domain
echo "[2/3] Updating Nginx configuration..."
sudo sed -i "s/server_name _;/server_name $DOMAIN;/" /etc/nginx/sites-available/main-quiz.conf
sudo nginx -t
sudo systemctl reload nginx

# Obtain SSL certificate
echo "[3/3] Obtaining SSL certificate..."
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" --redirect

echo ""
echo "=========================================="
echo "  SSL setup complete!"
echo "=========================================="
echo ""
echo "Your app is now available at: https://$DOMAIN"
echo ""
echo "Auto-renewal is configured. Test it with:"
echo "  sudo certbot renew --dry-run"
