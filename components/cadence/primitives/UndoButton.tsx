'use client';

import React, { useState, useEffect } from 'react';
import { Undo } from '@carbon/icons-react';
import styles from './UndoButton.module.scss';

interface UndoButtonProps {
  /** Click handler to perform undo */
  onUndo: () => void;
  /** Label text (defaults to "Undo") */
  label?: string;
  /** Auto-hide after this many milliseconds (default 30000 = 30s) */
  autoHideAfter?: number;
  /** Whether the button is visible */
  visible?: boolean;
  /** Optional callback when auto-hidden */
  onAutoHide?: () => void;
  className?: string;
}

/**
 * UndoButton - Persistent, always-visible undo control
 * 
 * Appears after any AI-initiated or user-confirmed schedule change.
 * Features:
 * - One-click, no confirmation modal
 * - Auto-hides after 30 seconds if not used
 * - Maintains stack for current session (multiple undos possible)
 * - Slide-in animation on appear
 */
export function UndoButton({
  onUndo,
  label = 'Undo',
  autoHideAfter = 30000,
  visible = true,
  onAutoHide,
  className = '',
}: UndoButtonProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
    setIsAnimatingOut(false);
  }, [visible]);

  useEffect(() => {
    if (!isVisible || autoHideAfter <= 0) return;

    const timer = setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onAutoHide?.();
      }, 240); // Match animation duration
    }, autoHideAfter);

    return () => clearTimeout(timer);
  }, [isVisible, autoHideAfter, onAutoHide]);

  if (!isVisible && !isAnimatingOut) return null;

  const handleClick = () => {
    onUndo();
    setIsAnimatingOut(true);
    setTimeout(() => setIsVisible(false), 240);
  };

  return (
    <button
      type="button"
      className={`${styles.undoButton} ${isAnimatingOut ? styles.animatingOut : styles.animatingIn} ${className}`}
      onClick={handleClick}
    >
      <Undo size={16} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default UndoButton;
