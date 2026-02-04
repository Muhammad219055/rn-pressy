import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Pressable,
  Vibration,
  Platform,
} from 'react-native';
import type { InpyProps, InpyVariant, VibrationIntensity } from './types';
import { usePressyTheme } from '../Pressy/PressyProvider';

// ============================================================================
// Constants
// ============================================================================

const SIZE_CONFIG = {
  sm: { height: 40, fontSize: 14, paddingHorizontal: 12, iconSize: 16, labelSize: 11 },
  md: { height: 48, fontSize: 16, paddingHorizontal: 16, iconSize: 20, labelSize: 12 },
  lg: { height: 56, fontSize: 18, paddingHorizontal: 20, iconSize: 24, labelSize: 13 },
  xl: { height: 64, fontSize: 20, paddingHorizontal: 24, iconSize: 28, labelSize: 14 },
} as const;

const SHAPE_CONFIG = {
  rounded: { borderRadius: 12 },
  pill: { borderRadius: 9999 },
  square: { borderRadius: 0 },
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
  if (typeof intensity === 'boolean') return VIBRATION_DURATION.light;
  return VIBRATION_DURATION[intensity] ?? VIBRATION_DURATION.light;
};

// ============================================================================
// Clear Icon Component
// ============================================================================

const DefaultClearIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View style={[styles.clearIcon, { width: size, height: size }]}>
    <View style={[styles.clearLine, { backgroundColor: color, width: size * 0.6, transform: [{ rotate: '45deg' }] }]} />
    <View style={[styles.clearLine, { backgroundColor: color, width: size * 0.6, transform: [{ rotate: '-45deg' }] }]} />
  </View>
);

// ============================================================================
// Main Component
// ============================================================================

export const Inpy: React.FC<InpyProps> = ({
  value,
  onChangeText,
  placeholder,
  variant = 'outlined',
  size = 'md',
  shape = 'rounded',
  label,
  error = false,
  success = false,
  disabled = false,
  leftIcon,
  rightIcon,
  clearable = false,
  clearIcon,
  focusColor,
  errorColor,
  successColor,
  borderColor,
  backgroundColor,
  textColor,
  placeholderColor,
  vibration = false,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  testID,
  ...textInputProps
}) => {
  const { theme } = usePressyTheme();

  const [isFocused, setIsFocused] = useState(false);
  // Using any to avoid version-specific RN type issues
  const inputRef = useRef<any>(null);
  
  // Animation values
  const focusAnim = useRef(new Animated.Value(0)).current;
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Resolved colors from theme
  const resolvedFocusColor = focusColor || theme.colors.inputFocus;
  const resolvedErrorColor = errorColor || theme.colors.error;
  const resolvedSuccessColor = successColor || theme.colors.success;
  const resolvedBorderColor = borderColor || theme.colors.inputBorder;
  const resolvedBgColor = backgroundColor || (
    variant === 'filled' 
      ? theme.colors.inputBackground
      : variant === 'ghost'
        ? 'transparent'
        : theme.colors.inputBackground
  );
  const resolvedTextColor = textColor || theme.colors.inputText;
  const resolvedPlaceholderColor = placeholderColor || theme.colors.inputPlaceholder;

  const sizeConfig = SIZE_CONFIG[size];
  const shapeConfig = SHAPE_CONFIG[shape];

  // Get current border color based on state
  const getCurrentBorderColor = () => {
    if (error) return resolvedErrorColor;
    if (success) return resolvedSuccessColor;
    if (isFocused) return resolvedFocusColor;
    return resolvedBorderColor;
  };

  // Animate label on focus/value change
  useEffect(() => {
    const shouldFloat = isFocused || value.length > 0;
    Animated.spring(labelAnim, {
      toValue: shouldFloat ? 1 : 0,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  }, [isFocused, value, labelAnim]);

  // Animate focus
  useEffect(() => {
    Animated.spring(focusAnim, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false,
      tension: 300,
      friction: 20,
    }).start();
  }, [isFocused, focusAnim]);

  // Shake animation on error
  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [error, shakeAnim]);

  // Handlers
  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
    if (vibration && Platform.OS !== 'web') {
      Vibration.vibrate(getVibrationDuration(vibration));
    }
    onFocus?.(e);
  }, [vibration, onFocus]);

  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const handleClear = useCallback(() => {
    onChangeText('');
    // Focus the input after clearing
    if (inputRef.current?.focus) {
      inputRef.current.focus();
    }
    if (vibration && Platform.OS !== 'web') {
      Vibration.vibrate(getVibrationDuration(vibration));
    }
  }, [onChangeText, vibration]);

  // Label animation transforms
  const labelTranslateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(sizeConfig.height / 2 + sizeConfig.labelSize / 2)],
  });

  const labelScale = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      resolvedPlaceholderColor as string,
      error ? resolvedErrorColor as string : success ? resolvedSuccessColor as string : resolvedFocusColor as string,
    ],
  });

  // Variant-specific styles
  const getVariantStyles = (currentVariant: InpyVariant) => {
    switch (currentVariant) {
      case 'filled':
        return {
          backgroundColor: resolvedBgColor,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderColor: getCurrentBorderColor(),
        };
      case 'underlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 2,
          borderColor: getCurrentBorderColor(),
          borderRadius: 0,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
        };
      case 'outlined':
      default:
        return {
          backgroundColor: resolvedBgColor,
          borderWidth: 2,
          borderColor: getCurrentBorderColor(),
        };
    }
  };

  const variantStyles = getVariantStyles(variant);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateX: shakeAnim }] },
        style,
      ]}
    >
      {/* Input Container */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            height: sizeConfig.height,
            paddingHorizontal: sizeConfig.paddingHorizontal,
            ...shapeConfig,
            ...variantStyles,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <View style={[styles.iconContainer, { marginRight: 8 }]}>
            {leftIcon}
          </View>
        )}

        {/* Input with Floating Label */}
        <View style={styles.inputWrapper}>
          {/* Floating Label */}
          {label && (
            <View pointerEvents="none" style={styles.labelWrapper}>
              <Animated.Text
                style={[
                  styles.label,
                  {
                    fontSize: sizeConfig.fontSize,
                    color: labelColor,
                    backgroundColor: variant === 'outlined' ? resolvedBgColor : 'transparent',
                    transform: [
                      { translateY: labelTranslateY },
                      { scale: labelScale },
                    ],
                  },
                  labelStyle,
                ]}
              >
                {label}
              </Animated.Text>
            </View>
          )}

          {/* Text Input */}
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={label ? undefined : placeholder}
            placeholderTextColor={resolvedPlaceholderColor}
            editable={!disabled}
            style={[
              styles.input,
              {
                fontSize: sizeConfig.fontSize,
                color: resolvedTextColor,
              },
              inputStyle,
            ]}
            testID={testID}
            {...textInputProps}
          />
        </View>

        {/* Clear Button */}
        {clearable && value.length > 0 && !disabled && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            {clearIcon || (
              <DefaultClearIcon 
                size={sizeConfig.iconSize * 0.8} 
                color={resolvedPlaceholderColor as string} 
              />
            )}
          </Pressable>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <View style={[styles.iconContainer, { marginLeft: 8 }]}>
            {rightIcon}
          </View>
        )}
      </Animated.View>

      {/* Error Message */}
      {typeof error === 'string' && error.length > 0 && (
        <Text style={[styles.errorText, { color: resolvedErrorColor }, errorStyle]}>
          {error}
        </Text>
      )}
    </Animated.View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  label: {
    paddingHorizontal: 4,
  },
  labelWrapper: {
    position: 'absolute',
    left: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  clearIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(156, 163, 175, 0.3)',
    borderRadius: 999,
  },
  clearLine: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
