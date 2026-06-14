import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';
import { SeasonChip } from '../components/SeasonChip';
import { PrimaryButton } from '../components/PrimaryButton';

export const SeasonPickerScreen: React.FC = () => {
  const navigation = useNavigation();
  const { selectedSeason, setSelectedSeason } = useAppStore();

  const seasons: ('Spring' | 'Summer' | 'Monsoon' | 'Autumn' | 'Winter')[] = [
    'Spring',
    'Summer',
    'Monsoon',
    'Autumn',
    'Winter',
  ];

  const handleSelectSeason = (season: string) => {
    setSelectedSeason(selectedSeason === season ? null : season);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[TYPOGRAPHY.h1, styles.title]}>Choose Season</Text>
        <Text style={[TYPOGRAPHY.bodyLarge, styles.subtitle]}>
          Filter treks based on regional microclimates and optimal trekking conditions.
        </Text>
      </View>

      <View style={styles.seasonsContainer}>
        {seasons.map((season) => (
          <View key={season} style={styles.chipWrapper}>
            <SeasonChip
              season={season}
              selected={selectedSeason === season}
              onPress={() => handleSelectSeason(season)}
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Apply Filter" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 20,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  seasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 40,
  },
  chipWrapper: {
    margin: 8,
  },
  footer: {
    marginBottom: 16,
  },
});
export default SeasonPickerScreen;
