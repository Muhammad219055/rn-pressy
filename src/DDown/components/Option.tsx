import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { usePressyTheme } from '../../Pressy/PressyProvider';
import { RippleEffect } from './RippleEffect';
import type { DDownOption } from '../types';

interface OptionProps {
  option: DDownOption;
  isSelected: boolean;
  isHighlighted: boolean;
  multiSelect: boolean;
  onSelect: () => void;
  searchQuery?: string;
  style?: any;
  textStyle?: any;
  index?: number;
  staggerDelay?: number;
  rippleEffect?: boolean;
  bounceOnSelect?: boolean;
  // Add variant props to match parent dropdown
  variant?: 'default' | 'outlined' | 'filled' | 'ghost' | 'gradient';
  parentBorderRadius?: number;
}

export const Option: React.FC<OptionProps> = ({
  option,
  isSelected,
  isHighlighted,
  multiSelect,
  onSelect,
  searchQuery,
  style,
  textStyle,
  index = 0,
  staggerDelay = 50,
  rippleEffect = true,
  bounceOnSelect = false,
  variant = 'default',
  parentBorderRadius = 12,
}) => {
  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';

  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const selectionAnim = useRef(new Animated.Value(0)).current;
  
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const descriptionColor = isDark ? '#94a3b8' : '#64748b';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  
  // Adjust colors based on variant to match parent dropdown
  const selectedBgColor = variant === 'ghost' 
    ? (isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(241, 245, 249, 0.3)')
    : variant === 'filled'
    ? (isDark ? '#0f172a' : '#f8fafc')
    : (isDark ? '#334155' : '#f1f5f9');
    
  const highlightedBgColor = variant === 'ghost'
    ? (isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(248, 250, 252, 0.5)')
    : variant === 'filled'
    ? (isDark ? '#1e293b' : '#ffffff')
    : (isDark ? '#1e293b' : '#f8fafc');
    
  const accentColor = theme.colors.primary as string;

  // Mount animation with stagger
  useEffect(() => {
    const delay = index * staggerDelay;
    
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 120,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, [slideAnim, opacityAnim, index, staggerDelay]);

  // Highlight animation
  useEffect(() => {
    Animated.timing(highlightAnim, {
      toValue: isHighlighted ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isHighlighted, highlightAnim]);

  // Selection animation
  useEffect(() => {
    Animated.spring(selectionAnim, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  }, [isSelected, selectionAnim]);

  const handlePress = (event: any) => {
    // Bounce animation on select
    if (bounceOnSelect) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          useNativeDriver: true,
          tension: 200,
          friction: 4,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
        }),
      ]).start();
    }

    // Ripple effect
    if (rippleEffect && event.nativeEvent) {
      const { locationX, locationY } = event.nativeEvent;
      const newRipple = {
        id: rippleId,
        x: locationX,
        y: locationY,
      };
      
      setRipples(prev => [...prev, newRipple]);
      setRippleId(prev => prev + 1);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    onSelect();
  };

  const highlightText = (text: string, query?: string) => {
    if (!query || !query.trim()) {
      return <Text>{text}</Text>;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <Text>
        {parts.map((part, partIndex) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text
              key={partIndex}
              style={{ 
                backgroundColor: accentColor, 
                color: '#ffffff',
                borderRadius: 2,
                paddingHorizontal: 2,
              }}
            >
              {part}
            </Text>
          ) : (
            <Text key={partIndex}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const animatedBackgroundColor = highlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isSelected ? selectedBgColor : 'transparent',
      highlightedBgColor,
    ],
  });

  const checkboxScale = selectionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View
      style={[
        {
          opacity: opacityAnim,
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        disabled={option.disabled}
        activeOpacity={0.8}
        style={[
          styles.option,
          {
            backgroundColor: animatedBackgroundColor,
            opacity: option.disabled ? 0.5 : 1,
            // No border radius for cleaner separator look
          },
          style,
        ]}
        accessibilityRole="button"
        accessibilityState={{
          selected: isSelected,
          disabled: option.disabled,
        }}
        accessibilityLabel={`${option.label}${option.description ? `, ${option.description}` : ''}`}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <RippleEffect
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            color={`${accentColor}20`}
            maxRadius={80}
            onComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id));
            }}
          />
        ))}

        {/* Checkbox for multi-select */}
        {multiSelect && (
          <Animated.View
            style={[
              styles.checkbox,
              {
                borderColor: isSelected ? accentColor : borderColor,
                backgroundColor: isSelected ? accentColor : 'transparent',
                transform: [{ scale: checkboxScale }],
              },
            ]}
          >
            {isSelected && (
              <Animated.Text 
                style={[
                  styles.checkmark,
                  {
                    transform: [{ scale: selectionAnim }],
                  },
                ]}
              >
                ✓
              </Animated.Text>
            )}
          </Animated.View>
        )}

        {/* Icon */}
        {option.icon && (
          <Animated.View 
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: selectionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }) }],
              },
            ]}
          >
            {option.icon}
          </Animated.View>
        )}

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Label */}
          <View style={styles.labelContainer}>
            <Text
              style={[
                styles.optionLabel,
                {
                  color: option.color || textColor,
                  fontWeight: isSelected ? '600' : '400',
                },
                textStyle,
              ]}
              numberOfLines={1}
            >
              {highlightText(option.label, searchQuery)}
            </Text>

            {/* Badge */}
            {option.badge && (
              <Animated.View
                style={[
                  styles.badge,
                  {
                    backgroundColor: accentColor,
                    transform: [{ scale: selectionAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }) }],
                  },
                ]}
              >
                <Text style={styles.badgeText}>
                  {option.badge}
                </Text>
              </Animated.View>
            )}
          </View>

          {/* Description */}
          {option.description && (
            <Text
              style={[
                styles.description,
                { color: descriptionColor },
              ]}
              numberOfLines={2}
            >
              {highlightText(option.description, searchQuery)}
            </Text>
          )}
        </View>

        {/* Check mark for single select */}
        {!multiSelect && isSelected && (
          <Animated.Text 
            style={[
              styles.singleCheckmark, 
              { 
                color: accentColor,
                transform: [{ scale: selectionAnim }],
              },
            ]}
          >
            ✓
          </Animated.Text>
        )}

        {/* Nested indicator */}
        {option.children && option.children.length > 0 && (
          <Text style={[styles.nestedIndicator, { color: textColor }]}>
            ›
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 0, // Remove horizontal margin for cleaner look with separators
    marginVertical: 0, // Remove vertical margin for cleaner look with separators
    borderRadius: 0, // No border radius for cleaner separator look
    overflow: 'hidden',
    position: 'relative',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  singleCheckmark: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  nestedIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});