'use client';

import React from 'react';
import { MonoValue } from '../primitives/MonoValue';
import styles from './TaskBlock.module.scss';

export type TaskBlockState = 'scheduled' | 'hover' | 'dragging' | 'active' | 'overrun' | 'conflict' | 'completed';

interface TaskBlockProps {
  /** Task name/title */
  name: string;
  /** Duration display */
  duration: string;
  /** Task state */
  state?: TaskBlockState;
  /** Top position in pixels */
  top?: number;
  /** Height in pixels */
  height?: number;
  /** Whether the block is draggable */
  isDraggable?: boolean;
  /** Drag start handler */
  onDragStart?: (e: React.DragEvent) => void;
  /** Drag end handler */
  onDragEnd?: (e: React.DragEvent) => void;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

/**
 * TaskBlock - Task rendered as block on calendar timeline
 * 
 * White background, subtle border
 * Draggable for rescheduling
 * Active state: inverted black
 */
export function TaskBlock({
  name,
  duration,
  state = 'scheduled',
  top = 0,
  height = 60,
  isDraggable = true,
  onDragStart,
  onDragEnd,
  onClick,
  className = '',
}: TaskBlockProps) {
  const isInverted = state === 'active' || state === 'overrun';

  return (
    <div
      className={`${styles.taskBlock} ${styles[state]} ${className}`}
      style={{ top, height }}
      draggable={isDraggable && state !== 'completed'}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <span className={styles.taskName}>{name}</span>
      <MonoValue className={`${styles.taskDuration} ${isInverted ? styles.inverted : ''}`}>
        {duration}
      </MonoValue>
      {state === 'conflict' && (
        <span className={styles.conflictBadge}>× CONFLICT</span>
      )}
    </div>
  );
}

export default TaskBlock;
