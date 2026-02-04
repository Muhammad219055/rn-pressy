import { Dimensions, Platform } from 'react-native';
import type { DDownVariant, DDownSize, DDownAnimationType } from './types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// ============================================================================
// SIZE PRESETS
// ============================================================================
export const sizePresets = {
  xs: {
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    borderRadius: 6,
    iconSize: 14,
    tagHeight: 20,
    tagPadding: 6,
  },
  sm: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    borderRadius: 8,
    iconSize: 16,
    tagHeight: 24,
    tagPadding: 8,
  },
  md: {
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    borderRadius: 12,
    iconSize: 18,
    tagHeight: 28,
    tagPadding: 10,
  },
  lg: {
    height: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    borderRadius: 14,
    iconSize: 20,
    tagHeight: 32,
    tagPadding: 12,
  },
  xl: {
    height: 60,
    paddingHorizontal: 24,
    paddingVertical: 18,
    fontSize: 18,
    borderRadius: 16,
    iconSize: 24,
    tagHeight: 36,
    tagPadding: 14,
  },
};

// ============================================================================
// SHAPE PRESETS
// ============================================================================
export const shapePresets: Record<string, (size: DDownSize) => number> = {
  rounded: (size: DDownSize) => sizePresets[size].borderRadius,
  square: () => 0,
  pill: (size: DDownSize) => sizePresets[size].height / 2,
  custom: () => 12,
};

// ============================================================================
// VARIANT STYLES
// ============================================================================
export const getVariantStyles = (
  variant: DDownVariant,
  themeColors: any, // PressyColors from theme
  gradientColors?: string[]
) => {
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: themeColors.dropdownOutlined,
        borderColor: themeColors.dropdownOutlinedBorder,
        borderWidth: 2,
        shadowOpacity: 0,
        elevation: 0,
      };

    case 'filled':
      return {
        backgroundColor: themeColors.dropdownFilled,
        borderColor: 'transparent',
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      };

    case 'ghost':
      return {
        backgroundColor: themeColors.dropdownGhost,
        borderColor: 'transparent',
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      };

    case 'gradient':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        // Gradient will be handled by LinearGradient component
        gradientColors: gradientColors || [
          themeColors.dropdownGradientStart,
          themeColors.dropdownGradientEnd
        ],
      };

    default: // 'default'
      return {
        backgroundColor: themeColors.dropdownDefault,
        borderColor: themeColors.dropdownDefaultBorder,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
      };
  }
};

// ============================================================================
// GLASSMORPHISM STYLES
// ============================================================================
export const getGlassmorphismStyles = (intensity: number = 20) => ({
  backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: `blur(${intensity}px)`, // iOS only
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 24,
  elevation: 8,
});

// ============================================================================
// NEUMORPHISM STYLES
// ============================================================================
export const getNeumorphismStyles = (isDark: boolean, size: DDownSize) => {
  const baseColor = isDark ? '#1e293b' : '#f1f5f9';
  const darkShadow = isDark ? '#0f172a' : '#d1d5db';
  const offset = sizePresets[size].height * 0.1;

  return {
    backgroundColor: baseColor,
    borderWidth: 0,
    shadowColor: darkShadow,
    shadowOffset: { width: offset, height: offset },
    shadowOpacity: 0.3,
    shadowRadius: offset * 2,
    elevation: offset,
    // Additional light shadow for neumorphism effect
    // This would need a custom implementation or library
  };
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================
export const getAnimationConfig = (
  type: DDownAnimationType,
  duration: number = 200,
  tension: number = 120,
  friction: number = 12
) => {
  switch (type) {
    case 'fade':
      return {
        duration,
        useNativeDriver: true,
        easing: 'ease-out',
      };

    case 'scale':
      return {
        duration,
        useNativeDriver: true,
        tension: tension * 1.5,
        friction: friction * 0.8,
      };

    case 'slide':
      return {
        duration: duration * 1.2,
        useNativeDriver: true,
        easing: 'ease-out',
      };

    case 'bounce':
      return {
        duration: duration * 1.5,
        useNativeDriver: true,
        tension: tension * 2,
        friction: friction * 0.6,
      };

    case 'spring':
    default:
      return {
        useNativeDriver: true,
        tension,
        friction,
      };
  }
};

// ============================================================================
// STAGGER ANIMATION HELPER
// ============================================================================
export const createStaggerAnimation = (
  items: any[],
  delay: number = 50,
  animationFunction: (index: number) => void
) => {
  items.forEach((_, index) => {
    setTimeout(() => {
      animationFunction(index);
    }, index * delay);
  });
};

// ============================================================================
// RIPPLE EFFECT HELPER
// ============================================================================
export const createRippleEffect = (
  x: number,
  y: number,
  color: string = 'rgba(0, 0, 0, 0.1)'
) => {
  // This would create a ripple effect at the touch coordinates
  // Implementation would depend on the ripple library or custom solution
  return {
    x,
    y,
    color,
    maxRadius: Math.max(screenWidth, screenHeight),
  };
};

// ============================================================================
// SHIMMER ANIMATION HELPER
// ============================================================================
export const getShimmerGradient = (isDark: boolean) => {
  const baseColor = isDark ? '#1e293b' : '#f1f5f9';
  const shimmerColor = isDark ? '#334155' : '#e2e8f0';
  
  return [
    baseColor,
    shimmerColor,
    baseColor,
  ];
};

// ============================================================================
// PARALLAX SCROLL HELPER
// ============================================================================
export const calculateParallaxOffset = (
  scrollY: number,
  itemIndex: number,
  factor: number = 0.5
) => {
  return scrollY * factor * (itemIndex + 1) * 0.1;
};

// ============================================================================
// FLOATING LABEL ANIMATION
// ============================================================================
export const getFloatingLabelAnimation = (
  hasValue: boolean,
  isFocused: boolean,
  size: DDownSize
) => {
  const baseSize = sizePresets[size];
  
  return {
    translateY: hasValue || isFocused ? -baseSize.height * 0.7 : 0,
    scale: hasValue || isFocused ? 0.85 : 1,
    color: isFocused ? 'primary' : 'placeholder',
  };
};

// ============================================================================
// PULSE ANIMATION HELPER
// ============================================================================
export const createPulseAnimation = (
  scale: number = 1.05,
  duration: number = 1000
) => ({
  scale: [1, scale, 1],
  duration,
  repeat: -1,
  useNativeDriver: true,
});

// ============================================================================
// BOUNCE ANIMATION HELPER
// ============================================================================
export const createBounceAnimation = (
  scale: number = 1.1,
  duration: number = 150
) => ({
  scale: [1, scale, 1],
  duration,
  useNativeDriver: true,
  easing: 'ease-out',
});

// ============================================================================
// THEME UTILITIES
// ============================================================================
export const generateColorVariants = (baseColor: string) => {
  // This would generate lighter/darker variants of the base color
  // For now, returning some common variants
  return {
    50: `${baseColor}0D`,   // 5% opacity
    100: `${baseColor}1A`,  // 10% opacity
    200: `${baseColor}33`,  // 20% opacity
    300: `${baseColor}4D`,  // 30% opacity
    400: `${baseColor}66`,  // 40% opacity
    500: baseColor,         // Base color
    600: `${baseColor}CC`,  // 80% opacity
    700: `${baseColor}B3`,  // 70% opacity
    800: `${baseColor}99`,  // 60% opacity
    900: `${baseColor}80`,  // 50% opacity
  };
};

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================
export const getResponsiveSize = (size: DDownSize, screenSize: 'small' | 'medium' | 'large') => {
  const multipliers = {
    small: 0.9,
    medium: 1,
    large: 1.1,
  };

  const baseSize = sizePresets[size];
  const multiplier = multipliers[screenSize];

  return {
    ...baseSize,
    height: baseSize.height * multiplier,
    fontSize: baseSize.fontSize * multiplier,
    paddingHorizontal: baseSize.paddingHorizontal * multiplier,
    paddingVertical: baseSize.paddingVertical * multiplier,
  };
};

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================
export const getAccessibilityColors = (isDark: boolean) => ({
  focus: isDark ? '#60a5fa' : '#3b82f6',
  error: isDark ? '#f87171' : '#ef4444',
  success: isDark ? '#4ade80' : '#22c55e',
  warning: isDark ? '#fbbf24' : '#f59e0b',
});

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================
export const shouldUseNativeDriver = (animationType: DDownAnimationType) => {
  // Some animations work better with native driver
  return ['fade', 'scale', 'spring'].includes(animationType);
};

export const getOptimalItemHeight = (size: DDownSize, hasDescription: boolean) => {
  const baseHeight = sizePresets[size].height;
  return hasDescription ? baseHeight * 1.6 : baseHeight;
};

// ============================================================================
// DDOWN TO PRESSY VARIANT MAPPING
// ============================================================================

/**
 * Maps DDown variant names to Pressy-compatible variant names.
 * This ensures the dropdown trigger (Pressy button) uses consistent styling.
 */
export type PressyVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';

export const mapDDownVariantToPressy = (ddownVariant: DDownVariant): PressyVariant => {
  switch (ddownVariant) {
    case 'outlined':
      return 'outline';
    case 'filled':
      return 'secondary';
    case 'ghost':
      return 'ghost';
    case 'gradient':
      return 'primary';
    case 'default':
    default:
      return 'tertiary'; // Neutral background that adapts to theme
  }
};