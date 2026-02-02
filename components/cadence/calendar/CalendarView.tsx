'use client';

import React, { useState, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Add,
  ChevronDown,
  Globe,
  Checkmark
} from '@carbon/icons-react';
import { TaskBlock } from './TaskBlock';
import { CalendarEventBlock } from './CalendarEventBlock';
import { FocusTimeBlock } from './FocusTimeBlock';
import { FloatingAgentButton } from './FloatingAgentButton';
import { TaskInteractionMenu, MenuAction } from '../overlays/TaskInteractionMenu';
import styles from './CalendarView.module.scss';

// =============================================================================
// TYPES
// =============================================================================

export interface CalendarEvent {
  id: string;
  name: string;
  location?: string;
  startHour: number;    // 0-23
  startMinute?: number; // 0-59, defaults to 0
  durationMinutes: number;
  state?: 'default' | 'hover' | 'current' | 'conflict' | 'past' | 'new-sync';
}

export interface CalendarTask {
  id: string;
  name: string;
  duration: string;
  startHour: number;
  startMinute?: number;
  durationMinutes: number;
  state?: 'scheduled' | 'hover' | 'dragging' | 'active' | 'overrun' | 'conflict' | 'completed';
  isActive?: boolean;
  originalEndHour?: number; // For overrun visualization
  originalEndMinute?: number;
}

export interface FocusTimeSlot {
  id: string;
  startHour: number;
  startMinute?: number;
  durationMinutes: number;
}

export type ViewType = 'day' | 'week';

interface CalendarViewProps {
  /** Current date */
  date: Date;
  /** View type */
  viewType?: ViewType;
  /** Calendar events (read-only meetings) */
  events?: CalendarEvent[];
  /** Tasks on calendar */
  tasks?: CalendarTask[];
  /** Focus time slots */
  focusTimeSlots?: FocusTimeSlot[];
  /** Start hour for timeline (default 8) */
  startHour?: number;
  /** End hour for timeline (default 18) */
  endHour?: number;
  /** Whether to show completed tasks toggle */
  showCompleted?: boolean;
  /** Last sync time */
  lastSyncedText?: string;
  /** Called when date changes */
  onDateChange?: (date: Date) => void;
  /** Called when view type changes */
  onViewTypeChange?: (viewType: ViewType) => void;
  /** Called when show completed changes */
  onShowCompletedChange?: (show: boolean) => void;
  /** Called when add task is clicked in focus time slot */
  onAddTask?: (slotId: string) => void;
  /** Called when task is clicked */
  onTaskClick?: (taskId: string) => void;
  /** Called when task action is selected */
  onTaskAction?: (taskId: string, action: MenuAction) => void;
  /** Called when agent button is clicked */
  onAgentClick?: () => void;
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const HOUR_HEIGHT = 60; // pixels per hour
const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

// =============================================================================
// COMPONENT
// =============================================================================

export function CalendarView({
  date,
  viewType = 'day',
  events = [],
  tasks = [],
  focusTimeSlots = [],
  startHour = 8,
  endHour = 18,
  showCompleted = false,
  lastSyncedText = 'Last synced: just now',
  onDateChange,
  onViewTypeChange,
  onShowCompletedChange,
  onAddTask,
  onTaskClick,
  onTaskAction,
  onAgentClick,
  className = '',
}: CalendarViewProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Calculate timeline hours
  const timelineHours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );

  // Get week dates for mini date strip
  const getWeekDates = useCallback(() => {
    const current = new Date(date);
    const dayOfWeek = current.getDay();
    const weekStart = new Date(current);
    weekStart.setDate(current.getDate() - dayOfWeek);
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d;
    });
  }, [date]);

  const weekDates = getWeekDates();

  // Format hour for display
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Calculate position from time
  const getPositionFromTime = (hour: number, minute: number = 0) => {
    return ((hour - startHour) * 60 + minute) * (HOUR_HEIGHT / 60);
  };

  // Calculate height from duration
  const getHeightFromDuration = (minutes: number) => {
    return minutes * (HOUR_HEIGHT / 60);
  };

  // Navigation handlers
  const handlePrevious = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - (viewType === 'week' ? 7 : 1));
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + (viewType === 'week' ? 7 : 1));
    onDateChange?.(newDate);
  };

  const handleDateSelect = (selectedDate: Date) => {
    onDateChange?.(selectedDate);
  };

  // Task interaction
  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
    onTaskClick?.(taskId);
  };

  const handleTaskAction = (action: MenuAction) => {
    if (selectedTaskId) {
      onTaskAction?.(selectedTaskId, action);
      setSelectedTaskId(null);
    }
  };

  const handleCloseMenu = () => {
    setSelectedTaskId(null);
  };

  // Check if date is today
  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (d: Date) => {
    return d.getDate() === date.getDate() &&
           d.getMonth() === date.getMonth() &&
           d.getFullYear() === date.getFullYear();
  };

  return (
    <div className={`${styles.calendarView} ${className}`}>
      {/* Calendar Header Controls */}
      <div className={styles.calendarHeader}>
        <div className={styles.headerRow}>
          <button 
            className={styles.addButton}
            onClick={() => onAddTask?.('new')}
            aria-label="Add event"
          >
            <Add size={16} />
          </button>
          
          <div className={styles.navControls}>
            <button 
              className={styles.navButton}
              onClick={handlePrevious}
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <span className={styles.monthYear}>
            {MONTHS[date.getMonth()]} {date.getFullYear()}
          </span>
          
          <div className={styles.viewDropdown}>
            <button 
              className={styles.dropdownButton}
              onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            >
              {viewType === 'day' ? 'Day' : 'Week'}
              <ChevronDown size={16} />
            </button>
            {isViewDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button 
                  className={`${styles.dropdownItem} ${viewType === 'day' ? styles.active : ''}`}
                  onClick={() => { onViewTypeChange?.('day'); setIsViewDropdownOpen(false); }}
                >
                  {viewType === 'day' && <Checkmark size={16} />}
                  Day
                </button>
                <button 
                  className={`${styles.dropdownItem} ${viewType === 'week' ? styles.active : ''}`}
                  onClick={() => { onViewTypeChange?.('week'); setIsViewDropdownOpen(false); }}
                >
                  {viewType === 'week' && <Checkmark size={16} />}
                  Week
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.timezoneRow}>
          <button 
            className={styles.timezoneButton}
            onClick={() => setIsTimezoneDropdownOpen(!isTimezoneDropdownOpen)}
          >
            <Globe size={14} />
            <span>ET</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Mini Date Strip */}
      <div className={styles.dateStrip}>
        {weekDates.map((d, i) => (
          <button
            key={i}
            className={`${styles.dateItem} ${isToday(d) ? styles.today : ''} ${isSelected(d) ? styles.selected : ''}`}
            onClick={() => handleDateSelect(d)}
          >
            <span className={styles.dayLabel}>{DAYS_OF_WEEK[i]}</span>
            <span className={styles.dateNumber}>{d.getDate()}</span>
          </button>
        ))}
      </div>

      {/* Timeline Container */}
      <div className={styles.timelineContainer} ref={timelineRef}>
        <div className={styles.timeline}>
          {/* Hour markers */}
          {timelineHours.map((hour) => (
            <div 
              key={hour} 
              className={styles.hourRow}
              style={{ height: HOUR_HEIGHT }}
            >
              <span className={styles.hourLabel}>{formatHour(hour)}</span>
              <div className={styles.hourLine} />
            </div>
          ))}

          {/* Blocks Container */}
          <div className={styles.blocksContainer}>
            {/* Focus Time Slots */}
            {focusTimeSlots.map((slot) => (
              <FocusTimeBlock
                key={slot.id}
                duration={`${Math.floor(slot.durationMinutes / 60)}h${slot.durationMinutes % 60 > 0 ? ` ${slot.durationMinutes % 60}m` : ''}`}
                top={getPositionFromTime(slot.startHour, slot.startMinute)}
                height={getHeightFromDuration(slot.durationMinutes)}
                onAddTask={() => onAddTask?.(slot.id)}
              />
            ))}

            {/* Calendar Events (read-only) */}
            {events.map((event) => (
              <CalendarEventBlock
                key={event.id}
                name={event.name}
                location={event.location}
                state={event.state}
                top={getPositionFromTime(event.startHour, event.startMinute)}
                height={getHeightFromDuration(event.durationMinutes)}
              />
            ))}

            {/* Tasks */}
            {tasks.map((task) => {
              const isSelected = selectedTaskId === task.id;
              const taskTop = getPositionFromTime(task.startHour, task.startMinute);
              
              // Calculate height - for overrun state, show extended height
              let taskHeight = getHeightFromDuration(task.durationMinutes);
              if (task.state === 'overrun' && task.originalEndHour !== undefined) {
                const currentMinutes = task.durationMinutes;
                const overrunMinutes = currentMinutes + 30; // Show 30 min overrun visually
                taskHeight = getHeightFromDuration(overrunMinutes);
              }

              return (
                <div key={task.id} className={styles.taskWrapper}>
                  <TaskBlock
                    name={task.name}
                    duration={task.duration}
                    state={task.state}
                    top={taskTop}
                    height={taskHeight}
                    onClick={() => handleTaskClick(task.id)}
                  />
                  
                  {/* Task Interaction Menu */}
                  {isSelected && (
                    <div 
                      className={styles.taskMenuWrapper}
                      style={{ top: taskTop + taskHeight + 4 }}
                    >
                      <TaskInteractionMenu
                        isActiveTask={task.isActive || task.state === 'active' || task.state === 'overrun'}
                        onActionSelect={handleTaskAction}
                        onClose={handleCloseMenu}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <label className={styles.showCompletedToggle}>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => onShowCompletedChange?.(e.target.checked)}
          />
          <span className={styles.toggleDot} />
          <span>Show Completed</span>
        </label>
        <span className={styles.syncStatus}>{lastSyncedText}</span>
      </div>

      {/* Floating Agent Button */}
      <FloatingAgentButton onClick={onAgentClick} />

      {/* Click outside handler for menus */}
      {(selectedTaskId || isViewDropdownOpen || isTimezoneDropdownOpen) && (
        <div 
          className={styles.overlay}
          onClick={() => {
            setSelectedTaskId(null);
            setIsViewDropdownOpen(false);
            setIsTimezoneDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default CalendarView;
