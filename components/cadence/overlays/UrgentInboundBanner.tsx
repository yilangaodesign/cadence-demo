'use client';

import React, { useState } from 'react';
import { WarningAlt, Time, Close } from '@carbon/icons-react';
import styles from './UrgentInboundBanner.module.scss';

interface UrgentInboundBannerProps {
  /** Main message text */
  message?: string;
  /** Called when snooze is clicked */
  onSnooze?: () => void;
  /** Called when dismiss is clicked */
  onDismiss?: () => void;
  /** Whether the banner is visible */
  visible?: boolean;
  className?: string;
}

/**
 * UrgentInboundBanner - Full-width global alert
 * 
 * Pushes all content down. Appears when AI detects high-priority task with conflict.
 * 
 * Features:
 * - Fixed top of viewport, above TopChrome
 * - Red background (#DA1E28)
 * - White text
 * - Snooze (clock icon) + Dismiss (× icon) actions
 * - Slide down animation on appear
 * - Does NOT auto-dismiss - must be manually dismissed or engaged
 */
export function UrgentInboundBanner({
  message = 'High priority new task detected with conflict.',
  onSnooze,
  onDismiss,
  visible = true,
  className = '',
}: UrgentInboundBannerProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  if (!visible && !isAnimatingOut) return null;

  const handleDismiss = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onDismiss?.();
    }, 240);
  };

  const handleSnooze = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onSnooze?.();
    }, 240);
  };

  return (
    <div 
      className={`${styles.urgentInboundBanner} ${isAnimatingOut ? styles.animatingOut : styles.animatingIn} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.content}>
        <WarningAlt size={16} className={styles.warningIcon} />
        <span className={styles.label}>Urgent Inbound</span>
        <span className={styles.message}>{message}</span>
      </div>
      <div className={styles.actions}>
        {onSnooze && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleSnooze}
            aria-label="Snooze alert"
          >
            <Time size={16} />
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            <Close size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default UrgentInboundBanner;
