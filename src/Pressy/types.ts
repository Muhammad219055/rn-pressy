import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type React from 'react';
import type { Variant, Shape, Shadow, Size } from './presets';
import type { PressyColors, ThemeMode } from './theme';

// ============================================================================
// Core Types
// ============================================================================

/**
 * Vibration intensity options for haptic feedback.
 */
export type VibrationIntensity = boolean | 'light' | 'medium' | 'heavy';

/**
 * Icon position relative to the button text/children.
 */
export type IconPosition = 'left' | 'right';

/**
 * Swipe direction for swipeable buttons.
 */
export type SwipeDirection = 'left' | 'right';

// ============================================================================
// Props Interface
// ============================================================================

export interface PressyProps extends Omit<PressableProps, 'style'> {
  // ==========================================================================
  // Content
  // ==========================================================================

  /**
   * The text to display inside the button.
   */
  title?: string;

  /**
   * Content to render inside the button (alternative to `title`).
   */
  children?: React.ReactNode;

  // ==========================================================================
  // Callbacks
  // ==========================================================================

  /**
   * Called when the button is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Called when the button is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  /**
   * Delay before onLongPress is called (in ms).
   * @default 500
   */
  delayLongPress?: number;

  /**
   * Called when the button is double tapped.
   */
  onDoublePress?: () => void;

  /**
   * Time window for double press detection (in ms).
   * @default 300
   */
  doublePressDelay?: number;

  // ==========================================================================
  // Presets
  // ==========================================================================

  /**
   * Style variant preset.
   * @default 'primary'
   */
  variant?: Variant;

  /**
   * Button shape preset.
   * @default 'rounded'
   */
  shape?: Shape;

  /**
   * Shadow intensity.
   * @default 'none'
   */
  shadow?: Shadow;

  /**
   * Size preset.
   * @default 'md'
   */
  size?: Size;

  // ==========================================================================
  // Theming
  // ==========================================================================

  /**
   * Theme mode override. Uses context or auto-detection if not specified.
   */
  themeMode?: ThemeMode;

  /**
   * Custom colors to override the current theme.
   */
  colors?: Partial<PressyColors>;

  // ==========================================================================
  // Icons
  // ==========================================================================

  /**
   * Optional icon to display (SVG, Image, emoji, or any React component).
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon relative to the title/children.
   * @default 'left'
   */
  iconPosition?: IconPosition;

  /**
   * Spacing between icon and title (in pixels).
   * @default 8
   */
  iconSpacing?: number;

  // ==========================================================================
  // States
  // ==========================================================================

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * Opacity when the button is disabled.
   * @default 0.5
   */
  disabledOpacity?: number;

  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean;

  /**
   * Custom loader component.
   */
  loader?: React.ReactNode;

  // ==========================================================================
  // Haptics
  // ==========================================================================

  /**
   * Enable haptic/vibration feedback on press.
   */
  vibration?: VibrationIntensity;

  /**
   * Custom vibration duration in milliseconds (Android only).
   */
  vibrationDuration?: number;

  // ==========================================================================
  // Animation
  // ==========================================================================

  /**
   * Scale value when pressed.
   * @default 0.96
   */
  scaleValue?: number;

  /**
   * Opacity value when pressed.
   * @default 0.8
   */
  opacityValue?: number;

  /**
   * Animation speed (spring config speed).
   * @default 20
   */
  animationSpeed?: number;

  // ==========================================================================
  // Swipeable
  // ==========================================================================

  /**
   * Enable swipe-to-confirm mode.
   * @default false
   */
  swipeable?: boolean;

  /**
   * Direction to swipe for confirmation.
   * @default 'right'
   */
  swipeDirection?: SwipeDirection;

  /**
   * Content to show as swipe background (e.g., checkmark icon).
   */
  swipeContent?: React.ReactNode;

  /**
   * Called when swipe is completed.
   */
  onSwipeComplete?: () => void;

  /**
   * Threshold percentage to complete swipe (0-1).
   * @default 0.7
   */
  swipeThreshold?: number;

  /**
   * Success message shown when swipe completes.
   * @default 'Success!'
   */
  swipeSuccessText?: string;

  /**
   * Delay before resetting the swipe state (in ms).
   * Set to 0 to keep completed state until manually reset.
   * @default 1500
   */
  swipeResetDelay?: number;

  /**
   * Swipe animation variant.
   * - 'default': Success message pops up after swipe completes
   * - 'reveal': Success message is revealed progressively as you swipe
   * @default 'default'
   */
  swipeVariant?: 'default' | 'reveal';

  // ==========================================================================
  // Reveal-to-Press
  // ==========================================================================

  /**
   * Enable reveal-to-press mode (first tap reveals, second tap presses).
   * @default false
   */
  revealToPress?: boolean;

  /**
   * Content to show when revealed (before final press).
   */
  revealContent?: React.ReactNode;

  /**
   * Time before reveal state resets (in ms).
   * @default 3000
   */
  revealTimeout?: number;

  /**
   * Called when button is revealed (first tap).
   */
  onReveal?: () => void;

  // ==========================================================================
  // Success & Error States
  // ==========================================================================

  /**
   * Whether the button is in a success state.
   */
  isSuccess?: boolean;

  /**
   * Whether the button is in an error state.
   */
  isError?: boolean;

  /**
   * Configuration for success state style and animation.
   */
  successConfig?: {
    variant?: Variant;
    colors?: Partial<PressyColors>;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    /**
     * Animation to trigger on success.
     * @default 'glare'
     */
    animation?: 'pulse' | 'glare' | 'glow' | 'none';
  };

  /**
   * Configuration for error state style and animation.
   */
  errorConfig?: {
    variant?: Variant;
    colors?: Partial<PressyColors>;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    /**
     * Whether to trigger shake animation on error.
     * @default true
     */
    shake?: boolean;
  };

  // ==========================================================================
  // Animation Effects
  // ==========================================================================

  /**
   * Enable pulse/heartbeat animation to draw attention.
   * @default false
   */
  pulse?: boolean;

  /**
   * Pulse animation speed in milliseconds.
   * @default 1500
   */
  pulseSpeed?: number;

  /**
   * Pulse intensity (scale multiplier, e.g., 1.05 = 5% larger).
   * @default 1.05
   */
  pulseIntensity?: number;

  /**
   * Enable glare/shine effect moving across the button.
   * @default false
   */
  glare?: boolean;

  /**
   * Glare animation speed in milliseconds.
   * @default 2000
   */
  glareSpeed?: number;

  /**
   * Enable outer glow effect.
   * @default false
   */
  glow?: boolean;

  /**
   * Custom glow color (uses primary color if not specified).
   */
  glowColor?: string;

  /**
   * Glow animation speed in milliseconds.
   * @default 1500
   */
  glowSpeed?: number;

  // ==========================================================================
  // Liquid Glass Effect (iOS only)
  // ==========================================================================

  /**
   * Enable iOS liquid glass effect (iOS 18+ only).
   * Falls back to regular button on unsupported platforms.
   * @default false
   * @platform ios
   */
  liquidGlass?: boolean;

  /**
   * Liquid glass effect variant.
   * - 'clear': More transparent glass effect
   * - 'regular': Standard glass blur effect
   * - 'none': No glass effect
   * @default 'regular'
   * @platform ios
   */
  liquidGlassEffect?: 'clear' | 'regular' | 'none';

  /**
   * Overlay color tint for the liquid glass effect.
   * @platform ios
   */
  liquidGlassTintColor?: string;

  /**
   * Color scheme for liquid glass effect.
   * @default 'system'
   * @platform ios
   */
  liquidGlassColorScheme?: 'light' | 'dark' | 'system';

  /**
   * Enable touch interaction effects for liquid glass.
   * @default false
   * @platform ios
   */
  liquidGlassInteractive?: boolean;

  // ==========================================================================
  // Styling
  // ==========================================================================

  /**
   * Custom styles for the button container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom styles for the text inside the button.
   */
  textStyle?: StyleProp<TextStyle>;
}

// ============================================================================
// Ref Type for Imperative Methods
// ============================================================================

export interface PressyRef {
  /**
   * Trigger a shake animation (useful for error feedback).
   */
  shake: () => void;
}

// ============================================================================
// Re-exports
// ============================================================================

export type { Variant, Shape, Shadow, Size } from './presets';
export type { PressyColors, PressyTheme, ThemeMode } from './theme';
