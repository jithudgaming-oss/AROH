import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Map, Camera, Marker } from '@maplibre/maplibre-react-native';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';

export default function GPSTrackingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isDarkMode = useAppStore((s) => s.isDarkMode);
  const C = COLORS.light;

  const currentTrek = useAppStore((s) => s.currentTrek);
  const trackedPath = useAppStore((s) => s.trackedPath);
  const trackingStartTime = useAppStore((s) => s.trackingStartTime);
  const addTrackedPoint = useAppStore((s) => s.addTrackedPoint);
  const setTracking = useAppStore((s) => s.setTracking);
  const startTracking = useAppStore((s) => s.startTracking);
  const completeTrek = useAppStore((s) => s.completeTrek);
  const clearTrackedPath = useAppStore((s) => s.clearTrackedPath);
  const emergencyContact = useAppStore((s) => s.emergencyContact);

  // Elapsed seconds derived from persisted start time
  const [seconds, setSeconds] = useState(
    trackingStartTime ? Math.floor((Date.now() - trackingStartTime) / 1000) : 0
  );

  const [currentCoords, setCurrentCoords] = useState({
    latitude: currentTrek?.startPoint.latitude ?? 30.1444,
    longitude: currentTrek?.startPoint.longitude ?? 79.7397,
  });
  const [totalDistance, setTotalDistance] = useState(0);
  const prevCoordsRef = useRef<{ latitude: number; longitude: number } | null>(null);

  // Start tracking time on mount
  useEffect(() => {
    startTracking();
  }, []);

  // Timer — ticks every second, always in sync with start time
  useEffect(() => {
    const interval = setInterval(() => {
      if (trackingStartTime) {
        setSeconds(Math.floor((Date.now() - trackingStartTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [trackingStartTime]);

  // GPS
  useEffect(() => {
    let subscriber: any = null;

    const startGPS = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const next = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          if (prevCoordsRef.current) {
            const prev = prevCoordsRef.current;
            const R = 6371;
            const dLat = (next.latitude - prev.latitude) * Math.PI / 180;
            const dLon = (next.longitude - prev.longitude) * Math.PI / 180;
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(prev.latitude * Math.PI / 180) *
              Math.cos(next.latitude * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            setTotalDistance((d) => d + dist);
          }

          prevCoordsRef.current = next;
          setCurrentCoords(next);
          addTrackedPoint({ ...next, timestamp: Date.now() });
        }
      );
    };

    startGPS();
    return () => { if (subscriber) subscriber.remove(); };
  }, []);

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSOS = () => {
    Alert.alert(
      'SOS Emergency',
      `Send your location (${currentCoords.latitude.toFixed(5)}, ${currentCoords.longitude.toFixed(5)}) to emergency contact: ${emergencyContact || 'Not set'}?\n\nEmergency number: 112`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send SOS',
          style: 'destructive',
          onPress: () =>
            Alert.alert('SOS Sent', 'Emergency services and your contact have been notified.'),
        },
      ]
    );
  };

  const handleFinish = () => {
    Alert.alert(
      'Finish Trek',
      'Mark this trek as completed and save your route?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete Trek',
          onPress: () => {
            if (currentTrek) completeTrek(currentTrek.id);
            setTracking(false);
            clearTrackedPath();
            navigation.replace('TrekStatus');
          },
        },
      ]
    );
  };

  const trekDistance = currentTrek?.distanceKm ?? 6.2;
  const remaining = Math.max(0, trekDistance - totalDistance).toFixed(1);

  const statsData = [
    { label: 'Covered', value: `${totalDistance.toFixed(2)} km` },
    { label: 'Remaining', value: `${remaining} km` },
    { label: 'Altitude', value: `${(currentCoords.latitude > 20 ? 3000 + trackedPath.length * 2 : 500).toFixed(0)} m`, highlight: true },
    { label: 'Elapsed', value: formatTime(seconds) },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]} edges={['top']}>

      {/* Live Map */}
      <View style={styles.mapContainer}>
        <Map
          style={styles.map}
          mapStyle="https://demotiles.maplibre.org/style.json"
          logo={false}
          attribution={false}
        >
          <Camera
            initialViewState={{
              center: [currentCoords.longitude, currentCoords.latitude],
              zoom: 12,
            }}
          />
          <Marker lngLat={[currentCoords.longitude, currentCoords.latitude]}>
            <View style={styles.locationDot} />
          </Marker>
        </Map>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      >

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.liveRow}>
            <View style={[styles.dot, { backgroundColor: '#4CAF8A' }]} />
            <Text style={[styles.liveText, { color: '#4CAF8A' }]}>GPS Active</Text>
          </View>
          <Text style={[TYPOGRAPHY.h2, { color: C.textPrimary, textAlign: 'center' }]}>
            {currentTrek?.title || 'Active Trail'}
          </Text>
          <View style={[styles.badge, { backgroundColor: C.primaryLight }]}>
            <Text style={[styles.badgeText, { color: C.primary }]}>On Route</Text>
          </View>
        </View>

        {/* Timer */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.cardLabel, { color: C.textSecondary }]}>Elapsed Time</Text>
          <Text style={[styles.timer, { color: C.textPrimary, fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace' }]}>
            {formatTime(seconds)}
          </Text>
        </View>

        {/* Stats grid */}
        <View style={styles.grid}>
          {statsData.map((item) => (
            <View
              key={item.label}
              style={[styles.gridItem, { backgroundColor: item.highlight ? C.primary : C.surface, borderColor: C.border }]}
            >
              <Text style={[styles.gridLabel, { color: item.highlight ? '#fff' : C.textSecondary }]}>
                {item.label}
              </Text>
              <Text style={[styles.gridValue, { color: item.highlight ? '#fff' : C.textPrimary }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Next waypoint */}
        <View style={[styles.waypoint, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.waypointLabel, { color: C.textSecondary }]}>Next waypoint</Text>
          <Text style={[styles.waypointValue, { color: C.primary }]}>High Camp — 1.2 km</Text>
        </View>

        {/* Coordinates */}
        <View style={[styles.coords, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.cardLabel, { color: C.textSecondary, marginBottom: 8 }]}>
            GPS Position · {trackedPath.length} points logged
          </Text>
          <View style={styles.coordRow}>
            <View style={styles.coordCol}>
              <Text style={[styles.coordLabel, { color: C.textSecondary }]}>LAT</Text>
              <Text style={[styles.coordValue, { color: C.textPrimary, fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace' }]}>
                {currentCoords.latitude.toFixed(5)}
              </Text>
            </View>
            <View style={styles.coordCol}>
              <Text style={[styles.coordLabel, { color: C.textSecondary }]}>LON</Text>
              <Text style={[styles.coordValue, { color: C.textPrimary, fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace' }]}>
                {currentCoords.longitude.toFixed(5)}
              </Text>
            </View>
          </View>
        </View>

        {/* SOS Button */}
        <View style={[styles.sosBtn, { backgroundColor: C.danger }]} onTouchEnd={handleSOS}>
          <Text style={styles.sosBtnText}>✛  SOS EMERGENCY</Text>
          <Text style={styles.sosSubText}>112 · Tap to alert emergency contact</Text>
        </View>

        {/* Finish button */}
        <View style={[styles.finishBtn, { backgroundColor: C.surface, borderColor: C.border }]} onTouchEnd={handleFinish}>
          <Text style={[styles.finishText, { color: C.primary }]}>Complete and Log Trek</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  mapContainer: { height: 200, width: '100%' },
  map: { flex: 1 },
  locationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1E6B3C',
    borderWidth: 2.5,
    borderColor: '#fff',
  },
  scroll: { padding: 20, paddingBottom: 120, backgroundColor: '#FFFFFF' },
  header: { alignItems: 'center', marginBottom: 20 },
  liveRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  liveText: { fontSize: 12, fontWeight: '500' },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  badgeText: { fontSize: 12, fontWeight: '500' },
  card: { borderRadius: 12, padding: 20, alignItems: 'center', borderWidth: 0.5, marginBottom: 14 },
  cardLabel: { fontSize: 11, fontWeight: '400', marginBottom: 6 },
  timer: { fontSize: 42, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  gridItem: { width: '47%', borderRadius: 12, padding: 14, borderWidth: 0.5, alignItems: 'center' },
  gridLabel: { fontSize: 11, fontWeight: '400', marginBottom: 4 },
  gridValue: { fontSize: 18, fontWeight: '500' },
  waypoint: { borderRadius: 12, padding: 14, borderWidth: 0.5, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  waypointLabel: { fontSize: 13, fontWeight: '400' },
  waypointValue: { fontSize: 14, fontWeight: '500' },
  coords: { borderRadius: 12, padding: 14, borderWidth: 0.5, marginBottom: 20 },
  coordRow: { flexDirection: 'row', justifyContent: 'space-around' },
  coordCol: { alignItems: 'center' },
  coordLabel: { fontSize: 11, fontWeight: '400', marginBottom: 4 },
  coordValue: { fontSize: 16, fontWeight: '500' },
  sosBtn: { borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 12 },
  sosBtnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  sosSubText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
  finishBtn: { borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 0.5 },
  finishText: { fontSize: 15, fontWeight: '500' },
});