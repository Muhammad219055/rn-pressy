import type { ColorValue } from 'react-native';

/**
 * Color palette for Pressy theming
 */
export interface PressyColors {
  // Variant colors
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

  // States
  disabled: ColorValue;
  disabledText: ColorValue;

  // Loader
  loader: ColorValue;

  // States
  success: ColorValue;
  successText: ColorValue;
  error: ColorValue;
  errorText: ColorValue;
}

/**
 * Default light theme colors
 */
export const lightColors: PressyColors = {
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

  disabled: '#e2e8f0',
  disabledText: '#94a3b8',

  loader: '#6366f1',

  success: '#22c55e',
  successText: '#ffffff',
  error: '#ef4444',
  errorText: '#ffffff',
};

/**
 * Default dark theme colors
 */
export const darkColors: PressyColors = {
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

  disabled: '#374151',
  disabledText: '#6b7280',

  loader: '#818cf8',

  success: '#4ade80',
  successText: '#064e3b',
  error: '#f87171',
  errorText: '#7f1d1d',
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
