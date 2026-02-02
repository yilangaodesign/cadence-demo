'use client';

import React from 'react';
import { Add } from '@carbon/icons-react';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './FocusTimeBlock.module.scss';

interface FocusTimeBlockProps {
  /** Duration of the focus time slot */
  duration?: string;
  /** Top position in pixels */
  top?: number;
  /** Height in pixels */
  height?: number;
  /** Called when "Add Task" is clicked */
  onAddTask?: () => void;
  className?: string;
}

/**
 * FocusTimeBlock - AI-identified empty capacity pocket
 * 
 * Transparent with dashed Lumen border
 * "Potential Focus Time" label with dot
 * "+ Add Task" button
 */
export function FocusTimeBlock({
  duration,
  top = 0,
  height = 60,
  onAddTask,
  className = '',
}: FocusTimeBlockProps) {
  return (
    <div
      className={`${styles.focusTimeBlock} ${className}`}
      style={{ top, height }}
    >
      <div className={styles.content}>
        <div className={styles.label}>
          <span className={styles.dot} />
          <span className={styles.text}>Potential Focus Time</span>
          {duration && <span className={styles.duration}>{duration}</span>}
        </div>
        <CadenceButton
          variant="ghost"
          size="sm"
          onClick={onAddTask}
          className={styles.addButton}
        >
          <Add size={16} />
          Add Task
        </CadenceButton>
      </div>
    </div>
  );
}

export default FocusTimeBlock;
