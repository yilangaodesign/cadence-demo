'use client';

import React from 'react';
import styles from './OverlineLabel.module.scss';

export type OverlineLabelVariant = 'default' | 'emphasis' | 'emphasis-error';

interface OverlineLabelProps {
  children: React.ReactNode;
  variant?: OverlineLabelVariant;
  className?: string;
}

/**
 * OverlineLabel - Custom overline/eyebrow label component
 * 
 * Variants:
 * - default: Gray text for category labels (TODAY, CAPACITY, SOURCE)
 * - emphasis: Black text for important labels (NOW, NEXT, HARD DEADLINE)
 * - emphasis-error: Red text for critical labels (AT RISK in Pulse Widget)
 * 
 * Typography: Inter 11px/500, uppercase, 1px letter-spacing
 */
export function OverlineLabel({
  children,
  variant = 'default',
  className = '',
}: OverlineLabelProps) {
  const variantClass = {
    default: styles.default,
    emphasis: styles.emphasis,
    'emphasis-error': styles.emphasisError,
  }[variant];

  return (
    <span className={`${styles.overlineLabel} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}

export default OverlineLabel;
