'use client';

import React from 'react';
import { Button } from '@carbon/react';
import styles from './CadenceButton.module.scss';

export type CadenceButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'ghost-danger';
export type CadenceButtonSize = 'sm' | 'md' | 'lg';

interface CadenceButtonProps {
  children: React.ReactNode;
  variant?: CadenceButtonVariant;
  size?: CadenceButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * CadenceButton - Wraps Carbon Button with Cadence styling
 * 
 * Variants:
 * - primary: Black background, white text (CTAs)
 * - secondary: White background, black border (secondary actions)
 * - ghost: Transparent, black text (tertiary actions)
 * - danger: Red background (destructive actions)
 * - ghost-danger: Transparent, red text (dismiss actions)
 * 
 * CTAs use BLACK/WHITE only - never Lumen or Terra
 */
export function CadenceButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  type = 'button',
}: CadenceButtonProps) {
  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const variantClass = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    danger: styles.danger,
    'ghost-danger': styles.ghostDanger,
  }[variant];

  return (
    <button
      type={type}
      className={`${styles.cadenceButton} ${variantClass} ${sizeClass} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.iconRight}>{icon}</span>}
    </button>
  );
}

export default CadenceButton;
