'use client';

import React from 'react';
import styles from './MonoValue.module.scss';

export type MonoValueVariant = 'default' | 'large' | 'penalty';

interface MonoValueProps {
  /** The value to display */
  children: React.ReactNode;
  /** Size/color variant */
  variant?: MonoValueVariant;
  className?: string;
}

/**
 * MonoValue - Renders numerical/financial data in monospace
 * 
 * Variants:
 * - default: 13px, primary text (time, durations, amounts)
 * - large: 20px, primary text (gauge values, large countdowns)
 * - penalty: 16px, RED text (ALWAYS red for penalty amounts)
 */
export function MonoValue({
  children,
  variant = 'default',
  className = '',
}: MonoValueProps) {
  const variantClass = {
    default: styles.default,
    large: styles.large,
    penalty: styles.penalty,
  }[variant];

  return (
    <span className={`${styles.monoValue} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}

export default MonoValue;
