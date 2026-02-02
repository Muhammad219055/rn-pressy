import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { usePressyTheme } from '../../Pressy/PressyProvider';
import type { DDownSize } from '../types';
import { sizePresets } from '../uiUtils';

interface FloatingLabelProps {
  label: string;
  hasValue: boolean;
  isFocused: boolean;
  size: DDownSize;
  style?: any;
  error?: boolean;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  label,
  hasValue,
  isFocused,
  size,
  style,
  error = false,
}) => {
  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';
  
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const sizeConfig = sizePresets[size];
  const isFloating = hasValue || isFocused;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateYAnim, {
        toValue: isFloating ? -sizeConfig.height * 0.7 : 0,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: isFloating ? 0.85 : 1,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
      Animated.timing(colorAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFloating, isFocused, translateYAnim, scaleAnim, colorAnim, sizeConfig.height]);

  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error 
        ? (theme.colors.error as string || '#ef4444')
        : (isDark ? '#64748b' : '#94a3b8'),
      error 
        ? (theme.colors.error as string || '#ef4444')
        : (theme.colors.primary as string || '#3b82f6'),
    ],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY: translateYAnim },
            { scale: scaleAnim },
          ],
        },
        style,
      ]}
      pointerEvents="none"
    >
      <Animated.Text
        style={[
          styles.label,
          {
            fontSize: sizeConfig.fontSize,
            color: animatedColor,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
          },
        ]}
      >
        {label}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  label: {
    paddingHorizontal: 4,
    fontWeight: '500',
  },
});