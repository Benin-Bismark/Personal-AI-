import React, { useState, useRef, useEffect } from 'react';
import './InputArea.css';

function InputArea({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Listen for screenshot triggers
    window.electronAPI.onTriggerScreenshot(() => {
      handleScreenshot();
    });
  }, []);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setAttachments((prev) => [
            ...prev,
            {
              type: 'image',
              data: event.target.result,
              name: 'Pasted Image',
            },
          ]);
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const handleScreenshot = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
      });

      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        stream.getTracks().forEach((track) => track.stop());

        const imageData = canvas.toDataURL('image/png');
        setAttachments((prev) => [
          ...prev,
          {
            type: 'image',
            data: imageData,
            name: 'Screenshot',
          },
        ]);
      };
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  const handleFileSelect = async () => {
    const result = await window.electronAPI.selectFiles();
    if (result.success && result.files) {
      const newAttachments = result.files.map((file) => ({
        type: 'file',
        name: file.path.split('\\').pop(),
        content: file.content,
        path: file.path,
      }));
      setAttachments((prev) => [...prev, ...newAttachments]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (file.type.startsWith('image/')) {
          setAttachments((prev) => [
            ...prev,
            {
              type: 'image',
              data: event.target.result,
              name: file.name,
            },
          ]);
        } else {
          setAttachments((prev) => [
            ...prev,
            {
              type: 'file',
              name: file.name,
              content: event.target.result,
            },
          ]);
        }
      };

      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

        // Simple transcription placeholder (in production, use Web Speech API or cloud service)
        const transcription = '[Voice note recorded - transcription will be added]';

        setAttachments((prev) => [
          ...prev,
          {
            type: 'audio',
            transcription,
            blob: audioBlob,
          },
        ]);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording failed:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="input-area"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((att, idx) => (
            <div key={idx} className="attachment-preview">
              {att.type === 'image' && (
                <img src={att.data} alt={att.name} />
              )}
              {att.type === 'file' && <span>📄 {att.name}</span>}
              {att.type === 'audio' && <span>🎤 Voice note</span>}
              <button
                onClick={() => removeAttachment(idx)}
                className="remove-attachment"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-controls">
          <button
            type="button"
            onClick={handleFileSelect}
            className="control-button"
            title="Attach file"
            disabled={disabled}
          >
            📎
          </button>

          <button
            type="button"
            onClick={handleScreenshot}
            className="control-button"
            title="Take screenshot (Ctrl+Shift+S)"
            disabled={disabled}
          >
            📸
          </button>

          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`control-button ${isRecording ? 'recording' : ''}`}
            title={isRecording ? 'Stop recording' : 'Record voice note'}
            disabled={disabled}
          >
            {isRecording ? '⏹️' : '🎤'}
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Message Claude... (Shift+Enter for new line)"
          className="message-input"
          disabled={disabled}
          rows={1}
        />

        <button
          type="submit"
          className="send-button"
          disabled={disabled || (!message.trim() && attachments.length === 0)}
        >
          ➤
        </button>
      </form>
    </div>
  );
}

export default InputArea;
