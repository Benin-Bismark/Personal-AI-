# Claude Desktop App

A beautiful desktop GUI application for Claude Code CLI with support for screenshots, voice notes, file attachments, and intelligent memory.

![Claude Desktop](https://img.shields.io/badge/Claude-Desktop-6366f1)
![Electron](https://img.shields.io/badge/Electron-28.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, clean interface with dark/light themes
- 💬 **Chat Interface** - Claude.ai-like experience on your desktop
- 📸 **Screenshot Support** - Capture and paste screenshots directly (Ctrl+Shift+S)
- 🎤 **Voice Notes** - Record and transcribe voice messages
- 📁 **File Drag & Drop** - Drop files directly into the chat
- 🎯 **Syntax Highlighting** - Beautiful code blocks with syntax highlighting
- 🧠 **Memory System** - Remembers your preferences, style, and conversations
- 🔄 **Conversation History** - All chats are saved and can be resumed
- ⚙️ **Customizable Settings** - Theme, font size, model selection, and more

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Claude Code CLI installed and available in your PATH

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

3. Build for production:
```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## 🎮 Usage

### Basic Chat
- Type your message and press Enter (or click send)
- Shift+Enter for new lines
- Messages are sent to Claude Code CLI in the background

### Screenshots
- **Method 1**: Press `Ctrl+Shift+S` (global shortcut)
- **Method 2**: Click the 📸 button
- **Method 3**: Paste an image directly with `Ctrl+V`

### Voice Notes
- Click the 🎤 button to start recording
- Click ⏹️ to stop recording
- Voice will be transcribed and sent with your message

### File Attachments
- **Method 1**: Drag and drop files into the chat window
- **Method 2**: Click the 📎 button to browse files
- Files are read and sent to Claude for analysis

### Settings
- Click ⚙️ Settings in the sidebar
- Customize theme, font size, model selection
- Configure memory and privacy preferences

## 📂 Project Structure

```
claude-desktop-app/
├── main/                 # Electron main process
│   └── main.js          # App entry, IPC handlers, CLI integration
├── preload/             # Electron preload scripts
│   └── preload.js       # Secure IPC bridge
├── src/                 # React application
│   ├── components/      # UI components
│   │   ├── ChatWindow.jsx      # Message display
│   │   ├── InputArea.jsx       # Message input with attachments
│   │   ├── Sidebar.jsx         # Navigation and memories
│   │   └── Settings.jsx        # Settings modal
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # React entry point
│   └── *.css            # Component styles
├── assets/              # Icons and images
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

### User Data Location
All user data (settings, conversations, memories) is stored in:
- **Windows**: `%APPDATA%\claude-desktop-app\`
- **macOS**: `~/Library/Application Support/claude-desktop-app/`
- **Linux**: `~/.config/claude-desktop-app/`

### Memory System
The app creates a memory directory that stores:
- **User preferences**: Your likes/dislikes, coding style
- **Conversation history**: Past chats for context
- **Settings**: Theme, model choice, privacy options

## 🎨 Customization

### Themes
Edit the CSS custom properties in `src/App.css`:
- `--bg-primary`: Main background
- `--accent`: Primary accent color
- `--text-primary`: Main text color

### Models
Available models (configurable in settings):
- omniroute-free
- claude-opus-5-5
- claude-sonnet-5-5
- claude-haiku-5-5

## 🤝 Contributing

This is a personal project, but feel free to fork and customize it for your needs!

## 📝 Future Improvements

Some ideas for future enhancements:
- [ ] Better voice transcription (Web Speech API or cloud service)
- [ ] Image editing before sending
- [ ] Search within conversations
- [ ] Export conversations to markdown
- [ ] Multiple conversation tabs
- [ ] Custom keyboard shortcuts
- [ ] Plugin system
- [ ] Mobile companion app

## 🐛 Troubleshooting

### Claude CLI not found
Make sure Claude Code CLI is installed and available in your PATH:
```bash
claude --version
```

### Microphone not working
Check your system permissions for microphone access.

### Screenshots not capturing
Try using the paste method (Ctrl+V) instead of screen capture.

## 📄 License

MIT License - Feel free to use and modify as you wish!

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI powered by [React](https://react.dev/)
- Syntax highlighting by [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- Markdown rendering by [react-markdown](https://github.com/remarkjs/react-markdown)

---

Made with ❤️ for a better Claude experience
