# MCP Server Usage Examples

This document shows how AI assistants can use the rn-pressy MCP server to help developers.

## Example Conversations

### Example 1: Getting Started

**User**: "How do I create a button with rn-pressy?"

**AI Assistant** (using MCP):

1. Calls `get_component_info` with `component: "Pressy"`
2. Calls `get_component_example` with `component: "Pressy", type: "basic"`

**Response**:

```tsx
import { Pressy } from 'rn-pressy';

<Pressy
  title="Click Me"
  variant="primary"
  onPress={() => console.log('Pressed!')}
/>;
```

---

### Example 2: Finding Features

**User**: "Which components support haptic feedback?"

**AI Assistant** (using MCP):

1. Calls `search_features` with `query: "haptic"`

**Response**:
All components support haptic feedback:

- **Pressy**: Configurable vibration intensity (light, medium, heavy)
- **Toggy**: Haptic feedback on toggle
- **Chex**: Haptic feedback on check/uncheck
- **Inpy**: Haptic feedback on focus

---

### Example 3: Comparing Options

**User**: "What are the different checkbox styles available?"

**AI Assistant** (using MCP):

1. Calls `compare_variants` with `component: "Chex"`

**Response**:
Chex has 6 variants:

- **classic**: Simple checkmark animation
- **ripple**: Box-shadow ripple effect on check
- **flip**: 3D flip toggle with custom text (Yeah!/Nope)
- **circle-path**: Circular SVG path animation
- **svg-stroke**: SVG stroke dash animation
- **morph**: Circle-to-square morph with pulse

---

### Example 4: Advanced Implementation

**User**: "Show me how to create a swipe-to-confirm delete button"

**AI Assistant** (using MCP):

1. Calls `get_component_info` with `component: "Pressy"`
2. Calls `get_component_example` with `component: "Pressy", type: "advanced"`
3. Customizes the example

**Response**:

```tsx
import { Pressy } from 'rn-pressy';

<Pressy
  title="Swipe to Delete"
  variant="outline"
  colors={{
    outlineBorder: '#ef4444',
    outlineText: '#ef4444',
  }}
  swipeable
  swipeDirection="right"
  swipeContent={<Text style={{ color: '#ef4444' }}>🗑️</Text>}
  onSwipeComplete={() => {
    // Delete action
    console.log('Item deleted');
  }}
  vibration="heavy"
/>;
```

---

### Example 5: Multi-Select Dropdown

**User**: "How do I create a multi-select dropdown with search?"

**AI Assistant** (using MCP):

1. Calls `get_component_example` with `component: "DDown", type: "multiSelect"`

**Response**:

```tsx
import { DDown } from 'rn-pressy';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState([]);

  return (
    <DDown
      placeholder="Select tags"
      options={[
        { label: 'React', value: 'react' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'JavaScript', value: 'js' },
        { label: 'Python', value: 'py' },
      ]}
      value={selected}
      multiSelect
      searchable
      searchPlaceholder="Search tags..."
      onChange={setSelected}
      maxTagsVisible={3}
    />
  );
}
```

---

### Example 6: Props Reference

**User**: "What are the essential props for the Pressy component?"

**AI Assistant** (using MCP):

1. Calls `get_props_reference` with `component: "Pressy", category: "essential"`

**Response**:
Essential Pressy props:

- `title`: The text to display
- `onPress`: Callback when pressed
- `variant`: Style variant (primary, secondary, tertiary, outline, ghost, 3d)

---

### Example 7: Theming

**User**: "How do I set up dark mode for rn-pressy components?"

**AI Assistant** (using MCP):

1. Reads resource `rn-pressy://docs/theming`

**Response**:
Wrap your app with PressyProvider:

```tsx
import { PressyProvider } from 'rn-pressy';

function App() {
  return (
    <PressyProvider mode="auto">{/* Your app components */}</PressyProvider>
  );
}
```

The `mode` prop accepts:

- `"auto"`: Follows system color scheme (recommended)
- `"light"`: Force light theme
- `"dark"`: Force dark theme

All components will automatically adapt to the theme!

---

### Example 8: Custom Styling

**User**: "Can I customize the colors of a toggle switch?"

**AI Assistant** (using MCP):

1. Calls `get_component_info` with `component: "Toggy"`
2. Calls `get_component_example` with `component: "Toggy", type: "styled"`

**Response**:

```tsx
import { Toggy } from 'rn-pressy';

<Toggy
  value={enabled}
  onValueChange={setEnabled}
  variant="solar"
  activeColor="#22c55e" // Green when on
  inactiveColor="#ef4444" // Red when off
  vibration
/>;
```

---

### Example 9: Input Validation

**User**: "How do I show validation errors in a text input?"

**AI Assistant** (using MCP):

1. Calls `get_component_example` with `component: "Inpy", type: "withValidation"`

**Response**:

```tsx
import { Inpy } from 'rn-pressy';
import { useState } from 'react';

function EmailInput() {
  const [email, setEmail] = useState('');

  const isValid = email.includes('@') && email.includes('.');
  const showError = email.length > 0 && !isValid;

  return (
    <Inpy
      value={email}
      onChangeText={setEmail}
      label="Email"
      variant="outlined"
      error={showError ? 'Please enter a valid email' : false}
      leftIcon={<MailIcon />}
      clearable
    />
  );
}
```

---

### Example 10: Component Discovery

**User**: "What components are available for user input?"

**AI Assistant** (using MCP):

1. Calls `list_components` with `category: "Input"`

**Response**:
rn-pressy has 4 input components:

- **DDown**: Dropdown/select with search and multi-select
- **Toggy**: Toggle switches with multiple visual styles
- **Chex**: Animated checkboxes
- **Inpy**: Text inputs with floating labels

---

## Tips for AI Assistants

1. **Start with component info**: Use `get_component_info` to understand capabilities
2. **Show examples**: Always provide code examples using `get_component_example`
3. **Compare options**: Use `compare_variants` when users ask about styles
4. **Search features**: Use `search_features` for capability-based queries
5. **Reference docs**: Read resources for comprehensive guides
6. **Categorize props**: Use `get_props_reference` to show relevant props only

## Common Query Patterns

| User Query Pattern            | MCP Tools to Use        |
| ----------------------------- | ----------------------- |
| "How do I..."                 | `get_component_example` |
| "What components have..."     | `search_features`       |
| "What are the options for..." | `compare_variants`      |
| "Show me all..."              | `list_components`       |
| "What props does X take?"     | `get_props_reference`   |
| "How do I set up..."          | Read resource           |
