# Main Quiz - Advanced Java Quiz App

A production-ready React + Vite + Tailwind CSS quiz application deployed on AWS EC2.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     GitHub Repository                     │
│                   (Source of Truth)                       │
└──────────────────────┬──────────────────────────────────┘
                       │ push to main
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  GitHub Actions CI/CD                     │
│  1. Checkout  2. npm ci  3. npm run build  4. SSH deploy │
└──────────────────────┬──────────────────────────────────┘
                       │ rsync over SSH
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    AWS EC2 (Ubuntu)                       │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   Nginx     │◄───│ /var/www/    │◄───│  dist/     │  │
│  │   Port 80   │    │  main-quiz/  │    │  (build)   │  │
│  │   Port 443  │    └──────────────┘    └────────────┘  │
│  └──────┬──────┘                                         │
│         │                                                │
└─────────┼────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│                    End Users                              │
│              http://your-domain.com                       │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React 19, Vite 7, Tailwind 4  |
| Build       | Rolldown-Vite, Terser         |
| Web Server  | Nginx                         |
| CI/CD       | GitHub Actions                |
| Cloud       | AWS EC2 (t2.micro, Ubuntu)    |
| SSL         | Let's Encrypt (Certbot)       |

## Project Structure

```
frontend/
├── .github/workflows/
│   └── deploy.yml          # CI/CD pipeline
├── deploy/
│   ├── nginx/
│   │   └── main-quiz.conf  # Nginx server config
│   └── scripts/
│       ├── setup-ec2.sh    # One-time server setup
│       ├── deploy.sh       # Manual deploy script
│       ├── rollback.sh     # Rollback to previous version
│       ├── setup-ssl.sh    # HTTPS setup
│       └── monitor.sh      # System monitoring
├── src/
│   ├── App.jsx             # Main application
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind imports
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## Quick Start (Local Development)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`

## Deployment Guide

### Prerequisites

- AWS Account
- GitHub Account
- Domain name (optional, for HTTPS)

### Step 1: Create GitHub Repository

```bash
cd frontend
git init
git add .
git commit -m "Initial commit - EC2 deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/main-quiz.git
git push -u origin main
```

### Step 2: Launch EC2 Instance

1. Go to AWS Console > EC2 > Launch Instance
2. Configure:
   - **Name:** main-quiz-server
   - **AMI:** Ubuntu Server 24.04 LTS (or latest)
   - **Instance type:** t2.micro (Free Tier eligible)
   - **Key pair:** Create new key pair (download .pem file)
   - **Storage:** 20 GB gp3
   - **Security Group:**

| Type      | Port  | Source      | Purpose          |
|-----------|-------|-------------|------------------|
| SSH       | 22    | Your IP     | Server access    |
| HTTP      | 80    | 0.0.0.0/0   | Web traffic      |
| HTTPS     | 443   | 0.0.0.0/0   | Secure traffic   |

3. Launch and note the **Public IP**

### Step 3: Connect to EC2

```bash
# Set permissions on your key
chmod 400 your-key.pem

# Connect
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### Step 4: Run Server Setup

```bash
# Clone the repository on EC2
git clone https://github.com/YOUR_USERNAME/main-quiz.git ~/main-quiz

# Run setup script
chmod +x ~/main-quiz/frontend/deploy/scripts/setup-ec2.sh
bash ~/main-quiz/frontend/deploy/scripts/setup-ec2.sh
```

### Step 5: Configure GitHub Actions Secrets

Go to your GitHub repo > Settings > Secrets and variables > Actions

Add these repository secrets:

| Secret Name     | Value                                    |
|-----------------|------------------------------------------|
| `EC2_SSH_KEY`   | Contents of your .pem key file           |
| `EC2_HOST`      | EC2 Public IP or domain                  |
| `EC2_USER`      | `ubuntu`                                 |
| `EC2_PORT`      | `22`                                     |

### Step 6: Deploy

Push to `main` branch:

```bash
git add .
git commit -m "Update quiz app"
git push origin main
```

GitHub Actions will automatically:
1. Build the project
2. SSH into EC2
3. Deploy to `/var/www/main-quiz/`
4. Restart Nginx

### Manual Deploy (Alternative)

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

cd ~/main-quiz/frontend
bash deploy/scripts/deploy.sh
```

### Step 7: Setup HTTPS (Optional)

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Point your domain to EC2 Public IP (A record in DNS)
# Then run:
bash ~/main-quiz/frontend/deploy/scripts/setup-ssl.sh
```

## Nginx Configuration

Located at: `deploy/nginx/main-quiz.conf`

Key features:
- SPA routing (`try_files $uri $uri/ /index.html`)
- Gzip compression
- Static asset caching (1 year)
- Security headers
- 404 handling

## Monitoring

```bash
# Run monitoring script
bash ~/main-quiz/frontend/deploy/scripts/monitor.sh

# Check Nginx status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Disk usage
df -h

# Memory usage
free -h
```

## Rollback Strategy

If a deployment causes issues:

```bash
# Option 1: Use rollback script
bash ~/main-quiz/frontend/deploy/scripts/rollback.sh

# Option 2: Manual rollback
rm -rf /var/www/main-quiz/*
cp -r /var/www/main-quiz-backup/* /var/www/main-quiz/
sudo systemctl restart nginx

# Option 3: Revert Git commit
git revert HEAD
git push origin main
```

## Troubleshooting

### Nginx not starting
```bash
sudo nginx -t                    # Test config
sudo systemctl status nginx      # Check status
sudo journalctl -u nginx         # View logs
```

### Build fails on EC2
```bash
cd ~/main-quiz/frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Actions SSH fails
1. Verify `EC2_SSH_KEY` secret contains the full PEM content
2. Check EC2 Security Group allows SSH from GitHub IPs
3. Test SSH manually: `ssh -i key.pem ubuntu@EC2_IP`

### 502 Bad Gateway
```bash
sudo systemctl restart nginx
sudo tail -f /var/log/nginx/error.log
```

### App not loading
```bash
# Check files exist
ls -la /var/www/main-quiz/

# Check Nginx config
cat /etc/nginx/sites-enabled/main-quiz.conf

# Test locally on EC2
curl http://localhost
```

## Cost Estimation

| Resource          | Monthly Cost (USD) | Notes                        |
|-------------------|--------------------|------------------------------|
| EC2 t2.micro      | ~$0.00 (Free Tier) | 750 hrs/month free for 12 mo |
| EBS 20 GB gp3     | ~$1.60             | After free tier              |
| Data Transfer     | ~$0.00             | 15 GB/month free             |
| SSL Certificate   | $0.00              | Let's Encrypt (free)         |
| **Total**         | **~$0 - $2/mo**    | Very cost-effective          |

## Production URL

After deployment, access your app at:

- **HTTP:** `http://YOUR_EC2_PUBLIC_IP`
- **HTTPS:** `https://your-domain.com` (after SSL setup)

## Default Credentials

| Role     | Username  | Password     |
|----------|-----------|--------------|
| Admin    | admin     | admin123     |
| Teacher  | teacher1  | teacher123   |

## License

Private - Sri Shakthi Institute of Engineering and Technology
