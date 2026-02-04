/**
 * DDown - Advanced Dropdown Component for React Native
 * 
 * A stunning, feature-rich dropdown component with seamless design and extensive
 * customization options including:
 * - Seamless connection to trigger button (no gap)
 * - Button stays visible on top of overlay
 * - Perfect color matching between trigger and dropdown
 * - Smart positioning with auto-flip
 * - Single and multi-select modes
 * - Searchable with custom filter functions
 * - Rich options with icons, descriptions, and badges
 * - Grouped and virtualized options
 * - Multiple visual variants and size presets
 * - Beautiful animations and effects
 * - Full accessibility support
 * - Dark mode compatible
 * 
 * @example
 * ```tsx
 * <DDown
 *   options={[
 *     { label: 'Apple', value: 'apple', icon: <Text>🍎</Text> },
 *     { label: 'Banana', value: 'banana', icon: <Text>🍌</Text> },
 *   ]}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Select a fruit"
 *   searchable
 * />
 * ```
 * 
 * @see {@link ./README.md} for full documentation
 */

import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  VirtualizedList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { Pressy } from '../Pressy/Pressy';
import { usePressyTheme } from '../Pressy/PressyProvider';
import { 
  Trigger, 
  Option, 
  GroupHeader, 
  AnimatedBackdrop, 
  FloatingLabel, 
  ShimmerLoader 
} from './components';
import {
  useDropdownState,
  useSearch,
  useKeyboardNavigation,
  useDropdownLayout,
  useKeyboardVisibility,
} from './hooks';
import {
  groupOptions,
  defaultFilterFunction,
  calculateDropdownPosition,
  getAccessibilityProps,
} from './utils';
import {
  sizePresets,
  shapePresets,
  getVariantStyles,
  getGlassmorphismStyles,
  getNeumorphismStyles,
  mapDDownVariantToPressy,
} from './uiUtils';
import type { 
  DDownProps, 
  DDownOption, 
  DDownGroup, 
  DDownRenderProps,
} from './types';
import { LiquidGlassWrapper, isLiquidGlassSupported } from '../LiquidGlass';

// ============================================================================
// Enhanced Animated Dropdown Container
// ============================================================================
const AnimatedDropdown = ({
  visible,
  children,
  style,
  duration = 200,
  glassmorphism = false,
  neumorphism = false,
}: {
  visible: boolean;
  children: React.ReactNode;
  style?: any;
  duration?: number;
  glassmorphism?: boolean;
  neumorphism?: boolean;
}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: duration * 0.75,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: duration * 0.5,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacityAnim, duration]);

  if (!visible && (opacityAnim as any)._value === 0) return null;

  const animatedStyle = {
    opacity: opacityAnim,
  };

  // Apply special effects
  let effectStyle = {};
  if (glassmorphism) {
    effectStyle = getGlassmorphismStyles();
  } else if (neumorphism) {
    // Would need size context for neumorphism
    effectStyle = getNeumorphismStyles(false, 'md');
  }

  return (
    <Animated.View
      style={[
        style,
        animatedStyle,
        effectStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

// ============================================================================
// Enhanced DDown Component
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
    minHeight,
    
    // UI & Styling props
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    glassmorphism = false,
    neumorphism = false,
    gradientColors,
    backdropBlur = 20,
    backdropOpacity = 0.4,
    backdropColor,
    floatingLabel = false,
    floatingLabelText,
    
    // Style props
    dropdownStyle,
    optionStyle,
    optionTextStyle,
    searchInputStyle,
    searchContainerStyle,
    tagStyle,
    tagTextStyle,
    groupHeaderStyle,
    groupHeaderTextStyle,
    triggerStyle,
    triggerTextStyle,
    headerStyle,
    footerStyle,
    emptyStateStyle,
    loadingStateStyle,
    errorStateStyle,
    chevronStyle,
    clearButtonStyle,
    separatorStyle,
    badgeStyle,
    badgeTextStyle,
    iconStyle,
    checkboxStyle,
    floatingLabelStyle,
    
    // Animation props
    animationType = 'spring',
    animationDuration = 200,
    springTension = 120,
    springFriction = 12,
    staggerAnimation = false,
    staggerDelay = 50,
    rippleEffect = true,
    rippleColor,
    bounceOnSelect = false,
    pulseOnFocus = false,
    shimmerLoading = false,
    chevronRotation = 180,
    parallaxScrolling = false,
    
    // Advanced features (existing)
    virtualized = false,
    initialNumToRender = 10,
    renderOption,
    renderTrigger,
    renderTag,
    filterFunction = defaultFilterFunction,
    loading = false,
    loadingText = 'Loading...',
    error,
    errorText = 'Something went wrong',
    keyboardNavigation = true,
    position = 'auto',
    alignment = 'left',
    portal = false,
    closeOnSelect = true,
    closeOnOutsideClick = true,
    maxTagsVisible = 3,
    onEndReached,
    onEndReachedThreshold = 0.1,
    onOpen,
    onClose,
    onSearchChange,
    searchDebounce = 300,
    clearable = true,
    clearIcon,
    selectAll = false,
    selectAllText = 'Select All',
    grouped = false,
    cascading = false,
    disabled = false,
    accessibilityLabel,
    accessibilityHint,
    testID,
    title, // Used for dropdown header
    
    // Liquid Glass props (iOS 26+)
    liquidGlass = false,
    liquidGlassInteractive = false,
    liquidGlassEffect = 'regular',
    liquidGlassTintColor,
    liquidGlassColorScheme = 'system',
    
    ...pressyProps
  } = props;

  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';

  // Get size configuration
  const sizeConfig = sizePresets[size];
  
  // Get variant styles using theme colors
  const variantStyles = getVariantStyles(
    variant, 
    theme.colors,
    gradientColors
  );

  // Get shape configuration
  // @ts-ignore - Handle indexed access potential undefined even with default prop
  const borderRadius = (shapePresets[shape] ?? shapePresets.rounded)(size);

  const bgColor = variantStyles.backgroundColor || theme.colors.dropdownDefault;
  const textColor = theme.colors.dropdownDefaultText as string;
  const borderColor = variantStyles.borderColor || theme.colors.dropdownDefaultBorder;
  const placeholderColor = theme.colors.textMuted as string;
  const errorColor = theme.colors.error as string;
  const accentColor = theme.colors.primary as string;

  const {
    isOpen,
    searchQuery,
    setSearchQuery,
    highlightedIndex,
    setHighlightedIndex,
    selectedOptions,
    hasSelection,
    handleSelect,
    clearSelection,
    selectAll: handleSelectAll,
    openDropdown,
    closeDropdown,
    flatOptions,
  } = useDropdownState(options, value, multiSelect, onChange);

  const { layout, windowDimensions, triggerRef, measureTrigger } = useDropdownLayout();
  const { isKeyboardVisible, keyboardHeight } = useKeyboardVisibility();

  const processedOptions = useMemo(() => {
    if (grouped && !('options' in options && options[0])) {
      return groupOptions(flatOptions);
    }
    return options as (DDownOption | DDownGroup)[];
  }, [options, flatOptions, grouped]);

  const { filteredOptions } = useSearch(
    flatOptions,
    searchQuery,
    filterFunction ?? defaultFilterFunction,
    searchDebounce,
    onSearchChange
  );

  useKeyboardNavigation(
    isOpen,
    filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
    closeDropdown,
    keyboardNavigation
  );

  const handleOpen = useCallback(async () => {
    if (disabled || loading) return;
    
    await measureTrigger();
    openDropdown();
    onOpen?.();
  }, [disabled, loading, measureTrigger, openDropdown, onOpen]);

  const handleClose = useCallback(() => {
    closeDropdown();
    onClose?.();
  }, [closeDropdown, onClose]);

  const handleOptionSelect = useCallback((option: DDownOption) => {
    handleSelect(option);
    
    if (!multiSelect && closeOnSelect) {
      handleClose();
    }
  }, [handleSelect, multiSelect, closeOnSelect, handleClose]);

  const dropdownPositionStyle = useMemo(() => {
    if (!layout) return { openUpwards: false };

    const adjustedWindowHeight = windowDimensions.height - (isKeyboardVisible ? keyboardHeight : 0);
    const { openUpwards } = calculateDropdownPosition(
      layout,
      maxHeight,
      adjustedWindowHeight,
      position
    );

    let leftPosition = layout.x;
    if (alignment === 'right') {
      leftPosition = layout.x + layout.width - Math.min(layout.width * 1.5, 300);
    } else if (alignment === 'center') {
      leftPosition = layout.x - (Math.min(layout.width * 1.5, 300) - layout.width) / 2;
    }

    return {
      top: openUpwards ? undefined : layout.y + layout.height,
      bottom: openUpwards ? windowDimensions.height - layout.y : undefined,
      left: Math.max(8, leftPosition),
      width: layout.width,
      maxHeight,
      minHeight,
      marginTop: 0,
      marginBottom: 0,
      openUpwards, 
    };
  }, [layout, windowDimensions, isKeyboardVisible, keyboardHeight, maxHeight, minHeight, position, alignment]);

  const openUpwards = dropdownPositionStyle.openUpwards || false;


  const renderOptionItem = useCallback(({ item, index }: { item: DDownOption; index: number }) => {
    const isSelected = multiSelect
      ? Array.isArray(value) && value.includes(item.value)
      : value === item.value;
    const isHighlighted = index === highlightedIndex;

    const renderProps: DDownRenderProps = {
      option: item,
      isSelected,
      isHighlighted,
      onSelect: () => handleOptionSelect(item),
      searchQuery,
    };

    if (renderOption) {
      return renderOption(renderProps);
    }

    return (
      <Option
        option={item}
        isSelected={isSelected}
        isHighlighted={isHighlighted}
        multiSelect={multiSelect}
        onSelect={() => handleOptionSelect(item)}
        searchQuery={searchQuery}
        style={optionStyle}
        textStyle={optionTextStyle}
        index={staggerAnimation ? index : 0}
        staggerDelay={staggerDelay}
        rippleEffect={rippleEffect}
        bounceOnSelect={bounceOnSelect}
        variant={variant}
        parentBorderRadius={borderRadius}
      />
    );
  }, [
    multiSelect,
    value,
    highlightedIndex,
    handleOptionSelect,
    searchQuery,
    renderOption,
    optionStyle,
    optionTextStyle,
    staggerAnimation,
    staggerDelay,
    rippleEffect,
    bounceOnSelect,
  ]);

  const renderGroupedContent = () => {
    if (!grouped || !Array.isArray(processedOptions)) {
      return renderFlatList();
    }

    const groups = processedOptions as DDownGroup[];
    const filteredGroups = groups.map(group => ({
      ...group,
      options: group.options.filter(option => 
        filterFunction(option, searchQuery)
      ),
    })).filter(group => group.options.length > 0);

    return (
      <FlatList
        data={filteredGroups}
        keyExtractor={(group, index) => `group-${index}-${group.title}`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 4 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        ListEmptyComponent={renderEmptyState()}
        renderItem={({ item: group }) => (
          <View>
            <GroupHeader
              group={group}
              style={groupHeaderStyle}
              textStyle={groupHeaderTextStyle}
            />
            {!group.collapsed && group.options.map((option, optionIndex) => (
              <View key={option.value}>
                {renderOptionItem({ item: option, index: optionIndex })}
              </View>
            ))}
          </View>
        )}
      />
    );
  };

  const renderFlatList = () => {
    if (virtualized && filteredOptions.length > 50) {
      return (
        <VirtualizedList
          data={filteredOptions}
          initialNumToRender={initialNumToRender}
          renderItem={renderOptionItem}
          keyExtractor={(item) => String(item.value)}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          ListEmptyComponent={renderEmptyState()}
          ItemSeparatorComponent={() => (
            <View style={[
              styles.separator,
              { 
                backgroundColor: variantStyles.borderColor || borderColor,
                marginHorizontal: 16,
              },
              separatorStyle,
            ]} />
          )}
        />
      );
    }

    return (
      <FlatList
        data={filteredOptions}
        keyExtractor={(item) => String(item.value)}
        renderItem={renderOptionItem}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 4 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        ListEmptyComponent={renderEmptyState()}
        ItemSeparatorComponent={() => (
          <View style={[
            styles.separator,
            { 
              backgroundColor: variantStyles.borderColor || borderColor,
              marginHorizontal: 16,
            },
            separatorStyle,
          ]} />
        )}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={[styles.emptyState, emptyStateStyle]}>
      {loading ? (
        <View style={[styles.loadingContainer, loadingStateStyle]}>
          {shimmerLoading ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <ShimmerLoader width="60%" height={16} borderRadius={8} />
              <ShimmerLoader width="40%" height={12} borderRadius={6} style={{ marginTop: 8 }} />
            </View>
          ) : (
            <>
              <ActivityIndicator size="small" color={accentColor} />
              <Text style={[styles.emptyText, { color: placeholderColor }]}>
                {loadingText}
              </Text>
            </>
          )}
        </View>
      ) : error ? (
        <View style={errorStateStyle}>
          <Text style={[styles.emptyText, { color: errorColor }]}>
            {typeof error === 'string' ? error : errorText}
          </Text>
        </View>
      ) : (
        <Text style={[styles.emptyText, { color: placeholderColor }]}>
          No options found
        </Text>
      )}
    </View>
  );

  const renderSearchInput = () => {
    if (!searchable) return null;

    return (
      <View style={[
        styles.searchContainer, 
        { 
          borderBottomColor: variantStyles.borderColor || borderColor,
          backgroundColor: variant === 'ghost' ? 'transparent' : undefined,
        },
        searchContainerStyle,
      ]}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={searchPlaceholder}
          placeholderTextColor={placeholderColor}
          style={[
            styles.searchInput,
            {
              backgroundColor: variant === 'filled' 
                ? (isDark ? '#0f172a' : '#f8fafc')
                : variant === 'ghost' 
                ? 'transparent'
                : (isDark ? '#1e293b' : '#ffffff'),
              color: textColor,
              fontSize: sizeConfig.fontSize,
              paddingHorizontal: sizeConfig.paddingHorizontal * 0.75,
              paddingVertical: sizeConfig.paddingVertical * 0.75,
              borderRadius: borderRadius * 0.75,
              borderWidth: variant === 'outlined' ? 1 : 0,
              borderColor: variant === 'outlined' ? (variantStyles.borderColor || borderColor) : 'transparent',
            },
            searchInputStyle,
          ]}
          autoFocus={!loading}
          editable={!loading}
        />
      </View>
    );
  };

  const renderHeader = () => {
    if (!title && !selectAll) return null;

    return (
      <View style={[
        styles.header, 
        { 
          borderBottomColor: variantStyles.borderColor || borderColor,
          backgroundColor: variant === 'ghost' ? 'transparent' : undefined,
        },
        headerStyle,
      ]}>
        {title && (
          <Text style={[
            styles.headerTitle, 
            { 
              color: textColor,
              fontSize: sizeConfig.fontSize * 1.1,
            },
          ]}>
            {title}
          </Text>
        )}
        
        <View style={styles.headerActions}>
          {selectAll && multiSelect && (
            <TouchableOpacity onPress={handleSelectAll}>
              <Text style={{ 
                color: accentColor, 
                fontSize: sizeConfig.fontSize * 0.9,
                fontWeight: '600',
              }}>
                {selectAllText}
              </Text>
            </TouchableOpacity>
          )}
          
          {clearable && hasSelection && (
            <TouchableOpacity onPress={clearSelection} style={{ marginLeft: 12 }}>
              <Text style={{ 
                color: accentColor, 
                fontSize: sizeConfig.fontSize * 0.9,
                fontWeight: '600',
              }}>
                Clear
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!multiSelect) return null;

    return (
      <View style={[
        styles.footer, 
        { 
          borderTopColor: variantStyles.borderColor || borderColor,
          backgroundColor: variant === 'ghost' ? 'transparent' : undefined,
        },
        footerStyle,
      ]}>
        <Pressy
          title="Done"
          onPress={handleClose}
          variant={mapDDownVariantToPressy(variant)}
          size={size === 'xl' || size === 'lg' ? 'lg' : 'md'}
          style={{ flex: 1 }}
        />
      </View>
    );
  };

  const accessibilityProps = getAccessibilityProps(isOpen, hasSelection, multiSelect, disabled);

  return (
    <>
      {/* Floating Label */}
      {floatingLabel && floatingLabelText && (
        <FloatingLabel
          label={floatingLabelText}
          hasValue={hasSelection}
          isFocused={isOpen}
          size={size}
          style={floatingLabelStyle}
          error={!!error}
        />
      )}

      {/* Trigger - Outside Modal */}
      <View
        ref={triggerRef}
        collapsable={false}
        {...(testID && { testID: `${testID}-trigger` })}
      >
        {renderTrigger ? (
          renderTrigger({
            isOpen,
            selectedOptions,
            placeholder,
            onPress: handleOpen,
            onClear: clearable ? clearSelection : undefined,
            hasSelection,
            multiSelect,
            disabled,
          })
        ) : (
          <Trigger
            isOpen={isOpen}
            selectedOptions={selectedOptions}
            placeholder={placeholder}
            onPress={handleOpen}
            onClear={clearable ? clearSelection : undefined}
            hasSelection={hasSelection}
            multiSelect={multiSelect}
            disabled={disabled}
            maxTagsVisible={maxTagsVisible}
            tagStyle={tagStyle}
            tagTextStyle={tagTextStyle}
            clearable={clearable}
            clearIcon={clearIcon}
            renderTag={renderTag}
            loading={loading}
            error={error}
            pressyProps={{
              ...pressyProps,
              ...accessibilityProps,
              ...(accessibilityLabel && { accessibilityLabel }),
              ...(accessibilityHint && { accessibilityHint }),
              // Map DDown variant to Pressy variant for proper theme integration
              variant: mapDDownVariantToPressy(variant),
              // Override Pressy colors with DDown variant colors for consistency
              colors: {
                // For tertiary/secondary variants, override background to match dropdown
                tertiary: variantStyles.backgroundColor || bgColor,
                tertiaryText: textColor,
                secondary: variantStyles.backgroundColor || bgColor,
                secondaryText: textColor,
                // Keep outline transparent
                outline: 'transparent',
                outlineBorder: accentColor,
                outlineText: textColor,
                // Keep ghost transparent
                ghost: 'transparent',
                ghostText: textColor,
              },
              // Disable Pressy's internal shape so we can control borderRadius
              shape: 'square',
              scaleValue: 1, 
              opacityValue: 0.9,
              
              style: [
                {
                  height: sizeConfig.height,
                  // Apply border for outlined/default variants
                  ...(variant === 'outlined' && {
                    borderWidth: 2,
                    borderColor: accentColor,
                  }),
                  ...(variant === 'default' && {
                    borderWidth: 1,
                    borderColor: borderColor,
                  }),
                  // When dropdown is open, adjust corners based on direction
                  ...(isOpen
                    ? openUpwards
                      ? {
                          // Opening upward: round bottom corners, square top corners
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomLeftRadius: borderRadius,
                          borderBottomRightRadius: borderRadius,
                        }
                      : {
                          // Opening downward: round top corners, square bottom corners
                          borderTopLeftRadius: borderRadius,
                          borderTopRightRadius: borderRadius,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }
                    : {
                        borderRadius,
                      }),
                  // Only apply shadow when open for connected appearance
                  ...(isOpen && {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: openUpwards ? -4 : 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                    elevation: 8,
                    ...(openUpwards ? { borderTopWidth: 0 } : { borderBottomWidth: 0 }),
                  }),
                },
                triggerStyle,
                pressyProps?.style,
              ],
            }}
          />
        )}
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
        statusBarTranslucent
        {...(testID && { testID: `${testID}-modal` })}
      >
        {/* Enhanced Backdrop - Behind everything */}
        {closeOnOutsideClick && (
          <AnimatedBackdrop
            visible={isOpen}
            onPress={handleClose}
            opacity={backdropOpacity}
            color={backdropColor || 'rgba(0, 0, 0, 1)'}
            duration={animationDuration}
          />
        )}

        {/* Trigger Clone - On top of backdrop */}
        {layout && (
          <View
            style={{
              position: 'absolute',
              top: layout.y,
              left: layout.x,
              width: layout.width,
              height: layout.height,
              zIndex: 1000,
            }}
            pointerEvents="box-none"
          >
            {renderTrigger ? (
              renderTrigger({
                isOpen,
                selectedOptions,
                placeholder,
                onPress: handleClose,
                onClear: clearable ? clearSelection : undefined,
                hasSelection,
                multiSelect,
                disabled,
              })
            ) : (
              <Trigger
                isOpen={isOpen}
                selectedOptions={selectedOptions}
                placeholder={placeholder}
                onPress={handleClose}
                onClear={clearable ? clearSelection : undefined}
                hasSelection={hasSelection}
                multiSelect={multiSelect}
                disabled={disabled}
                maxTagsVisible={maxTagsVisible}
                tagStyle={tagStyle}
                tagTextStyle={tagTextStyle}
                clearable={clearable}
                clearIcon={clearIcon}
                renderTag={renderTag}
                loading={loading}
                error={error}
                pressyProps={{
                  ...pressyProps,
                  ...accessibilityProps,
                  ...(accessibilityLabel && { accessibilityLabel }),
                  ...(accessibilityHint && { accessibilityHint }),
                  // Map DDown variant to Pressy variant for proper theme integration
                  variant: mapDDownVariantToPressy(variant),
                  // Override Pressy colors with DDown variant colors for consistency
                  colors: {
                    tertiary: variantStyles.backgroundColor || bgColor,
                    tertiaryText: textColor,
                    secondary: variantStyles.backgroundColor || bgColor,
                    secondaryText: textColor,
                    outline: 'transparent',
                    outlineBorder: accentColor,
                    outlineText: textColor,
                    ghost: 'transparent',
                    ghostText: textColor,
                  },
                  // Disable Pressy's internal shape so we can control borderRadius
                  shape: 'square',
                  scaleValue: 1, // Disable scale animation
                  opacityValue: 0.9, // Only use opacity for press feedback
                  style: [
                    {
                      height: sizeConfig.height,
                      // Apply border for outlined/default variants
                      ...(variant === 'outlined' && {
                        borderWidth: 2,
                        borderColor: accentColor,
                      }),
                      ...(variant === 'default' && {
                        borderWidth: 1,
                        borderColor: borderColor,
                      }),
                      ...(openUpwards
                        ? {
                            // Opening upward: round bottom corners, square top corners
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: borderRadius,
                            borderBottomRightRadius: borderRadius,
                          }
                        : {
                            // Opening downward: round top corners, square bottom corners
                            borderTopLeftRadius: borderRadius,
                            borderTopRightRadius: borderRadius,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }),
                      // Shadow for visual elevation
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: openUpwards ? -4 : 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 12,
                      elevation: 8,
                      ...(openUpwards ? { borderTopWidth: 0 } : { borderBottomWidth: 0 }),
                    },
                    triggerStyle,
                    pressyProps?.style,
                  ],
                }}
              />
            )}
          </View>
        )}

        {/* Dropdown Container */}
        {layout && (
          <AnimatedDropdown
            visible={isOpen}
            duration={animationDuration}
            glassmorphism={glassmorphism && !liquidGlass}
            neumorphism={neumorphism && !liquidGlass}
            style={[
              styles.dropdown,
              {
                // Background color from variant - transparent when using liquid glass
                backgroundColor: liquidGlass && isLiquidGlassSupported 
                  ? 'transparent' 
                  : (variantStyles.backgroundColor || bgColor),
                // Border styling - use accentColor for outlined, theme borderColor for default
                ...(variant === 'outlined' ? {
                  borderColor: accentColor,
                  borderWidth: 2,
                } : variant === 'default' ? {
                  borderColor: borderColor,
                  borderWidth: 1,
                } : {
                  borderColor: variantStyles.borderColor || borderColor,
                  borderWidth: variantStyles.borderWidth || 1,
                }),
                // Adjust corners based on direction to create seamless connection with trigger
                ...(openUpwards
                  ? {
                      // Opening upward: round top corners, square bottom corners
                      borderTopLeftRadius: borderRadius,
                      borderTopRightRadius: borderRadius,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomWidth: 0, // Remove bottom border
                    }
                  : {
                      // Opening downward: round bottom corners, square top corners
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: borderRadius,
                      borderBottomRightRadius: borderRadius,
                      borderTopWidth: 0, // Remove top border
                    }),
                ...dropdownPositionStyle,
                // Enhanced shadow for depth and separation
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 12,
                // Ensure dropdown is above backdrop but below trigger
                zIndex: 999,
              },
              // Special effects override base styles (disabled when liquidGlass is enabled)
              !liquidGlass && glassmorphism && getGlassmorphismStyles(backdropBlur),
              !liquidGlass && neumorphism && getNeumorphismStyles(isDark, size),
              // Gradient handling for dropdown
              variant === 'gradient' && {
                backgroundColor: 'transparent',
                // Note: Gradient would need LinearGradient component implementation
              },
              dropdownStyle,
            ]}
          >
            <LiquidGlassWrapper
              liquidGlass={liquidGlass}
              interactive={liquidGlassInteractive}
              effect={liquidGlassEffect}
              tintColor={liquidGlassTintColor}
              colorScheme={liquidGlassColorScheme}
              fallbackBackgroundColor={variantStyles.backgroundColor || bgColor}
              style={[
                { flex: 1 },
                openUpwards
                  ? {
                      borderTopLeftRadius: borderRadius,
                      borderTopRightRadius: borderRadius,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : {
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: borderRadius,
                      borderBottomRightRadius: borderRadius,
                    },
              ]}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
              >
                {renderHeader()}
                {renderSearchInput()}
                
                <View style={{ flex: 1 }}>
                  {renderGroupedContent()}
                </View>
                
                {renderFooter()}
              </KeyboardAvoidingView>
            </LiquidGlassWrapper>
          </AnimatedDropdown>
        )}
      </Modal>
    </>
  );
};

// ============================================================================
// Enhanced Styles
// ============================================================================
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  dropdown: {
    position: 'absolute',
    // Default border and shadow - will be overridden by variant styles
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchInput: {
    fontSize: 15,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  separator: {
    height: 1,
    opacity: 0.3,
  },
  emptyState: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
});
