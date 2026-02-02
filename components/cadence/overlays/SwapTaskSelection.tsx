'use client';

import React from 'react';
import { Star } from '@carbon/icons-react';
import { ConfidenceBadge, ConfidenceTier } from '../primitives/ConfidenceBadge';
import { MonoValue } from '../primitives/MonoValue';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './SwapTaskSelection.module.scss';

interface SwapOption {
  id: string;
  name: string;
  duration: string;
  deadline?: string;
  confidence: ConfidenceTier;
  isRecommended?: boolean;
}

interface SwapTaskSelectionProps {
  /** Available swap options */
  options?: SwapOption[];
  /** Currently selected option */
  selectedId?: string;
  /** Called when an option is selected */
  onSelect?: (id: string) => void;
  /** Called when browse backlog is clicked */
  onBrowseBacklog?: () => void;
  /** Called when cancel is clicked */
  onCancel?: () => void;
  className?: string;
}

/**
 * SwapTaskSelection - Popover for choosing a replacement task
 * 
 * Shows AI-recommended option at top with Lumen-10 background
 * Width: 260px
 */
export function SwapTaskSelection({
  options = [],
  selectedId,
  onSelect,
  onBrowseBacklog,
  onCancel,
  className = '',
}: SwapTaskSelectionProps) {
  return (
    <div className={`${styles.swapTaskSelection} ${className}`}>
      <h4 className={styles.header}>Swap with:</h4>

      <div className={styles.optionsList}>
        {options.map((option) => (
          <div
            key={option.id}
            className={`${styles.option} ${option.isRecommended ? styles.recommended : ''} ${selectedId === option.id ? styles.selected : ''}`}
            onClick={() => onSelect?.(option.id)}
            onKeyDown={(e) => e.key === 'Enter' && onSelect?.(option.id)}
            role="option"
            aria-selected={selectedId === option.id}
            tabIndex={0}
          >
            <div className={styles.optionHeader}>
              {option.isRecommended && (
                <Star size={16} className={styles.starIcon} />
              )}
              <span className={`${styles.radioIcon} ${selectedId === option.id ? styles.active : ''}`} />
              <span className={styles.optionName}>{option.name}</span>
            </div>
            <div className={styles.optionMeta}>
              <MonoValue>{option.duration}</MonoValue>
              {option.deadline && (
                <>
                  <span className={styles.separator}>·</span>
                  <span className={styles.deadline}>{option.deadline}</span>
                </>
              )}
            </div>
            <div className={styles.optionBadge}>
              <ConfidenceBadge tier={option.confidence} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <CadenceButton variant="ghost" size="sm" onClick={onBrowseBacklog}>
          Browse backlog →
        </CadenceButton>
        <CadenceButton variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </CadenceButton>
      </div>
    </div>
  );
}

export default SwapTaskSelection;
