'use client';

import React from 'react';
import { OverlineLabel } from '../primitives/OverlineLabel';
import styles from './DateHeader.module.scss';

interface DateHeaderProps {
  /** The date to display */
  date?: Date;
  /** Custom format string (defaults to "Jan 18, 2026") */
  formatOptions?: Intl.DateTimeFormatOptions;
  /** Label prefix (defaults to "TODAY") */
  prefix?: string;
  className?: string;
}

/**
 * DateHeader - Shows today's date at the top of the left panel
 * 
 * Format: "TODAY · Jan 18, 2026"
 * Typography: cadence-overline
 * Color: text-secondary
 */
export function DateHeader({
  date = new Date(),
  formatOptions = { month: 'short', day: 'numeric', year: 'numeric' },
  prefix = 'TODAY',
  className = '',
}: DateHeaderProps) {
  const formattedDate = date.toLocaleDateString('en-US', formatOptions);

  return (
    <div className={`${styles.dateHeader} ${className}`}>
      <OverlineLabel variant="default">
        {prefix} · {formattedDate}
      </OverlineLabel>
    </div>
  );
}

export default DateHeader;
