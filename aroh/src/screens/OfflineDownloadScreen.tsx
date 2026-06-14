import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MOCK_TREKS } from '../constants/mockData';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';

export const OfflineDownloadScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { trekId } = route.params || { trekId: '1' };

  const trek = MOCK_TREKS.find((t) => t.id === trekId) || MOCK_TREKS[0];
  const { toggleDownloadTrek } = useAppStore();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      toggleDownloadTrek(trek.id);
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    }
  }, [progress]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
        <Text style={[TYPOGRAPHY.h2, styles.title]}>Downloading Maps</Text>
        <Text style={[TYPOGRAPHY.bodyMedium, styles.subtitle]}>
          Caching contour vector lines, base trails and offline hazard alerts for **{trek.title}**.
        </Text>

        {/* Progress Bar Container */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <Text style={[TYPOGRAPHY.h3, styles.progressText]}>{progress}%</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 30,
    alignItems: 'center',
    width: '100%',
  },
  spinner: {
    marginBottom: 24,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  progressBarBg: {
    height: 8,
    width: '80%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});
export default OfflineDownloadScreen;
