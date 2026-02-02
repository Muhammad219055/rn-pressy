import type { DDownOption, DDownGroup } from './types';

/**
 * Flattens grouped options into a single array
 */
export const flattenOptions = (options: (DDownOption | DDownGroup)[]): DDownOption[] => {
  const flattened: DDownOption[] = [];
  
  options.forEach((item) => {
    if ('options' in item) {
      // It's a group
      flattened.push(...item.options);
    } else {
      // It's a regular option
      flattened.push(item);
    }
  });
  
  return flattened;
};

/**
 * Groups options by their group property
 */
export const groupOptions = (options: DDownOption[]): DDownGroup[] => {
  const groups: { [key: string]: DDownOption[] } = {};
  const ungrouped: DDownOption[] = [];
  
  options.forEach((option) => {
    if (option.group) {
      if (!groups[option.group]) {
        groups[option.group] = [];
      }
      groups[option.group].push(option);
    } else {
      ungrouped.push(option);
    }
  });
  
  const result: DDownGroup[] = [];
  
  // Add ungrouped options first
  if (ungrouped.length > 0) {
    result.push({
      title: '',
      options: ungrouped,
    });
  }
  
  // Add grouped options
  Object.entries(groups).forEach(([title, groupOptions]) => {
    result.push({
      title,
      options: groupOptions,
    });
  });
  
  return result;
};

/**
 * Default filter function for search
 */
export const defaultFilterFunction = (option: DDownOption, query: string): boolean => {
  const searchText = query.toLowerCase().trim();
  if (!searchText) return true;
  
  const label = option.label.toLowerCase();
  const description = option.description?.toLowerCase() || '';
  
  return label.includes(searchText) || description.includes(searchText);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Get display text for selected options
 */
export const getDisplayText = (
  selectedOptions: DDownOption[],
  placeholder: string,
  multiSelect: boolean,
  maxTagsVisible: number = 3
): string => {
  if (selectedOptions.length === 0) return placeholder;
  
  if (multiSelect) {
    if (selectedOptions.length === 1) {
      return selectedOptions[0].label;
    }
    if (selectedOptions.length <= maxTagsVisible) {
      return selectedOptions.map(opt => opt.label).join(', ');
    }
    return `${selectedOptions.length} selected`;
  }
  
  return selectedOptions[0]?.label || placeholder;
};

/**
 * Calculate dropdown position
 */
export const calculateDropdownPosition = (
  triggerLayout: { x: number; y: number; width: number; height: number },
  dropdownHeight: number,
  windowHeight: number,
  position: 'auto' | 'top' | 'bottom' = 'auto'
): { top?: number; bottom?: number; openUpwards: boolean } => {
  const spaceBelow = windowHeight - (triggerLayout.y + triggerLayout.height);
  const spaceAbove = triggerLayout.y;
  
  let openUpwards = false;
  
  if (position === 'top') {
    openUpwards = true;
  } else if (position === 'bottom') {
    openUpwards = false;
  } else {
    // Auto positioning
    openUpwards = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
  }
  
  return {
    top: openUpwards ? undefined : triggerLayout.y + triggerLayout.height + 8,
    bottom: openUpwards ? windowHeight - triggerLayout.y + 8 : undefined,
    openUpwards,
  };
};

/**
 * Get accessible role and properties
 */
export const getAccessibilityProps = (
  isOpen: boolean,
  hasSelection: boolean,
  multiSelect: boolean,
  disabled: boolean = false
) => {
  return {
    accessible: true,
    accessibilityRole: 'button' as const,
    accessibilityState: {
      expanded: isOpen,
      selected: hasSelection,
      disabled,
    },
    accessibilityHint: multiSelect 
      ? 'Double tap to open dropdown and select multiple options'
      : 'Double tap to open dropdown and select an option',
  };
};