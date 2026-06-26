import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Trek } from '../constants/mockData';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { StatusBadge } from '../components/StatusBadge';
import { SeasonChip } from '../components/SeasonChip';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAppStore } from '../store/useAppStore';
import { fetchTrekById } from '../services/trekService';

export const TrekDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { trekId } = route.params || { trekId: '1' };

  const [trek, setTrek] = useState<Trek | null>(null);
  const [loading, setLoading] = useState(true);

  const { downloadedTrekIds, toggleDownloadTrek, setCurrentTrek } = useAppStore();

  useEffect(() => {
    const loadTrek = async () => {
      const data = await fetchTrekById(trekId);
      setTrek(data);
      setLoading(false);
    };
    loadTrek();
  }, [trekId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!trek) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: COLORS.danger }}>Trek not found.</Text>
      </View>
    );
  }

  const isDownloaded = downloadedTrekIds.includes(trek.id);

  const handleStartTrek = () => {
    setCurrentTrek(trek);
    navigation.navigate('HealthCheck');
  };

  const handleDownload = () => {
    if (isDownloaded) {
      toggleDownloadTrek(trek.id);
    } else {
      navigation.navigate('OfflineDownload', { trekId: trek.id });
    }
  };

  const freshnessColor =
    trek.dataVerifiedDaysAgo <= 7
      ? '#1E6B3C'
      : trek.dataVerifiedDaysAgo <= 30
        ? '#E07B2A'
        : '#C62828';

  return (
    <ScrollView style={styles.container} bounces={false}>

      {/* Banner Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: trek.imageUrl }} style={styles.image} />
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <View style={styles.statusOverlay}>
          <StatusBadge label={trek.status} type={trek.status === 'Open' ? 'success' : 'info'} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>

        <Text style={[TYPOGRAPHY.h1, styles.title]}>{trek.title}</Text>

        <View style={styles.chipRow}>
          <StatusBadge label={trek.difficulty} type="info" />
          {trek.seasons.map((s) => (
            <SeasonChip key={s.season} season={s.season} />
          ))}
        </View>

        <View style={styles.freshnessRow}>
          <View style={[styles.freshnessDot, { backgroundColor: freshnessColor }]} />
          <Text style={styles.freshnessText}>
            Data verified: {trek.dataVerifiedDate} · {trek.state}, {trek.district}
          </Text>
        </View>

        <Text style={[TYPOGRAPHY.bodyLarge, styles.description]}>{trek.description}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statVal}>{trek.distanceKm} km</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statVal}>{trek.durationDays} days</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Max Elevation</Text>
            <Text style={styles.statVal}>{trek.maxElevationM} m</Text>
          </View>
        </View>

        {/* Permit */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>Permit</Text>
          <View style={[styles.permitCard, { borderColor: COLORS.border }]}>
            <Text style={styles.permitText}>
              {trek.permitRequired
                ? `Required · ₹${trek.permitFeeINR} per person`
                : 'No permit required'}
            </Text>
          </View>
        </View>

        {/* Cost estimate */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>Estimated Costs</Text>
          {Object.entries({
            Transport: trek.costEstimate.transportINR,
            'Stay per night': trek.costEstimate.accommodationPerNightINR,
            'Guide per day': trek.costEstimate.guidePerDayINR,
            'Food per day': trek.costEstimate.foodPerDayINR,
          }).map(([label, value]) => (
            <View key={label} style={styles.costRow}>
              <Text style={styles.costLabel}>{label}</Text>
              <Text style={styles.costValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Day-wise route */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>Day-wise Route</Text>
          {trek.days.map((day) => (
            <View key={day.day} style={styles.dayRow}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>Day {day.day}</Text>
              </View>
              <View style={styles.dayInfo}>
                <Text style={styles.dayRoute}>{day.from} → {day.to}</Text>
                <Text style={styles.dayMeta}>{day.elevationM}m · {day.distanceKm} km</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Safety */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>Safety Protocols</Text>
          {trek.safetyTips.map((tip, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[TYPOGRAPHY.bodyMedium, styles.bulletText]}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Gear */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>Recommended Gear</Text>
          {trek.recommendedGear.map((gear, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[TYPOGRAPHY.bodyMedium, styles.bulletText]}>{gear}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <PrimaryButton
            title={isDownloaded ? 'Delete Offline Map' : 'Download Offline Map'}
            onPress={handleDownload}
            variant="secondary"
            style={styles.actionBtn}
          />
          <PrimaryButton
            title="Start Trek"
            onPress={handleStartTrek}
            style={styles.actionBtn}
          />
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 280, backgroundColor: '#334155' },
  backButton: {
    position: 'absolute', top: 40, left: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
  },
  backText: { color: '#FFFFFF', fontWeight: '500', fontSize: 14 },
  statusOverlay: { position: 'absolute', top: 40, right: 20 },
  content: {
    padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    backgroundColor: COLORS.background, marginTop: -24,
  },
  title: { color: COLORS.textPrimary, marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 },
  freshnessRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  freshnessDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  freshnessText: { fontSize: 12, color: COLORS.textSecondary },
  description: { color: COLORS.textSecondary, lineHeight: 24, marginBottom: 20 },
  statsContainer: {
    flexDirection: 'row', backgroundColor: COLORS.cardBg, borderRadius: 12,
    padding: 16, borderWidth: 0.5, borderColor: COLORS.border, marginBottom: 24,
    justifyContent: 'space-between', alignItems: 'center',
  },
  statBox: { alignItems: 'center', flex: 1 },
  statDivider: { width: 0.5, height: 40, backgroundColor: COLORS.border },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 },
  statVal: { fontSize: 18, fontWeight: '500', color: COLORS.primary },
  section: { marginBottom: 24 },
  sectionTitle: { color: COLORS.textPrimary, marginBottom: 10 },
  permitCard: { borderWidth: 0.5, borderRadius: 10, padding: 12, backgroundColor: COLORS.cardBg },
  permitText: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '500' },
  costRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: COLORS.divider },
  costLabel: { fontSize: 13, color: COLORS.textSecondary },
  costValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '500' },
  dayRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 12 },
  dayBadge: { backgroundColor: COLORS.primaryLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  dayBadgeText: { fontSize: 12, color: COLORS.primary, fontWeight: '500' },
  dayInfo: { flex: 1 },
  dayRoute: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '500' },
  dayMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, paddingRight: 10 },
  bullet: { color: COLORS.primary, fontSize: 16, lineHeight: 20, marginRight: 8 },
  bulletText: { color: COLORS.textSecondary, lineHeight: 20, flex: 1 },
  actionContainer: { marginTop: 8, marginBottom: 40 },
  actionBtn: { marginBottom: 12 },
});

export default TrekDetailScreen;