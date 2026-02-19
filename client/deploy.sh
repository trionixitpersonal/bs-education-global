#!/bin/bash
# Hostinger Deployment Script

echo "Installing dependencies..."
npm install

echo "Building Next.js application..."
npm run build

echo "Restarting application..."
pm2 restart all || pm2 start npm --name "bsedu" -- start

echo "Deployment complete!"
