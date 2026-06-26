// src/constants/colors.ts
export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F4F7F4',
    primary: '#1E6B3C',
    primaryLight: '#E8F5E9',
    accent: '#E07B2A',
    danger: '#C62828',
    textPrimary: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E0E4E0',
    divider: '#F0F0F0',
  },
  dark: {
    background: '#0F1612',
    surface: '#1A2B20',
    primary: '#4CAF8A',
    primaryLight: '#1A3326',
    accent: '#E07B2A',
    danger: '#EF5350',
    textPrimary: '#F0F0F0',
    textSecondary: '#9CA3AF',
    border: '#2A3A30',
    divider: '#1E2E24',
  },
};

// Backward-compatible alias — default to dark theme.
// All existing screens/components import `COLORS` and keep working.
export const COLORS = {
  ...Colors.light, // ← was Colors.dark, now light
  primaryDark: '#1E6B3C',
  cardBg: Colors.light.surface,
  cardBgHover: '#E8F5E9',
  textMuted: '#9CA3AF',
  success: Colors.light.primary,
  error: Colors.light.danger,
  warning: Colors.light.accent,
  info: '#3B82F6',
  borderLight: '#E8EDE8',
  overlay: 'rgba(0, 0, 0, 0.5)',
};