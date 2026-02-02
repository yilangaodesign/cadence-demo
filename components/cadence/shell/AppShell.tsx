'use client';

import React, { ReactNode } from 'react';
import styles from './AppShell.module.scss';

export type AppShellState = 'default' | 'left-collapsed' | 'right-collapsed' | 'focus-mode';

interface AppShellProps {
  /** Top chrome content */
  topChrome?: ReactNode;
  /** Left panel content */
  leftPanel?: ReactNode;
  /** Center panel content */
  centerPanel?: ReactNode;
  /** Right panel content */
  rightPanel?: ReactNode;
  /** Shell state for panel visibility */
  state?: AppShellState;
  className?: string;
}

/**
 * AppShell - The outermost container with three-column layout
 * 
 * Layout: CSS Grid with 320px | 1fr | 340px columns
 * Height: 100vh - no scroll on shell itself
 * Top Chrome: 48px fixed height
 */
export function AppShell({
  topChrome,
  leftPanel,
  centerPanel,
  rightPanel,
  state = 'default',
  className = '',
}: AppShellProps) {
  return (
    <div className={`${styles.appShell} ${styles[state]} ${className}`}>
      {/* Top Chrome */}
      {topChrome && (
        <header className={styles.topChrome}>
          {topChrome}
        </header>
      )}

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Left Panel */}
        {leftPanel && (
          <>
            <aside className={styles.leftPanel}>
              {leftPanel}
            </aside>
            <div className={styles.panelDivider} />
          </>
        )}

        {/* Center Panel */}
        <main className={styles.centerPanel}>
          {centerPanel}
        </main>

        {/* Right Panel */}
        {rightPanel && (
          <>
            <div className={styles.panelDivider} />
            <aside className={styles.rightPanel}>
              {rightPanel}
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

export default AppShell;
