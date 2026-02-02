'use client';

import React, { ReactNode } from 'react';
import styles from './TaskListView.module.scss';

interface TaskListViewProps {
  /** Header component (TaskListHeader) */
  header?: ReactNode;
  /** Task cards */
  children?: ReactNode;
  /** Empty state message */
  emptyMessage?: string;
  className?: string;
}

/**
 * TaskListView - Default lower-half of left panel when Tasks tab is active
 * 
 * Contains: TaskListHeader + list of TaskCard components
 * Inherits parent scroll
 */
export function TaskListView({
  header,
  children,
  emptyMessage = 'Cadence is watching your email and Slack.',
  className = '',
}: TaskListViewProps) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className={`${styles.taskListView} ${className}`}>
      {header}
      <div className={styles.taskList}>
        {hasChildren ? (
          children
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskListView;
