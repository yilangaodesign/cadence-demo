'use client';

import React, { createContext, useContext, useState } from 'react';
import { OverlineLabel } from '../primitives/OverlineLabel';
import { DeadlineChip, DeadlineChipState } from '../primitives/DeadlineChip';
import { ConfidenceBadge, ConfidenceTier } from '../primitives/ConfidenceBadge';
import { MonoValue } from '../primitives/MonoValue';
import { ReasoningChip, SourceType } from '../primitives/ReasoningChip';
import styles from './TaskCard.module.scss';

// =============================================================================
// TYPES
// =============================================================================

export type TaskCardState = 
  | 'queued' 
  | 'active' 
  | 'completed' 
  | 'blocked' 
  | 'overrun' 
  | 'partial' 
  | 'deferred';

interface TaskCardContextValue {
  state: TaskCardState;
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  progress?: number;
}

// =============================================================================
// CONTEXT
// =============================================================================

const TaskCardContext = createContext<TaskCardContextValue | null>(null);

function useTaskCard() {
  const context = useContext(TaskCardContext);
  if (!context) {
    throw new Error('TaskCard components must be used within TaskCard.Root');
  }
  return context;
}

// =============================================================================
// COMPOUND COMPONENTS
// =============================================================================

interface TaskCardRootProps {
  children: React.ReactNode;
  state?: TaskCardState;
  progress?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * TaskCard.Root - Container with state management
 */
function TaskCardRoot({
  children,
  state = 'queued',
  progress,
  onClick,
  className = '',
}: TaskCardRootProps) {
  const [isHovered, setIsHovered] = useState(false);

  const stateClass = {
    queued: styles.queued,
    active: styles.active,
    completed: styles.completed,
    blocked: styles.blocked,
    overrun: styles.overrun,
    partial: styles.partial,
    deferred: styles.deferred,
  }[state];

  return (
    <TaskCardContext.Provider value={{ state, isHovered, setIsHovered, progress }}>
      <div
        className={`${styles.taskCard} ${stateClass} ${isHovered ? styles.hovered : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      >
        {children}
      </div>
    </TaskCardContext.Provider>
  );
}

interface TaskCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TaskCard.Header - Top row with optional badge
 */
function TaskCardHeader({ children, className = '' }: TaskCardHeaderProps) {
  return (
    <div className={`${styles.header} ${className}`}>
      {children}
    </div>
  );
}

interface TaskCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TaskCard.Title - Task name
 */
function TaskCardTitle({ children, className = '' }: TaskCardTitleProps) {
  const { state } = useTaskCard();
  const isInverse = state === 'active' || state === 'overrun';
  
  return (
    <h3 className={`${styles.title} ${isInverse ? styles.inverse : ''} ${state === 'completed' ? styles.strikethrough : ''} ${className}`}>
      {children}
    </h3>
  );
}

interface TaskCardMetaProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TaskCard.Meta - Metadata row (client, duration, etc.)
 */
function TaskCardMeta({ children, className = '' }: TaskCardMetaProps) {
  const { state } = useTaskCard();
  const isInverse = state === 'active' || state === 'overrun';

  return (
    <div className={`${styles.meta} ${isInverse ? styles.inverse : ''} ${className}`}>
      {children}
    </div>
  );
}

interface TaskCardProgressProps {
  className?: string;
}

/**
 * TaskCard.Progress - Progress bar (only visible in active/partial/overrun states)
 */
function TaskCardProgress({ className = '' }: TaskCardProgressProps) {
  const { state, progress = 0 } = useTaskCard();
  
  if (state !== 'active' && state !== 'partial' && state !== 'overrun') {
    return null;
  }

  const isOverrun = state === 'overrun' || progress > 100;
  const displayProgress = Math.min(progress, 100);

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      <div className={styles.progressTrack}>
        <div 
          className={`${styles.progressFill} ${isOverrun ? styles.overrunFill : ''}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <span className={styles.progressLabel}>{progress}%</span>
    </div>
  );
}

interface TaskCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TaskCard.Footer - Bottom section for badges, chips
 */
function TaskCardFooter({ children, className = '' }: TaskCardFooterProps) {
  return (
    <div className={`${styles.footer} ${className}`}>
      {children}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export const TaskCard = {
  Root: TaskCardRoot,
  Header: TaskCardHeader,
  Title: TaskCardTitle,
  Meta: TaskCardMeta,
  Progress: TaskCardProgress,
  Footer: TaskCardFooter,
};

// =============================================================================
// CONVENIENCE VARIANTS (following composition patterns)
// =============================================================================

interface QueuedTaskCardProps {
  title: string;
  client?: string;
  duration: string;
  deadlineLabel?: string;
  deadlineDaysUntil?: number;
  confidenceTier?: ConfidenceTier;
  confidenceBasis?: string;
  source?: { type: SourceType; label: string };
  onClick?: () => void;
}

/**
 * QueuedTaskCard - Pre-composed variant for queued tasks
 */
export function QueuedTaskCard({
  title,
  client,
  duration,
  deadlineLabel,
  deadlineDaysUntil,
  confidenceTier,
  confidenceBasis,
  source,
  onClick,
}: QueuedTaskCardProps) {
  return (
    <TaskCard.Root state="queued" onClick={onClick}>
      <TaskCard.Header>
        <TaskCard.Title>{title}</TaskCard.Title>
        {deadlineLabel && (
          <DeadlineChip label={deadlineLabel} daysUntil={deadlineDaysUntil} />
        )}
      </TaskCard.Header>
      <TaskCard.Meta>
        {client && <span>{client}</span>}
        {client && <span className={styles.separator}>·</span>}
        <MonoValue>{duration}</MonoValue>
        {source && (
          <>
            <span className={styles.separator}>·</span>
            <ReasoningChip label={source.label} sourceType={source.type} />
          </>
        )}
      </TaskCard.Meta>
      {confidenceTier && (
        <TaskCard.Footer>
          <ConfidenceBadge tier={confidenceTier} basisText={confidenceBasis} />
        </TaskCard.Footer>
      )}
    </TaskCard.Root>
  );
}

interface ActiveTaskCardProps {
  title: string;
  progress: number;
  timeRemaining: string;
  deadlineLabel?: string;
  deadlineDaysUntil?: number;
  onClick?: () => void;
}

/**
 * ActiveTaskCard - Pre-composed variant for the current (active) task
 * This is the signature black inverted card
 */
export function ActiveTaskCard({
  title,
  progress,
  timeRemaining,
  deadlineLabel,
  deadlineDaysUntil,
  onClick,
}: ActiveTaskCardProps) {
  return (
    <TaskCard.Root state="active" progress={progress} onClick={onClick}>
      <TaskCard.Header>
        <OverlineLabel variant="default">Current Task</OverlineLabel>
        {deadlineLabel && (
          <DeadlineChip label={deadlineLabel} daysUntil={deadlineDaysUntil} />
        )}
      </TaskCard.Header>
      <TaskCard.Title>{title}</TaskCard.Title>
      <TaskCard.Progress />
      <TaskCard.Meta>
        <MonoValue>{timeRemaining} remaining</MonoValue>
      </TaskCard.Meta>
    </TaskCard.Root>
  );
}

export default TaskCard;
