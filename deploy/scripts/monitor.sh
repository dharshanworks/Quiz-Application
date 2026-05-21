#!/bin/bash
# ============================================
# Monitoring Script - Main Quiz App
# Run periodically or set up as cron job
# ============================================

echo "=========================================="
echo "  Main Quiz - System Monitor"
echo "  $(date)"
echo "=========================================="
echo ""

# Disk usage
echo "--- Disk Usage ---"
df -h / | tail -1
echo ""

# Memory usage
echo "--- Memory Usage ---"
free -h | grep Mem
echo ""

# CPU load
echo "--- CPU Load ---"
uptime
echo ""

# Nginx status
echo "--- Nginx Status ---"
sudo systemctl is-active nginx
echo ""

# Nginx connections
echo "--- Active Connections ---"
curl -s http://localhost/nginx_status 2>/dev/null || echo "nginx_status not configured"
echo ""

# Deployment directory size
echo "--- Deployment Size ---"
du -sh /var/www/main-quiz 2>/dev/null || echo "Deployment directory not found"
echo ""

# Backup directory size
echo "--- Backup Size ---"
du -sh /var/www/main-quiz-backup 2>/dev/null || echo "Backup directory not found"
echo ""

# Recent Nginx errors
echo "--- Recent Nginx Errors (last 5) ---"
sudo tail -n 5 /var/log/nginx/error.log 2>/dev/null || echo "No errors found"
echo ""

# Recent access logs
echo "--- Recent Access (last 5) ---"
sudo tail -n 5 /var/log/nginx/access.log 2>/dev/null || echo "No access logs"
echo ""

# Health check
echo "--- Health Check ---"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
if [ "$HTTP_CODE" = "200" ]; then
    echo "App is HEALTHY (HTTP $HTTP_CODE)"
else
    echo "App is UNHEALTHY (HTTP $HTTP_CODE)"
fi
echo ""

echo "=========================================="
echo "  Monitor complete"
echo "=========================================="
