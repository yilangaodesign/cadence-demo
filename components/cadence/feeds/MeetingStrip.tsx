'use client';

import React, { ReactNode } from 'react';
import styles from './MeetingStrip.module.scss';

interface MeetingStripProps {
  /** Meeting cards */
  children?: ReactNode;
  /** Maximum height before scrolling */
  maxHeight?: number;
  className?: string;
}

/**
 * MeetingStrip - Read-only list of today's calendar meetings
 * 
 * Always visible regardless of tab mode
 * Max height: 180px (scrollable if >3 meetings)
 */
export function MeetingStrip({
  children,
  maxHeight = 180,
  className = '',
}: MeetingStripProps) {
  const hasChildren = React.Children.count(children) > 0;

  if (!hasChildren) return null;

  return (
    <div 
      className={`${styles.meetingStrip} ${className}`}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
}

export default MeetingStrip;
