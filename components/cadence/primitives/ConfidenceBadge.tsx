'use client';

import React, { useState } from 'react';
import { ChartLineSmooth, ArrowRight } from '@carbon/icons-react';
import { Tooltip } from '@carbon/react';
import styles from './ConfidenceBadge.module.scss';

export type ConfidenceTier = 'high' | 'medium' | 'low' | 'new';

interface ConfidenceBadgeProps {
  /** Confidence tier */
  tier: ConfidenceTier;
  /** Optional custom label (defaults based on tier) */
  label?: string;
  /** Optional basis text explaining the confidence */
  basisText?: string;
  /** Make the badge interactive (expandable on hover) */
  interactive?: boolean;
  /** Called when clicked (in interactive mode) */
  onClick?: () => void;
  /** Tooltip text for interactive mode */
  tooltipText?: string;
  className?: string;
}

/**
 * ConfidenceBadge - Shows AI confidence level with optional expandable interaction
 * 
 * Tiers:
 * - high: Gray background, "Confidence: High"
 * - medium: Gray background, "Confidence: Medium"
 * - low: Gray background, "Confidence: Low"
 * - new: Dashed border, "New task type"
 * 
 * Micro-interaction (when interactive=true):
 * - Default: Shows icon + "Confidence: High"
 * - Hover: Expands to show arrow →, becomes clickable
 * - Shows tooltip "View Reasoning" on hover
 */
export function ConfidenceBadge({
  tier,
  label,
  basisText,
  interactive = false,
  onClick,
  tooltipText = 'View Reasoning',
  className = '',
}: ConfidenceBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultLabels = {
    high: 'Confidence: High',
    medium: 'Confidence: Medium',
    low: 'Confidence: Low',
    new: 'New task type',
  };

  const displayLabel = label || defaultLabels[tier];

  const tierClass = {
    high: styles.high,
    medium: styles.medium,
    low: styles.low,
    new: styles.new,
  }[tier];

  const badgeContent = (
    <span 
      className={`${styles.confidenceBadge} ${tierClass} ${interactive ? styles.interactive : ''} ${isHovered ? styles.expanded : ''}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      <ChartLineSmooth size={16} className={styles.icon} />
      <span className={styles.label}>{displayLabel}</span>
      {interactive && (
        <ArrowRight size={16} className={styles.arrow} />
      )}
    </span>
  );

  if (interactive) {
    return (
      <div className={`${styles.confidenceBadgeContainer} ${className}`}>
        <Tooltip label={tooltipText} align="top">
          {badgeContent}
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={`${styles.confidenceBadgeContainer} ${className}`}>
      {badgeContent}
      {basisText && (
        <p className={styles.basisText}>{basisText}</p>
      )}
    </div>
  );
}

export default ConfidenceBadge;
