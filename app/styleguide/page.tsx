'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Tag,
  Tile,
} from '@carbon/react';
import {
  Add,
  Calendar,
  Time,
  Checkmark,
  Close,
  ChevronRight,
  ChevronLeft,
  Renew,
  Notification,
  NotificationNew,
  Draggable as DraggableIcon,
  Undo,
  Email,
  Chat,
  Document,
} from '@carbon/icons-react';

// Cadence Components
import {
  CadenceButton,
  OverlineLabel,
  DeadlineChip,
  ConfidenceBadge,
  MonoValue,
  ReasoningChip,
  UndoButton,
  TaskCard,
  QueuedTaskCard,
  ActiveTaskCard,
  MeetingCard,
  InsightCard,
  TaskProposalCard,
  DeadlineListItem,
  MyPaceGauge,
  DateHeader,
  ModeToggle,
  UrgentInboundBanner,
} from '@/components/cadence';
import {
  // Cadence Brand Colors
  lumenColors,
  terraColors,
  cadenceNeutrals,
  // Carbon Base Colors
  blueColors,
  grayColors,
  coolGrayColors,
  warmGrayColors,
  purpleColors,
  cyanColors,
  tealColors,
  greenColors,
  redColors,
  orangeColors,
  yellowColors,
  magentaColors,
  supportColors,
  backgroundColors,
  layerColors,
  textColors,
  linkColors,
  borderColors,
  // Typography
  fontFamilies,
  fontWeights,
  fontSizes,
  typography,
  cadenceTypography,
  cadenceFontRoles,
  cadenceTypeSets,
  // Layout & Effects
  spacing,
  spacingPx,
  borderRadius,
  shadows,
  breakpoints,
  breakpointsPx,
  duration,
  easing,
  zIndex,
  iconSizes,
} from '@/styles/design-tokens';
import styles from './styleguide.module.scss';

// Navigation items for the style guide
const navItems = [
  { id: 'brand-colors', label: 'Brand Colors' },
  { id: 'colors', label: 'Color Palettes' },
  { id: 'typography', label: 'Typography' },
  { id: 'cadence-typography', label: 'Cadence Type' },
  { id: 'custom-components', label: 'Custom Components' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'effects', label: 'Effects' },
  { id: 'breakpoints', label: 'Breakpoints' },
  { id: 'motion', label: 'Motion' },
  { id: 'animation-playground', label: 'Animations' },
  { id: 'cadence', label: 'Calendar Blocks' },
];

// Color swatch component
function ColorSwatch({ 
  name, 
  value, 
  textColor = '#ffffff' 
}: { 
  name: string; 
  value: string; 
  textColor?: string;
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className={styles.colorSwatch} onClick={copyToClipboard}>
      <div 
        className={styles.colorPreview} 
        style={{ backgroundColor: value, color: textColor }}
      >
        <span className={styles.colorValue}>{value}</span>
      </div>
      <div className={styles.colorInfo}>
        <span className={styles.colorName}>{name}</span>
      </div>
    </div>
  );
}

// Color palette component
function ColorPalette({ 
  title, 
  colors, 
  lightTextThreshold = 50 
}: { 
  title: string; 
  colors: Record<string, string>;
  lightTextThreshold?: number;
}) {
  const getTextColor = (colorName: string) => {
    const match = colorName.match(/\d+/);
    if (match) {
      const num = parseInt(match[0]);
      return num >= lightTextThreshold ? '#ffffff' : '#161616';
    }
    return '#161616';
  };

  return (
    <div className={styles.colorPalette}>
      <h3 className={styles.paletteTitle}>{title}</h3>
      <div className={styles.colorGrid}>
        {(Object.entries(colors) as [string, string][]).map(([name, value]) => (
          <ColorSwatch 
            key={name} 
            name={name} 
            value={value} 
            textColor={getTextColor(name)}
          />
        ))}
      </div>
    </div>
  );
}

// Typography sample component
function TypographySample({ 
  name, 
  style 
}: { 
  name: string; 
  style: { 
    fontFamily?: string; 
    fontSize: string; 
    fontWeight: number; 
    lineHeight: number; 
    letterSpacing: string;
  };
}) {
  return (
    <Tile className={styles.typographySample}>
      <div className={styles.typographyPreview}>
        <p style={{
          fontFamily: style.fontFamily || fontFamilies.sans,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
        }}>
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div className={styles.typographyInfo}>
        <span className={styles.typographyName}>{name}</span>
        <div className={styles.typographyDetails}>
          <Tag type="gray" size="sm">Size: {style.fontSize}</Tag>
          <Tag type="gray" size="sm">Weight: {style.fontWeight}</Tag>
          <Tag type="gray" size="sm">Line height: {style.lineHeight}</Tag>
        </div>
      </div>
    </Tile>
  );
}

// Spacing sample component
function SpacingSample({ name, value, px }: { name: string; value: string; px: number }) {
  return (
    <div className={styles.spacingSample}>
      <div className={styles.spacingVisual}>
        <div 
          className={styles.spacingBar} 
          style={{ width: `${Math.min(px * 2, 320)}px`, height: `${Math.min(px, 32)}px` }}
        />
      </div>
      <div className={styles.spacingInfo}>
        <span className={styles.spacingName}>spacing-{name}</span>
        <span className={styles.spacingValue}>{value} ({px}px)</span>
      </div>
    </div>
  );
}

// Shadow sample component
function ShadowSample({ name, value }: { name: string; value: string }) {
  return (
    <Tile className={styles.shadowSample}>
      <div className={styles.shadowPreview} style={{ boxShadow: value }} />
      <div className={styles.shadowInfo}>
        <span className={styles.shadowName}>{name}</span>
        <code className={styles.shadowCode}>{value}</code>
      </div>
    </Tile>
  );
}

// Border radius sample component
function RadiusSample({ name, value }: { name: string; value: string }) {
  return (
    <Tile className={styles.radiusSample}>
      <div className={styles.radiusPreview} style={{ borderRadius: value }} />
      <div className={styles.radiusInfo}>
        <span className={styles.radiusName}>{name}</span>
        <span className={styles.radiusValue}>{value}</span>
      </div>
    </Tile>
  );
}

// Helper functions
function getZIndexUsage(name: string): string {
  const usages: Record<string, string> = {
    hidden: 'Hidden elements below the page',
    default: 'Standard page elements',
    dropdown: 'Dropdown menus and select lists',
    sticky: 'Sticky headers and navigation',
    fixed: 'Fixed position elements',
    modalBackdrop: 'Modal overlay backgrounds',
    modal: 'Modal dialogs',
    popover: 'Popovers and floating menus',
    tooltip: 'Tooltips and hints',
    toast: 'Toast notifications',
  };
  return usages[name] || '';
}

function getDurationUsage(name: string): string {
  const usages: Record<string, string> = {
    fast01: 'Micro-interactions, icons',
    fast02: 'Small element expansion',
    moderate01: 'Button feedback',
    moderate02: 'Standard transitions',
    slow01: 'Large element expansion',
    slow02: 'Background dimming',
  };
  return usages[name] || '';
}

// =============================================================================
// ANIMATION PLAYGROUND COMPONENTS
// =============================================================================

// Typewriter Effect
function TypewriterDemo() {
  const [text, setText] = useState('');
  const fullText = 'Meeting starts soon...';
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (isTyping) {
      if (text.length < fullText.length) {
        const timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setText('');
          setIsTyping(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, isTyping]);
  
  return (
    <div className={styles.typewriter}>
      <span>{text}</span>
      <span className={styles.cursor}>|</span>
    </div>
  );
}

// Blur Reveal
function BlurRevealDemo() {
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setRevealed(r => !r), 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`${styles.blurReveal} ${revealed ? styles.revealed : ''}`}>
      New Event Created
    </div>
  );
}

// Counter Animation
function CounterDemo() {
  const [count, setCount] = useState(0);
  const target = 127;
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
        setTimeout(() => setCount(0), 1500);
        setTimeout(() => {
          current = 0;
        }, 1500);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, [count]);
  
  return (
    <div className={styles.counter}>
      <span className={styles.counterNumber}>{count}</span>
      <span className={styles.counterLabel}>meetings this month</span>
    </div>
  );
}

// Fade Demo
function FadeDemo() {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 1500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`${styles.fadeBox} ${visible ? styles.fadeIn : styles.fadeOut}`}>
      <Calendar size={24} />
    </div>
  );
}

// Slide Demo
function SlideDemo() {
  const [direction, setDirection] = useState(0);
  const directions = ['left', 'right', 'up', 'down'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(d => (d + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.slideContainer}>
      <div className={`${styles.slideBox} ${styles[`slide${directions[direction].charAt(0).toUpperCase() + directions[direction].slice(1)}`]}`}>
        <ChevronRight size={20} />
      </div>
    </div>
  );
}

// Scale Demo
function ScaleDemo() {
  const [scaled, setScaled] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setScaled(s => !s), 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`${styles.scaleBox} ${scaled ? styles.scaleUp : ''}`}>
      <Add size={24} />
    </div>
  );
}

// Flip Card Demo
function FlipCardDemo() {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div 
      className={`${styles.flipCard} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <Calendar size={24} />
          <span>Click me</span>
        </div>
        <div className={styles.flipCardBack}>
          <Time size={24} />
          <span>10:00 AM</span>
        </div>
      </div>
    </div>
  );
}

// Morph Demo
function MorphDemo() {
  const [morphed, setMorphed] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setMorphed(m => !m), 1500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`${styles.morphShape} ${morphed ? styles.morphed : ''}`} />
  );
}

// Staggered List Demo
function StaggeredListDemo() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.staggeredList}>
      {[0, 1, 2, 3].map(i => (
        <div 
          key={i} 
          className={`${styles.staggeredItem} ${visible ? styles.staggeredVisible : ''}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

// Magnetic Button Demo
function MagneticButtonDemo() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <div 
      ref={buttonRef}
      className={styles.magneticButton}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <Add size={20} />
      <span>Add Event</span>
    </div>
  );
}

// Tilt Card Demo
function TiltCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 20;
    const tiltY = (x - 0.5) * -20;
    setTransform(`perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  };
  
  const handleMouseLeave = () => {
    setTransform('');
  };
  
  return (
    <div 
      ref={cardRef}
      className={styles.tiltCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <span>Hover & Move</span>
    </div>
  );
}

// Ripple Button Demo
function RippleButtonDemo() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => {
      setRipples(r => r.filter(ripple => ripple.id !== id));
    }, 600);
  };
  
  return (
    <button className={styles.rippleButton} onClick={handleClick}>
      Click Me
      {ripples.map(ripple => (
        <span 
          key={ripple.id} 
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}

// Cursor Trail Demo
function CursorTrailDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setTrails(t => [...t.slice(-10), { x, y, id }]);
  };
  
  return (
    <div 
      ref={containerRef}
      className={styles.cursorTrailContainer}
      onMouseMove={handleMouseMove}
    >
      <span className={styles.cursorTrailText}>Move cursor here</span>
      {trails.map((trail, i) => (
        <div 
          key={trail.id}
          className={styles.trail}
          style={{ 
            left: trail.x, 
            top: trail.y,
            opacity: (i + 1) / trails.length * 0.8,
            transform: `scale(${(i + 1) / trails.length})`
          }}
        />
      ))}
    </div>
  );
}

// Particles Demo
function ParticlesDemo() {
  // Use seeded pseudo-random values to avoid hydration mismatch
  // These are pre-computed deterministic values
  const particles = [
    { id: 0, size: 8, x: 15, y: 25, duration: 3.5, delay: 0.2 },
    { id: 1, size: 6, x: 45, y: 10, duration: 4.2, delay: 1.1 },
    { id: 2, size: 9, x: 75, y: 40, duration: 2.8, delay: 0.5 },
    { id: 3, size: 5, x: 20, y: 70, duration: 3.9, delay: 1.5 },
    { id: 4, size: 7, x: 55, y: 55, duration: 4.5, delay: 0.8 },
    { id: 5, size: 10, x: 85, y: 20, duration: 3.2, delay: 1.8 },
    { id: 6, size: 6, x: 30, y: 85, duration: 4.0, delay: 0.3 },
    { id: 7, size: 8, x: 65, y: 30, duration: 3.6, delay: 1.2 },
    { id: 8, size: 5, x: 10, y: 50, duration: 4.8, delay: 0.7 },
    { id: 9, size: 7, x: 90, y: 65, duration: 2.5, delay: 1.4 },
    { id: 10, size: 9, x: 40, y: 90, duration: 3.3, delay: 0.1 },
    { id: 11, size: 6, x: 70, y: 15, duration: 4.1, delay: 1.9 },
    { id: 12, size: 8, x: 25, y: 45, duration: 3.7, delay: 0.6 },
    { id: 13, size: 5, x: 80, y: 80, duration: 4.4, delay: 1.0 },
    { id: 14, size: 7, x: 50, y: 5, duration: 2.9, delay: 1.6 },
  ];
  
  return (
    <div className={styles.particlesContainer}>
      {particles.map(p => (
        <div 
          key={p.id}
          className={styles.particle}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <span className={styles.bgText}>Particles</span>
    </div>
  );
}

// Progress Bar Demo
function ProgressBarDemo() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setTimeout(() => setProgress(0), 500);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className={styles.progressText}>{progress}%</span>
    </div>
  );
}

// Circular Progress Demo
function CircularProgressDemo() {
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 35;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setTimeout(() => setProgress(0), 500);
          return 100;
        }
        return p + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.circularProgress}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle
          className={styles.circularBg}
          cx="40"
          cy="40"
          r="35"
          fill="none"
          strokeWidth="6"
        />
        <circle
          className={styles.circularFill}
          cx="40"
          cy="40"
          r="35"
          fill="none"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span className={styles.circularText}>{progress}%</span>
    </div>
  );
}

// Drag and Drop Calendar Demo
function DragDropCalendarDemo() {
  const [events, setEvents] = useState([
    { id: 1, slot: 0, name: 'Team Standup', color: blueColors.blue60 },
    { id: 2, slot: 2, name: 'Design Review', color: purpleColors.purple60 },
  ]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  
  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };
  
  const handleDragOver = (e: React.DragEvent, slot: number) => {
    e.preventDefault();
    setDragOverSlot(slot);
  };
  
  const handleDrop = (slot: number) => {
    if (draggedId !== null) {
      setEvents(events.map(event => 
        event.id === draggedId ? { ...event, slot } : event
      ));
    }
    setDraggedId(null);
    setDragOverSlot(null);
  };
  
  const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  
  return (
    <div className={styles.calendarDemo}>
      {slots.map((time, i) => (
        <div 
          key={i}
          className={`${styles.timeSlot} ${dragOverSlot === i ? styles.dragOver : ''}`}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
        >
          <span className={styles.timeLabel}>{time}</span>
          {events.filter(e => e.slot === i).map(event => (
            <div
              key={event.id}
              className={`${styles.calendarEvent} ${draggedId === event.id ? styles.dragging : ''}`}
              style={{ backgroundColor: event.color }}
              draggable
              onDragStart={() => handleDragStart(event.id)}
              onDragEnd={() => { setDraggedId(null); setDragOverSlot(null); }}
            >
              <DraggableIcon size={14} />
              {event.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Resizable Event Demo
function ResizableEventDemo() {
  const [height, setHeight] = useState(60);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    e.preventDefault();
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        const diff = e.clientY - startY.current;
        const newHeight = Math.max(40, Math.min(120, startHeight.current + diff));
        setHeight(newHeight);
      }
    };
    
    const handleMouseUp = () => {
      isResizing.current = false;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  const duration = Math.round((height / 60) * 60);
  
  return (
    <div className={styles.resizableDemo} ref={containerRef}>
      <div className={styles.resizableEvent} style={{ height }}>
        <div className={styles.eventContent}>
          <span className={styles.eventTitle}>Project Meeting</span>
          <span className={styles.eventTime}>{duration} min</span>
        </div>
        <div className={styles.resizeHandle} onMouseDown={handleMouseDown}>
          <div className={styles.resizeBar} />
        </div>
      </div>
      <p className={styles.demoHint}>Drag bottom edge to resize</p>
    </div>
  );
}

// Month Transition Demo
function MonthTransitionDemo() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const [monthIndex, setMonthIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  const goNext = () => {
    setDirection('left');
    setMonthIndex(i => (i + 1) % months.length);
  };
  
  const goPrev = () => {
    setDirection('right');
    setMonthIndex(i => (i - 1 + months.length) % months.length);
  };
  
  return (
    <div className={styles.monthTransition}>
      <button className={styles.monthNavBtn} onClick={goPrev}>
        <ChevronLeft size={20} />
      </button>
      <div className={styles.monthContainer}>
        <div 
          key={monthIndex}
          className={`${styles.monthName} ${styles[`slide${direction === 'left' ? 'Left' : 'Right'}Enter`]}`}
        >
          {months[monthIndex]} 2026
        </div>
      </div>
      <button className={styles.monthNavBtn} onClick={goNext}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// Time Slot Selection Demo
function TimeSlotSelectionDemo() {
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startSlot, setStartSlot] = useState<number | null>(null);
  
  const slots = Array.from({ length: 8 }, (_, i) => `${9 + i}:00`);
  
  const handleMouseDown = (index: number) => {
    setIsSelecting(true);
    setStartSlot(index);
    setSelectedSlots([index]);
  };
  
  const handleMouseEnter = (index: number) => {
    if (isSelecting && startSlot !== null) {
      const start = Math.min(startSlot, index);
      const end = Math.max(startSlot, index);
      setSelectedSlots(Array.from({ length: end - start + 1 }, (_, i) => start + i));
    }
  };
  
  const handleMouseUp = () => {
    setIsSelecting(false);
  };
  
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);
  
  return (
    <div className={styles.timeSlotSelection}>
      <p className={styles.demoHint}>Click and drag to select time range</p>
      <div className={styles.slotsGrid}>
        {slots.map((time, i) => (
          <div
            key={i}
            className={`${styles.selectableSlot} ${selectedSlots.includes(i) ? styles.selected : ''}`}
            onMouseDown={() => handleMouseDown(i)}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            {time}
          </div>
        ))}
      </div>
      {selectedSlots.length > 0 && (
        <p className={styles.selectedRange}>
          Selected: {slots[Math.min(...selectedSlots)]} - {slots[Math.max(...selectedSlots)]}
        </p>
      )}
    </div>
  );
}

// Animated Toggle Demo
function AnimatedToggleDemo() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <div className={styles.toggleDemo}>
      <button 
        className={`${styles.animatedToggle} ${isOn ? styles.toggleOn : ''}`}
        onClick={() => setIsOn(!isOn)}
      >
        <div className={styles.toggleTrack}>
          <div className={styles.toggleThumb}>
            {isOn ? <Checkmark size={12} /> : <Close size={12} />}
          </div>
        </div>
      </button>
      <span>{isOn ? 'Notifications On' : 'Notifications Off'}</span>
    </div>
  );
}

// Animated Checkbox Demo
function AnimatedCheckboxDemo() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className={styles.checkboxDemo}>
      <button 
        className={`${styles.animatedCheckbox} ${checked ? styles.checked : ''}`}
        onClick={() => setChecked(!checked)}
      >
        <svg viewBox="0 0 24 24" className={styles.checkmark}>
          <path 
            className={styles.checkmarkPath}
            d="M4 12l6 6L20 6" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span>Mark as complete</span>
    </div>
  );
}

// Like Button Demo
function LikeButtonDemo() {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; angle: number }>>([]);
  
  const handleClick = () => {
    if (!liked) {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        angle: i * 60,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 600);
    }
    setLiked(!liked);
  };
  
  return (
    <button className={styles.likeButton} onClick={handleClick}>
      <div className={`${styles.heart} ${liked ? styles.liked : ''}`}>
        <svg viewBox="0 0 24 24" fill={liked ? redColors.red50 : 'none'} stroke={liked ? redColors.red50 : grayColors.gray50}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" />
        </svg>
      </div>
      {particles.map(p => (
        <span 
          key={p.id}
          className={styles.heartParticle}
          style={{ '--angle': `${p.angle}deg` } as React.CSSProperties}
        />
      ))}
    </button>
  );
}

// Notification Badge Demo
function NotificationBadgeDemo() {
  const [count, setCount] = useState(0);
  
  return (
    <div className={styles.notificationBadgeDemo}>
      <button 
        className={styles.notificationIcon}
        onClick={() => setCount(c => c + 1)}
      >
        {count > 0 ? <NotificationNew size={24} /> : <Notification size={24} />}
        {count > 0 && (
          <span key={count} className={styles.badge}>
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>
      <button className={styles.clearBtn} onClick={() => setCount(0)}>Clear</button>
    </div>
  );
}

// Form State Demo
function FormStateDemo() {
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');
  
  const simulate = (newState: 'success' | 'error') => {
    setState(newState);
    setTimeout(() => setState('idle'), 2000);
  };
  
  return (
    <div className={styles.formStateDemo}>
      <div className={`${styles.formInput} ${styles[state]}`}>
        <input type="text" placeholder="Enter email..." />
        {state === 'success' && <Checkmark size={16} className={styles.stateIcon} />}
        {state === 'error' && <Close size={16} className={styles.stateIcon} />}
      </div>
      <div className={styles.formActions}>
        <button onClick={() => simulate('success')}>Success</button>
        <button onClick={() => simulate('error')}>Error</button>
      </div>
    </div>
  );
}

// Accordion Demo
function AccordionDemo() {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={styles.accordionDemo}>
      <button 
        className={styles.accordionHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <span>Meeting Details</span>
        <ChevronRight 
          size={16} 
          className={`${styles.accordionIcon} ${expanded ? styles.expanded : ''}`}
        />
      </button>
      <div className={`${styles.accordionContent} ${expanded ? styles.expanded : ''}`}>
        <div className={styles.accordionInner}>
          <p>Project Review with Design Team</p>
          <p>Duration: 30 minutes</p>
        </div>
      </div>
    </div>
  );
}

// Toast Demo
function ToastDemo() {
  const [toasts, setToasts] = useState<Array<{ id: number; type: string }>>([]);
  
  const addToast = () => {
    const id = Date.now();
    setToasts(t => [...t, { id, type: 'success' }]);
    setTimeout(() => {
      setToasts(t => t.filter(toast => toast.id !== id));
    }, 2000);
  };
  
  return (
    <div className={styles.toastDemo}>
      <button className={styles.toastTrigger} onClick={addToast}>
        Show Toast
      </button>
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <div key={toast.id} className={styles.toast}>
            <Checkmark size={16} />
            Event saved!
          </div>
        ))}
      </div>
    </div>
  );
}

// Shake Demo
function ShakeDemo() {
  const [shaking, setShaking] = useState(false);
  
  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };
  
  return (
    <div className={styles.shakeDemo}>
      <div className={`${styles.shakeBox} ${shaking ? styles.shaking : ''}`}>
        <Close size={20} />
        <span>Invalid input</span>
      </div>
      <button onClick={triggerShake}>Trigger Shake</button>
    </div>
  );
}

// Confetti Demo
function ConfettiDemo() {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);
  
  const celebrate = () => {
    const colors = [blueColors.blue60, purpleColors.purple60, greenColors.green50, yellowColors.yellow30];
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2000);
  };
  
  return (
    <div className={styles.confettiDemo}>
      <button className={styles.celebrateBtn} onClick={celebrate}>
        <Checkmark size={16} />
        Celebrate!
      </button>
      {confetti.map(c => (
        <div 
          key={c.id}
          className={styles.confettiPiece}
          style={{ 
            left: `${c.x}%`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`
          }}
        />
      ))}
    </div>
  );
}

// Bounce Notification Demo
function BounceNotificationDemo() {
  const [show, setShow] = useState(false);
  
  const trigger = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };
  
  return (
    <div className={styles.bounceDemo}>
      <button onClick={trigger}>Show Alert</button>
      {show && (
        <div className={styles.bounceAlert}>
          <NotificationNew size={16} />
          New meeting invite!
        </div>
      )}
    </div>
  );
}

// Bar Chart Demo
function BarChartDemo() {
  const [animated, setAnimated] = useState(false);
  const data = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 85 },
    { label: 'Wed', value: 45 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 70 },
  ];
  
  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={styles.barChart}>
      <div className={styles.bars}>
        {data.map((d, i) => (
          <div key={d.label} className={styles.barColumn}>
            <div 
              className={styles.bar}
              style={{ 
                height: animated ? `${d.value}%` : '0%',
                transitionDelay: `${i * 100}ms`
              }}
            />
            <span className={styles.barLabel}>{d.label}</span>
          </div>
        ))}
      </div>
      <button className={styles.resetBtn} onClick={() => { setAnimated(false); setTimeout(() => setAnimated(true), 100); }}>
        <Renew size={14} /> Reset
      </button>
    </div>
  );
}

// Donut Chart Demo
function DonutChartDemo() {
  const [animated, setAnimated] = useState(false);
  const data = [
    { value: 40, color: blueColors.blue60 },
    { value: 30, color: purpleColors.purple60 },
    { value: 30, color: tealColors.teal50 },
  ];
  
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  
  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={styles.donutChart}>
      <svg viewBox="0 0 100 100">
        {data.map((d, i) => {
          const startAngle = (cumulative / total) * 360;
          const angle = (d.value / total) * 360;
          cumulative += d.value;
          
          const radius = 35;
          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = circumference;
          const strokeDashoffset = animated ? circumference - (angle / 360) * circumference : circumference;
          
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth="12"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(${startAngle - 90} 50 50)`}
              style={{ transition: `stroke-dashoffset 1s ease ${i * 0.2}s` }}
            />
          );
        })}
      </svg>
      <div className={styles.donutCenter}>
        <span className={styles.donutValue}>100%</span>
        <span className={styles.donutLabel}>Complete</span>
      </div>
      <button className={styles.resetBtn} onClick={() => { setAnimated(false); setTimeout(() => setAnimated(true), 100); }}>
        <Renew size={14} /> Reset
      </button>
    </div>
  );
}

// Timeline Demo
function TimelineDemo() {
  const [visible, setVisible] = useState(false);
  const events = [
    { time: '9:00', title: 'Standup', color: blueColors.blue60 },
    { time: '11:00', title: 'Design Review', color: purpleColors.purple60 },
    { time: '2:00', title: 'Client Call', color: greenColors.green50 },
    { time: '4:00', title: 'Sprint Planning', color: tealColors.teal50 },
  ];
  
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineLine} />
      {events.map((event, i) => (
        <div 
          key={i}
          className={`${styles.timelineItem} ${visible ? styles.visible : ''}`}
          style={{ transitionDelay: `${i * 150}ms` }}
        >
          <div className={styles.timelineDot} style={{ backgroundColor: event.color }} />
          <div className={styles.timelineContent}>
            <span className={styles.timelineTime}>{event.time}</span>
            <span className={styles.timelineTitle}>{event.title}</span>
          </div>
        </div>
      ))}
      <button className={styles.resetBtn} onClick={() => { setVisible(false); setTimeout(() => setVisible(true), 100); }}>
        <Renew size={14} /> Reset
      </button>
    </div>
  );
}

// Stats Demo
function StatsDemo() {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    setAnimated(true);
  }, []);
  
  return (
    <div className={styles.statsDemo}>
      <StatCard label="Meetings Today" value={8} animated={animated} />
      <StatCard label="Hours Scheduled" value={6.5} decimals={1} animated={animated} />
      <StatCard label="Attendees" value={24} animated={animated} />
      <button className={styles.resetBtn} onClick={() => { setAnimated(false); setTimeout(() => setAnimated(true), 50); }}>
        <Renew size={14} /> Reset
      </button>
    </div>
  );
}

function StatCard({ label, value, decimals = 0, animated }: { label: string; value: number; decimals?: number; animated: boolean }) {
  const [display, setDisplay] = useState(0);
  
  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(interval);
        } else {
          setDisplay(current);
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    } else {
      setDisplay(0);
    }
  }, [animated, value]);
  
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue}>{display.toFixed(decimals)}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// Scroll Reveal Demo
function ScrollRevealDemo() {
  const items = [
    { title: 'Fade Up', animation: 'fadeUp' },
    { title: 'Fade Left', animation: 'fadeLeft' },
    { title: 'Fade Right', animation: 'fadeRight' },
    { title: 'Scale In', animation: 'scaleIn' },
  ];
  
  return (
    <div className={styles.scrollReveal}>
      <p className={styles.scrollHint}>Scroll down to reveal elements</p>
      <div className={styles.scrollItems}>
        {items.map((item, i) => (
          <ScrollRevealItem key={i} animation={item.animation}>
            <div className={styles.scrollCard}>
              <h4>{item.title}</h4>
              <p>This element animates into view when scrolled.</p>
            </div>
          </ScrollRevealItem>
        ))}
      </div>
    </div>
  );
}

function ScrollRevealItem({ children, animation }: { children: React.ReactNode; animation: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`${styles.scrollItem} ${styles[animation]} ${isVisible ? styles.visible : ''}`}
    >
      {children}
    </div>
  );
}

// =============================================================================
// CADENCE CALENDAR BLOCK SYSTEM COMPONENTS
// =============================================================================

// Identity colors for different clients/workstreams
const cadenceIdentityColors = {
  client1: { hue: '#0f62fe', name: 'Acme Corp' },      // Blue
  client2: { hue: '#8a3ffc', name: 'TechStart' },      // Purple
  client3: { hue: '#009d9a', name: 'Global Finance' }, // Teal
  client4: { hue: '#198038', name: 'HealthPlus' },     // Green
  client5: { hue: '#a56eff', name: 'Creative Labs' },  // Violet
  client6: { hue: '#0072c3', name: 'DataSync' },       // Cyan
};

// CadenceBlock Types
type CadenceCommitment = 'confirmed' | 'ai_draft' | 'tentative' | 'changed' | 'in_progress' | 'completed' | 'canceled';
type CadenceRisk = 'none' | 'watch' | 'breach';
type CadenceDefense = 'bookable' | 'defended';
type CadencePersistence = 'synced' | 'sync_pending' | 'sync_error';
type CadenceProvenance = 'ai' | 'email' | 'slack' | 'user' | 'imported';

interface CadenceBlockProps {
  title: string;
  time?: string;
  client?: string;
  identityHue: string;
  commitment: CadenceCommitment;
  risk?: CadenceRisk;
  defense?: CadenceDefense;
  persistence?: CadencePersistence;
  provenance?: CadenceProvenance;
  compact?: boolean;
  multiDay?: boolean;
}

// Provenance Badge Component
function CadenceBlockBadge({ type }: { type: CadenceProvenance | 'syncing' | 'not_saved' | 'moved' | 'tentative' }) {
  const badgeConfig: Record<string, { label: string; color: string; bg: string }> = {
    ai: { label: 'AI', color: '#ffffff', bg: '#8a3ffc' },
    email: { label: 'Email', color: '#ffffff', bg: '#0072c3' },
    slack: { label: 'Slack', color: '#ffffff', bg: '#4a154b' },
    user: { label: 'User', color: '#161616', bg: '#f4f4f4' },
    imported: { label: 'Imported', color: '#ffffff', bg: '#525252' },
    syncing: { label: 'Syncing…', color: '#161616', bg: '#f4f4f4' },
    not_saved: { label: 'Not saved', color: '#ffffff', bg: '#da1e28' },
    moved: { label: 'Moved', color: '#161616', bg: '#f4f4f4' },
    tentative: { label: 'Tentative', color: '#161616', bg: '#f4f4f4' },
  };
  
  const config = badgeConfig[type];
  
  return (
    <span 
      className={styles.cadenceBadge}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

// Status Glyph Component
function CadenceBlockStatusGlyph({ type }: { type: 'lock' | 'spinner' | 'error' | 'check' }) {
  const glyphContent: Record<string, React.ReactNode> = {
    lock: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12 7V5c0-2.206-1.794-4-4-4S4 2.794 4 5v2H2v9h12V7h-2zm-6-2c0-1.103.897-2 2-2s2 .897 2 2v2H6V5zm6 9H4V9h8v5z"/>
      </svg>
    ),
    spinner: (
      <div className={styles.cadenceSpinner} />
    ),
    error: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm2.7 10.5L4.5 5.3l.8-.8 6.2 6.2-.8.8z"/>
      </svg>
    ),
    check: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.5 12.5l-4-4 1-1 3 3 6.5-6.5 1 1z"/>
      </svg>
    ),
  };
  
  return (
    <span className={styles.cadenceGlyph}>
      {glyphContent[type]}
    </span>
  );
}

// Main CadenceBlock Component
function CadenceBlock({ 
  title, 
  time, 
  client, 
  identityHue, 
  commitment, 
  risk = 'none', 
  defense = 'bookable',
  persistence = 'synced',
  provenance,
  compact = false,
  multiDay = false,
}: CadenceBlockProps) {
  // Determine visual styles based on state
  const getBlockStyles = () => {
    let fillAlpha = 'med';
    let borderStyle = 'solid';
    let borderWidth = 1;
    let borderAlpha = 'low';
    let borderColor = identityHue;
    let railMuted = false;
    let fillColor = identityHue;
    
    // Priority: sync_error > risk_breach > risk_watch > in_progress > canceled > ai_draft > changed > completed > confirmed
    if (persistence === 'sync_error') {
      borderStyle = 'solid';
      borderWidth = 2;
      borderColor = '#da1e28'; // Risk hue
      fillAlpha = 'low';
      fillColor = '#8d8d8d'; // Neutral
    } else if (risk === 'breach') {
      borderStyle = 'solid';
      borderWidth = 2;
      borderColor = '#da1e28';
    } else if (risk === 'watch') {
      borderStyle = 'dashed';
      borderWidth = 2;
      borderColor = '#ff832b'; // Warning
    } else if (commitment === 'in_progress') {
      fillAlpha = 'high';
      borderWidth = 2;
      borderAlpha = 'high';
    } else if (commitment === 'canceled') {
      fillAlpha = 'low';
      fillColor = '#8d8d8d';
      borderStyle = 'dashed';
      borderColor = '#8d8d8d';
      railMuted = true;
    } else if (commitment === 'ai_draft') {
      fillAlpha = 'low';
      borderStyle = 'dotted';
      borderAlpha = 'med';
      railMuted = true;
    } else if (commitment === 'changed') {
      fillAlpha = 'low';
      borderStyle = 'dotted';
      borderAlpha = 'high';
    } else if (commitment === 'completed') {
      fillAlpha = 'low';
      fillColor = '#8d8d8d';
      borderColor = '#8d8d8d';
      borderAlpha = 'low';
      railMuted = true;
    } else if (commitment === 'tentative') {
      fillAlpha = 'low';
      borderStyle = 'dashed';
      borderAlpha = 'med';
    }
    
    // Fill alpha values
    const alphaValues = { low: 0.1, med: 0.2, high: 0.35 };
    const borderAlphaValues = { low: 0.3, med: 0.6, high: 1 };
    
    return {
      fillColor: fillColor,
      fillAlpha: alphaValues[fillAlpha as keyof typeof alphaValues],
      borderStyle,
      borderWidth,
      borderColor,
      borderAlpha: borderAlphaValues[borderAlpha as keyof typeof borderAlphaValues],
      railMuted,
    };
  };
  
  const blockStyles = getBlockStyles();
  
  // Build badge list
  const badges: Array<CadenceProvenance | 'syncing' | 'not_saved' | 'moved' | 'tentative'> = [];
  if (provenance) badges.push(provenance);
  if (persistence === 'sync_pending') badges.push('syncing');
  if (persistence === 'sync_error') badges.push('not_saved');
  if (commitment === 'changed') badges.push('moved');
  if (commitment === 'tentative') badges.push('tentative');
  
  // Build glyph list
  const glyphs: Array<'lock' | 'spinner' | 'error' | 'check'> = [];
  if (defense === 'defended') glyphs.push('lock');
  if (persistence === 'sync_pending') glyphs.push('spinner');
  if (persistence === 'sync_error') glyphs.push('error');
  if (commitment === 'completed') glyphs.push('check');
  
  return (
    <div 
      className={`${styles.cadenceBlock} ${compact ? styles.cadenceBlockCompact : ''} ${multiDay ? styles.cadenceBlockMultiDay : ''}`}
      style={{
        '--cadence-identity-hue': identityHue,
        '--cadence-fill-color': blockStyles.fillColor,
        '--cadence-fill-alpha': blockStyles.fillAlpha,
        '--cadence-border-style': blockStyles.borderStyle,
        '--cadence-border-width': `${blockStyles.borderWidth}px`,
        '--cadence-border-color': blockStyles.borderColor,
        '--cadence-border-alpha': blockStyles.borderAlpha,
        '--cadence-rail-opacity': blockStyles.railMuted ? 0.4 : 1,
      } as React.CSSProperties}
    >
      {/* Identity Rail (left) */}
      <div className={styles.cadenceIdentityRail} />
      
      {/* Block Content */}
      <div className={styles.cadenceBlockContent}>
        <div className={styles.cadenceBlockHeader}>
          <span className={styles.cadenceBlockTitle}>{title}</span>
          <div className={styles.cadenceBlockGlyphs}>
            {glyphs.map((glyph, i) => (
              <CadenceBlockStatusGlyph key={i} type={glyph} />
            ))}
          </div>
        </div>
        
        {!compact && (
          <div className={styles.cadenceBlockMeta}>
            {time && <span className={styles.cadenceBlockTime}>{time}</span>}
            {client && <span className={styles.cadenceBlockClient}>{client}</span>}
          </div>
        )}
        
        {badges.length > 0 && (
          <div className={styles.cadenceBlockBadges}>
            {badges.map((badge, i) => (
              <CadenceBlockBadge key={i} type={badge} />
            ))}
          </div>
        )}
      </div>
      
      {/* Risk Rail (right) - only show if risk is present */}
      {risk !== 'none' && (
        <div 
          className={`${styles.cadenceRiskRail} ${risk === 'breach' ? styles.cadenceRiskBreach : styles.cadenceRiskWatch}`}
        />
      )}
    </div>
  );
}

// Demo: All Commitment States
function CadenceCommitmentStatesDemo() {
  return (
    <div className={styles.cadenceStatesGrid}>
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="Confirmed Meeting"
          time="10:00 AM - 11:00 AM"
          client="Acme Corp"
          identityHue={cadenceIdentityColors.client1.hue}
          commitment="confirmed"
        />
        <span className={styles.cadenceStateLabel}>Confirmed</span>
      </div>
      
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="AI Suggested Block"
          time="2:00 PM - 3:00 PM"
          client="TechStart"
          identityHue={cadenceIdentityColors.client2.hue}
          commitment="ai_draft"
          provenance="ai"
        />
        <span className={styles.cadenceStateLabel}>AI Draft</span>
      </div>
      
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="Soft Hold"
          time="11:30 AM - 12:00 PM"
          client="Global Finance"
          identityHue={cadenceIdentityColors.client3.hue}
          commitment="tentative"
        />
        <span className={styles.cadenceStateLabel}>Tentative</span>
      </div>
      
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="Replanned Session"
          time="4:00 PM - 5:00 PM"
          client="HealthPlus"
          identityHue={cadenceIdentityColors.client4.hue}
          commitment="changed"
        />
        <span className={styles.cadenceStateLabel}>Changed</span>
      </div>
      
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="Current Meeting"
          time="NOW"
          client="Creative Labs"
          identityHue={cadenceIdentityColors.client5.hue}
          commitment="in_progress"
        />
        <span className={styles.cadenceStateLabel}>In Progress</span>
      </div>
      
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="Finished Review"
          time="9:00 AM - 9:30 AM"
          client="DataSync"
          identityHue={cadenceIdentityColors.client6.hue}
          commitment="completed"
        />
        <span className={styles.cadenceStateLabel}>Completed</span>
      </div>
      
      <div className={styles.cadenceStateItem}>
        <CadenceBlock 
          title="Canceled Call"
          time="3:00 PM - 3:30 PM"
          client="Acme Corp"
          identityHue={cadenceIdentityColors.client1.hue}
          commitment="canceled"
        />
        <span className={styles.cadenceStateLabel}>Canceled</span>
      </div>
    </div>
  );
}

// Demo: Risk States
function CadenceRiskStatesDemo() {
  return (
    <div className={styles.cadenceRiskGrid}>
      <div className={styles.cadenceRiskItem}>
        <CadenceBlock 
          title="On Track"
          time="10:00 AM - 11:00 AM"
          client="TechStart"
          identityHue={cadenceIdentityColors.client2.hue}
          commitment="confirmed"
          risk="none"
        />
        <span className={styles.cadenceStateLabel}>No Risk</span>
      </div>
      
      <div className={styles.cadenceRiskItem}>
        <CadenceBlock 
          title="At Risk Deadline"
          time="2:00 PM - 3:00 PM"
          client="Global Finance"
          identityHue={cadenceIdentityColors.client3.hue}
          commitment="confirmed"
          risk="watch"
        />
        <span className={styles.cadenceStateLabel}>Risk Watch</span>
      </div>
      
      <div className={styles.cadenceRiskItem}>
        <CadenceBlock 
          title="Overdue Task"
          time="Yesterday"
          client="HealthPlus"
          identityHue={cadenceIdentityColors.client4.hue}
          commitment="confirmed"
          risk="breach"
        />
        <span className={styles.cadenceStateLabel}>Risk Breach</span>
      </div>
    </div>
  );
}

// Demo: Defense/Bookability States
function CadenceDefenseStatesDemo() {
  return (
    <div className={styles.cadenceDefenseGrid}>
      <div className={styles.cadenceDefenseItem}>
        <CadenceBlock 
          title="Open Slot"
          time="1:00 PM - 2:00 PM"
          client="Creative Labs"
          identityHue={cadenceIdentityColors.client5.hue}
          commitment="confirmed"
          defense="bookable"
        />
        <span className={styles.cadenceStateLabel}>Bookable</span>
      </div>
      
      <div className={styles.cadenceDefenseItem}>
        <CadenceBlock 
          title="Protected Time"
          time="12:00 PM - 1:00 PM"
          client="Personal"
          identityHue={cadenceIdentityColors.client6.hue}
          commitment="confirmed"
          defense="defended"
        />
        <span className={styles.cadenceStateLabel}>Defended</span>
      </div>
    </div>
  );
}

// Demo: Persistence States
function CadencePersistenceStatesDemo() {
  return (
    <div className={styles.cadencePersistenceGrid}>
      <div className={styles.cadencePersistenceItem}>
        <CadenceBlock 
          title="Saved Event"
          time="9:00 AM - 10:00 AM"
          client="Acme Corp"
          identityHue={cadenceIdentityColors.client1.hue}
          commitment="confirmed"
          persistence="synced"
        />
        <span className={styles.cadenceStateLabel}>Synced</span>
      </div>
      
      <div className={styles.cadencePersistenceItem}>
        <CadenceBlock 
          title="Saving Changes"
          time="11:00 AM - 12:00 PM"
          client="TechStart"
          identityHue={cadenceIdentityColors.client2.hue}
          commitment="confirmed"
          persistence="sync_pending"
        />
        <span className={styles.cadenceStateLabel}>Sync Pending</span>
      </div>
      
      <div className={styles.cadencePersistenceItem}>
        <CadenceBlock 
          title="Failed to Save"
          time="3:00 PM - 4:00 PM"
          client="Global Finance"
          identityHue={cadenceIdentityColors.client3.hue}
          commitment="confirmed"
          persistence="sync_error"
        />
        <span className={styles.cadenceStateLabel}>Sync Error</span>
      </div>
    </div>
  );
}

// Demo: Provenance Badges
function CadenceProvenanceBadgesDemo() {
  return (
    <div className={styles.cadenceProvenanceGrid}>
      <div className={styles.cadenceProvenanceItem}>
        <CadenceBlock 
          title="AI Suggested"
          time="10:00 AM"
          identityHue={cadenceIdentityColors.client1.hue}
          commitment="ai_draft"
          provenance="ai"
          compact
        />
        <span className={styles.cadenceStateLabel}>AI Source</span>
      </div>
      
      <div className={styles.cadenceProvenanceItem}>
        <CadenceBlock 
          title="From Email"
          time="11:00 AM"
          identityHue={cadenceIdentityColors.client2.hue}
          commitment="confirmed"
          provenance="email"
          compact
        />
        <span className={styles.cadenceStateLabel}>Email Source</span>
      </div>
      
      <div className={styles.cadenceProvenanceItem}>
        <CadenceBlock 
          title="Slack Thread"
          time="2:00 PM"
          identityHue={cadenceIdentityColors.client3.hue}
          commitment="confirmed"
          provenance="slack"
          compact
        />
        <span className={styles.cadenceStateLabel}>Slack Source</span>
      </div>
      
      <div className={styles.cadenceProvenanceItem}>
        <CadenceBlock 
          title="Manual Entry"
          time="3:00 PM"
          identityHue={cadenceIdentityColors.client4.hue}
          commitment="confirmed"
          provenance="user"
          compact
        />
        <span className={styles.cadenceStateLabel}>User Created</span>
      </div>
      
      <div className={styles.cadenceProvenanceItem}>
        <CadenceBlock 
          title="Imported Event"
          time="4:00 PM"
          identityHue={cadenceIdentityColors.client5.hue}
          commitment="confirmed"
          provenance="imported"
          compact
        />
        <span className={styles.cadenceStateLabel}>Imported</span>
      </div>
    </div>
  );
}

// Demo: Block Variants
function CadenceBlockVariantsDemo() {
  return (
    <div className={styles.cadenceVariantsGrid}>
      <div className={styles.cadenceVariantItem}>
        <h4>Standard Block</h4>
        <CadenceBlock 
          title="Project Review"
          time="10:00 AM - 11:30 AM"
          client="Acme Corp"
          identityHue={cadenceIdentityColors.client1.hue}
          commitment="confirmed"
        />
      </div>
      
      <div className={styles.cadenceVariantItem}>
        <h4>Compact Block</h4>
        <CadenceBlock 
          title="Quick Sync"
          time="2:00 PM"
          identityHue={cadenceIdentityColors.client2.hue}
          commitment="confirmed"
          compact
        />
      </div>
      
      <div className={styles.cadenceVariantItem}>
        <h4>Multi-Day Block</h4>
        <CadenceBlock 
          title="Design Sprint"
          time="Mon - Wed"
          client="Creative Labs"
          identityHue={cadenceIdentityColors.client5.hue}
          commitment="confirmed"
          multiDay
        />
      </div>
    </div>
  );
}

// Demo: Combined States (Complex Scenarios)
function CadenceCombinedStatesDemo() {
  return (
    <div className={styles.cadenceCombinedGrid}>
      <div className={styles.cadenceCombinedItem}>
        <CadenceBlock 
          title="AI Draft At Risk"
          time="Tomorrow 2:00 PM"
          client="Global Finance"
          identityHue={cadenceIdentityColors.client3.hue}
          commitment="ai_draft"
          risk="watch"
          provenance="ai"
        />
        <p className={styles.cadenceCombinedDesc}>AI-suggested meeting with deadline pressure</p>
      </div>
      
      <div className={styles.cadenceCombinedItem}>
        <CadenceBlock 
          title="Defended Focus Time"
          time="9:00 AM - 12:00 PM"
          client="Personal"
          identityHue={cadenceIdentityColors.client6.hue}
          commitment="confirmed"
          defense="defended"
          provenance="user"
        />
        <p className={styles.cadenceCombinedDesc}>Protected block, cannot be overwritten</p>
      </div>
      
      <div className={styles.cadenceCombinedItem}>
        <CadenceBlock 
          title="Syncing Overdue"
          time="Yesterday"
          client="HealthPlus"
          identityHue={cadenceIdentityColors.client4.hue}
          commitment="confirmed"
          risk="breach"
          persistence="sync_pending"
        />
        <p className={styles.cadenceCombinedDesc}>Breach state with sync in progress</p>
      </div>
    </div>
  );
}

// Interactive Day View Demo
function CadenceDayViewDemo() {
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  const events = [
    { slot: 1, duration: 1, title: 'Standup', client: 'Team', hue: cadenceIdentityColors.client1.hue, commitment: 'completed' as CadenceCommitment },
    { slot: 2, duration: 2, title: 'Project Review', client: 'Acme Corp', hue: cadenceIdentityColors.client1.hue, commitment: 'in_progress' as CadenceCommitment },
    { slot: 5, duration: 1, title: 'Lunch', client: 'Personal', hue: cadenceIdentityColors.client6.hue, commitment: 'confirmed' as CadenceCommitment, defense: 'defended' as CadenceDefense },
    { slot: 6, duration: 1, title: 'AI Suggested', client: 'TechStart', hue: cadenceIdentityColors.client2.hue, commitment: 'ai_draft' as CadenceCommitment, provenance: 'ai' as CadenceProvenance },
    { slot: 7, duration: 2, title: 'Client Call', client: 'Global Finance', hue: cadenceIdentityColors.client3.hue, commitment: 'confirmed' as CadenceCommitment, risk: 'watch' as CadenceRisk },
  ];
  
  return (
    <div className={styles.cadenceDayView}>
      <div className={styles.cadenceDayHeader}>
        <h4>Today - January 31, 2026</h4>
      </div>
      <div className={styles.cadenceDayGrid}>
        {timeSlots.map((time, index) => {
          const event = events.find(e => e.slot === index);
          return (
            <div key={index} className={styles.cadenceDaySlot}>
              <span className={styles.cadenceDayTime}>{time}</span>
              <div className={styles.cadenceDayContent}>
                {event && (
                  <div style={{ gridRow: `span ${event.duration}` }}>
                    <CadenceBlock
                      title={event.title}
                      client={event.client}
                      identityHue={event.hue}
                      commitment={event.commitment}
                      risk={event.risk}
                      defense={event.defense}
                      provenance={event.provenance}
                      compact
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Token Reference Table
function CadenceTokenTable() {
  const tokens = [
    { namespace: 'cadence.identity.hue', description: 'Runtime-resolved client/workstream color', example: '#0f62fe' },
    { namespace: 'cadence.block.fill.alpha.low', description: 'Low opacity fill (drafts, completed)', example: '0.1' },
    { namespace: 'cadence.block.fill.alpha.med', description: 'Medium opacity fill (confirmed)', example: '0.2' },
    { namespace: 'cadence.block.fill.alpha.high', description: 'High opacity fill (in progress)', example: '0.35' },
    { namespace: 'cadence.block.border.width.1', description: 'Standard border width', example: '1px' },
    { namespace: 'cadence.block.border.width.2', description: 'Emphasized border width', example: '2px' },
    { namespace: 'cadence.block.border.style.solid', description: 'Committed state', example: 'solid' },
    { namespace: 'cadence.block.border.style.dashed', description: 'Tentative/soft hold', example: 'dashed' },
    { namespace: 'cadence.block.border.style.dotted', description: 'AI-touched/draft', example: 'dotted' },
    { namespace: 'cadence.block.rail.identity.width', description: 'Identity rail width', example: '4px' },
    { namespace: 'cadence.block.rail.risk.width', description: 'Risk rail width', example: '4px' },
    { namespace: 'cadence.risk.hue', description: 'System warning/error hue', example: '#da1e28' },
    { namespace: 'cadence.neutral.fill.alpha.low', description: 'Inactive/history fill', example: '0.1' },
  ];
  
  return (
    <div className={styles.cadenceTokenTable}>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={i}>
              <td><code>{token.namespace}</code></td>
              <td>{token.description}</td>
              <td><code>{token.example}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Priority Rules Reference
function CadencePriorityRules() {
  const rules = [
    { priority: 1, state: 'sync_error', visual: 'Solid + width.2 risk hue + error glyph' },
    { priority: 2, state: 'risk_breach', visual: 'Solid + width.2 risk hue + risk rail (breach)' },
    { priority: 3, state: 'risk_watch', visual: 'Dashed + width.2 warning hue + risk rail (watch)' },
    { priority: 4, state: 'in_progress', visual: 'Solid + width.2 + alpha.high fill' },
    { priority: 5, state: 'canceled', visual: 'Dashed neutral + muted rail' },
    { priority: 6, state: 'ai_draft', visual: 'Dotted + alpha.low + AI badge' },
    { priority: 7, state: 'changed', visual: 'Dotted + alpha.high + Moved badge' },
    { priority: 8, state: 'completed', visual: 'Neutral + alpha.low + check glyph' },
    { priority: 9, state: 'confirmed', visual: 'Solid/none + alpha.med (baseline)' },
  ];
  
  return (
    <div className={styles.cadencePriorityTable}>
      <table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>State</th>
            <th>Visual Treatment</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.priority}>
              <td className={styles.cadencePriorityNum}>{rule.priority}</td>
              <td><code>{rule.state}</code></td>
              <td>{rule.visual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Visual Cheat Sheet
function CadenceCheatSheet() {
  return (
    <div className={styles.cadenceCheatSheet}>
      <div className={styles.cadenceCheatItem}>
        <div className={styles.cadenceCheatVisual}>
          <div className={styles.cadenceCheatBorder} style={{ borderStyle: 'solid' }} />
        </div>
        <div className={styles.cadenceCheatInfo}>
          <strong>Solid Border</strong>
          <span>Committed / Confirmed</span>
        </div>
      </div>
      
      <div className={styles.cadenceCheatItem}>
        <div className={styles.cadenceCheatVisual}>
          <div className={styles.cadenceCheatBorder} style={{ borderStyle: 'dashed' }} />
        </div>
        <div className={styles.cadenceCheatInfo}>
          <strong>Dashed Border</strong>
          <span>Tentative / Soft Hold</span>
        </div>
      </div>
      
      <div className={styles.cadenceCheatItem}>
        <div className={styles.cadenceCheatVisual}>
          <div className={styles.cadenceCheatBorder} style={{ borderStyle: 'dotted' }} />
        </div>
        <div className={styles.cadenceCheatInfo}>
          <strong>Dotted Border</strong>
          <span>AI-Suggested / Draft</span>
        </div>
      </div>
      
      <div className={styles.cadenceCheatItem}>
        <div className={styles.cadenceCheatVisual}>
          <div className={styles.cadenceCheatRail} style={{ backgroundColor: '#0f62fe' }} />
        </div>
        <div className={styles.cadenceCheatInfo}>
          <strong>Left Rail</strong>
          <span>Identity (Client/Workstream)</span>
        </div>
      </div>
      
      <div className={styles.cadenceCheatItem}>
        <div className={styles.cadenceCheatVisual}>
          <div className={styles.cadenceCheatRail} style={{ backgroundColor: '#da1e28' }} />
        </div>
        <div className={styles.cadenceCheatInfo}>
          <strong>Right Rail</strong>
          <span>Risk / Liability Pressure</span>
        </div>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.styleguide}>
      {/* Sticky Header + Navigation */}
      <div className={styles.stickyHeader}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.title}>Cadence Design System</h1>
            <p className={styles.subtitle}>
              Based on IBM Carbon v11 • Custom brand colors (Lumen & Terra) • Inter × Lora × Roboto Mono
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <div className={styles.container}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={styles.navButton}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.tabContent}>
                  {/* Cadence Brand Colors Section */}
                  <section id="brand-colors" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cadence Brand Colors</h2>
                    <p className={styles.sectionDescription}>
                      Custom brand color families built on IBM Carbon's foundation. Lumen (AI accent) and Terra (Human origin) 
                      encode Cadence's core tension: AI-scheduled work versus human-originated disruptions.
                    </p>
                    
                    <div className={styles.brandColorIntro}>
                      <Tile className={styles.brandColorCard}>
                        <div className={styles.brandColorHeader} style={{ backgroundColor: lumenColors.lumen60 }}>
                          <span style={{ color: '#ffffff', fontWeight: 600 }}>Lumen</span>
                          <span style={{ color: 'rgba(255,255,255,0.8)' }}>#3336FF at grade 60</span>
                        </div>
                        <div className={styles.brandColorBody}>
                          <p className={styles.brandColorRole}>AI Brand Accent</p>
                          <p className={styles.brandColorUsage}>
                            AI-generated suggestions, confidence badges, reasoning chips, ripple previews.
                            Applied sparingly as a quiet signal that says "the system sees something you should know."
                          </p>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.brandColorCard}>
                        <div className={styles.brandColorHeader} style={{ backgroundColor: terraColors.terra50 }}>
                          <span style={{ color: '#ffffff', fontWeight: 600 }}>Terra</span>
                          <span style={{ color: 'rgba(255,255,255,0.8)' }}>#C27A5A at grade 50</span>
                        </div>
                        <div className={styles.brandColorBody}>
                          <p className={styles.brandColorRole}>Human Origin</p>
                          <p className={styles.brandColorUsage}>
                            Calendar events, client meetings, inbound requests. When users see Terra in their schedule, 
                            it means a person is asking for their time—not that something is wrong.
                          </p>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.brandColorCard}>
                        <div className={styles.brandColorHeader} style={{ background: 'linear-gradient(90deg, #000000 50%, #ffffff 50%)', border: '1px solid #e0e0e0' }}>
                          <span style={{ color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Black & White</span>
                        </div>
                        <div className={styles.brandColorBody}>
                          <p className={styles.brandColorRole}>CTAs & Primary Actions</p>
                          <p className={styles.brandColorUsage}>
                            Maximum accessibility, credibility, and professional restraint. 
                            All primary buttons and calls-to-action use Black/White only.
                          </p>
                        </div>
                      </Tile>
                    </div>
                    
                    <ColorPalette title="Lumen (AI Accent)" colors={lumenColors} />
                    <ColorPalette title="Terra (Human Origin)" colors={terraColors} lightTextThreshold={60} />
                  </section>

                  {/* Core Color Palettes Section */}
                  <section id="colors" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Core Color Palettes</h2>
                    <p className={styles.sectionDescription}>
                      Carbon base color scales. Each scale ranges from 10 (lightest) to 100 (darkest). 
                      Black text is WCAG AA accessible on grades 10-50; white text on grades 60-100.
                    </p>
                    
                    <ColorPalette title="Blue (Interactive)" colors={blueColors} />
                    <ColorPalette title="Gray (Neutral)" colors={grayColors} />
                    <ColorPalette title="Cool Gray" colors={coolGrayColors} />
                    <ColorPalette title="Warm Gray" colors={warmGrayColors} />
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Extended Color Palettes</h2>
                    <p className={styles.sectionDescription}>
                      Additional color scales for accents, highlights, and visual variety.
                    </p>
                    
                    <ColorPalette title="Purple" colors={purpleColors} />
                    <ColorPalette title="Cyan" colors={cyanColors} />
                    <ColorPalette title="Teal" colors={tealColors} />
                    <ColorPalette title="Green" colors={greenColors} />
                    <ColorPalette title="Red" colors={redColors} />
                    <ColorPalette title="Orange" colors={orangeColors} />
                    <ColorPalette title="Yellow" colors={yellowColors} lightTextThreshold={60} />
                    <ColorPalette title="Magenta" colors={magentaColors} />
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Semantic Colors</h2>
                    <p className={styles.sectionDescription}>
                      Purpose-specific colors for feedback, status, and interaction states.
                    </p>
                    
                    <ColorPalette title="Support / Status Colors" colors={supportColors} lightTextThreshold={1} />
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>UI Colors</h2>
                    <p className={styles.sectionDescription}>
                      Contextual colors for backgrounds, layers, text, borders, and interactive elements.
                    </p>
                    
                    <h3 className={styles.paletteTitle}>Background Colors</h3>
                    <div className={styles.colorGrid}>
                      {(Object.entries(backgroundColors) as [string, string][]).map(([name, value]) => (
                        <ColorSwatch 
                          key={name} 
                          name={name} 
                          value={value} 
                          textColor={value.includes('rgba') || value === '#ffffff' ? '#161616' : '#ffffff'}
                        />
                      ))}
                    </div>

                    <h3 className={styles.paletteTitle}>Layer Colors</h3>
                    <div className={styles.colorGrid}>
                      {(Object.entries(layerColors) as [string, string][]).map(([name, value]) => (
                        <ColorSwatch key={name} name={name} value={value} textColor="#161616" />
                      ))}
                    </div>

                    <h3 className={styles.paletteTitle}>Text Colors</h3>
                    <div className={styles.colorGrid}>
                      {(Object.entries(textColors) as [string, string][]).map(([name, value]) => (
                        <ColorSwatch 
                          key={name} 
                          name={name} 
                          value={value}
                          textColor={value === '#ffffff' || value.includes('rgba') ? '#161616' : '#ffffff'}
                        />
                      ))}
                    </div>

                    <h3 className={styles.paletteTitle}>Link Colors</h3>
                    <div className={styles.colorGrid}>
                      {(Object.entries(linkColors) as [string, string][]).map(([name, value]) => (
                        <ColorSwatch key={name} name={name} value={value} textColor="#ffffff" />
                      ))}
                    </div>

                    <h3 className={styles.paletteTitle}>Border Colors</h3>
                    <div className={styles.colorGrid}>
                      {(Object.entries(borderColors) as [string, string][]).map(([name, value]) => (
                        <ColorSwatch 
                          key={name} 
                          name={name} 
                          value={value}
                          textColor={value.includes('rgba') || value.startsWith('#e') || value.startsWith('#c') || value.startsWith('#8') ? '#161616' : '#ffffff'}
                        />
                      ))}
                    </div>
                  </section>
                  {/* Typography Section */}
                  <section id="typography" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cadence Typeface System</h2>
                    <p className={styles.sectionDescription}>
                      <strong>Serif = Breathing Room. Sans = Working Room. Mono = Precision Data.</strong><br/>
                      Three typefaces, each selected for a specific functional role. Inter handles ~90% of UI text, 
                      Lora creates cognitive pauses at key moments (3-5%), and Roboto Mono ensures numerical precision.
                    </p>
                    
                    <div className={styles.fontFamilies}>
                      <Tile className={styles.fontFamilySample}>
                        <div className={styles.fontRoleHeader}>
                          <Tag type="blue" size="sm">Sans-Serif Workhorse</Tag>
                          <span className={styles.fontUsagePercent}>~90% of UI</span>
                        </div>
                        <p style={{ fontFamily: fontFamilies.sans, fontSize: '1.5rem' }} className={styles.fontPreview}>
                          Inter - The quick brown fox jumps over the lazy dog
                        </p>
                        <p className={styles.fontUsage}>
                          Task execution, data scanning, form interaction, schedule management. 
                          High x-height, excellent at 11-14px, open apertures for small-size legibility.
                        </p>
                        <code className={styles.fontCode}>{fontFamilies.sans}</code>
                      </Tile>
                      
                      <Tile className={styles.fontFamilySample}>
                        <div className={styles.fontRoleHeader}>
                          <Tag type="purple" size="sm">Serif Accent</Tag>
                          <span className={styles.fontUsagePercent}>3-5% of UI</span>
                        </div>
                        <p style={{ fontFamily: fontFamilies.serif, fontSize: '1.5rem' }} className={styles.fontPreview}>
                          Lora - The quick brown fox jumps over the lazy dog
                        </p>
                        <p className={styles.fontUsage}>
                          Breathing room moments: Morning Briefing header, Tradeoff Card headlines, 
                          empty states, AI confidence basis. Creates cognitive pause and advisory tone.
                        </p>
                        <code className={styles.fontCode}>{fontFamilies.serif}</code>
                      </Tile>
                      
                      <Tile className={styles.fontFamilySample}>
                        <div className={styles.fontRoleHeader}>
                          <Tag type="teal" size="sm">Monospace Precision</Tag>
                          <span className={styles.fontUsagePercent}>Data values</span>
                        </div>
                        <p style={{ fontFamily: fontFamilies.mono, fontSize: '1.5rem' }} className={styles.fontPreview}>
                          Roboto Mono - $127,500.00 • 6.5/8h • 14:30
                        </p>
                        <p className={styles.fontUsage}>
                          Dollar amounts, penalty figures, time durations, countdowns. 
                          Tabular figures enable instant scanning of financial data.
                        </p>
                        <code className={styles.fontCode}>{fontFamilies.mono}</code>
                      </Tile>
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Font Weights</h2>
                    <div className={styles.fontWeights}>
                      {(Object.entries(fontWeights) as [string, number][]).map(([name, value]) => (
                        <Tile key={name} className={styles.fontWeightSample}>
                          <p style={{ fontWeight: value, fontSize: '1.5rem' }}>
                            {name} ({value})
                          </p>
                        </Tile>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Font Sizes</h2>
                    <p className={styles.sectionDescription}>
                      A comprehensive type scale for all text sizes in the design system.
                    </p>
                    
                    <div className={styles.fontSizes}>
                      {(Object.entries(fontSizes) as [string, string][])
                        .filter(([name]) => !name.includes('fluid'))
                        .map(([name, value]) => (
                          <Tile key={name} className={styles.fontSizeSample}>
                            <p style={{ fontSize: value }} className={styles.fontSizePreview}>
                              Aa
                            </p>
                            <div className={styles.fontSizeInfo}>
                              <span className={styles.fontSizeName}>{name}</span>
                              <span className={styles.fontSizeValue}>{value}</span>
                            </div>
                          </Tile>
                        ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Base Typography Styles</h2>
                    <p className={styles.sectionDescription}>
                      Pre-composed typography tokens from Carbon. Use for body text, labels, headings, and utility text.
                    </p>
                    
                    <div className={styles.typographyStyles}>
                      {(Object.entries(typography) as [string, typeof typography[keyof typeof typography]][]).map(([name, style]) => (
                        <TypographySample key={name} name={name} style={style} />
                      ))}
                    </div>
                  </section>

                  {/* Cadence Typography Section */}
                  <section id="cadence-typography" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cadence Custom Type Tokens</h2>
                    <p className={styles.sectionDescription}>
                      Custom typography tokens for AI-native capacity governance. These extend Carbon's base tokens 
                      for Cadence-specific needs: overlines, serif accents, and monospace data display.
                    </p>
                    
                    <h3 className={styles.paletteTitle}>Overline Tokens (Inter)</h3>
                    <p className={styles.tokenDescription}>
                      Category labels and structural furniture. 11px uppercase with wide letter-spacing.
                    </p>
                    <div className={styles.cadenceTokenGrid}>
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceOverline.fontFamily,
                            fontSize: cadenceTypography.cadenceOverline.fontSize,
                            fontWeight: cadenceTypography.cadenceOverline.fontWeight,
                            letterSpacing: cadenceTypography.cadenceOverline.letterSpacing,
                            textTransform: cadenceTypography.cadenceOverline.textTransform,
                            color: '#525252',
                          }}
                        >
                          ROLE • CLIENT • DEADLINE TYPE • SOURCE
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-overline</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceOverline.description}</span>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceOverlineEmphasis.fontFamily,
                            fontSize: cadenceTypography.cadenceOverlineEmphasis.fontSize,
                            fontWeight: cadenceTypography.cadenceOverlineEmphasis.fontWeight,
                            letterSpacing: cadenceTypography.cadenceOverlineEmphasis.letterSpacing,
                            textTransform: cadenceTypography.cadenceOverlineEmphasis.textTransform,
                            color: '#161616',
                          }}
                        >
                          HARD DEADLINE • AT RISK • PENALTY
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-overline-emphasis</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceOverlineEmphasis.description}</span>
                        </div>
                      </Tile>
                    </div>
                    
                    <h3 className={styles.paletteTitle}>Serif Accent Tokens (Lora)</h3>
                    <p className={styles.tokenDescription}>
                      Breathing room moments—3-5% of UI. Creates cognitive pause and advisory tone.
                    </p>
                    <div className={styles.cadenceTokenGrid}>
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceGreeting.fontFamily,
                            fontSize: cadenceTypography.cadenceGreeting.fontSize,
                            fontWeight: cadenceTypography.cadenceGreeting.fontWeight,
                            lineHeight: cadenceTypography.cadenceGreeting.lineHeight,
                          }}
                        >
                          Tuesday, April 8
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-greeting</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceGreeting.description}</span>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceConsequence.fontFamily,
                            fontSize: cadenceTypography.cadenceConsequence.fontSize,
                            fontWeight: cadenceTypography.cadenceConsequence.fontWeight,
                            lineHeight: cadenceTypography.cadenceConsequence.lineHeight,
                          }}
                        >
                          Adding Client X puts IRS Q4 Filing at risk
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-consequence</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceConsequence.description}</span>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceEmptyState.fontFamily,
                            fontSize: cadenceTypography.cadenceEmptyState.fontSize,
                            fontWeight: cadenceTypography.cadenceEmptyState.fontWeight,
                            lineHeight: cadenceTypography.cadenceEmptyState.lineHeight,
                          }}
                        >
                          Cadence is watching your email and Slack
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-empty-state</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceEmptyState.description}</span>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceAiAside.fontFamily,
                            fontSize: cadenceTypography.cadenceAiAside.fontSize,
                            fontWeight: cadenceTypography.cadenceAiAside.fontWeight,
                            fontStyle: cadenceTypography.cadenceAiAside.fontStyle,
                            lineHeight: cadenceTypography.cadenceAiAside.lineHeight,
                            color: '#525252',
                          }}
                        >
                          First time seeing this client. High confidence: 12 similar returns.
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-ai-aside</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceAiAside.description}</span>
                        </div>
                      </Tile>
                    </div>
                    
                    <h3 className={styles.paletteTitle}>Monospace Data Tokens (Roboto Mono)</h3>
                    <p className={styles.tokenDescription}>
                      Numerical precision for financial data. Tabular figures enable instant scanning.
                    </p>
                    <div className={styles.cadenceTokenGrid}>
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceMonoData.fontFamily,
                            fontSize: cadenceTypography.cadenceMonoData.fontSize,
                            fontWeight: cadenceTypography.cadenceMonoData.fontWeight,
                          }}
                        >
                          9:00 AM • 2h 30m • $1,250.00
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-mono-data</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceMonoData.description}</span>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceMonoDataLg.fontFamily,
                            fontSize: cadenceTypography.cadenceMonoDataLg.fontSize,
                            fontWeight: cadenceTypography.cadenceMonoDataLg.fontWeight,
                          }}
                        >
                          6.5 / 8h
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-mono-data-lg</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceMonoDataLg.description}</span>
                        </div>
                      </Tile>
                      
                      <Tile className={styles.cadenceTokenSample}>
                        <div 
                          className={styles.cadenceTokenPreview}
                          style={{
                            fontFamily: cadenceTypography.cadenceMonoPenalty.fontFamily,
                            fontSize: cadenceTypography.cadenceMonoPenalty.fontSize,
                            fontWeight: cadenceTypography.cadenceMonoPenalty.fontWeight,
                            color: '#DA1E28',
                          }}
                        >
                          $5,000 penalty
                        </div>
                        <div className={styles.cadenceTokenInfo}>
                          <span className={styles.cadenceTokenName}>cadence-mono-penalty</span>
                          <span className={styles.cadenceTokenDesc}>{cadenceTypography.cadenceMonoPenalty.description}</span>
                        </div>
                      </Tile>
                    </div>
                    
                    <h3 className={styles.paletteTitle}>Type Sets</h3>
                    <p className={styles.tokenDescription}>
                      Productive (~85% of UI) vs Expressive (~15% of UI) contexts.
                    </p>
                    <div className={styles.typeSetsGrid}>
                      <Tile className={styles.typeSetCard}>
                        <div className={styles.typeSetHeader}>
                          <Tag type="blue" size="sm">Productive Set</Tag>
                          <span>~85% of UI</span>
                        </div>
                        <p className={styles.typeSetBase}>Base size: 14px</p>
                        <p className={styles.typeSetDesc}>{cadenceTypeSets.productive.description}</p>
                        <div className={styles.typeSetTokens}>
                          {cadenceTypeSets.productive.tokens.map(t => (
                            <code key={t}>{t}</code>
                          ))}
                        </div>
                      </Tile>
                      
                      <Tile className={styles.typeSetCard}>
                        <div className={styles.typeSetHeader}>
                          <Tag type="purple" size="sm">Expressive Set</Tag>
                          <span>~15% of UI</span>
                        </div>
                        <p className={styles.typeSetBase}>Base size: 16px</p>
                        <p className={styles.typeSetDesc}>{cadenceTypeSets.expressive.description}</p>
                        <div className={styles.typeSetTokens}>
                          {cadenceTypeSets.expressive.tokens.map(t => (
                            <code key={t}>{t}</code>
                          ))}
                        </div>
                      </Tile>
                    </div>
                  </section>

                  {/* Custom Components Section */}
                  <section id="custom-components" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cadence Custom Components</h2>
                    <p className={styles.sectionDescription}>
                      Custom components built on IBM Carbon, following Vercel Composition Patterns.
                      White-dominant, Notion-clean surface philosophy. Terra for human origin (calendar events), 
                      Lumen for AI signals. Black/White for CTAs.
                    </p>

                    {/* Primitives */}
                    <h3 className={styles.paletteTitle}>Primitive Components</h3>
                    <p className={styles.tokenDescription}>
                      Atomic components reused across the entire interface.
                    </p>

                    {/* CadenceButton */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>CadenceButton</h4>
                      <p className={styles.componentDesc}>
                        CTAs use BLACK/WHITE only - never Lumen or Terra on buttons.
                      </p>
                      <div className={styles.componentDemo}>
                        <CadenceButton variant="primary">Primary (Black)</CadenceButton>
                        <CadenceButton variant="secondary">Secondary</CadenceButton>
                        <CadenceButton variant="ghost">Ghost</CadenceButton>
                        <CadenceButton variant="danger">Danger</CadenceButton>
                        <CadenceButton variant="ghost-danger">Ghost Danger</CadenceButton>
                      </div>
                      <div className={styles.componentDemo}>
                        <CadenceButton variant="primary" size="sm">Small</CadenceButton>
                        <CadenceButton variant="primary" size="md">Medium</CadenceButton>
                        <CadenceButton variant="primary" size="lg">Large</CadenceButton>
                        <CadenceButton variant="primary" icon={<Undo size={16} />}>With Icon</CadenceButton>
                      </div>
                    </div>

                    {/* OverlineLabel */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>OverlineLabel</h4>
                      <p className={styles.componentDesc}>
                        Category labels with Inter 11px/500, uppercase, 1px letter-spacing.
                      </p>
                      <div className={styles.componentDemo}>
                        <OverlineLabel variant="default">TODAY</OverlineLabel>
                        <OverlineLabel variant="default">CAPACITY</OverlineLabel>
                        <OverlineLabel variant="default">SOURCE</OverlineLabel>
                        <OverlineLabel variant="emphasis">NOW</OverlineLabel>
                        <OverlineLabel variant="emphasis">NEXT</OverlineLabel>
                        <OverlineLabel variant="emphasis-error">AT RISK</OverlineLabel>
                      </div>
                    </div>

                    {/* DeadlineChip */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>DeadlineChip</h4>
                      <p className={styles.componentDesc}>
                        Shows deadline proximity on task cards. Color indicates urgency.
                      </p>
                      <div className={styles.componentDemo}>
                        <DeadlineChip label="Jan 30" state="safe" />
                        <DeadlineChip label="Jan 24" state="approaching" />
                        <DeadlineChip label="Tomorrow" state="urgent" />
                        <DeadlineChip label="Overdue" state="overdue" />
                      </div>
                    </div>

                    {/* ConfidenceBadge */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>ConfidenceBadge</h4>
                      <p className={styles.componentDesc}>
                        Shows AI confidence level. Lumen for high, Yellow for medium, Gray for low.
                      </p>
                      <div className={styles.componentDemo}>
                        <ConfidenceBadge tier="high" />
                        <ConfidenceBadge tier="medium" />
                        <ConfidenceBadge tier="low" />
                        <ConfidenceBadge tier="new" />
                      </div>
                      <div className={styles.componentDemoVertical}>
                        <ConfidenceBadge 
                          tier="high" 
                          basisText="12 similar returns completed in ~2h"
                          showBasis
                        />
                      </div>
                    </div>

                    {/* MonoValue */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>MonoValue</h4>
                      <p className={styles.componentDesc}>
                        Roboto Mono for numerical/financial data. Penalty variant is ALWAYS red.
                      </p>
                      <div className={styles.componentDemo}>
                        <MonoValue>9:00 AM</MonoValue>
                        <MonoValue>2.5h</MonoValue>
                        <MonoValue variant="large">6.5/8h</MonoValue>
                        <MonoValue variant="penalty">$5,000</MonoValue>
                      </div>
                    </div>

                    {/* ReasoningChip */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>ReasoningChip</h4>
                      <p className={styles.componentDesc}>
                        Source attribution chips using Lumen palette. Shows where AI info came from.
                      </p>
                      <div className={styles.componentDemo}>
                        <ReasoningChip label="client@email.com" sourceType="email" />
                        <ReasoningChip label="#tax-team" sourceType="chat" />
                        <ReasoningChip label="Team Meeting" sourceType="calendar" />
                        <ReasoningChip label="Form 1120" sourceType="document" />
                      </div>
                    </div>

                    {/* Cards Section */}
                    <h3 className={styles.paletteTitle}>Card Components</h3>
                    <p className={styles.tokenDescription}>
                      Compound components following Vercel Composition Patterns.
                    </p>

                    {/* TaskCard */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>TaskCard</h4>
                      <p className={styles.componentDesc}>
                        Core task component. Active state uses black inverted design (signature Cadence element).
                      </p>
                      <div className={styles.componentDemoCards}>
                        <QueuedTaskCard
                          title="Prepare Q4 Tax Filing"
                          client="Acme Corp"
                          duration="2.5h"
                          deadlineLabel="Jan 24"
                          deadlineDaysUntil={5}
                          confidenceTier="high"
                          source={{ type: 'email', label: 'client@email.com' }}
                        />
                        <ActiveTaskCard
                          title="Review Financial Statements"
                          progress={65}
                          timeRemaining="45 min"
                          deadlineLabel="Today"
                          deadlineDaysUntil={0}
                        />
                        <TaskCard.Root state="completed">
                          <TaskCard.Header>
                            <TaskCard.Title>Completed Task Example</TaskCard.Title>
                          </TaskCard.Header>
                          <TaskCard.Meta>
                            <span>Marked done 2h ago</span>
                          </TaskCard.Meta>
                        </TaskCard.Root>
                        <TaskCard.Root state="blocked">
                          <TaskCard.Header>
                            <OverlineLabel variant="emphasis-error">BLOCKED</OverlineLabel>
                          </TaskCard.Header>
                          <TaskCard.Title>Blocked Task Example</TaskCard.Title>
                          <TaskCard.Meta>
                            <span>Waiting for client response</span>
                          </TaskCard.Meta>
                        </TaskCard.Root>
                      </div>
                    </div>

                    {/* MeetingCard */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>MeetingCard</h4>
                      <p className={styles.componentDesc}>
                        Calendar meetings use Terra palette - encodes "a human put this on your schedule".
                      </p>
                      <div className={styles.componentDemoCards}>
                        <MeetingCard
                          title="Team Strategy Meeting"
                          startTime="9:00 AM"
                          duration="1h"
                          subtitle="Conference Room A"
                          onDocumentClick={() => {}}
                          onMenuClick={() => {}}
                        />
                        <MeetingCard
                          title="Client Call - Acme Corp"
                          startTime="2:00 PM"
                          duration="30m"
                          state="active"
                        />
                        <MeetingCard
                          title="Conflict Meeting"
                          startTime="3:00 PM"
                          duration="1h"
                          state="conflict"
                        />
                        <MeetingCard
                          title="Past Meeting"
                          startTime="8:00 AM"
                          duration="45m"
                          state="past"
                        />
                      </div>
                    </div>

                    {/* InsightCard */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>InsightCard</h4>
                      <p className={styles.componentDesc}>
                        AI-detected risks and insights. Left border color indicates severity/type.
                      </p>
                      <div className={styles.componentDemoCards}>
                        <InsightCard
                          type="deadline-risk"
                          title='Start "Q4 Tax Filing" ASAP'
                          body="Only 2 weeks away from IRS deadline. You're 1 day behind schedule."
                          confidence={85}
                          primaryAction="Go to Task"
                          secondaryAction="View impact"
                          onDismiss={() => {}}
                        />
                        <InsightCard
                          type="ai-suggestion"
                          title="Consider rescheduling afternoon tasks"
                          body="Your morning meetings are running long. Moving tasks to tomorrow could reduce stress."
                          confidence={72}
                          primaryAction="Reshuffle schedule"
                          secondaryAction="Ignore"
                        />
                        <InsightCard
                          type="conflict-detected"
                          title="Scheduling conflict detected"
                          body="New meeting overlaps with scheduled task. Review and resolve."
                          primaryAction="View impact"
                          onDismiss={() => {}}
                        />
                      </div>
                    </div>

                    {/* UndoButton */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>UndoButton</h4>
                      <p className={styles.componentDesc}>
                        Persistent undo control. Auto-hides after 30s. One-click, no confirmation.
                      </p>
                      <div className={styles.componentDemo}>
                        <UndoButton onUndo={() => {}} autoHideAfter={0} />
                      </div>
                    </div>

                    {/* TaskProposalCard */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>TaskProposalCard</h4>
                      <p className={styles.componentDesc}>
                        AI-generated task proposal with Reject/Accept actions. Features expandable confidence chip with "View Reasoning" tooltip on hover.
                      </p>
                      <div className={styles.componentDemoCards}>
                        <TaskProposalCard
                          title="Prepare Client P&L Statement"
                          source="client@email.com"
                          confidence="high"
                          priority="medium"
                          onViewReasoning={() => console.log('View reasoning')}
                        />
                        <TaskProposalCard
                          title="Urgent: Review Tax Filing"
                          source="partner@firm.com"
                          confidence="medium"
                          priority="high"
                          isUrgent
                          onViewReasoning={() => console.log('View reasoning')}
                        />
                      </div>
                    </div>

                    {/* ConfidenceBadge Interactive */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>ConfidenceBadge (Interactive)</h4>
                      <p className={styles.componentDesc}>
                        Hover to see the expandable micro-interaction: grows to show arrow link, displays "View Reasoning" tooltip.
                      </p>
                      <div className={styles.componentDemo}>
                        <ConfidenceBadge tier="high" interactive onClick={() => {}} />
                        <ConfidenceBadge tier="medium" interactive onClick={() => {}} />
                        <ConfidenceBadge tier="low" interactive onClick={() => {}} />
                        <ConfidenceBadge tier="new" />
                      </div>
                    </div>

                    {/* DeadlineListItem */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>DeadlineListItem</h4>
                      <p className={styles.componentDesc}>
                        Upcoming deadline entry. Color indicates urgency.
                      </p>
                      <div className={styles.componentDemoVertical}>
                        <DeadlineListItem
                          name="Submit promotion package for Jenn"
                          date={new Date(2026, 0, 30)}
                          daysRemaining={10}
                        />
                        <DeadlineListItem
                          name="IRS Q4 Filing - Acme Corp"
                          date={new Date(2026, 0, 24)}
                          daysRemaining={5}
                        />
                        <DeadlineListItem
                          name="Client Contract Renewal"
                          date={new Date(2026, 0, 22)}
                          daysRemaining={2}
                          penaltyAmount="$5,000"
                        />
                        <DeadlineListItem
                          name="Overdue Tax Return"
                          date={new Date(2026, 0, 15)}
                          daysRemaining={-5}
                        />
                      </div>
                    </div>

                    {/* Gauge Components */}
                    <h3 className={styles.paletteTitle}>Gauge Components</h3>

                    {/* MyPaceGauge */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>MyPaceGauge</h4>
                      <p className={styles.componentDesc}>
                        SVG gauge showing schedule trajectory. Center = on track.
                      </p>
                      <div className={styles.componentDemo} style={{ justifyContent: 'space-around' }}>
                        <MyPaceGauge value={75} />
                        <MyPaceGauge value={50} />
                        <MyPaceGauge value={25} />
                      </div>
                    </div>

                    {/* Layout Components */}
                    <h3 className={styles.paletteTitle}>Layout Components</h3>

                    {/* DateHeader */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>DateHeader</h4>
                      <p className={styles.componentDesc}>
                        Shows today's date in overline format.
                      </p>
                      <div className={styles.componentDemo}>
                        <DateHeader />
                        <DateHeader prefix="TOMORROW" date={new Date(Date.now() + 86400000)} />
                      </div>
                    </div>

                    {/* ModeToggle */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>ModeToggle</h4>
                      <p className={styles.componentDesc}>
                        Tab switcher between Tasks and Calendar views.
                      </p>
                      <div className={styles.componentDemo}>
                        <ModeToggle mode="tasks" onModeChange={() => {}} />
                        <ModeToggle mode="calendar" onModeChange={() => {}} />
                      </div>
                    </div>

                    {/* Overlay Components */}
                    <h3 className={styles.paletteTitle}>Overlay Components</h3>

                    {/* UrgentInboundBanner */}
                    <div className={styles.componentShowcase}>
                      <h4 className={styles.componentName}>UrgentInboundBanner</h4>
                      <p className={styles.componentDesc}>
                        Full-width global alert. Fixed to top. Red background.
                      </p>
                      <div className={styles.componentDemoVertical} style={{ position: 'relative', minHeight: '60px' }}>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <UrgentInboundBanner
                            message="High priority task detected with conflict."
                            onSnooze={() => {}}
                            onDismiss={() => {}}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Component Architecture Note */}
                    <div className={styles.componentNote}>
                      <h4>Composition Pattern</h4>
                      <p>
                        All card components follow the <strong>Vercel Composition Patterns</strong> skill:
                        compound components with shared context, explicit variants instead of boolean props,
                        and lifted state management. This enables flexible composition without prop drilling.
                      </p>
                      <pre className={styles.codeExample}>{`// Compound component usage
<TaskCard.Root state="active" progress={65}>
  <TaskCard.Header>
    <OverlineLabel>Current Task</OverlineLabel>
  </TaskCard.Header>
  <TaskCard.Title>Review Documents</TaskCard.Title>
  <TaskCard.Progress />
  <TaskCard.Meta>
    <MonoValue>45 min remaining</MonoValue>
  </TaskCard.Meta>
</TaskCard.Root>

// Or use pre-composed variants
<ActiveTaskCard
  title="Review Documents"
  progress={65}
  timeRemaining="45 min"
/>`}</pre>
                    </div>
                  </section>

                  {/* Spacing Section */}
                  <section id="spacing" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Spacing Scale</h2>
                    <p className={styles.sectionDescription}>
                      Based on a 2px mini unit and 8px base unit. Use these values for margins, padding, and gaps.
                    </p>
                    
                    <div className={styles.spacingScale}>
                      {(Object.entries(spacing) as [string, string][]).map(([name, value]) => (
                        <SpacingSample 
                          key={name} 
                          name={name} 
                          value={value} 
                          px={spacingPx[name as keyof typeof spacingPx]} 
                        />
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Spacing Reference</h2>
                    <Tile className={styles.spacingReference}>
                      <table className={styles.spacingTable}>
                        <thead>
                          <tr>
                            <th>Token</th>
                            <th>rem</th>
                            <th>px</th>
                            <th>Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>spacing-01</td><td>0.125rem</td><td>2px</td><td>Micro spacing between elements</td></tr>
                          <tr><td>spacing-02</td><td>0.25rem</td><td>4px</td><td>Small icon/text spacing</td></tr>
                          <tr><td>spacing-03</td><td>0.5rem</td><td>8px</td><td>Default component internal padding</td></tr>
                          <tr><td>spacing-04</td><td>0.75rem</td><td>12px</td><td>Medium component spacing</td></tr>
                          <tr><td>spacing-05</td><td>1rem</td><td>16px</td><td>Base spacing unit</td></tr>
                          <tr><td>spacing-06</td><td>1.5rem</td><td>24px</td><td>Component group spacing</td></tr>
                          <tr><td>spacing-07</td><td>2rem</td><td>32px</td><td>Section spacing</td></tr>
                          <tr><td>spacing-08</td><td>2.5rem</td><td>40px</td><td>Large section spacing</td></tr>
                          <tr><td>spacing-09</td><td>3rem</td><td>48px</td><td>Container padding</td></tr>
                          <tr><td>spacing-10</td><td>4rem</td><td>64px</td><td>Layout spacing</td></tr>
                          <tr><td>spacing-11</td><td>5rem</td><td>80px</td><td>Large layout spacing</td></tr>
                          <tr><td>spacing-12</td><td>6rem</td><td>96px</td><td>Extra large layout spacing</td></tr>
                          <tr><td>spacing-13</td><td>10rem</td><td>160px</td><td>Maximum layout spacing</td></tr>
                        </tbody>
                      </table>
                    </Tile>
                  </section>
                  {/* Effects Section */}
                  <section id="effects" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Box Shadows</h2>
                    <p className={styles.sectionDescription}>
                      Elevation and depth through subtle shadow effects.
                    </p>
                    
                    <div className={styles.shadowGrid}>
                      {(Object.entries(shadows) as [string, string][])
                        .filter(([name]) => name !== 'none')
                        .map(([name, value]) => (
                          <ShadowSample key={name} name={name} value={value} />
                        ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Border Radius</h2>
                    <p className={styles.sectionDescription}>
                      Corner radius values for rounded elements. Carbon typically uses minimal rounding.
                    </p>
                    
                    <div className={styles.radiusGrid}>
                      {(Object.entries(borderRadius) as [string, string][]).map(([name, value]) => (
                        <RadiusSample key={name} name={name} value={value} />
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Icon Sizes</h2>
                    <p className={styles.sectionDescription}>
                      Standard icon dimensions for consistent iconography.
                    </p>
                    
                    <div className={styles.iconSizes}>
                      {(Object.entries(iconSizes) as [string, string][]).map(([name, value]) => (
                        <Tile key={name} className={styles.iconSizeSample}>
                          <div 
                            className={styles.iconPreview}
                            style={{ width: value, height: value }}
                          />
                          <div className={styles.iconInfo}>
                            <span className={styles.iconName}>{name}</span>
                            <span className={styles.iconValue}>{value}</span>
                          </div>
                        </Tile>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Z-Index Scale</h2>
                    <p className={styles.sectionDescription}>
                      Stacking order values for layered UI elements.
                    </p>
                    
                    <Tile className={styles.zIndexReference}>
                      <table className={styles.spacingTable}>
                        <thead>
                          <tr>
                            <th>Token</th>
                            <th>Value</th>
                            <th>Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(Object.entries(zIndex) as [string, number][]).map(([name, value]) => (
                            <tr key={name}>
                              <td>{name}</td>
                              <td>{value}</td>
                              <td>{getZIndexUsage(name)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Tile>
                  </section>
                  {/* Breakpoints Section */}
                  <section id="breakpoints" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Responsive Breakpoints</h2>
                    <p className={styles.sectionDescription}>
                      Screen width breakpoints for responsive design. Carbon uses a mobile-first approach.
                    </p>
                    
                    <div className={styles.breakpointVisual}>
                      {(Object.entries(breakpoints) as [string, string][]).map(([name, value]) => (
                        <div key={name} className={styles.breakpointItem}>
                          <div className={styles.breakpointBar}>
                            <div 
                              className={styles.breakpointFill}
                              style={{ 
                                width: `${(breakpointsPx[name as keyof typeof breakpointsPx] / 1584) * 100}%` 
                              }}
                            />
                          </div>
                          <div className={styles.breakpointInfo}>
                            <Tag type="blue">{name}</Tag>
                            <span className={styles.breakpointValue}>{value}</span>
                            <span className={styles.breakpointPx}>({breakpointsPx[name as keyof typeof breakpointsPx]}px)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Breakpoint Reference</h2>
                    <Tile className={styles.breakpointReference}>
                      <table className={styles.spacingTable}>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Min-width</th>
                            <th>Device</th>
                            <th>Columns</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>sm</td><td>320px</td><td>Mobile (small)</td><td>4</td></tr>
                          <tr><td>md</td><td>672px</td><td>Tablet</td><td>8</td></tr>
                          <tr><td>lg</td><td>1056px</td><td>Desktop</td><td>16</td></tr>
                          <tr><td>xlg</td><td>1312px</td><td>Large desktop</td><td>16</td></tr>
                          <tr><td>max</td><td>1584px</td><td>Maximum width</td><td>16</td></tr>
                        </tbody>
                      </table>
                    </Tile>
                  </section>
                  {/* Motion Section */}
                  <section id="motion" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Duration Tokens</h2>
                    <p className={styles.sectionDescription}>
                      Animation timing values for consistent motion across the interface.
                    </p>
                    
                    <div className={styles.durationGrid}>
                      {(Object.entries(duration) as [string, string][]).map(([name, value]) => (
                        <Tile key={name} className={styles.durationSample}>
                          <div className={styles.durationVisual}>
                            <div 
                              className={styles.durationBar}
                              style={{ 
                                animationDuration: value,
                              }}
                            />
                          </div>
                          <div className={styles.durationInfo}>
                            <span className={styles.durationName}>{name}</span>
                            <span className={styles.durationValue}>{value}</span>
                            <span className={styles.durationUsage}>{getDurationUsage(name)}</span>
                          </div>
                        </Tile>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Easing Functions</h2>
                    <p className={styles.sectionDescription}>
                      Cubic-bezier curves for natural-feeling animations.
                    </p>
                    
                    <Tile className={styles.easingReference}>
                      <h3>Standard Easing</h3>
                      <div className={styles.easingRow}>
                        <Tag type="blue">Productive</Tag>
                        <code>{easing.standard.productive}</code>
                      </div>
                      <div className={styles.easingRow}>
                        <Tag type="purple">Expressive</Tag>
                        <code>{easing.standard.expressive}</code>
                      </div>

                      <h3>Entrance Easing</h3>
                      <div className={styles.easingRow}>
                        <Tag type="blue">Productive</Tag>
                        <code>{easing.entrance.productive}</code>
                      </div>
                      <div className={styles.easingRow}>
                        <Tag type="purple">Expressive</Tag>
                        <code>{easing.entrance.expressive}</code>
                      </div>

                      <h3>Exit Easing</h3>
                      <div className={styles.easingRow}>
                        <Tag type="blue">Productive</Tag>
                        <code>{easing.exit.productive}</code>
                      </div>
                      <div className={styles.easingRow}>
                        <Tag type="purple">Expressive</Tag>
                        <code>{easing.exit.expressive}</code>
                      </div>
                    </Tile>
                  </section>

                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Motion Guidelines</h2>
                    <Tile className={styles.motionGuidelines}>
                      <div className={styles.guidelineItem}>
                        <h4>Productive Motion</h4>
                        <p>Use for routine, everyday actions. Quick and efficient, helping users complete tasks without distraction.</p>
                      </div>
                      <div className={styles.guidelineItem}>
                        <h4>Expressive Motion</h4>
                        <p>Use for moments of celebration, onboarding, or when you want to add personality. More dramatic and attention-grabbing.</p>
                      </div>
                    </Tile>
                  </section>

                  {/* Animation Playground Section */}
                  <section id="animation-playground" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Animation Playground</h2>
                    <p className={styles.sectionDescription}>
                      Explore interactive animations and micro-interactions achievable through front-end coding. 
                      All animations use IBM Carbon design tokens for colors and typography.
                    </p>

                    {/* Text Effects */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Text Effects</h3>
                      <p className={styles.categoryDescription}>Dynamic text animations for engaging content display.</p>
                      
                      <div className={styles.animationGrid}>
                        {/* Typewriter Effect */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <TypewriterDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Typewriter</h4>
                            <p>Characters appear one by one, mimicking typing</p>
                          </div>
                        </Tile>

                        {/* Gradient Text */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.gradientText}>
                              Meeting Scheduled
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Gradient Text</h4>
                            <p>Animated color gradient flowing through text</p>
                          </div>
                        </Tile>

                        {/* Wave Text */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.waveText}>
                              {'Loading'.split('').map((char, i) => (
                                <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
                              ))}
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Wave Text</h4>
                            <p>Letters bounce in a wave-like motion</p>
                          </div>
                        </Tile>

                        {/* Blur Reveal */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <BlurRevealDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Blur Reveal</h4>
                            <p>Text unblurs to reveal content</p>
                          </div>
                        </Tile>

                        {/* Glitch Effect */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.glitchText} data-text="ERROR 404">
                              ERROR 404
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Glitch Effect</h4>
                            <p>Digital glitch distortion for alerts</p>
                          </div>
                        </Tile>

                        {/* Counter Animation */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <CounterDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Counter</h4>
                            <p>Numbers count up with easing</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Transitions */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Transitions</h3>
                      <p className={styles.categoryDescription}>Smooth state changes and element transformations.</p>
                      
                      <div className={styles.animationGrid}>
                        {/* Fade Transitions */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <FadeDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Fade In/Out</h4>
                            <p>Opacity-based visibility transitions</p>
                          </div>
                        </Tile>

                        {/* Slide Transitions */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <SlideDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Slide</h4>
                            <p>Elements slide from different directions</p>
                          </div>
                        </Tile>

                        {/* Scale Transitions */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <ScaleDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Scale/Zoom</h4>
                            <p>Size transformation with spring physics</p>
                          </div>
                        </Tile>

                        {/* Flip Card */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <FlipCardDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>3D Flip Card</h4>
                            <p>Card rotation revealing back content</p>
                          </div>
                        </Tile>

                        {/* Morph */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <MorphDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Shape Morph</h4>
                            <p>Smooth shape transformation</p>
                          </div>
                        </Tile>

                        {/* Staggered List */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <StaggeredListDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Staggered Animation</h4>
                            <p>Sequential item reveal with delays</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Mouse/Hover Effects */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Mouse & Hover Effects</h3>
                      <p className={styles.categoryDescription}>Interactive effects responding to cursor movement.</p>
                      
                      <div className={styles.animationGrid}>
                        {/* Magnetic Button */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <MagneticButtonDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Magnetic Button</h4>
                            <p>Button follows cursor within radius</p>
                          </div>
                        </Tile>

                        {/* Tilt Card */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <TiltCardDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>3D Tilt</h4>
                            <p>Perspective tilt following cursor</p>
                          </div>
                        </Tile>

                        {/* Glow Effect */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.glowButton}>
                              <span>Hover Me</span>
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Glow Effect</h4>
                            <p>Dynamic glow following mouse</p>
                          </div>
                        </Tile>

                        {/* Ripple Effect */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <RippleButtonDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Ripple Effect</h4>
                            <p>Material-design inspired click ripple</p>
                          </div>
                        </Tile>

                        {/* Hover Reveal */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.hoverReveal}>
                              <div className={styles.hoverRevealContent}>
                                <span>View Details</span>
                              </div>
                              <div className={styles.hoverRevealOverlay}>
                                <span>Meeting at 2pm</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Hover Reveal</h4>
                            <p>Content revealed on hover</p>
                          </div>
                        </Tile>

                        {/* Cursor Trail */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <CursorTrailDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Cursor Trail</h4>
                            <p>Trail effect following cursor</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Background Effects */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Background Effects</h3>
                      <p className={styles.categoryDescription}>Dynamic backgrounds and ambient animations.</p>
                      
                      <div className={styles.animationGridLarge}>
                        {/* Gradient Animation */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={`${styles.animationDemoLarge} ${styles.gradientBg}`}>
                            <span className={styles.bgText}>Gradient Flow</span>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Gradient</h4>
                            <p>Smooth flowing color gradients using IBM Carbon colors</p>
                          </div>
                        </Tile>

                        {/* Particles */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <ParticlesDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Floating Particles</h4>
                            <p>Ambient particles with gentle movement</p>
                          </div>
                        </Tile>

                        {/* Wave Background */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={`${styles.animationDemoLarge} ${styles.waveBg}`}>
                            <div className={styles.wave}></div>
                            <div className={styles.wave}></div>
                            <div className={styles.wave}></div>
                            <span className={styles.bgText}>Wave Pattern</span>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Wave Animation</h4>
                            <p>Layered wave patterns with depth</p>
                          </div>
                        </Tile>

                        {/* Grid Pattern */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={`${styles.animationDemoLarge} ${styles.gridBg}`}>
                            <span className={styles.bgText}>Grid Pattern</span>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Grid</h4>
                            <p>Pulsing grid pattern for tech aesthetic</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Loading States */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Loading States</h3>
                      <p className={styles.categoryDescription}>Progress indicators and loading animations.</p>
                      
                      <div className={styles.animationGrid}>
                        {/* Spinner */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.spinner}></div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Spinner</h4>
                            <p>Classic rotating indicator</p>
                          </div>
                        </Tile>

                        {/* Dots Loading */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.dotsLoading}>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Bouncing Dots</h4>
                            <p>Playful dots loading indicator</p>
                          </div>
                        </Tile>

                        {/* Progress Bar */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <ProgressBarDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Progress Bar</h4>
                            <p>Animated determinate progress</p>
                          </div>
                        </Tile>

                        {/* Skeleton Screen */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.skeleton}>
                              <div className={styles.skeletonAvatar}></div>
                              <div className={styles.skeletonLines}>
                                <div className={styles.skeletonLine}></div>
                                <div className={`${styles.skeletonLine} ${styles.short}`}></div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Skeleton Loading</h4>
                            <p>Placeholder shimmer effect</p>
                          </div>
                        </Tile>

                        {/* Pulse */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <div className={styles.pulseContainer}>
                              <div className={styles.pulse}></div>
                              <div className={styles.pulseCore}></div>
                            </div>
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Pulse</h4>
                            <p>Attention-grabbing pulse ring</p>
                          </div>
                        </Tile>

                        {/* Circular Progress */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <CircularProgressDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Circular Progress</h4>
                            <p>Animated SVG circle progress</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Calendar Interactions */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Calendar & Meeting Interactions</h3>
                      <p className={styles.categoryDescription}>Animations specific to calendar and scheduling interfaces.</p>
                      
                      <div className={styles.animationGridLarge}>
                        {/* Draggable Event */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <DragDropCalendarDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Drag & Drop Events</h4>
                            <p>Drag calendar events between time slots</p>
                          </div>
                        </Tile>

                        {/* Resizable Event */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <ResizableEventDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Resizable Events</h4>
                            <p>Drag edges to extend event duration</p>
                          </div>
                        </Tile>

                        {/* Month Transition */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <MonthTransitionDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Month Navigation</h4>
                            <p>Smooth transitions between calendar months</p>
                          </div>
                        </Tile>

                        {/* Time Slot Selection */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <TimeSlotSelectionDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Time Slot Selection</h4>
                            <p>Click and drag to select time ranges</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Micro-interactions */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Micro-interactions</h3>
                      <p className={styles.categoryDescription}>Small, delightful interactions for everyday UI elements.</p>
                      
                      <div className={styles.animationGrid}>
                        {/* Animated Toggle */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <AnimatedToggleDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Toggle</h4>
                            <p>Smooth toggle with icon transition</p>
                          </div>
                        </Tile>

                        {/* Checkbox Animation */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <AnimatedCheckboxDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Checkbox Animation</h4>
                            <p>Satisfying check mark draw effect</p>
                          </div>
                        </Tile>

                        {/* Like/Heart Button */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <LikeButtonDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Like Button</h4>
                            <p>Heart animation with particles</p>
                          </div>
                        </Tile>

                        {/* Notification Badge */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <NotificationBadgeDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Notification Badge</h4>
                            <p>Animated badge counter</p>
                          </div>
                        </Tile>

                        {/* Success/Error State */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <FormStateDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Form Feedback</h4>
                            <p>Success/error state animations</p>
                          </div>
                        </Tile>

                        {/* Expand/Collapse */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <AccordionDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Accordion</h4>
                            <p>Smooth expand/collapse animation</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Toast & Notifications */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Toast & Notifications</h3>
                      <p className={styles.categoryDescription}>Notification animations for user feedback.</p>
                      
                      <div className={styles.animationGrid}>
                        {/* Toast Notification */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <ToastDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Toast Notifications</h4>
                            <p>Slide-in/out toast messages</p>
                          </div>
                        </Tile>

                        {/* Alert Shake */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <ShakeDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Error Shake</h4>
                            <p>Attention-grabbing shake animation</p>
                          </div>
                        </Tile>

                        {/* Success Celebration */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <ConfettiDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Confetti Celebration</h4>
                            <p>Success celebration effect</p>
                          </div>
                        </Tile>

                        {/* Bounce Notification */}
                        <Tile className={styles.animationTile}>
                          <div className={styles.animationDemo}>
                            <BounceNotificationDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Bounce Alert</h4>
                            <p>Bouncy entrance animation</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Data Visualization */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Data Visualization</h3>
                      <p className={styles.categoryDescription}>Animated charts and data displays.</p>
                      
                      <div className={styles.animationGridLarge}>
                        {/* Animated Bar Chart */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <BarChartDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Bar Chart</h4>
                            <p>Bars animate from zero with stagger</p>
                          </div>
                        </Tile>

                        {/* Donut Chart */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <DonutChartDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Donut Chart</h4>
                            <p>Segments draw in sequence</p>
                          </div>
                        </Tile>

                        {/* Meeting Timeline */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <TimelineDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Animated Timeline</h4>
                            <p>Events appear along a timeline</p>
                          </div>
                        </Tile>

                        {/* Stats Counter */}
                        <Tile className={styles.animationTileLarge}>
                          <div className={styles.animationDemoLarge}>
                            <StatsDemo />
                          </div>
                          <div className={styles.animationInfo}>
                            <h4>Stats Dashboard</h4>
                            <p>Multiple animated statistics</p>
                          </div>
                        </Tile>
                      </div>
                    </div>

                    {/* Scroll Animations */}
                    <div className={styles.animationCategory}>
                      <h3 className={styles.categoryTitle}>Scroll Animations</h3>
                      <p className={styles.categoryDescription}>Elements that animate based on scroll position.</p>
                      
                      <div className={styles.scrollAnimationContainer}>
                        <ScrollRevealDemo />
                      </div>
                    </div>

                  </section>

                  {/* Cadence Section */}
                  <section id="cadence" className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cadence Calendar Block System</h2>
                    <p className={styles.sectionDescription}>
                      A comprehensive visual language for calendar events that communicates commitment, risk, 
                      provenance, and persistence through a layered system of identity rails, fills, borders, and micro-signals.
                    </p>

                    {/* Anatomy Overview */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>CadenceBlock Anatomy</h3>
                      <p className={styles.categoryDescription}>
                        Each CadenceBlock consists of 4 paint layers plus micro-signals: Identity Rail (left), 
                        Fill (tint wash), State Border, and optional Risk Rail (right).
                      </p>
                      
                      <div className={styles.cadenceAnatomyDemo}>
                        <div className={styles.cadenceAnatomyBlock}>
                          <div className={styles.cadenceAnatomyLabel} style={{ left: '-80px', top: '50%' }}>
                            <span>Identity Rail</span>
                            <div className={styles.cadenceAnatomyLine} style={{ width: '60px', left: '100%' }} />
                          </div>
                          <CadenceBlock
                            title="Team Strategy Meeting"
                            time="10:00 AM - 11:30 AM"
                            client="Acme Corp"
                            identityHue={cadenceIdentityColors.client1.hue}
                            commitment="confirmed"
                            risk="watch"
                            provenance="email"
                            defense="defended"
                          />
                          <div className={styles.cadenceAnatomyLabel} style={{ right: '-70px', top: '50%' }}>
                            <div className={styles.cadenceAnatomyLine} style={{ width: '50px', right: '100%' }} />
                            <span>Risk Rail</span>
                          </div>
                          <div className={styles.cadenceAnatomyLabel} style={{ top: '-40px', left: '50%' }}>
                            <span>State Border</span>
                            <div className={styles.cadenceAnatomyLine} style={{ height: '25px', top: '100%' }} />
                          </div>
                          <div className={styles.cadenceAnatomyLabel} style={{ bottom: '-60px', left: '50%' }}>
                            <div className={styles.cadenceAnatomyLine} style={{ height: '25px', bottom: '100%' }} />
                            <span>Badges & Glyphs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Commitment States */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Commitment States</h3>
                      <p className={styles.categoryDescription}>
                        The commitment state drives border style and fill opacity. These states represent 
                        the lifecycle of a calendar block from proposal to completion.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceCommitmentStatesDemo />
                      </Tile>
                    </div>

                    {/* Risk States */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Risk States</h3>
                      <p className={styles.categoryDescription}>
                        The Risk Rail (right stripe) communicates "what breaks if things shift?" without 
                        destroying identity hue. Risk states can override border appearance.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceRiskStatesDemo />
                      </Tile>
                    </div>

                    {/* Defense/Bookability States */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Defense / Bookability States</h3>
                      <p className={styles.categoryDescription}>
                        Indicates whether time is available for scheduling or protected from being overwritten.
                        Defended blocks display a lock glyph.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceDefenseStatesDemo />
                      </Tile>
                    </div>

                    {/* Persistence States */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Persistence States</h3>
                      <p className={styles.categoryDescription}>
                        Trust insurance: shows users the sync status of their calendar data.
                        Sync errors take highest visual priority.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadencePersistenceStatesDemo />
                      </Tile>
                    </div>

                    {/* Provenance Badges */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Provenance Badges</h3>
                      <p className={styles.categoryDescription}>
                        Micro-signals indicating the source of the calendar block: AI-suggested, 
                        extracted from email/Slack, manually created, or imported.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceProvenanceBadgesDemo />
                      </Tile>
                    </div>

                    {/* Block Variants */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Block Variants</h3>
                      <p className={styles.categoryDescription}>
                        CadenceBlock supports multiple size variants for different calendar view contexts.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceBlockVariantsDemo />
                      </Tile>
                    </div>

                    {/* Combined States */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Combined State Examples</h3>
                      <p className={styles.categoryDescription}>
                        Real-world scenarios often involve multiple state dimensions. The priority system 
                        ensures deterministic, audit-friendly rendering.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceCombinedStatesDemo />
                      </Tile>
                    </div>

                    {/* Day View Example */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Day View Example</h3>
                      <p className={styles.categoryDescription}>
                        An interactive example showing CadenceBlocks in a typical day timeline view.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceDayViewDemo />
                      </Tile>
                    </div>

                    {/* Visual Cheat Sheet */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Visual Quick Reference</h3>
                      <p className={styles.categoryDescription}>
                        A quick reference for understanding Cadence visual language at a glance.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceCheatSheet />
                      </Tile>
                    </div>

                    {/* Priority Rules */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>State Priority Rules</h3>
                      <p className={styles.categoryDescription}>
                        When multiple states apply, Cadence picks one border owner based on priority. 
                        Lower-priority states can only adjust fill alpha, add badges, or toggle the risk rail.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadencePriorityRules />
                      </Tile>
                    </div>

                    {/* Design Tokens */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>Cadence Design Tokens</h3>
                      <p className={styles.categoryDescription}>
                        All Cadence tokens use the <code>cadence.</code> namespace. Values are semantic 
                        and can be mapped to actual colors at build time.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <CadenceTokenTable />
                      </Tile>
                    </div>

                    {/* TypeScript Type Reference */}
                    <div className={styles.cadenceCategory}>
                      <h3 className={styles.categoryTitle}>TypeScript Style Contract</h3>
                      <p className={styles.categoryDescription}>
                        The resolved style contract for CadenceBlock implementation.
                      </p>
                      
                      <Tile className={styles.cadenceTile}>
                        <pre className={styles.cadenceCodeBlock}>
{`type CadenceBlockStyle = {
  identityHue: string;                 // cadence.identity.hue
  fillAlpha: "low" | "med" | "high";   // cadence.block.fill.alpha.*
  border: {
    width: 1 | 2;                      // cadence.block.border.width.*
    style: "solid" | "dashed" | "dotted";
    colorChannel: "identity" | "neutral" | "risk";
    alpha: "low" | "med" | "high";
  };
  rails: {
    identity: { 
      enabled: true; 
      widthToken: "cadence.block.rail.identity.width" 
    };
    risk: { 
      enabled: boolean; 
      level?: "watch" | "breach" 
    };
  };
  badges: Array<"AI" | "Email" | "Slack" | "User" | 
                "Imported" | "Syncing" | "NotSaved">;
  glyphs: Array<"Lock" | "Spinner" | "Error" | "Check">;
};`}
                        </pre>
                      </Tile>
                    </div>

                  </section>
                </div>
              {/* End of content sections */}
        </div>
      </div>
    </div>
  );
}
