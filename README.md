# 🔘 rn-pressy

**The button that feels too good to press.**

Sick of boring buttons? Want something that goes _boop_, _swish_, _zap_, and _pop_?
`rn-pressy` is a haptic-enabled, fully-loaded, slightly-chaotic button library for React Native.

It scales. It pulses. It glares. It shakes when you mess up. It handles your dark mode trauma automatically.

**Was it needed?** Absolutely not.
**Did i write the entire code my self?** Hell naah, credits to AI IDE's.
**Did I make it anyway?** Yes. I was bored. Now it's your problem (solution). 🤷‍♂️

---

## 🚀 Why tho?

- **Presets Galore**: 5 variants, 4 shapes, 4 sizes. Stop writing `borderRadius: 8` like a peasant.
- **Gestures**: Long press? Double tap? Swipe to confirm? Reveal secret menus? We got you.
- **Vibez**: Haptic feedback on everything. Your phone will buzz more than a... nevermind.
- **Animations**: Pulse, Glare, Glow, and Shake. Make your UI look like a sci-fi movie.
- **Smart States**: Handles Success (Green + Glare) and Error (Red + Shake) states automatically.
- **Theming**: Auto light/dark mode detection. It just works.

## 📦 Installation

```sh
npm install rn-pressy
# or
yarn add rn-pressy
```

## 🎮 The "Basic" Usage

```tsx
import { Pressy } from 'rn-pressy';

<Pressy
  title="Just Press Me"
  variant="primary"
  onPress={() => console.log('Boop!')}
/>;
```

## 🔥 The "I Have Too Much Time" Usage

```tsx
import { Pressy, PressyProvider } from 'rn-pressy';

<PressyProvider mode="auto">
  <Pressy
    title="Danger Zone"
    variant="outline"
    color={{ outlineBorder: '#ff0000' }}
    // Gestures
    onLongPress={() => console.log('Secret unlocked')}
    onDoublePress={() => console.log('Double tap!')}
    // Animations
    pulse
    glare
    // Logic
    isError={hasError}
    errorConfig={{ shake: true }} // Wiggle wiggle
  />
</PressyProvider>;
```

## ✨ Features

### 1. Presets (Because CSS is hard)

- **Variants**: `primary`, `secondary`, `tertiary`, `outline`, `ghost`
- **Shapes**: `rounded`, `pill`, `circle` (perfect for icons), `square`
- **Sizes**: `sm`, `md`, `lg`, `xl`

### 2. Animations (The fun stuff)

- **Pulse**: Gently throbs to get attention.
- **Glare**: A premium shine effect that wipes across.
- **Glow**: Outer shadow glow.
- **Shake**: Call `ref.current.shake()` when users verify their stupidity.

### 3. Success & Error States

Stop writing conditional styles. Just tell us if it worked.

```tsx
<Pressy
  title={status === 'success' ? 'Saved!' : 'Save'}
  isSuccess={status === 'success'}
  successConfig={{
    animation: 'glare', // Auto-trigger shine
    colors: { primary: '#22c55e' },
  }}
/>
```

### 4. Swipe & Reveal

- **Swipeable**: "Slide to Cancel" style buttons.
- **Reveal-to-Press**: Tap once to show "Confirm?", tap again to do it.

## 🤝 Contributing

Found a bug? Want to add a "backflip" animation? PRs welcome.
Just keep it fun.

## 📄 License

MIT. Use it for whatever.
