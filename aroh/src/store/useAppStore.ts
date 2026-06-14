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

  setTracking: (isTracking: boolean) => void;
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
      // Onboarding Initial
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

      // Active Trek
      currentTrek: null,

      setCurrentTrek: (trek) =>
        set({
          currentTrek: trek,
        }),

      // GPS Tracking
      isTracking: false,
      trackedPath: [],

      setTracking: (isTracking) =>
        set({
          isTracking,
        }),

      addTrackedPoint: (point) =>
        set((state) => ({
          trackedPath: [...state.trackedPath, point],
        })),

      clearTrackedPath: () =>
        set({
          trackedPath: [],
        }),

      // Offline Downloads
      downloadedTrekIds: ['2'],

      toggleDownloadTrek: (trekId) =>
        set((state) => {
          const isDownloaded =
            state.downloadedTrekIds.includes(trekId);

          return {
            downloadedTrekIds: isDownloaded
              ? state.downloadedTrekIds.filter(
                (id) => id !== trekId
              )
              : [...state.downloadedTrekIds, trekId],
          };
        }),

      // Completed Treks
      completedTrekIds: [],

      completeTrek: (trekId) =>
        set((state) => ({
          completedTrekIds:
            state.completedTrekIds.includes(trekId)
              ? state.completedTrekIds
              : [...state.completedTrekIds, trekId],
        })),

      // Season Filter
      selectedSeason: null,

      setSelectedSeason: (selectedSeason) =>
        set({
          selectedSeason,
        }),

      // Health Verification
      healthVerified: false,

      setHealthVerified: (healthVerified) =>
        set({
          healthVerified,
        }),

      // Dark Mode
      isDarkMode: false,

      toggleDarkMode: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: 'aroh-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);