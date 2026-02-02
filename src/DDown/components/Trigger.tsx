import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Pressy } from '../../Pressy/Pressy';
import { usePressyTheme } from '../../Pressy/PressyProvider';
import { Tag } from './Tag';
import { AnimatedChevron } from './AnimatedChevron';
import { getDisplayText } from '../utils';
import type { DDownTriggerProps, DDownOption } from '../types';

interface EnhancedTriggerProps extends DDownTriggerProps {
  maxTagsVisible?: number;
  tagStyle?: any;
  tagTextStyle?: any;
  clearable?: boolean;
  clearIcon?: React.ReactNode;
  renderTag?: (props: any) => React.ReactNode;
  loading?: boolean;
  error?: string | boolean;
  pressyProps?: any;
}

export const Trigger: React.FC<EnhancedTriggerProps> = ({
  isOpen,
  selectedOptions,
  placeholder,
  onPress,
  onClear,
  hasSelection,
  multiSelect,
  disabled,
  maxTagsVisible = 3,
  tagStyle,
  tagTextStyle,
  clearable = true,
  clearIcon,
  renderTag,
  loading,
  error,
  pressyProps,
}) => {
  const { theme, mode } = usePressyTheme();
  const isDark = mode === 'dark';

  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const placeholderColor = isDark ? '#64748b' : '#94a3b8';
  const errorColor = theme.colors.error as string || '#ef4444';

  const displayText = useMemo(() => {
    return getDisplayText(selectedOptions, placeholder, multiSelect, maxTagsVisible);
  }, [selectedOptions, placeholder, multiSelect, maxTagsVisible]);

  const showTags = multiSelect && hasSelection && selectedOptions.length <= maxTagsVisible;
  const showCount = multiSelect && hasSelection && selectedOptions.length > maxTagsVisible;

  const handleTagRemove = (_option: DDownOption) => {
    if (onClear && multiSelect) {
      // For now, we'll just call the general clear function
      // In a real implementation, this would need a more specific callback
      // to remove individual tags
      onClear();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: placeholderColor }]}>
            Loading...
          </Text>
        </View>
      );
    }

    if (showTags) {
      return (
        <View style={styles.tagsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsScrollContent}
          >
            {selectedOptions.map((option) => {
              const TagComponent = renderTag || Tag;
              return (
                <TagComponent
                  key={option.value}
                  option={option}
                  onRemove={() => handleTagRemove(option)}
                  style={tagStyle}
                  textStyle={tagTextStyle}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.textContainer}>
        {/* Show icon if single select has one */}
        {!multiSelect && hasSelection && selectedOptions[0]?.icon && (
          <View style={styles.singleIcon}>
            {selectedOptions[0].icon}
          </View>
        )}

        {/* Display text or count */}
        <Text
          style={[
            styles.displayText,
            {
              color: hasSelection ? textColor : placeholderColor,
              flex: 1,
            },
            error && { color: errorColor },
          ]}
          numberOfLines={1}
        >
          {showCount ? `${selectedOptions.length} selected` : displayText}
        </Text>

        {/* Badge for single select */}
        {!multiSelect && hasSelection && selectedOptions[0]?.badge && (
          <View
            style={[
              styles.singleBadge,
              { backgroundColor: theme.colors.primary as string },
            ]}
          >
            <Text style={styles.singleBadgeText}>
              {selectedOptions[0].badge}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Pressy
      onPress={onPress}
      disabled={disabled || loading}
      {...pressyProps}
      title={undefined} // We handle content ourselves
      style={[
        pressyProps?.style,
        error && { borderColor: errorColor },

      ]}
    >
      <View style={styles.triggerContent}>
        {renderContent()}

        {/* Right side controls */}
        <View style={styles.rightControls}>
          {/* Clear button */}
          {clearable && hasSelection && onClear && !loading && (
            <TouchableOpacity
              onPress={onClear}
              style={styles.clearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
            >
              {clearIcon || (
                <Text style={[styles.clearIcon, { color: placeholderColor }]}>
                  ×
                </Text>
              )}
            </TouchableOpacity>
          )}

          {/* Separator */}
          {clearable && hasSelection && onClear && !loading && (
            <View
              style={[
                styles.separator,
                { backgroundColor: isDark ? '#334155' : '#e2e8f0' },
              ]}
            />
          )}

          {/* Chevron */}
          <AnimatedChevron isOpen={isOpen} color={placeholderColor} />
        </View>
      </View>
    </Pressy>
  );
};

const styles = StyleSheet.create({
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '500',
  },
  tagsContainer: {
    flex: 1,
    maxHeight: 80, // Allow for multiple rows of tags
  },
  tagsScrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  singleIcon: {
    marginRight: 8,
  },
  displayText: {
    fontSize: 15,
    fontWeight: '500',
  },
  singleBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  singleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  clearIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  separator: {
    width: 1,
    height: 16,
    marginHorizontal: 8,
  },
});