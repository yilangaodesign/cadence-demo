'use client';

import React, { ReactNode } from 'react';
import { Close } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { CadenceButton } from '../primitives/CadenceButton';
import { OverlineLabel } from '../primitives/OverlineLabel';
import { MonoValue } from '../primitives/MonoValue';
import styles from './ImpactDrawer.module.scss';

interface TimelineItem {
  time: string;
  name: string;
  type: 'task' | 'meeting' | 'new';
  isAtRisk?: boolean;
  isMoved?: boolean;
}

interface ImpactDrawerProps {
  /** Drawer visibility */
  isOpen?: boolean;
  /** Action description (e.g., "accept 'Client X P&L'") */
  actionDescription?: string;
  /** Before timeline items */
  beforeItems?: TimelineItem[];
  /** After timeline items */
  afterItems?: TimelineItem[];
  /** Consequence headline (Lora serif) */
  consequenceHeadline?: string;
  /** Penalty amount (if applicable) */
  penaltyAmount?: string;
  /** Custom content below the timelines */
  children?: ReactNode;
  /** Called when Confirm is clicked */
  onConfirm?: () => void;
  /** Called when Cancel is clicked */
  onCancel?: () => void;
  /** Called when Try different is clicked */
  onTryDifferent?: () => void;
  /** Called when dismiss is clicked */
  onDismiss?: () => void;
  className?: string;
}

/**
 * ImpactDrawer - "View impact" ripple preview
 * 
 * Slides in from right (480px width)
 * Shows before/after timeline comparison
 * Consequence headline in Lora serif
 */
export function ImpactDrawer({
  isOpen = false,
  actionDescription = 'accept this task',
  beforeItems = [],
  afterItems = [],
  consequenceHeadline,
  penaltyAmount,
  children,
  onConfirm,
  onCancel,
  onTryDifferent,
  onDismiss,
  className = '',
}: ImpactDrawerProps) {
  if (!isOpen) return null;

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    const itemClass = [
      styles.timelineItem,
      item.type === 'meeting' && styles.meeting,
      item.type === 'new' && styles.new,
      item.isAtRisk && styles.atRisk,
      item.isMoved && styles.moved,
    ].filter(Boolean).join(' ');

    return (
      <div key={index} className={itemClass}>
        <MonoValue className={styles.itemTime}>{item.time}</MonoValue>
        <span className={styles.itemName}>
          {item.name}
          {item.isMoved && <span className={styles.shiftIndicator}> ↓</span>}
        </span>
        {item.isAtRisk && (
          <span className={styles.riskBadge}>
            <span className={styles.riskDot} />
            AT RISK
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onDismiss} />

      {/* Drawer */}
      <div className={`${styles.impactDrawer} ${className}`}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Impact Preview</h2>
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Close}
            iconDescription="Dismiss"
            onClick={onDismiss}
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Action description */}
          <p className={styles.actionDescription}>
            If you <strong>{actionDescription}</strong>:
          </p>

          {/* Before/After columns */}
          <div className={styles.comparison}>
            <div className={styles.column}>
              <OverlineLabel variant="default" className={styles.columnLabel}>
                Before
              </OverlineLabel>
              <div className={styles.timeline}>
                {beforeItems.map(renderTimelineItem)}
              </div>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.column}>
              <OverlineLabel variant="default" className={styles.columnLabel}>
                After
              </OverlineLabel>
              <div className={styles.timeline}>
                {afterItems.map(renderTimelineItem)}
              </div>
            </div>
          </div>

          {/* Consequence */}
          {consequenceHeadline && (
            <div className={styles.consequence}>
              <p className={styles.consequenceText}>{consequenceHeadline}</p>
              {penaltyAmount && (
                <p className={styles.penaltyText}>
                  Penalty: <MonoValue variant="penalty">{penaltyAmount}</MonoValue>
                </p>
              )}
            </div>
          )}

          {/* Custom content */}
          {children}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <CadenceButton variant="primary" onClick={onConfirm}>
            Confirm action
          </CadenceButton>
          <CadenceButton variant="secondary" onClick={onCancel}>
            Cancel
          </CadenceButton>
          {onTryDifferent && (
            <CadenceButton variant="ghost" onClick={onTryDifferent}>
              Try different
            </CadenceButton>
          )}
        </div>
      </div>
    </>
  );
}

export default ImpactDrawer;
