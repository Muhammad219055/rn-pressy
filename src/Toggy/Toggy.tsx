import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Pressable,
  Vibration,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import type { ToggyProps } from './types';

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

const ElasticSwitch = ({ value, anim, activeColor, inactiveColor, disabled }: any) => {
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
// New: Bouncer Variants
// ============================================================================

// ── Variant A: Fixed split track + inverted sliding thumb ──
// ── Variant A: Fixed split track + inverted sliding thumb ──
// const BouncerFixed = ({
//   value,
//   anim,
//   disabled,
// }: {
//   value: boolean;
//   anim: Animated.Value;
//   disabled: boolean;
// }) => {
//   const thumbTranslateX = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 16],
//   });

//   return (
//     <View style={[styles.bouncerContainer, disabled && styles.disabled]}>
//       <View style={styles.bouncerTrackLeft} />
//       <View style={styles.bouncerTrackRight} />

//       <Animated.View
//         style={[
//           styles.bouncerThumb,
//           { transform: [{ translateX: thumbTranslateX }] },
//         ]}
//       >
//         <View style={styles.bouncerThumbLeft} />
//         <View style={styles.bouncerThumbRight} />
//       </Animated.View>
//     </View>
//   );
// };

// ── Variant B: Improved Bouncer Push ──
// ── Variant B: Improved Bouncer Push ──
// const BouncerPush = ({
//   value,
//   anim,
//   onValueChange,
//   disabled,
// }: {
//   value: boolean;
//   anim: Animated.Value;
//   onValueChange: (v: boolean) => void;
//   disabled: boolean;
// }) => {
//   // Slide light overlay from visible (0) → fully off-screen left (-48)
//   const lightTranslateX = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, -48],
//   });

//   // Thumb color: dark when off → light when on
//   const thumbColor = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['#2a2a2a', '#efefef'],
//   });

//   // Thumb position: left → right
//   const thumbTranslateX = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 16],
//   });

//   // Optional subtle scale bounce on toggle
//   const thumbScale = anim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [1, 0.92, 1],
//   });

//   const handlePress = useCallback(() => {
//     if (!disabled) onValueChange(!value);
//   }, [disabled, onValueChange, value]);

//   return (
//     <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
//       <View style={[styles.bouncerContainer, disabled && styles.disabled]}>
//         {/* Permanent dark base */}
//         <View style={styles.bouncerTrackRight} />

//         {/* Light overlay that slides left when turning ON */}
//         <Animated.View
//           style={[
//             styles.bouncerTrackLeft,
//             {
//               transform: [{ translateX: lightTranslateX }],
//             },
//           ]}
//         />

//         {/* Solid thumb that changes color + slight bounce */}
//         <Animated.View
//           style={[
//             styles.bouncerThumbPush,
//             {
//               backgroundColor: thumbColor,
//               transform: [
//                 { translateX: thumbTranslateX },
//                 { scale: thumbScale },
//               ],
//             },
//           ]}
//         />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// ============================================================================
// Main Component
// ============================================================================

export const Toggy: React.FC<ToggyProps> = ({
  value,
  onValueChange,
  variant = 'classic',
  disabled = false,
  trackColor = { true: '#21cc4c', false: 'rgb(182, 182, 182)' },
  thumbColor = 'rgb(255, 255, 255)',
  activeColor = '#21cc4c',
  inactiveColor = '#cccccc',
  vibration = true,
  style,
}) => {
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
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            disabled={disabled}
          />
        );
      case 'slider':
        return (
          <SliderSwitch
            value={value}
            anim={anim}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            disabled={disabled}
          />
        );
      case 'elastic':
        return (
          <ElasticSwitch
            value={value}
            anim={anim}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            disabled={disabled}
          />
        );
      
      // case 'bouncer-push':
      //   return (
      //       <BouncerPush
      //           value={value}
      //           anim={anim}
      //           onValueChange={onValueChange}
      //           disabled={disabled}
      //       />
      //   );
      // case 'bouncer-fixed':
      //     return (
      //         <BouncerFixed 
      //             value={value} 
      //             anim={anim} 
      //             disabled={disabled} 
      //         />
      //     );
      // case 'bouncer':
      //     // Fallback for bouncer to bouncer-fixed
      //      return (
      //         <BouncerFixed 
      //             value={value} 
      //             anim={anim} 
      //             disabled={disabled} 
      //         />
      //     );
      case 'classic':
      default:
        return (
          <ClassicSwitch
            value={value}
            anim={anim}
            trackColor={trackColor}
            thumbColor={thumbColor}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={style}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      {renderSwitch()}
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
