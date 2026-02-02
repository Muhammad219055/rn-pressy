import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Checkbox variants
 */
export type ChexVariant =
  | 'classic'
  | 'ripple'
  | 'flip'
  | 'circle-path'
  | 'svg-stroke'
  | 'morph';

/**
 * Checkbox size presets
 */
export type ChexSize = 'sm' | 'md' | 'lg';

/**
 * Label position relative to checkbox
 */
export type LabelPosition = 'left' | 'right';

/**
 * Chex component props
 */
export interface ChexProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;

  /**
   * Called when the checkbox state changes
   */
  onValueChange: (checked: boolean) => void;

  /**
   * Visual variant of the checkbox
   * @default 'classic'
   */
  variant?: ChexVariant;

  /**
   * Size preset
   * @default 'md'
   */
  size?: ChexSize;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Primary color (checked state)
   * Falls back to theme primary color if not provided
   * @default theme.colors.primary
   */
  primaryColor?: string;

  /**
   * Secondary color (background/unchecked)
   * Falls back to theme-aware default (dark: '#1f2937', light: '#fff')
   * @default theme-aware
   */
  secondaryColor?: string;

  /**
   * Label text to display next to checkbox
   */
  label?: string;

  /**
   * Position of the label relative to checkbox
   * @default 'right'
   */
  labelPosition?: LabelPosition;

  /**
   * Custom styles for the label text
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Custom styles for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Text to show when flip variant is ON
   * @default 'Yeah!'
   */
  flipOnText?: string;

  /**
   * Text to show when flip variant is OFF
   * @default 'Nope'
   */
  flipOffText?: string;

  /**
   * Enable haptic feedback on toggle
   * @default true
   */
  vibration?: boolean;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}
