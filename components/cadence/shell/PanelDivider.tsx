'use client';

import React from 'react';
import styles from './PanelDivider.module.scss';

interface PanelDividerProps {
  /** Orientation of the divider */
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

/**
 * PanelDivider - Vertical or horizontal line between panels
 * 
 * Width: 1px
 * Color: border-subtle
 * Height: calc(100vh - 48px) for vertical
 */
export function PanelDivider({
  orientation = 'vertical',
  className = '',
}: PanelDividerProps) {
  return (
    <div 
      className={`${styles.panelDivider} ${styles[orientation]} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
}

export default PanelDivider;
