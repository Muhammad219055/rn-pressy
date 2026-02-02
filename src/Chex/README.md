# ☑️ Chex - Animated Checkbox Component

**Checkboxes that actually make you want to check them.**

Six beautifully animated checkbox variants that go way beyond the boring default. Each one has smooth animations, haptic feedback, and enough personality to make form filling almost fun.

## ✨ Variants

### 1. **Classic** - The Reliable One

Simple checkbox with smooth checkmark animation. Clean, professional, gets the job done.

### 2. **Ripple** - The Attention Seeker

Box-shadow ripple effect that pulses outward when checked. Like dropping a stone in water, but for checkboxes.

### 3. **Flip** - The Show-Off

3D flip animation with customizable text. Goes from "Nope" to "Yeah!" with style. Perfect for yes/no questions.

### 4. **Circle Path** - The Artist

Circular SVG path that draws itself in. Smooth stroke animation that's oddly satisfying to watch.

### 5. **SVG Stroke** - The Perfectionist

Stroke dash animation with mask. The checkbox literally draws itself into existence.

### 6. **Morph** - The Transformer

Morphs from circle to rounded square with a pulse effect. Shape-shifting checkbox energy.

## 📖 Basic Usage

\`\`\`tsx
import { Chex } from 'rn-pressy';

function MyComponent() {
const [checked, setChecked] = useState(false);

return (
<Chex
      checked={checked}
      onValueChange={setChecked}
      variant="ripple"
      label="Accept terms and conditions"
    />
);
}
\`\`\`

## 🎯 Examples

### All Variants

\`\`\`tsx
<Chex checked={checked} onValueChange={setChecked} variant="classic" label="Classic" />
<Chex checked={checked} onValueChange={setChecked} variant="ripple" label="Ripple" />
<Chex checked={checked} onValueChange={setChecked} variant="flip" label="Flip" />
<Chex checked={checked} onValueChange={setChecked} variant="circle-path" label="Circle Path" />
<Chex checked={checked} onValueChange={setChecked} variant="svg-stroke" label="SVG Stroke" />
<Chex checked={checked} onValueChange={setChecked} variant="morph" label="Morph" />
\`\`\`

### Custom Colors

\`\`\`tsx
<Chex
  checked={checked}
  onValueChange={setChecked}
  variant="ripple"
  primaryColor="#ec4899"
  label="Pink checkbox"
/>
\`\`\`

### Sizes

\`\`\`tsx
<Chex checked={checked} onValueChange={setChecked} size="sm" label="Small" />
<Chex checked={checked} onValueChange={setChecked} size="md" label="Medium" />
<Chex checked={checked} onValueChange={setChecked} size="lg" label="Large" />
\`\`\`

### Custom Flip Text

\`\`\`tsx
<Chex
  checked={checked}
  onValueChange={setChecked}
  variant="flip"
  flipOnText="Yes!"
  flipOffText="No"
  label="Agree?"
/>
\`\`\`

### Label Position

\`\`\`tsx
<Chex
  checked={checked}
  onValueChange={setChecked}
  label="Label on left"
  labelPosition="left"
/>
\`\`\`

### Disabled State

\`\`\`tsx
<Chex
  checked={true}
  onValueChange={setChecked}
  disabled
  label="Can't touch this"
/>
\`\`\`

## 🎛️ Props

| Prop                 | Type                                                                          | Default     | Description                                   |
| -------------------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `checked`            | `boolean`                                                                     | -           | Whether the checkbox is checked (required)    |
| `onValueChange`      | `(checked: boolean) => void`                                                  | -           | Called when checkbox state changes (required) |
| `variant`            | `'classic' \| 'ripple' \| 'flip' \| 'circle-path' \| 'svg-stroke' \| 'morph'` | `'classic'` | Visual variant                                |
| `size`               | `'sm' \| 'md' \| 'lg'`                                                        | `'md'`      | Size preset                                   |
| `disabled`           | `boolean`                                                                     | `false`     | Whether checkbox is disabled                  |
| `primaryColor`       | `string`                                                                      | `'#1677ff'` | Primary color (checked state)                 |
| `secondaryColor`     | `string`                                                                      | `'#fff'`    | Secondary color (background)                  |
| `label`              | `string`                                                                      | -           | Label text to display                         |
| `labelPosition`      | `'left' \| 'right'`                                                           | `'right'`   | Position of label                             |
| `labelStyle`         | `StyleProp<TextStyle>`                                                        | -           | Custom label styles                           |
| `style`              | `StyleProp<ViewStyle>`                                                        | -           | Custom container styles                       |
| `flipOnText`         | `string`                                                                      | `'Yeah!'`   | Text when flip variant is ON                  |
| `flipOffText`        | `string`                                                                      | `'Nope'`    | Text when flip variant is OFF                 |
| `vibration`          | `boolean`                                                                     | `true`      | Enable haptic feedback                        |
| `accessibilityLabel` | `string`                                                                      | -           | Accessibility label                           |
| `testID`             | `string`                                                                      | -           | Test ID for testing                           |

## 🎨 Variant Details

### Classic

- Simple checkmark animation
- Smooth scale transition
- Perfect for forms

### Ripple

- Box-shadow ripple effect
- Pulses outward on check
- Eye-catching without being annoying

### Flip

- 3D flip animation
- Customizable on/off text
- Great for binary choices

### Circle Path

- SVG path animation
- Circular stroke that draws in
- Smooth and elegant

### SVG Stroke

- Stroke dash animation
- Box and checkmark draw together
- Most complex animation

### Morph

- Shape morphing animation
- Circle → Rounded square
- Pulse effect on check

## ♿ Accessibility

- Proper checkbox role for screen readers
- State announcements (checked/unchecked)
- Disabled state support
- Custom accessibility labels

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web

## 💡 Tips

- Use `ripple` or `morph` for important checkboxes you want users to notice
- Use `flip` for yes/no questions or binary choices
- Use `classic` for forms where you want consistency
- The `svg-stroke` and `circle-path` variants are great for modern, minimalist designs

---

**Note**: The flip variant is wider than others due to the text. Plan your layout accordingly.
