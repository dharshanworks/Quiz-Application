# ============================================
# Main Quiz - Complete Deployment Checklist
# ============================================

## STEP 1: Create EC2 Instance (5 minutes)

1. Go to https://console.aws.amazon.com/ec2/
2. Click "Launch Instance"
3. Configure:
   - Name: main-quiz-server
   - AMI: Ubuntu Server 24.04 LTS (HVM)
   - Instance type: t2.micro
   - Key pair: Create new → Download .pem file
   - Storage: 20 GB gp3
   - Network: Create security group with:
     * SSH (22) from Your IP
     * HTTP (80) from 0.0.0.0/0
     * HTTPS (443) from 0.0.0.0/0
4. Click "Launch Instance"
5. Note the Public IPv4 Address

## STEP 2: Add GitHub Secrets (2 minutes)

1. Go to: https://github.com/dharshanworks/Quiz-Application/settings/secrets/actions
2. Click "New repository secret" for each:

   Name: EC2_SSH_KEY
   Value: [Open your .pem file, copy ALL contents, paste here]

   Name: EC2_HOST
   Value: [Your EC2 Public IP, e.g., 54.123.45.67]

   Name: EC2_USER
   Value: ubuntu

   Name: EC2_PORT
   Value: 22

## STEP 3: Deploy (Automatic)

The GitHub Actions workflow will auto-deploy on every push to main.

To trigger manually:
- Go to: https://github.com/dharshanworks/Quiz-Application/actions
- Click "Deploy to EC2" → "Run workflow"

## STEP 4: Verify (1 minute)

Open browser: http://YOUR_EC2_PUBLIC_IP

You should see the Advanced Java Quiz app.

## STEP 5: Setup HTTPS (Optional, 5 minutes)

1. Buy domain or use existing
2. Create A record pointing to EC2 IP
3. SSH into EC2:
   ssh -i your-key.pem ubuntu@YOUR_EC2_IP
4. Run:
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com

## TROUBLESHOOTING

### SSH Connection Refused
- Check Security Group allows port 22 from your IP
- Verify .pem permissions: chmod 400 your-key.pem

### GitHub Actions Fails
- Check Actions tab for error logs
- Verify EC2_SSH_KEY secret contains full PEM content
- Test SSH: ssh -i key.pem ubuntu@EC2_IP

### 502 Bad Gateway
- SSH into EC2
- sudo systemctl status nginx
- sudo nginx -t
- sudo systemctl restart nginx

### App Not Loading
- SSH into EC2
- ls -la /var/www/main-quiz/
- Should see index.html and assets/ folder
- curl http://localhost (should return HTML)

## COST BREAKDOWN

| Item | Cost/Month |
|------|------------|
| EC2 t2.micro | $0 (Free Tier) |
| 20 GB EBS | $1.60 |
| Data Transfer | $0 (15GB free) |
| SSL | $0 (Let's Encrypt) |
| TOTAL | ~$1.60/month |

## ROLLBACK

If deployment breaks:
1. Go to GitHub Actions → Find last successful deployment
2. Click "Run workflow" on that commit
OR
3. SSH into EC2:
   rm -rf /var/www/main-quiz/*
   cp -r /var/www/main-quiz-backup/* /var/www/main-quiz/
   sudo systemctl restart nginx
