import type { ViewStyle, TextStyle } from 'react-native';
import type { PressyColors } from './theme';

// ============================================================================
// Variant Presets
// ============================================================================

/**
 * Button style variants
 */
export type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost';

/**
 * Get styles for a variant
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
    default:
      return {
        container: { backgroundColor: colors.primary },
        text: { color: colors.primaryText },
      };
  }
};

// ============================================================================
// Shape Presets
// ============================================================================

/**
 * Button shape presets
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
// Shadow Presets
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
  // Use lighter shadow color for dark mode for visibility
  const shadowColor = isDark ? '#fff' : '#000';
  const baseOpacity = isDark ? 0.3 : 1;

  switch (shadow) {
    case 'none':
      return {};
    case 'sm':
      return {
        shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1 * baseOpacity,
        shadowRadius: 2,
        elevation: 2,
      };
    case 'md':
      return {
        shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15 * baseOpacity,
        shadowRadius: 4,
        elevation: 4,
      };
    case 'lg':
      return {
        shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2 * baseOpacity,
        shadowRadius: 8,
        elevation: 8,
      };
    default:
      return {};
  }
};

// ============================================================================
// Size Presets
// ============================================================================

/**
 * Button size presets
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl';

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
