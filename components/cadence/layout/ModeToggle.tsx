'use client';

import React from 'react';
import { Task, Calendar } from '@carbon/icons-react';
import styles from './ModeToggle.module.scss';

export type ViewMode = 'tasks' | 'calendar';

interface ModeToggleProps {
  /** Current active mode */
  mode: ViewMode;
  /** Called when mode changes */
  onModeChange: (mode: ViewMode) => void;
  className?: string;
}

/**
 * ModeToggle - Tab switcher between Task View and Calendar View
 * 
 * Options:
 * - Tasks (icon: TaskComplete)
 * - Calendar (icon: Calendar)
 * 
 * Selected state: Black background, white text/icon
 * Unselected: White background, secondary text/icon
 */
export function ModeToggle({
  mode,
  onModeChange,
  className = '',
}: ModeToggleProps) {
  return (
    <div className={`${styles.modeToggle} ${className}`}>
      <button
        type="button"
        className={`${styles.toggleButton} ${mode === 'tasks' ? styles.active : ''}`}
        onClick={() => onModeChange('tasks')}
        aria-pressed={mode === 'tasks'}
      >
        <Task size={16} />
        <span>Tasks</span>
      </button>
      <button
        type="button"
        className={`${styles.toggleButton} ${mode === 'calendar' ? styles.active : ''}`}
        onClick={() => onModeChange('calendar')}
        aria-pressed={mode === 'calendar'}
      >
        <Calendar size={16} />
        <span>Calendar</span>
      </button>
    </div>
  );
}

export default ModeToggle;
