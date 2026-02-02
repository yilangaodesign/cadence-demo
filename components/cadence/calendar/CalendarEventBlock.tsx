'use client';

import React from 'react';
import styles from './CalendarEventBlock.module.scss';

export type CalendarEventState = 'default' | 'hover' | 'current' | 'conflict' | 'past' | 'new-sync';

interface CalendarEventBlockProps {
  /** Event name/title */
  name: string;
  /** Location or "(read-only)" text */
  location?: string;
  /** Event state */
  state?: CalendarEventState;
  /** Top position in pixels */
  top?: number;
  /** Height in pixels */
  height?: number;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

/**
 * CalendarEventBlock - Calendar meeting rendered on timeline grid
 * 
 * Terra accent: #C27A5A left border
 * Background: terra-10 (#F9F3F1)
 * Read-only (not draggable)
 */
export function CalendarEventBlock({
  name,
  location = '(read-only)',
  state = 'default',
  top = 0,
  height = 60,
  onClick,
  className = '',
}: CalendarEventBlockProps) {
  return (
    <div
      className={`${styles.calendarEventBlock} ${styles[state]} ${className}`}
      style={{ top, height }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <span className={styles.eventName}>{name}</span>
      <span className={styles.eventLocation}>{location}</span>
    </div>
  );
}

export default CalendarEventBlock;
