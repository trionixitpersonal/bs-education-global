# BS Edu - VPS Connection Helper
# This script helps you connect to your Hostinger VPS

$VPS_IP = "72.60.192.200"
$VPS_USER = "root"
$PASSWORD = "TriONIx@2050##"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  BS EDU - VPS Connection Helper" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Connecting to: $VPS_USER@$VPS_IP" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT:" -ForegroundColor Red
Write-Host "When you see 'password:', the cursor won't move!" -ForegroundColor Yellow
Write-Host "This is NORMAL security behavior." -ForegroundColor Yellow
Write-Host ""
Write-Host "Your password is: $PASSWORD" -ForegroundColor Green
Write-Host ""
Write-Host "Two ways to enter it:" -ForegroundColor Cyan
Write-Host "  1. Type it (you won't see anything) then press Enter" -ForegroundColor White
Write-Host "  2. Copy the password above and right-click to paste" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to connect..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

Write-Host ""
Write-Host "Connecting..." -ForegroundColor Green
Write-Host ""

# Store password in clipboard for easy paste
Set-Clipboard -Value $PASSWORD
Write-Host "✅ Password copied to clipboard - just right-click to paste!" -ForegroundColor Green
Write-Host ""

# Connect via SSH
ssh $VPS_USER@$VPS_IP
