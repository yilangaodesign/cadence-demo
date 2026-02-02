'use client';

import React, { useMemo } from 'react';
import { Information } from '@carbon/icons-react';
import { Tooltip } from '@carbon/react';
import { OverlineLabel } from '../primitives/OverlineLabel';
import styles from './MyPaceGauge.module.scss';

export type PaceState = 'ahead' | 'on-track' | 'behind' | 'critical';

interface MyPaceGaugeProps {
  /** Value from 0-100 representing schedule position (50 = on track) */
  value: number;
  /** Override the calculated state */
  state?: PaceState;
  /** Show the info tooltip */
  showInfo?: boolean;
  className?: string;
}

/**
 * MyPaceGauge - Custom SVG gauge showing schedule trajectory
 * 
 * - Semi-circular arc (180°)
 * - Left = "BEHIND", right = "AHEAD"
 * - "Perfect!" label and dot at fixed position (upper right, outside arc)
 * - Gradient fill: Terra family (brighter range, dark → light)
 * - Needle rotates based on value
 */
export function MyPaceGauge({
  value,
  state: overrideState,
  showInfo = true,
  className = '',
}: MyPaceGaugeProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  // Calculate state from value if not overridden
  const state: PaceState = useMemo(() => {
    if (overrideState) return overrideState;
    if (clampedValue >= 60) return 'ahead';
    if (clampedValue >= 40) return 'on-track';
    if (clampedValue >= 20) return 'behind';
    return 'critical';
  }, [clampedValue, overrideState]);

  // Convert value to angle (0 = -90deg/left, 100 = 90deg/right)
  // Value 50 = 0deg (top center)
  const needleAngle = ((clampedValue - 50) / 50) * 90;

  const centerX = 100;
  const centerY = 90;
  const arcRadius = 60;
  const strokeWidth = 18;

  return (
    <div className={`${styles.myPaceGauge} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>My Pace</h3>
        {showInfo && (
          <Tooltip
            label="Shows your schedule trajectory. Center means on-track, left means behind, right means ahead."
            align="bottom"
          >
            <button type="button" className={styles.infoButton}>
              <Information size={16} />
            </button>
          </Tooltip>
        )}
      </div>

      {/* SVG Gauge - wider viewBox to prevent clipping */}
      <svg viewBox="0 0 220 130" className={styles.gaugeSvg}>
        <defs>
          {/* Terra gradient: brighter range (dark left → light right) */}
          <linearGradient id="terraGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A35D3B" />    {/* terra-60 (behind) */}
            <stop offset="25%" stopColor="#C27A5A" />   {/* terra-50 */}
            <stop offset="50%" stopColor="#CF9C86" />   {/* terra-40 (on-track) */}
            <stop offset="75%" stopColor="#DFC0B3" />   {/* terra-30 */}
            <stop offset="100%" stopColor="#EDDED7" />  {/* terra-20 (ahead) */}
          </linearGradient>
        </defs>

        {/* Terra gradient fill arc - clean butt ends */}
        <path
          d={`M ${centerX - arcRadius} ${centerY} A ${arcRadius} ${arcRadius} 0 0 1 ${centerX + arcRadius} ${centerY}`}
          fill="none"
          stroke="url(#terraGaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />

        {/* Needle */}
        <g transform={`rotate(${needleAngle}, ${centerX}, ${centerY})`}>
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY - 42}
            stroke="var(--cadence-text-primary)"
            strokeWidth="3"
          />
          {/* Needle base circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="5"
            fill="var(--cadence-text-primary)"
          />
        </g>

        {/* Fixed position: "Perfect!" label - upper right, outside arc */}
        <text
          x="175"
          y="28"
          textAnchor="start"
          className={styles.perfectLabel}
        >
          Perfect!
        </text>

        {/* Fixed position: Small dot below "Perfect!" - light gray */}
        <circle
          cx="180"
          cy="42"
          r="4"
          fill="#9E9E9E"
        />
      </svg>

      {/* Side labels */}
      <div className={styles.labels}>
        <OverlineLabel variant="default" className={styles.behindLabel}>
          BEHIND
        </OverlineLabel>
        <OverlineLabel variant="default" className={styles.aheadLabel}>
          AHEAD
        </OverlineLabel>
      </div>

      {/* State indicator */}
      <div className={styles.stateIndicator}>
        <span className={`${styles.stateText} ${styles[state]}`}>
          {state === 'ahead' && 'You\'re ahead of schedule'}
          {state === 'on-track' && 'Right on track'}
          {state === 'behind' && 'Slightly behind'}
          {state === 'critical' && 'Significantly behind'}
        </span>
      </div>
    </div>
  );
}

export default MyPaceGauge;
