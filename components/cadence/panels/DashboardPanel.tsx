'use client';

import React from 'react';
import styles from './DashboardPanel.module.scss';

type DayStatus = 'light' | 'moderate' | 'heavy' | 'overloaded';

interface WeekHeatmapDay {
  day: string;
  status: DayStatus;
  percentage?: number;
}

interface DashboardPanelProps {
  /** Week heatmap data */
  weekData?: WeekHeatmapDay[];
  className?: string;
}

/**
 * DashboardPanel - Data visualization view (Phase 2)
 * 
 * Week heatmap: 5-block strip (Mon-Fri)
 * Month overview & Trend charts: Placeholder
 */
export function DashboardPanel({
  weekData = [
    { day: 'Mon', status: 'moderate', percentage: 60 },
    { day: 'Tue', status: 'heavy', percentage: 85 },
    { day: 'Wed', status: 'light', percentage: 40 },
    { day: 'Thu', status: 'overloaded', percentage: 110 },
    { day: 'Fri', status: 'light', percentage: 35 },
  ],
  className = '',
}: DashboardPanelProps) {
  const statusColors: Record<DayStatus, string> = {
    light: '#198038',      // Green-60
    moderate: '#F1C21B',   // Yellow-30
    heavy: '#FF832B',      // Orange-40
    overloaded: '#DA1E28', // Red-60
  };

  return (
    <div className={`${styles.dashboardPanel} ${className}`}>
      {/* Week Heatmap */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>This Week</h3>
        <div className={styles.weekHeatmap}>
          {weekData.map((day) => (
            <div key={day.day} className={styles.dayColumn}>
              <span className={styles.dayLabel}>{day.day}</span>
              <div
                className={styles.dayBlock}
                style={{ backgroundColor: statusColors[day.status] }}
              >
                {day.percentage && (
                  <span className={styles.dayPercentage}>{day.percentage}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: statusColors.light }} />
            <span className={styles.legendLabel}>Light</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: statusColors.moderate }} />
            <span className={styles.legendLabel}>Moderate</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: statusColors.heavy }} />
            <span className={styles.legendLabel}>Heavy</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: statusColors.overloaded }} />
            <span className={styles.legendLabel}>Overloaded</span>
          </div>
        </div>
      </section>

      {/* Month Overview - Placeholder */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Month Overview</h3>
        <div className={styles.placeholder}>
          <p className={styles.placeholderText}>Coming soon</p>
        </div>
      </section>

      {/* Trend Charts - Placeholder */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Productivity Trends</h3>
        <div className={styles.placeholder}>
          <p className={styles.placeholderText}>Coming soon</p>
        </div>
      </section>
    </div>
  );
}

export default DashboardPanel;
