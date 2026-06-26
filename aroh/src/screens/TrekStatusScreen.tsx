import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';
import { PrimaryButton } from '../components/PrimaryButton';

export const TrekStatusScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { currentTrek, trackedPath } = useAppStore();

  const handleFinish = () => {
    navigation.popToTop(); // returns to Main Tab
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Text style={styles.successIcon}>🏆</Text>
        </View>

        <Text style={[TYPOGRAPHY.h1, styles.title]}>Trek Logged!</Text>
        <Text style={[TYPOGRAPHY.bodyLarge, styles.subtitle]}>
          Congratulations on completing {currentTrek?.title || 'Trek peak climb'}! Your GPS logs are saved.
        </Text>

        {/* Stats card */}
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.label]}>Trek peak</Text>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.value]}>{currentTrek?.title}</Text>
          </View>
          <View style={[styles.statRow, styles.borderTop]}>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.label]}>Difficulty level</Text>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.value]}>{currentTrek?.difficulty}</Text>
          </View>
          <View style={[styles.statRow, styles.borderTop]}>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.label]}>GPS coordinates logged</Text>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.value]}>{trackedPath.length} points</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Back to Home" onPress={handleFinish} />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  successIcon: {
    fontSize: 48,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  statsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '100%',
    overflow: 'hidden',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  label: {
    color: COLORS.textSecondary,
  },
  value: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  footer: {
    marginBottom: 16,
  },
});
export default TrekStatusScreen;
