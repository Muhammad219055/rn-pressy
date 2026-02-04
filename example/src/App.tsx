import {
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  View,
  TextInput
} from 'react-native';
import { Pressy, PressyProvider, DDown, Toggy, Chex, Inpy, type PressyRef } from 'rn-pressy';
import { Image } from 'react-native';
import BagIcon from './assets/SVGs/Bag.svg';
import { useRef, useState } from 'react';

const BagImage = require('./assets/images/bag.png');

// Helper for interactive toggles
const StatefulToggle = (props: any) => {
    const [val, setVal] = useState(props.value || false);
    return <Toggy {...props} value={val} onValueChange={setVal} />;
};

// Helper for interactive checkboxes
const ChexDemo = (props: { label: string; variant: 'classic' | 'ripple' | 'flip' | 'circle-path' | 'svg-stroke' | 'morph' }) => {
    const [checked, setChecked] = useState(false);
    return <Chex checked={checked} onValueChange={setChecked} label={props.label} variant={props.variant} />;
};

// Helper for text input demos
const InpyDemo = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    
    return (
        <View style={{ gap: 16, width: '100%' }}>
            <Inpy 
                shape='square'
                value={text1} 
                onChangeText={setText1} 
                label="Outlined (default)"
                variant="outlined"
                clearable

            />
            <Inpy 
                value={text2} 
                onChangeText={setText2} 
                label="Filled variant"
                variant="filled"
                clearable
            />
            <Inpy 
                value={text3} 
                onChangeText={setText3} 
                label="Underlined variant"
                variant="underlined"
            />
            <Inpy 
                value={text4} 
                onChangeText={setText4} 
                error="This field has an error"
                label="Error state"
                variant="outlined"
            />
        </View>
    );
};

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
// Interactive Demo (commented out for now)
// ============================================================================

// import { TextInput } from 'react-native';


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
        textStyle={{ fontWeight: '700' }}
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

      <Pressy
        title="ddd Button"
        variant="3d"
        onPress={() => Alert.alert('3D!')}
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
        variant="primary"
        onPress={() => {}}
      />
      <Pressy
        title="Small Shadow"
        shadow="sm"
        variant="primary"
        onPress={() => {}}
      />
      <Pressy
        title="Medium Shadow"
        shadow="md"
        variant="primary"
        onPress={() => {}}
      />
      <Pressy
        title="Large Shadow"
        shadow="lg"
        variant="primary"
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
            Sure?
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
      <Pressy
        swipeVariant="reveal"
        title="Swipe Right to Confirm →"
        swipeable
        swipeDirection="right"
        swipeContent={<Text style={{ fontSize: 24 }}>hey you did it</Text>}
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

      {/* ================================================================ */}
      {/* LIQUID GLASS (iOS 18+ only) */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Liquid Glass (iOS 18+)</Text>

      {/* Liquid Glass Demo Container with Visual Background */}
      <View style={styles.liquidGlassContainer}>
        {/* Colorful background elements */}
        <View style={styles.liquidGlassBg1} />
        <View style={styles.liquidGlassBg2} />
        <View style={styles.liquidGlassBg3} />
        
        {/* Glass buttons on top */}
        <View style={styles.liquidGlassContent}>
          <Pressy
            title="Frosted Glass"
            liquidGlass
            onPress={() => Alert.alert('Liquid Glass!')}
            style={{ width: '100%' }}
          />

          <Pressy
            title="Clear Glass"
            liquidGlass
            liquidGlassEffect="clear"
            onPress={() => Alert.alert('Clear Glass!')}
            style={{ width: '100%' }}
          />

          <Pressy
            title="Tinted Glass"
            liquidGlass
            liquidGlassTintColor="rgba(236, 72, 153, 0.3)"
            onPress={() => Alert.alert('Tinted Glass!')}
            style={{ width: '100%' }}
          />

          <Pressy
            title="Interactive Glass"
            liquidGlass
            liquidGlassInteractive
            onPress={() => Alert.alert('Interactive Glass!')}
            style={{ width: '100%' }}
          />
        </View>
      </View>

      {/* ================================================================ */}
      {/* DROPDOWN */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Dropdowns</Text>

      <DDown
        title="Select a Fruit"
        options={[
          { label: 'Apple', value: 'apple', icon: <Text>🍎</Text> },
          { label: 'Banana', value: 'banana', icon: <Text>🍌</Text> },
          { label: 'Orange', value: 'orange', icon: <Text>🍊</Text> },
          { label: 'Grape', value: 'grape', icon: <Text>🍇</Text> },
        ]}
        onChange={(val) => console.log('Selected:', val)}
        variant="outlined"
        style={{ width: '100%' }}
      />

      <DDown
        placeholder="Select Multiple Tags"
        options={[
            { label: 'React Native', value: 'rn' },
            { label: 'TypeScript', value: 'ts' },
            { label: 'JavaScript', value: 'js' },
            { label: 'Python', value: 'py' },
            { label: 'Go', value: 'go' },
        ]}
        multiSelect
        searchable
        searchPlaceholder="Filter tags..."
        onChange={(vals) => console.log('Tags:', vals)}
        variant="filled"
        style={{ width: '100%' }}
      />

      {/* Liquid Glass Dropdowns */}
      <View style={[styles.liquidGlassContainer, { minHeight: 180, marginTop: 12 }]}>
        <View style={[styles.liquidGlassBg1, { width: 150, height: 150 }]} />
        <View style={[styles.liquidGlassBg2, { width: 130, height: 130 }]} />
        <View style={[styles.liquidGlassBg3, { width: 100, height: 100, top: 20 }]} />
        <View style={[styles.liquidGlassContent, { gap: 12 }]}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>🧊 Liquid Glass Dropdown</Text>
          <DDown
            placeholder="Glass Dropdown"
            options={[
              { label: 'React Native', value: 'rn', icon: <Text>⚛️</Text> },
              { label: 'TypeScript', value: 'ts', icon: <Text>📘</Text> },
              { label: 'Swift', value: 'swift', icon: <Text>🍎</Text> },
            ]}
            liquidGlass
            liquidGlassInteractive
            liquidGlassEffect="regular"
            onChange={(val) => console.log('Glass:', val)}
            style={{ width: '100%' }}
          />
          <DDown
            placeholder="Clear Glass Multi"
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
            ]}
            multiSelect
            liquidGlass
            liquidGlassEffect="clear"
            liquidGlassColorScheme="system"
            onChange={(vals) => console.log('Multi Glass:', vals)}
            style={{ width: '100%' }}
          />
        </View>
      </View>

      {/* ================================================================ */}
      {/* TOGGLES */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Toggles</Text>

      <View style={styles.row}>
          <Text style={{ color: '#fff', width: 80 }}>Classic</Text>
          <StatefulToggle value={false} activeColor="#3b82f6" inactiveColor="#f59e0b"/>
          <StatefulToggle value={true} activeColor="#3c9865ff" inactiveColor="#c8244aff"/>
      </View>

      <View style={styles.row}>
          <Text style={{ color: '#fff', width: 80 }}>Solar</Text>
          <StatefulToggle value={false} variant="solar" activeColor="#3b82f6" inactiveColor="#f59e0b"/>
          <StatefulToggle value={true} variant="solar" activeColor="#3c9865ff" inactiveColor="#c8244aff"/>
      </View>

      <View style={styles.row}>
          <Text style={{ color: '#fff', width: 80 }}>Slider</Text>
          <StatefulToggle value={false} variant="slider" activeColor="#3b82f6" inactiveColor="#f59e0b"/>
          <StatefulToggle value={true} variant="slider" activeColor="#3c9865ff" inactiveColor="#c8244aff"/>
      </View>

      <View style={styles.row}>
          <Text style={{ color: '#fff', width: 80 }}>Elastic</Text>
          <StatefulToggle value={false} variant="elastic" activeColor="#3b82f6" inactiveColor="#f59e0b"/>
          <StatefulToggle value={true} variant="elastic" activeColor="#3c9865ff" inactiveColor="#c8244aff"/>
      </View>

      {/* Liquid Glass Toggles */}
      <View style={[styles.liquidGlassContainer, { minHeight: 120, marginTop: 12 }]}>
        <View style={[styles.liquidGlassBg1, { width: 100, height: 100 }]} />
        <View style={[styles.liquidGlassBg2, { width: 120, height: 120 }]} />
        <View style={[styles.liquidGlassBg3, { width: 120, height: 120 }]} />
        <View style={[ { width: 120, height: 120 }]} />
        <View style={[styles.liquidGlassContent, { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }]}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>Glass Toggle</Text>
            <StatefulToggle 
              value={false} 
              liquidGlass 
              liquidGlassEffect="regular"
              activeColor="#3b82f6" 
              inactiveColor="#64748b"
            />
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>Interactive</Text>
            <StatefulToggle 
              value={true} 
              liquidGlass 
              liquidGlassInteractive
              liquidGlassEffect="clear"
              activeColor="#22c55e" 
              inactiveColor="#64748b"
            />
          </View>
        </View>
      </View>

      {/* <View style={styles.row}>
          <Text style={{ color: '#fff', width: 80 }}>Bouncer Fixed</Text>
          <StatefulToggle value={false} variant="bouncer-fixed" />
          <StatefulToggle value={true} variant="bouncer-fixed" />
      </View>

      <View style={styles.row}>
          <Text style={{ color: '#fff', width: 80 }}>Bouncer Push</Text>
          <StatefulToggle value={false} variant="bouncer-push" />
          <StatefulToggle value={true} variant="bouncer-push" />
      </View> */}

      {/* ================================================================ */}
      {/* CHECKBOXES */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Checkboxes</Text>

      <View style={styles.row}>
        <ChexDemo label="Classic" variant="classic" />
        <ChexDemo label="Ripple" variant="ripple" />
        <ChexDemo label="Flip" variant="flip" />
      </View>

      <View style={styles.row}>
        <ChexDemo label="Circle Path" variant="circle-path" />
        <ChexDemo label="SVG Stroke" variant="svg-stroke" />
        <ChexDemo label="Morph" variant="morph" />
      </View>

      <View style={styles.row}>
        <Chex checked={true} onValueChange={() => {}} label="Checked" variant="ripple" />
        <Chex checked={false} onValueChange={() => {}} disabled label="Disabled" />
      </View>

      <View style={styles.row}>
        <Chex checked={true} onValueChange={() => {}} label="Custom Pink" variant="morph" primaryColor="#ec4899" />
        <Chex checked={true} onValueChange={() => {}} label="Custom Green" variant="ripple" primaryColor="#22c55e" />
      </View>

      {/* ================================================================ */}
      {/* TEXT INPUTS */}
      {/* ================================================================ */}
      <Text style={styles.sectionTitle}>Text Inputs</Text>

      <InpyDemo />

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
    backgroundColor: '#f9f9f9ff',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
  },
  // Liquid Glass Background Styles
  liquidGlassContainer: {
    width: '100%',
    minHeight: 400,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1a1a2e',
  },
  liquidGlassBg1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#6366f1',
    top: 20,
    left: -50,
    opacity: 0.8,
  },
  liquidGlassBg2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#ec4899',
    bottom: -50,
    right: -60,
    opacity: 0.7,
  },
  liquidGlassBg3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#14b8a6',
    top: 50,
    right: 30,
    opacity: 0.6,
  },
  liquidGlassContent: {
    padding: 20,
    gap: 16,
    zIndex: 10,
    position: 'relative',
  },
});
