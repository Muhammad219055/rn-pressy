import type { ViewStyle, ColorValue } from 'react-native';

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
}
