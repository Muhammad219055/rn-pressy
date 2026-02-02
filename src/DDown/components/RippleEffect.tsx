import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface RippleEffectProps {
  x: number;
  y: number;
  color?: string;
  maxRadius?: number;
  duration?: number;
  onComplete?: () => void;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  x,
  y,
  color = 'rgba(0, 0, 0, 0.1)',
  maxRadius = 100,
  duration = 600,
  onComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete?.();
    });
  }, [scaleAnim, opacityAnim, duration, onComplete]);

  const _animatedScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxRadius],
  });

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          left: x - maxRadius / 2,
          top: y - maxRadius / 2,
          width: maxRadius,
          height: maxRadius,
          borderRadius: maxRadius / 2,
          backgroundColor: color,
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
  },
});