import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import {
  lightTheme,
  darkTheme,
  extendTheme,
  getThemeColor,
  createVariant,
  type PressyTheme,
  type PressyColors,
  type ThemeMode,
} from './theme';

// Re-export theme utilities for convenience
export { extendTheme, getThemeColor, createVariant };

// ============================================================================
// Context
// ============================================================================

interface PressyContextValue {
  theme: PressyTheme;
  colors: PressyColors;
  mode: 'light' | 'dark';
}

const PressyContext = createContext<PressyContextValue | null>(null);

// ============================================================================
// Provider Props
// ============================================================================

export interface PressyProviderProps {
  /**
   * Theme mode: 'light', 'dark', or 'auto' (uses system preference)
   * @default 'auto'
   */
  mode?: ThemeMode;

  /**
   * Custom light theme colors (merged with defaults)
   */
  lightColors?: Partial<PressyColors>;

  /**
   * Custom dark theme colors (merged with defaults)
   */
  darkColors?: Partial<PressyColors>;

  /**
   * Custom complete theme (overrides mode-based selection)
   */
  customTheme?: PressyTheme;

  children: React.ReactNode;
}

// ============================================================================
// Provider Component
// ============================================================================

/**
 * PressyProvider - Provides theme context to all Pressy buttons.
 * Wrap your app or a section of it to apply consistent theming.
 *
 * @example
 * // Auto light/dark mode
 * <PressyProvider mode="auto">
 *   <App />
 * </PressyProvider>
 *
 * @example
 * // Custom colors
 * <PressyProvider
 *   mode="dark"
 *   darkColors={{ primary: '#ff6b6b' }}
 * >
 *   <App />
 * </PressyProvider>
 */
export const PressyProvider: React.FC<PressyProviderProps> = ({
  mode = 'auto',
  lightColors: customLightColors,
  darkColors: customDarkColors,
  customTheme,
  children,
}) => {
  const systemColorScheme = useColorScheme();

  const contextValue = useMemo<PressyContextValue>(() => {
    // If custom theme is provided, use it directly
    if (customTheme) {
      return {
        theme: customTheme,
        colors: customTheme.colors,
        mode: 'light', // Custom theme doesn't have a mode concept
      };
    }

    // Determine actual mode
    const actualMode: 'light' | 'dark' =
      mode === 'auto'
        ? systemColorScheme === 'dark'
          ? 'dark'
          : 'light'
        : mode;

    // Get base theme
    const baseTheme = actualMode === 'dark' ? darkTheme : lightTheme;

    // Merge with custom colors
    const customColors =
      actualMode === 'dark' ? customDarkColors : customLightColors;

    const mergedColors: PressyColors = customColors
      ? { ...baseTheme.colors, ...customColors }
      : baseTheme.colors;

    return {
      theme: { colors: mergedColors },
      colors: mergedColors,
      mode: actualMode,
    };
  }, [
    mode,
    systemColorScheme,
    customLightColors,
    customDarkColors,
    customTheme,
  ]);

  return (
    <PressyContext.Provider value={contextValue}>
      {children}
    </PressyContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

/**
 * usePressy - Access the current Pressy theme context.
 * Returns null if used outside of PressyProvider.
 */
export const usePressy = (): PressyContextValue | null => {
  return useContext(PressyContext);
};

/**
 * usePressyTheme - Access theme with fallback to system color scheme.
 * Can be used without PressyProvider (uses defaults with auto-detection).
 */
export const usePressyTheme = (): PressyContextValue => {
  const context = useContext(PressyContext);
  const systemColorScheme = useColorScheme();

  // If we have context, use it
  if (context) {
    return context;
  }

  // Otherwise, auto-detect and use defaults
  const mode: 'light' | 'dark' =
    systemColorScheme === 'dark' ? 'dark' : 'light';
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return {
    theme,
    colors: theme.colors,
    mode,
  };
};
