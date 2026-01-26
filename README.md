# 🔘 rn-pressy

**The button that feels _too good_ to press.**

Sick of boring buttons? Want something that goes _boop_, _swish_, _zap_, and _pop_?
`rn-pressy` is a haptic-enabled, fully-loaded, slightly-chaotic button library for React Native.

It scales. It pulses. It glares. It shakes when you mess up. It handles your dark mode trauma automatically.

**Was it needed?** Absolutely not.
**Did i write the entire code my self?** Hell naah, credits to AI IDE's.
**Did I make it anyway?** Yes. I was bored. Now it's your problem (solution). 🤷‍♂️

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

## 🎮 Usage Examples

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

## 🤝 Contributing

Found a bug? Want to add a "backflip" animation? PRs welcome.
Just keep it fun. No corpo-speak allowed.

## 📄 License

MIT. Go wild.
