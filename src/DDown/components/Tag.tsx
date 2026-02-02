import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { usePressyTheme } from '../../Pressy/PressyProvider';
import type { DDownTagProps } from '../types';

export const Tag: React.FC<DDownTagProps> = ({
  option,
  onRemove,
  style,
  textStyle,
}) => {
  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const removeScaleAnim = useRef(new Animated.Value(1)).current;
  const [isRemoving, setIsRemoving] = useState(false);

  // Mount animation
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handleRemove = () => {
    setIsRemoving(true);
    
    Animated.parallel([
      Animated.spring(removeScaleAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 200,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove();
    });
  };

  const tagBgColor = option.color || (isDark ? '#334155' : '#f1f5f9');
  const tagTextColor = isDark ? '#f8fafc' : '#0f172a';
  const removeButtonColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <Animated.View
      style={[
        styles.tag,
        {
          backgroundColor: tagBgColor,
          borderColor: isDark ? '#475569' : '#e2e8f0',
          opacity: opacityAnim,
          transform: [
            { scale: isRemoving ? removeScaleAnim : scaleAnim },
          ],
        },
        style,
      ]}
    >
      {option.icon && (
        <Animated.View 
          style={[
            styles.tagIcon,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {option.icon}
        </Animated.View>
      )}
      
      <Animated.Text
        style={[
          styles.tagText,
          { 
            color: tagTextColor,
            opacity: opacityAnim,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {option.label}
      </Animated.Text>
      
      {option.badge && (
        <Animated.View
          style={[
            styles.badge,
            {
              backgroundColor: theme.colors.primary as string,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {option.badge}
          </Text>
        </Animated.View>
      )}
      
      <TouchableOpacity
        onPress={handleRemove}
        style={styles.removeButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${option.label}`}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Text style={[styles.removeIcon, { color: removeButtonColor }]}>
            ×
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 4,
    maxWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  removeButton: {
    marginLeft: 4,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  removeIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
});