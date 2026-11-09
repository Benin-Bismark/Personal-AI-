import React from 'react';
import './Sidebar.css';

function Sidebar({ onNewChat, onOpenSettings, conversations, memories }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🤖 Claude</h2>
        <button onClick={onNewChat} className="new-chat-button" title="New chat">
          ➕
        </button>
      </div>

      <div className="sidebar-section">
        <h3>Conversations</h3>
        <div className="conversations-list">
          {conversations.length === 0 ? (
            <p className="empty-state">No conversations yet</p>
          ) : (
            conversations.map((conv, idx) => (
              <div key={idx} className="conversation-item">
                {conv.title || `Conversation ${idx + 1}`}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>💭 Memories</h3>
        <div className="memories-list">
          {memories.length === 0 ? (
            <p className="empty-state">No memories saved yet</p>
          ) : (
            <p className="memory-count">{memories.length} memories stored</p>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <button onClick={onOpenSettings} className="settings-button">
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
