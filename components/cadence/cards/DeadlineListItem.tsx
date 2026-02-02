'use client';

import React from 'react';
import { MonoValue } from '../primitives/MonoValue';
import styles from './DeadlineListItem.module.scss';

export type DeadlineItemState = 'safe' | 'approaching' | 'urgent' | 'overdue';

interface DeadlineListItemProps {
  /** Deadline name/description */
  name: string;
  /** Deadline date */
  date: Date;
  /** Days remaining (negative if overdue) */
  daysRemaining: number;
  /** Penalty amount (if applicable) */
  penaltyAmount?: string;
  /** Override calculated state */
  state?: DeadlineItemState;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

/**
 * DeadlineListItem - Single deadline entry in the right panel
 * 
 * States:
 * - safe: >7 days (normal)
 * - approaching: 3-7 days (yellow background on date)
 * - urgent: <3 days (red background on date, bold name)
 * - overdue: Past deadline (red background, strikethrough date)
 */
export function DeadlineListItem({
  name,
  date,
  daysRemaining,
  penaltyAmount,
  state: overrideState,
  onClick,
  className = '',
}: DeadlineListItemProps) {
  // Calculate state from daysRemaining if not overridden
  const state: DeadlineItemState = overrideState || (() => {
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining < 3) return 'urgent';
    if (daysRemaining <= 7) return 'approaching';
    return 'safe';
  })();

  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  const daysText = daysRemaining === 0 
    ? 'Today'
    : daysRemaining === 1 
      ? '1 day'
      : daysRemaining < 0 
        ? `${Math.abs(daysRemaining)} days ago`
        : `${daysRemaining} days`;

  return (
    <div 
      className={`${styles.deadlineListItem} ${styles[state]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className={styles.dateColumn}>
        <div className={`${styles.dateBox} ${styles[`dateBox${state.charAt(0).toUpperCase() + state.slice(1)}`]}`}>
          <span className={styles.month}>{month} {day}</span>
          <span className={styles.year}>{year}</span>
        </div>
      </div>
      <div className={styles.contentColumn}>
        <span className={`${styles.name} ${state === 'urgent' || state === 'overdue' ? styles.bold : ''}`}>
          {state === 'overdue' && <span className={styles.strikethrough}>{name}</span>}
          {state !== 'overdue' && name}
        </span>
        <div className={styles.meta}>
          <MonoValue variant={penaltyAmount ? 'penalty' : 'default'}>
            {daysText}
          </MonoValue>
          {penaltyAmount && (
            <>
              <span className={styles.separator}>·</span>
              <MonoValue variant="penalty">{penaltyAmount}</MonoValue>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeadlineListItem;
