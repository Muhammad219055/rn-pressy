import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DDown } from './DDown';
import type { DDownOption, DDownGroup } from './types';

// Sample data with enhanced options
const basicOptions: DDownOption[] = [
  { 
    label: 'Apple', 
    value: 'apple', 
    icon: <Text>🍎</Text>,
    description: 'Crisp and refreshing fruit',
    badge: 'Popular',
  },
  { 
    label: 'Banana', 
    value: 'banana', 
    icon: <Text>🍌</Text>,
    description: 'Rich in potassium',
    badge: 'Healthy',
  },
  { 
    label: 'Cherry', 
    value: 'cherry', 
    icon: <Text>🍒</Text>,
    description: 'Sweet summer fruit',
    color: '#dc2626',
  },
  { 
    label: 'Date', 
    value: 'date', 
    icon: <Text>🌴</Text>,
    description: 'Natural sweetener',
  },
  { 
    label: 'Elderberry', 
    value: 'elderberry', 
    icon: <Text>🫐</Text>,
    description: 'Antioxidant superfruit',
    badge: 'Super',
  },
];

const frameworkOptions: DDownOption[] = [
  {
    label: 'React',
    value: 'react',
    description: 'A JavaScript library for building user interfaces',
    badge: 'Popular',
    icon: <Text>⚛️</Text>,
    color: '#61dafb',
  },
  {
    label: 'Vue.js',
    value: 'vue',
    description: 'The Progressive JavaScript Framework',
    badge: 'New',
    icon: <Text>💚</Text>,
    color: '#4fc08d',
  },
  {
    label: 'Angular',
    value: 'angular',
    description: 'Platform for building mobile and desktop web applications',
    icon: <Text>🅰️</Text>,
    color: '#dd0031',
  },
  {
    label: 'Svelte',
    value: 'svelte',
    description: 'Cybernetically enhanced web apps',
    badge: 'Fast',
    icon: <Text>🔥</Text>,
    color: '#ff3e00',
  },
];

const groupedOptions: DDownGroup[] = [
  {
    title: 'Frontend Frameworks',
    options: [
      { label: 'React', value: 'react', icon: <Text>⚛️</Text>, group: 'frontend' },
      { label: 'Vue.js', value: 'vue', icon: <Text>💚</Text>, group: 'frontend' },
      { label: 'Angular', value: 'angular', icon: <Text>🅰️</Text>, group: 'frontend' },
    ],
  },
  {
    title: 'Backend Technologies',
    options: [
      { label: 'Node.js', value: 'node', icon: <Text>🟢</Text>, group: 'backend' },
      { label: 'Python', value: 'python', icon: <Text>🐍</Text>, group: 'backend' },
      { label: 'Go', value: 'go', icon: <Text>🐹</Text>, group: 'backend' },
    ],
  },
];

export const DDownExamples: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string | number>('');
  const [multiValue, setMultiValue] = useState<(string | number)[]>([]);
  const [glassmorphValue, setGlassmorphValue] = useState<string | number>('');
  const [neumorphValue, setNeumorphValue] = useState<string | number>('');
  const [gradientValue, setGradientValue] = useState<(string | number)[]>([]);
  const [floatingValue, setFloatingValue] = useState<string | number>('');
  const [animatedValue, setAnimatedValue] = useState<string | number>('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🎨 Stunning DDown Showcase</Text>

      {/* Enhanced Basic Dropdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Enhanced Basic Dropdown</Text>
        <DDown
          options={basicOptions}
          value={basicValue}
          onChange={setBasicValue}
          placeholder="Select a fruit"
          title="Choose Your Favorite Fruit"
          size="lg"
          variant="default"
          shape="rounded"
          rippleEffect
          bounceOnSelect
          staggerAnimation
          staggerDelay={75}
        />
      </View>

      {/* Perfect Style Matching Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Seamless Dropdown Connection</Text>
        <Text style={styles.description}>
          ✨ Dropdown extends directly from button with NO gap{'\n'}
          🔗 Button stays visible on top of overlay{'\n'}
          📍 Dynamic positioning (top/bottom){'\n'}
          🎨 Perfect color and border matching{'\n'}
          ✂️ Clean dividers between items{'\n'}
          🌓 Enhanced shadow separation when open
        </Text>
        
        <Text style={[styles.description, { marginTop: 12, fontWeight: '600' }]}>
          Single Select (seamless connection):
        </Text>
        <DDown
          options={frameworkOptions}
          value={basicValue}
          onChange={setBasicValue}
          placeholder="Select a framework"
          variant="default"
          size="lg"
          shape="rounded"
          title="Choose Framework"
          searchable
        />
        
        <View style={{ height: 16 }} />
        
        <Text style={[styles.description, { fontWeight: '600' }]}>
          Multi Select (extends from button):
        </Text>
        <DDown
          options={frameworkOptions}
          value={multiValue}
          onChange={setMultiValue}
          placeholder="Select multiple frameworks"
          multiSelect
          variant="filled"
          size="md"
          shape="rounded"
          title="Multiple Selection"
          selectAll
          clearable
        />
        
        <View style={{ height: 16 }} />
        
        <Text style={[styles.description, { fontWeight: '600' }]}>
          Outlined Variant (button on top):
        </Text>
        <DDown
          options={basicOptions}
          value=""
          onChange={() => {}}
          placeholder="Outlined style"
          variant="outlined"
          size="lg"
          shape="pill"
          title="Outlined Dropdown"
        />
      </View>

      {/* Glassmorphism Multi-Select */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔮 Glassmorphism Multi-Select</Text>
        <DDown
          options={frameworkOptions}
          value={multiValue}
          onChange={setMultiValue}
          placeholder="Select frameworks"
          multiSelect
          searchable
          selectAll
          glassmorphism
          backdropBlur={30}
          backdropOpacity={0.3}
          animationType="spring"
          springTension={150}
          springFriction={8}
          maxTagsVisible={2}
          size="md"
          shape="pill"
          title="JavaScript Frameworks"
          shimmerLoading={false}
        />
      </View>

      {/* Gradient Variant */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌈 Gradient Variant</Text>
        <DDown
          options={basicOptions}
          value={gradientValue}
          onChange={setGradientValue}
          placeholder="Gradient dropdown"
          multiSelect
          variant="gradient"
          gradientColors={['#667eea', '#764ba2']}
          size="lg"
          shape="rounded"
          animationType="bounce"
          rippleEffect
          rippleColor="rgba(255, 255, 255, 0.3)"
        />
      </View>

      {/* Neumorphism Style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Neumorphism Style</Text>
        <DDown
          options={frameworkOptions}
          value={neumorphValue}
          onChange={setNeumorphValue}
          placeholder="Neumorphic dropdown"
          neumorphism
          size="xl"
          shape="rounded"
          animationType="scale"
          animationDuration={300}
          searchable
          pulseOnFocus
        />
      </View>

      {/* Floating Label */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏷️ Floating Label</Text>
        <DDown
          options={basicOptions}
          value={floatingValue}
          onChange={setFloatingValue}
          placeholder="Select option"
          floatingLabel
          floatingLabelText="Choose Fruit"
          variant="outlined"
          size="lg"
          shape="rounded"
          animationType="slide"
        />
      </View>

      {/* Custom Animations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎪 Custom Animations</Text>
        <DDown
          options={frameworkOptions}
          value={animatedValue}
          onChange={setAnimatedValue}
          placeholder="Animated dropdown"
          searchable
          staggerAnimation
          staggerDelay={100}
          bounceOnSelect
          rippleEffect
          animationType="bounce"
          animationDuration={400}
          chevronRotation={270}
          size="lg"
          variant="filled"
          shape="rounded"
        />
      </View>

      {/* Grouped with Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📁 Grouped Options</Text>
        <DDown
          options={groupedOptions}
          value={[]}
          onChange={() => {}}
          placeholder="Select technologies"
          multiSelect
          grouped
          searchable
          variant="outlined"
          size="md"
          shape="rounded"
          glassmorphism
          backdropBlur={20}
          staggerAnimation
          title="Technology Stack"
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📏 Size Variants</Text>
        
        <View style={styles.sizeRow}>
          <Text style={styles.sizeLabel}>XS:</Text>
          <DDown
            options={basicOptions.slice(0, 3)}
            value=""
            onChange={() => {}}
            placeholder="Extra Small"
            size="xs"
            variant="ghost"
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        <View style={styles.sizeRow}>
          <Text style={styles.sizeLabel}>SM:</Text>
          <DDown
            options={basicOptions.slice(0, 3)}
            value=""
            onChange={() => {}}
            placeholder="Small"
            size="sm"
            variant="filled"
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        <View style={styles.sizeRow}>
          <Text style={styles.sizeLabel}>MD:</Text>
          <DDown
            options={basicOptions.slice(0, 3)}
            value=""
            onChange={() => {}}
            placeholder="Medium"
            size="md"
            variant="default"
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        <View style={styles.sizeRow}>
          <Text style={styles.sizeLabel}>LG:</Text>
          <DDown
            options={basicOptions.slice(0, 3)}
            value=""
            onChange={() => {}}
            placeholder="Large"
            size="lg"
            variant="outlined"
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        <View style={styles.sizeRow}>
          <Text style={styles.sizeLabel}>XL:</Text>
          <DDown
            options={basicOptions.slice(0, 3)}
            value=""
            onChange={() => {}}
            placeholder="Extra Large"
            size="xl"
            variant="gradient"
            gradientColors={['#ff6b6b', '#feca57']}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>
      </View>

      {/* Shape Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔷 Shape Variants</Text>
        
        <DDown
          options={basicOptions.slice(0, 3)}
          value=""
          onChange={() => {}}
          placeholder="Rounded"
          shape="rounded"
          variant="default"
          style={{ marginBottom: 12 }}
        />

        <DDown
          options={basicOptions.slice(0, 3)}
          value=""
          onChange={() => {}}
          placeholder="Square"
          shape="square"
          variant="outlined"
          style={{ marginBottom: 12 }}
        />

        <DDown
          options={basicOptions.slice(0, 3)}
          value=""
          onChange={() => {}}
          placeholder="Pill Shape"
          shape="pill"
          variant="filled"
        />
      </View>

      {/* Loading and Error States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏳ Loading & Error States</Text>
        
        <DDown
          options={[]}
          value=""
          onChange={() => {}}
          placeholder="Loading..."
          loading
          shimmerLoading
          loadingText="Fetching awesome options..."
          size="md"
          variant="default"
          style={{ marginBottom: 12 }}
        />

        <DDown
          options={[]}
          value=""
          onChange={() => {}}
          placeholder="Error state"
          error="Failed to load options"
          errorText="Something went wrong, please try again"
          size="md"
          variant="outlined"
        />
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#374151',
    letterSpacing: 0.3,
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    width: 30,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
});