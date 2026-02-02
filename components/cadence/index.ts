/**
 * Cadence Design System Components
 * 
 * Based on IBM Carbon Design System with custom brand extensions:
 * - Lumen (AI voice) - Blue-violet palette for AI signals
 * - Terra (Human origin) - Warm terracotta for calendar events
 * 
 * Surface Philosophy: White-dominant, Notion-clean. Minimal borders. Spacious.
 */

// =============================================================================
// PRIMITIVES
// =============================================================================

export { CadenceButton } from './primitives/CadenceButton';
export type { CadenceButtonVariant, CadenceButtonSize } from './primitives/CadenceButton';

export { OverlineLabel } from './primitives/OverlineLabel';
export type { OverlineLabelVariant } from './primitives/OverlineLabel';

export { DeadlineChip } from './primitives/DeadlineChip';
export type { DeadlineChipState } from './primitives/DeadlineChip';

export { ConfidenceBadge } from './primitives/ConfidenceBadge';
export type { ConfidenceTier } from './primitives/ConfidenceBadge';

export { MonoValue } from './primitives/MonoValue';
export type { MonoValueVariant } from './primitives/MonoValue';

export { ReasoningChip } from './primitives/ReasoningChip';
export type { SourceType } from './primitives/ReasoningChip';

export { UndoButton } from './primitives/UndoButton';

// =============================================================================
// CARDS
// =============================================================================

export { TaskCard, QueuedTaskCard, ActiveTaskCard } from './cards/TaskCard';
export type { TaskCardState } from './cards/TaskCard';

export { MeetingCard } from './cards/MeetingCard';
export type { MeetingCardState } from './cards/MeetingCard';

export { InsightCard } from './cards/InsightCard';
export type { InsightCardType } from './cards/InsightCard';

export { TaskProposalCard } from './cards/TaskProposalCard';
export type { TaskProposalState, PriorityLevel } from './cards/TaskProposalCard';

export { DeadlineListItem } from './cards/DeadlineListItem';
export type { DeadlineItemState } from './cards/DeadlineListItem';

// =============================================================================
// GAUGES
// =============================================================================

export { MyPaceGauge } from './gauges/MyPaceGauge';
export type { PaceState } from './gauges/MyPaceGauge';

// =============================================================================
// SHELL
// =============================================================================

export { AppShell } from './shell/AppShell';
export type { AppShellState } from './shell/AppShell';

export { TopChrome } from './shell/TopChrome';

export { PanelDivider } from './shell/PanelDivider';

// =============================================================================
// PANELS
// =============================================================================

export { LeftPanel } from './panels/LeftPanel';

export { RightPanel } from './panels/RightPanel';
export type { RightPanelTab } from './panels/RightPanel';

export { CenterPanel } from './panels/CenterPanel';

export { AgentPanel } from './panels/AgentPanel';

export { DashboardPanel } from './panels/DashboardPanel';

// =============================================================================
// LAYOUT
// =============================================================================

export { DateHeader } from './layout/DateHeader';

export { ModeToggle } from './layout/ModeToggle';
export type { ViewMode } from './layout/ModeToggle';

// =============================================================================
// FEEDS
// =============================================================================

export { InsightsFeed } from './feeds/InsightsFeed';

export { NextDeadlineList } from './feeds/NextDeadlineList';

export { MeetingStrip } from './feeds/MeetingStrip';

export { TaskListView } from './feeds/TaskListView';

export { TaskListHeader } from './feeds/TaskListHeader';

export { TaskProposalsSection } from './feeds/TaskProposalsSection';

// =============================================================================
// CENTER PANEL COMPONENTS
// =============================================================================

export { WorkbenchTabStrip } from './center/WorkbenchTabStrip';

export { BrowserControls } from './center/BrowserControls';

export { ContentArea } from './center/ContentArea';

// =============================================================================
// CALENDAR COMPONENTS
// =============================================================================

export { CalendarView } from './calendar/CalendarView';
export type { CalendarEvent, CalendarTask, FocusTimeSlot, ViewType } from './calendar/CalendarView';

export { CalendarEventBlock } from './calendar/CalendarEventBlock';
export type { CalendarEventState } from './calendar/CalendarEventBlock';

export { TaskBlock } from './calendar/TaskBlock';
export type { TaskBlockState } from './calendar/TaskBlock';

export { FocusTimeBlock } from './calendar/FocusTimeBlock';

export { FloatingAgentButton } from './calendar/FloatingAgentButton';

// =============================================================================
// OVERLAYS
// =============================================================================

export { UrgentInboundBanner } from './overlays/UrgentInboundBanner';

export { TaskInteractionMenu } from './overlays/TaskInteractionMenu';
export type { MenuAction } from './overlays/TaskInteractionMenu';

export { ImpactDrawer } from './overlays/ImpactDrawer';

export { SwapTaskSelection } from './overlays/SwapTaskSelection';

export { PartialCompletionInput } from './overlays/PartialCompletionInput';

export { TaskProposalFullQueue } from './overlays/TaskProposalFullQueue';
