const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Claude Code CLI integration
  sendToClaude: (message) => ipcRenderer.invoke('send-to-claude', message),

  // Conversation management
  saveConversation: (conversation) => ipcRenderer.invoke('save-conversation', conversation),
  loadConversations: () => ipcRenderer.invoke('load-conversations'),

  // Settings management
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),

  // Memory management
  saveMemory: (memoryData) => ipcRenderer.invoke('save-memory', memoryData),
  loadMemories: () => ipcRenderer.invoke('load-memories'),

  // File operations
  selectFiles: () => ipcRenderer.invoke('select-files'),
  saveScreenshot: (imageData) => ipcRenderer.invoke('save-screenshot', imageData),

  // Event listeners
  onTriggerScreenshot: (callback) => ipcRenderer.on('trigger-screenshot', callback),
});
