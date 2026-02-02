/**
 * Cadence Design System - Design Tokens
 * Based on IBM Carbon Design System v11 with Cadence brand customizations
 * 
 * Custom brand colors: Lumen (AI) and Terra (Human)
 * Typography: Inter (sans), Lora (serif), Roboto Mono (mono)
 */

// =============================================================================
// CADENCE BRAND COLORS
// =============================================================================

/**
 * Lumen Color Scale - AI Brand Accent
 * Used for AI-generated suggestions, confidence badges, reasoning chips, ripple previews
 * Design rationale: Latin for "light and illumination" - makes the invisible visible
 */
export const lumenColors = {
  lumen10: '#F0F5FD',
  lumen20: '#D5E0FC',
  lumen30: '#B3C5FC',
  lumen40: '#8DA3FC',
  lumen50: '#7182FD',
  lumen60: '#3336FF', // Key brand color
  lumen70: '#0004E2',
  lumen80: '#0003A7',
  lumen90: '#000273',
  lumen100: '#05063E',
} as const;

/**
 * Terra Color Scale - Human Origin
 * Used for calendar events, client meetings, inbound requests (human commitments)
 * Design rationale: Warm terracotta - grounded, human, tangible
 */
export const terraColors = {
  terra10: '#F9F3F1',
  terra20: '#EDDED7',
  terra30: '#DFC0B3',
  terra40: '#CF9C86',
  terra50: '#C27A5A', // Key brand color
  terra60: '#A35D3B',
  terra70: '#79442A',
  terra80: '#57311C',
  terra90: '#391F11',
  terra100: '#211209',
} as const;

/**
 * Black & White - CTAs & Primary Actions
 * Maximum accessibility, credibility, and professional restraint
 */
export const cadenceNeutrals = {
  black: '#000000',
  white: '#FFFFFF',
} as const;

// =============================================================================
// COLOR TOKENS (Carbon Base)
// =============================================================================

/**
 * Blue Color Scale - Primary Brand Colors
 * Used for interactive elements, links, and primary actions
 */
export const blueColors = {
  blue10: '#edf5ff',
  blue20: '#d0e2ff',
  blue30: '#a6c8ff',
  blue40: '#78a9ff',
  blue50: '#4589ff',
  blue60: '#0f62fe', // Primary Blue
  blue70: '#0043ce',
  blue80: '#002d9c',
  blue90: '#001d6c',
  blue100: '#001141',
} as const;

/**
 * Gray Color Scale - Neutral Colors
 * Used for text, backgrounds, borders, and UI elements
 */
export const grayColors = {
  gray10: '#f4f4f4',
  gray20: '#e0e0e0',
  gray30: '#c6c6c6',
  gray40: '#a8a8a8',
  gray50: '#8d8d8d',
  gray60: '#6f6f6f',
  gray70: '#525252',
  gray80: '#393939',
  gray90: '#262626',
  gray100: '#161616',
} as const;

/**
 * Cool Gray Color Scale
 * Alternative neutral palette with cool undertones
 */
export const coolGrayColors = {
  coolGray10: '#f2f4f8',
  coolGray20: '#dde1e6',
  coolGray30: '#c1c7cd',
  coolGray40: '#a2a9b0',
  coolGray50: '#878d96',
  coolGray60: '#697077',
  coolGray70: '#4d5358',
  coolGray80: '#343a3f',
  coolGray90: '#21272a',
  coolGray100: '#121619',
} as const;

/**
 * Warm Gray Color Scale
 * Alternative neutral palette with warm undertones
 */
export const warmGrayColors = {
  warmGray10: '#f7f3f2',
  warmGray20: '#e5e0df',
  warmGray30: '#cac5c4',
  warmGray40: '#ada8a8',
  warmGray50: '#8f8b8b',
  warmGray60: '#726e6e',
  warmGray70: '#565151',
  warmGray80: '#3c3838',
  warmGray90: '#272525',
  warmGray100: '#171414',
} as const;

/**
 * Purple Color Scale
 * Used for accents and alternative interactive elements
 */
export const purpleColors = {
  purple10: '#f6f2ff',
  purple20: '#e8daff',
  purple30: '#d4bbff',
  purple40: '#be95ff',
  purple50: '#a56eff',
  purple60: '#8a3ffc',
  purple70: '#6929c4',
  purple80: '#491d8b',
  purple90: '#31135e',
  purple100: '#1c0f30',
} as const;

/**
 * Cyan Color Scale
 * Used for informational elements and accents
 */
export const cyanColors = {
  cyan10: '#e5f6ff',
  cyan20: '#bae6ff',
  cyan30: '#82cfff',
  cyan40: '#33b1ff',
  cyan50: '#1192e8',
  cyan60: '#0072c3',
  cyan70: '#00539a',
  cyan80: '#003a6d',
  cyan90: '#012749',
  cyan100: '#061727',
} as const;

/**
 * Teal Color Scale
 * Used for success states and positive indicators
 */
export const tealColors = {
  teal10: '#d9fbfb',
  teal20: '#9ef0f0',
  teal30: '#3ddbd9',
  teal40: '#08bdba',
  teal50: '#009d9a',
  teal60: '#007d79',
  teal70: '#005d5d',
  teal80: '#004144',
  teal90: '#022b30',
  teal100: '#081a1c',
} as const;

/**
 * Green Color Scale
 * Used for success states and positive feedback
 */
export const greenColors = {
  green10: '#defbe6',
  green20: '#a7f0ba',
  green30: '#6fdc8c',
  green40: '#42be65',
  green50: '#24a148',
  green60: '#198038',
  green70: '#0e6027',
  green80: '#044317',
  green90: '#022d0d',
  green100: '#071908',
} as const;

/**
 * Red Color Scale
 * Used for error states and destructive actions
 */
export const redColors = {
  red10: '#fff1f1',
  red20: '#ffd7d9',
  red30: '#ffb3b8',
  red40: '#ff8389',
  red50: '#fa4d56',
  red60: '#da1e28',
  red70: '#a2191f',
  red80: '#750e13',
  red90: '#520408',
  red100: '#2d0709',
} as const;

/**
 * Orange Color Scale
 * Used for warnings that require attention
 */
export const orangeColors = {
  orange10: '#fff2e8',
  orange20: '#ffd9be',
  orange30: '#ffb784',
  orange40: '#ff832b',
  orange50: '#eb6200',
  orange60: '#ba4e00',
  orange70: '#8a3800',
  orange80: '#5e2900',
  orange90: '#3e1a00',
  orange100: '#231000',
} as const;

/**
 * Yellow Color Scale
 * Used for warning states and caution indicators
 */
export const yellowColors = {
  yellow10: '#fcf4d6',
  yellow20: '#fddc69',
  yellow30: '#f1c21b',
  yellow40: '#d2a106',
  yellow50: '#b28600',
  yellow60: '#8e6a00',
  yellow70: '#684e00',
  yellow80: '#483700',
  yellow90: '#302400',
  yellow100: '#1c1500',
} as const;

/**
 * Magenta Color Scale
 * Used for special highlights and accents
 */
export const magentaColors = {
  magenta10: '#fff0f7',
  magenta20: '#ffd6e8',
  magenta30: '#ffafd2',
  magenta40: '#ff7eb6',
  magenta50: '#ee5396',
  magenta60: '#d02670',
  magenta70: '#9f1853',
  magenta80: '#740937',
  magenta90: '#510224',
  magenta100: '#2a0a18',
} as const;

// =============================================================================
// SEMANTIC COLOR TOKENS
// =============================================================================

/**
 * Support/Semantic Colors
 * Used for system feedback and status indicators
 */
export const supportColors = {
  // Error/Danger
  supportError: '#da1e28',
  supportErrorInverse: '#fa4d56',
  
  // Success
  supportSuccess: '#24a148',
  supportSuccessInverse: '#42be65',
  
  // Warning
  supportWarning: '#f1c21b',
  supportWarningInverse: '#f1c21b',
  
  // Info
  supportInfo: '#0043ce',
  supportInfoInverse: '#4589ff',
  
  // Caution (minor warning)
  supportCautionMajor: '#ff832b',
  supportCautionMinor: '#f1c21b',
} as const;

/**
 * Background Colors (White Theme - Default)
 */
export const backgroundColors = {
  background: '#ffffff',
  backgroundHover: 'rgba(141, 141, 141, 0.12)',
  backgroundActive: 'rgba(141, 141, 141, 0.5)',
  backgroundSelected: 'rgba(141, 141, 141, 0.2)',
  backgroundSelectedHover: 'rgba(141, 141, 141, 0.32)',
  backgroundInverse: '#393939',
  backgroundInverseHover: '#4c4c4c',
  backgroundBrand: '#0f62fe',
} as const;

/**
 * Layer Colors (White Theme)
 * For creating visual hierarchy with overlapping elements
 */
export const layerColors = {
  layer01: '#f4f4f4',
  layer02: '#ffffff',
  layer03: '#f4f4f4',
  layerHover01: '#e8e8e8',
  layerHover02: '#e8e8e8',
  layerHover03: '#e8e8e8',
  layerActive01: '#c6c6c6',
  layerActive02: '#c6c6c6',
  layerActive03: '#c6c6c6',
  layerSelected01: '#e0e0e0',
  layerSelected02: '#e0e0e0',
  layerSelected03: '#e0e0e0',
  layerSelectedHover01: '#d1d1d1',
  layerSelectedHover02: '#d1d1d1',
  layerSelectedHover03: '#d1d1d1',
  layerAccent01: '#e0e0e0',
  layerAccent02: '#e0e0e0',
  layerAccent03: '#e0e0e0',
} as const;

/**
 * Text Colors (White Theme)
 */
export const textColors = {
  textPrimary: '#161616',
  textSecondary: '#525252',
  textPlaceholder: '#a8a8a8',
  textHelper: '#6f6f6f',
  textError: '#da1e28',
  textInverse: '#ffffff',
  textOnColor: '#ffffff',
  textOnColorDisabled: '#8d8d8d',
  textDisabled: 'rgba(22, 22, 22, 0.25)',
} as const;

/**
 * Link Colors
 */
export const linkColors = {
  linkPrimary: '#0f62fe',
  linkPrimaryHover: '#0043ce',
  linkSecondary: '#0043ce',
  linkInverse: '#78a9ff',
  linkVisited: '#8a3ffc',
} as const;

/**
 * Icon Colors
 */
export const iconColors = {
  iconPrimary: '#161616',
  iconSecondary: '#525252',
  iconInverse: '#ffffff',
  iconOnColor: '#ffffff',
  iconOnColorDisabled: '#8d8d8d',
  iconDisabled: 'rgba(22, 22, 22, 0.25)',
} as const;

/**
 * Border Colors
 */
export const borderColors = {
  borderSubtle00: '#e0e0e0',
  borderSubtle01: '#c6c6c6',
  borderSubtle02: '#e0e0e0',
  borderSubtle03: '#c6c6c6',
  borderStrong01: '#8d8d8d',
  borderStrong02: '#8d8d8d',
  borderStrong03: '#8d8d8d',
  borderInverse: '#161616',
  borderInteractive: '#0f62fe',
  borderDisabled: 'rgba(22, 22, 22, 0.25)',
} as const;

/**
 * Focus Colors
 */
export const focusColors = {
  focus: '#0f62fe',
  focusInset: '#ffffff',
  focusInverse: '#ffffff',
} as const;

/**
 * Interactive Colors (Buttons, Links, etc.)
 */
export const interactiveColors = {
  interactive: '#0f62fe',
  interactiveHover: '#0043ce',
  interactiveActive: '#002d9c',
  interactiveSelected: '#002d9c',
  interactiveDisabled: '#c6c6c6',
} as const;

/**
 * Notification Colors
 */
export const notificationColors = {
  // Error notification
  notificationErrorBackground: '#fff1f1',
  notificationErrorBorder: 'rgba(218, 30, 40, 0.5)',
  
  // Success notification
  notificationSuccessBackground: '#defbe6',
  notificationSuccessBorder: 'rgba(36, 161, 72, 0.5)',
  
  // Warning notification
  notificationWarningBackground: '#fcf4d6',
  notificationWarningBorder: 'rgba(241, 194, 27, 0.3)',
  
  // Info notification
  notificationInfoBackground: '#edf5ff',
  notificationInfoBorder: 'rgba(0, 67, 206, 0.5)',
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font Families - Cadence Typography System
 * Inter (Sans) - Primary workhorse for task-dense UI (~90% of text)
 * Lora (Serif) - Breathing room moments (3-5% of text)
 * Roboto Mono - Numerical precision (dollar amounts, time values)
 */
export const fontFamilies = {
  sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
  serif: '"Lora", Georgia, serif',
  mono: '"Roboto Mono", "Menlo", "Consolas", monospace',
} as const;

/**
 * Cadence Font Family Roles
 */
export const cadenceFontRoles = {
  inter: {
    family: '"Inter", "Helvetica Neue", Arial, sans-serif',
    role: 'Sans-serif workhorse',
    usage: 'Task execution, data scanning, form interaction, schedule management',
  },
  lora: {
    family: '"Lora", Georgia, serif',
    role: 'Serif accent',
    usage: 'Morning Briefing header, Tradeoff Card headlines, empty states, AI confidence basis',
  },
  robotoMono: {
    family: '"Roboto Mono", "Menlo", "Consolas", monospace',
    role: 'Monospace precision',
    usage: 'Dollar amounts, penalty figures, time values, countdowns',
  },
} as const;

/**
 * Font Weights - Cadence Semantic Weights
 * Inverse relationship: small headings use heavier weight, large headings use lighter weight
 */
export const fontWeights = {
  light: 300,     // Serif accent, large display headings
  regular: 400,   // Body text, mid-size headings
  medium: 500,    // Overlines (structural furniture)
  semibold: 600,  // Small headings, emphasis (signals importance)
  bold: 700,      // Reserved for extreme emphasis
} as const;

/**
 * Font Sizes (in rem)
 * Based on a 16px base
 */
export const fontSizes = {
  caption01: '0.75rem',    // 12px
  caption02: '0.875rem',   // 14px
  label01: '0.75rem',      // 12px
  label02: '0.875rem',     // 14px
  helperText01: '0.75rem', // 12px
  helperText02: '0.875rem',// 14px
  bodyCompact01: '0.875rem', // 14px
  bodyCompact02: '1rem',     // 16px
  body01: '0.875rem',        // 14px
  body02: '1rem',            // 16px
  headingCompact01: '0.875rem', // 14px
  headingCompact02: '1rem',     // 16px
  heading01: '0.875rem',     // 14px
  heading02: '1rem',         // 16px
  heading03: '1.25rem',      // 20px
  heading04: '1.75rem',      // 28px
  heading05: '2rem',         // 32px
  heading06: '2.625rem',     // 42px
  heading07: '3.375rem',     // 54px
  fluidHeading03: 'clamp(1.25rem, 1.25rem + 0vw, 1.25rem)',
  fluidHeading04: 'clamp(1.75rem, 1.5rem + 0.5vw, 2rem)',
  fluidHeading05: 'clamp(2rem, 1.5rem + 1vw, 2.625rem)',
  fluidHeading06: 'clamp(2.625rem, 1.875rem + 1.5vw, 3.375rem)',
  fluidDisplay01: 'clamp(2.625rem, 1.625rem + 2vw, 4.25rem)',
  fluidDisplay02: 'clamp(2.625rem, 1.125rem + 3vw, 5.25rem)',
  fluidDisplay03: 'clamp(2.625rem, 0.125rem + 5vw, 7.625rem)',
  fluidDisplay04: 'clamp(2.625rem, -1.375rem + 8vw, 9.75rem)',
} as const;

/**
 * Line Heights
 */
export const lineHeights = {
  tight: 1.125,   // 18px for 16px base
  normal: 1.25,   // 20px for 16px base  
  relaxed: 1.375, // 22px for 16px base
  loose: 1.5,     // 24px for 16px base
  body: 1.43,     // Standard body text
  heading: 1.25,  // Headings
} as const;

/**
 * Letter Spacing
 */
export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.01em',
  wider: '0.02em',
  widest: '0.08em', // Used for all-caps text
} as const;

/**
 * Complete Typography Styles
 * Pre-composed typography tokens for consistent text styling
 */
export const typography = {
  // Utility styles
  code01: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.75rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.34,
    letterSpacing: '0.32px',
  },
  code02: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.875rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.43,
    letterSpacing: '0.32px',
  },
  // Label styles
  label01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.75rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.34,
    letterSpacing: '0.32px',
  },
  label02: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.29,
    letterSpacing: '0.16px',
  },
  // Helper text
  helperText01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.75rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.34,
    letterSpacing: '0.32px',
  },
  helperText02: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.29,
    letterSpacing: '0.16px',
  },
  // Legal text
  legal01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.75rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.34,
    letterSpacing: '0.32px',
  },
  legal02: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.29,
    letterSpacing: '0.16px',
  },
  // Body styles - compact
  bodyCompact01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.29,
    letterSpacing: '0.16px',
  },
  bodyCompact02: {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.375,
    letterSpacing: '0',
  },
  // Body styles
  body01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.43,
    letterSpacing: '0.16px',
  },
  body02: {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  // Heading styles - compact
  headingCompact01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.semibold,
    lineHeight: 1.29,
    letterSpacing: '0.16px',
  },
  headingCompact02: {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.semibold,
    lineHeight: 1.375,
    letterSpacing: '0',
  },
  // Heading styles
  heading01: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.semibold,
    lineHeight: 1.43,
    letterSpacing: '0.16px',
  },
  heading02: {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.semibold,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  heading03: {
    fontFamily: fontFamilies.sans,
    fontSize: '1.25rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.4,
    letterSpacing: '0',
  },
  heading04: {
    fontFamily: fontFamilies.sans,
    fontSize: '1.75rem',
    fontWeight: fontWeights.regular,
    lineHeight: 1.29,
    letterSpacing: '0',
  },
  heading05: {
    fontFamily: fontFamilies.sans,
    fontSize: '2rem',
    fontWeight: fontWeights.light,
    lineHeight: 1.25,
    letterSpacing: '0',
  },
  heading06: {
    fontFamily: fontFamilies.sans,
    fontSize: '2.625rem',
    fontWeight: fontWeights.light,
    lineHeight: 1.199,
    letterSpacing: '0',
  },
  heading07: {
    fontFamily: fontFamilies.sans,
    fontSize: '3.375rem',
    fontWeight: fontWeights.light,
    lineHeight: 1.19,
    letterSpacing: '0',
  },
} as const;

/**
 * Cadence-Specific Typography Tokens
 * Custom tokens for AI-native capacity governance interface
 */
export const cadenceTypography = {
  // Utility - Overlines
  cadenceOverline: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.6875rem', // 11px
    fontWeight: fontWeights.medium,
    lineHeight: 1.45,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    description: 'Category labels: ROLE, CLIENT, DEADLINE TYPE, SOURCE',
  },
  cadenceOverlineEmphasis: {
    fontFamily: fontFamilies.sans,
    fontSize: '0.6875rem', // 11px
    fontWeight: fontWeights.semibold,
    lineHeight: 1.45,
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    description: 'Urgent labels: HARD DEADLINE, AT RISK, PENALTY',
  },
  
  // Serif Accent Tokens (Lora) - 3-5% of UI
  cadenceGreeting: {
    fontFamily: fontFamilies.serif,
    fontSize: '1.75rem', // 28px
    fontWeight: fontWeights.light,
    lineHeight: 1.29,
    letterSpacing: '0',
    description: 'Morning Briefing header ("Tuesday, April 8"). One instance per session.',
  },
  cadenceConsequence: {
    fontFamily: fontFamilies.serif,
    fontSize: '1.25rem', // 20px
    fontWeight: fontWeights.regular,
    lineHeight: 1.4,
    letterSpacing: '0',
    description: 'Tradeoff Card headline ("Adding X puts Y at risk"). Max one on screen.',
  },
  cadenceEmptyState: {
    fontFamily: fontFamilies.serif,
    fontSize: '1.375rem', // 22px
    fontWeight: fontWeights.regular,
    lineHeight: 1.36,
    letterSpacing: '0',
    description: 'Empty state headings, first-run orientation, onboarding messages.',
  },
  cadenceAiAside: {
    fontFamily: fontFamilies.serif,
    fontSize: '0.875rem', // 14px
    fontWeight: fontWeights.regular,
    lineHeight: 1.43,
    letterSpacing: '0',
    fontStyle: 'italic' as const,
    description: 'AI confidence basis ("First time seeing this client"). Advisory tone.',
  },
  
  // Monospace Data Tokens (Roboto Mono)
  cadenceMonoData: {
    fontFamily: fontFamilies.mono,
    fontSize: '0.8125rem', // 13px
    fontWeight: fontWeights.regular,
    lineHeight: 1.38,
    letterSpacing: '0',
    description: 'Dollar amounts, time durations, countdowns. Tabular alignment.',
  },
  cadenceMonoDataLg: {
    fontFamily: fontFamilies.mono,
    fontSize: '1.25rem', // 20px
    fontWeight: fontWeights.regular,
    lineHeight: 1.4,
    letterSpacing: '0',
    description: 'Large data displays: Capacity Thermometer (6.5/8h), countdown timer.',
  },
  cadenceMonoPenalty: {
    fontFamily: fontFamilies.mono,
    fontSize: '1rem', // 16px
    fontWeight: fontWeights.regular,
    lineHeight: 1.375,
    letterSpacing: '0',
    description: 'Penalty dollar amounts. Always paired with $support-error (red).',
  },
} as const;

/**
 * Cadence Type Sets
 * Productive (~85%): Task execution, data scanning, schedule management
 * Expressive (~15%): Orientation, reading, deciding, pausing
 */
export const cadenceTypeSets = {
  productive: {
    baseSize: '14px',
    description: 'Task-dense UI: Tetris Timeline, Pulse Widget, form inputs, navigation',
    tokens: ['bodyCompact01', 'headingCompact01', 'label01', 'cadenceOverline', 'cadenceMonoData'],
  },
  expressive: {
    baseSize: '16px',
    description: 'Breathing room: Morning Briefing, Tradeoff Cards, empty states',
    tokens: ['body02', 'heading02', 'cadenceGreeting', 'cadenceConsequence', 'cadenceAiAside'],
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing Scale
 * Based on a 2px grid (mini unit) and 8px base unit
 * Tailwind-compatible naming with Carbon values
 */
export const spacing = {
  // Mini unit scale (2px increments)
  '01': '0.125rem',  // 2px  - $spacing-01
  '02': '0.25rem',   // 4px  - $spacing-02
  '03': '0.5rem',    // 8px  - $spacing-03
  '04': '0.75rem',   // 12px - $spacing-04
  '05': '1rem',      // 16px - $spacing-05
  '06': '1.5rem',    // 24px - $spacing-06
  '07': '2rem',      // 32px - $spacing-07
  '08': '2.5rem',    // 40px - $spacing-08
  '09': '3rem',      // 48px - $spacing-09
  '10': '4rem',      // 64px - $spacing-10
  '11': '5rem',      // 80px - $spacing-11
  '12': '6rem',      // 96px - $spacing-12
  '13': '10rem',     // 160px - $spacing-13
} as const;

/**
 * Spacing in pixels for reference
 */
export const spacingPx = {
  '01': 2,
  '02': 4,
  '03': 8,
  '04': 12,
  '05': 16,
  '06': 24,
  '07': 32,
  '08': 40,
  '09': 48,
  '10': 64,
  '11': 80,
  '12': 96,
  '13': 160,
} as const;

/**
 * Layout spacing for larger structural elements
 */
export const layoutSpacing = {
  '01': '1rem',    // 16px
  '02': '1.5rem',  // 24px
  '03': '2rem',    // 32px
  '04': '3rem',    // 48px
  '05': '4rem',    // 64px
  '06': '6rem',    // 96px
  '07': '10rem',   // 160px
} as const;

/**
 * Container widths
 */
export const containerWidths = {
  sm: '672px',
  md: '1056px',
  lg: '1312px',
  xlg: '1584px',
  max: '1920px',
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

/**
 * Border Radius
 * Carbon uses minimal border radius for a clean, professional look
 */
export const borderRadius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
  // Carbon-specific
  pill: '9999px',
  button: '0', // Carbon buttons are typically square
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Box Shadows
 * Carbon uses subtle shadows for elevation
 */
export const shadows = {
  none: 'none',
  
  // Raised shadows (for cards, dropdowns)
  raised: '0 2px 6px 0 rgba(0, 0, 0, 0.3)',
  
  // Overlay shadows (for modals, popovers)
  overlay: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
  
  // Sticky nav shadows
  stickyNav: '0 2px 6px 0 rgba(0, 0, 0, 0.3)',
  
  // Temporary nav shadows  
  temporaryNav: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
  
  // Contextual shadows (for tooltips)
  context: '0 2px 6px 0 rgba(0, 0, 0, 0.2)',
  
  // Focus ring (used with focus state)
  focusRing: '0 0 0 2px #0f62fe',
  focusRingInset: 'inset 0 0 0 2px #0f62fe',
  
  // Alias names for common use
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  md: '0 2px 6px 0 rgba(0, 0, 0, 0.3)',
  lg: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
  xl: '0 8px 16px 0 rgba(0, 0, 0, 0.3)',
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Breakpoints
 * Carbon's responsive breakpoints aligned with Tailwind conventions
 */
export const breakpoints = {
  sm: '320px',   // Small (mobile)
  md: '672px',   // Medium (tablet)
  lg: '1056px',  // Large (desktop)
  xlg: '1312px', // Extra large (wide desktop)
  max: '1584px', // Maximum width
} as const;

/**
 * Breakpoints as numbers (in pixels) for JavaScript calculations
 */
export const breakpointsPx = {
  sm: 320,
  md: 672,
  lg: 1056,
  xlg: 1312,
  max: 1584,
} as const;

/**
 * Media query helpers
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xlg: `@media (min-width: ${breakpoints.xlg})`,
  max: `@media (min-width: ${breakpoints.max})`,
  // Max-width queries
  smDown: `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  mdDown: `@media (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  lgDown: `@media (max-width: ${parseInt(breakpoints.xlg) - 1}px)`,
  xlgDown: `@media (max-width: ${parseInt(breakpoints.max) - 1}px)`,
} as const;

// =============================================================================
// MOTION/ANIMATION TOKENS
// =============================================================================

/**
 * Duration tokens for animations
 */
export const duration = {
  fast01: '70ms',   // Micro-interactions, icons, small elements
  fast02: '110ms',  // Micro-interactions, small expansion
  moderate01: '150ms', // Quick transitions, buttons
  moderate02: '240ms', // Standard transitions
  slow01: '400ms',  // Large expansion, important transitions
  slow02: '700ms',  // Background dimming
} as const;

/**
 * Easing tokens
 */
export const easing = {
  standard: {
    productive: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
    expressive: 'cubic-bezier(0.4, 0.14, 0.3, 1)',
  },
  entrance: {
    productive: 'cubic-bezier(0, 0, 0.38, 0.9)',
    expressive: 'cubic-bezier(0, 0, 0.3, 1)',
  },
  exit: {
    productive: 'cubic-bezier(0.2, 0, 1, 0.9)',
    expressive: 'cubic-bezier(0.4, 0.14, 1, 1)',
  },
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-index scale for layering UI elements
 */
export const zIndex = {
  hidden: -1,
  default: 0,
  dropdown: 9000,
  sticky: 9100,
  fixed: 9200,
  modalBackdrop: 9300,
  modal: 9400,
  popover: 9500,
  tooltip: 9600,
  toast: 9700,
} as const;

// =============================================================================
// OPACITY TOKENS
// =============================================================================

/**
 * Opacity values
 */
export const opacity = {
  disabled: 0.5,
  hover: 0.12,
  active: 0.5,
  selected: 0.2,
  selectedHover: 0.32,
} as const;

// =============================================================================
// ICON SIZE TOKENS
// =============================================================================

/**
 * Icon sizes
 */
export const iconSizes = {
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
} as const;

// =============================================================================
// COMBINED THEME EXPORT
// =============================================================================

/**
 * Complete design tokens object
 * Use this for accessing all tokens in a single import
 */
export const designTokens = {
  colors: {
    blue: blueColors,
    gray: grayColors,
    coolGray: coolGrayColors,
    warmGray: warmGrayColors,
    purple: purpleColors,
    cyan: cyanColors,
    teal: tealColors,
    green: greenColors,
    red: redColors,
    orange: orangeColors,
    yellow: yellowColors,
    magenta: magentaColors,
    support: supportColors,
    background: backgroundColors,
    layer: layerColors,
    text: textColors,
    link: linkColors,
    icon: iconColors,
    border: borderColors,
    focus: focusColors,
    interactive: interactiveColors,
    notification: notificationColors,
  },
  typography: {
    fontFamilies,
    fontWeights,
    fontSizes,
    lineHeights,
    letterSpacing,
    styles: typography,
  },
  spacing,
  spacingPx,
  layoutSpacing,
  containerWidths,
  borderRadius,
  shadows,
  breakpoints,
  breakpointsPx,
  mediaQueries,
  duration,
  easing,
  zIndex,
  opacity,
  iconSizes,
} as const;

export default designTokens;
