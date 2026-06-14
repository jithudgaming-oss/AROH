import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';

interface SafetyCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  description?: string;
}

export const SafetyCheckbox: React.FC<SafetyCheckboxProps> = ({
  label,
  checked,
  onToggle,
  description,
}) => {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        checked && styles.containerChecked,
      ]}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <View style={styles.labelContainer}>
        <Text style={[TYPOGRAPHY.bodyMedium, styles.label, checked && styles.labelChecked]}>
          {label}
        </Text>
        {description && (
          <Text style={[TYPOGRAPHY.bodySmall, styles.description]}>
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
    marginBottom: 12,
  },
  containerChecked: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  pressed: {
    opacity: 0.9,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }, { translateY: -1 }],
  },
  labelContainer: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  labelChecked: {
    color: '#FFFFFF',
  },
  description: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
