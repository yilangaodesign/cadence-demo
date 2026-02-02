'use client';

import React, { useState } from 'react';
import { WarningAlt } from '@carbon/icons-react';
import { ConfidenceBadge, ConfidenceTier } from '../primitives/ConfidenceBadge';
import styles from './TaskProposalCard.module.scss';

export type TaskProposalState = 'default' | 'urgent' | 'accepted' | 'rejected';
export type PriorityLevel = 'high' | 'medium' | 'low';

interface TaskProposalCardProps {
  /** Proposal title */
  title: string;
  /** Source of the task (e.g., "client@email.com") */
  source: string;
  /** Confidence tier */
  confidence: ConfidenceTier;
  /** Priority level */
  priority: PriorityLevel;
  /** Whether this is an urgent inbound proposal */
  isUrgent?: boolean;
  /** Called when Accept is clicked */
  onAccept?: () => void;
  /** Called when Reject is clicked */
  onReject?: () => void;
  /** Called when confidence badge is clicked */
  onViewReasoning?: () => void;
  className?: string;
}

/**
 * TaskProposalCard - AI-generated task proposal awaiting user review
 * 
 * Layout:
 * - Header: Task Title (bold) + Priority tag
 * - Source bar: Gray background, full width
 * - Footer: Confidence chip (left) + Reject/Accept buttons (right)
 * 
 * States:
 * - default: Standard proposal in queue
 * - urgent: Red border, warning badge
 * - accepted: Green left border, animates out
 * - rejected: Fade out animation
 */
export function TaskProposalCard({
  title,
  source,
  confidence,
  priority,
  isUrgent = false,
  onAccept,
  onReject,
  onViewReasoning,
  className = '',
}: TaskProposalCardProps) {
  const [state, setState] = useState<TaskProposalState>(isUrgent ? 'urgent' : 'default');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleAccept = () => {
    setState('accepted');
    setIsAnimatingOut(true);
    setTimeout(() => {
      onAccept?.();
    }, 300);
  };

  const handleReject = () => {
    setState('rejected');
    setIsAnimatingOut(true);
    setTimeout(() => {
      onReject?.();
    }, 300);
  };

  const priorityColors = {
    high: { bg: '#FFF1F1', text: '#DA1E28' },      // Red
    medium: { bg: '#FCF4D6', text: '#483700' },    // Yellow
    low: { bg: '#F4F4F4', text: '#525252' },       // Gray
  };

  const stateClass = {
    default: styles.default,
    urgent: styles.urgent,
    accepted: styles.accepted,
    rejected: styles.rejected,
  }[state];

  return (
    <div 
      className={`${styles.taskProposalCard} ${stateClass} ${isAnimatingOut ? styles.animatingOut : ''} ${className}`}
    >
      {/* Header row: Title + Priority */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {isUrgent && (
            <WarningAlt size={20} className={styles.urgentIcon} />
          )}
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span 
          className={styles.priorityTag}
          style={{ 
            backgroundColor: priorityColors[priority].bg,
            color: priorityColors[priority].text,
          }}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>

      {/* Source row */}
      <div className={styles.sourceRow}>
        <span className={styles.sourceLabel}>Source:</span>
        <span className={styles.sourceValue}>{source}</span>
      </div>

      {/* Footer: Confidence chip + Actions */}
      <div className={styles.footer}>
        <ConfidenceBadge 
          tier={confidence} 
          interactive={true}
          onClick={onViewReasoning}
          tooltipText="View Reasoning"
        />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.rejectButton}
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskProposalCard;
