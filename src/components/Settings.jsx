import React, { useState } from 'react';
import './Settings.css';

function Settings({ settings, onClose, onSave }) {
  const [localSettings, setLocalSettings] = useState(settings || {});

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleChange = (key, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-group">
            <h3>Appearance</h3>

            <div className="setting-item">
              <label>Theme</label>
              <select
                value={localSettings.theme || 'dark'}
                onChange={(e) => handleChange('theme', e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Font Size</label>
              <input
                type="number"
                min="10"
                max="24"
                value={localSettings.fontSize || 14}
                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="setting-group">
            <h3>Model Settings</h3>

            <div className="setting-item">
              <label>Model</label>
              <select
                value={localSettings.model || 'omniroute-free'}
                onChange={(e) => handleChange('model', e.target.value)}
              >
                <option value="omniroute-free">Omniroute Free</option>
                <option value="claude-opus-5-5">Claude Opus 5.5</option>
                <option value="claude-sonnet-5-5">Claude Sonnet 5.5</option>
                <option value="claude-haiku-5-5">Claude Haiku 5.5</option>
              </select>
            </div>
          </div>

          <div className="setting-group">
            <h3>Memory & Learning</h3>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.rememberPreferences !== false}
                  onChange={(e) => handleChange('rememberPreferences', e.target.checked)}
                />
                Remember my preferences
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.learnWritingStyle !== false}
                  onChange={(e) => handleChange('learnWritingStyle', e.target.checked)}
                />
                Learn my writing style
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.persistConversations !== false}
                  onChange={(e) => handleChange('persistConversations', e.target.checked)}
                />
                Save conversation history
              </label>
            </div>
          </div>

          <div className="setting-group">
            <h3>Privacy</h3>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.saveScreenshots !== false}
                  onChange={(e) => handleChange('saveScreenshots', e.target.checked)}
                />
                Save screenshots locally
              </label>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.saveVoiceNotes !== false}
                  onChange={(e) => handleChange('saveVoiceNotes', e.target.checked)}
                />
                Save voice notes locally
              </label>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
