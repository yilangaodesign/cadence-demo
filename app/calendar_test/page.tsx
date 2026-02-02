'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Tag,
  Search,
  Toggle,
  Checkbox,
  Button,
} from '@carbon/react';
import {
  Add,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Settings,
  Help,
  Notification,
  UserAvatar,
  Renew,
  Time,
  Checkmark,
  Close,
  OverflowMenuVertical,
  TaskComplete,
  Warning,
  Edit,
  TrashCan,
} from '@carbon/icons-react';
import {
  blueColors,
  purpleColors,
  tealColors,
  greenColors,
  redColors,
  orangeColors,
  yellowColors,
  grayColors,
} from '@/styles/design-tokens';
import styles from './calendar_test.module.scss';

// Types
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startHour: number;
  duration: number; // in hours
  color: string;
  isAllDay?: boolean;
  calendar: string;
  isFixed?: boolean; // true = solid block (not draggable), false = dashed lighter block (draggable)
  completed?: boolean; // true = completed task
}

interface Task {
  id: string;
  title: string;
  time: string;
  date: Date;
  isOverdue: boolean;
  daysOverdue?: number;
  completed: boolean;
}

interface CalendarItem {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
}

// Sample data
// isFixed: true = solid block (not draggable), false = dashed lighter block (draggable)
// completed: true = completed task (hidden by default)
const initialEvents: CalendarEvent[] = [
  { id: '1', title: 'Morning Routine', date: new Date(2023, 11, 17), startHour: 0, duration: 0, color: grayColors.gray50, isAllDay: true, calendar: 'personal', isFixed: true },
  { id: '2', title: 'Paris Vlog Revision Period If Needed', date: new Date(2023, 11, 19), startHour: 0, duration: 0, color: blueColors.blue60, isAllDay: true, calendar: 'work', isFixed: true },
  { id: '3', title: 'Holiday Open House', date: new Date(2023, 11, 17), startHour: 10, duration: 2, color: orangeColors.orange40, calendar: 'personal', isFixed: true },
  { id: '4', title: 'Add Deel to Site', date: new Date(2023, 11, 18), startHour: 10, duration: 0.5, color: blueColors.blue60, calendar: 'work', isFixed: false },
  { id: '5', title: 'Webhook Integration', date: new Date(2023, 11, 18), startHour: 10.5, duration: 1, color: blueColors.blue60, calendar: 'work', isFixed: true },
  { id: '6', title: 'Fix Mobile Sticky Links', date: new Date(2023, 11, 18), startHour: 11.5, duration: 0.5, color: redColors.red50, calendar: 'work', isFixed: false },
  { id: '7', title: 'Coda Hackathon Demo Day', date: new Date(2023, 11, 18), startHour: 12, duration: 2, color: purpleColors.purple60, calendar: 'work', isFixed: true },
  { id: '8', title: 'Add Screenshots', date: new Date(2023, 11, 19), startHour: 10, duration: 1, color: blueColors.blue60, calendar: 'work', isFixed: false },
  { id: '9', title: 'NYS DoTF Meeting', date: new Date(2023, 11, 21), startHour: 10, duration: 0.5, color: blueColors.blue60, calendar: 'work', isFixed: true },
  { id: '10', title: 'Triage Emails', date: new Date(2023, 11, 19), startHour: 11.5, duration: 1, color: greenColors.green50, calendar: 'personal', isFixed: false },
  { id: '11', title: 'James Nieves - Blocking Time', date: new Date(2023, 11, 18), startHour: 13, duration: 1.5, color: tealColors.teal50, calendar: 'work', isFixed: true },
  { id: '12', title: 'Confirming Meeting', date: new Date(2023, 11, 18), startHour: 14.5, duration: 0.5, color: blueColors.blue60, calendar: 'work', isFixed: false },
  { id: '13', title: 'API Planning', date: new Date(2023, 11, 18), startHour: 15, duration: 0.5, color: redColors.red50, calendar: 'work', isFixed: true },
  { id: '14', title: 'Superhuman Setup', date: new Date(2023, 11, 19), startHour: 14, duration: 0.5, color: blueColors.blue60, calendar: 'work', isFixed: false },
  { id: '15', title: 'Create Documentation', date: new Date(2023, 11, 19), startHour: 14.5, duration: 0.75, color: greenColors.green50, calendar: 'work', isFixed: true },
  { id: '16', title: 'Re-Add Features', date: new Date(2023, 11, 22), startHour: 10, duration: 0.5, color: blueColors.blue60, calendar: 'work', isFixed: false },
  { id: '17', title: 'Add Screenshots Part 2', date: new Date(2023, 11, 19), startHour: 16, duration: 1, color: blueColors.blue60, calendar: 'work', isFixed: false },
  { id: '18', title: 'Google Search Console', date: new Date(2023, 11, 18), startHour: 17.5, duration: 0.5, color: greenColors.green50, calendar: 'work', isFixed: true },
  
  // Completed tasks (hidden by default)
  { id: '19', title: 'Morning Standup', date: new Date(2023, 11, 18), startHour: 9, duration: 0.25, color: blueColors.blue60, calendar: 'work', isFixed: false, completed: true },
  { id: '20', title: 'Review PRs', date: new Date(2023, 11, 18), startHour: 9.25, duration: 0.5, color: purpleColors.purple60, calendar: 'work', isFixed: false, completed: true },
  { id: '21', title: 'Coffee Break', date: new Date(2023, 11, 18), startHour: 11, duration: 0.25, color: grayColors.gray50, calendar: 'personal', isFixed: false, completed: true },
  { id: '22', title: 'Lunch', date: new Date(2023, 11, 18), startHour: 12, duration: 0.5, color: grayColors.gray50, calendar: 'personal', isFixed: true, completed: true },
  { id: '23', title: 'Email Responses', date: new Date(2023, 11, 17), startHour: 13, duration: 0.75, color: blueColors.blue60, calendar: 'work', isFixed: false, completed: true },
  { id: '24', title: 'Design Review', date: new Date(2023, 11, 19), startHour: 9, duration: 1, color: purpleColors.purple60, calendar: 'work', isFixed: true, completed: true },
  { id: '25', title: 'Code Cleanup', date: new Date(2023, 11, 19), startHour: 13, duration: 0.5, color: greenColors.green50, calendar: 'work', isFixed: false, completed: true },
];

const initialTasks: Task[] = [
  { id: 't1', title: 'Add Deel to Site (Gusto Comp...', time: '10:00 AM', date: new Date(2023, 11, 18), isOverdue: true, daysOverdue: 5, completed: false },
  { id: 't2', title: 'Webhook for Message Survey...', time: '11:00 AM', date: new Date(2023, 11, 18), isOverdue: true, daysOverdue: 5, completed: false },
  { id: 't3', title: 'Fix Mobile Sticky Links on...', time: '11:30 AM', date: new Date(2023, 11, 18), isOverdue: true, daysOverdue: 5, completed: false },
  { id: 't4', title: 'Coda Hackathon Demo Day', time: '12:00 PM', date: new Date(2023, 11, 18), isOverdue: true, daysOverdue: 5, completed: false },
  { id: 't5', title: 'Confirming $100 Wire Trans...', time: '2:30 PM', date: new Date(2023, 11, 18), isOverdue: true, daysOverdue: 5, completed: false },
  { id: 't6', title: 'API Unassigned DELETE Endp...', time: '3:00 PM', date: new Date(2023, 11, 18), isOverdue: false, daysOverdue: 2, completed: false },
  { id: 't7', title: 'Add Screenshots to VS Pag...', time: '4:00 PM', date: new Date(2023, 11, 18), isOverdue: true, daysOverdue: 3, completed: false },
  { id: 't8', title: 'Google Search Console Analy...', time: '5:30 PM', date: new Date(2023, 11, 18), isOverdue: false, daysOverdue: 13, completed: false },
];

const calendars: CalendarItem[] = [
  { id: 'work', name: 'Alex Bass (Efficient)', color: blueColors.blue60, enabled: true },
  { id: 'personal', name: 'Alex Bass (Personal)', color: purpleColors.purple60, enabled: true },
];

const contacts = [
  { id: 'c1', name: 'Andra (Personal)', enabled: false },
  { id: 'c2', name: 'Andra Vomir (Efficient)', enabled: true },
];

// Helper functions
function formatTime(hour: number): string {
  const h = Math.floor(hour) % 24; // Handle hour 24 as 0 (midnight)
  const m = Math.round((hour - Math.floor(hour)) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return m === 0 ? `${displayHour} ${ampm}` : `${displayHour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function getWeekDates(date: Date): Date[] {
  const week: Date[] = [];
  const current = new Date(date);
  const day = current.getDay();
  const diff = current.getDate() - day;
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(current);
    d.setDate(diff + i);
    week.push(d);
  }
  return week;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getDate() === d2.getDate() && 
         d1.getMonth() === d2.getMonth() && 
         d1.getFullYear() === d2.getFullYear();
}

// Check if two events overlap in time
function eventsOverlap(a: CalendarEvent, b: CalendarEvent): boolean {
  const aStart = a.startHour;
  const aEnd = a.startHour + a.duration;
  const bStart = b.startHour;
  const bEnd = b.startHour + b.duration;
  return aStart < bEnd && bStart < aEnd;
}

// Calculate layout positions for overlapping events
interface EventLayout {
  event: CalendarEvent;
  column: number;
  totalColumns: number;
}

function calculateEventLayouts(events: CalendarEvent[]): EventLayout[] {
  if (events.length === 0) return [];
  
  // Sort events by start time, then by duration (longer first)
  const sortedEvents = [...events].sort((a, b) => {
    if (a.startHour !== b.startHour) return a.startHour - b.startHour;
    return b.duration - a.duration;
  });
  
  // Track columns: each column is a list of events that don't overlap with each other
  const columns: CalendarEvent[][] = [];
  const eventColumns: Map<string, number> = new Map();
  
  for (const event of sortedEvents) {
    // Find the first column where this event doesn't overlap with existing events
    let placed = false;
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex];
      const hasOverlap = column.some(existing => eventsOverlap(event, existing));
      if (!hasOverlap) {
        column.push(event);
        eventColumns.set(event.id, colIndex);
        placed = true;
        break;
      }
    }
    
    // If no column found, create a new one
    if (!placed) {
      columns.push([event]);
      eventColumns.set(event.id, columns.length - 1);
    }
  }
  
  // Now calculate how many columns each event should span
  // An event can expand into adjacent columns if those columns don't have overlapping events
  const layouts: EventLayout[] = [];
  
  for (const event of sortedEvents) {
    const column = eventColumns.get(event.id) ?? 0;
    
    // Find all events that overlap with this one to determine total columns needed
    const overlappingEvents = sortedEvents.filter(e => e.id !== event.id && eventsOverlap(event, e));
    
    // The total columns is the max column index + 1 among overlapping events (including this one)
    let maxColumn = column;
    for (const other of overlappingEvents) {
      const otherCol = eventColumns.get(other.id) ?? 0;
      maxColumn = Math.max(maxColumn, otherCol);
    }
    const totalColumns = maxColumn + 1;
    
    layouts.push({
      event,
      column,
      totalColumns,
    });
  }
  
  return layouts;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];

// Mini Calendar Component
function MiniCalendar({ 
  currentDate, 
  selectedDate, 
  onDateSelect 
}: { 
  currentDate: Date; 
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days: { date: number; isCurrentMonth: boolean; fullDate: Date }[] = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      days.push({ date: d, isCurrentMonth: false, fullDate: new Date(year, month - 1, d) });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, isCurrentMonth: true, fullDate: new Date(year, month, i) });
    }
    
    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: i, isCurrentMonth: false, fullDate: new Date(year, month + 1, i) });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(viewDate);
  const today = new Date();
  
  return (
    <div className={styles.miniCalendar}>
      <div className={styles.miniCalendarHeader}>
        <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}>
          <ChevronLeft size={16} />
        </button>
        <span>{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className={styles.miniCalendarGrid}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className={styles.miniCalendarDayName}>{d}</div>
        ))}
        {days.map((day, i) => (
          <button
            key={i}
            className={`${styles.miniCalendarDay} 
              ${!day.isCurrentMonth ? styles.otherMonth : ''} 
              ${isSameDay(day.fullDate, today) ? styles.today : ''}
              ${isSameDay(day.fullDate, selectedDate) ? styles.selected : ''}`}
            onClick={() => onDateSelect(day.fullDate)}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
}

// Constants for grid snapping
const HOUR_HEIGHT = 60; // pixels per hour
const SNAP_INCREMENT = 0.25; // 15-minute increments
const START_HOUR = 0;  // 12:00 AM (midnight)
const END_HOUR = 24;   // 12:00 AM next day (full 24-hour view)

// Snap value to nearest increment
function snapToGrid(value: number, increment: number = SNAP_INCREMENT): number {
  return Math.round(value / increment) * increment;
}

// Event Component with improved drag handling
function EventBlock({ 
  event, 
  isDragging,
  isGhost,
  onMouseDown,
  onResizeStart,
  onEdit,
  column = 0,
  totalColumns = 1,
}: { 
  event: CalendarEvent;
  isDragging?: boolean;
  isGhost?: boolean;
  onMouseDown: (e: React.MouseEvent, event: CalendarEvent) => void;
  onResizeStart: (e: React.MouseEvent, event: CalendarEvent) => void;
  onEdit: (event: CalendarEvent) => void;
  column?: number;
  totalColumns?: number;
}) {
  // Use pixel-based positioning for accuracy
  const topPx = (event.startHour - START_HOUR) * HOUR_HEIGHT;
  const heightPx = Math.max(event.duration * HOUR_HEIGHT, 20); // Minimum 20px height
  const isFixed = event.isFixed ?? false;
  const isDraggable = !isFixed;
  const isCompleted = event.completed ?? false;
  
  // Calculate width and left position for overlapping events
  const widthPercent = 100 / totalColumns;
  const leftPercent = column * widthPercent;
  
  // For draggable events: lighter background with dashed border
  // For fixed events: solid background
  const blockStyle: React.CSSProperties = isFixed ? {
    backgroundColor: event.color,
    top: `${topPx}px`,
    height: `${heightPx}px`,
    left: `${leftPercent}%`,
    width: `calc(${widthPercent}% - 2px)`, // Small gap between overlapping events
    opacity: isGhost ? 0.4 : isCompleted ? 0.5 : 1,
    pointerEvents: isGhost ? 'none' : 'auto',
  } : {
    backgroundColor: `${event.color}20`, // 20 = 12% opacity in hex
    borderColor: event.color,
    top: `${topPx}px`,
    height: `${heightPx}px`,
    left: `${leftPercent}%`,
    width: `calc(${widthPercent}% - 2px)`, // Small gap between overlapping events
    opacity: isGhost ? 0.4 : isCompleted ? 0.5 : 1,
    pointerEvents: isGhost ? 'none' : 'auto',
  };
  
  return (
    <div
      className={`${styles.eventBlock} ${isFixed ? styles.fixed : styles.draggable} ${isDragging ? styles.dragging : ''} ${isGhost ? styles.ghost : ''} ${isCompleted ? styles.completed : ''}`}
      style={blockStyle}
      onMouseDown={(e) => {
        if (e.button === 0 && isDraggable) { // Left click only, and only if draggable
          e.preventDefault();
          onMouseDown(e, event);
        }
      }}
    >
      <div className={styles.eventContent}>
        <span className={styles.eventTitle} style={!isFixed ? { color: event.color } : undefined}>
          {event.title}
        </span>
        <span className={styles.eventTime} style={!isFixed ? { color: event.color } : undefined}>
          {formatTime(event.startHour)} - {formatTime(event.startHour + event.duration)}
        </span>
      </div>
      
      {/* Edit button - appears on hover */}
      <button
        className={styles.eventEditButton}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(event);
        }}
        title="Edit event"
        style={isFixed ? { color: 'white' } : { color: event.color }}
      >
        <Edit size={14} />
      </button>
      
      {/* Only show resize handle for draggable events */}
      {isDraggable && (
        <div 
          className={styles.eventResizeHandle}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onResizeStart(e, event);
          }}
        />
      )}
    </div>
  );
}

// Drop Preview Component
function DropPreview({ 
  startHour, 
  duration, 
  color 
}: { 
  startHour: number; 
  duration: number; 
  color: string;
}) {
  // Use pixel-based positioning for accuracy
  const topPx = (startHour - START_HOUR) * HOUR_HEIGHT;
  const heightPx = Math.max(duration * HOUR_HEIGHT, 20);
  
  return (
    <div
      className={styles.dropPreview}
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        borderColor: color,
        backgroundColor: `${color}30`,
      }}
    >
      <span className={styles.dropPreviewTime}>
        {formatTime(startHour)} - {formatTime(startHour + duration)}
      </span>
    </div>
  );
}

// Current Time Indicator
function CurrentTimeIndicator() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // For demo purposes, set to 2:30 PM (14.5 hours) to make it visible
  // In production, this would use actual current time
  const hours = 14; // currentTime.getHours();
  const minutes = 30; // currentTime.getMinutes();
  const currentHour = hours + minutes / 60;
  
  // Only show if within the calendar view range
  if (currentHour < START_HOUR || currentHour > END_HOUR) {
    return null;
  }
  
  const topPx = (currentHour - START_HOUR) * HOUR_HEIGHT;
  
  return (
    <div className={styles.currentTimeIndicator} style={{ top: `${topPx}px` }}>
      <div className={styles.currentTimeDot} />
      <div className={styles.currentTimeLine} />
    </div>
  );
}

// Task Item Component
function TaskItem({ 
  task, 
  onToggle,
  onDelete,
}: { 
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <button 
        className={styles.taskCheckbox}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? <Checkmark size={12} /> : <div className={styles.unchecked} />}
      </button>
      <div className={styles.taskInfo}>
        <span className={styles.taskTitle}>{task.title}</span>
        <span className={styles.taskTime}>{task.time}</span>
      </div>
      {task.isOverdue && task.daysOverdue && (
        <span className={styles.taskOverdue}>-{task.daysOverdue}d</span>
      )}
      <span className={`${styles.taskStatus} ${task.isOverdue ? styles.overdue : ''}`} />
    </div>
  );
}

// Event Modal
function EventModal({
  event,
  onClose,
  onSave,
  onDelete,
}: {
  event: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState(event?.title || '');
  const [startHour, setStartHour] = useState(event?.startHour || 9);
  const [duration, setDuration] = useState(event?.duration || 1);
  
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartHour(event.startHour);
      setDuration(event.duration);
    }
  }, [event]);
  
  if (!event) return null;
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{event.id.startsWith('new') ? 'New Event' : 'Edit Event'}</h3>
          <button onClick={onClose}><Close size={20} /></button>
        </div>
        <div className={styles.modalBody}>
          <label>
            <span>Title</span>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              placeholder="Event title"
            />
          </label>
          <label>
            <span>Start Time</span>
            <select value={startHour} onChange={e => setStartHour(Number(e.target.value))}>
              {Array.from({ length: 24 }, (_, i) => i).map(h => (
                <option key={h} value={h}>{formatTime(h)}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Duration (hours)</span>
            <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
              {[0.5, 1, 1.5, 2, 2.5, 3, 4].map(d => (
                <option key={d} value={d}>{d}h</option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.modalFooter}>
          {!event.id.startsWith('new') && (
            <button className={styles.deleteBtn} onClick={() => onDelete(event.id)}>
              <TrashCan size={16} /> Delete
            </button>
          )}
          <div className={styles.modalActions}>
            <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button 
              className={styles.saveBtn}
              onClick={() => onSave({ ...event, title, startHour, duration })}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Drag state interface
interface DragState {
  event: CalendarEvent;
  startX: number;
  startY: number;
  offsetY: number; // Offset from top of event where drag started
  currentDayIndex: number;
  currentStartHour: number;
  originalDayIndex: number;
  originalStartHour: number;
}

// Main Calendar Component
export default function CalendarTestPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 11, 18)); // Dec 18, 2023
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [calendarItems, setCalendarItems] = useState(calendars);
  const [contactItems, setContactItems] = useState(contacts);
  const [viewMode, setViewMode] = useState<'Week' | 'Day' | 'Month'>('Week');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showTaskSidebar, setShowTaskSidebar] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  
  // Drag and drop state
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const dayColumnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeGridRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const weekDates = getWeekDates(currentDate);
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR); // Full 24-hour view
  
  // Default scroll position at 8 AM (slightly above to show 7:45 AM area)
  const DEFAULT_SCROLL_HOUR = 8;
  const MAGNETIC_THRESHOLD = 30; // pixels within which to snap to 8 AM
  
  // Scroll to 8 AM on initial load
  useEffect(() => {
    if (timeGridRef.current) {
      const scrollPosition = (DEFAULT_SCROLL_HOUR - START_HOUR) * HOUR_HEIGHT - 15; // 15px above 8 AM
      timeGridRef.current.scrollTop = Math.max(0, scrollPosition);
    }
  }, [viewMode]); // Re-scroll when view mode changes
  
  // Magnetic scroll effect - snap to 8 AM when close
  const handleScroll = useCallback(() => {
    if (!timeGridRef.current || dragState || isResizing) return;
    
    // Clear any pending scroll adjustment
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Wait for scroll to stop before applying magnetic effect
    scrollTimeoutRef.current = setTimeout(() => {
      if (!timeGridRef.current) return;
      
      const targetScrollTop = (DEFAULT_SCROLL_HOUR - START_HOUR) * HOUR_HEIGHT - 15;
      const currentScrollTop = timeGridRef.current.scrollTop;
      const diff = Math.abs(currentScrollTop - targetScrollTop);
      
      // Only snap if within threshold
      if (diff > 0 && diff < MAGNETIC_THRESHOLD) {
        timeGridRef.current.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }, 150);
  }, [dragState, isResizing]);
  
  // Filter events based on enabled calendars and show completed toggle
  const visibleEvents = events.filter(ev => {
    const calendarEnabled = calendarItems.find(c => c.id === ev.calendar)?.enabled;
    const completedFilter = showCompleted || !ev.completed;
    return calendarEnabled && completedFilter;
  });
  
  // Navigation - adjusts based on view mode
  const goToToday = () => setCurrentDate(new Date(2023, 11, 18)); // Using our sample date
  const goToPrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'Day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'Week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'Day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'Week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Find which day column the mouse is over
  const getDayIndexFromX = useCallback((clientX: number): number => {
    for (let i = 0; i < dayColumnRefs.current.length; i++) {
      const col = dayColumnRefs.current[i];
      if (col) {
        const rect = col.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right) {
          return i;
        }
      }
    }
    return -1;
  }, []);
  
  // Get hour from Y position within a day column
  const getHourFromY = useCallback((clientY: number, dayIndex: number): number => {
    const col = dayColumnRefs.current[dayIndex];
    if (!col) return START_HOUR;
    
    const rect = col.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    
    // Convert pixel position to hours (each hour = HOUR_HEIGHT pixels)
    const rawHour = START_HOUR + (relativeY / HOUR_HEIGHT);
    return snapToGrid(Math.max(START_HOUR, Math.min(END_HOUR - 0.5, rawHour)));
  }, []);
  
  // Handle mouse down on event (start drag)
  const handleEventMouseDown = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    if (event.isAllDay) return;
    
    // Find the day index of the event
    const dayIndex = weekDates.findIndex(d => isSameDay(d, event.date));
    if (dayIndex === -1) return;
    
    // Calculate offset from top of event where drag started
    const eventElement = e.currentTarget as HTMLElement;
    const eventRect = eventElement.getBoundingClientRect();
    const offsetY = e.clientY - eventRect.top;
    
    setDragState({
      event,
      startX: e.clientX,
      startY: e.clientY,
      offsetY,
      currentDayIndex: dayIndex,
      currentStartHour: event.startHour,
      originalDayIndex: dayIndex,
      originalStartHour: event.startHour,
    });
    
    // Prevent text selection
    e.preventDefault();
  }, [weekDates]);
  
  // Handle mouse move during drag
  useEffect(() => {
    if (!dragState) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const dayIndex = getDayIndexFromX(e.clientX);
      if (dayIndex === -1) return;
      
      const col = dayColumnRefs.current[dayIndex];
      if (!col) return;
      
      const rect = col.getBoundingClientRect();
      // Calculate relative Y from the top of the column, accounting for where user grabbed the event
      const relativeY = e.clientY - rect.top - dragState.offsetY;
      
      // Convert pixel position to hours (each hour = HOUR_HEIGHT pixels)
      const rawHour = START_HOUR + (relativeY / HOUR_HEIGHT);
      
      // Snap to grid and clamp within valid range
      const snappedHour = snapToGrid(
        Math.max(START_HOUR, Math.min(END_HOUR - dragState.event.duration, rawHour))
      );
      
      setDragState(prev => prev ? {
        ...prev,
        currentDayIndex: dayIndex,
        currentStartHour: snappedHour,
      } : null);
    };
    
    const handleMouseUp = () => {
      if (dragState) {
        // Update the event with new position
        const newDate = weekDates[dragState.currentDayIndex];
        if (newDate) {
          setEvents(prevEvents => prevEvents.map(ev => 
            ev.id === dragState.event.id 
              ? { ...ev, date: newDate, startHour: dragState.currentStartHour }
              : ev
          ));
        }
        setDragState(null);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, getDayIndexFromX, weekDates]);
  
  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    const startY = e.clientY;
    const startDuration = event.duration;
    setIsResizing(true);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = (moveEvent.clientY - startY) / HOUR_HEIGHT;
      const newDuration = snapToGrid(Math.max(0.25, startDuration + diff));
      setEvents(prevEvents => prevEvents.map(ev =>
        ev.id === event.id ? { ...ev, duration: newDuration } : ev
      ));
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsResizing(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);
  
  const handleTimeSlotClick = (date: Date, hour: number) => {
    const newEvent: CalendarEvent = {
      id: `new-${Date.now()}`,
      title: '',
      date,
      startHour: hour,
      duration: 1,
      color: blueColors.blue60,
      calendar: 'work',
    };
    setSelectedEvent(newEvent);
  };
  
  const handleEventClick = (event: CalendarEvent) => {
    if (!event.isAllDay) {
      setSelectedEvent(event);
    }
  };
  
  const handleSaveEvent = (event: CalendarEvent) => {
    if (event.id.startsWith('new')) {
      setEvents([...events, { ...event, id: `event-${Date.now()}` }]);
    } else {
      setEvents(events.map(ev => ev.id === event.id ? event : ev));
    }
    setSelectedEvent(null);
  };
  
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
    setSelectedEvent(null);
  };
  
  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
  
  const toggleCalendar = (id: string) => {
    setCalendarItems(calendarItems.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
  };
  
  const overdueTaskCount = tasks.filter(t => t.isOverdue && !t.completed).length;
  
  return (
    <div className={`${styles.calendarApp} ${dragState ? styles.isDragging : ''}`}>
      {/* Left Sidebar */}
      <aside className={styles.leftSidebar}>
        <div className={styles.appHeader}>
          <div className={styles.appLogo}>
            <Calendar size={24} />
            <span>Calendar</span>
          </div>
        </div>
        
        <MiniCalendar 
          currentDate={currentDate} 
          selectedDate={currentDate}
          onDateSelect={setCurrentDate}
        />
        
        <div className={styles.sidebarSection}>
          <div className={styles.searchWrapper}>
            <Search 
              size="sm" 
              labelText="Search" 
              placeholder="Search teammates"
            />
          </div>
        </div>
        
        <div className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>
            <span>My calendars</span>
            <button><Edit size={14} /></button>
          </div>
          {calendarItems.map(cal => (
            <label key={cal.id} className={styles.calendarItem}>
              <Checkbox 
                id={cal.id}
                labelText={cal.name}
                checked={cal.enabled}
                onChange={() => toggleCalendar(cal.id)}
              />
              <span 
                className={styles.calendarColor} 
                style={{ backgroundColor: cal.color }}
              />
            </label>
          ))}
        </div>
        
        <div className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>
            <span>Frequently met with</span>
          </div>
          {contactItems.map(contact => (
            <label key={contact.id} className={styles.contactItem}>
              <Checkbox 
                id={contact.id}
                labelText={contact.name}
                checked={contact.enabled}
                onChange={() => setContactItems(contactItems.map(c => 
                  c.id === contact.id ? { ...c, enabled: !c.enabled } : c
                ))}
              />
            </label>
          ))}
        </div>
        
        <div className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>
            <span>Accounts</span>
            <button><Add size={14} /></button>
          </div>
          <div className={styles.accountItem}>
            <UserAvatar size={16} />
            <span>@efficient.app</span>
          </div>
          <div className={styles.accountItem}>
            <UserAvatar size={16} />
            <span>@gmail.com</span>
          </div>
        </div>
      </aside>
      
      {/* Main Calendar Area */}
      <main className={styles.mainContent}>
        {/* Toolbar */}
        <header className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button className={styles.todayBtn} onClick={goToToday}>Today</button>
            <div className={styles.navButtons}>
              <button onClick={goToPrev}><ChevronLeft size={20} /></button>
              <button onClick={goToNext}><ChevronRight size={20} /></button>
            </div>
            <h1 className={styles.currentMonth}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
          </div>
          <div className={styles.toolbarRight}>
            <div className={styles.timezoneSelector}>
              <span>CST</span>
              <span>EST</span>
            </div>
            <button className={styles.addBtn}><Add size={20} /></button>
            <div className={styles.viewSelector}>
              <select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'Week' | 'Day' | 'Month')}
                className={styles.viewSelect}
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
              </select>
            </div>
            <div className={styles.toolbarIcons}>
              <button><Settings size={20} /></button>
              <button><Help size={20} /></button>
              <button><Notification size={20} /></button>
              <button className={styles.userAvatar}>
                <UserAvatar size={24} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Calendar Grid */}
        <div className={styles.calendarWrapper}>
          {/* Month View */}
          {viewMode === 'Month' && (
            <div className={styles.monthView}>
              <div className={styles.monthHeader}>
                {dayNames.map(day => (
                  <div key={day} className={styles.monthDayName}>{day}</div>
                ))}
              </div>
              <div className={styles.monthGrid}>
                {(() => {
                  // Generate month calendar days
                  const year = currentDate.getFullYear();
                  const month = currentDate.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const daysInPrevMonth = new Date(year, month, 0).getDate();
                  
                  const days: { date: Date; isCurrentMonth: boolean }[] = [];
                  
                  // Previous month days
                  for (let i = firstDay - 1; i >= 0; i--) {
                    const d = daysInPrevMonth - i;
                    days.push({ date: new Date(year, month - 1, d), isCurrentMonth: false });
                  }
                  
                  // Current month days
                  for (let i = 1; i <= daysInMonth; i++) {
                    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
                  }
                  
                  // Fill remaining cells (6 rows = 42 cells)
                  const remaining = 42 - days.length;
                  for (let i = 1; i <= remaining; i++) {
                    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
                  }
                  
                  return days.map((day, idx) => {
                    const isToday = isSameDay(day.date, new Date(2023, 11, 18));
                    const dayEvents = visibleEvents.filter(ev => isSameDay(ev.date, day.date));
                    
                    return (
                      <div 
                        key={idx} 
                        className={`${styles.monthDay} ${!day.isCurrentMonth ? styles.otherMonth : ''} ${isToday ? styles.today : ''}`}
                        onClick={() => {
                          setCurrentDate(day.date);
                          setViewMode('Day');
                        }}
                      >
                        <span className={styles.monthDayNumber}>{day.date.getDate()}</span>
                        <div className={styles.monthDayEvents}>
                          {dayEvents.slice(0, 3).map(ev => (
                            <div 
                              key={ev.id} 
                              className={styles.monthEventDot}
                              style={{ backgroundColor: ev.color }}
                              title={ev.title}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <span className={styles.monthMoreEvents}>+{dayEvents.length - 3}</span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}
          
          {/* Day View */}
          {viewMode === 'Day' && (
            <>
              {/* Day Header */}
              <div className={styles.dayHeaders}>
                <div className={styles.timeGutter} />
                <div className={styles.daysWrapper}>
                  <div className={`${styles.dayHeader} ${isSameDay(currentDate, new Date(2023, 11, 18)) ? styles.today : ''}`}>
                    <span className={styles.dayName}>{dayNames[currentDate.getDay()]}</span>
                    <span className={styles.dayNumber}>{currentDate.getDate()}</span>
                  </div>
                </div>
              </div>
              
              {/* All Day Events */}
              <div className={styles.allDayRow}>
                <div className={styles.timeGutter} />
                <div className={styles.daysWrapper}>
                  <div className={styles.allDayCell}>
                    {visibleEvents
                      .filter(ev => ev.isAllDay && isSameDay(ev.date, currentDate))
                      .map(ev => (
                        <div 
                          key={ev.id}
                          className={styles.allDayEvent}
                          style={{ backgroundColor: ev.color }}
                        >
                          {ev.title}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              {/* Time Grid for Day View */}
              <div className={styles.timeGrid} ref={timeGridRef} onScroll={handleScroll}>
                <div className={styles.timeColumn}>
                  {hours.map(hour => (
                    <div key={hour} className={styles.timeLabel}>
                      {formatTime(hour)}
                    </div>
                  ))}
                </div>
                
                <div className={styles.daysGrid} ref={gridRef}>
                  <div 
                    className={`${styles.dayColumn} ${dragState && dragState.currentDayIndex === 0 ? styles.dropTarget : ''}`}
                    ref={el => { dayColumnRefs.current[0] = el; }}
                  >
                    {hours.map(hour => (
                      <div 
                        key={hour}
                        className={`${styles.timeSlot} ${
                          dragState && 
                          dragState.currentDayIndex === 0 && 
                          Math.floor(dragState.currentStartHour) === hour 
                            ? styles.activeSlot 
                            : ''
                        }`}
                        onClick={() => !dragState && handleTimeSlotClick(currentDate, hour)}
                      />
                    ))}
                    
                    {/* Events for this day */}
                    <div className={styles.eventsContainer}>
                      {/* Current time indicator */}
                      {isSameDay(currentDate, new Date(2023, 11, 18)) && <CurrentTimeIndicator />}
                      
                      {/* Drop preview when dragging */}
                      {dragState && dragState.currentDayIndex === 0 && (
                        <DropPreview 
                          startHour={dragState.currentStartHour}
                          duration={dragState.event.duration}
                          color={dragState.event.color}
                        />
                      )}
                      
                      {/* Render events with overlap handling */}
                      {(() => {
                        const dayEvents = visibleEvents.filter(ev => !ev.isAllDay && isSameDay(ev.date, currentDate));
                        const layouts = calculateEventLayouts(dayEvents);
                        
                        return layouts.map(({ event: ev, column, totalColumns }) => {
                          const isDraggingThis = dragState?.event.id === ev.id;
                          
                          return (
                            <EventBlock 
                              key={ev.id}
                              event={ev}
                              isDragging={isDraggingThis}
                              isGhost={isDraggingThis}
                              onMouseDown={handleEventMouseDown}
                              onResizeStart={handleResizeStart}
                              onEdit={handleEventClick}
                              column={column}
                              totalColumns={totalColumns}
                            />
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Week View */}
          {viewMode === 'Week' && (
            <>
              {/* Day Headers */}
              <div className={styles.dayHeaders}>
                <div className={styles.timeGutter} />
                <div className={styles.daysWrapper}>
                  {weekDates.map((date, i) => {
                    const isToday = isSameDay(date, new Date(2023, 11, 18));
                    return (
                      <div 
                        key={i} 
                        className={`${styles.dayHeader} ${isToday ? styles.today : ''}`}
                        onClick={() => {
                          setCurrentDate(date);
                          setViewMode('Day');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <span className={styles.dayName}>{dayNames[date.getDay()]}</span>
                        <span className={styles.dayNumber}>{date.getDate()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* All Day Events */}
              <div className={styles.allDayRow}>
                <div className={styles.timeGutter} />
                <div className={styles.daysWrapper}>
                  {weekDates.map((date, i) => {
                    const dayEvents = visibleEvents.filter(ev => 
                      ev.isAllDay && isSameDay(ev.date, date)
                    );
                    return (
                      <div key={i} className={styles.allDayCell}>
                        {dayEvents.map(ev => (
                          <div 
                            key={ev.id}
                            className={styles.allDayEvent}
                            style={{ backgroundColor: ev.color }}
                          >
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Time Grid */}
              <div className={styles.timeGrid} ref={timeGridRef} onScroll={handleScroll}>
                <div className={styles.timeColumn}>
                  {hours.map(hour => (
                    <div key={hour} className={styles.timeLabel}>
                      {formatTime(hour)}
                    </div>
                  ))}
                </div>
                
                <div className={styles.daysGrid} ref={gridRef}>
                  {weekDates.map((date, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`${styles.dayColumn} ${dragState && dragState.currentDayIndex === dayIndex ? styles.dropTarget : ''}`}
                      ref={el => { dayColumnRefs.current[dayIndex] = el; }}
                    >
                      {hours.map(hour => (
                        <div 
                          key={hour}
                          className={`${styles.timeSlot} ${
                            dragState && 
                            dragState.currentDayIndex === dayIndex && 
                            Math.floor(dragState.currentStartHour) === hour 
                              ? styles.activeSlot 
                              : ''
                          }`}
                          onClick={() => !dragState && handleTimeSlotClick(date, hour)}
                        />
                      ))}
                      
                      {/* Events for this day */}
                      <div className={styles.eventsContainer}>
                        {/* Current time indicator - only show for the marked "today" */}
                        {isSameDay(date, new Date(2023, 11, 18)) && <CurrentTimeIndicator />}
                        
                        {/* Drop preview when dragging to this column */}
                        {dragState && dragState.currentDayIndex === dayIndex && (
                          <DropPreview 
                            startHour={dragState.currentStartHour}
                            duration={dragState.event.duration}
                            color={dragState.event.color}
                          />
                        )}
                        
                        {/* Render events with overlap handling */}
                        {(() => {
                          const dayEvents = visibleEvents.filter(ev => !ev.isAllDay && isSameDay(ev.date, date));
                          const layouts = calculateEventLayouts(dayEvents);
                          
                          return layouts.map(({ event: ev, column, totalColumns }) => {
                            const isDraggingThis = dragState?.event.id === ev.id;
                            
                            // Show the event with reduced opacity when it's being dragged
                            return (
                              <EventBlock 
                                key={ev.id}
                                event={ev}
                                isDragging={isDraggingThis}
                                isGhost={isDraggingThis}
                                onMouseDown={handleEventMouseDown}
                                onResizeStart={handleResizeStart}
                                onEdit={handleEventClick}
                                column={column}
                                totalColumns={totalColumns}
                              />
                            );
                          });
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Show Completed Tasks Toggle */}
        <div className={styles.completedToggle}>
          <Toggle 
            id="show-completed" 
            labelText=""
            labelA="Show Completed Tasks"
            labelB="Show Completed Tasks"
            size="sm"
            toggled={showCompleted}
            onToggle={(checked) => setShowCompleted(checked)}
          />
        </div>
      </main>
      
      {/* Right Sidebar - Tasks */}
      {showTaskSidebar && (
        <aside className={styles.rightSidebar}>
          <div className={styles.taskHeader}>
            <div className={styles.currentEvent}>
              <span className={styles.eventLabel}>folk - Research folk Inte...</span>
              <span className={styles.eventTimeSmall}>5 - 5:30 PM</span>
            </div>
          </div>
          
          <button className={styles.addTaskBtn}>
            <Add size={16} /> Add task
          </button>
          
          {overdueTaskCount > 0 && (
            <div className={styles.overdueWarning}>
              <Warning size={16} />
              <span>{overdueTaskCount} tasks scheduled past deadline</span>
              <button className={styles.resolveBtn}>Resolve</button>
            </div>
          )}
          
          <div className={styles.taskList}>
            <div className={styles.taskGroup}>
              <div className={styles.taskGroupHeader}>
                <span className={styles.taskDate}>18 Dec</span>
                <span className={styles.taskDay}>MON</span>
              </div>
              {tasks.map(task => (
                <TaskItem 
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
            
            <div className={styles.taskGroup}>
              <div className={styles.taskGroupHeader}>
                <span className={styles.taskDate}>19 Dec</span>
                <span className={styles.taskDay}>TUE</span>
              </div>
              <TaskItem 
                task={{
                  id: 't9',
                  title: 'Add Screenshots to VS Pag...',
                  time: '10:00 AM',
                  date: new Date(2023, 11, 19),
                  isOverdue: true,
                  daysOverdue: 4,
                  completed: false,
                }}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </div>
          </div>
          
          <button className={styles.refreshBtn}>
            <Renew size={16} /> Refresh all tasks
          </button>
        </aside>
      )}
      
      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}
