import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePressyTheme } from '../../Pressy/PressyProvider';
import type { DDownGroup } from '../types';

interface GroupHeaderProps {
  group: DDownGroup;
  onToggle?: () => void;
  style?: any;
  textStyle?: any;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  group,
  onToggle,
  style,
  textStyle,
}) => {
  const { mode } = usePressyTheme();
  const isDark = mode === 'dark';

  const textColor = isDark ? '#e2e8f0' : '#374151';
  const backgroundColor = isDark ? '#0f172a' : '#f9fafb';

  if (!group.title) return null;

  const content = (
    <View
      style={[
        styles.header,
        { backgroundColor },
        style,
      ]}
    >
      <Text
        style={[
          styles.headerText,
          { color: textColor },
          textStyle,
        ]}
      >
        {group.title}
      </Text>

      {group.collapsible && (
        <Text
          style={[
            styles.collapseIndicator,
            { color: textColor },
          ]}
        >
          {group.collapsed ? '▶' : '▼'}
        </Text>
      )}
    </View>
  );

  if (group.collapsible && onToggle) {
    return (
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${group.collapsed ? 'Expand' : 'Collapse'} ${group.title} group`}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  collapseIndicator: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});