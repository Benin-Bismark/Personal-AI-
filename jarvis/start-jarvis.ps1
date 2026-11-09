# JARVIS Startup Script
# This script starts omniroute and Claude Code automatically

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   Starting JARVIS Assistant...    " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Start omniroute in a new window
Write-Host "[1/3] Starting omniroute server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "omniroute" -WindowStyle Minimized
Write-Host "      omniroute started (minimized)" -ForegroundColor Green

# Wait for omniroute to initialize
Write-Host "[2/3] Waiting for omniroute to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Write-Host "      Ready!" -ForegroundColor Green

# Step 2: Set environment variables and start Claude Code
Write-Host "[3/3] Starting Claude Code..." -ForegroundColor Yellow

# Set environment variables
$env:CLAUDE_CONFIG_DIR = "$HOME\.claude-omniroute"
$env:ANTHROPIC_BASE_URL = "http://localhost:20128"
$env:ANTHROPIC_AUTH_TOKEN = "sk-701e0a293aa77b9b-266020-bfa548f1"
$env:ANTHROPIC_API_KEY = ""
$env:ANTHROPIC_MODEL = "omniroute-free"

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "   JARVIS is ready, sir!          " -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Start Claude Code
claude
