/**
 * Pressy - Advanced Button Component for React Native
 * 
 * A powerful, feature-rich button component with extensive customization options,
 * beautiful animations, and advanced interactions including:
 * - Multiple visual variants (primary, secondary, tertiary, outline, ghost)
 * - Size presets (sm, md, lg, xl)
 * - Shape options (rounded, pill, circle, square)
 * - Shadow levels (none, sm, md, lg)
 * - Loading, success, and error states with animations
 * - Advanced gestures (long press, double tap, swipe-to-confirm, reveal-to-press)
 * - Animation effects (pulse, glare, glow, shake)
 * - Haptic feedback support
 * - Full theming support with dark mode
 * - Accessibility compliant
 * 
 * @example
 * ```tsx
 * <Pressy
 *   title="Press Me"
 *   variant="primary"
 *   size="lg"
 *   shadow="md"
 *   onPress={() => console.log('Pressed!')}
 * />
 * ```
 * 
 * @see {@link ./README.md} for full documentation
 */

import {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Animated,
  Pressable,
  Text,
  Vibration,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  PanResponder,
  useColorScheme,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';
import type { PressyProps, PressyRef, VibrationIntensity } from './types';
import { usePressyTheme } from './PressyProvider';
import {
  getVariantStyles,
  getShapeStyles,
  getShadowStyles,
  getSizeConfig,
} from './presets';
import { lightColors, darkColors } from './theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ============================================================================
// Constants
// ============================================================================

const DEFAULTS = {
  scaleValue: 0.96,
  opacityValue: 0.8,
  animationSpeed: 20,
  iconSpacing: 8,
  disabledOpacity: 0.5,
  delayLongPress: 500,
  doublePressDelay: 300,
  swipeThreshold: 0.7,
  revealTimeout: 3000,
  pulseSpeed: 1500,
  pulseIntensity: 1.05,
  glareSpeed: 2000,
  glowSpeed: 1500,
} as const;

const VIBRATION_DURATION = {
  light: 10,
  medium: 25,
  heavy: 50,
} as const;

type VibrationLevel = keyof typeof VIBRATION_DURATION;

// ============================================================================
// Helpers
// ============================================================================

const getVibrationDuration = (
  intensity: VibrationIntensity,
  customDuration?: number
): number => {
  if (customDuration !== undefined) return customDuration;
  if (typeof intensity === 'boolean') return VIBRATION_DURATION.medium;
  return (
    VIBRATION_DURATION[intensity as VibrationLevel] ?? VIBRATION_DURATION.medium
  );
};

// ============================================================================
// Pressy Component
// ============================================================================

export const Pressy = forwardRef<PressyRef, PressyProps>((props, ref) => {
  const {
    // Content
    title,
    children,

    // Callbacks
    onPress,
    onLongPress,
    delayLongPress = DEFAULTS.delayLongPress,
    onDoublePress,
    doublePressDelay = DEFAULTS.doublePressDelay,

    // Presets
    variant = 'primary',
    shape = 'rounded',
    shadow = 'none',
    size = 'md',

    // Theming
    themeMode,
    colors: customColors,

    // Icons
    icon,
    iconPosition = 'left',
    iconSpacing = DEFAULTS.iconSpacing,

    // States
    disabled = false,
    disabledOpacity = DEFAULTS.disabledOpacity,
    isLoading = false,
    loader,
    isSuccess = false,
    isError = false,
    successConfig,
    errorConfig,

    // Haptics
    vibration,
    vibrationDuration,

    // Animation
    scaleValue = DEFAULTS.scaleValue,
    opacityValue = DEFAULTS.opacityValue,
    animationSpeed = DEFAULTS.animationSpeed,

    // Swipeable
    swipeable = false,
    swipeDirection = 'right',
    swipeContent,
    onSwipeComplete,
    swipeThreshold = DEFAULTS.swipeThreshold,

    // Reveal-to-Press
    revealToPress = false,
    revealContent,
    revealTimeout = DEFAULTS.revealTimeout,
    onReveal,

    // Animation Effects
    pulse = false,
    pulseSpeed = DEFAULTS.pulseSpeed,
    pulseIntensity = DEFAULTS.pulseIntensity,
    glare = false,
    glareSpeed = DEFAULTS.glareSpeed,
    glow = false,
    glowColor,
    glowSpeed = DEFAULTS.glowSpeed,

    // Styling
    style,
    textStyle,

    ...restProps
  } = props;

  // ==========================================================================
  // Theme & Colors
  // ==========================================================================

  const themeContext = usePressyTheme();
  const systemColorScheme = useColorScheme();

  const isDark = useMemo(() => {
    if (themeMode && themeMode !== 'auto') {
      return themeMode === 'dark';
    } else if (themeContext) {
      return themeContext.mode === 'dark';
    }
    return systemColorScheme === 'dark';
  }, [themeMode, themeContext, systemColorScheme]);

  // Merge default colors + custom colors + state-specific colors
  const resolvedColors = useMemo(() => {
    const baseColors = isDark ? darkColors : lightColors;
    let finalColors = customColors
      ? { ...baseColors, ...customColors }
      : baseColors;

    if (isSuccess && successConfig?.colors) {
      finalColors = { ...finalColors, ...successConfig.colors };
    } else if (isError && errorConfig?.colors) {
      finalColors = { ...finalColors, ...errorConfig.colors };
    }

    return finalColors;
  }, [
    isDark,
    customColors,
    isSuccess,
    isError,
    successConfig?.colors,
    errorConfig?.colors,
  ]);

  // ==========================================================================
  // Animation Refs
  // ==========================================================================

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glareAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-4)).current; // For 3D effect
  // State interpolation: 0 = Idle, 1 = Success, -1 = Error
  const stateAnim = useRef(new Animated.Value(0)).current;

  // ==========================================================================
  // State Animation Triggers
  // ==========================================================================

  // Auto-trigger shake on error
  useEffect(() => {
    if (isError && errorConfig?.shake !== false) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isError, errorConfig?.shake, shakeAnim]);

  // Auto-trigger glare/pulse/glow on success is handled by effective props below

  // ==========================================================================
  // Effective Props (Active State Overrides)
  // ==========================================================================

  // State Background Animation
  useEffect(() => {
    let toValue = 0;
    if (isSuccess) toValue = 1;
    else if (isError) toValue = -1;

    Animated.timing(stateAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false, // Color interpolation requires false
    }).start();
  }, [isSuccess, isError, stateAnim]);

  // Color Interpolation Targets
  const idleColor = useMemo(() => {
    const baseColors = isDark ? darkColors : lightColors;
    const finalColors = customColors
      ? { ...baseColors, ...customColors }
      : baseColors;
    // Get the base variant style WITHOUT state overrides
    const baseVariant = getVariantStyles(variant, finalColors);
    return baseVariant.container.backgroundColor as string;
  }, [isDark, customColors, variant]);

  const successColorVal = useMemo(() => {
    const baseColors = isDark ? darkColors : lightColors;
    let finalColors = customColors
       ? { ...baseColors, ...customColors }
       : baseColors;
    
    if (successConfig?.colors) {
        finalColors = { ...finalColors, ...successConfig.colors };
    }
    // Mix in default success color if not present in variant
    // Mix in default success color if not present in variant
    const sVariant = successConfig?.variant ?? variant;
    // If specific success config colors are provided, they are in finalColors.
    // We should compute the variant style using the success-merged colors.
    // NOTE: getVariantStyles uses specific keys like 'primary', 'secondary'. 
    // Ideally we want the EXACT color that would be rendered.
    // Simplified: Use the 'success' color from theme if not overridden, 
    // or if a specific variant is requested, use that.
    
    // Actually, let's trust resolvedColors logic but isolate it.
    // If isSuccess was true, what would resolvedColors be?
    const sMerged = successConfig?.colors ? { ...finalColors, ...successConfig.colors } : finalColors;
    return getVariantStyles(sVariant, sMerged).container.backgroundColor as string;
  }, [isDark, customColors, successConfig, variant]);

  const errorColorVal = useMemo(() => {
    const baseColors = isDark ? darkColors : lightColors;
    const finalColors = customColors
       ? { ...baseColors, ...customColors }
       : baseColors;
    
    const eMerged = errorConfig?.colors ? { ...finalColors, ...errorConfig.colors } : finalColors;
    const eVariant = errorConfig?.variant ?? variant;
    return getVariantStyles(eVariant, eMerged).container.backgroundColor as string;
  }, [isDark, customColors, errorConfig, variant]);

  const animatedBackgroundColor = stateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [errorColorVal, idleColor, successColorVal],
  });

  const effectiveVariant = isSuccess
    ? successConfig?.variant ?? variant
    : isError
    ? errorConfig?.variant ?? variant
    : variant;

  const effectivePulse =
    isSuccess && successConfig?.animation === 'pulse' ? true : pulse;
  const effectiveGlare =
    isSuccess && successConfig?.animation === 'glare' ? true : glare;
  const effectiveGlow =
    isSuccess && successConfig?.animation === 'glow' ? true : glow;

  // ==========================================================================
  // State
  // ==========================================================================

  const [buttonWidth, setButtonWidth] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [_isSwipeComplete, _setIsSwipeComplete] = useState(false);
  const lastTapRef = useRef(0);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine if button should be interactive
  const isDisabled = disabled || isLoading;

  // ==========================================================================
  // Imperative Methods (shake)
  // ==========================================================================

  useImperativeHandle(ref, () => ({
    shake: () => {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    },
  }));

  // ==========================================================================
  // Pulse Animation
  // ==========================================================================

  useEffect(() => {
    if (!effectivePulse) {
      pulseAnim.setValue(1);
      return;
    }

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: pulseIntensity,
          duration: pulseSpeed / 2,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: pulseSpeed / 2,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, [effectivePulse, pulseIntensity, pulseSpeed, pulseAnim]);

  // ==========================================================================
  // Glare Animation
  // ==========================================================================

  useEffect(() => {
    if (!effectiveGlare) {
      glareAnim.setValue(0);
      return;
    }

    const glareAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glareAnim, {
          toValue: 1,
          duration: glareSpeed,
          useNativeDriver: true,
        }),
        Animated.timing(glareAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    glareAnimation.start();
    return () => glareAnimation.stop();
  }, [effectiveGlare, glareSpeed, glareAnim]);

  // ==========================================================================
  // Glow Animation
  // ==========================================================================

  useEffect(() => {
    if (!effectiveGlow) {
      glowAnim.setValue(0.3);
      return;
    }

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: glowSpeed / 2,
          useNativeDriver: false, // shadowOpacity doesn't support native driver
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: glowSpeed / 2,
          useNativeDriver: false,
        }),
      ])
    );

    glowAnimation.start();
    return () => glowAnimation.stop();
  }, [effectiveGlow, glowSpeed, glowAnim]);

  // ==========================================================================
  // Preset Styles
  // ==========================================================================

  const sizeConfig = useMemo(() => getSizeConfig(size), [size]);

  const presetStyles = useMemo(() => {
    const variantStyles = getVariantStyles(effectiveVariant, resolvedColors);
    const shapeStyles = getShapeStyles(shape, sizeConfig.minHeight);
    const shadowStyles = getShadowStyles(shadow, isDark);

    return {
      container: {
        ...variantStyles.container,
        ...shapeStyles,
        // Don't include shadow styles here - they'll be applied to outer wrapper
        paddingVertical: sizeConfig.paddingVertical,
        paddingHorizontal: sizeConfig.paddingHorizontal,
        minHeight: sizeConfig.minHeight,
        // Don't set backgroundColor here - let the backgroundLayer handle it
        // This allows style prop to override if needed
      },
      shadow: shadowStyles, // Separate shadow styles for outer wrapper
      text: {
        ...variantStyles.text,
        fontSize: sizeConfig.fontSize,
        // Android text centering fixes
        textAlignVertical: 'center' as 'center',
        includeFontPadding: false,
      },
    };
  }, [effectiveVariant, shape, shadow, sizeConfig, resolvedColors, isDark]);

  // ==========================================================================
  // Layout
  // ==========================================================================

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setButtonWidth(event.nativeEvent.layout.width);
  }, []);

  // ==========================================================================
  // Press Animation
  // ==========================================================================

  const handlePressIn = useCallback(() => {
    if (isDisabled || swipeable) return;

    const is3DVariant = effectiveVariant === '3d';

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: is3DVariant ? 1 : scaleValue,
        useNativeDriver: true,
        speed: animationSpeed,
        bounciness: 0,
      }),
      Animated.timing(opacityAnim, {
        toValue: opacityValue,
        duration: 100,
        useNativeDriver: true,
      }),
      ...(is3DVariant
        ? [
            Animated.timing(translateYAnim, {
              toValue: -0,
              duration: 20,
              useNativeDriver: true,
            }),
          ]
        : []),
    ]).start();
  }, [
    isDisabled,
    swipeable,
    effectiveVariant,
    scaleAnim,
    scaleValue,
    animationSpeed,
    opacityAnim,
    opacityValue,
    translateYAnim,
  ]);

  const handlePressOut = useCallback(() => {
    if (isDisabled || swipeable) return;

    const is3DVariant = effectiveVariant === '3d';

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: animationSpeed,
        bounciness: 0,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      ...(is3DVariant
        ? [
            Animated.spring(translateYAnim, {
              toValue: -4,
              useNativeDriver: true,
              speed: animationSpeed,
              bounciness: 0,
            }),
          ]
        : []),
    ]).start();
  }, [isDisabled, swipeable, effectiveVariant, scaleAnim, animationSpeed, opacityAnim, translateYAnim]);

  // ==========================================================================
  // Haptic Helper
  // ==========================================================================

  const triggerHaptic = useCallback(() => {
    if (!vibration) return;
    if (Platform.OS === 'android') {
      Vibration.vibrate(getVibrationDuration(vibration, vibrationDuration));
    } else {
      Vibration.vibrate();
    }
  }, [vibration, vibrationDuration]);

  // ==========================================================================
  // Press Handler
  // ==========================================================================

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) return;

      // Reveal-to-press logic
      if (revealToPress) {
        if (!isRevealed) {
          setIsRevealed(true);
          onReveal?.();

          if (revealTimeoutRef.current) {
            clearTimeout(revealTimeoutRef.current);
          }

          revealTimeoutRef.current = setTimeout(() => {
            setIsRevealed(false);
          }, revealTimeout);

          return;
        } else {
          setIsRevealed(false);
          if (revealTimeoutRef.current) {
            clearTimeout(revealTimeoutRef.current);
          }
        }
      }

      // Double press detection
      const now = Date.now();
      if (onDoublePress && now - lastTapRef.current < doublePressDelay) {
        triggerHaptic();
        onDoublePress();
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;

      // Regular press
      triggerHaptic();
      onPress?.(event);
    },
    [
      isDisabled,
      revealToPress,
      isRevealed,
      onReveal,
      revealTimeout,
      onDoublePress,
      doublePressDelay,
      triggerHaptic,
      onPress,
    ]
  );

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) return;
      triggerHaptic();
      onLongPress?.(event);
    },
    [isDisabled, triggerHaptic, onLongPress]
  );

  // ==========================================================================
  // Swipeable Pan Responder
  // ==========================================================================

const panResponder = useMemo(() => {
    if (!swipeable) return null;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {

        if (vibration && Platform.OS !== 'web') {
          Vibration.vibrate(10);
        }
      },
      onPanResponderMove: (_, gestureState) => {
        const dx = gestureState.dx;
        const direction = swipeDirection === 'right' ? 1 : -1;
        const thumbWidth = sizeConfig.minHeight;
        const maxDrag = Math.max(0, buttonWidth - thumbWidth);
        
        // Calculate drag with direction
        let clampedDx = dx * direction;
        
        if (clampedDx < 0) {
          // Resistance when dragging before start
          clampedDx = clampedDx * 0.2;
        } else if (clampedDx > maxDrag) {
          // Resistance when dragging past end
          const overflow = clampedDx - maxDrag;
          clampedDx = maxDrag + (overflow * 0.2);
        }
        
        swipeAnim.setValue(Math.max(0, clampedDx));
      },
      onPanResponderRelease: (_, gestureState) => {
        const vx = gestureState.vx; // Velocity for momentum-based threshold
        const direction = swipeDirection === 'right' ? 1 : -1;
        const thumbWidth = sizeConfig.minHeight;
        const maxDrag = Math.max(0, buttonWidth - thumbWidth);
        const currentValue = (swipeAnim as any)._value;
        const clampedValue = Math.max(0, Math.min(currentValue, maxDrag));
        const progress = maxDrag > 0 ? clampedValue / maxDrag : 0;

        // Consider velocity for more natural feel
        const hasVelocity = Math.abs(vx) > 0.5;
        const velocityBoost = hasVelocity && vx * direction > 0 ? 0.15 : 0;
        const effectiveProgress = Math.min(1, progress + velocityBoost);

        if (effectiveProgress >= swipeThreshold) {
          // Complete the swipe with smooth animation
          Animated.spring(swipeAnim, {
            toValue: maxDrag,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
          }).start(() => {
            _setIsSwipeComplete(true);
            triggerHaptic();
            onSwipeComplete?.();
          });
        } else {
          // Snap back with elastic bounce
          Animated.spring(swipeAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    });
  }, [
    swipeable,
    swipeDirection,
    buttonWidth,
    swipeThreshold,
    swipeAnim,
    triggerHaptic,
    onSwipeComplete,
    sizeConfig.minHeight,
    vibration,
  ]);

  // ==========================================================================
  // Content Rendering
  // ==========================================================================

  const hasIcon = !!icon;
  const hasTitle = !!title;
  const hasChildren = !!children;
  const needsSpacing = hasIcon && (hasTitle || hasChildren);

  const renderIcon = useMemo(() => {
    if (!hasIcon) return null;

    const spacingStyle =
      needsSpacing && iconPosition === 'left'
        ? { marginRight: iconSpacing }
        : needsSpacing && iconPosition === 'right'
        ? { marginLeft: iconSpacing }
        : null;

    return <View style={spacingStyle}>{icon}</View>;
  }, [hasIcon, needsSpacing, iconPosition, iconSpacing, icon]);

  const renderContent = useMemo(() => {
    if (hasTitle) {
      // Merge config styles
      const configTextStyle = isSuccess
        ? successConfig?.textStyle
        : isError
        ? errorConfig?.textStyle
        : undefined;

      return (
        <Text
          style={[
            presetStyles.text,
            { fontWeight: '700' },
            textStyle,
            configTextStyle,
          ]}
        >
          {title}
        </Text>
      );
    }
    return children;
  }, [
    hasTitle,
    title,
    presetStyles.text,
    textStyle,
    children,
    isSuccess,
    isError,
    successConfig,
    errorConfig,
  ]);

  const renderLoader = useMemo(() => {
    if (!isLoading) return null;
    return (
      loader ?? (
        <ActivityIndicator
          color={presetStyles.text.color as string}
          size="small"
        />
      )
    );
  }, [isLoading, loader, presetStyles.text.color]);

  // Fixed: Reveal content maintains button structure
  const mainContent = useMemo(() => {
    if (isLoading) return renderLoader;

    // For reveal-to-press, show reveal content but maintain size
    if (revealToPress && isRevealed) {
      return (
        <View style={styles.revealContentWrapper}>
          {revealContent ?? (
            <Text style={[presetStyles.text, { fontWeight: '700' }]}>
              Confirm?
            </Text>
          )}
        </View>
      );
    }

    if (iconPosition === 'right') {
      return (
        <>
          {renderContent}
          {renderIcon}
        </>
      );
    }

    return (
      <>
        {renderIcon}
        {renderContent}
      </>
    );
  }, [
    isLoading,
    renderLoader,
    revealToPress,
    isRevealed,
    revealContent,
    presetStyles.text,
    iconPosition,
    renderContent,
    renderIcon,
  ]);

  // ==========================================================================
  // Glare Overlay
  // ==========================================================================

  const glareOverlay = useMemo(() => {
    if (!effectiveGlare) return null;

    const translateX = glareAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, buttonWidth + 100],
    });

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glareOverlay,
          {
            transform: [{ translateX }, { skewX: '-20deg' }],
          },
        ]}
      />
    );
  }, [effectiveGlare, glareAnim, buttonWidth]);

  // ==========================================================================
  // Glow Styles
  // ==========================================================================

  const glowStyles = useMemo(() => {
    if (!effectiveGlow) return {};

    const glowClr = glowColor ?? (resolvedColors.primary as string);

    return {
      shadowColor: glowClr,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 15,
      elevation: 10,
    };
  }, [effectiveGlow, glowColor, resolvedColors.primary]);

  // ==========================================================================
  // 3D Effect Layers
  // ==========================================================================

  const is3D = effectiveVariant === '3d';

  const render3DLayers = useMemo(() => {
    if (!is3D) return null;

    // Parse the base color to create darker variants for edge and shadow
    // Simple approach: use darker shades
    const edgeColor = '#5b21b6'; // Darker purple for edge
    const shadowColor = '#9ca3af'; // Gray for shadow

    return (
      <>
        {/* Shadow Layer */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: shadowColor,
              borderRadius: presetStyles.container.borderRadius ?? 8,
              transform: [{ translateY: 2 }],
              opacity: 0.6,
            },
          ]}
        />
        {/* Edge Layer */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: edgeColor,
              borderRadius: presetStyles.container.borderRadius ?? 8,
            },
          ]}
        />
      </>
    );
  }, [is3D, resolvedColors.primary, presetStyles.container.borderRadius]);

  // ==========================================================================
  // Swipeable Rendering
  // ==========================================================================

  if (swipeable) {
    const direction = swipeDirection === 'right' ? 1 : -1;

    // Merge config styles for swipeable too
    const configStyle = isSuccess
      ? successConfig?.style
      : isError
      ? errorConfig?.style
      : undefined;

    const thumbWidth = sizeConfig.minHeight; // Thumb is square based on height

    return (
      <View
        style={[
          styles.swipeContainer,
          presetStyles.container,
          style,
          configStyle,
          { paddingHorizontal: 0, paddingVertical: 0 } // Reset padding for track
        ]}
        onLayout={handleLayout}
      >
        {/* Track Content (Text "Swipe to Confirm") */}
        <View style={styles.swipeTrackTextWrapper}>
          <Text style={[presetStyles.text, { fontWeight: '700', opacity: 0.8 }, textStyle]}>
            {title}
          </Text>
        </View>

        {/* Success / Background Reveal Layer (Optional, e.g. Green reveal) */}
        <Animated.View 
            style={[
                styles.swipeBackground, 
                { 
                    backgroundColor: '#22c55e', 
                    opacity: swipeAnim.interpolate({
                        inputRange: [0, Math.max(1, buttonWidth - thumbWidth)],
                        outputRange: [0, 1]
                    })
                }
            ]} 
        />

        {/* Thumb / Handle */}
        <Animated.View
          style={[
            styles.swipeThumb,
            {
              width: thumbWidth,
              height: '100%', // Full height of container
              backgroundColor: resolvedColors.primary, // Thumb color
              borderRadius: presetStyles.container.borderRadius ?? 12,
              transform: [
                { translateX: Animated.multiply(swipeAnim, direction) },
              ],
            },
          ]}
          {...panResponder?.panHandlers}
        >
            {/* Optional Icon in Thumb (like an arrow) */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: resolvedColors.primaryText, fontSize: 18, fontWeight: 'bold' }}>
                    {direction === 1 ? '→' : '←'}
                </Text>
            </View>
        </Animated.View>
      </View>
    );
  }

  // ==========================================================================
  // Regular Button Rendering
  // ==========================================================================

  // Combine scale transforms
  const combinedScale = effectivePulse
    ? Animated.multiply(scaleAnim, pulseAnim)
    : scaleAnim;

  // Merge config styles
  const configStyle = isSuccess
    ? successConfig?.style
    : isError
    ? errorConfig?.style
    : undefined;

  // Create a separate animated layer for background color to avoid driver mixing issues
  // Only render if no custom backgroundColor is provided in style prop
  const hasCustomBg = useMemo(() => {
    if (!style) return false;
    const styleArray = Array.isArray(style) ? style : [style];
    return styleArray.some((s) => s && typeof s === 'object' && 'backgroundColor' in s);
  }, [style]);

  const backgroundLayer = !hasCustomBg ? (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: animatedBackgroundColor,
          borderRadius: presetStyles.container.borderRadius ?? 12,
        },
      ]}
    />
  ) : null;

  return (
    <Animated.View
      style={[
        presetStyles.shadow, // Apply shadow styles to outer wrapper
        effectiveGlow && glowStyles,
        effectiveGlow && { shadowOpacity: glowAnim },
      ]}
    >
      {render3DLayers}
      <AnimatedPressable
        onPress={handlePress}
        onLongPress={onLongPress ? handleLongPress : undefined}
        delayLongPress={delayLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        onLayout={handleLayout}
        style={[
          styles.container,
          presetStyles.container,
          {
            transform: [
              { scale: combinedScale },
              { translateX: shakeAnim },
              ...(is3D ? [{ translateY: translateYAnim }] : []),
            ],
            opacity: isDisabled
              ? disabledOpacity
              : (opacityAnim as unknown as number),
          },
          configStyle, // Apply config styles after transforms
          style, // Apply custom styles last
        ]}
        {...restProps}
      >
        {backgroundLayer}
        {mainContent}
        {glareOverlay}
      </AnimatedPressable>
    </Animated.View>
  );
});

// Set display name for debugging
Pressy.displayName = 'Pressy';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  revealed: {
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  revealContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeContainer: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center', // Center track content vertically
  },
  swipeBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  swipeTrackTextWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  swipeThumb: {
    position: 'absolute',
    top: 0,
    left: 0, // Start at left
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  glareOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
