import type { ViewStyle, TextStyle, ColorValue } from 'react-native';

/**
 * Chex variant styles
 * - classic: Traditional rounded square checkbox
 * - circle: Circular checkbox
 * - bounce: Bouncy spring animation
 * - glow: Glowing effect when checked
 * - fill: Fills from center outward
 * - stamp: Stamped checkmark effect
 * - tick: Animated tick drawing
 * - bubble: Bubble pop effect
 */
export type ChexVariant = 'classic' | 'circle' | 'bounce' | 'glow' | 'fill' | 'stamp' | 'tick' | 'bubble';

/**
 * Chex size options
 */
export type ChexSize = 'sm' | 'md' | 'lg';

/**
 * Vibration intensity options
 */
export type VibrationIntensity = boolean | 'light' | 'medium' | 'heavy';

/**
 * Chex component props
 */
export interface ChexProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;

  /**
   * Callback when value changes
   */
  onValueChange: (checked: boolean) => void;

  /**
   * Visual variant
   * @default 'classic'
   */
  variant?: ChexVariant;

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: ChexSize;

  /**
   * Whether the checkbox is in indeterminate state
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Color when checked
   */
  checkedColor?: ColorValue;

  /**
   * Color when unchecked
   */
  uncheckedColor?: ColorValue;

  /**
   * Color of the checkmark
   */
  checkmarkColor?: ColorValue;

  /**
   * Border color when unchecked
   */
  borderColor?: ColorValue;

  /**
   * Haptic feedback on toggle
   * @default true
   */
  vibration?: VibrationIntensity;

  /**
   * Optional label text
   */
  label?: string;

  /**
   * Label position
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';

  /**
   * Label text style
   */
  labelStyle?: TextStyle;

  /**
   * Container style
   */
  style?: ViewStyle;

  /**
   * Custom checkmark icon
   */
  checkIcon?: React.ReactNode;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}
