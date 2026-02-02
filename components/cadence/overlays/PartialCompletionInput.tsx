'use client';

import React, { useState } from 'react';
import { Slider } from '@carbon/react';
import { MonoValue } from '../primitives/MonoValue';
import { CadenceButton } from '../primitives/CadenceButton';
import styles from './PartialCompletionInput.module.scss';

interface PartialCompletionInputProps {
  /** Task name */
  taskName?: string;
  /** Total estimated duration in minutes */
  totalMinutes?: number;
  /** Initial percentage */
  initialPercentage?: number;
  /** Called when confirm is clicked */
  onConfirm?: (percentage: number) => void;
  /** Called when cancel is clicked */
  onCancel?: () => void;
  className?: string;
}

/**
 * PartialCompletionInput - Popover for logging partial task completion
 * 
 * Slider + preset buttons (25%, 50%, 75%)
 * Shows calculated remainder time
 */
export function PartialCompletionInput({
  taskName,
  totalMinutes = 60,
  initialPercentage = 50,
  onConfirm,
  onCancel,
  className = '',
}: PartialCompletionInputProps) {
  const [percentage, setPercentage] = useState(initialPercentage);

  const remainderMinutes = Math.round(totalMinutes * (1 - percentage / 100));
  const remainderText = remainderMinutes >= 60 
    ? `${(remainderMinutes / 60).toFixed(1)}h`
    : `${remainderMinutes} min`;

  const handlePreset = (value: number) => {
    setPercentage(value);
  };

  return (
    <div className={`${styles.partialCompletionInput} ${className}`}>
      <h4 className={styles.header}>How far did you get?</h4>

      {/* Slider */}
      <div className={styles.sliderContainer}>
        <Slider
          labelText=""
          min={0}
          max={100}
          step={5}
          value={percentage}
          onChange={({ value }) => setPercentage(value)}
          className={styles.slider}
        />
        <span className={styles.percentageValue}>{percentage}%</span>
      </div>

      {/* Preset buttons */}
      <div className={styles.presets}>
        {[25, 50, 75].map((preset) => (
          <CadenceButton
            key={preset}
            variant={percentage === preset ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => handlePreset(preset)}
          >
            {preset}%
          </CadenceButton>
        ))}
      </div>

      {/* Remainder info */}
      <div className={styles.info}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Remainder:</span>
          <MonoValue>~{remainderText}</MonoValue>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Scheduled:</span>
          <span className={styles.infoValue}>Next open slot</span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <CadenceButton variant="primary" onClick={() => onConfirm?.(percentage)}>
          Confirm
        </CadenceButton>
        <CadenceButton variant="secondary" onClick={onCancel}>
          Cancel
        </CadenceButton>
      </div>
    </div>
  );
}

export default PartialCompletionInput;
