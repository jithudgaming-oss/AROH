import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { Trek } from '../constants/mockData';
import { TrekCard } from '../components/TrekCard';
import { useAppStore } from '../store/useAppStore';
import { StatusBadge } from '../components/StatusBadge';
import { fetchTreks } from '../services/trekService';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { currentTrek, isTracking, selectedSeason, setSelectedSeason, downloadedTrekIds } = useAppStore();

  const [treks, setTreks] = useState<Trek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTreks = async () => {
      setLoading(true);
      const data = await fetchTreks();
      if (data.length === 0) {
        setError('Could not load treks. Check your connection.');
      } else {
        setTreks(data);
        setError(null);
      }
      setLoading(false);
    };
    loadTreks();
  }, []);

  const filteredTreks = selectedSeason
    ? treks.filter((t) => t.seasons.some((s) => s.season === selectedSeason))
    : treks;

  const handleTrekPress = (trek: Trek) => {
    navigation.navigate('TrekDetail', { trekId: trek.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[TYPOGRAPHY.bodyMedium, styles.greeting]}>Adventure awaits</Text>
            <Text style={[TYPOGRAPHY.h1, styles.brand]}>AROH Trails</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('SeasonPicker')} style={styles.seasonBadgeButton}>
            <StatusBadge
              label={selectedSeason ? `Season: ${selectedSeason}` : 'Select Season'}
              type={selectedSeason ? 'success' : 'neutral'}
            />
          </Pressable>
        </View>

        {/* Active tracking widget */}
        {isTracking && currentTrek && (
          <Pressable onPress={() => navigation.navigate('GPSTracking')} style={styles.activeSessionBanner}>
            <View style={styles.activeIndicator}>
              <View style={styles.activeDot} />
              <Text style={styles.activeLabel}>Live tracking active</Text>
            </View>
            <Text style={[TYPOGRAPHY.h3, styles.activeTrekName]}>{currentTrek.title}</Text>
            <Text style={[TYPOGRAPHY.bodySmall, styles.activeTrekSub]}>Tap to view GPS map and elevation metrics</Text>
          </Pressable>
        )}

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={[TYPOGRAPHY.h2, styles.sectionTitle]}>
            {selectedSeason ? `${selectedSeason} Treks` : 'All Recommended'}
          </Text>
          {selectedSeason && (
            <Pressable onPress={() => setSelectedSeason(null)}>
              <Text style={styles.clearText}>Clear filter</Text>
            </Pressable>
          )}
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textSecondary, marginTop: 12 }]}>
              Loading treks...
            </Text>
          </View>
        )}

        {/* Error */}
        {!loading && error && (
          <View style={styles.centerContainer}>
            <Text style={[TYPOGRAPHY.bodyLarge, { color: COLORS.danger, textAlign: 'center' }]}>
              {error}
            </Text>
          </View>
        )}

        {/* Trek list */}
        {!loading && !error && filteredTreks.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={[TYPOGRAPHY.bodyLarge, styles.emptyText]}>
              No treks found for {selectedSeason}.
            </Text>
          </View>
        )}

        {!loading && !error && filteredTreks.map((trek) => (
          <TrekCard
            key={trek.id}
            trek={trek}
            onPress={() => handleTrekPress(trek)}
            isDownloaded={downloadedTrekIds.includes(trek.id)}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  brand: { color: COLORS.textPrimary, marginTop: 4 },
  seasonBadgeButton: { paddingVertical: 4 },
  activeSessionBanner: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  activeIndicator: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF', marginRight: 6 },
  activeLabel: { color: '#FFFFFF', fontWeight: '500', fontSize: 12, textTransform: 'uppercase' },
  activeTrekName: { color: '#FFFFFF', fontWeight: '800' },
  activeTrekSub: { color: 'rgba(255, 255, 255, 0.8)', marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: COLORS.textPrimary },
  clearText: { color: COLORS.primary, fontWeight: '600' },
  centerContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center' },
});

export default HomeScreen;