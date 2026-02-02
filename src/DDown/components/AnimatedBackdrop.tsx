import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';

interface AnimatedBackdropProps {
  visible: boolean;
  onPress: () => void;
  blur?: number;
  opacity?: number;
  color?: string;
  duration?: number;
  children?: React.ReactNode;
}

export const AnimatedBackdrop: React.FC<AnimatedBackdropProps> = ({
  visible,
  onPress,
  blur = 20,
  opacity = 0.4,
  color = 'rgba(0, 0, 0, 1)',
  duration = 200,
  children,
}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1.1)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: opacity,
          duration,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: duration * 0.7,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: duration * 0.7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacityAnim, scaleAnim, opacity, duration]);

  if (!visible && (opacityAnim as any)._value === 0) return null;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity: opacityAnim,
          backgroundColor: color,
          zIndex: 1, // Ensure backdrop is below everything else
        },
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
        onTouchEnd={onPress}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};