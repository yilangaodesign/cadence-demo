'use client';

import React, { ReactNode } from 'react';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './TaskProposalsSection.module.scss';

interface TaskProposalsSectionProps {
  /** Proposal cards */
  children?: ReactNode;
  /** Show sort button */
  showSort?: boolean;
  /** Show filter button */
  showFilter?: boolean;
  /** Called when "Open >>" is clicked */
  onOpenFullQueue?: () => void;
  /** Called when sort is clicked */
  onSortClick?: () => void;
  /** Called when filter is clicked */
  onFilterClick?: () => void;
  className?: string;
}

/**
 * TaskProposalsSection - AI intake queue below Today's Tasks
 * 
 * Shows max 2-3 proposals in collapsed view
 * "Open >>" expands to full queue
 */
export function TaskProposalsSection({
  children,
  showSort = true,
  showFilter = true,
  onOpenFullQueue,
  onSortClick,
  onFilterClick,
  className = '',
}: TaskProposalsSectionProps) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className={`${styles.taskProposalsSection} ${className}`}>
      {/* Divider */}
      <div className={styles.divider} />

      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Task Proposals</h3>
        <CadenceButton variant="ghost" size="sm" onClick={onOpenFullQueue}>
          Open &gt;&gt;
        </CadenceButton>
      </div>

      {/* Controls */}
      {hasChildren && (
        <div className={styles.controls}>
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
      )}

      {/* Content */}
      <div className={styles.content}>
        {hasChildren ? (
          children
        ) : (
          <p className={styles.emptyState}>No new task proposals</p>
        )}
      </div>
    </div>
  );
}

export default TaskProposalsSection;
