import {
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';
import { Pressy, PressyProvider, type PressyRef } from 'rn-pressy';
import { Image } from 'react-native';
import BagIcon from './assets/SVGs/Bag.svg';
import { useRef, useState } from 'react';

const BagImage = require('./assets/images/bag.png');

function ShakeDemo() {
  const shakeRef = useRef<PressyRef>(null);

  return (
    <Pressy
      ref={shakeRef}
      title="Shake on Error"
      variant="outline"
      colors={{ outlineBorder: '#ef4444', outlineText: '#ef4444' }}
      onPress={() => {
        shakeRef.current?.shake();
        // Alert.alert('Error triggered!');
      }}
    />
  );
}

// ============================================================================
// Interactive Demo
// ============================================================================

import { TextInput } from 'react-native';

function InteractiveDemo() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = () => {
    if (text.toLowerCase() === 'hello') {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <View
      style={{
        width: '100%',
        padding: 20,
        gap: 12,
        backgroundColor: '#1e293b',
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
        Interactive Demo
      </Text>
      <Text style={{ color: '#94a3b8', fontSize: 12 }}>
        Type "Hello" for success, anything else for error
      </Text>

      <TextInput
        value={text}
        onChangeText={(val) => {
          setText(val);
          setStatus('idle');
        }}
        placeholder="Type here..."
        placeholderTextColor="#64748b"
        style={{
          backgroundColor: '#0f172a',
          color: '#fff',
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#334155',
        }}
        autoCapitalize="none"
      />

      <Pressy
        title={
          status === 'success'
            ? 'Success!'
            : status === 'error'
            ? 'Try Again'
            : 'Submit'
        }
        onPress={handleSubmit}
        isSuccess={status === 'success'}
        isError={status === 'error'}
        successConfig={{
          colors: { primary: '#22c55e', primaryText: '#fff' },
          animation: 'glare',
        }}
        errorConfig={{
          colors: { primary: '#ef4444', primaryText: '#fff' },
          shake: true,
        }}
        style={{ width: '100%' }}
      />
    </View>
  );
}

function DemoContent() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <InteractiveDemo />

      {/* ================================================================ */}
      {/* VARIANTS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Variants</Text>

      <Pressy
        title="Primary"
        variant="primary"
        onPress={() => Alert.alert('Primary!')}
      />

      <Pressy
        title="Secondary"
        variant="secondary"
        onPress={() => Alert.alert('Secondary!')}
      />

      <Pressy
        title="Tertiary"
        variant="tertiary"
        onPress={() => Alert.alert('Tertiary!')}
      />

      <Pressy
        title="Outline"
        variant="outline"
        onPress={() => Alert.alert('Outline!')}
      />

      <Pressy
        title="Ghost"
        variant="ghost"
        onPress={() => Alert.alert('Ghost!')}
      />

      {/* ================================================================ */}
      {/* SIZES */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Sizes</Text>

      <Pressy title="Small" size="sm" onPress={() => {}} />
      <Pressy title="Medium" size="md" onPress={() => {}} />
      <Pressy title="Large" size="lg" onPress={() => {}} />
      <Pressy title="Extra Large" size="xl" onPress={() => {}} />

      {/* ================================================================ */}
      {/* SHAPES */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Shapes</Text>

      <Pressy title="Rounded" shape="rounded" onPress={() => {}} />
      <Pressy title="Pill Shape" shape="pill" onPress={() => {}} />
      <Pressy
        icon={<Text style={{ color: '#fff' }}>+</Text>}
        shape="circle"
        onPress={() => Alert.alert('Circle!')}
      />
      <Pressy
        icon={<Text style={{ color: '#fff' }}>■</Text>}
        shape="square"
        onPress={() => Alert.alert('Square!')}
      />

      {/* ================================================================ */}
      {/* SHADOWS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Shadows</Text>

      <Pressy
        title="No Shadow"
        shadow="none"
        variant="tertiary"
        onPress={() => {}}
      />
      <Pressy
        title="Small Shadow"
        shadow="sm"
        variant="tertiary"
        onPress={() => {}}
      />
      <Pressy
        title="Medium Shadow"
        shadow="md"
        variant="tertiary"
        onPress={() => {}}
      />
      <Pressy
        title="Large Shadow"
        shadow="lg"
        variant="tertiary"
        onPress={() => {}}
      />

      {/* ================================================================ */}
      {/* ICONS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Icons</Text>

      <Pressy
        title="Icon Left"
        icon={<BagIcon width={20} height={20} fill="#fff" />}
        onPress={() => Alert.alert('Icon Left!')}
      />

      <Pressy
        title="Icon Right"
        icon={<BagIcon width={20} height={20} fill="#fff" />}
        iconPosition="right"
        onPress={() => Alert.alert('Icon Right!')}
      />

      <Pressy
        title="Image Icon"
        icon={
          <Image
            source={BagImage}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        }
        onPress={() => Alert.alert('Image!')}
      />

      <Pressy
        title="Emoji 🚀"
        icon={<Text>🚀</Text>}
        onPress={() => Alert.alert('Emoji!')}
      />

      {/* ================================================================ */}
      {/* GESTURES */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Gestures</Text>

      <Pressy
        title="Long Press Me"
        variant="secondary"
        onLongPress={() => Alert.alert('Long Pressed!')}
        onPress={() => Alert.alert('Short Press')}
      />

      <Pressy
        title="Double Tap Me"
        variant="secondary"
        onDoublePress={() => Alert.alert('Double Tapped! 🎉')}
        // onPress={() => Alert.alert('Single Tap')}
      />

      {/* ================================================================ */}
      {/* REVEAL TO PRESS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Reveal to Press</Text>

      <Pressy
        title="Tap to Reveal"
        variant="outline"
        revealToPress
        revealContent={
          <Text style={{ color: '#22c55e', fontWeight: '700' }}>
            Confirm? Tap Again
          </Text>
        }
        onReveal={() => console.log('Revealed!')}
        onPress={() => Alert.alert('Confirmed! ✅')}
      />

      {/* ================================================================ */}
      {/* SWIPEABLE */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Swipeable</Text>

      <Pressy
        title="Swipe Right to Confirm →"
        swipeable
        swipeDirection="right"
        swipeContent={<Text style={{ fontSize: 24 }}>✓</Text>}
        onSwipeComplete={() => Alert.alert('Swiped! ✅')}
        style={{ width: '100%' }}
      />

      {/* ================================================================ */}
      {/* STATES */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>States</Text>

      <Pressy title="Disabled" disabled onPress={() => {}} />

      <Pressy
        title="Custom Disabled Opacity"
        disabled
        disabledOpacity={0.3}
        onPress={() => {}}
      />

      <Pressy title="Loading..." isLoading onPress={() => {}} />

      <Pressy
        title="Custom Loader"
        isLoading
        loader={<ActivityIndicator color="#fff" size="small" />}
        onPress={() => {}}
      />

      {/* ================================================================ */}
      {/* HAPTICS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Haptics</Text>

      <Pressy
        title="Light Haptic"
        vibration="light"
        onPress={() => Alert.alert('Light!')}
      />
      <Pressy
        title="Medium Haptic"
        vibration="medium"
        onPress={() => Alert.alert('Medium!')}
      />
      <Pressy
        title="Heavy Haptic"
        vibration="heavy"
        onPress={() => Alert.alert('Heavy!')}
      />

      {/* ================================================================ */}
      {/* CUSTOM ANIMATION */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Custom Animation</Text>

      <Pressy
        title="Subtle Press"
        scaleValue={0.98}
        opacityValue={0.9}
        animationSpeed={30}
        onPress={() => Alert.alert('Subtle!')}
      />

      <Pressy
        title="Bouncy Press"
        scaleValue={0.9}
        opacityValue={0.6}
        animationSpeed={10}
        onPress={() => Alert.alert('Bouncy!')}
      />

      {/* ================================================================ */}
      {/* CUSTOM COLORS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Custom Colors</Text>

      <Pressy
        title="Custom Primary"
        colors={{ primary: '#ec4899', primaryText: '#fff' }}
        onPress={() => Alert.alert('Pink!')}
      />

      <Pressy
        title="Custom Outline"
        variant="outline"
        colors={{ outlineBorder: '#22c55e', outlineText: '#22c55e' }}
        onPress={() => Alert.alert('Green Outline!')}
      />

      {/* ================================================================ */}
      {/* EFFECTS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Effects</Text>

      <Pressy
        title="Pulse Effect"
        variant="primary"
        pulse
        onPress={() => Alert.alert('Pulse!')}
      />

      <Pressy
        title="Glare Effect"
        variant="secondary"
        glare
        onPress={() => Alert.alert('Glare!')}
      />

      <Pressy
        title="Glow Effect"
        variant="tertiary"
        glow
        glowColor="#6366f1"
        onPress={() => Alert.alert('Glow!')}
      />

      <ShakeDemo />
    </ScrollView>
  );
}

export default function App() {
  return (
    <PressyProvider mode="auto">
      <SafeAreaView style={styles.container}>
        <DemoContent />
      </SafeAreaView>
    </PressyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 12,
  },
  sectionTitle: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 24,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});
