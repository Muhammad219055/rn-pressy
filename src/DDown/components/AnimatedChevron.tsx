import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

interface AnimatedChevronProps {
  isOpen: boolean;
  color: string;
  size?: number;
  duration?: number;
  rotation?: number;
  style?: any;
  variant?: 'arrow' | 'chevron' | 'plus' | 'custom';
  customIcon?: React.ReactNode;
}

export const AnimatedChevron: React.FC<AnimatedChevronProps> = ({
  isOpen,
  color,
  size = 12,
  duration = 200,
  rotation = 180,
  style,
  variant = 'chevron',
  customIcon,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 1 : 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: isOpen ? 1.1 : 1,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
    ]).start();
  }, [isOpen, rotateAnim, scaleAnim, duration]);

  const animatedRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${rotation}deg`],
  });

  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (variant) {
      case 'arrow':
        return '↓';
      case 'plus':
        return '+';
      case 'chevron':
      default:
        return '▼';
    }
  };

  return (
    <Animated.View
      style={[
        {
          transform: [
            { rotate: animatedRotation },
            { scale: scaleAnim },
          ],
        },
        style,
      ]}
    >
      <View
        style={{
          width: size * 1.5,
          height: size * 1.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: size,
            color,
            lineHeight: size,
            fontWeight: '600',
          }}
        >
          {getIcon()}
        </Text>
      </View>
    </Animated.View>
  );
};