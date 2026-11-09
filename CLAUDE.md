# Claude Desktop App - Project Guide

## Project Overview
This is an Electron-based desktop GUI application that provides a beautiful interface for Claude Code CLI with multimodal capabilities (screenshots, voice notes, file attachments).

**Repository**: https://github.com/Benin-Bismark/Personal-AI-.git
**Tech Stack**: Electron 28.0.0 + React 18.2.0 + Vite
**Platform**: Cross-platform (Windows, macOS, Linux)

## Project Structure

```
Personal-AI-/
├── main/                    # Electron main process
│   └── main.js             # App entry, IPC handlers, CLI integration
├── preload/                # Electron preload scripts
│   └── preload.js          # Secure IPC bridge
├── src/                    # React application
│   ├── components/
│   │   ├── ChatWindow.jsx  # Message display component
│   │   ├── InputArea.jsx   # Message input with attachments
│   │   ├── Sidebar.jsx     # Navigation and memories
│   │   └── Settings.jsx    # Settings modal
│   ├── App.jsx             # Main React component
│   ├── main.jsx            # React entry point
│   └── *.css               # Component styles
├── assets/                 # Icons and images
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── start.bat               # Quick start script for Windows
```

## Development Commands

### Running the App
```bash
npm run dev              # Run in development mode (hot reload)
npm start                # Run in production mode
```

### Building
```bash
npm run build            # Build for all platforms
npm run build:win        # Build for Windows (NSIS installer)
npm run build:mac        # Build for macOS (DMG)
npm run build:linux      # Build for Linux (AppImage)
```

### Installing Dependencies
```bash
npm install              # Install all dependencies
```

## Key Features

1. **Chat Interface** - Claude.ai-like experience with message history
2. **Screenshots** - Three methods: Ctrl+Shift+S, 📸 button, Ctrl+V paste
3. **Voice Notes** - Record and transcribe audio messages
4. **File Attachments** - Drag & drop or browse to attach files
5. **Memory System** - Stores user preferences and conversation history
6. **Settings** - Theme, font size, model selection, privacy options
7. **Syntax Highlighting** - Beautiful code blocks with react-syntax-highlighter
8. **Markdown Support** - Full markdown rendering with react-markdown

## User Data Storage

**Windows**: `%APPDATA%\claude-desktop-app\`
**macOS**: `~/Library/Application Support/claude-desktop-app/`
**Linux**: `~/.config/claude-desktop-app/`

Stores:
- `settings.json` - User preferences
- `memory/` - User context and preferences
- `conversations/` - Chat history

## Coding Conventions

### JavaScript/React Style
- Use functional components with hooks
- Prefer `const` over `let`
- Use async/await for asynchronous operations
- Keep components small and focused
- Use meaningful variable names

### File Naming
- Components: PascalCase (e.g., `ChatWindow.jsx`)
- Utilities: camelCase (e.g., `main.js`)
- CSS: Match component name (e.g., `ChatWindow.css`)

### IPC Communication Pattern
```javascript
// Main process (main.js)
ipcMain.handle('channel-name', async (event, args) => {
  // Handle request
  return { success: true, data: result };
});

// Preload (preload.js)
contextBridge.exposeInMainWorld('electronAPI', {
  methodName: (args) => ipcRenderer.invoke('channel-name', args)
});

// Renderer (React)
const result = await window.electronAPI.methodName(args);
```

## Integration with Claude CLI

The app spawns Claude CLI as a child process and communicates via stdin/stdout:
- Messages are sent via `claudeProcess.stdin.write()`
- Responses are captured from `claudeProcess.stdout.on('data')`
- Uses message queuing to handle multiple requests

## When Working on This Project

### Before Making Changes
1. Read the relevant files first
2. Check if the feature exists in components
3. Understand the IPC communication flow
4. Consider electron security (contextIsolation, nodeIntegration)

### Testing
1. Run `npm run dev` to test changes with hot reload
2. Test all three platforms if changing main process code
3. Check user data directory for persistent storage issues
4. Test with actual Claude CLI integration

### Adding New Features
1. UI changes → Update React components in `src/`
2. Backend logic → Update `main/main.js`
3. IPC communication → Update both `main.js` and `preload.js`
4. Always maintain security boundaries (no nodeIntegration in renderer)

## Common Issues & Solutions

### Claude CLI Not Found
- Ensure Claude Code CLI is in PATH
- Test with: `claude --version`

### IPC Not Working
- Check `preload.js` exposes the method
- Verify `main.js` has the handler
- Ensure contextIsolation is enabled

### Build Failures
- Check all paths in electron-builder config
- Ensure assets exist in `assets/` folder
- Verify `dist/` folder is built before packaging

## Future Improvements Roadmap

Priority items:
- [ ] Better voice transcription (Web Speech API or cloud service)
- [ ] Search within conversations
- [ ] Export conversations to markdown
- [ ] Custom keyboard shortcuts
- [ ] Multiple conversation tabs

## Working with Claude (You!)

### Preferences
- Keep code clean and well-commented
- Follow existing patterns in the codebase
- Test changes before committing
- Explain architectural decisions for major changes
- Use modern JavaScript/React features
- Prioritize user experience and performance

### When in Doubt
- Check existing component implementations first
- Follow Electron security best practices
- Ask before making breaking changes
- Reference official docs (Electron, React, Vite)

---

**Last Updated**: 2026-11-09
**Maintainer**: Benin-Bismark
