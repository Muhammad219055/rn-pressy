import type { ColorValue } from 'react-native';

/**
 * Comprehensive color palette for all rn-pressy components
 * Single source of truth for theming across Pressy, DDown, Toggy, Chex, and Inpy
 */
export interface PressyColors {
  // ============================================================================
  // Button Variants (Pressy)
  // ============================================================================
  primary: ColorValue;
  primaryText: ColorValue;
  secondary: ColorValue;
  secondaryText: ColorValue;
  tertiary: ColorValue;
  tertiaryText: ColorValue;

  // Outline/Ghost variants
  outline: ColorValue;
  outlineBorder: ColorValue;
  outlineText: ColorValue;
  ghost: ColorValue;
  ghostText: ColorValue;

  // 3D variant
  '3d': ColorValue;
  '3dText': ColorValue;
  '3dEdge': ColorValue;
  '3dShadow': ColorValue;

  // ============================================================================
  // Dropdown Variants (DDown)
  // ============================================================================
  dropdownDefault: ColorValue;
  dropdownDefaultText: ColorValue;
  dropdownDefaultBorder: ColorValue;
  dropdownOutlined: ColorValue;
  dropdownOutlinedText: ColorValue;
  dropdownOutlinedBorder: ColorValue;
  dropdownFilled: ColorValue;
  dropdownFilledText: ColorValue;
  dropdownGhost: ColorValue;
  dropdownGhostText: ColorValue;
  dropdownGradientStart: ColorValue;
  dropdownGradientEnd: ColorValue;

  // ============================================================================
  // Toggle Variants (Toggy)
  // ============================================================================
  toggleActive: ColorValue;
  toggleInactive: ColorValue;
  toggleThumb: ColorValue;
  toggleTrack: ColorValue;

  // ============================================================================
  // Checkbox Variants (Chex)
  // ============================================================================
  checkboxPrimary: ColorValue;
  checkboxSecondary: ColorValue;
  checkboxBorder: ColorValue;

  // ============================================================================
  // Input Variants (Inpy)
  // ============================================================================
  inputBackground: ColorValue;
  inputText: ColorValue;
  inputBorder: ColorValue;
  inputFocus: ColorValue;
  inputPlaceholder: ColorValue;

  // ============================================================================
  // State Colors (Shared across all components)
  // ============================================================================
  disabled: ColorValue;
  disabledText: ColorValue;
  loader: ColorValue;
  success: ColorValue;
  successText: ColorValue;
  error: ColorValue;
  errorText: ColorValue;
  warning: ColorValue;
  warningText: ColorValue;
  info: ColorValue;
  infoText: ColorValue;

  // ============================================================================
  // Semantic Colors (Backgrounds, Borders, Text)
  // ============================================================================
  background: ColorValue;
  backgroundSecondary: ColorValue;
  surface: ColorValue;
  border: ColorValue;
  borderLight: ColorValue;
  text: ColorValue;
  textSecondary: ColorValue;
  textMuted: ColorValue;
}

/**
 * Default light theme colors - comprehensive palette for all components
 */
export const lightColors: PressyColors = {
  // Button Variants
  primary: '#6366f1',
  primaryText: '#ffffff',
  secondary: '#64748b',
  secondaryText: '#ffffff',
  tertiary: '#e2e8f0',
  tertiaryText: '#334155',
  outline: 'transparent',
  outlineBorder: '#6366f1',
  outlineText: '#6366f1',
  ghost: 'transparent',
  ghostText: '#6366f1',
  '3d': '#7c3aed',
  '3dText': '#ffffff',
  '3dEdge': '#5b21b6',
  '3dShadow': '#9ca3af',

  // Dropdown Variants
  dropdownDefault: '#ffffff',
  dropdownDefaultText: '#0f172a',
  dropdownDefaultBorder: '#e2e8f0',
  dropdownOutlined: 'transparent',
  dropdownOutlinedText: '#0f172a',
  dropdownOutlinedBorder: '#6366f1',
  dropdownFilled: '#f8fafc',
  dropdownFilledText: '#0f172a',
  dropdownGhost: 'transparent',
  dropdownGhostText: '#0f172a',
  dropdownGradientStart: '#6366f1',
  dropdownGradientEnd: '#8b5cf6',

  // Toggle Variants
  toggleActive: '#21cc4c',
  toggleInactive: '#b6b6b6',
  toggleThumb: '#ffffff',
  toggleTrack: '#e2e8f0',

  // Checkbox Variants
  checkboxPrimary: '#6366f1',
  checkboxSecondary: '#ffffff',
  checkboxBorder: '#d9d9d9',

  // Input Variants
  inputBackground: '#ffffff',
  inputText: '#111827',
  inputBorder: '#d1d5db',
  inputFocus: '#6366f1',
  inputPlaceholder: '#9ca3af',

  // State Colors
  disabled: '#e2e8f0',
  disabledText: '#94a3b8',
  loader: '#6366f1',
  success: '#22c55e',
  successText: '#ffffff',
  error: '#ef4444',
  errorText: '#ffffff',
  warning: '#f59e0b',
  warningText: '#ffffff',
  info: '#3b82f6',
  infoText: '#ffffff',

  // Semantic Colors
  background: '#ffffff',
  backgroundSecondary: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
};

/**
 * Default dark theme colors - comprehensive palette for all components
 */
export const darkColors: PressyColors = {
  // Button Variants
  primary: '#818cf8',
  primaryText: '#1f2937',
  secondary: '#94a3b8',
  secondaryText: '#1f2937',
  tertiary: '#374151',
  tertiaryText: '#e5e7eb',
  outline: 'transparent',
  outlineBorder: '#818cf8',
  outlineText: '#818cf8',
  ghost: 'transparent',
  ghostText: '#818cf8',
  '3d': '#a78bfa',
  '3dText': '#1f2937',
  '3dEdge': '#7c3aed',
  '3dShadow': '#4b5563',

  // Dropdown Variants
  dropdownDefault: '#1e293b',
  dropdownDefaultText: '#f8fafc',
  dropdownDefaultBorder: '#334155',
  dropdownOutlined: 'transparent',
  dropdownOutlinedText: '#f8fafc',
  dropdownOutlinedBorder: '#818cf8',
  dropdownFilled: '#0f172a',
  dropdownFilledText: '#f8fafc',
  dropdownGhost: 'transparent',
  dropdownGhostText: '#f8fafc',
  dropdownGradientStart: '#818cf8',
  dropdownGradientEnd: '#a78bfa',

  // Toggle Variants
  toggleActive: '#21cc4c',
  toggleInactive: '#6b7280',
  toggleThumb: '#ffffff',
  toggleTrack: '#374151',

  // Checkbox Variants
  checkboxPrimary: '#818cf8',
  checkboxSecondary: '#1f2937',
  checkboxBorder: '#4b5563',

  // Input Variants
  inputBackground: '#111827',
  inputText: '#f9fafb',
  inputBorder: '#374151',
  inputFocus: '#818cf8',
  inputPlaceholder: '#6b7280',

  // State Colors
  disabled: '#374151',
  disabledText: '#6b7280',
  loader: '#818cf8',
  success: '#4ade80',
  successText: '#064e3b',
  error: '#f87171',
  errorText: '#7f1d1d',
  warning: '#fbbf24',
  warningText: '#78350f',
  info: '#60a5fa',
  infoText: '#1e3a8a',

  // Semantic Colors
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  surface: '#1e293b',
  border: '#334155',
  borderLight: '#475569',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
};

/**
 * Complete theme object
 */
export interface PressyTheme {
  colors: PressyColors;
}

export const lightTheme: PressyTheme = {
  colors: lightColors,
};

export const darkTheme: PressyTheme = {
  colors: darkColors,
};

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Extend theme with custom colors
 * Allows developers to add custom variants or override existing colors
 * 
 * @example
 * ```tsx
 * const customTheme = extendTheme(lightTheme, {
 *   primary: '#ff6b6b',
 *   customVariant: '#00d4ff',
 *   customVariantText: '#ffffff'
 * });
 * ```
 */
export function extendTheme(
  baseTheme: PressyTheme,
  customColors: Partial<PressyColors> & Record<string, ColorValue>
): PressyTheme {
  return {
    colors: {
      ...baseTheme.colors,
      ...customColors,
    } as PressyColors,
  };
}

/**
 * Get color from theme with fallback
 * Useful for accessing custom colors or falling back to defaults
 */
export function getThemeColor(
  theme: PressyTheme,
  colorKey: keyof PressyColors | string,
  fallback?: ColorValue
): ColorValue {
  const colors = theme.colors as any;
  return colors[colorKey] ?? fallback ?? colors.primary;
}

/**
 * Create a custom variant color set
 * Helper for defining new button/component variants
 * 
 * @example
 * ```tsx
 * const dangerVariant = createVariant('#ef4444', '#ffffff');
 * // Returns: { background: '#ef4444', text: '#ffffff', border: '#ef4444' }
 * ```
 */
export function createVariant(
  background: ColorValue,
  text: ColorValue,
  border?: ColorValue
): { background: ColorValue; text: ColorValue; border: ColorValue } {
  return {
    background,
    text,
    border: border ?? background,
  };
}

/**
 * Interpolate between two colors based on a value (0-1)
 * Useful for animations and transitions
 * Note: Only works with hex colors
 */
export function interpolateColor(
  color1: string,
  color2: string,
  value: number
): string {
  // Simple hex interpolation
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  
  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  
  const r = Math.round(r1 + (r2 - r1) * value);
  const g = Math.round(g1 + (g2 - g1) * value);
  const b = Math.round(b1 + (b2 - b1) * value);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
