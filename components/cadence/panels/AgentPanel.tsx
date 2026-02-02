'use client';

import React, { useState, ReactNode } from 'react';
import { Send } from '@carbon/icons-react';
import { TextInput, Button } from '@carbon/react';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './AgentPanel.module.scss';

interface AgentMessage {
  id: string;
  type: 'agent' | 'user';
  content: string;
  actions?: {
    label: string;
    value: string;
  }[];
  showPreviewPlan?: boolean;
  showApply?: boolean;
  showUndo?: boolean;
}

interface AgentPanelProps {
  /** Chat messages */
  messages?: AgentMessage[];
  /** Called when user sends a message */
  onSendMessage?: (message: string) => void;
  /** Called when "Preview plan" is clicked */
  onPreviewPlan?: () => void;
  /** Called when "Apply" is clicked */
  onApply?: () => void;
  /** Called when "Undo last" is clicked */
  onUndoLast?: () => void;
  /** Called when a suggested action is selected */
  onActionSelect?: (messageId: string, value: string) => void;
  /** Placeholder text for input */
  placeholder?: string;
  className?: string;
}

/**
 * AgentPanel - Conversational AI interface
 * 
 * Layout: Chat thread (scrollable) + Input bar (fixed bottom)
 * Agent messages: Left-aligned, Lumen-10 background
 * User messages: Right-aligned, surface-inverse background
 */
export function AgentPanel({
  messages = [],
  onSendMessage,
  onPreviewPlan,
  onApply,
  onUndoLast,
  onActionSelect,
  placeholder = 'Type a message…',
  className = '',
}: AgentPanelProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage?.(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`${styles.agentPanel} ${className}`}>
      {/* Chat thread */}
      <div className={styles.chatThread}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              Hi! I'm your AI assistant. Ask me to help reschedule tasks, find focus time, or optimize your day.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[message.type]}`}
            >
              <div className={styles.messageBubble}>
                <p className={styles.messageContent}>{message.content}</p>
                
                {/* Suggested actions */}
                {message.actions && message.actions.length > 0 && (
                  <div className={styles.actions}>
                    {message.actions.map((action) => (
                      <label key={action.value} className={styles.actionItem}>
                        <input
                          type="radio"
                          name={`action-${message.id}`}
                          value={action.value}
                          onChange={() => onActionSelect?.(message.id, action.value)}
                          className={styles.actionRadio}
                        />
                        <span className={styles.actionDot} />
                        <span className={styles.actionLabel}>{action.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                {(message.showPreviewPlan || message.showApply || message.showUndo) && (
                  <div className={styles.actionButtons}>
                    {message.showPreviewPlan && (
                      <CadenceButton variant="secondary" size="sm" onClick={onPreviewPlan}>
                        Preview plan
                      </CadenceButton>
                    )}
                    {message.showApply && (
                      <CadenceButton variant="primary" size="sm" onClick={onApply}>
                        Apply
                      </CadenceButton>
                    )}
                    {message.showUndo && (
                      <CadenceButton variant="ghost" size="sm" onClick={onUndoLast}>
                        Undo last
                      </CadenceButton>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input bar */}
      <div className={styles.inputBar}>
        <TextInput
          id="agent-input"
          labelText=""
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.textInput}
        />
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Send}
          iconDescription="Send"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={styles.sendButton}
        />
      </div>
    </div>
  );
}

export default AgentPanel;
