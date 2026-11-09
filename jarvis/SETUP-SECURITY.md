# JARVIS Setup Instructions

## 🔐 Security Configuration

**IMPORTANT**: Before running JARVIS, you need to set your authentication token.

### Option 1: Windows Environment Variables (Recommended)

1. Press `Win + X` and select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "User variables", click "New"
5. Variable name: `ANTHROPIC_AUTH_TOKEN`
6. Variable value: `sk-701e0a293aa77b9b-266020-bfa548f1`
7. Click OK and restart your terminal

### Option 2: Edit the Startup Scripts Directly

**For personal use only** - edit these files and add your token:

**`start-jarvis.ps1`** (line 25):
```powershell
$env:ANTHROPIC_AUTH_TOKEN = "sk-701e0a293aa77b9b-266020-bfa548f1"
```

**`start-jarvis-complete.ps1`** (line 25):
```powershell
$env:ANTHROPIC_AUTH_TOKEN = "sk-701e0a293aa77b9b-266020-bfa548f1"
```

**Note**: Never commit these changes to a public repository!

### Option 3: Create Local Config File

1. Copy `config.template.env` to `config.env`
2. Edit `config.env` and add your token
3. The `.gitignore` will keep it private

---

## 🚀 Quick Start

Once configured:

1. **Manual Start**: Double-click `start-jarvis.bat`
2. **With Voice**: Double-click `start-jarvis-voice.bat`
3. **Complete System**: Double-click `start-jarvis-complete.bat`

## 📖 Full Documentation

See `JARVIS-GUIDE.md` for complete instructions and voice commands.

---

**Last Updated**: November 9, 2026
