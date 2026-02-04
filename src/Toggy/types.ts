import type { ViewStyle, ColorValue } from 'react-native';
import type { LiquidGlassEffect, LiquidGlassColorScheme } from '../LiquidGlass';

export type ToggyVariant = 
  | 'classic'       // iOS-like
  | 'solar'         // LED/Button style
  | 'slider'        // Rectangular slider
  | 'elastic'       // Morphing/Elastic
  | 'bouncer'       // Legacy/Default alias for bouncer-fixed
  | 'bouncer-fixed' // Fixed split track + inverted thumb
  | 'bouncer-push'; // Animated width track + color flip

export interface ToggyProps {
  /**
   * Current value of the toggle
   */
  value: boolean;

  /**
   * Callback when value changes
   */
  onValueChange: (value: boolean) => void;

  /**
   * Visual style variant
   * @default 'classic'
   */
  variant?: ToggyVariant;

  /**
   * Disable interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom track colors
   */
  trackColor?: {
    true?: ColorValue;
    false?: ColorValue;
  };

  /**
   * Custom thumb color
   */
  thumbColor?: ColorValue | { true: ColorValue; false: ColorValue };

  /**
   * LED/Active color for 'solar' and 'bouncer' variants
   */
  activeColor?: ColorValue;

  /**
   * Inactive color for variants
   */
  inactiveColor?: ColorValue;

  /**
   * Enable haptic feedback
   * @default true
   */
  vibration?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  // ============================================================================
  // LIQUID GLASS PROPS (iOS 26+)
  // ============================================================================

  /**
   * Enable iOS 26+ liquid glass effect
   * Falls back to regular styling on unsupported platforms
   * Requires @callstack/liquid-glass to be installed
   * @default false
   */
  liquidGlass?: boolean;

  /**
   * Make the glass view respond to touch interactions
   * Interactive views grow on touch and show a shimmer effect
   * @default false
   */
  liquidGlassInteractive?: boolean;

  /**
   * The liquid glass effect variant
   * - 'clear' - More transparent glass effect
   * - 'regular' - Standard glass blur effect
   * - 'none' - No glass effect (transparent view)
   * @default 'regular'
   */
  liquidGlassEffect?: LiquidGlassEffect;

  /**
   * Tint color applied to the glass effect
   */
  liquidGlassTintColor?: ColorValue;

  /**
   * Color scheme adaptation for the glass effect
   * @default 'system'
   */
  liquidGlassColorScheme?: LiquidGlassColorScheme;
}
