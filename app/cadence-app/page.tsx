'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Subtract, Draggable } from '@carbon/icons-react';

// Shell
import { AppShell } from '@/components/cadence/shell/AppShell';
import { TopChrome } from '@/components/cadence/shell/TopChrome';

// Panels
import { LeftPanel } from '@/components/cadence/panels/LeftPanel';
import { RightPanel } from '@/components/cadence/panels/RightPanel';
import { CenterPanel } from '@/components/cadence/panels/CenterPanel';
import { AgentPanel } from '@/components/cadence/panels/AgentPanel';
import { DashboardPanel } from '@/components/cadence/panels/DashboardPanel';

// Layout
import { DateHeader } from '@/components/cadence/layout/DateHeader';
import { ModeToggle } from '@/components/cadence/layout/ModeToggle';
import type { ViewMode } from '@/components/cadence/layout/ModeToggle';

// Center Panel
import { WorkbenchTabStrip } from '@/components/cadence/center/WorkbenchTabStrip';
import { BrowserControls } from '@/components/cadence/center/BrowserControls';
import { ContentArea } from '@/components/cadence/center/ContentArea';

// Feeds
import { MeetingStrip } from '@/components/cadence/feeds/MeetingStrip';
import { TaskListView } from '@/components/cadence/feeds/TaskListView';
import { TaskListHeader } from '@/components/cadence/feeds/TaskListHeader';
import { TaskProposalsSection } from '@/components/cadence/feeds/TaskProposalsSection';
import { InsightsFeed } from '@/components/cadence/feeds/InsightsFeed';
import { NextDeadlineList } from '@/components/cadence/feeds/NextDeadlineList';

// Cards
import { MeetingCard } from '@/components/cadence/cards/MeetingCard';
import { QueuedTaskCard, ActiveTaskCard } from '@/components/cadence/cards/TaskCard';
import { InsightCard } from '@/components/cadence/cards/InsightCard';
import { TaskProposalCard } from '@/components/cadence/cards/TaskProposalCard';
import { DeadlineListItem } from '@/components/cadence/cards/DeadlineListItem';

// Gauges
import { MyPaceGauge } from '@/components/cadence/gauges/MyPaceGauge';

// Calendar
import { CalendarView } from '@/components/cadence/calendar/CalendarView';
import type { CalendarEvent, CalendarTask, FocusTimeSlot, ViewType } from '@/components/cadence/calendar/CalendarView';
import type { MenuAction } from '@/components/cadence/overlays/TaskInteractionMenu';

// Overlays
import { UrgentInboundBanner } from '@/components/cadence/overlays/UrgentInboundBanner';
import { ImpactDrawer } from '@/components/cadence/overlays/ImpactDrawer';
import { TaskProposalFullQueue } from '@/components/cadence/overlays/TaskProposalFullQueue';

import styles from './cadence-app.module.scss';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockMeetings = [
  { id: 'm1', title: 'Lorem ipsum dolor sit amet consectetu', startTime: '9:00 AM', duration: '1h', subtitle: 'Client call' },
  { id: 'm2', title: 'Lorem ipsum dolor sit amet consectetu', startTime: '9:30 AM', duration: '1h', subtitle: 'Team sync' },
];

const mockTasks = [
  {
    id: 't1',
    title: 'Review Q4 Tax Returns',
    client: 'Acme Corp',
    duration: '2h 30m',
    deadlineLabel: 'DDL',
    deadlineDaysUntil: 5,
    isActive: false,
    source: { type: 'email' as const, label: 'client@acme.com' },
  },
  {
    id: 't2',
    title: 'Prepare Financial Statement',
    client: 'Client X',
    duration: '1h 45m',
    deadlineLabel: 'DDL',
    deadlineDaysUntil: 3,
    isActive: true,
    progress: 65,
  },
  {
    id: 't3',
    title: 'Update Compliance Documents',
    client: 'Internal',
    duration: '45m',
    deadlineLabel: 'DDL',
    deadlineDaysUntil: 7,
    isActive: false,
    source: { type: 'chat' as const, label: '#tax-team' },
  },
];

const mockProposals = [
  {
    id: 'p1',
    title: 'Client X P&L Statement',
    source: 'client@email.com · 1.5h est.',
    confidence: 'high' as const,
    priority: 'high' as const,
    isUrgent: false,
  },
  {
    id: 'p2',
    title: 'Quarterly Review Prep',
    source: 'Slack #tax-team · 2h est.',
    confidence: 'medium' as const,
    priority: 'medium' as const,
    isUrgent: false,
  },
];

const mockInsights = [
  {
    id: 'i1',
    type: 'deadline-risk' as const,
    title: 'Start "Task Name" ASAP.',
    body: 'Only 2 weeks away from IRS XXXX DDL. You\'re 1 day behind schedule.',
    confidence: 75,
    primaryAction: 'Go to Task',
    secondaryAction: 'View impact',
  },
  {
    id: 'i2',
    type: 'capacity-overflow' as const,
    title: 'Negative availability on Jan 18.',
    body: 'You\'re 5 hours short of work hours.',
    confidence: 60,
    primaryAction: 'Reshuffle my schedule',
    secondaryAction: 'View impact',
  },
];

const mockDeadlines = [
  { id: 'd1', name: 'Submit promotion package for Jenn', date: new Date(2026, 0, 24), daysRemaining: 6 },
  { id: 'd2', name: 'Prep New Client Call Material', date: new Date(2026, 0, 31), daysRemaining: 13 },
];

const mockTabs = [
  { id: 'tab1', title: 'Client Meeting Proposal Doc', favicon: '🌐', url: 'https://docs.google.com/document/d/1-sdRgxoZafxWCTBf3rkx...' },
  { id: 'tab2', title: 'Excel', favicon: '📄', url: 'https://www.office.com/excel' },
];

const mockAgentMessages = [
  {
    id: 'a1',
    type: 'agent' as const,
    content: 'Your day has 2 conflicts. Want me to suggest a reshuffle?',
    actions: [
      { label: 'Resolve conflict', value: 'resolve' },
      { label: 'Find focus time', value: 'focus' },
    ],
    showPreviewPlan: true,
    showApply: true,
    showUndo: false,
  },
];

// Calendar Mock Data (Screen 3, 11, 12)
const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    name: 'Client Sync - Acme Corp',
    location: 'Zoom · John, Sarah',
    startHour: 9,
    startMinute: 0,
    durationMinutes: 60,
    state: 'default',
  },
  {
    id: 'e2',
    name: 'Team Standup',
    location: 'Conference Room B',
    startHour: 14,
    startMinute: 0,
    durationMinutes: 30,
    state: 'default',
  },
];

const mockCalendarTasks: CalendarTask[] = [
  {
    id: 'ct1',
    name: 'Review Q4 Tax Returns',
    duration: '2h 30m',
    startHour: 10,
    startMinute: 0,
    durationMinutes: 150,
    state: 'active',
    isActive: true,
  },
  {
    id: 'ct2',
    name: 'Prepare Financial Statement',
    duration: '1h 45m',
    startHour: 14,
    startMinute: 30,
    durationMinutes: 105,
    state: 'scheduled',
  },
  {
    id: 'ct3',
    name: 'Update Compliance Docs',
    duration: '45m',
    startHour: 16,
    startMinute: 30,
    durationMinutes: 45,
    state: 'scheduled',
  },
];

const mockFocusTimeSlots: FocusTimeSlot[] = [
  {
    id: 'f1',
    startHour: 12,
    startMinute: 30,
    durationMinutes: 90,
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CadenceApp() {
  // State
  const [showUrgentBanner, setShowUrgentBanner] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('tasks');
  const [tasks, setTasks] = useState(mockTasks);
  const [proposals, setProposals] = useState(mockProposals);
  const [insights, setInsights] = useState(mockInsights);
  const [paceValue, setPaceValue] = useState(35);
  const [tabs, setTabs] = useState(mockTabs);
  const [activeTabId, setActiveTabId] = useState('tab1');
  const [currentUrl, setCurrentUrl] = useState(mockTabs[0].url || '');
  const [isImpactDrawerOpen, setIsImpactDrawerOpen] = useState(false);
  const [isFullQueueOpen, setIsFullQueueOpen] = useState(false);
  
  // Calendar state (Screen 3)
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 0, 18));
  const [calendarViewType, setCalendarViewType] = useState<ViewType>('day');
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>(mockCalendarTasks);
  const [focusTimeSlots] = useState<FocusTimeSlot[]>(mockFocusTimeSlots);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  
  // Demo controls state
  const [isDemoMinimized, setIsDemoMinimized] = useState(false);
  const [demoPosition, setDemoPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  
  // Derived state
  const urgentProposal = useMemo(() => proposals.find(p => p.isUrgent), [proposals]);
  const hasUrgentInsight = useMemo(() => insights.some(i => i.type === 'deadline-risk' || i.type === 'capacity-overflow'), [insights]);
  
  // Drag handlers for demo controls
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (dragRef.current) {
      setIsDragging(true);
      const rect = dragRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);
  
  const handleDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = window.innerHeight - e.clientY - (dragRef.current?.offsetHeight || 0) + dragOffset.current.y;
      setDemoPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - (dragRef.current?.offsetWidth || 200))),
        y: Math.max(0, newY),
      });
    }
  }, [isDragging]);
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);
  
  // Handlers
  const triggerUrgentInbound = useCallback(() => {
    setProposals(curr => [
      {
        id: `urgent-${Date.now()}`,
        title: 'Urgent: Client Y Tax Filing',
        source: 'urgent@client.com · ASAP',
        confidence: 'high' as const,
        priority: 'high' as const,
        isUrgent: true,
      },
      ...curr,
    ]);
    
    setInsights(curr => [
      {
        id: `insight-urgent-${Date.now()}`,
        type: 'deadline-risk' as const,
        title: 'Accept "Client Y Tax Filing" now.',
        body: 'High priority task detected with scheduling conflict.',
        confidence: 90,
        primaryAction: 'View proposal',
        secondaryAction: 'View impact',
      },
      ...curr,
    ]);
    
    setShowUrgentBanner(true);
    setPaceValue(25);
  }, []);
  
  const handleAcceptProposal = useCallback((proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return;
    
    // Convert proposal to task
    setTasks(curr => [
      ...curr,
      {
        id: `task-${proposalId}`,
        title: proposal.title,
        client: 'New Client',
        duration: '1h 30m',
        deadlineLabel: 'DDL',
        deadlineDaysUntil: 1,
        isActive: false,
        source: { type: 'email' as const, label: proposal.source.split(' · ')[0] },
      },
    ]);
    
    setProposals(curr => curr.filter(p => p.id !== proposalId));
    
    if (proposal.isUrgent) {
      setShowUrgentBanner(false);
    }
  }, [proposals]);
  
  const handleRejectProposal = useCallback((proposalId: string) => {
    setProposals(curr => curr.filter(p => p.id !== proposalId));
    
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal?.isUrgent) {
      setShowUrgentBanner(false);
    }
  }, [proposals]);
  
  const handleTabSelect = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.url) setCurrentUrl(tab.url);
  }, [tabs]);
  
  const handleTabClose = useCallback((tabId: string) => {
    setTabs(curr => {
      const filtered = curr.filter(t => t.id !== tabId);
      if (activeTabId === tabId && filtered.length > 0) {
        setActiveTabId(filtered[0].id);
        if (filtered[0].url) setCurrentUrl(filtered[0].url);
      }
      return filtered;
    });
  }, [activeTabId]);
  
  const handleDismissInsight = useCallback((insightId: string) => {
    setInsights(curr => curr.filter(i => i.id !== insightId));
  }, []);
  
  // Calendar task action handler (Screen 13)
  const handleCalendarTaskAction = useCallback((taskId: string, action: MenuAction) => {
    console.log('Task action:', taskId, action);
    
    switch (action) {
      case 'complete':
        setCalendarTasks(curr => 
          curr.map(t => t.id === taskId ? { ...t, state: 'completed' as const } : t)
        );
        break;
      case 'swap':
        // Would open swap selection modal
        setIsImpactDrawerOpen(true);
        break;
      case 'defer-later':
      case 'defer-tomorrow':
        // Would trigger reshuffle
        setIsImpactDrawerOpen(true);
        break;
      default:
        break;
    }
  }, []);
  
  // Trigger conflict state (Screen 11)
  const triggerConflictState = useCallback(() => {
    // Add a conflicting meeting that overlaps with existing task
    setCalendarEvents(curr => [
      ...curr,
      {
        id: `conflict-${Date.now()}`,
        name: 'Impromptu Client Call',
        location: 'Phone',
        startHour: 10,
        startMinute: 30,
        durationMinutes: 60,
        state: 'conflict' as const,
      },
    ]);
    
    // Mark the overlapping task as conflict
    setCalendarTasks(curr =>
      curr.map(t => t.id === 'ct1' ? { ...t, state: 'conflict' as const } : t)
    );
    
    // Add insight
    setInsights(curr => [
      {
        id: `insight-conflict-${Date.now()}`,
        type: 'deadline-risk' as const,
        title: 'Schedule conflict detected.',
        body: 'Impromptu Client Call overlaps with Review Q4 Tax Returns.',
        confidence: 95,
        primaryAction: 'View impact',
        secondaryAction: 'Dismiss',
      },
      ...curr,
    ]);
    
    setPaceValue(v => Math.max(0, v - 15));
    setViewMode('calendar');
  }, []);
  
  // Trigger overrun state (Screen 12)
  const triggerOverrunState = useCallback(() => {
    setCalendarTasks(curr =>
      curr.map(t => t.id === 'ct1' 
        ? { 
            ...t, 
            state: 'overrun' as const,
            durationMinutes: 180, // Extended past original
            originalEndHour: 12,
            originalEndMinute: 30,
          } 
        : t
      )
    );
    
    // Add insight about overrun risk
    setInsights(curr => [
      {
        id: `insight-overrun-${Date.now()}`,
        type: 'deadline-risk' as const,
        title: 'Task running over estimate.',
        body: 'Review Q4 Tax Returns is 30 minutes over. Downstream tasks may be affected.',
        confidence: 80,
        primaryAction: 'Need more time',
        secondaryAction: 'View impact',
      },
      ...curr,
    ]);
    
    setPaceValue(v => Math.max(0, v - 10));
    setViewMode('calendar');
  }, []);
  
  // Reset calendar state
  const resetCalendarState = useCallback(() => {
    setCalendarEvents(mockCalendarEvents);
    setCalendarTasks(mockCalendarTasks);
    setPaceValue(35);
  }, []);

  return (
    <div className={styles.cadenceApp}>
      {/* Urgent Inbound Banner */}
      <UrgentInboundBanner
        visible={showUrgentBanner}
        message="High priority new task detected with conflict."
        onSnooze={() => setShowUrgentBanner(false)}
        onDismiss={() => setShowUrgentBanner(false)}
      />
      
      <AppShell
        topChrome={
          <TopChrome
            userInitials="DK"
            unreadCount={hasUrgentInsight ? 3 : 1}
          />
        }
        
        leftPanel={
          <LeftPanel>
            <DateHeader date={new Date(2026, 0, 18)} prefix="TODAY" />
            
            <MeetingStrip>
              {mockMeetings.map(meeting => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.title}
                  startTime={meeting.startTime}
                  duration={meeting.duration}
                  subtitle={meeting.subtitle}
                />
              ))}
            </MeetingStrip>
            
            <ModeToggle mode={viewMode} onModeChange={setViewMode} />
            
            {viewMode === 'tasks' && (
              <>
                <TaskListView header={<TaskListHeader />}>
                  {tasks.map(task => (
                    task.isActive ? (
                      <ActiveTaskCard
                        key={task.id}
                        title={task.title}
                        progress={task.progress || 0}
                        timeRemaining="45m"
                        deadlineLabel={task.deadlineLabel}
                        deadlineDaysUntil={task.deadlineDaysUntil}
                      />
                    ) : (
                      <QueuedTaskCard
                        key={task.id}
                        title={task.title}
                        client={task.client}
                        duration={task.duration}
                        deadlineLabel={task.deadlineLabel}
                        deadlineDaysUntil={task.deadlineDaysUntil}
                        source={task.source}
                      />
                    )
                  ))}
                </TaskListView>
                
                <TaskProposalsSection onOpenFullQueue={() => setIsFullQueueOpen(true)}>
                  {proposals.slice(0, 2).map(proposal => (
                    <TaskProposalCard
                      key={proposal.id}
                      title={proposal.title}
                      source={proposal.source}
                      confidence={proposal.confidence}
                      priority={proposal.priority}
                      isUrgent={proposal.isUrgent}
                      onAccept={() => handleAcceptProposal(proposal.id)}
                      onReject={() => handleRejectProposal(proposal.id)}
                    />
                  ))}
                </TaskProposalsSection>
              </>
            )}
            
            {viewMode === 'calendar' && (
              <CalendarView
                date={calendarDate}
                viewType={calendarViewType}
                events={calendarEvents}
                tasks={calendarTasks}
                focusTimeSlots={focusTimeSlots}
                showCompleted={showCompletedTasks}
                lastSyncedText="Last synced: 5 min ago"
                onDateChange={setCalendarDate}
                onViewTypeChange={setCalendarViewType}
                onShowCompletedChange={setShowCompletedTasks}
                onTaskClick={(taskId) => console.log('Task clicked:', taskId)}
                onTaskAction={handleCalendarTaskAction}
                onAgentClick={() => console.log('Agent button clicked')}
                onAddTask={(slotId) => console.log('Add task to slot:', slotId)}
              />
            )}
          </LeftPanel>
        }
        
        centerPanel={
          <CenterPanel
            tabStrip={
              <WorkbenchTabStrip
                tabs={tabs}
                activeTabId={activeTabId}
                onTabSelect={handleTabSelect}
                onTabClose={handleTabClose}
              />
            }
            browserControls={
              <BrowserControls
                url={currentUrl}
                canGoBack={true}
              />
            }
          >
            <ContentArea url={currentUrl} />
          </CenterPanel>
        }
        
        rightPanel={
          <RightPanel
            insightsContent={
              <>
                <MyPaceGauge value={paceValue} />
                
                <InsightsFeed>
                  {insights.map(insight => (
                    <InsightCard
                      key={insight.id}
                      type={insight.type}
                      title={insight.title}
                      body={insight.body}
                      confidence={insight.confidence}
                      primaryAction={insight.primaryAction}
                      secondaryAction={insight.secondaryAction}
                      onSecondaryAction={() => {
                        if (insight.secondaryAction === 'View impact') {
                          setIsImpactDrawerOpen(true);
                        }
                      }}
                      onDismiss={() => handleDismissInsight(insight.id)}
                    />
                  ))}
                </InsightsFeed>
                
                <NextDeadlineList>
                  {mockDeadlines.map(deadline => (
                    <DeadlineListItem
                      key={deadline.id}
                      name={deadline.name}
                      date={deadline.date}
                      daysRemaining={deadline.daysRemaining}
                    />
                  ))}
                </NextDeadlineList>
              </>
            }
            agentContent={<AgentPanel messages={mockAgentMessages} />}
            dashboardContent={<DashboardPanel />}
          />
        }
      />
      
      {/* Impact Drawer */}
      <ImpactDrawer
        isOpen={isImpactDrawerOpen}
        actionDescription="accept 'Client Y Tax Filing'"
        beforeItems={[
          { time: '10AM', name: 'Task A', type: 'task' },
          { time: '11AM', name: 'Task B', type: 'task' },
          { time: '1PM', name: 'Task C', type: 'task' },
        ]}
        afterItems={[
          { time: '10AM', name: 'Client Y Tax Filing', type: 'new' },
          { time: '11AM', name: 'Task A', type: 'task', isMoved: true },
          { time: '1PM', name: 'Task C', type: 'task', isAtRisk: true },
        ]}
        consequenceHeadline="IRS Q4 Filing enters danger zone."
        penaltyAmount="$5,000/month late filing"
        onConfirm={() => {
          if (urgentProposal) handleAcceptProposal(urgentProposal.id);
          setIsImpactDrawerOpen(false);
        }}
        onCancel={() => setIsImpactDrawerOpen(false)}
        onDismiss={() => setIsImpactDrawerOpen(false)}
      />
      
      {/* Task Proposals Full Queue */}
      <TaskProposalFullQueue
        isOpen={isFullQueueOpen}
        onDismiss={() => setIsFullQueueOpen(false)}
        onMarkAllReviewed={() => {
          setProposals([]);
          setIsFullQueueOpen(false);
        }}
      >
        {proposals.map(proposal => (
          <TaskProposalCard
            key={proposal.id}
            title={proposal.title}
            source={proposal.source}
            confidence={proposal.confidence}
            priority={proposal.priority}
            isUrgent={proposal.isUrgent}
            onAccept={() => handleAcceptProposal(proposal.id)}
            onReject={() => handleRejectProposal(proposal.id)}
          />
        ))}
      </TaskProposalFullQueue>
      
      {/* Demo Controls - Draggable & Minimizable */}
      <div 
        ref={dragRef}
        className={`${styles.demoControls} ${isDemoMinimized ? styles.minimized : ''}`}
        style={{ 
          left: demoPosition.x, 
          bottom: demoPosition.y,
          cursor: isDragging ? 'grabbing' : 'auto',
        }}
      >
        <div 
          className={styles.demoHeader}
          onMouseDown={handleDragStart}
        >
          <Draggable size={14} className={styles.dragHandle} />
          <h4>Demo Controls</h4>
          <button 
            className={styles.minimizeButton}
            onClick={() => setIsDemoMinimized(!isDemoMinimized)}
            aria-label={isDemoMinimized ? 'Expand' : 'Minimize'}
          >
            <Subtract size={14} />
          </button>
        </div>
        
        {!isDemoMinimized && (
          <div className={styles.demoButtonsContainer}>
            <div className={styles.demoSection}>
              <span className={styles.demoSectionLabel}>Scenarios</span>
              <button onClick={triggerUrgentInbound} className={styles.demoButton}>
                Urgent Inbound (S9)
              </button>
              <button onClick={triggerConflictState} className={styles.demoButton}>
                Conflict State (S11)
              </button>
              <button onClick={triggerOverrunState} className={styles.demoButton}>
                Overrun State (S12)
              </button>
            </div>
            
            <div className={styles.demoSection}>
              <span className={styles.demoSectionLabel}>Pace Gauge</span>
              <button onClick={() => setPaceValue(v => Math.max(0, v - 10))} className={styles.demoButton}>
                Behind
              </button>
              <button onClick={() => setPaceValue(v => Math.min(100, v + 10))} className={styles.demoButton}>
                Ahead
              </button>
            </div>
            
            <div className={styles.demoSection}>
              <span className={styles.demoSectionLabel}>Reset</span>
              <button onClick={resetCalendarState} className={styles.demoButton}>
                Reset Calendar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
