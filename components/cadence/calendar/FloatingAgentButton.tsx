'use client';

import React from 'react';
import { Renew } from '@carbon/icons-react';
import styles from './FloatingAgentButton.module.scss';

interface FloatingAgentButtonProps {
  /** Called when button is clicked */
  onClick?: () => void;
  /** Button tooltip */
  tooltip?: string;
  className?: string;
}

/**
 * FloatingAgentButton - Quick-access AI reshuffle button
 * 
 * Position: Absolute, bottom-right of CalendarView (16px inset)
 * Size: 48px circle
 * Background: surface-inverse (black)
 */
export function FloatingAgentButton({
  onClick,
  tooltip = 'Reshuffle my day',
  className = '',
}: FloatingAgentButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.floatingAgentButton} ${className}`}
      onClick={onClick}
      aria-label={tooltip}
      title={tooltip}
    >
      <Renew size={20} />
    </button>
  );
}

export default FloatingAgentButton;
