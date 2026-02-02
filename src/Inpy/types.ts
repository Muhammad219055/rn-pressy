import type { 
  ViewStyle, 
  TextStyle, 
  ColorValue,
  TextInputProps as RNTextInputProps,
} from 'react-native';

/**
 * Inpy variant styles
 */
export type InpyVariant = 'outlined' | 'filled' | 'underlined' | 'ghost';

/**
 * Inpy size options
 */
export type InpySize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Inpy shape options
 */
export type InpyShape = 'rounded' | 'pill' | 'square';

/**
 * Vibration intensity options
 */
export type VibrationIntensity = boolean | 'light' | 'medium' | 'heavy';

/**
 * Inpy component props
 */
export interface InpyProps extends Omit<RNTextInputProps, 'style'> {
  /**
   * Current value
   */
  value: string;

  /**
   * Callback when text changes
   */
  onChangeText: (text: string) => void;

  /**
   * Visual variant
   * @default 'outlined'
   */
  variant?: InpyVariant;

  /**
   * Size of the input
   * @default 'md'
   */
  size?: InpySize;

  /**
   * Shape of the input
   * @default 'rounded'
   */
  shape?: InpyShape;

  /**
   * Floating label text (animates on focus/value)
   */
  label?: string;

  /**
   * Whether the input is in error state
   * @default false
   */
  error?: boolean | string;

  /**
   * Whether the input is in success state
   * @default false
   */
  success?: boolean;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon on the left side
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon on the right side
   */
  rightIcon?: React.ReactNode;

  /**
   * Show clear button when input has value
   * @default false
   */
  clearable?: boolean;

  /**
   * Custom clear icon
   */
  clearIcon?: React.ReactNode;

  /**
   * Focus color (border/label color when focused)
   */
  focusColor?: ColorValue;

  /**
   * Error color
   */
  errorColor?: ColorValue;

  /**
   * Success color
   */
  successColor?: ColorValue;

  /**
   * Border color
   */
  borderColor?: ColorValue;

  /**
   * Background color
   */
  backgroundColor?: ColorValue;

  /**
   * Text color
   */
  textColor?: ColorValue;

  /**
   * Placeholder text color
   */
  placeholderColor?: ColorValue;

  /**
   * Haptic feedback on focus
   * @default false
   */
  vibration?: VibrationIntensity;

  /**
   * Container style
   */
  style?: ViewStyle;

  /**
   * Input text style
   */
  inputStyle?: TextStyle;

  /**
   * Label text style
   */
  labelStyle?: TextStyle;

  /**
   * Error text style
   */
  errorStyle?: TextStyle;

  /**
   * Test ID for testing
   */
  testID?: string;
}

