'use client';

import React, { useState } from 'react';
import { Document, OverflowMenuVertical } from '@carbon/icons-react';
import { MonoValue } from '../primitives/MonoValue';
import styles from './MeetingCard.module.scss';

export type MeetingCardState = 'default' | 'hover' | 'active' | 'conflict' | 'past' | 'syncing';

interface MeetingCardProps {
  /** Meeting title */
  title: string;
  /** Start time (e.g., "9:00 AM") */
  startTime: string;
  /** Duration (e.g., "1h") */
  duration: string;
  /** Location or subtitle */
  subtitle?: string;
  /** Override state */
  state?: MeetingCardState;
  /** Click handler for document icon */
  onDocumentClick?: () => void;
  /** Click handler for overflow menu */
  onMenuClick?: () => void;
  /** Main click handler */
  onClick?: () => void;
  className?: string;
}

/**
 * MeetingCard - Calendar meeting entry with Terra accent
 * 
 * All calendar events use Terra palette to encode "a human put this on your schedule"
 * 
 * States:
 * - default: Standard meeting
 * - hover: Subtle warmth on hover
 * - active: Current meeting (bold title)
 * - conflict: Meeting causing schedule conflict (red border)
 * - past: Completed meeting (reduced opacity)
 * - syncing: Calendar sync in progress (skeleton shimmer)
 */
export function MeetingCard({
  title,
  startTime,
  duration,
  subtitle,
  state: propState,
  onDocumentClick,
  onMenuClick,
  onClick,
  className = '',
}: MeetingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate effective state
  const state = propState || (isHovered ? 'hover' : 'default');

  const stateClass = {
    default: styles.default,
    hover: styles.hover,
    active: styles.active,
    conflict: styles.conflict,
    past: styles.past,
    syncing: styles.syncing,
  }[state];

  return (
    <div
      className={`${styles.meetingCard} ${stateClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Terra accent border - left side */}
      <div className={styles.terraAccent} />
      
      {/* Time column */}
      <div className={styles.timeColumn}>
        <MonoValue className={styles.startTime}>{startTime}</MonoValue>
        <span className={styles.duration}>{duration}</span>
      </div>

      {/* Content column */}
      <div className={styles.contentColumn}>
        <h4 className={styles.title}>{title}</h4>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>

      {/* Actions column */}
      <div className={styles.actionsColumn}>
        {onDocumentClick && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={(e) => {
              e.stopPropagation();
              onDocumentClick();
            }}
            aria-label="Open document"
          >
            <Document size={16} />
          </button>
        )}
        {onMenuClick && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick();
            }}
            aria-label="More options"
          >
            <OverflowMenuVertical size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default MeetingCard;
