import type { PressyProps } from '../Pressy/types';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface DDownOption {
  label: string;
  value: string | number;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DDownProps extends Omit<PressyProps, 'children' | 'onPress'> {
  /**
   * Array of options to display
   */
  options: DDownOption[];

  /**
   * Currently selected value(s)
   */
  value?: string | number | (string | number)[];

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
}
