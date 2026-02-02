'use client';

import React from 'react';
import { Close, Add } from '@carbon/icons-react';
import styles from './WorkbenchTabStrip.module.scss';

interface WorkbenchTab {
  id: string;
  title: string;
  favicon?: string;
  isActive?: boolean;
}

interface WorkbenchTabStripProps {
  /** Array of open tabs */
  tabs?: WorkbenchTab[];
  /** Currently active tab ID */
  activeTabId?: string;
  /** Called when a tab is selected */
  onTabSelect?: (tabId: string) => void;
  /** Called when a tab is closed */
  onTabClose?: (tabId: string) => void;
  /** Called when new tab is clicked */
  onNewTab?: () => void;
  /** Maximum visible tabs before overflow */
  maxVisibleTabs?: number;
  className?: string;
}

/**
 * WorkbenchTabStrip - Tabbed workspace at the top of center panel
 * 
 * Height: 36px
 * Active tab: surface-primary, no bottom border
 * Inactive: surface-secondary, text-secondary
 */
export function WorkbenchTabStrip({
  tabs = [],
  activeTabId,
  onTabSelect,
  onTabClose,
  onNewTab,
  maxVisibleTabs = 5,
  className = '',
}: WorkbenchTabStripProps) {
  const visibleTabs = tabs.slice(0, maxVisibleTabs);
  const hasOverflow = tabs.length > maxVisibleTabs;

  return (
    <div className={`${styles.workbenchTabStrip} ${className}`}>
      <div className={styles.tabsContainer}>
        {visibleTabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              className={`${styles.tab} ${isActive ? styles.active : ''}`}
              onClick={() => onTabSelect?.(tab.id)}
              onKeyDown={(e) => e.key === 'Enter' && onTabSelect?.(tab.id)}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
            >
              {tab.favicon && (
                <img src={tab.favicon} alt="" className={styles.favicon} />
              )}
              <span className={styles.tabTitle}>{tab.title}</span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose?.(tab.id);
                }}
                aria-label={`Close ${tab.title}`}
              >
                <Close size={12} />
              </button>
            </div>
          );
        })}
        {hasOverflow && (
          <div className={styles.overflowIndicator}>
            +{tabs.length - maxVisibleTabs}
          </div>
        )}
      </div>
      <button
        type="button"
        className={styles.newTabButton}
        onClick={onNewTab}
        aria-label="New tab"
      >
        <Add size={16} />
      </button>
    </div>
  );
}

export default WorkbenchTabStrip;
