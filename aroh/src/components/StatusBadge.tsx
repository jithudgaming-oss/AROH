import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

interface StatusBadgeProps {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, type = 'neutral' }) => {
  const getBadgeColors = () => {
    switch (type) {
      case 'success':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: COLORS.success, border: 'rgba(16, 185, 129, 0.3)' };
      case 'warning':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: COLORS.warning, border: 'rgba(245, 158, 11, 0.3)' };
      case 'error':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: COLORS.error, border: 'rgba(239, 68, 68, 0.3)' };
      case 'info':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: COLORS.info, border: 'rgba(59, 130, 246, 0.3)' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.1)', text: COLORS.textSecondary, border: 'rgba(148, 163, 184, 0.2)' };
    }
  };

  const stylesColors = getBadgeColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: stylesColors.bg,
          borderColor: stylesColors.border,
        },
      ]}
    >
      <Text style={[TYPOGRAPHY.caption, styles.text, { color: stylesColors.text }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.5,
  },
});
