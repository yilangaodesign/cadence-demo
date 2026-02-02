'use client';

import React from 'react';
import styles from './DeadlineChip.module.scss';

export type DeadlineChipState = 'safe' | 'approaching' | 'urgent' | 'overdue' | 'none';

interface DeadlineChipProps {
  /** The deadline date to display (e.g., "Jan 24" or "DDL") */
  label: string;
  /** Days until deadline (used to determine state if not provided) */
  daysUntil?: number;
  /** Override the calculated state */
  state?: DeadlineChipState;
  className?: string;
}

/**
 * DeadlineChip - Shows deadline proximity on task cards
 * 
 * States:
 * - safe: >7 days (gray)
 * - approaching: 3-7 days (yellow)
 * - urgent: <3 days (light red)
 * - overdue: Past deadline (solid red)
 * - none: Hidden
 */
export function DeadlineChip({
  label,
  daysUntil,
  state: overrideState,
  className = '',
}: DeadlineChipProps) {
  // Calculate state from daysUntil if not overridden
  const calculatedState = (): DeadlineChipState => {
    if (overrideState) return overrideState;
    if (daysUntil === undefined) return 'safe';
    if (daysUntil < 0) return 'overdue';
    if (daysUntil < 3) return 'urgent';
    if (daysUntil <= 7) return 'approaching';
    return 'safe';
  };

  const state = calculatedState();

  if (state === 'none') return null;

  const stateClass = {
    safe: styles.safe,
    approaching: styles.approaching,
    urgent: styles.urgent,
    overdue: styles.overdue,
    none: '',
  }[state];

  return (
    <span className={`${styles.deadlineChip} ${stateClass} ${className}`}>
      {label}
    </span>
  );
}

export default DeadlineChip;
