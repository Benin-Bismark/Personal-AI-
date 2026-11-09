import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    loadSettings();
    loadMemories();
    loadConversations();
  }, []);

  const loadSettings = async () => {
    const result = await window.electronAPI.getSettings();
    if (result.success) {
      setSettings(result.settings);
    }
  };

  const loadMemories = async () => {
    const result = await window.electronAPI.loadMemories();
    if (result.success) {
      setMemories(result.memories);
    }
  };

  const loadConversations = async () => {
    const result = await window.electronAPI.loadConversations();
    if (result.success && result.conversations.length > 0) {
      // Load the most recent conversation
      const lastConversation = result.conversations[result.conversations.length - 1];
      setMessages(lastConversation.messages || []);
    }
  };

  const handleSendMessage = async (message, attachments = []) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      attachments,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare context with attachments
      let fullMessage = message;

      if (attachments.length > 0) {
        fullMessage += '\n\nAttachments:\n';
        attachments.forEach((att) => {
          if (att.type === 'file') {
            fullMessage += `File: ${att.name}\n${att.content}\n\n`;
          } else if (att.type === 'image') {
            fullMessage += `[Screenshot attached]\n`;
          } else if (att.type === 'audio') {
            fullMessage += `Voice note: ${att.transcription}\n`;
          }
        });
      }

      // Send to Claude Code CLI
      const result = await window.electronAPI.sendToClaude(fullMessage);

      // Add Claude's response
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.response || 'I apologize, but I encountered an error processing your request.',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save conversation
      await window.electronAPI.saveConversation({
        messages: [...messages, userMessage, assistantMessage],
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${error.error || error.message || 'Failed to communicate with Claude'}`,
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = async (newSettings) => {
    await window.electronAPI.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className={`app ${settings?.theme || 'dark'}`}>
      <Sidebar
        onNewChat={handleNewChat}
        onOpenSettings={() => setShowSettings(true)}
        conversations={[]}
        memories={memories}
      />

      <div className="main-content">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <InputArea onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>

      {showSettings && (
        <Settings
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsChange}
        />
      )}
    </div>
  );
}

export default App;
