const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');

let mainWindow;
let claudeProcess = null;

// Memory storage path
const MEMORY_DIR = path.join(app.getPath('userData'), 'memory');
const SETTINGS_FILE = path.join(app.getPath('userData'), 'settings.json');
const CONVERSATIONS_DIR = path.join(app.getPath('userData'), 'conversations');

// Initialize storage directories
async function initStorage() {
  try {
    await fs.mkdir(MEMORY_DIR, { recursive: true });
    await fs.mkdir(CONVERSATIONS_DIR, { recursive: true });

    // Create default settings if they don't exist
    try {
      await fs.access(SETTINGS_FILE);
    } catch {
      const defaultSettings = {
        theme: 'dark',
        fontSize: 14,
        model: 'omniroute-free',
        preferences: {},
        userStyle: {
          tone: 'friendly',
          verbosity: 'balanced',
          codeStyle: 'clean'
        }
      };
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
    }
  } catch (error) {
    console.error('Failed to initialize storage:', error);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js'),
    },
    backgroundColor: '#1a1a1a',
    titleBarStyle: 'default',
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Register global screenshot shortcut
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    mainWindow.webContents.send('trigger-screenshot');
  });
}

app.whenReady().then(async () => {
  await initStorage();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  if (claudeProcess) {
    claudeProcess.kill();
  }
});

// IPC Handlers

// Send message to Claude Code CLI
ipcMain.handle('send-to-claude', async (event, message) => {
  return new Promise((resolve, reject) => {
    try {
      // Spawn Claude Code CLI process
      claudeProcess = spawn('claude', [], {
        shell: true,
        cwd: process.cwd(),
      });

      let output = '';
      let errorOutput = '';

      claudeProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      claudeProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      claudeProcess.on('close', (code) => {
        claudeProcess = null;
        if (code === 0) {
          resolve({ success: true, response: output });
        } else {
          reject({ success: false, error: errorOutput || 'Claude process failed' });
        }
      });

      // Send the message to Claude
      claudeProcess.stdin.write(message + '\n');
      claudeProcess.stdin.end();

    } catch (error) {
      reject({ success: false, error: error.message });
    }
  });
});

// Save conversation
ipcMain.handle('save-conversation', async (event, conversation) => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `conversation-${timestamp}.json`;
    const filepath = path.join(CONVERSATIONS_DIR, filename);

    await fs.writeFile(filepath, JSON.stringify(conversation, null, 2));
    return { success: true, filepath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Load conversation history
ipcMain.handle('load-conversations', async () => {
  try {
    const files = await fs.readdir(CONVERSATIONS_DIR);
    const conversations = [];

    for (const file of files.slice(-10)) { // Last 10 conversations
      const filepath = path.join(CONVERSATIONS_DIR, file);
      const content = await fs.readFile(filepath, 'utf-8');
      conversations.push(JSON.parse(content));
    }

    return { success: true, conversations };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Get settings
ipcMain.handle('get-settings', async () => {
  try {
    const content = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return { success: true, settings: JSON.parse(content) };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Save settings
ipcMain.handle('save-settings', async (event, settings) => {
  try {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Save memory
ipcMain.handle('save-memory', async (event, memoryData) => {
  try {
    const { name, content, type } = memoryData;
    const filename = `${name}.md`;
    const filepath = path.join(MEMORY_DIR, filename);

    await fs.writeFile(filepath, content);
    return { success: true, filepath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Load memories
ipcMain.handle('load-memories', async () => {
  try {
    const files = await fs.readdir(MEMORY_DIR);
    const memories = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filepath = path.join(MEMORY_DIR, file);
        const content = await fs.readFile(filepath, 'utf-8');
        memories.push({ name: file, content });
      }
    }

    return { success: true, memories };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// File dialog for drag-and-drop alternative
ipcMain.handle('select-files', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'multiSelections'],
    });

    if (!result.canceled) {
      const files = [];
      for (const filepath of result.filePaths) {
        const content = await fs.readFile(filepath, 'utf-8');
        files.push({ path: filepath, content });
      }
      return { success: true, files };
    }
    return { success: false, canceled: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Screenshot capture (will be handled by renderer with native APIs)
ipcMain.handle('save-screenshot', async (event, imageData) => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `screenshot-${timestamp}.png`;
    const filepath = path.join(app.getPath('temp'), filename);

    // Remove data URL prefix
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    await fs.writeFile(filepath, buffer);
    return { success: true, filepath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
