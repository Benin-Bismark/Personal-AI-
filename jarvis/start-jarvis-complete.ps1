# JARVIS Complete Startup Script (with Voice Recognition)
# This script starts omniroute, Claude Code, and Voice Recognition

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   Starting JARVIS Assistant...    " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Start omniroute in a new window
Write-Host "[1/4] Starting omniroute server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "omniroute" -WindowStyle Minimized
Write-Host "      omniroute started (minimized)" -ForegroundColor Green

# Wait for omniroute to initialize
Write-Host "[2/4] Waiting for omniroute to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Write-Host "      Ready!" -ForegroundColor Green

# Step 2: Set environment variables and start Claude Code
Write-Host "[3/4] Starting Claude Code..." -ForegroundColor Yellow

# Set environment variables
$env:CLAUDE_CONFIG_DIR = "$HOME\.claude-omniroute"
$env:ANTHROPIC_BASE_URL = "http://localhost:20128"
# TODO: Set your auth token here or in Windows environment variables
# $env:ANTHROPIC_AUTH_TOKEN = "your-token-here"
$env:ANTHROPIC_API_KEY = ""
$env:ANTHROPIC_MODEL = "omniroute-free"

Write-Host "      Environment configured" -ForegroundColor Green

# Step 3: Start Voice Recognition in a new window
Write-Host "[4/4] Starting Voice Recognition..." -ForegroundColor Yellow
Start-Process cmd -ArgumentList "/c", "$HOME\start-jarvis-voice.bat" -WindowStyle Normal
Write-Host "      Voice recognition started" -ForegroundColor Green

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "   JARVIS is fully ready, sir!    " -ForegroundColor Green
Write-Host "   Say 'JARVIS' to give commands  " -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Start Claude Code
claude
