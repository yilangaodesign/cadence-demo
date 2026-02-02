'use client';

import React, { ReactNode } from 'react';
import { Close, ChevronLeft } from '@carbon/icons-react';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './TaskProposalFullQueue.module.scss';

interface TaskProposalFullQueueProps {
  /** Whether the drawer is open */
  isOpen?: boolean;
  /** Proposal cards */
  children?: ReactNode;
  /** Called when dismiss is clicked */
  onDismiss?: () => void;
  /** Called when "Mark all reviewed" is clicked */
  onMarkAllReviewed?: () => void;
  /** Show sort button */
  showSort?: boolean;
  /** Show filter button */
  showFilter?: boolean;
  /** Called when sort is clicked */
  onSortClick?: () => void;
  /** Called when filter is clicked */
  onFilterClick?: () => void;
  className?: string;
}

/**
 * TaskProposalFullQueue - Expanded view of all pending task proposals
 * 
 * Drawer that covers only the left panel (320px)
 * Does not block interaction with center/right panels
 * Header: "Task Proposals" + collapse + "Mark all reviewed"
 */
export function TaskProposalFullQueue({
  isOpen = false,
  children,
  onDismiss,
  onMarkAllReviewed,
  showSort = true,
  showFilter = true,
  onSortClick,
  onFilterClick,
  className = '',
}: TaskProposalFullQueueProps) {
  if (!isOpen) return null;

  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className={`${styles.taskProposalFullQueue} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.collapseButton}
            onClick={onDismiss}
            aria-label="Collapse"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className={styles.title}>Task Proposals</h2>
        </div>
        <button
          className={styles.closeButton}
          onClick={onDismiss}
          aria-label="Close"
        >
          <Close size={20} />
        </button>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          {showSort && (
            <CadenceButton variant="ghost" size="sm" onClick={onSortClick}>
              Sort by
            </CadenceButton>
          )}
          {showFilter && (
            <CadenceButton variant="ghost" size="sm" onClick={onFilterClick}>
              Filter
            </CadenceButton>
          )}
        </div>
        {hasChildren && (
          <CadenceButton variant="ghost" size="sm" onClick={onMarkAllReviewed}>
            Mark all reviewed
          </CadenceButton>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {hasChildren ? (
          children
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>No pending task proposals</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskProposalFullQueue;
