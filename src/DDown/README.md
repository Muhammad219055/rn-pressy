# 🎨 DDown - The Dropdown That Actually Slaps

**When `<select>` just ain't cutting it anymore.**

You know that feeling when you're trying to make a dropdown in React Native and it looks like it time-traveled from 2010? Yeah, we fixed that. This dropdown is so smooth, it makes butter jealous.

It extends from the button like it's part of the same element (because it basically is). No awkward gaps. No janky animations. Just pure, unadulterated dropdown perfection.

**Did we need another dropdown library?** Probably not.  
**Did we make one anyway?** You bet your ass we did.  
**Will you use it?** After you see this, you won't have a choice. 😎

<!-- Add demo image/gif here -->

![DDown Demo](./assets/ddown-demo.gif)

---

## ✨ Why This Dropdown Hits Different

### 🎯 **Seamless AF Design**

- **No Gap Connection** - Dropdown and button are basically soulmates (no space between them, unlike your ex)
- **Button Stays Visible** - Trigger doesn't hide like your crush's feelings (always on top)
- **Perfect Color Matching** - They match better than your socks ever will (or your Tinder profile)
- **Smart Positioning** - Auto-flips to stay on screen (unlike your life choices)
- **Smooth Animations** - Fades in/out without the jarring scale BS (smooth operator)

### 🎭 **Visual Variants** (The Drip)

- **Default** - Clean, professional, boring (but in a good way)
- **Outlined** - Minimalist border flex
- **Filled** - Subtle background with elevation
- **Ghost** - Transparent until you need it
- **Gradient** - Eye-catching rainbow vibes

### 🔮 **Special Effects** (The Sauce)

- **Glassmorphism** - That iOS frosted glass aesthetic
- **Neumorphism** - Soft, tactile 3D (yes, it's still a thing)
- **Backdrop Blur** - Blurry background for that premium feel
- **Custom Gradients** - Unlimited color combos

### 📏 **Size Presets** (From Smol to Chonk)

- **XS** (32px) - Compact interfaces (tight fit)
- **SM** (36px) - Dense layouts (snug and cozy)
- **MD** (44px) - Standard size (the Goldilocks zone, perfectly average)
- **LG** (52px) - Prominent placement (now we're talking)
- **XL** (60px) - Hero elements (absolute units, no shame in going big)

### 🔷 **Shape Options** (Get In Formation)

- **Rounded** - Modern rounded corners (default, safe and soft)
- **Square** - Sharp, geometric edges (edgy and dangerous)
- **Pill** - Fully rounded ends (long, smooth, and satisfying)
- **Custom** - Define your own radius (go wild, we won't judge)

### 🎪 **Animations** (The Eye Candy)

- **Fade** - Smooth opacity transitions
- **Spring** - Natural, bouncy motion
- **Slide** - Directional movement
- **Bounce** - Playful elastic motion
- **Stagger** - Sequential item animations (satisfying af)
- **Ripple Effects** - Material Design touches
- **Adaptive Corners** - Border radius changes based on direction

### 🏷️ **Advanced Features** (The Big Brain Stuff)

- **Single & Multi-Select** - One or many, your choice (monogamy optional)
- **Searchable** - Find stuff fast (with debounce because we're not savages)
- **Rich Options** - Icons, descriptions, badges, custom colors (fully loaded)
- **Grouped Options** - Organize your chaos (categorize your kinks)
- **Virtualization** - Handle thousands of options without breaking a sweat (stamina for days)
- **Tags/Chips** - Beautiful multi-select display (collect them all)
- **Smart Positioning** - Auto-flip, boundary detection (knows its limits)
- **Loading States** - Built-in spinny bois (patience is a virtue)
- **Keyboard Navigation** - For the keyboard warriors (finger dexterity matters)
- **Accessibility** - Screen reader friendly (we're not monsters, everyone's invited)

---

## 📖 Basic Usage (The Bare Minimum)

```tsx
import { DDown } from 'rn-pressy';

const options = [
  { label: 'Apple', value: 'apple', icon: <Text>🍎</Text> },
  { label: 'Banana', value: 'banana', icon: <Text>🍌</Text> },
  { label: 'Cherry', value: 'cherry', icon: <Text>🍒</Text> },
];

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <DDown
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
    />
  );
}
```

Congrats, you made a dropdown. Your CS professor would be proud (maybe). 🎉

---

## 🎯 Examples (The Good Stuff)

### Single vs Multi-Select (One or Many)

```tsx
// Single Select (default)
<DDown
  options={options}
  value={singleValue}
  onChange={setSingleValue}
  placeholder="Select one option"
  // Pick one, commit to it (monogamy mode)
/>

// Multi-Select (commitment issues welcome)
<DDown
  options={options}
  value={multipleValues}  // Array of values
  onChange={setMultipleValues}
  placeholder="Select multiple options"
  multiSelect
  selectAll    // "Select All" button for the greedy
  clearable    // "Clear" button for the indecisive (or post-nut clarity)
/>
```

### Glassmorphism Multi-Select (The Premium Flex)

```tsx
<DDown
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  multiSelect
  glassmorphism
  backdropBlur={30}
  backdropOpacity={0.3}
  animationType="spring"
  springTension={150}
  springFriction={8}
  rippleEffect
  staggerAnimation
  placeholder="Select frameworks"
  // iOS vibes on Android (don't tell Apple)
  // Slippery when wet, handle with care
/>
```

### Gradient Variant (Rainbow Mode)

```tsx
<DDown
  options={options}
  value={value}
  onChange={setValue}
  variant="gradient"
  gradientColors={['#667eea', '#764ba2']}
  size="lg"
  shape="rounded"
  animationType="bounce"
  bounceOnSelect
  rippleColor="rgba(255, 255, 255, 0.3)"
  placeholder="Gradient dropdown"
  // Taste the rainbow
/>
```

### Neumorphism with Floating Label (Soft Boi Energy)

```tsx
<DDown
  options={options}
  value={value}
  onChange={setValue}
  neumorphism
  floatingLabel
  floatingLabelText="Choose Option"
  size="xl"
  animationType="scale"
  animationDuration={300}
  pulseOnFocus
  placeholder="Neumorphic dropdown"
  // Soft and squishy (like... you know)
  // Tactile pleasure guaranteed
/>
```

### Size Variants (From Smol to Chonk)

```tsx
{
  /* Extra Small */
}
<DDown options={options} size="xs" variant="ghost" placeholder="Extra Small" />;

{
  /* Small */
}
<DDown options={options} size="sm" variant="filled" placeholder="Small" />;

{
  /* Medium (Default) */
}
<DDown options={options} size="md" variant="default" placeholder="Medium" />;

{
  /* Large */
}
<DDown options={options} size="lg" variant="outlined" placeholder="Large" />;

{
  /* Extra Large (Absolute Unit) */
}
<DDown
  options={options}
  size="xl"
  variant="gradient"
  gradientColors={['#ff6b6b', '#feca57']}
  placeholder="Extra Large"
/>;
```

### Shape Variants (Geometry Class Flashbacks)

```tsx
{
  /* Rounded Corners */
}
<DDown
  options={options}
  shape="rounded"
  variant="default"
  placeholder="Rounded"
/>;

{
  /* Square Edges (Edgy) */
}
<DDown
  options={options}
  shape="square"
  variant="outlined"
  placeholder="Square"
/>;

{
  /* Pill Shape (Tic-Tac Mode) */
}
<DDown
  options={options}
  shape="pill"
  variant="filled"
  placeholder="Pill Shape"
/>;
```

### Multi-Select with Tags (Chip Chip Hooray)

```tsx
<DDown
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  multiSelect
  maxTagsVisible={3}
  selectAll
  clearable
  placeholder="Select multiple options"
  // Tags for days
/>
```

### Searchable with Rich Options (The Fancy One)

```tsx
const richOptions = [
  {
    label: 'React',
    value: 'react',
    description: 'A JavaScript library for building user interfaces',
    badge: 'Popular',
    icon: <Text>⚛️</Text>,
    color: '#61dafb',
  },
  // ... more options
];

<DDown
  options={richOptions}
  searchable
  searchPlaceholder="Search frameworks..."
  filterFunction={(option, query) =>
    option.label.toLowerCase().includes(query.toLowerCase()) ||
    option.description?.toLowerCase().includes(query.toLowerCase())
  }
  // Search game strong
/>;
```

### Grouped Options (Organize Your Chaos)

```tsx
const groupedOptions = [
  {
    title: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple', group: 'fruits' },
      { label: 'Banana', value: 'banana', group: 'fruits' },
    ],
  },
  {
    title: 'Vegetables',
    collapsible: true,
    options: [
      { label: 'Carrot', value: 'carrot', group: 'vegetables' },
      { label: 'Broccoli', value: 'broccoli', group: 'vegetables' },
    ],
  },
];

<DDown options={groupedOptions} grouped multiSelect />;
```

### Virtualized for Large Datasets (Performance King)

```tsx
<DDown
  options={thousandsOfOptions}
  virtualized
  initialNumToRender={20}
  searchable
  maxHeight={300}
  // Handles thousands of options like a boss
/>
```

### Custom Rendering (Full Control)

```tsx
<DDown
  options={options}
  renderOption={({ option, isSelected, onSelect }) => (
    <CustomOptionComponent
      option={option}
      selected={isSelected}
      onPress={onSelect}
    />
  )}
  renderTrigger={({ selectedOptions, onPress, isOpen }) => (
    <CustomTriggerComponent
      options={selectedOptions}
      onPress={onPress}
      expanded={isOpen}
    />
  )}
  // Go wild, make it yours
/>
```

---

## 🎛️ Props Reference (The Whole Menu)

### Basic Props (The Essentials)

| Prop          | Type                            | Default           | What It Do             |
| ------------- | ------------------------------- | ----------------- | ---------------------- |
| `options`     | `DDownOption[] \| DDownGroup[]` | -                 | Your dropdown items    |
| `value`       | `string \| number \| array`     | -                 | Selected value(s)      |
| `onChange`    | `(value) => void`               | -                 | When selection changes |
| `placeholder` | `string`                        | `'Select option'` | Placeholder text       |
| `multiSelect` | `boolean`                       | `false`           | Enable multi-selection |
| `disabled`    | `boolean`                       | `false`           | Make it useless        |

### UI & Styling Props (The Drip)

| Prop              | Type                                                           | Default     | What It Do             |
| ----------------- | -------------------------------------------------------------- | ----------- | ---------------------- |
| `variant`         | `'default' \| 'outlined' \| 'filled' \| 'ghost' \| 'gradient'` | `'default'` | Visual variant         |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                         | `'md'`      | Size preset            |
| `shape`           | `'rounded' \| 'square' \| 'pill' \| 'custom'`                  | `'rounded'` | Shape preset           |
| `glassmorphism`   | `boolean`                                                      | `false`     | Enable frosted glass   |
| `neumorphism`     | `boolean`                                                      | `false`     | Enable soft 3D         |
| `gradientColors`  | `string[]`                                                     | -           | Gradient colors        |
| `backdropBlur`    | `number`                                                       | `20`        | Blur intensity (0-100) |
| `backdropOpacity` | `number`                                                       | `0.4`       | Backdrop opacity (0-1) |
| `floatingLabel`   | `boolean`                                                      | `false`     | Enable floating label  |

### Animation Props (The Sauce)

| Prop                | Type                                                   | Default    | What It Do              |
| ------------------- | ------------------------------------------------------ | ---------- | ----------------------- |
| `animationType`     | `'fade' \| 'scale' \| 'slide' \| 'bounce' \| 'spring'` | `'spring'` | Animation type          |
| `animationDuration` | `number`                                               | `200`      | Animation duration (ms) |
| `springTension`     | `number`                                               | `120`      | Spring tension          |
| `springFriction`    | `number`                                               | `12`       | Spring friction         |
| `staggerAnimation`  | `boolean`                                              | `false`    | Stagger items           |
| `staggerDelay`      | `number`                                               | `50`       | Stagger delay (ms)      |
| `rippleEffect`      | `boolean`                                              | `true`     | Enable ripple           |
| `bounceOnSelect`    | `boolean`                                              | `false`    | Bounce on selection     |

### Search Props (Find Stuff Fast)

| Prop                | Type                         | Default        | What It Do           |
| ------------------- | ---------------------------- | -------------- | -------------------- |
| `searchable`        | `boolean`                    | `false`        | Enable search        |
| `searchPlaceholder` | `string`                     | `'Search...'`  | Search placeholder   |
| `filterFunction`    | `(option, query) => boolean` | Default filter | Custom filter        |
| `searchDebounce`    | `number`                     | `300`          | Search debounce (ms) |

### Display Props (The Layout)

| Prop             | Type                            | Default  | What It Do            |
| ---------------- | ------------------------------- | -------- | --------------------- |
| `maxHeight`      | `number`                        | `300`    | Max dropdown height   |
| `minHeight`      | `number`                        | -        | Min dropdown height   |
| `maxTagsVisible` | `number`                        | `3`      | Max tags before count |
| `position`       | `'auto' \| 'top' \| 'bottom'`   | `'auto'` | Dropdown position     |
| `alignment`      | `'left' \| 'right' \| 'center'` | `'left'` | Dropdown alignment    |

### Advanced Props (Big Brain Time)

| Prop                 | Type                | Default | What It Do              |
| -------------------- | ------------------- | ------- | ----------------------- |
| `virtualized`        | `boolean`           | `false` | Enable virtualization   |
| `initialNumToRender` | `number`            | `10`    | Initial items to render |
| `loading`            | `boolean`           | `false` | Show loading state      |
| `error`              | `string \| boolean` | -       | Show error state        |
| `grouped`            | `boolean`           | `false` | Enable grouping         |
| `selectAll`          | `boolean`           | `false` | Show select all         |
| `clearable`          | `boolean`           | `true`  | Show clear button       |
| `portal`             | `boolean`           | `false` | Render in portal        |

---

## 🏗️ Option Structure (The Blueprint)

```typescript
interface DDownOption {
  label: string; // Display text
  value: string | number; // Unique value
  icon?: ReactNode; // Optional icon
  description?: string; // Optional description
  badge?: string | number; // Optional badge
  color?: string; // Optional text color
  disabled?: boolean; // Disable option
  group?: string; // Group identifier
  children?: DDownOption[]; // Nested options
  data?: any; // Custom data
}
```

---

## 🎨 Theming (Match Your Vibe)

The component automatically adapts to your Pressy theme:

```tsx
import { PressyProvider } from 'rn-pressy';

<PressyProvider theme={customTheme} mode="dark">
  <DDown options={options} />
</PressyProvider>;
```

---

## ♿ Accessibility (We're Not Monsters)

The component includes:

- Screen reader compatibility (blind homies welcome)
- Keyboard navigation (for the keyboard warriors)
- Proper ARIA labels (semantic HTML but for React Native)
- Focus management (knows where you are)
- High contrast support (for the light-sensitive vampires)

---

## 🎭 Animations (The Smooth Moves)

Smooth animations are built-in:

- Dropdown open/close (fade in/out, no jarring scale)
- Chevron rotation (satisfying spin)
- Tag animations (chips that pop)
- Loading states (spinny bois)
- Hover effects (on web)

---

## 📱 Mobile Optimizations (Phone-Friendly)

- Touch-friendly hit areas (fat finger approved)
- Keyboard avoidance (doesn't hide behind keyboard)
- Safe area handling (notch-aware)
- Responsive positioning (stays on screen)
- Gesture support (swipe-friendly)

---

## 🔧 Performance (Speed Demon)

- Virtualization for large datasets (thousands of items, no sweat)
- Debounced search (doesn't spam your filter function)
- Optimized re-renders (React.memo all the things)
- Memory efficient (doesn't leak like your ex)
- Smooth scrolling (60fps or bust)

---

## 🧪 Testing (For The Responsible Devs)

The component includes comprehensive test IDs:

```tsx
<DDown testID="my-dropdown" options={options} />
```

This generates:

- `my-dropdown-trigger` - Trigger button
- `my-dropdown-modal` - Modal container
- `my-dropdown-option-{value}` - Individual options

---

## 🎭 Best Practices (Don't Be That Person)

1. **Use appropriate variants** - Match your app's design system
2. **Don't overload options** - Use virtualization for large lists
3. **Provide search** - If you have more than 10 options, make it searchable
4. **Use rich options** - Icons and descriptions help users
5. **Consider accessibility** - Not everyone can see your fancy animations
6. **Test on devices** - Dropdowns behave differently on real hardware

---

## 🤝 Contributing

Found a bug? Want to add a feature? PRs welcome.  
Just keep it fun. No corpo-speak allowed. We're here for a good time, not a long time.

---

## 📄 License

MIT - Do whatever you want with it. Make it rain dropdowns. I don't care. Just don't sue me if your app becomes sentient.
