import type { ViewStyle, TextStyle } from 'react-native';
import type { PressyColors } from './theme';

// ============================================================================
// Button Variant Presets (Pressy)
// ============================================================================

/**
 * Button style variants
 */
export type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | '3d';

/**
 * Get styles for a button variant
 */
export const getVariantStyles = (
  variant: Variant,
  colors: PressyColors
): { container: ViewStyle; text: TextStyle } => {
  switch (variant) {
    case 'primary':
      return {
        container: { backgroundColor: colors.primary },
        text: { color: colors.primaryText },
      };
    case 'secondary':
      return {
        container: { backgroundColor: colors.secondary },
        text: { color: colors.secondaryText },
      };
    case 'tertiary':
      return {
        container: { backgroundColor: colors.tertiary },
        text: { color: colors.tertiaryText },
      };
    case 'outline':
      return {
        container: {
          backgroundColor: colors.outline,
          borderWidth: 2,
          borderColor: colors.outlineBorder,
        },
        text: { color: colors.outlineText },
      };
    case 'ghost':
      return {
        container: { backgroundColor: colors.ghost },
        text: { color: colors.ghostText },
      };
    case '3d':
      return {
        container: { backgroundColor: colors['3d'] },
        text: { color: colors['3dText'] },
      };
    default:
      return {
        container: { backgroundColor: colors.primary },
        text: { color: colors.primaryText },
      };
  }
};

// ============================================================================
// Dropdown Variant Presets (DDown)
// ============================================================================

/**
 * Dropdown style variants
 */
export type DDownVariant = 'default' | 'outlined' | 'filled' | 'ghost' | 'gradient';

/**
 * Get styles for a dropdown variant
 */
export const getDDownVariantStyles = (
  variant: DDownVariant,
  colors: PressyColors
): { container: ViewStyle; text: TextStyle; border: ViewStyle } => {
  switch (variant) {
    case 'default':
      return {
        container: { backgroundColor: colors.dropdownDefault },
        text: { color: colors.dropdownDefaultText },
        border: { borderColor: colors.dropdownDefaultBorder, borderWidth: 1 },
      };
    case 'outlined':
      return {
        container: { backgroundColor: colors.dropdownOutlined },
        text: { color: colors.dropdownOutlinedText },
        border: { borderColor: colors.dropdownOutlinedBorder, borderWidth: 2 },
      };
    case 'filled':
      return {
        container: { backgroundColor: colors.dropdownFilled },
        text: { color: colors.dropdownFilledText },
        border: { borderWidth: 0 },
      };
    case 'ghost':
      return {
        container: { backgroundColor: colors.dropdownGhost },
        text: { color: colors.dropdownGhostText },
        border: { borderWidth: 0 },
      };
    case 'gradient':
      return {
        container: { backgroundColor: 'transparent' },
        text: { color: colors.dropdownDefaultText },
        border: { borderWidth: 0 },
      };
    default:
      return {
        container: { backgroundColor: colors.dropdownDefault },
        text: { color: colors.dropdownDefaultText },
        border: { borderColor: colors.dropdownDefaultBorder, borderWidth: 1 },
      };
  }
};

// ============================================================================
// Toggle Variant Presets (Toggy)
// ============================================================================

/**
 * Toggle style variants
 */
export type ToggyVariant =
  | 'classic'
  | 'solar'
  | 'slider'
  | 'elastic'
  | 'bouncer'
  | 'bouncer-fixed'
  | 'bouncer-push';

/**
 * Get colors for a toggle variant
 */
export const getToggyColors = (
  colors: PressyColors
): {
  active: string;
  inactive: string;
  thumb: string;
  track: string;
} => {
  return {
    active: colors.toggleActive as string,
    inactive: colors.toggleInactive as string,
    thumb: colors.toggleThumb as string,
    track: colors.toggleTrack as string,
  };
};

// ============================================================================
// Checkbox Variant Presets (Chex)
// ============================================================================

/**
 * Checkbox style variants
 */
export type ChexVariant =
  | 'classic'
  | 'ripple'
  | 'flip'
  | 'circle-path'
  | 'svg-stroke'
  | 'morph';

/**
 * Get colors for a checkbox variant
 */
export const getChexColors = (
  colors: PressyColors
): {
  primary: string;
  secondary: string;
  border: string;
} => {
  return {
    primary: colors.checkboxPrimary as string,
    secondary: colors.checkboxSecondary as string,
    border: colors.checkboxBorder as string,
  };
};

// ============================================================================
// Input Variant Presets (Inpy)
// ============================================================================

/**
 * Input style variants
 */
export type InpyVariant = 'outlined' | 'filled' | 'underlined' | 'ghost';

/**
 * Get styles for an input variant
 */
export const getInpyVariantStyles = (
  variant: InpyVariant,
  colors: PressyColors
): {
  container: ViewStyle;
  text: TextStyle;
  border: ViewStyle;
  focus: { borderColor: string };
} => {
  switch (variant) {
    case 'outlined':
      return {
        container: { backgroundColor: colors.inputBackground },
        text: { color: colors.inputText },
        border: { borderWidth: 2, borderColor: colors.inputBorder },
        focus: { borderColor: colors.inputFocus as string },
      };
    case 'filled':
      return {
        container: { backgroundColor: colors.inputBackground },
        text: { color: colors.inputText },
        border: { borderWidth: 0, borderBottomWidth: 2, borderColor: colors.inputBorder },
        focus: { borderColor: colors.inputFocus as string },
      };
    case 'underlined':
      return {
        container: { backgroundColor: 'transparent' },
        text: { color: colors.inputText },
        border: { borderWidth: 0, borderBottomWidth: 2, borderColor: colors.inputBorder },
        focus: { borderColor: colors.inputFocus as string },
      };
    case 'ghost':
      return {
        container: { backgroundColor: 'transparent' },
        text: { color: colors.inputText },
        border: { borderWidth: 0 },
        focus: { borderColor: colors.inputFocus as string },
      };
    default:
      return {
        container: { backgroundColor: colors.inputBackground },
        text: { color: colors.inputText },
        border: { borderWidth: 2, borderColor: colors.inputBorder },
        focus: { borderColor: colors.inputFocus as string },
      };
  }
};

// ============================================================================
// Shape Presets (Shared)
// ============================================================================

/**
 * Component shape presets
 */
export type Shape = 'rounded' | 'pill' | 'circle' | 'square';

/**
 * Get border radius for a shape
 */
export const getShapeStyles = (shape: Shape, size: number): ViewStyle => {
  switch (shape) {
    case 'rounded':
      return { borderRadius: 12 };
    case 'pill':
      return { borderRadius: 9999 };
    case 'circle':
      return {
        borderRadius: size / 2,
        width: size,
        height: size,
        paddingHorizontal: 0,
        paddingVertical: 0,
      };
    case 'square':
      return {
        borderRadius: 0,
        width: size,
        height: size,
        paddingHorizontal: 0,
        paddingVertical: 0,
      };
    default:
      return { borderRadius: 12 };
  }
};

// ============================================================================
// Shadow Presets (Shared)
// ============================================================================

/**
 * Shadow intensity levels
 */
export type Shadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * Get shadow styles (cross-platform, with dark mode support)
 */
export const getShadowStyles = (
  shadow: Shadow,
  isDark: boolean = false
): ViewStyle => {
  const shadowColor = isDark ? '#fff' : '#000';
  switch (shadow) {
    case 'none':
      return {};
    case 'sm':
      return {
        shadowColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
      };
    case 'md':
      return {
          shadowColor,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,

      };
    case 'lg':
      return {
        shadowColor,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 16,
      };
    default:
      return {};
  }
};

// ============================================================================
// Size Presets (Shared)
// ============================================================================

/**
 * Component size presets
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Size configuration
 */
export interface SizeConfig {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
  minHeight: number;
}

/**
 * Get size configuration
 */
export const getSizeConfig = (size: Size): SizeConfig => {
  switch (size) {
    case 'xs':
      return {
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 12,
        iconSize: 14,
        minHeight: 32,
      };
    case 'sm':
      return {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 14,
        iconSize: 16,
        minHeight: 36,
      };
    case 'md':
      return {
        paddingVertical: 12,
        paddingHorizontal: 24,
        fontSize: 16,
        iconSize: 20,
        minHeight: 44,
      };
    case 'lg':
      return {
        paddingVertical: 16,
        paddingHorizontal: 32,
        fontSize: 18,
        iconSize: 24,
        minHeight: 52,
      };
    case 'xl':
      return {
        paddingVertical: 20,
        paddingHorizontal: 40,
        fontSize: 20,
        iconSize: 28,
        minHeight: 60,
      };
    default:
      return {
        paddingVertical: 12,
        paddingHorizontal: 24,
        fontSize: 16,
        iconSize: 20,
        minHeight: 44,
      };
  }
};

// ============================================================================
// State Styles (Shared)
// ============================================================================

/**
 * Get state-specific colors
 */
export const getStateColors = (
  state: 'success' | 'error' | 'warning' | 'info' | 'disabled',
  colors: PressyColors
): { background: string; text: string } => {
  switch (state) {
    case 'success':
      return {
        background: colors.success as string,
        text: colors.successText as string,
      };
    case 'error':
      return {
        background: colors.error as string,
        text: colors.errorText as string,
      };
    case 'warning':
      return {
        background: colors.warning as string,
        text: colors.warningText as string,
      };
    case 'info':
      return {
        background: colors.info as string,
        text: colors.infoText as string,
      };
    case 'disabled':
      return {
        background: colors.disabled as string,
        text: colors.disabledText as string,
      };
    default:
      return {
        background: colors.primary as string,
        text: colors.primaryText as string,
      };
  }
};
