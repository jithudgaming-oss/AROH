import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { Trek } from '../constants/mockData';
import { TrekCard } from '../components/TrekCard';
import { useAppStore } from '../store/useAppStore';
import { fetchTreks } from '../services/trekService';

export const MyTreksScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { downloadedTrekIds, completedTrekIds } = useAppStore();
  const [activeTab, setActiveTab] = useState<'downloaded' | 'completed'>('downloaded');
  const [allTreks, setAllTreks] = useState<Trek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTreks = async () => {
      const data = await fetchTreks();
      setAllTreks(data);
      setLoading(false);
    };
    loadTreks();
  }, []);

  const downloadedTreks = allTreks.filter((t) => downloadedTrekIds.includes(t.id));
  const completedTreks = allTreks.filter((t) => completedTrekIds.includes(t.id));
  const currentList = activeTab === 'downloaded' ? downloadedTreks : completedTreks;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[TYPOGRAPHY.h1, styles.title]}>My Treks</Text>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab('downloaded')}
            style={[styles.tab, activeTab === 'downloaded' && styles.tabActive]}
          >
            <Text style={[TYPOGRAPHY.bodyMedium, styles.tabText, activeTab === 'downloaded' && styles.tabTextActive]}>
              Offline Ready ({downloadedTreks.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('completed')}
            style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          >
            <Text style={[TYPOGRAPHY.bodyMedium, styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
              Completed ({completedTreks.length})
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : currentList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[TYPOGRAPHY.bodyLarge, styles.emptyText]}>
              {activeTab === 'downloaded'
                ? "You haven't downloaded any offline routes yet. Tap on any trek's details to download."
                : 'No completed treks logged yet. Finish a tracking session to log your first peak!'}
            </Text>
          </View>
        ) : (
          currentList.map((trek) => (
            <TrekCard
              key={trek.id}
              trek={trek}
              onPress={() => (navigation as any).navigate('Home', {
                screen: 'TrekDetail',
                params: { trekId: trek.id },
              })}
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
  header: { paddingHorizontal: 20, paddingTop: 10, borderBottomWidth: 1, borderColor: COLORS.border },
  title: { color: COLORS.textPrimary, marginBottom: 16 },
  tabContainer: { flexDirection: 'row', marginBottom: -1 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: COLORS.primary },
  tabText: { color: COLORS.textSecondary, fontWeight: '500' },
  tabTextActive: { color: COLORS.primary, fontWeight: '500' },
  scrollContent: { padding: 20 },
  emptyContainer: { padding: 40, alignItems: 'center', marginTop: 40 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },
});

export default MyTreksScreen;