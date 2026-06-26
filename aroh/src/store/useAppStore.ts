import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trek } from '../constants/mockData';

export interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface AppState {
  // Onboarding
  onboarded: boolean;
  age: number | null;
  emergencyContact: string;
  termsAccepted: boolean;

  setOnboardingData: (data: {
    age: number;
    emergencyContact: string;
    termsAccepted: boolean;
  }) => void;

  resetOnboarding: () => void;

  // Active Trek
  currentTrek: Trek | null;
  setCurrentTrek: (trek: Trek | null) => void;

  // GPS Tracking
  isTracking: boolean;
  trackedPath: LocationPoint[];
  trackingStartTime: number | null;

  setTracking: (isTracking: boolean) => void;
  startTracking: () => void;
  addTrackedPoint: (point: LocationPoint) => void;
  clearTrackedPath: () => void;

  // Offline Downloads
  downloadedTrekIds: string[];
  toggleDownloadTrek: (trekId: string) => void;

  // Completed Treks
  completedTrekIds: string[];
  completeTrek: (trekId: string) => void;

  // Season Picker Filter
  selectedSeason: string | null;
  setSelectedSeason: (season: string | null) => void;

  // Health Pre-check
  healthVerified: boolean;
  setHealthVerified: (verified: boolean) => void;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboarded: false,
      age: null,
      emergencyContact: '',
      termsAccepted: false,

      setOnboardingData: (data) =>
        set({
          onboarded: true,
          age: data.age,
          emergencyContact: data.emergencyContact,
          termsAccepted: data.termsAccepted,
        }),

      resetOnboarding: () =>
        set({
          onboarded: false,
          age: null,
          emergencyContact: '',
          termsAccepted: false,
        }),

      currentTrek: null,
      setCurrentTrek: (trek) => set({ currentTrek: trek }),

      isTracking: false,
      trackedPath: [],
      trackingStartTime: null,

      setTracking: (isTracking) => set({ isTracking }),

      startTracking: () =>
        set((state) => ({
          isTracking: true,
          trackingStartTime: state.trackingStartTime ?? Date.now(),
        })),

      addTrackedPoint: (point) =>
        set((state) => ({
          trackedPath: [...state.trackedPath, point],
        })),

      clearTrackedPath: () =>
        set({
          trackedPath: [],
          trackingStartTime: null,
        }),

      downloadedTrekIds: ['2'],

      toggleDownloadTrek: (trekId) =>
        set((state) => {
          const isDownloaded = state.downloadedTrekIds.includes(trekId);
          return {
            downloadedTrekIds: isDownloaded
              ? state.downloadedTrekIds.filter((id) => id !== trekId)
              : [...state.downloadedTrekIds, trekId],
          };
        }),

      completedTrekIds: [],

      completeTrek: (trekId) =>
        set((state) => ({
          completedTrekIds: state.completedTrekIds.includes(trekId)
            ? state.completedTrekIds
            : [...state.completedTrekIds, trekId],
        })),

      selectedSeason: null,
      setSelectedSeason: (selectedSeason) => set({ selectedSeason }),

      healthVerified: false,
      setHealthVerified: (healthVerified) => set({ healthVerified }),

      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'aroh-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);