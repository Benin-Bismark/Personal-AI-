# Setup Guide for Claude Code CLI

This document ensures you can always restore Claude's context for this project, even in new sessions.

## Quick Start for New Sessions

1. **Navigate to project directory**:
   ```bash
   cd "C:\Users\VICTUS 16\Personal-AI-"
   ```

2. **Start Claude**:
   ```bash
   claude
   ```

3. **Remind Claude** (if needed):
   ```
   Check CLAUDE.md for project details
   ```

## What's Already Configured

### 1. CLAUDE.md
- ✅ Project structure and conventions
- ✅ Development commands
- ✅ Coding patterns
- ✅ Common issues and solutions
- ✅ Integration details

### 2. .claudeignore
- ✅ Excludes `node_modules/`, `dist/`, build artifacts
- ✅ Ignores OS and IDE files
- ✅ Skips user data (conversations, personal settings)

### 3. Memory System
Location: `C:\Users\VICTUS 16\.claude-omniroute\projects\C--Users-VICTUS-16\memory\`

Files:
- `MEMORY.md` - Index of all memories
- `claude-desktop-app-project.md` - Project context and details

## Project Context Summary

**What This Is**: Electron desktop app providing a GUI for Claude Code CLI

**Key Features**:
- Chat interface with message history
- Screenshot support (Ctrl+Shift+S, paste, button)
- Voice notes recording
- File drag & drop
- Memory system
- Dark/light themes
- Syntax highlighting

**Tech Stack**:
- Electron 28.0.0 (main process)
- React 18.2.0 (frontend)
- Vite (build tool)
- IPC communication between processes

**Important Directories**:
- `main/` - Electron main process, IPC handlers
- `src/` - React components and frontend
- `preload/` - Secure IPC bridge

## Common Commands

```bash
# Development
npm run dev              # Run with hot reload
npm start                # Run production build

# Build
npm run build:win        # Build for Windows
npm run build:mac        # Build for macOS
npm run build:linux      # Build for Linux

# Install
npm install              # Install dependencies
```

## If Claude Loses Context

Ask Claude to:
1. "Read CLAUDE.md"
2. "Check the memory files at C:\Users\VICTUS 16\.claude-omniroute\projects\C--Users-VICTUS-16\memory\"
3. "Review the project structure"

## Repository

**GitHub**: https://github.com/Benin-Bismark/Personal-AI-.git

To pull latest:
```bash
git pull origin main
```

To push changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

### Claude doesn't remember the project
- Navigate to project directory first
- Share the GitHub repo link again
- Point to this SETUP.md file

### Claude can't access files
- Check you're in the project directory: `pwd`
- Verify Claude Code CLI is installed: `claude --version`

### Memory not loading
- Check memory directory exists: `ls ~/.claude-omniroute/projects/*/memory/`
- Files should auto-load each session

## Future Setup Tasks

- [ ] Configure MCP servers (if needed)
- [ ] Add custom hooks (if needed)
- [ ] Set up CI/CD for builds
- [ ] Configure auto-updates

---

**Created**: 2026-11-09
**Last Updated**: 2026-11-09
**Maintainer**: Benin-Bismark
