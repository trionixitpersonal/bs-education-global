#!/bin/bash
# Hostinger Deployment Script

echo "Installing dependencies..."
npm install

echo "Building Next.js application..."
npm run build

echo "Stopping old PM2 processes..."
pm2 delete bsedu 2>/dev/null || true

echo "Starting application with PM2..."
pm2 start ecosystem.config.js

echo "Saving PM2 configuration..."
pm2 save

echo "Deployment complete!"
pm2 status
