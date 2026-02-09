#!/bin/bash

# BS Edu - VPS Deployment Script for Hostinger
# This script will set up and deploy the Next.js application

set -e

echo "======================================"
echo "BS Edu VPS Deployment Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Update system packages
echo -e "${GREEN}Step 1: Updating system packages...${NC}"
apt update && apt upgrade -y

# Step 2: Install Node.js (v20 LTS)
echo -e "${GREEN}Step 2: Installing Node.js 20 LTS...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    echo -e "${GREEN}Node.js installed successfully${NC}"
else
    echo -e "${YELLOW}Node.js already installed: $(node -v)${NC}"
fi

# Step 3: Install Git
echo -e "${GREEN}Step 3: Installing Git...${NC}"
if ! command -v git &> /dev/null; then
    apt install -y git
    echo -e "${GREEN}Git installed successfully${NC}"
else
    echo -e "${YELLOW}Git already installed: $(git --version)${NC}"
fi

# Step 4: Install PM2 globally
echo -e "${GREEN}Step 4: Installing PM2 process manager...${NC}"
npm install -g pm2
pm2 startup systemd -u root --hp /root

# Step 5: Install Nginx
echo -e "${GREEN}Step 5: Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
    echo -e "${GREEN}Nginx installed successfully${NC}"
else
    echo -e "${YELLOW}Nginx already installed${NC}"
fi

# Step 6: Clone the repository
echo -e "${GREEN}Step 6: Cloning repository...${NC}"
cd /var/www
if [ -d "bs-education-global" ]; then
    echo -e "${YELLOW}Repository exists, pulling latest changes...${NC}"
    cd bs-education-global
    git pull origin main
else
    git clone https://github.com/trionixitpersonal/bs-education-global.git
    cd bs-education-global
fi

# Navigate to client directory
cd client

# Step 7: Create environment file
echo -e "${GREEN}Step 7: Creating environment file...${NC}"
cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# NextAuth Configuration
NEXTAUTH_URL=http://72.60.192.200:3000
NEXTAUTH_SECRET=your_random_secret_key_here

# Application Configuration
NODE_ENV=production
EOF

echo -e "${YELLOW}⚠️  IMPORTANT: Edit /var/www/bs-edu/client/.env.local with your actual credentials${NC}"
echo ""

# Step 8: Install dependencies
echo -e "${GREEN}Step 8: Installing dependencies...${NC}"
npm install

# Step 9: Build the application
echo -e "${GREEN}Step 9: Building Next.js application...${NC}"
npm run build

# Step 10: Start application with PM2
echo -e "${GREEN}Step 10: Starting application with PM2...${NC}"
pm2 delete bs-edu 2>/dev/null || true
pm2 start npm --name "bs-edu" -- start
pm2 save

# Step 11: Configure Nginx
echo -e "${GREEN}Step 11: Configuring Nginx reverse proxy...${NC}"
cat > /etc/nginx/sites-available/bs-edu << 'EOF'
server {
    listen 80;
    server_name 72.60.192.200;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/bs-edu /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Step 12: Configure Firewall
echo -e "${GREEN}Step 12: Configuring firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    echo -e "${GREEN}Firewall configured${NC}"
fi

echo ""
echo -e "${GREEN}======================================"
echo "✅ Deployment Complete!"
echo "======================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Edit environment file:"
echo "   nano /var/www/bs-education-global/client/.env.local"
echo ""
echo "2. Add your Supabase credentials"
echo ""
echo "3. Generate NextAuth secret:"
echo "   openssl rand -base64 32"
echo ""
echo "4. Rebuild and restart:"
echo "   cd /var/www/bs-education-global/client"
echo "   npm run build"
echo "   pm2 restart bs-edu"
echo ""
echo -e "${GREEN}🌐 Your application will be available at:${NC}"
echo "   http://72.60.192.200"
echo ""
echo -e "${YELLOW}Useful PM2 Commands:${NC}"
echo "   pm2 status         - Check app status"
echo "   pm2 logs bs-edu    - View logs"
echo "   pm2 restart bs-edu - Restart app"
echo "   pm2 stop bs-edu    - Stop app"
echo ""
