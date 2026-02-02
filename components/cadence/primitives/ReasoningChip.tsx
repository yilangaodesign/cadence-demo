'use client';

import React from 'react';
import { Email, Chat, Calendar, Document } from '@carbon/icons-react';
import styles from './ReasoningChip.module.scss';

export type SourceType = 'email' | 'chat' | 'calendar' | 'document';

interface ReasoningChipProps {
  /** Label text for the chip */
  label: string;
  /** Type of source (determines icon) */
  sourceType: SourceType;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

/**
 * ReasoningChip - Tappable source-attribution chip
 * 
 * Used on AI-generated tasks and suggestions to show where
 * the information came from. Uses Lumen palette.
 * 
 * Source icons: Email, Chat (Slack), Calendar, Document
 */
export function ReasoningChip({
  label,
  sourceType,
  onClick,
  className = '',
}: ReasoningChipProps) {
  const SourceIcon = {
    email: Email,
    chat: Chat,
    calendar: Calendar,
    document: Document,
  }[sourceType];

  return (
    <button
      type="button"
      className={`${styles.reasoningChip} ${className}`}
      onClick={onClick}
    >
      <SourceIcon size={16} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default ReasoningChip;
