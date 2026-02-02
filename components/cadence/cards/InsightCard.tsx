'use client';

import React, { useState } from 'react';
import { WarningAlt, WarningFilled, Idea, Close } from '@carbon/icons-react';
import { OverlineLabel } from '../primitives/OverlineLabel';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './InsightCard.module.scss';

export type InsightCardType = 
  | 'deadline-risk' 
  | 'capacity-overflow' 
  | 'compliance-alert' 
  | 'ai-suggestion' 
  | 'conflict-detected';

interface InsightCardProps {
  /** Type determines icon, colors, and overline text */
  type: InsightCardType;
  /** Recommendation title */
  title: string;
  /** Reasoning body text */
  body: string;
  /** Confidence percentage (0-100) */
  confidence?: number;
  /** Primary CTA text */
  primaryAction?: string;
  /** Primary CTA handler */
  onPrimaryAction?: () => void;
  /** Secondary action text */
  secondaryAction?: string;
  /** Secondary action handler */
  onSecondaryAction?: () => void;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Expanded reasoning content */
  expandedContent?: React.ReactNode;
  className?: string;
}

const typeConfig = {
  'deadline-risk': {
    icon: WarningAlt,
    overline: 'DEADLINE BREACH RISK',
    iconColor: '#DA1E28', // Red-60
    borderColor: '#DA1E28',
  },
  'capacity-overflow': {
    icon: WarningAlt,
    overline: 'CAPACITY OVERFLOW RISK',
    iconColor: '#F1C21B', // Yellow-30
    borderColor: '#F1C21B',
  },
  'compliance-alert': {
    icon: WarningAlt,
    overline: 'COMPLIANCE ALERT',
    iconColor: '#BA4E00', // Orange-60
    borderColor: '#BA4E00',
  },
  'ai-suggestion': {
    icon: Idea,
    overline: 'AI SUGGESTION',
    iconColor: '#3336FF', // Lumen-60
    borderColor: '#3336FF',
  },
  'conflict-detected': {
    icon: WarningFilled,
    overline: 'SCHEDULING CONFLICT',
    iconColor: '#DA1E28',
    borderColor: '#DA1E28',
  },
};

/**
 * InsightCard - AI-detected risk/insight in the right panel
 * 
 * Types:
 * - deadline-risk: Red, warning icon
 * - capacity-overflow: Yellow, warning icon  
 * - compliance-alert: Orange, warning icon
 * - ai-suggestion: Lumen, idea icon
 * - conflict-detected: Red, filled warning icon
 */
export function InsightCard({
  type,
  title,
  body,
  confidence,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  onSecondaryAction,
  onDismiss,
  expandedContent,
  className = '',
}: InsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsDismissed(true);
    setTimeout(() => onDismiss?.(), 300);
  };

  if (isDismissed) {
    return null;
  }

  const isConflict = type === 'conflict-detected';

  return (
    <div 
      className={`${styles.insightCard} ${isConflict ? styles.conflictBg : ''} ${isDismissed ? styles.dismissed : ''} ${className}`}
      style={{ '--border-color': config.borderColor } as React.CSSProperties}
    >
      {/* Header row */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon size={16} style={{ color: config.iconColor }} className={styles.icon} />
          <OverlineLabel variant={type === 'deadline-risk' || type === 'conflict-detected' ? 'emphasis-error' : 'emphasis'}>
            {config.overline}
          </OverlineLabel>
        </div>
        <div className={styles.headerRight}>
          {confidence !== undefined && (
            <ConfidencePill confidence={confidence} type={type} />
          )}
          {onDismiss && (
            <button
              type="button"
              className={styles.dismissButton}
              onClick={handleDismiss}
              aria-label="Dismiss"
            >
              <Close size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>

      {/* Expanded content */}
      {expandedContent && isExpanded && (
        <div className={styles.expandedContent}>
          {expandedContent}
        </div>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className={styles.actions}>
          {primaryAction && (
            <CadenceButton variant="secondary" size="sm" onClick={onPrimaryAction}>
              {primaryAction}
            </CadenceButton>
          )}
          {secondaryAction && (
            <CadenceButton variant="ghost" size="sm" onClick={onSecondaryAction}>
              {secondaryAction}
            </CadenceButton>
          )}
        </div>
      )}
    </div>
  );
}

// Confidence pill sub-component
interface ConfidencePillProps {
  confidence: number;
  type: InsightCardType;
}

function ConfidencePill({ confidence, type }: ConfidencePillProps) {
  // Determine color based on card type (match the card's accent color)
  const typeColors: Record<InsightCardType, string> = {
    'deadline-risk': '#DA1E28',      // Red-60
    'conflict-detected': '#DA1E28',   // Red-60
    'capacity-overflow': '#F1C21B',   // Yellow-30
    'compliance-alert': '#BA4E00',    // Orange-60
    'ai-suggestion': '#3336FF',       // Lumen-60
  };

  const fillColor = typeColors[type];

  return (
    <div className={styles.confidencePill}>
      <div className={styles.pillTrack}>
        <div 
          className={styles.pillFill} 
          style={{ width: `${confidence}%`, backgroundColor: fillColor }}
        />
      </div>
    </div>
  );
}

export default InsightCard;
