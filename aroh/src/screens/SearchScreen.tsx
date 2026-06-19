import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import MapLibreGL from '@maplibre/maplibre-react-native';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { MOCK_TREKS, Trek } from '../constants/mockData';
import { TrekCard } from '../components/TrekCard';
import { useAppStore } from '../store/useAppStore';

// const MapLibre = MapLibreGL.default || MapLibreGL;
// MapLibreGL.setAccessToken(null);


type DifficultyFilter = 'All' | Trek['difficulty'];

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAP_HEIGHT = SCREEN_HEIGHT * 0.38;

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: '#22c55e',
  Moderate: '#f59e0b',
  Challenging: '#ef4444',
  Expert: '#7c3aed',
};

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { downloadedTrekIds } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('All');

  const difficulties: DifficultyFilter[] = ['All', 'Easy', 'Moderate', 'Challenging', 'Expert'];

  const filteredTreks = MOCK_TREKS.filter((trek) => {
    const matchesSearch =
      trek.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'All' || trek.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mapContainer, { height: MAP_HEIGHT, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.cardBg }]}>
        <Text style={{ color: COLORS.textSecondary, fontSize: 16, fontWeight: '500' }}>
          Map View Placeholder (Expo Go)
        </Text>
      </View>


      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by valley, peak, city..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff;
            return (
              <Pressable
                key={diff}
                onPress={() => setSelectedDifficulty(diff)}
                style={[styles.filterBtn, isSelected && styles.filterBtnSelected]}
              >
                <Text style={[TYPOGRAPHY.bodySmall, styles.filterText, isSelected && styles.filterTextSelected]}>
                  {diff}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredTreks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[TYPOGRAPHY.bodyLarge, styles.emptyText]}>No treks match your search criteria.</Text>
          </View>
        ) : (
          filteredTreks.map((trek) => (
            <TrekCard
              key={trek.id}
              trek={trek}
              onPress={() => (navigation as any).navigate('Home', { screen: 'TrekDetail', params: { trekId: trek.id } })}
              isDownloaded={downloadedTrekIds.includes(trek.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  mapContainer: { width: '100%', overflow: 'hidden', borderBottomWidth: 1, borderColor: COLORS.border },
  map: { flex: 1 },
  pin: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pinText: { color: '#ffffff', fontSize: 10, fontWeight: '500' },
  header: { paddingHorizontal: 20, paddingTop: 12, borderBottomWidth: 1, borderColor: COLORS.border, paddingBottom: 12 },
  searchContainer: { backgroundColor: COLORS.cardBg, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 0.5, borderColor: COLORS.border, marginBottom: 12 },
  searchInput: { color: COLORS.textPrimary, fontSize: 15 },
  filterScroll: { paddingRight: 20 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: COLORS.cardBg, borderWidth: 0.5, borderColor: COLORS.border, marginRight: 8 },
  filterBtnSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { color: COLORS.textSecondary, fontWeight: '500' },
  filterTextSelected: { color: '#ffffff', fontWeight: '500' },
  scrollContent: { padding: 20 },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center' },
});

export default SearchScreen;