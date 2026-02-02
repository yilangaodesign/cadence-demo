'use client';

import React from 'react';
import { Add } from '@carbon/icons-react';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './TaskListHeader.module.scss';

interface TaskListHeaderProps {
  /** Title text */
  title?: string;
  /** Show sort button */
  showSort?: boolean;
  /** Show filter button */
  showFilter?: boolean;
  /** Show add task button */
  showAddTask?: boolean;
  /** Called when sort is clicked */
  onSortClick?: () => void;
  /** Called when filter is clicked */
  onFilterClick?: () => void;
  /** Called when add task is clicked */
  onAddTaskClick?: () => void;
  className?: string;
}

/**
 * TaskListHeader - Section header for "Today's Tasks"
 * 
 * Layout: Title + Sort/Filter (left) + Add Task (right)
 */
export function TaskListHeader({
  title = "Today's Tasks",
  showSort = true,
  showFilter = true,
  showAddTask = true,
  onSortClick,
  onFilterClick,
  onAddTaskClick,
  className = '',
}: TaskListHeaderProps) {
  return (
    <div className={`${styles.taskListHeader} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.controls}>
        <div className={styles.leftControls}>
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
        <div className={styles.rightControls}>
          {showAddTask && (
            <CadenceButton variant="ghost" size="sm" onClick={onAddTaskClick}>
              <Add size={16} />
              Add Task
            </CadenceButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskListHeader;
