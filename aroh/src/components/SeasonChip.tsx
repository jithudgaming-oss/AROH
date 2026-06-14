import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

interface SeasonChipProps {
  season: 'Spring' | 'Summer' | 'Monsoon' | 'Autumn' | 'Winter';
  selected?: boolean;
  onPress?: () => void;
}

export const SeasonChip: React.FC<SeasonChipProps> = ({ season, selected = false, onPress }) => {
  const getSeasonStyle = () => {
    if (selected) {
      return { bg: '#1E6B3C', text: '#FFFFFF', border: '#1E6B3C' };
    }
    switch (season) {
      case 'Spring': return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
      case 'Summer': return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };
      case 'Monsoon': return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
      case 'Autumn': return { bg: '#FFF7ED', text: '#EA580C', border: '#FED7AA' };
      case 'Winter': return { bg: '#F0FDFA', text: '#0D9488', border: '#CCFBF1' };
      default: return { bg: '#F4F7F4', text: '#6B7280', border: '#E0E4E0' };
    }
  };

  const colors = getSeasonStyle();
  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? COLORS.primary : COLORS.cardBg,
          borderColor: selected ? COLORS.primary : COLORS.border,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: selected ? '#FFFFFF' : colors.text },
        ]}
      />
      <Text
        style={[
          TYPOGRAPHY.bodySmall,
          styles.text,
          { color: selected ? '#FFFFFF' : COLORS.textPrimary },
        ]}
      >
        {season}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontWeight: '600',
  },
});
