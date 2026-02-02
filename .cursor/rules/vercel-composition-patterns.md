# Vercel Composition Patterns

React composition patterns that scale. Helps avoid boolean prop proliferation through compound components, state lifting, and internal composition.

## Rule 1: Avoid Boolean Prop Proliferation (CRITICAL)

Don't add boolean props like `isThread`, `isEditing`, `isDMThread` to customize component behavior. Each boolean doubles possible states and creates unmaintainable conditional logic. Use composition instead.

**Incorrect:**
```tsx
function Composer({
  onSubmit,
  isThread,
  isDMThread,
  isEditing,
  isForwarding,
}: Props) {
  return (
    <div>
      {isDMThread ? <DMField /> : isThread ? <ThreadField /> : null}
      {isEditing ? <EditFooter /> : <SendFooter />}
    </div>
  )
}
```

**Correct:**
```tsx
// Explicit variants - each is clear about what it renders
function ThreadComposer({ channelId }: { channelId: string }) { ... }
function EditComposer({ messageId }: { messageId: string }) { ... }
function ForwardComposer({ messageId }: { messageId: string }) { ... }
```

## Rule 2: Use Compound Components (HIGH)

Structure complex components as compound components with a shared context. Each subcomponent accesses shared state via context, not props.

**Pattern:**
```tsx
const ComposerContext = createContext<ComposerContextValue>(null)

function ComposerProvider({ children, state, actions, meta }: ProviderProps) {
  return (
    <ComposerContext value={{ state, actions, meta }}>
      {children}
    </ComposerContext>
  )
}

function ComposerInput() {
  const { state, actions: { update } } = use(ComposerContext)
  return <textarea value={state.input} onChange={(e) => update(e.target.value)} />
}

// Export as compound component
const Composer = {
  Provider: ComposerProvider,
  Frame: ComposerFrame,
  Input: ComposerInput,
  Submit: ComposerSubmit,
}
```

**Usage:**
```tsx
<Composer.Provider state={state} actions={actions} meta={meta}>
  <Composer.Frame>
    <Composer.Input />
    <Composer.Submit />
  </Composer.Frame>
</Composer.Provider>
```

## Rule 3: Create Explicit Component Variants (MEDIUM)

Instead of one component with many boolean props, create explicit variant components. Each variant composes the pieces it needs.

**Incorrect:**
```tsx
<Composer isThread isDM showAttachments showEmojis />
```

**Correct:**
```tsx
<ThreadComposer channelId={id} />
// Or
<EditMessageComposer messageId={id} />
// Or
<ForwardMessageComposer messageId={id} />
```

## Rule 4: Prefer Children Over Render Props (MEDIUM)

Use children composition instead of render props when possible. It's more readable and follows React's natural composition model.

**Incorrect:**
```tsx
<Card renderHeader={() => <Header />} renderFooter={() => <Footer />} />
```

**Correct:**
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

## Rule 5: Lift State to Reduce Props (MEDIUM)

Move shared state to a provider component. Subcomponents access state via context, eliminating prop drilling.

**Pattern:**
```tsx
// Provider owns the state
function TaskCardProvider({ task, children }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <TaskCardContext value={{ task, isHovered, setIsHovered, isExpanded, setIsExpanded }}>
      {children}
    </TaskCardContext>
  )
}

// Subcomponents access via context
function TaskCardTitle() {
  const { task, isExpanded } = use(TaskCardContext)
  return <h3>{isExpanded ? task.fullTitle : task.shortTitle}</h3>
}
```

## Rule 6: Decouple State Implementation (MEDIUM)

Separate state management from UI. The provider accepts state and actions as props, allowing different implementations.

```tsx
// UI doesn't care how state is managed
<Composer.Provider state={zustandState} actions={zustandActions} meta={meta}>
  <Composer.Frame>...</Composer.Frame>
</Composer.Provider>

// Same UI, different state source
<Composer.Provider state={reactQueryState} actions={reactQueryActions} meta={meta}>
  <Composer.Frame>...</Composer.Frame>
</Composer.Provider>
```

## Rule 7: React 19 - No forwardRef (LOW)

In React 19+, ref is passed as a regular prop. Don't use forwardRef.

**React 18:**
```tsx
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} />
))
```

**React 19+:**
```tsx
function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />
}
```

---

## Application to Cadence Components

When building Cadence components, apply these patterns:

1. **TaskCard** → Create variants: `QueuedTaskCard`, `ActiveTaskCard`, `CompletedTaskCard`, `OverrunTaskCard`
2. **InsightCard** → Create variants: `DeadlineRiskCard`, `CapacityOverflowCard`, `AISuggestionCard`
3. **Complex components** (CalendarView, ImpactDrawer) → Use compound component pattern with shared context
4. **State management** → Lift state to providers, decouple from UI
