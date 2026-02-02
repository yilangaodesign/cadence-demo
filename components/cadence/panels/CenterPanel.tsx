'use client';

import React, { ReactNode } from 'react';
import styles from './CenterPanel.module.scss';

interface CenterPanelProps {
  /** Tab strip content */
  tabStrip?: ReactNode;
  /** Browser controls content */
  browserControls?: ReactNode;
  /** Main content area */
  children?: ReactNode;
  /** Empty state message */
  emptyMessage?: string;
  className?: string;
}

/**
 * CenterPanel - The embedded workbench
 * 
 * Layout: WorkbenchTabStrip (36px) + BrowserControls (36px) + ContentArea (fill)
 * Width: flex: 1 (fills remaining space)
 */
export function CenterPanel({
  tabStrip,
  browserControls,
  children,
  emptyMessage = 'Open a task to load its workspace',
  className = '',
}: CenterPanelProps) {
  const isEmpty = !children;

  return (
    <div className={`${styles.centerPanel} ${className}`}>
      {tabStrip && (
        <div className={styles.tabStrip}>
          {tabStrip}
        </div>
      )}
      {browserControls && (
        <div className={styles.browserControls}>
          {browserControls}
        </div>
      )}
      <div className={styles.contentArea}>
        {isEmpty ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default CenterPanel;
