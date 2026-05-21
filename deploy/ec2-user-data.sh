#!/bin/bash
# ============================================
# EC2 User Data Script - Runs automatically on first boot
# Paste this in EC2 "User Data" field when launching instance
# ============================================

#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data) 2>&1

echo "=== Starting Main Quiz Server Setup ==="

# Update system
apt update -y
apt upgrade -y

# Install dependencies
apt install -y git curl nginx

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Create deployment directory
mkdir -p /var/www/main-quiz
chown -R ubuntu:ubuntu /var/www/main-quiz
chmod -R 755 /var/www/main-quiz

# Create backup directory
mkdir -p /var/www/main-quiz-backup
chown -R ubuntu:ubuntu /var/www/main-quiz-backup

# Configure Nginx for SPA
cat > /etc/nginx/sites-available/main-quiz.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name _;

    root /var/www/main-quiz;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable cache for index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
NGINX_EOF

# Enable Nginx config
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/main-quiz.conf /etc/nginx/sites-enabled/
nginx -t
systemctl enable nginx
systemctl restart nginx

# Create deployment user setup
cat > /home/ubuntu/deploy.sh << 'DEPLOY_EOF'
#!/bin/bash
set -e
PROJECT_DIR="$HOME/main-quiz/frontend"
DEPLOY_DIR="/var/www/main-quiz"
BACKUP_DIR="/var/www/main-quiz-backup"

echo "=== Deploying Main Quiz ==="

cd "$PROJECT_DIR"
git pull origin main
npm ci --production=false
npm run build

# Backup
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
    rm -rf "$BACKUP_DIR"
    cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
fi

# Deploy
rm -rf "$DEPLOY_DIR"/*
cp -r dist/* "$DEPLOY_DIR/"
systemctl restart nginx

echo "=== Deployment Complete ==="
echo "Access: http://$(curl -s ifconfig.me)"
DEPLOY_EOF

chmod +x /home/ubuntu/deploy.sh

# Clone repository (will be done by user with their repo)
echo "=== Server setup complete ==="
echo "Next: Clone your repo and run ~/deploy.sh"
echo "Or set up GitHub Actions for auto-deploy"
