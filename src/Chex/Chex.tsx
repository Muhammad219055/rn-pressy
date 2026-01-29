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
import type { ChexProps, VibrationIntensity } from './types';
import { usePressyTheme } from '../Pressy/PressyProvider';

// ============================================================================
// Constants
// ============================================================================

const SIZE_CONFIG = {
  sm: { box: 20, checkmark: 12, borderRadius: 5, borderWidth: 2 },
  md: { box: 26, checkmark: 16, borderRadius: 7, borderWidth: 2.5 },
  lg: { box: 34, checkmark: 20, borderRadius: 9, borderWidth: 3 },
} as const;

const VIBRATION_DURATION = {
  light: 10,
  medium: 20,
  heavy: 40,
} as const;

// ============================================================================
// Helpers
// ============================================================================

const getVibrationDuration = (intensity: VibrationIntensity): number => {
  if (typeof intensity === 'boolean') return VIBRATION_DURATION.medium;
  return VIBRATION_DURATION[intensity] ?? VIBRATION_DURATION.medium;
};

// ============================================================================
// Checkmark Component - Animated SVG-like checkmark using Views
// ============================================================================

const AnimatedCheckmark: React.FC<{
  size: number;
  color: string;
  progress: Animated.Value;
}> = ({ size, color, progress }) => {
  // Animate the checkmark drawing
  const shortLegWidth = progress.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, size * 0.35, size * 0.35],
    extrapolate: 'clamp',
  });

  const longLegWidth = progress.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0, size * 0.6],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.checkmarkContainer, { width: size, height: size }]}>
      {/* Short leg (goes down-left) */}
      <Animated.View
        style={[
          styles.checkmarkLeg,
          {
            width: shortLegWidth,
            height: size * 0.12,
            backgroundColor: color,
            transform: [
              { translateX: -size * 0.08 },
              { translateY: size * 0.12 },
              { rotate: '45deg' },
            ],
          },
        ]}
      />
      {/* Long leg (goes down-right) */}
      <Animated.View
        style={[
          styles.checkmarkLeg,
          {
            width: longLegWidth,
            height: size * 0.12,
            backgroundColor: color,
            transform: [
              { translateX: size * 0.08 },
              { translateY: size * 0.02 },
              { rotate: '-45deg' },
            ],
          },
        ]}
      />
    </View>
  );
};

// Simple non-animated checkmark
const Checkmark: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View style={[styles.checkmarkContainer, { width: size, height: size }]}>
    <View
      style={[
        styles.checkmarkLeg,
        {
          width: size * 0.35,
          height: size * 0.12,
          backgroundColor: color,
          transform: [
            { translateX: -size * 0.08 },
            { translateY: size * 0.12 },
            { rotate: '45deg' },
          ],
        },
      ]}
    />
    <View
      style={[
        styles.checkmarkLeg,
        {
          width: size * 0.6,
          height: size * 0.12,
          backgroundColor: color,
          transform: [
            { translateX: size * 0.08 },
            { translateY: size * 0.02 },
            { rotate: '-45deg' },
          ],
        },
      ]}
    />
  </View>
);

// Indeterminate line
const IndeterminateMark: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View
    style={{
      width: size * 0.5,
      height: size * 0.12,
      backgroundColor: color,
      borderRadius: size * 0.06,
    }}
  />
);

// ============================================================================
// Main Component
// ============================================================================

export const Chex: React.FC<ChexProps> = ({
  checked,
  onValueChange,
  variant = 'classic',
  size = 'md',
  indeterminate = false,
  disabled = false,
  checkedColor,
  uncheckedColor,
  checkmarkColor,
  borderColor,
  vibration = true,
  label,
  labelPosition = 'right',
  labelStyle,
  style,
  checkIcon,
  accessibilityLabel,
  testID,
}) => {
  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';

  // Animation values
  const checkAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fillAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const bubbleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  // Colors - using String() to avoid type issues
  const resolvedCheckedColor = String(checkedColor || theme.colors.primary);
  const resolvedUncheckedColor = String(uncheckedColor || (isDark ? '#3f3f46' : '#e4e4e7'));
  const resolvedCheckmarkColor = String(checkmarkColor || '#ffffff');
  const resolvedBorderColor = String(borderColor || (isDark ? '#52525b' : '#d4d4d8'));
  const labelColor = isDark ? '#fafafa' : '#18181b';

  const sizeConfig = SIZE_CONFIG[size];

  // Animate based on variant
  useEffect(() => {
    const toValue = checked || indeterminate ? 1 : 0;
    
    switch (variant) {
      case 'bounce':
        Animated.parallel([
          Animated.spring(checkAnim, {
            toValue,
            useNativeDriver: true,
            tension: 400,
            friction: 8,
          }),
          Animated.sequence([
            Animated.spring(scaleAnim, {
              toValue: 1.3,
              useNativeDriver: true,
              tension: 500,
              friction: 5,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              tension: 300,
              friction: 8,
            }),
          ]),
        ]).start();
        break;

      case 'glow':
        Animated.parallel([
          Animated.spring(checkAnim, {
            toValue,
            useNativeDriver: true,
            tension: 300,
            friction: 15,
          }),
          Animated.timing(glowAnim, {
            toValue,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
        break;

      case 'fill':
        Animated.parallel([
          Animated.spring(fillAnim, {
            toValue,
            useNativeDriver: true,
            tension: 400,
            friction: 12,
          }),
          Animated.timing(checkAnim, {
            toValue,
            duration: 200,
            delay: 100,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'stamp':
        Animated.parallel([
          Animated.spring(checkAnim, {
            toValue,
            useNativeDriver: true,
            tension: 600,
            friction: 8,
          }),
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: toValue * 0.5,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.spring(rotateAnim, {
              toValue,
              useNativeDriver: true,
              tension: 400,
              friction: 6,
            }),
          ]),
        ]).start();
        break;

      case 'tick':
        Animated.timing(checkAnim, {
          toValue,
          duration: toValue ? 400 : 200,
          useNativeDriver: true,
        }).start();
        break;

      case 'bubble':
        Animated.parallel([
          Animated.spring(bubbleAnim, {
            toValue,
            useNativeDriver: true,
            tension: 350,
            friction: 10,
          }),
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: toValue ? 0.8 : 1,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
              toValue: toValue ? 1.15 : 1,
              useNativeDriver: true,
              tension: 400,
              friction: 6,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              tension: 200,
              friction: 10,
            }),
          ]),
        ]).start();
        break;

      default: // classic, circle
        Animated.parallel([
          Animated.spring(checkAnim, {
            toValue,
            useNativeDriver: true,
            tension: 350,
            friction: 12,
          }),
          Animated.sequence([
            Animated.spring(scaleAnim, {
              toValue: 0.9,
              useNativeDriver: true,
              tension: 400,
              friction: 10,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              tension: 300,
              friction: 10,
            }),
          ]),
        ]).start();
    }
  }, [checked, indeterminate, variant, checkAnim, scaleAnim, fillAnim, glowAnim, rotateAnim, bubbleAnim]);

  // Handle press
  const handlePress = useCallback(() => {
    if (disabled) return;

    // Haptic feedback
    if (vibration && Platform.OS !== 'web') {
      Vibration.vibrate(getVibrationDuration(vibration));
    }

    onValueChange(!checked);
  }, [disabled, vibration, checked, onValueChange]);

  // Render checkbox based on variant
  const renderCheckbox = () => {
    const isActive = checked || indeterminate;
    const backgroundColor = isActive ? resolvedCheckedColor : resolvedUncheckedColor;

    switch (variant) {
      case 'bounce':
        return (
          <Animated.View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.borderRadius,
                backgroundColor,
                borderWidth: isActive ? 0 : sizeConfig.borderWidth,
                borderColor: resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.checkmarkWrapper,
                { transform: [{ scale: checkAnim }], opacity: checkAnim },
              ]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
            </Animated.View>
          </Animated.View>
        );

      case 'glow':
        const glowRadius = glowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 12],
        });
        return (
          <Animated.View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.borderRadius,
                backgroundColor,
                borderWidth: isActive ? 0 : sizeConfig.borderWidth,
                borderColor: resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
                shadowColor: resolvedCheckedColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isActive ? 0.6 : 0,
                shadowRadius: glowRadius as unknown as number,
                elevation: isActive ? 8 : 0,
              },
            ]}
          >
            <Animated.View
              style={[styles.checkmarkWrapper, { transform: [{ scale: checkAnim }], opacity: checkAnim }]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
            </Animated.View>
          </Animated.View>
        );

      case 'fill':
        const fillScale = fillAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });
        return (
          <View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.borderRadius,
                backgroundColor: resolvedUncheckedColor,
                borderWidth: sizeConfig.borderWidth,
                borderColor: isActive ? resolvedCheckedColor : resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
                overflow: 'hidden',
              },
            ]}
          >
            <Animated.View
              style={[
                styles.fillInner,
                {
                  backgroundColor: resolvedCheckedColor,
                  borderRadius: sizeConfig.borderRadius - 2,
                  transform: [{ scale: fillScale }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.checkmarkWrapper,
                { position: 'absolute', transform: [{ scale: checkAnim }], opacity: checkAnim },
              ]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
            </Animated.View>
          </View>
        );

      case 'stamp':
        const stampRotate = rotateAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['-15deg', '10deg', '0deg'],
        });
        const stampScale = rotateAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 1.2, 1],
        });
        return (
          <View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.borderRadius,
                backgroundColor,
                borderWidth: isActive ? 0 : sizeConfig.borderWidth,
                borderColor: resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.checkmarkWrapper,
                {
                  transform: [{ rotate: stampRotate }, { scale: stampScale }],
                  opacity: checkAnim,
                },
              ]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
            </Animated.View>
          </View>
        );

      case 'tick':
        return (
          <View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.borderRadius,
                backgroundColor,
                borderWidth: isActive ? 0 : sizeConfig.borderWidth,
                borderColor: resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            {(checked || indeterminate) && (
              indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : (
                <AnimatedCheckmark
                  size={sizeConfig.checkmark}
                  color={resolvedCheckmarkColor}
                  progress={checkAnim}
                />
              )
            )}
          </View>
        );

      case 'bubble':
        const bubbleScale = bubbleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });
        return (
          <Animated.View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.box / 2,
                backgroundColor: resolvedUncheckedColor,
                borderWidth: sizeConfig.borderWidth,
                borderColor: isActive ? resolvedCheckedColor : resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
                transform: [{ scale: scaleAnim }],
                overflow: 'hidden',
              },
            ]}
          >
            <Animated.View
              style={[
                styles.bubbleInner,
                {
                  width: sizeConfig.box,
                  height: sizeConfig.box,
                  borderRadius: sizeConfig.box / 2,
                  backgroundColor: resolvedCheckedColor,
                  transform: [{ scale: bubbleScale }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.checkmarkWrapper,
                { position: 'absolute', transform: [{ scale: checkAnim }], opacity: checkAnim },
              ]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
            </Animated.View>
          </Animated.View>
        );

      case 'circle':
        return (
          <Animated.View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.box / 2,
                backgroundColor,
                borderWidth: isActive ? 0 : sizeConfig.borderWidth,
                borderColor: resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Animated.View
              style={[styles.checkmarkWrapper, { transform: [{ scale: checkAnim }], opacity: checkAnim }]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
            </Animated.View>
          </Animated.View>
        );

      case 'classic':
      default:
        return (
          <Animated.View
            style={[
              styles.checkboxBase,
              {
                width: sizeConfig.box,
                height: sizeConfig.box,
                borderRadius: sizeConfig.borderRadius,
                backgroundColor,
                borderWidth: isActive ? 0 : sizeConfig.borderWidth,
                borderColor: resolvedBorderColor,
                opacity: disabled ? 0.5 : 1,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Animated.View
              style={[styles.checkmarkWrapper, { transform: [{ scale: checkAnim }], opacity: checkAnim }]}
            >
              {indeterminate ? (
                <IndeterminateMark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              ) : checkIcon || (
                <Checkmark size={sizeConfig.checkmark} color={resolvedCheckmarkColor} />
              )}
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
            color: labelColor,
            fontSize: sizeConfig.box * 0.55,
            marginLeft: labelPosition === 'right' ? 10 : 0,
            marginRight: labelPosition === 'left' ? 10 : 0,
            opacity: disabled ? 0.5 : 1,
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
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
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
  checkboxBase: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkLeg: {
    position: 'absolute',
    borderRadius: 2,
  },
  label: {
    fontWeight: '500',
  },
  fillInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bubbleInner: {
    position: 'absolute',
  },
});
