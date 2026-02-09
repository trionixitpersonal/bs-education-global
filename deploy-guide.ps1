# BS Edu - VPS Deployment PowerShell Script
# This script connects to your Hostinger VPS and executes the deployment

$VPS_IP = "72.60.192.200"
$VPS_USER = "root"
$VPS_PASSWORD = "TriONIx@2050##"

Write-Host "=====================================" -ForegroundColor Green
Write-Host "BS Edu VPS Deployment" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Step 1: Upload deployment script to VPS
Write-Host "Step 1: Uploading deployment script to VPS..." -ForegroundColor Yellow

# Create a temporary file with the deployment script
$deployScript = @"
#!/bin/bash
set -e

echo 'Updating system...'
apt update && apt upgrade -y

echo 'Installing Node.js 20...'
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

echo 'Installing Git...'
apt install -y git

echo 'Installing PM2...'
npm install -g pm2
pm2 startup systemd -u root --hp /root

echo 'Installing Nginx...'
apt install -y nginx
systemctl enable nginx
systemctl start nginx

echo 'Cloning repository...'
cd /var/www
if [ -d 'bs-edu' ]; then
    cd bs-edu && git pull origin main
else
    git clone https://github.com/clickbitDev/bs-edu.git
    cd bs-edu
fi

cd client

echo 'Installing dependencies...'
npm install

echo 'Deployment script complete!'
echo 'Please edit .env.local with your Supabase credentials'
"@

$deployScript | Out-File -FilePath ".\temp-deploy.sh" -Encoding UTF8

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Manual Deployment Steps" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "To deploy manually, follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open a new PowerShell terminal and connect to VPS:" -ForegroundColor Cyan
Write-Host "   ssh root@72.60.192.200" -ForegroundColor White
Write-Host "   Password: TriONIx@2050##" -ForegroundColor White
Write-Host ""
Write-Host "2. Once connected, download and run the deployment script:" -ForegroundColor Cyan
Write-Host "   wget https://raw.githubusercontent.com/trionixitpersonal/bs-education-global/main/deploy-to-vps.sh" -ForegroundColor White
Write-Host "   chmod +x deploy-to-vps.sh" -ForegroundColor White
Write-Host "   ./deploy-to-vps.sh" -ForegroundColor White
Write-Host ""
Write-Host "   OR run these commands directly:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   # Update system" -ForegroundColor Gray
Write-Host "   apt update && apt upgrade -y" -ForegroundColor White
Write-Host ""
Write-Host "   # Install Node.js 20" -ForegroundColor Gray
Write-Host "   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -" -ForegroundColor White
Write-Host "   apt install -y nodejs" -ForegroundColor White
Write-Host ""
Write-Host "   # Install Git, PM2, and Nginx" -ForegroundColor Gray
Write-Host "   apt install -y git nginx" -ForegroundColor White
Write-Host "   npm install -g pm2" -ForegroundColor White
Write-Host ""
Write-Host "   # Clone repository" -ForegroundColor Gray
Write-Host "   cd /var/www" -ForegroundColor White
Write-Host "   git clone https://github.com/trionixitpersonal/bs-education-global.git" -ForegroundColor White
Write-Host "   cd bs-education-global/client" -ForegroundColor White
Write-Host ""
Write-Host "   # Install dependencies" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor White
Write-Host ""
Write-Host "3. Create environment file:" -ForegroundColor Cyan
Write-Host "   nano /var/www/bs-education-global/client/.env.local" -ForegroundColor White
Write-Host ""
Write-Host "   Add these variables:" -ForegroundColor Gray
Write-Host "   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_key>" -ForegroundColor White
Write-Host "   SUPABASE_SERVICE_ROLE_KEY=<your_service_key>" -ForegroundColor White
Write-Host "   NEXTAUTH_URL=http://72.60.192.200:3000" -ForegroundColor White
Write-Host "   NEXTAUTH_SECRET=<generate_random_secret>" -ForegroundColor White
Write-Host "   NODE_ENV=production" -ForegroundColor White
Write-Host ""
Write-Host "   Press Ctrl+X, then Y, then Enter to save" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Build and start the application:" -ForegroundColor Cyan
Write-Host "   npm run build" -ForegroundColor White
Write-Host "   pm2 start npm --name bs-edu -- start" -ForegroundColor White
Write-Host "   pm2 save" -ForegroundColor White
Write-Host "   pm2 startup" -ForegroundColor White
Write-Host ""
Write-Host "5. Configure Nginx:" -ForegroundColor Cyan
Write-Host "   nano /etc/nginx/sites-available/bs-edu" -ForegroundColor White
Write-Host ""
Write-Host "   Add this configuration:" -ForegroundColor Gray
Write-Host @"
   server {
       listen 80;
       server_name 72.60.192.200;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade `$http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host `$host;
           proxy_cache_bypass `$http_upgrade;
       }
   }
"@ -ForegroundColor White
Write-Host ""
Write-Host "   Enable the site:" -ForegroundColor Gray
Write-Host "   ln -s /etc/nginx/sites-available/bs-edu /etc/nginx/sites-enabled/" -ForegroundColor White
Write-Host "   rm /etc/nginx/sites-enabled/default" -ForegroundColor White
Write-Host "   nginx -t" -ForegroundColor White
Write-Host "   systemctl reload nginx" -ForegroundColor White
Write-Host ""
Write-Host "6. Configure firewall:" -ForegroundColor Cyan
Write-Host "   ufw allow 22/tcp" -ForegroundColor White
Write-Host "   ufw allow 80/tcp" -ForegroundColor White
Write-Host "   ufw allow 443/tcp" -ForegroundColor White
Write-Host "   ufw enable" -ForegroundColor White
Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Your app will be live at:" -ForegroundColor Green
Write-Host "http://72.60.192.200" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Useful Commands:" -ForegroundColor Yellow
Write-Host "  pm2 status         - Check app status" -ForegroundColor White
Write-Host "  pm2 logs bs-edu    - View application logs" -ForegroundColor White
Write-Host "  pm2 restart bs-edu - Restart application" -ForegroundColor White
Write-Host "  pm2 monit          - Monitor resources" -ForegroundColor White
Write-Host ""

# Cleanup
Remove-Item ".\temp-deploy.sh" -ErrorAction SilentlyContinue
