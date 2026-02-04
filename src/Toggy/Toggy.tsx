import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Pressable,
  Vibration,
  Platform,
} from 'react-native';
import type { ToggyProps } from './types';
import { usePressyTheme } from '../Pressy/PressyProvider';
import { LiquidGlassWrapper } from '../LiquidGlass';

// ============================================================================
// Shared Hook for Animation
// ============================================================================

const useToggleAnimation = (value: boolean) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      useNativeDriver: false, // Changed to false to support width interpolation
      tension: 90,
      friction: 8,
    }).start();
  }, [value, anim]);

  return anim;
};

// ============================================================================
// Style 1: Classic (iOS-like with rotating thumb)
// ============================================================================

const ClassicSwitch = ({
  value,
  anim,
  trackColor,
  thumbColor,
  activeColor,
  inactiveColor,
  disabled,
}: any) => {
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [5.1, 30.6], // 0.3em -> 1.8em (in 17px base)
  });

  const rotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  // Color logic with fallbacks
  const explicitActive = activeColor || trackColor?.true || '#21cc4c';
  const explicitInactive = inactiveColor || trackColor?.false || 'rgb(182, 182, 182)';

  return (
    <View
      style={[
        styles.classicTrack,
        {
          backgroundColor: value ? explicitActive : explicitInactive,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.classicThumb,
          {
            backgroundColor:
              typeof thumbColor === 'object'
                ? value
                  ? thumbColor.true
                  : thumbColor.false
                : thumbColor,
            transform: [{ translateX }, { rotate: rotation }],
          },
        ]}
      />
    </View>
  );
};

// ============================================================================
// Style 3: Solar (Neumorphic LED Button)
// ============================================================================

const SolarSwitch = ({ value, anim, activeColor, inactiveColor, disabled }: any) => {
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 65], // 5px padding to right side
  });

  // LED glow animation (scale)
  const ledScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  return (
    <View
      style={[styles.solarContainer, { opacity: disabled ? 0.5 : 1 }]}
    >
      <Animated.View
        style={[
          styles.solarToggle,
          { transform: [{ translateX }] },
        ]}
      >
        <Animated.View
          style={[
            styles.solarLed,
            {
              backgroundColor: value ? activeColor : inactiveColor || '#888',
              transform: [{ scale: ledScale }],
              shadowColor: value ? activeColor : 'transparent',
              shadowOpacity: value ? 0.8 : 0,
              shadowRadius: value ? 6 : 0,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

// ============================================================================
// Style 4: Slider (Simple rectangular slide)
// ============================================================================

const SliderSwitch = ({ value, anim, activeColor, inactiveColor, disabled }: any) => {
  // The thumb slides from left (-30) to right (+30)
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-26, 26],
  });

  return (
    <View
      style={[
        styles.sliderTrack,
        {
          backgroundColor: value ? activeColor : inactiveColor || '#e2e8f0', // default inactive grey
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.sliderThumb,
          { transform: [{ translateX }] },
        ]}
      />
    </View>
  );
};

// ============================================================================
// Style 5: Elastic (Two-ball swap effect)
// ============================================================================

const ElasticSwitch = ({ value: _value, anim, activeColor, inactiveColor, disabled }: any) => {
  // Left ball (grey) slides out to left when ON
  const leftBallTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40], // Exits to the left (translateX: -150%)
  });

  // Right ball (green) slides in from right when ON
  const rightBallTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0], // 150% -> 0
  });

  return (
    <View
      style={[
        styles.elasticTrack,
        { opacity: disabled ? 0.5 : 1 },
      ]}
    >
      {/* Grey ball (left, slides out) */}
      <Animated.View
        style={[
          styles.elasticBall,
          {
            backgroundColor: inactiveColor || '#cccccc', // default inactive grey
            left: 5,
            transform: [{ translateX: leftBallTranslate }],
          },
        ]}
      />
      {/* Green ball (right, slides in) */}
      <Animated.View
        style={[
          styles.elasticBall,
          {
            backgroundColor: activeColor,
            right: 5,
            transform: [{ translateX: rightBallTranslate }],
          },
        ]}
      />
    </View>
  );
};


// ============================================================================
// Main Component
// ============================================================================

// Helper to get glass wrapper styles based on variant
const getGlassWrapperStyle = (variant: string) => {
  switch (variant) {
    case 'solar':
      return { borderRadius: 50, padding: 4 };
    case 'slider':
      return { borderRadius: 20, padding: 2 };
    case 'elastic':
      return { borderRadius: 50, padding: 2 };
    case 'classic':
    default:
      return { borderRadius: 12, padding: 2 };
  }
};

export const Toggy: React.FC<ToggyProps> = ({
  value,
  onValueChange,
  variant = 'classic',
  disabled = false,
  trackColor,
  thumbColor,
  activeColor,
  inactiveColor,
  vibration = true,
  style,
  // Liquid Glass props
  liquidGlass = false,
  liquidGlassInteractive = false,
  liquidGlassEffect = 'regular',
  liquidGlassTintColor,
  liquidGlassColorScheme = 'system',
}) => {
  // Theme integration
  const { theme } = usePressyTheme();
  
  // Resolve colors with theme fallbacks
  const resolvedActiveColor = activeColor || theme.colors.toggleActive;
  const resolvedInactiveColor = inactiveColor || theme.colors.toggleInactive;
  const resolvedThumbColor = thumbColor || theme.colors.toggleThumb;
  const resolvedTrackColor = trackColor || {
    true: resolvedActiveColor,
    false: resolvedInactiveColor,
  };
  
  const anim = useToggleAnimation(value);
  
  const handlePress = useCallback(() => {
    if (disabled) return;

    if (vibration && Platform.OS !== 'web') {
      Vibration.vibrate(Platform.OS === 'ios' ? 10 : 50);
    }

    onValueChange(!value);
  }, [disabled, vibration, onValueChange, value]);

  const renderSwitch = () => {
    switch (variant) {
      case 'solar':
        return (
          <SolarSwitch
            value={value}
            anim={anim}
            activeColor={resolvedActiveColor}
            inactiveColor={resolvedInactiveColor}
            disabled={disabled}
          />
        );
      case 'slider':
        return (
          <SliderSwitch
            value={value}
            anim={anim}
            activeColor={resolvedActiveColor}
            inactiveColor={resolvedInactiveColor}
            disabled={disabled}
          />
        );
      case 'elastic':
        return (
          <ElasticSwitch
            value={value}
            anim={anim}
            activeColor={resolvedActiveColor}
            inactiveColor={resolvedInactiveColor}
            disabled={disabled}
          />
        );
      
      case 'classic':
      default:
        return (
          <ClassicSwitch
            value={value}
            anim={anim}
            trackColor={resolvedTrackColor}
            thumbColor={resolvedThumbColor}
            activeColor={resolvedActiveColor}
            inactiveColor={resolvedInactiveColor}
            disabled={disabled}
          />
        );
    }
  };

  // Wrap in LiquidGlassWrapper when liquidGlass is enabled
  const switchContent = renderSwitch();
  
  const glassWrappedContent = liquidGlass ? (
    <LiquidGlassWrapper
      liquidGlass={liquidGlass}
      interactive={liquidGlassInteractive}
      effect={liquidGlassEffect}
      tintColor={liquidGlassTintColor}
      colorScheme={liquidGlassColorScheme}
      fallbackBackgroundColor={value 
        ? (typeof resolvedActiveColor === 'string' ? `${resolvedActiveColor}40` : undefined)
        : (typeof resolvedInactiveColor === 'string' ? `${resolvedInactiveColor}40` : undefined)
      }
      style={getGlassWrapperStyle(variant)}
    >
      {switchContent}
    </LiquidGlassWrapper>
  ) : switchContent;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={style}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      {glassWrappedContent}
    </Pressable>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  // Style 1: Classic
  classicTrack: {
    width: 59.5,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
  },
  classicThumb: {
    position: 'absolute',
    width: 23.8,
    height: 23.8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  // Style 3: Solar (Neumorphic LED)
  solarContainer: {
    width: 150,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#d6d6d6',
    justifyContent: 'center',
    // Simulated inset shadow via border
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  solarToggle: {
    position: 'absolute',
    width: 80,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#d9d9d9',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  solarLed: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Style 4: Slider
  sliderTrack: {
    width: 60,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // Inset shadow simulation
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  sliderThumb: {
    width: 52,
    height: 22,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  // Style 5: Elastic (Two-ball swap)
  elasticTrack: {
    width: 59.5,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  elasticBall: {
    position: 'absolute',
    width: 23.8,
    height: 23.8,
    borderRadius: 12,
  },

  // Style 6: Bouncer Variants
  bouncerContainer: {
    width: 48,
    height: 32,
    borderRadius: 999,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },

  // ── For bouncer-fixed ──
  bouncerTrackLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#efefef', // light
  },
  bouncerTrackRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#2a2a2a', // dark
  },
  bouncerThumb: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.2,
    elevation: 3,
  },
  // Bouncer Push Thumb (Solid color, no inner halves)
  bouncerThumbPush: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.2,
    elevation: 3,
  },
  bouncerThumbLeft: {
    width: '50%',
    height: '100%',
    backgroundColor: '#2a2a2a',
  },
  bouncerThumbRight: {
    width: '50%',
    height: '100%',
    backgroundColor: '#efefef',
  },
});
