'use client';

import React, { ReactNode } from 'react';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './NextDeadlineList.module.scss';

interface NextDeadlineListProps {
  /** List content (DeadlineListItem components) */
  children?: ReactNode;
  /** Whether to show "Show all" link */
  showAllLink?: boolean;
  /** Called when "Show all" is clicked */
  onShowAll?: () => void;
  className?: string;
}

/**
 * NextDeadlineList - Upcoming hard deadlines list
 * 
 * Header: "Next Deadline"
 * Max items: 3-4, then "Show all" link
 * Divider above section
 */
export function NextDeadlineList({
  children,
  showAllLink = true,
  onShowAll,
  className = '',
}: NextDeadlineListProps) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className={`${styles.nextDeadlineList} ${className}`}>
      {/* Divider */}
      <div className={styles.divider} />

      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Next Deadline</h3>
        {showAllLink && hasChildren && (
          <CadenceButton variant="ghost" size="sm" onClick={onShowAll}>
            Show all
          </CadenceButton>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {hasChildren ? (
          children
        ) : (
          <p className={styles.emptyState}>No upcoming deadlines</p>
        )}
      </div>
    </div>
  );
}

export default NextDeadlineList;
