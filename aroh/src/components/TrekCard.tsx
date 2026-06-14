import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ViewStyle } from 'react-native';
import { Trek } from '../constants/mockData';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { StatusBadge } from './StatusBadge';
import { SeasonChip } from './SeasonChip';

interface TrekCardProps {
  trek: Trek;
  onPress: () => void;
  isDownloaded?: boolean;
  style?: ViewStyle;
}

export const TrekCard: React.FC<TrekCardProps> = ({ trek, onPress, isDownloaded = false, style }) => {
  const getDifficultyType = (difficulty: Trek['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Moderate':
        return 'info';
      case 'Challenging':
        return 'warning';
      case 'Expert':
        return 'error';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
    >
      <Image source={{ uri: trek.imageUrl }} style={styles.image} />
      
      {isDownloaded && (
        <View style={styles.downloadBadge}>
          <StatusBadge label="Offline Ready" type="success" />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[TYPOGRAPHY.h3, styles.title]} numberOfLines={1}>
            {trek.title}
          </Text>
          <StatusBadge label={trek.difficulty} type={getDifficultyType(trek.difficulty)} />
        </View>

        <Text style={[TYPOGRAPHY.bodySmall, styles.description]} numberOfLines={2}>
          {trek.description}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={[TYPOGRAPHY.caption, styles.metaLabel]}>Distance</Text>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.metaValue]}>{trek.distanceKm} km</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[TYPOGRAPHY.caption, styles.metaLabel]}>Duration</Text>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.metaValue]}>{trek.durationDays} days</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[TYPOGRAPHY.caption, styles.metaLabel]}>Elevation</Text>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.metaValue]}>{trek.maxElevationM} m</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <SeasonChip season={trek.season} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardPressed: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBgHover,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#334155',
  },
  downloadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  description: {
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    marginBottom: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  metaValue: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
