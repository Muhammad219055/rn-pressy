# 🔘 rn-pressy

**The UI library that feels _too good_ to use.**

Sick of boring buttons, dropdowns, and toggles? Want something that goes _boop_, _swish_, _zap_, and _pop_?
`rn-pressy` is a haptic-enabled, fully-loaded, slightly-chaotic UI component library for React Native.

It scales. It pulses. It glares. It shakes when you mess up. It handles your dark mode trauma automatically.

**Was it needed?** Absolutely not.
**Did i write the entire code my self?** Hell naah, credits to AI IDE's.
**Did I make it anyway?** Yes. I was bored. Now it's your problem (solution). 🤷‍♂️

---

## 📦 What's Inside?

### 🔘 Pressy - The Button

The button that started it all. Haptic feedback, animations, swipe-to-confirm, and more chaos than you asked for.

![Pressy](./assets/pressy-preview.png)

### 🎨 DDown - The Dropdown

Seamless dropdowns that extend from the button like magic. No gaps, perfect alignment, and smooth as butter.

[📖 Full DDown Documentation](./src/DDown/README.md)

![DDown](./assets/ddown-preview.png)

### 🎚️ Toggy - The Toggle

Smooth toggles with multiple variants. Classic, Solar, Slider, Elastic - pick your poison.

<!-- Add Toggy demo image here -->

![Toggy](./assets/toggy-preview.png)

### ☑️ Chex - The Checkbox

Checkboxes that don't suck. Multiple variants, smooth animations, and actually fun to click.

<!-- Add Chex demo image here -->

![Chex](./assets/chex-preview.png)

### 📝 Inpy - The Text Input

Text inputs with style. Outlined, filled, underlined - all the variants you need.

<!-- Add Inpy demo image here -->

![Inpy](./assets/inpy-preview.png)

---

## 🚀 Installation

Stop stalling. Get the goods.

```sh
npm install rn-pressy
# or
yarn add rn-pressy
```

---

## 📚 The Prop Bible

Everything you can throw at this button. Read it. Memorize it. Be the button.

### 🎨 Content & Presets

| Prop        | Type                                                   | Default   | Vibe Check                                                |
| :---------- | :----------------------------------------------------- | :-------- | :-------------------------------------------------------- |
| `title`     | `string`                                               | `-`       | What the button says. Keep it short, don't write a novel. |
| `children`  | `ReactNode`                                            | `-`       | If you think you're too cool for `title`.                 |
| `variant`   | `primary`, `secondary`, `tertiary`, `outline`, `ghost` | `primary` | The fit check. Choose your fighter.                       |
| `shape`     | `rounded`, `pill`, `circle`, `square`                  | `rounded` | Shape up or ship out. `circle` is goated for icons.       |
| `size`      | `sm`, `md`, `lg`, `xl`                                 | `md`      | Size matters. (Disclaimer: It's for hit slop).            |
| `shadow`    | `none`, `sm`, `md`, `lg`                               | `none`    | Drop it like it's hot.                                    |
| `colors`    | `Partial<PressyColors>`                                | `-`       | Override the drip manually.                               |
| `themeMode` | `light`, `dark`, `auto`                                | `auto`    | Force the mood.                                           |

### ⚡ Actions & Gestures

| Prop               | Type              | Default | Vibe Check                 |
| :----------------- | :---------------- | :------ | :------------------------- |
| `onPress`          | `(event) => void` | `-`     | The clicky bit.            |
| `onLongPress`      | `(event) => void` | `-`     | Hold it... hold it... NOW! |
| `delayLongPress`   | `number`          | `500`   | How patient are you? (ms)  |
| `onDoublePress`    | `() => void`      | `-`     | Double tap like Instagram. |
| `doublePressDelay` | `number`          | `300`   | Speedrun strats.           |

### 🎭 Animations & Effects

| Prop             | Type                                  | Default | Vibe Check                                                    |
| :--------------- | :------------------------------------ | :------ | :------------------------------------------------------------ |
| `pulse`          | `boolean`                             | `false` | Heartbeat mode. Use for "Confirm" buttons that are desperate. |
| `pulseSpeed`     | `number`                              | `1500`  | How fast is its heart racing?                                 |
| `glare`          | `boolean`                             | `false` | That premium credit card shine. ✨                            |
| `glow`           | `boolean`                             | `false` | Radioactive aura.                                             |
| `vibration`      | `boolean`, `light`, `medium`, `heavy` | `-`     | Bzzzt. Haptics make everything better.                        |
| `animationSpeed` | `number`                              | `20`    | How snappy the press feels. Lower = Snappier.                 |

### ✅ Success & Error States (The Big Brain Stuff)

Stop writing `if (success) { color: green }`. We do that for you.

| Prop            | Type      | Description                                              |
| :-------------- | :-------- | :------------------------------------------------------- |
| `isSuccess`     | `boolean` | Keeps it 💯. button turns Green + Glare (configurable).  |
| `successConfig` | `object`  | Customize the W. `{ animation: 'glare', colors: {...} }` |
| `isError`       | `boolean` | You messed up. Button turns Red + Shakes (configurable). |
| `errorConfig`   | `object`  | Customize the L. `{ shake: true, colors: {...} }`        |

### 🕵️ Swipe & Reveal

| Prop              | Type            | Default | Vibe Check                                               |
| :---------------- | :-------------- | :------ | :------------------------------------------------------- |
| `revealToPress`   | `boolean`       | `false` | Tap once to see "Are you sure?", tap again to regret it. |
| `swipeable`       | `boolean`       | `false` | Slide into the DMs (or delete them).                     |
| `swipeDirection`  | `left`, `right` | `right` | Which way we sliding?                                    |
| `onSwipeComplete` | `() => void`    | `-`     | Done deal.                                               |

---

## 🎮 Quick Start Examples

### Pressy - The "I Just Need a Button"

```tsx
import { Pressy } from 'rn-pressy';

<Pressy
  title="Press Me"
  variant="primary"
  onPress={() => console.log('Poggers')}
/>;
```

### DDown - The "Seamless Dropdown"

```tsx
import { DDown } from 'rn-pressy';

<DDown
  options={[
    { label: 'Apple', value: 'apple', icon: <Text>🍎</Text> },
    { label: 'Banana', value: 'banana', icon: <Text>🍌</Text> },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select a fruit"
  searchable
/>;
```

### Toggy - The "Smooth Toggle"

```tsx
import { Toggy } from 'rn-pressy';

<Toggy
  value={isEnabled}
  onValueChange={setIsEnabled}
  variant="solar"
  activeColor="#3b82f6"
/>;
```

### Chex - The "Fun Checkbox"

```tsx
import { Chex } from 'rn-pressy';

<Chex
  checked={isChecked}
  onValueChange={setIsChecked}
  label="I agree to the terms"
  variant="bounce"
/>;
```

### Inpy - The "Styled Input"

```tsx
import { Inpy } from 'rn-pressy';

<Inpy
  value={text}
  onChangeText={setText}
  label="Email"
  variant="outlined"
  clearable
/>;
```

---

## 🎨 Advanced Examples

### The "I Just Need a Button"

```tsx
import { Pressy } from 'rn-pressy';

<Pressy
  title="Press Me"
  variant="primary"
  onPress={() => console.log('Poggers')}
/>;
```

### The "Main Character Energy"

```tsx
<Pressy
  title="DELETE PRODUCTION DB"
  variant="primary"
  colors={{ primary: '#ff0055' }}
  // The fun stuff
  pulse={true}
  glare={true}
  vibration="heavy"
  // Logic
  isError={submissionFailed}
  errorConfig={{ shake: true }} // Wiggle of shame
  onLongPress={() => destroyEverything()}
/>
```

### The "Smart Button" (Input Validation)

```tsx
const [status, setStatus] = useState('idle');

<Pressy
  title={
    status === 'success' ? 'Sent!' : status === 'error' ? 'Retry?' : 'Submit'
  }
  isSuccess={status === 'success'}
  isError={status === 'error'}
  successConfig={{ animation: 'glare', colors: { primary: '#22c55e' } }}
  errorConfig={{ shake: true, colors: { primary: '#ef4444' } }}
  onPress={handleSubmit}
/>;
```

---

## 🎨 Theming

All components support automatic dark mode and custom theming:

```tsx
import { PressyProvider } from 'rn-pressy';

<PressyProvider mode="auto">
  <App />
</PressyProvider>;
```

### Custom Theme Colors

```tsx
<PressyProvider
  mode="dark"
  darkColors={{
    primary: '#ec4899',
    primaryText: '#fff',
    secondary: '#8b5cf6',
  }}
>
  <App />
</PressyProvider>
```

---

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (with limitations on haptics)

---

## ♿ Accessibility

All components include:

- Proper accessibility roles
- Screen reader support
- Keyboard navigation
- High contrast support
- State announcements

---

## 🤝 Contributing

Found a bug? Want to add a "backflip" animation? PRs welcome.
Just keep it fun. No corpo-speak allowed.

## 📄 License

MIT. Go wild.
