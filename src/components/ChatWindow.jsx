import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ChatWindow.css';

function ChatWindow({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h1>👋 Welcome to Claude Desktop</h1>
            <p>I can help you with:</p>
            <ul>
              <li>💻 Writing and debugging code</li>
              <li>📸 Analyzing screenshots you paste or capture</li>
              <li>🎤 Understanding voice notes you record</li>
              <li>📁 Reading and analyzing files you drop here</li>
              <li>🧠 Remembering your preferences and style</li>
            </ul>
            <p className="hint">
              <strong>Tip:</strong> Press <kbd>Ctrl+Shift+S</kbd> to take a screenshot
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.role} ${message.isError ? 'error' : ''}`}
          >
            <div className="message-header">
              <span className="message-role">
                {message.role === 'user' ? '👤 You' : '🤖 Claude'}
              </span>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="message-content">
              {message.role === 'user' ? (
                <>
                  <p>{message.content}</p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="attachments">
                      {message.attachments.map((att, idx) => (
                        <div key={idx} className={`attachment ${att.type}`}>
                          {att.type === 'image' && (
                            <img src={att.data} alt="Attachment" />
                          )}
                          {att.type === 'file' && (
                            <div className="file-attachment">
                              📄 {att.name}
                            </div>
                          )}
                          {att.type === 'audio' && (
                            <div className="audio-attachment">
                              🎤 Voice note: {att.transcription}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message assistant loading">
            <div className="message-header">
              <span className="message-role">🤖 Claude</span>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
