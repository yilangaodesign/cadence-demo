'use client';

import React, { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import styles from './InsightsFeed.module.scss';

interface InsightsFeedProps {
  /** Feed content (InsightCard components) */
  children?: ReactNode;
  /** Current page number */
  currentPage?: number;
  /** Total pages */
  totalPages?: number;
  /** Called when navigating to previous page */
  onPrevPage?: () => void;
  /** Called when navigating to next page */
  onNextPage?: () => void;
  /** Empty state message */
  emptyMessage?: string;
  className?: string;
}

/**
 * InsightsFeed - Scrollable/paginated feed of AI-generated insight cards
 * 
 * Header: "Insights" + pagination arrows
 * Empty state: "All clear. No active risks."
 */
export function InsightsFeed({
  children,
  currentPage = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
  emptyMessage = 'All clear. No active risks.',
  className = '',
}: InsightsFeedProps) {
  const hasChildren = React.Children.count(children) > 0;
  const hasPagination = totalPages > 1;

  return (
    <div className={`${styles.insightsFeed} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Insights</h3>
        {hasPagination && (
          <div className={styles.pagination}>
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={ChevronLeft}
              iconDescription="Previous"
              onClick={onPrevPage}
              disabled={currentPage <= 1}
              className={styles.pageButton}
            />
            <span className={styles.pageIndicator}>
              {currentPage} / {totalPages}
            </span>
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={ChevronRight}
              iconDescription="Next"
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              className={styles.pageButton}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {hasChildren ? (
          children
        ) : (
          <p className={styles.emptyState}>{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}

export default InsightsFeed;
