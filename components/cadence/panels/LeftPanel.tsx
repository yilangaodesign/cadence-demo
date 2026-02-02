'use client';

import React, { ReactNode } from 'react';
import styles from './LeftPanel.module.scss';

interface LeftPanelProps {
  /** Panel content */
  children?: ReactNode;
  className?: string;
}

/**
 * LeftPanel - Container for the left column
 * 
 * Width: 320px fixed
 * Padding: 16px top and horizontal
 * Scrolls internally
 */
export function LeftPanel({
  children,
  className = '',
}: LeftPanelProps) {
  return (
    <div className={`${styles.leftPanel} ${className}`}>
      {children}
    </div>
  );
}

export default LeftPanel;
