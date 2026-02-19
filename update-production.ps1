# Update Production Server on Hostinger
# Run this script to deploy the latest changes

Write-Host "=====================================" -ForegroundColor Green
Write-Host "Update BS Edu Production Server" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

Write-Host "Connect to your VPS and run these commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "ssh root@72.60.192.200" -ForegroundColor Cyan
Write-Host ""
Write-Host "Once connected, run:" -ForegroundColor Yellow
Write-Host ""
Write-Host "cd /var/www/bs-education-global/client" -ForegroundColor White
Write-Host "git pull origin main" -ForegroundColor White
Write-Host "npm install" -ForegroundColor White
Write-Host "npm run build" -ForegroundColor White
Write-Host "pm2 restart all" -ForegroundColor White
Write-Host ""
Write-Host "Or run this one-liner:" -ForegroundColor Yellow
Write-Host ""
Write-Host "cd /var/www/bs-education-global/client && git pull origin main && npm install && npm run build && pm2 restart all" -ForegroundColor Cyan
Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
