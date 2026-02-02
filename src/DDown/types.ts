import type { PressyProps } from '../Pressy/types';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface DDownOption {
  label: string;
  value: string | number;
  icon?: ReactNode;
  disabled?: boolean;
  description?: string;
  badge?: string | number;
  color?: string;
  children?: DDownOption[]; // For nested/cascading dropdowns
  group?: string; // For grouping options
  data?: any; // Additional custom data
}

export interface DDownGroup {
  title: string;
  options: DDownOption[];
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface DDownRenderProps {
  option: DDownOption;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: () => void;
  searchQuery?: string;
}

export interface DDownTriggerProps {
  isOpen: boolean;
  selectedOptions: DDownOption[];
  placeholder: string;
  onPress: () => void;
  onClear?: () => void;
  hasSelection: boolean;
  multiSelect: boolean;
  disabled?: boolean;
}

export interface DDownTagProps {
  option: DDownOption;
  onRemove: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export type DDownPosition = 'auto' | 'top' | 'bottom';
export type DDownAlignment = 'left' | 'right' | 'center';
export type DDownVariant = 'default' | 'outlined' | 'filled' | 'ghost' | 'gradient';
export type DDownSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DDownAnimationType = 'fade' | 'scale' | 'slide' | 'bounce' | 'spring';
export type DDownShape = 'rounded' | 'square' | 'pill' | 'custom';

export interface DDownProps extends Omit<PressyProps, 'children' | 'onPress' | 'variant' | 'shape' | 'size'> {
  /**
   * Array of options to display
   */
  options: DDownOption[] | DDownGroup[];

  /**
   * Currently selected value(s)
   */
  value?: string | number | (string | number)[];

  /**
   * Visual variant of the dropdown
   * @default 'default'
   */
  variant?: DDownVariant;

  /**
   * Shape of the dropdown
   * @default 'rounded'
   */
  shape?: DDownShape;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number | (string | number)[]) => void;

  /**
   * Placeholder text when no selection
   */
  placeholder?: string;

  /**
   * Enable multi-select mode
   */
  multiSelect?: boolean;

  /**
   * Enable search input
   */
  searchable?: boolean;

  /**
   * Custom search placeholder
   */
  searchPlaceholder?: string;

  /**
   * Max height of the dropdown list
   * @default 300
   */
  maxHeight?: number;

  /**
   * Min height of the dropdown list
   */
  minHeight?: number;

  // ============================================================================
  // UI & STYLING PROPS
  // ============================================================================

  /**
   * Dropdown size preset
   * @default 'md'
   */
  size?: DDownSize;

  /**
   * Enable glassmorphism effect
   * @default false
   */
  glassmorphism?: boolean;

  /**
   * Enable neumorphism effect
   * @default false
   */
  neumorphism?: boolean;

  /**
   * Gradient colors for gradient variant
   */
  gradientColors?: string[];

  /**
   * Custom backdrop blur intensity (0-100)
   * @default 20
   */
  backdropBlur?: number;

  /**
   * Custom backdrop opacity (0-1)
   * @default 0.4
   */
  backdropOpacity?: number;

  /**
   * Custom backdrop color
   */
  backdropColor?: string;

  /**
   * Enable floating label animation
   * @default false
   */
  floatingLabel?: boolean;

  /**
   * Floating label text
   */
  floatingLabelText?: string;

  /**
   * Custom style for the dropdown container (the list box)
   */
  dropdownStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for option items
   */
  optionStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for option text
   */
  optionTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for the search input
   */
  searchInputStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for search container
   */
  searchContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for tags in multi-select mode
   */
  tagStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for tag text
   */
  tagTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for group headers
   */
  groupHeaderStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for group header text
   */
  groupHeaderTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for the trigger container
   */
  triggerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for the trigger text
   */
  triggerTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for the header
   */
  headerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for the footer
   */
  footerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for empty state
   */
  emptyStateStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for loading state
   */
  loadingStateStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for error state
   */
  errorStateStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for the chevron icon
   */
  chevronStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for the clear button
   */
  clearButtonStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for separators
   */
  separatorStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for badges
   */
  badgeStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for badge text
   */
  badgeTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for icons
   */
  iconStyle?: StyleProp<ImageStyle>;

  /**
   * Custom styling for checkboxes
   */
  checkboxStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styling for floating label
   */
  floatingLabelStyle?: StyleProp<TextStyle>;

  // ============================================================================
  // ANIMATION PROPS
  // ============================================================================

  /**
   * Animation type for dropdown open/close
   * @default 'spring'
   */
  animationType?: DDownAnimationType;

  /**
   * Animation duration in milliseconds
   * @default 200
   */
  animationDuration?: number;

  /**
   * Animation spring tension (for spring animations)
   * @default 120
   */
  springTension?: number;

  /**
   * Animation spring friction (for spring animations)
   * @default 12
   */
  springFriction?: number;

  /**
   * Enable stagger animation for options
   * @default false
   */
  staggerAnimation?: boolean;

  /**
   * Stagger delay between option animations (ms)
   * @default 50
   */
  staggerDelay?: number;

  /**
   * Enable ripple effect on option press
   * @default true
   */
  rippleEffect?: boolean;

  /**
   * Ripple color
   */
  rippleColor?: string;

  /**
   * Enable bounce animation on selection
   * @default false
   */
  bounceOnSelect?: boolean;

  /**
   * Enable pulse animation on focus
   * @default false
   */
  pulseOnFocus?: boolean;

  /**
   * Enable shimmer loading animation
   * @default false
   */
  shimmerLoading?: boolean;

  /**
   * Custom chevron rotation degrees
   * @default 180
   */
  chevronRotation?: number;

  /**
   * Enable parallax scrolling effect
   * @default false
   */
  parallaxScrolling?: boolean;

  // ============================================================================
  // ADVANCED FEATURES (keeping existing ones)
  // ============================================================================
  
  /**
   * Enable virtualization for large datasets
   * @default false
   */
  virtualized?: boolean;

  /**
   * Number of items to render initially when virtualized
   * @default 10
   */
  initialNumToRender?: number;

  /**
   * Custom render function for options
   */
  renderOption?: (props: DDownRenderProps) => ReactNode;

  /**
   * Custom render function for the trigger
   */
  renderTrigger?: (props: DDownTriggerProps) => ReactNode;

  /**
   * Custom render function for tags in multi-select
   */
  renderTag?: (props: DDownTagProps) => ReactNode;

  /**
   * Custom filter function for search
   */
  filterFunction?: (option: DDownOption, query: string) => boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Loading text
   */
  loadingText?: string;

  /**
   * Error state
   */
  error?: string | boolean;

  /**
   * Error text
   */
  errorText?: string;

  /**
   * Enable keyboard navigation
   * @default true
   */
  keyboardNavigation?: boolean;

  /**
   * Dropdown position preference
   * @default 'auto'
   */
  position?: DDownPosition;

  /**
   * Dropdown alignment
   * @default 'left'
   */
  alignment?: DDownAlignment;

  /**
   * Enable portal rendering (renders dropdown at root level)
   * @default false
   */
  portal?: boolean;

  /**
   * Close dropdown on selection (single select only)
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Close dropdown when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Maximum number of tags to show before showing count
   * @default 3
   */
  maxTagsVisible?: number;

  /**
   * Enable infinite scroll
   */
  onEndReached?: () => void;

  /**
   * Threshold for infinite scroll trigger
   * @default 0.1
   */
  onEndReachedThreshold?: number;

  /**
   * Callback when dropdown opens
   */
  onOpen?: () => void;

  /**
   * Callback when dropdown closes
   */
  onClose?: () => void;

  /**
   * Callback when search query changes
   */
  onSearchChange?: (query: string) => void;

  /**
   * Debounce delay for search in milliseconds
   * @default 300
   */
  searchDebounce?: number;

  /**
   * Enable clear button
   * @default true
   */
  clearable?: boolean;

  /**
   * Custom clear button icon
   */
  clearIcon?: ReactNode;

  /**
   * Enable select all for multi-select
   * @default false
   */
  selectAll?: boolean;

  /**
   * Select all text
   * @default 'Select All'
   */
  selectAllText?: string;

  /**
   * Enable grouping
   * @default false
   */
  grouped?: boolean;

  /**
   * Enable nested/cascading dropdowns
   * @default false
   */
  cascading?: boolean;

  /**
   * Disable dropdown
   */
  disabled?: boolean;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint
   */
  accessibilityHint?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}
