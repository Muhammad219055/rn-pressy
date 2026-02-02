import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Keyboard, Dimensions } from 'react-native';
import type { DDownOption, DDownGroup } from './types';
import { flattenOptions, defaultFilterFunction, debounce } from './utils';

/**
 * Hook for managing dropdown state and logic
 */
export const useDropdownState = (
  options: (DDownOption | DDownGroup)[],
  value?: string | number | (string | number)[],
  multiSelect: boolean = false,
  onChange?: (value: string | number | (string | number)[]) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const flatOptions = useMemo(() => flattenOptions(options), [options]);

  const selectedOptions = useMemo(() => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      return flatOptions.filter((o) => currentValues.includes(o.value));
    }
    return flatOptions.filter((o) => o.value === value);
  }, [value, flatOptions, multiSelect]);

  const hasSelection = selectedOptions.length > 0;

  const handleSelect = useCallback((option: DDownOption) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(option.value);
      let newValues;
      if (isSelected) {
        newValues = currentValues.filter((v) => v !== option.value);
      } else {
        newValues = [...currentValues, option.value];
      }
      onChange?.(newValues);
    } else {
      onChange?.(option.value);
    }
  }, [multiSelect, value, onChange]);

  const clearSelection = useCallback(() => {
    onChange?.(multiSelect ? [] : '');
  }, [multiSelect, onChange]);

  const selectAll = useCallback(() => {
    if (multiSelect) {
      const allValues = flatOptions
        .filter(opt => !opt.disabled)
        .map(opt => opt.value);
      onChange?.(allValues);
    }
  }, [multiSelect, flatOptions, onChange]);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
    setSearchQuery('');
    setHighlightedIndex(-1);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  }, []);

  return {
    isOpen,
    searchQuery,
    setSearchQuery,
    highlightedIndex,
    setHighlightedIndex,
    selectedOptions,
    hasSelection,
    handleSelect,
    clearSelection,
    selectAll,
    openDropdown,
    closeDropdown,
    flatOptions,
  };
};

/**
 * Hook for managing search functionality with debouncing
 */
export const useSearch = (
  options: DDownOption[],
  searchQuery: string,
  filterFunction: (option: DDownOption, query: string) => boolean = defaultFilterFunction,
  debounceMs: number = 300,
  onSearchChange?: (query: string) => void
) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const debouncedSetQuery = useMemo(
    () => debounce((query: string) => {
      setDebouncedQuery(query);
      onSearchChange?.(query);
    }, debounceMs),
    [debounceMs, onSearchChange]
  );

  useEffect(() => {
    debouncedSetQuery(searchQuery);
  }, [searchQuery, debouncedSetQuery]);

  const filteredOptions = useMemo(() => {
    if (!debouncedQuery.trim()) return options;
    return options.filter((option) => filterFunction(option, debouncedQuery));
  }, [options, debouncedQuery, filterFunction]);

  return {
    filteredOptions,
    debouncedQuery,
  };
};

/**
 * Hook for keyboard navigation
 */
export const useKeyboardNavigation = (
  isOpen: boolean,
  filteredOptions: DDownOption[],
  highlightedIndex: number,
  setHighlightedIndex: (index: number) => void,
  onSelect: (option: DDownOption) => void,
  onClose: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled || !isOpen) return;

    const handleKeyPress = (event: any) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(
            highlightedIndex < filteredOptions.length - 1 
              ? highlightedIndex + 1 
              : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(
            highlightedIndex > 0 
              ? highlightedIndex - 1 
              : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            onSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    // Note: This is a simplified version for React Native
    // In a real implementation, you'd need to handle hardware keyboard events
    // or use a library like react-native-keyevent
    
    return () => {
      // Cleanup if needed
    };
  }, [
    enabled,
    isOpen,
    highlightedIndex,
    filteredOptions,
    setHighlightedIndex,
    onSelect,
    onClose,
  ]);
};

/**
 * Hook for managing dropdown positioning and layout
 */
export const useDropdownLayout = () => {
  const [layout, setLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const triggerRef = useRef<any>(null);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const measureTrigger = useCallback(() => {
    return new Promise<void>((resolve) => {
      triggerRef.current?.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setLayout({ x, y, width, height });
          resolve();
        }
      );
    });
  }, []);

  return {
    layout,
    windowDimensions,
    triggerRef,
    measureTrigger,
  };
};

/**
 * Hook for managing keyboard visibility (useful for mobile)
 */
export const useKeyboardVisibility = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {
    isKeyboardVisible,
    keyboardHeight,
  };
};