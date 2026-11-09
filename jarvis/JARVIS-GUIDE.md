# 🤖 JARVIS - Your Personal AI Assistant

## Quick Start Guide

### 📋 What We've Built Today:

1. **Auto-Startup System** - JARVIS starts automatically when you boot your PC
2. **Voice Recognition** - Say "JARVIS" to activate voice commands (Iron Man style!)
3. **PAIDA Integration** - Personal AI Desktop App ready to go

---

## 🚀 How to Start JARVIS

### Option 1: Quick Start (Manual)
Double-click: `C:\Users\VICTUS 16\start-jarvis.bat`

### Option 2: With Voice Recognition
Double-click: `C:\Users\VICTUS 16\start-jarvis-voice.bat`

### Option 3: Complete System (Everything)
Double-click: `C:\Users\VICTUS 16\start-jarvis-complete.bat`

### Option 4: Automatic (On PC Restart)
✅ Already configured! JARVIS will start automatically 10 seconds after boot.

---

## 🗣️ Voice Commands

### Wake Word:
Say: **"JARVIS"**  
You'll hear: *"Yes, sir?"*

### Built-in Commands:
- **"JARVIS, open PAIDA"** - Launch Personal AI Desktop App
- **"JARVIS, what time is it?"** - Get current time
- **"JARVIS, what date is it?"** - Get current date
- **"JARVIS, goodbye"** - Stop voice recognition

### Send to Claude:
Say anything else after "JARVIS" and it gets sent to Claude Code for processing!

Examples:
- "JARVIS, write a Python script to organize my downloads folder"
- "JARVIS, explain how neural networks work"
- "JARVIS, help me debug this code"

---

## 📂 File Locations

### Scripts:
- `C:\Users\VICTUS 16\start-jarvis.bat` - Quick start
- `C:\Users\VICTUS 16\start-jarvis-voice.bat` - Voice only
- `C:\Users\VICTUS 16\start-jarvis-complete.bat` - Everything
- `C:\Users\VICTUS 16\jarvis-voice.py` - Voice recognition code

### Auto-Startup:
- `C:\Users\VICTUS 16\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\jarvis-autostart.bat`

### PAIDA Project:
- `C:\Users\VICTUS 16\Personal-AI-\` - Main project folder
- Run PAIDA: `cd Personal-AI- && npm run dev`

---

## 🛠️ Environment Variables (Auto-configured)

```
CLAUDE_CONFIG_DIR = C:\Users\VICTUS 16\.claude-omniroute
ANTHROPIC_BASE_URL = http://localhost:20128
ANTHROPIC_AUTH_TOKEN = sk-701e0a293aa77b9b-266020-bfa548f1
ANTHROPIC_MODEL = omniroute-free
```

---

## 🎯 Current Status

✅ Startup scripts created  
✅ Auto-boot configured  
✅ Voice recognition installed  
✅ PAIDA ready to launch  
✅ All saved to memory  

---

## 📝 Troubleshooting

### JARVIS doesn't start:
- Check if omniroute is running: Open cmd and type `omniroute`
- Verify Claude CLI: Type `claude --version`

### Voice recognition not working:
- Check microphone permissions in Windows Settings
- Make sure microphone is plugged in and working
- Try: `python jarvis-voice.py` to see error messages

### PAIDA won't open:
- Navigate to: `C:\Users\VICTUS 16\Personal-AI-`
- Run: `npm install` (if first time)
- Then: `npm run dev`

---

## 💡 Tips

- **Desktop Shortcut**: Right-click any `.bat` file → Send to → Desktop to create a shortcut
- **Voice Feedback**: JARVIS talks back to you using Windows text-to-speech
- **Microphone Calibration**: First launch takes ~5 seconds to calibrate ambient noise
- **Internet Required**: Voice recognition uses Google's speech API

---

## 🔮 Future Enhancements

Ideas for later:
- [ ] Add more custom voice commands
- [ ] Integrate with PAIDA directly
- [ ] Custom wake word options
- [ ] Voice response speed settings
- [ ] System control commands (open apps, etc.)

---

**Last Updated**: November 9, 2026  
**Your AI Assistant**: JARVIS (powered by Claude Code)

*Just like Tony Stark's lab, but on your PC!* 🦾
