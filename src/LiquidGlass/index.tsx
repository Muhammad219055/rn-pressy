/**
 * Liquid Glass Integration Module
 * 
 * This module provides optional liquid glass effect support for iOS 26+
 * using @callstack/liquid-glass when available.
 * 
 * The liquid glass effect creates a native iOS frosted glass appearance
 * with interactive touch effects.
 */

import React from 'react';
import { View, Platform, type ViewProps, type ColorValue } from 'react-native';

// ============================================================================
// Types
// ============================================================================

export type LiquidGlassEffect = 'clear' | 'regular' | 'none';
export type LiquidGlassColorScheme = 'light' | 'dark' | 'system';

export interface LiquidGlassProps extends ViewProps {
  /**
   * Enable liquid glass effect.
   * On unsupported platforms/versions, falls back to a regular View.
   * @default false
   */
  liquidGlass?: boolean;

  /**
   * Make the view respond to user interactions.
   * Interactive views grow on touch and show a shimmer effect.
   * @default false
   */
  interactive?: boolean;

  /**
   * The liquid glass effect variant.
   * - 'clear' - More transparent glass effect
   * - 'regular' - Standard glass blur effect  
   * - 'none' - No glass effect (transparent view)
   * @default 'regular'
   */
  effect?: LiquidGlassEffect;

  /**
   * Tint color applied to the glass effect.
   * Accepts any React Native color format.
   */
  tintColor?: ColorValue;

  /**
   * Color scheme adaptation for the glass effect.
   * - 'light' - Light appearance
   * - 'dark' - Dark appearance
   * - 'system' - Follows system appearance
   * @default 'system'
   */
  colorScheme?: LiquidGlassColorScheme;

  /**
   * Fallback background color when liquid glass is not supported.
   * This is used on non-iOS platforms or iOS versions < 26.
   */
  fallbackBackgroundColor?: ColorValue;
}

// ============================================================================
// Liquid Glass Support Detection
// ============================================================================

let LiquidGlassView: React.ComponentType<any> | null = null;
let LiquidGlassContainerView: React.ComponentType<any> | null = null;
let liquidGlassSupported = false;

// Only attempt to load on iOS
if (Platform.OS === 'ios') {
  try {
    // Dynamically require the liquid glass library
    const liquidGlass = require('@callstack/liquid-glass');
    LiquidGlassView = liquidGlass.LiquidGlassView;
    LiquidGlassContainerView = liquidGlass.LiquidGlassContainerView;
    liquidGlassSupported = liquidGlass.isLiquidGlassSupported ?? false;
  } catch {
    // Library not installed or not available
    liquidGlassSupported = false;
  }
}

/**
 * Check if liquid glass effect is supported on the current platform.
 * Returns true only on iOS 26+ with the @callstack/liquid-glass library installed.
 */
export const isLiquidGlassSupported = liquidGlassSupported;

// ============================================================================
// Liquid Glass Wrapper Component
// ============================================================================

/**
 * A wrapper component that conditionally applies the iOS liquid glass effect.
 * 
 * When `liquidGlass` is true and the platform supports it, this renders
 * a LiquidGlassView with the iOS 26 frosted glass effect. Otherwise,
 * it falls back to a regular View with optional fallback styling.
 * 
 * @example
 * ```tsx
 * <LiquidGlassWrapper
 *   liquidGlass={true}
 *   effect="regular"
 *   interactive
 *   style={{ borderRadius: 12, padding: 16 }}
 *   fallbackBackgroundColor="rgba(255,255,255,0.8)"
 * >
 *   <Text>Frosted Glass Content</Text>
 * </LiquidGlassWrapper>
 * ```
 */
export const LiquidGlassWrapper: React.FC<LiquidGlassProps> = ({
  liquidGlass = false,
  interactive = false,
  effect = 'regular',
  tintColor,
  colorScheme = 'system',
  fallbackBackgroundColor,
  style,
  children,
  ...viewProps
}) => {
  // Use liquid glass if enabled and supported
  if (liquidGlass && isLiquidGlassSupported && LiquidGlassView) {
    return (
      <LiquidGlassView
        style={style}
        interactive={interactive}
        effect={effect}
        tintColor={tintColor}
        colorScheme={colorScheme}
        {...viewProps}
      >
        {children}
      </LiquidGlassView>
    );
  }

  // Fallback to regular View with optional background color
  const fallbackStyle = fallbackBackgroundColor && !isLiquidGlassSupported 
    ? [style, { backgroundColor: fallbackBackgroundColor }]
    : style;

  return (
    <View style={fallbackStyle} {...viewProps}>
      {children}
    </View>
  );
};

// ============================================================================
// Liquid Glass Container (for merging multiple glass elements)
// ============================================================================

export interface LiquidGlassContainerProps extends ViewProps {
  /**
   * The distance between child elements at which they begin
   * to merge their glass effects into a combined effect.
   * @default 0
   */
  spacing?: number;
}

/**
 * A container that allows multiple LiquidGlassView children to merge
 * their glass effects when placed close together.
 * 
 * @example
 * ```tsx
 * <LiquidGlassContainer spacing={20}>
 *   <LiquidGlassWrapper liquidGlass style={styles.item} />
 *   <LiquidGlassWrapper liquidGlass style={styles.item} />
 * </LiquidGlassContainer>
 * ```
 */
export const LiquidGlassContainer: React.FC<LiquidGlassContainerProps> = ({
  spacing = 0,
  children,
  ...viewProps
}) => {
  if (isLiquidGlassSupported && LiquidGlassContainerView) {
    return (
      <LiquidGlassContainerView spacing={spacing} {...viewProps}>
        {children}
      </LiquidGlassContainerView>
    );
  }

  return <View {...viewProps}>{children}</View>;
};

export default LiquidGlassWrapper;
