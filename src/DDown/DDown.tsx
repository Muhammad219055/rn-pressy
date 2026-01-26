import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  type LayoutRectangle,
} from 'react-native';
import { Pressy } from '../Pressy/Pressy';
import { usePressyTheme } from '../Pressy/PressyProvider';
import type { DDownProps, DDownOption } from './types';

// ============================================================================
// Animated Chevron
// ============================================================================
const AnimatedChevron = ({ isOpen, color }: { isOpen: boolean; color: string }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <Text style={{ fontSize: 12, color }}>▼</Text>
    </Animated.View>
  );
};

// ============================================================================
// Fade + Scale Animation View
// ============================================================================
const AnimatedDropdown = ({
  visible,
  children,
  style,
}: {
  visible: boolean;
  children: React.ReactNode;
  style?: any;
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 120,
          friction: 12,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);

  if (!visible && (opacityAnim as any)._value === 0) return null;

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

// ============================================================================
// DDown Component
// ============================================================================
export const DDown: React.FC<DDownProps> = (props) => {
  const {
    options,
    value,
    onChange,
    placeholder = 'Select option',
    multiSelect = false,
    searchable = false,
    searchPlaceholder = 'Search...',
    maxHeight = 300,
    dropdownStyle,
    optionStyle,
    optionTextStyle,
    searchInputStyle,
    title, // Used for dropdown header
    ...pressyProps
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRef = useRef<View>(null);
  const { theme, mode } = usePressyTheme();

  // Theme-derived colors
  const isDark = mode === 'dark';
  const bgColor = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const placeholderColor = isDark ? '#64748b' : '#94a3b8';
  const selectedBgColor = isDark ? '#334155' : '#f1f5f9';
  const accentColor = theme.colors.primary as string;

  // Measure position on open
  const openDropdown = () => {
    (triggerRef.current as any)?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        setLayout({ x, y, width, height });
        setIsOpen(true);
        setSearchQuery('');
      }
    );
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Selection Logic
  const handleSelect = (option: DDownOption) => {
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
      closeDropdown();
    }
  };

  const clearSelection = () => {
    onChange?.(multiSelect ? [] : '');
  };

  // Filtering
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Selected option(s) for display
  const selectedOptions = useMemo(() => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      return options.filter((o) => currentValues.includes(o.value));
    }
    return options.filter((o) => o.value === value);
  }, [value, options, multiSelect]);

  const hasSelection = selectedOptions.length > 0;

  // Display Text for Trigger
  const displayLabel = useMemo(() => {
    if (!hasSelection) return placeholder;
    if (multiSelect) {
      if (selectedOptions.length === 1) {
        return selectedOptions[0]?.label ?? placeholder;
      }
      return `${selectedOptions.length} selected`;
    }
    return selectedOptions[0]?.label ?? placeholder;
  }, [hasSelection, selectedOptions, placeholder, multiSelect]);

  // Display Icon (for single select)
  const displayIcon = useMemo(() => {
    if (!hasSelection || multiSelect) return null;
    return selectedOptions[0]?.icon ?? null;
  }, [hasSelection, selectedOptions, multiSelect]);

  // Dropdown Positioning
  const dropdownPositionStyle = useMemo(() => {
    if (!layout) return {};

    const windowHeight = Dimensions.get('window').height;
    const spaceBelow = windowHeight - (layout.y + layout.height);
    const openUpwards = spaceBelow < maxHeight && layout.y > maxHeight;

    return {
      top: openUpwards ? undefined : layout.y + layout.height + 8,
      bottom: openUpwards ? windowHeight - layout.y + 8 : undefined,
      left: layout.x,
      width: layout.width,
    };
  }, [layout, maxHeight]);

  return (
    <>
      {/* Trigger Button */}
      <View
        ref={triggerRef as any}
        onLayout={() => {}}
        collapsable={false}
      >
        <Pressy
          onPress={openDropdown}
          {...pressyProps}
          // Custom content for better control
          title={undefined}
        >
          <View style={styles.triggerContent}>
            {/* Show icon if single select has one */}
            {displayIcon && <View style={{ marginRight: 8 }}>{displayIcon}</View>}

            {/* Label */}
            <Text
              style={[
                styles.triggerText,
                {
                  color: hasSelection ? textColor : placeholderColor,
                  flex: 1,
                },
              ]}
              numberOfLines={1}
            >
              {displayLabel}
            </Text>

            {/* Animated Chevron */}
            <AnimatedChevron isOpen={isOpen} color={placeholderColor} />
          </View>
        </Pressy>
      </View>

      {/* Dropdown Overlay */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
        statusBarTranslucent
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          onPress={closeDropdown}
          activeOpacity={1}
        >
          <View style={StyleSheet.absoluteFill} />
        </TouchableOpacity>

        {/* The Dropdown Box */}
        {layout && (
          <AnimatedDropdown
            visible={isOpen}
            style={[
              styles.dropdown,
              {
                backgroundColor: bgColor,
                borderColor: borderColor,
                maxHeight,
                ...dropdownPositionStyle,
              },
              dropdownStyle,
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              {/* Header with Title */}
              {title && (
                <View style={[styles.header, { borderBottomColor: borderColor }]}>
                  <Text style={[styles.headerTitle, { color: textColor }]}>
                    {title}
                  </Text>
                  {multiSelect && hasSelection && (
                    <TouchableOpacity onPress={clearSelection}>
                      <Text style={{ color: accentColor, fontSize: 13 }}>
                        Clear
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Search Input */}
              {searchable && (
                <View
                  style={[styles.searchContainer, { borderBottomColor: borderColor }]}
                >
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={searchPlaceholder}
                    placeholderTextColor={placeholderColor}
                    style={[
                      styles.searchInput,
                      {
                        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                        color: textColor,
                      },
                      searchInputStyle,
                    ]}
                    autoFocus
                  />
                </View>
              )}

              {/* Options List */}
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => String(item.value)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 4 }}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Text style={{ color: placeholderColor, fontSize: 14 }}>
                      No options found
                    </Text>
                  </View>
                }
                renderItem={({ item }) => {
                  const isSelected = multiSelect
                    ? Array.isArray(value) && value.includes(item.value)
                    : value === item.value;

                  return (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      disabled={item.disabled}
                      activeOpacity={0.7}
                      style={[
                        styles.option,
                        {
                          backgroundColor: isSelected
                            ? selectedBgColor
                            : 'transparent',
                          opacity: item.disabled ? 0.5 : 1,
                        },
                        optionStyle,
                      ]}
                    >
                      {/* Checkbox for multi-select */}
                      {multiSelect && (
                        <View
                          style={[
                            styles.checkbox,
                            {
                              borderColor: isSelected ? accentColor : borderColor,
                              backgroundColor: isSelected
                                ? accentColor
                                : 'transparent',
                            },
                          ]}
                        >
                          {isSelected && (
                            <Text style={{ color: '#fff', fontSize: 10 }}>✓</Text>
                          )}
                        </View>
                      )}

                      {/* Icon */}
                      {item.icon && (
                        <View style={{ marginRight: 10 }}>{item.icon}</View>
                      )}

                      {/* Label */}
                      <Text
                        style={[
                          styles.optionLabel,
                          {
                            color: textColor,
                            fontWeight: isSelected ? '600' : '400',
                          },
                          optionTextStyle,
                        ]}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>

                      {/* Check mark for single select */}
                      {!multiSelect && isSelected && (
                        <Text style={{ color: accentColor, fontSize: 16 }}>✓</Text>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />

              {/* Footer for multi-select */}
              {multiSelect && (
                <View style={[styles.footer, { borderTopColor: borderColor }]}>
                  <Pressy
                    title="Done"
                    onPress={closeDropdown}
                    variant="primary"
                    size="sm"
                    style={{ flex: 1 }}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          </AnimatedDropdown>
        )}
      </Modal>
    </>
  );
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  triggerText: {
    fontSize: 15,
    fontWeight: '500',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 6,
    marginVertical: 2,
    borderRadius: 10,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
});
