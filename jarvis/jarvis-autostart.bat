@echo off
REM JARVIS Auto-Startup Script
REM This is placed in Windows Startup folder to run on boot

echo JARVIS: Initializing on startup...

REM Wait a bit for system to fully boot
timeout /t 10 /nobreak > nul

REM Run the main JARVIS startup script
powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File "%USERPROFILE%\start-jarvis.ps1"
