/**
 * Chex - Advanced Checkbox Component for React Native
 * 
 * A collection of beautifully animated checkbox variants with smooth transitions
 * and haptic feedback support.
 * 
 * Variants:
 * - classic: Simple checkbox with checkmark animation
 * - ripple: Box-shadow ripple effect on check
 * - flip: 3D flip toggle with custom text
 * - circle-path: Circular SVG path animation
 * - svg-stroke: SVG stroke dash animation
 * - morph: Circle-to-square morph with pulse
 * 
 * @example
 * ```tsx
 * <Chex
 *   checked={isChecked}
 *   onValueChange={setIsChecked}
 *   variant="ripple"
 *   label="Accept terms"
 * />
 * ```
 */

import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Pressable,
  Vibration,
  Platform,
} from 'react-native';
import Svg, { Path, Polyline, Rect, Mask } from 'react-native-svg';
import type { ChexProps } from './types';
import { usePressyTheme } from '../Pressy/PressyProvider';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

// ============================================================================
// Constants
// ============================================================================

const SIZE_CONFIG = {
  sm: { box: 18, fontSize: 14 },
  md: { box: 24, fontSize: 16 },
  lg: { box: 30, fontSize: 18 },
} as const;

// ============================================================================
// Chex Component
// ============================================================================

export const Chex: React.FC<ChexProps> = ({
  checked,
  onValueChange,
  variant = 'classic',
  size = 'md',
  disabled = false,
  primaryColor,
  secondaryColor,
  label,
  labelPosition = 'right',
  labelStyle,
  style,
  flipOnText = 'Yeah!',
  flipOffText = 'Nope',
  vibration = true,
  accessibilityLabel,
  testID,
}) => {
  // Theme integration
  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';

  // Resolve colors with theme fallbacks
  const resolvedPrimaryColor = primaryColor || theme.colors.checkboxPrimary;
  const resolvedSecondaryColor = secondaryColor || theme.colors.checkboxSecondary;
  const labelColor = theme.colors.text as string;

  // Animation values
  const checkAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const pathAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const strokeAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const morphAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  const sizeConfig = SIZE_CONFIG[size];

  // Animate based on variant
  useEffect(() => {
    const toValue = checked ? 1 : 0;

    switch (variant) {
      case 'ripple':
        Animated.parallel([
          Animated.spring(checkAnim, {
            toValue,
            useNativeDriver: false,
            tension: 300,
            friction: 10,
          }),
          Animated.timing(rippleAnim, {
            toValue,
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start();
        break;

      case 'flip':
        Animated.timing(flipAnim, {
          toValue,
          duration: 400,
          useNativeDriver: true,
        }).start();
        break;

      case 'circle-path':
        Animated.timing(pathAnim, {
          toValue,
          duration: 300,
          useNativeDriver: false,
        }).start();
        break;

      case 'svg-stroke':
        Animated.timing(strokeAnim, {
          toValue,
          duration: 600,
          useNativeDriver: false,
        }).start();
        break;

      case 'morph':
        Animated.parallel([
          Animated.spring(morphAnim, {
            toValue,
            useNativeDriver: false,
            tension: 300,
            friction: 10,
          }),
          Animated.sequence([
            Animated.spring(scaleAnim, {
              toValue: 1.2,
              useNativeDriver: false,
              tension: 500,
              friction: 5,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: false,
              tension: 300,
              friction: 8,
            }),
          ]),
        ]).start();
        break;

      case 'classic':
      default:
        Animated.spring(checkAnim, {
          toValue,
          useNativeDriver: false,
          tension: 300,
          friction: 10,
        }).start();
    }
  }, [checked, variant, checkAnim, rippleAnim, flipAnim, pathAnim, strokeAnim, morphAnim, scaleAnim]);

  // Handle press
  const handlePress = useCallback(() => {
    if (disabled) return;

    // Haptic feedback
    if (vibration && Platform.OS !== 'web') {
      Vibration.vibrate(10);
    }

    onValueChange(!checked);
  }, [disabled, vibration, checked, onValueChange]);

  // Render checkbox based on variant
  const renderCheckbox = () => {
    switch (variant) {
      case 'ripple':
        return (
          <Animated.View
            style={[
              styles.rippleContainer,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: 5,
                backgroundColor: checked ? resolvedPrimaryColor : resolvedSecondaryColor,
                borderWidth: checked ? 0 : 1,
                borderColor: isDark ? '#4b5563' : '#d9d9d9',
                opacity: disabled ? 0.5 : 1,
                shadowColor: resolvedPrimaryColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
                shadowRadius: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, sizeConfig.box / 2.5],
                }) as any,
              },
            ]}
          >
            <Animated.View
              style={{
                opacity: checkAnim,
                transform: [
                  {
                    scale: checkAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1.2],
                    }),
                  },
                ],
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 7,
                  borderRightWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: resolvedSecondaryColor,
                  transform: [{ rotate: '45deg' }, { translateY: -1 }],
                }}
              />
            </Animated.View>
          </Animated.View>
        );

      case 'flip':
        const frontRotate = flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        });
        const backRotate = flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['-180deg', '0deg'],
        });
        return (
          <View
            style={[
              styles.flipContainer,
              {
                width: sizeConfig.box * 3,
                height: sizeConfig.box,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.flipSide,
                {
                  backgroundColor: '#FF3A19',
                  transform: [{ rotateY: frontRotate }],
                  backfaceVisibility: 'hidden',
                },
              ]}
            >
              <Text style={[styles.flipText, { fontSize: sizeConfig.fontSize }]}>
                {flipOffText}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.flipSide,
                {
                  backgroundColor: checked ? '#7FC6A6' : '#02C66F',
                  transform: [{ rotateY: backRotate }],
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                },
              ]}
            >
              <Text style={[styles.flipText, { fontSize: sizeConfig.fontSize }]}>
                {flipOnText}
              </Text>
            </Animated.View>
          </View>
        );

      case 'circle-path':
        const pathDashOffset = pathAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 60], // Circle visible when unchecked, disappears when checked
        });
        const polylineDashOffset = pathAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [66, 42], // Checkmark hidden when unchecked, appears when checked
        });
        const circleStrokeColor = checked ? resolvedPrimaryColor : (isDark ? '#6b7280' : '#c8ccd4');
        return (
          <View
            style={[
              styles.circlePathContainer,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <Svg width={sizeConfig.box} height={sizeConfig.box} viewBox="0 0 18 18">
              <AnimatedPath
                d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"
                stroke={circleStrokeColor as any}
                strokeWidth={1.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={60}
                strokeDashoffset={pathDashOffset as any}
              />
              <AnimatedPolyline
                points="1 9 7 14 15 4"
                stroke={circleStrokeColor as any}
                strokeWidth={1.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={22}
                strokeDashoffset={polylineDashOffset as any}
              />
            </Svg>
          </View>
        );

      case 'svg-stroke':
        const boxDashOffset = strokeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [800, 0],
        });
        const tickDashOffset = strokeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [172, 0],
        });
        const svgFillColor = isDark ? 'rgba(75, 85, 99, 0.425)' : 'rgba(207, 205, 205, 0.425)';
        return (
          <View
            style={[
              styles.svgStrokeContainer,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <Svg width={sizeConfig.box} height={sizeConfig.box} viewBox="0 0 200 200">
              <Mask fill="white" id="path-1-inside-1">
                <Rect height={200} width={200} />
              </Mask>
              <AnimatedRect
                mask="url(#path-1-inside-1)"
                strokeWidth={40}
                height={200}
                width={200}
                fill={svgFillColor}
                stroke={resolvedPrimaryColor as any}
                strokeDasharray={800}
                strokeDashoffset={boxDashOffset as any}
              />
              <AnimatedPath
                strokeWidth={15}
                d="M52 111.018L76.9867 136L149 64"
                stroke={resolvedPrimaryColor as any}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={172}
                strokeDashoffset={tickDashOffset as any}
              />
            </Svg>
          </View>
        );

      case 'morph':
        const borderRadius = morphAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [sizeConfig.box / 2, sizeConfig.box * 0.25],
        });
        const backgroundColor = checked ? resolvedPrimaryColor : (isDark ? '#4b5563' : '#ccc');
        const checkmarkColor = isDark ? '#1f2937' : '#E0E0E2';
        return (
          <Animated.View
            style={[
              styles.morphContainer,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: borderRadius as any,
                backgroundColor,
                opacity: disabled ? 0.5 : 1,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Animated.View
              style={{
                opacity: morphAnim,
                transform: [
                  {
                    scale: morphAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 7,
                  borderRightWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: checkmarkColor,
                  transform: [{ rotate: '45deg' }, { translateY: -1 }],
                }}
              />
            </Animated.View>
          </Animated.View>
        );

      case 'classic':
      default:
        return (
          <Animated.View
            style={[
              styles.classicContainer,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: 5,
                backgroundColor: checked ? resolvedPrimaryColor : resolvedSecondaryColor,
                borderWidth: checked ? 0 : 1,
                borderColor: isDark ? '#4b5563' : '#d9d9d9',
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <Animated.View
              style={{
                opacity: checkAnim,
                transform: [
                  {
                    scale: checkAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1.2],
                    }),
                  },
                ],
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 7,
                  borderRightWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: resolvedSecondaryColor,
                  transform: [{ rotate: '45deg' }, { translateY: -1 }],
                }}
              />
            </Animated.View>
          </Animated.View>
        );
    }
  };

  const renderLabel = () => {
    if (!label) return null;

    return (
      <Text
        style={[
          styles.label,
          {
            fontSize: sizeConfig.fontSize,
            marginLeft: labelPosition === 'right' ? 10 : 0,
            marginRight: labelPosition === 'left' ? 10 : 0,
            opacity: disabled ? 0.5 : 1,
            color: labelColor,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        { flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row' },
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
    >
      {renderCheckbox()}
      {renderLabel()}
    </Pressable>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipSide: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  flipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  circlePathContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgStrokeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  morphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
  },
});

Chex.displayName = 'Chex';
