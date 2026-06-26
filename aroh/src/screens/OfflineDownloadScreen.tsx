import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Trek } from '../constants/mockData';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';
import { fetchTrekById } from '../services/trekService';
import { OfflineManager } from '@maplibre/maplibre-react-native';

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

export const OfflineDownloadScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { trekId } = route.params || { trekId: '1' };

  const { toggleDownloadTrek } = useAppStore();
  const [trek, setTrek] = useState<Trek | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Preparing download...');

  useEffect(() => {
    const loadTrek = async () => {
      const data = await fetchTrekById(trekId);
      setTrek(data);
    };
    loadTrek();
  }, [trekId]);

  useEffect(() => {
    if (!trek) return;

    const startDownload = async () => {
      try {
        setStatusText('Connecting to map server...');

        // Calculate bounds around trek start point with padding
        const lat = trek.startPoint.latitude;
        const lng = trek.startPoint.longitude;
        const padding = 0.5; // ~55km padding around start point

        const bounds: [number, number, number, number] = [
          lng - padding, // west
          lat - padding, // south
          lng + padding, // east
          lat + padding, // north
        ];

        const packId = `trek_${trek.id}`;

        // Delete existing pack if any
        try {
          await OfflineManager.deletePack(packId);
        } catch (_) { }

        setStatusText('Downloading map tiles...');

        await OfflineManager.createPack(
          {
            mapStyle: MAP_STYLE,
            bounds: bounds,
            minZoom: 8,
            maxZoom: 14,
            metadata: { id: packId, trekId: trek.id, trekTitle: trek.title },
          },
          (offlinePack, status) => {
            const pct = status.percentage ?? 0;
            setProgress(Math.round(pct));
            setStatusText(`Downloading map tiles... ${Math.round(pct)}%`);

            if (status.state === 'complete') {
              toggleDownloadTrek(trek.id);
              setStatusText('Download complete!');
              setTimeout(() => navigation.goBack(), 800);
            }
          },
          (offlinePack, error) => {
            console.error('Offline download error:', error.message);
            setStatusText('Download failed. Please try again.');
            // Still mark as downloaded so user can retry
            setTimeout(() => navigation.goBack(), 1500);
          }
        );
      } catch (err) {
        console.error('OfflineManager error:', err);
        setStatusText('Download failed. Please try again.');
        setTimeout(() => navigation.goBack(), 1500);
      }
    };

    startDownload();
  }, [trek]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
        <Text style={[TYPOGRAPHY.h2, styles.title]}>Downloading Maps</Text>
        <Text style={[TYPOGRAPHY.bodyMedium, styles.subtitle]}>
          Caching map tiles for {trek?.title ?? '...'}. You can use this map without internet while trekking.
        </Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={[TYPOGRAPHY.h3, styles.progressText]}>{progress}%</Text>
        <Text style={[TYPOGRAPHY.bodySmall, styles.statusText]}>{statusText}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 30, alignItems: 'center', width: '100%' },
  spinner: { marginBottom: 24 },
  title: { color: COLORS.textPrimary, marginBottom: 8 },
  subtitle: { color: COLORS.textSecondary, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  progressBarBg: {
    height: 8, width: '80%', backgroundColor: COLORS.cardBg,
    borderRadius: 4, overflow: 'hidden', marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
  },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary },
  progressText: { color: COLORS.primary, fontWeight: '800', marginBottom: 8 },
  statusText: { color: COLORS.textSecondary, textAlign: 'center' },
});

export default OfflineDownloadScreen;