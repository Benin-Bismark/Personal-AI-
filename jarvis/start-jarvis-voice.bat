@echo off
REM JARVIS Voice Recognition Startup Script

echo ===================================
echo   Starting JARVIS Voice System...
echo ===================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python not found!
    echo Please install Python first.
    pause
    exit /b 1
)

REM Install dependencies if needed
echo Checking dependencies...
python -c "import speech_recognition" >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing required packages...
    pip install -r "%USERPROFILE%\jarvis-voice-requirements.txt"
)

echo.
echo ===================================
echo   JARVIS Voice is ready!
echo ===================================
echo.

REM Start the voice recognition
python "%USERPROFILE%\jarvis-voice.py"
