# AROH Project - Complete Context & Documentation

**Date Created:** June 2, 2026  
**Project:** AROH - High Altitude Trek Tracking Mobile App  
**Platform:** React Native (Expo)  
**Status:** In Development

---

## 1. PROJECT OVERVIEW

### What is AROH?
AROH is a React Native mobile application designed for high-altitude trek tracking and safety management in the Himalayan region (Uttarakhand, India). The app helps users plan, execute, and track mountain treks with emphasis on:
- Real-time GPS tracking during active trekking
- Health & safety verification before trek initiation
- Offline map support for trekking routes
- Emergency SOS beacon functionality with location sharing
- Trek status history and completion logging
- Season-based trek filtering and recommendations

### Key Features Implemented
1. **Onboarding System** - 3-step: Age verification → Terms & Conditions → Emergency Contact
2. **Trek Discovery** - Browse available treks with filters (difficulty, season, distance)
3. **Trek Details** - Comprehensive trek info (distance, duration, elevation, permits, routes, costs)
4. **GPS Tracking** - Live trail recording with simulated GPS coordinates
5. **Health Pre-check** - Mandatory safety acknowledgement before starting a trek
6. **Offline Downloads** - Simulation of offline map caching
7. **Settings & Profile** - User preferences, onboarding reset, dark mode toggle
8. **Trek History** - View completed treks and offline-ready treks

---

## 2. SECURITY RULES (MUST FOLLOW)

### Frontend Rules (React Native)
```
✗ Never hardcode API URLs, keys, or secrets
✓ All backend URLs go in app.config.js under `extra`
✗ Never use eval() or dynamic code execution
✓ Validate and trim all user inputs before use
✓ GPS coordinates must be validated (lat: -90 to 90, long: -180 to 180)
✓ Emergency contact: strip non-numeric characters before storing
✓ Font weights: only '400' or '500'
✗ No console.log() in screen files (use __DEV__ guard if needed)
```

### Backend Rules (When built with Node.js)
```
✓ Rate limit auth: 5 requests per 15 minutes per IP
✓ Rate limit general API: 60 requests per minute per IP
✓ Validate trek data with Zod before database write
✓ Hash passwords with bcrypt (min cost 12)
✓ JWT secret: min 32 chars, stored in .env only
✓ JWT expiry: max 60 minutes, refresh tokens in httpOnly cookies
✗ Never return raw database errors to client
✓ CORS restricted to app origin only (no wildcard)
✓ helmet middleware on all routes
✓ .env never committed to git
```

### Data Rules Specific to AROH
```
✓ Trek status always shows source + timestamp (never just "Open")
✗ User GPS path never sent to any third party
✓ Emergency contact stored locally only (no server without explicit action)
✓ Legal agreement logs: userId + agreementType + timestamp + appVersion
```

---

## 3. PROJECT STRUCTURE

```
AROH/
├── CLAUDE.md                              # Security rules & guidelines
├── README.txt                             # Basic readme
├── ScreensSummary.md                      # Description of 13 screens
├── PROJECT_CONTEXT_FOR_AI.md              # This file
│
└── aroh/                                  # Main React Native project
    ├── package.json                       # Dependencies
    ├── tsconfig.json                      # TypeScript config
    ├── app.json                           # Expo config
    ├── App.tsx                            # Root component
    ├── index.ts                           # Expo entry point
    │
    ├── assets/                            # Images, icons, fonts
    │
    ├── src/
    │   ├── components/                    # Reusable components
    │   │   ├── PrimaryButton.tsx          # CTA button
    │   │   ├── SafetyCheckbox.tsx         # Custom checkbox
    │   │   ├── SeasonChip.tsx             # Season filter chip
    │   │   ├── StatusBadge.tsx            # Trek status badge
    │   │   └── TrekCard.tsx               # Trek preview card
    │   │
    │   ├── constants/
    │   │   ├── colors.ts                  # Color palette (light/dark modes)
    │   │   ├── legacyColors.ts            # Old color scheme (deprecated)
    │   │   ├── mockData.ts                # Trek database (MOCK_TREKS array)
    │   │   └── typography.ts              # Font sizes & weights
    │   │
    │   ├── navigation/
    │   │   └── AppNavigator.tsx           # Navigation structure
    │   │
    │   ├── screens/                       # 13 Screen files
    │   │   ├── HomeScreen.tsx             # Main dashboard
    │   │   ├── SearchScreen.tsx           # Trek search interface
    │   │   ├── TrekDetailScreen.tsx       # Trek information & actions
    │   │   ├── GPSTrackingScreen.tsx      # Active tracking session
    │   │   ├── HealthCheckScreen.tsx      # Pre-trek safety checklist
    │   │   ├── OfflineDownloadScreen.tsx  # Map download simulation
    │   │   ├── TrekStatusScreen.tsx       # Trek completion summary
    │   │   ├── MyTreksScreen.tsx          # User trek library
    │   │   ├── SettingsScreen.tsx         # User preferences
    │   │   ├── SeasonPickerScreen.tsx     # Season filter
    │   │   ├── OnboardingAge.tsx          # Age verification (Step 1)
    │   │   ├── OnboardingTerms.tsx        # Terms acceptance (Step 3)
    │   │   └── OnboardingEmergency.tsx    # Emergency contact (Step 2)
    │   │
    │   └── store/
    │       └── useAppStore.ts             # Zustand global state
    │
    ├── android/                           # Android native config & build
    │   ├── gradle/
    │   ├── build.gradle
    │   ├── gradlew / gradlew.bat
    │   └── app/
    │       ├── build.gradle
    │       ├── proguard-rules.pro
    │       └── src/main/AndroidManifest.xml
    │
    └── (ios/ folder not visible but Expo supports it)
```

---

## 4. INSTALLED DEPENDENCIES

### Core Framework & Navigation
```json
"expo": "~56.0.5"
"react": "19.2.3"
"react-native": "0.85.3"
"@react-navigation/native": "^7.2.5"
"@react-navigation/native-stack": "^7.16.0"
"@react-navigation/bottom-tabs": "^7.16.2"
```

### State Management & Storage
```json
"zustand": "^5.0.13"
"@react-native-async-storage/async-storage": "2.2.0"
```

### Location & Device APIs
```json
"expo-location": "~56.0.14"
"expo-task-manager": "~56.0.15"
```

### Maps & UI
```json
"@maplibre/maplibre-react-native": "^11.2.1"
"react-native-safe-area-context": "~5.7.0"
"react-native-screens": "4.25.2"
```

### Status & System
```json
"expo-status-bar": "~56.0.4"
"expo-system-ui": "~56.0.5"
```

### Dev Dependencies
```json
"@types/react": "~19.2.2"
"typescript": "~6.0.3"
```

### Available Scripts
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run web preview
```

---

## 5. KEY CODE FILES

### 5.1 App.tsx - Root Component
```tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
```

### 5.2 useAppStore.ts - Global State (Zustand)
```tsx
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
  setOnboardingData: (data: { age: number; emergencyContact: string; termsAccepted: boolean }) => void;
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
      // Initial values
      onboarded: false,
      age: null,
      emergencyContact: '',
      termsAccepted: false,
      currentTrek: null,
      isTracking: false,
      trackedPath: [],
      downloadedTrekIds: ['2'],
      completedTrekIds: [],
      selectedSeason: null,
      healthVerified: false,
      isDarkMode: true,
      
      // Methods...
      setOnboardingData: (data) => set({...}),
      // ... other methods
    }),
    {
      name: 'aroh-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### 5.3 AppNavigator.tsx - Navigation Structure
```tsx
// Root Level: Onboarding vs Main App
export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};

// Onboarding Flow (3 steps)
export type OnboardingStackParamList = {
  OnboardingAge: undefined;
  OnboardingTerms: undefined;
  OnboardingEmergency: undefined;
};

// Main Tab Navigation (4 tabs)
export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  MyTreks: undefined;
  Emergency: undefined;
};

// Home Tab Stack (7 screens)
export type HomeStackParamList = {
  HomeScreen: undefined;
  TrekDetail: { trekId: string };
  SeasonPicker: { trekId: string };
  HealthCheck: { trekId: string };
  OfflineDownload: { trekId: string };
  TrekStatus: { trekId: string };
  GPSTracking: { trekId: string };
};
```

### 5.4 mockData.ts - Trek Data Structure
```tsx
export interface Trek {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  durationDays: number;
  distanceKm: number;
  elevationGainM: number;
  maxElevationM: number;
  state: string;
  district: string;
  description: string;
  imageUrl: string;
  status: 'Open' | 'Closed' | 'Weather Lock';
  dataVerifiedDate: string;
  dataVerifiedDaysAgo: number;
  permitRequired: boolean;
  permitFeeINR: number | null;
  startPoint: { latitude: number; longitude: number; name: string };
  coordinates: { latitude: number; longitude: number }[];
  seasons: SeasonInfo[];
  days: DayRoute[];
  costEstimate: {
    transportINR: string;
    accommodationPerNightINR: string;
    guidePerDayINR: string;
    foodPerDayINR: string;
  };
  safetyTips: string[];
  recommendedGear: string[];
  healthRequirements: string[];
  offlineDownloaded?: boolean;
}

export const MOCK_TREKS: Trek[] = [
  {
    id: '1',
    title: 'Roopkund Lake Trek',
    difficulty: 'Challenging',
    durationDays: 8,
    distanceKm: 53,
    elevationGainM: 3200,
    maxElevationM: 5029,
    // ... more data
  },
  // ... more treks
];
```

### 5.5 colors.ts - Theme Configuration
```tsx
export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F4F7F4',
    primary: '#1E6B3C',
    primaryLight: '#E8F5E9',
    accent: '#E07B2A',
    danger: '#C62828',
    textPrimary: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E0E4E0',
    divider: '#F0F0F0',
  },
  dark: {
    background: '#0F1612',
    surface: '#1A2B20',
    primary: '#4CAF8A',
    primaryLight: '#1A3326',
    accent: '#E07B2A',
    danger: '#EF5350',
    textPrimary: '#F0F0F0',
    textSecondary: '#9CA3AF',
    border: '#2A3A30',
    divider: '#1E2E24',
  },
};

export const COLORS = {
  ...Colors.dark,
  primaryDark: '#1E6B3C',
  cardBg: Colors.dark.surface,
  cardBgHover: '#243D2C',
  textMuted: '#6B7B6E',
  success: Colors.dark.primary,
  error: Colors.dark.danger,
  warning: Colors.dark.accent,
  info: '#3B82F6',
  borderLight: '#3A4A40',
  overlay: 'rgba(15, 22, 18, 0.75)',
};
```

---

## 6. SCREEN DESCRIPTIONS (13 Total)

### Onboarding Flow (Conditional - First Time Only)
1. **OnboardingAge.tsx** - Asks user age, validates for altitude safety
2. **OnboardingEmergency.tsx** - Captures emergency contact phone number
3. **OnboardingTerms.tsx** - Legal agreement acceptance & GPS permission

### Main App Tabs
#### Tab 1: Home (Trek Discovery)
4. **HomeScreen.tsx** - Dashboard showing available treks, current active session indicator
5. **TrekDetailScreen.tsx** - Complete trek info, permits, costs, routes, safety tips
6. **SeasonPickerScreen.tsx** - Filter treks by climate season (Spring/Summer/Monsoon/Autumn/Winter)
7. **SearchScreen.tsx** - Text search + difficulty filter chips

#### Tab 2: Explore / Tab 3: MyTreks
8. **MyTreksScreen.tsx** - "Offline Ready" (downloaded maps) + "Completed" (history)

#### Tab 4: Settings / Other Screens
9. **SettingsScreen.tsx** - User age/contact display, notification toggles, reset profile

### Trek Execution Flow
10. **HealthCheckScreen.tsx** - Pre-trek mandatory checklist (oxygen, hydration, acclimatization)
11. **OfflineDownloadScreen.tsx** - Simulated map caching with progress bar
12. **GPSTrackingScreen.tsx** - Active tracking: live timer, metrics (elevation, distance), SOS button
13. **TrekStatusScreen.tsx** - Success screen after trek completion with summary stats

---

## 7. COMPONENT LIBRARY (5 Reusable Components)

### PrimaryButton.tsx
```tsx
// CTA button component used throughout the app
// Props: onPress, title, variant?, loading?, disabled?
```

### SafetyCheckbox.tsx
```tsx
// Custom checkbox for health verification
// Props: checked, onCheck, label?
```

### SeasonChip.tsx
```tsx
// Filter chip for season selection
// Props: label, selected, onPress
```

### StatusBadge.tsx
```tsx
// Shows trek status (Open, Closed, Weather Lock)
// Props: status, verifiedDate?, daysAgo?
```

### TrekCard.tsx
```tsx
// Trek preview card with image, title, difficulty, distance
// Props: trek, onPress
```

---

## 8. STATE MANAGEMENT (Zustand + AsyncStorage)

**What is Persisted:**
- Onboarding status (age, emergency contact, terms)
- Downloaded trek IDs
- Completed trek IDs
- Current active trek
- GPS tracked path (current session)
- Selected season filter
- Health verification flag
- Dark mode toggle

**Storage Key:** `aroh-storage`  
**Persistence:** AsyncStorage (device local)

---

## 9. CONFIGURATION FILES

### app.json (Expo Configuration)
```json
{
  "expo": {
    "name": "aroh",
    "slug": "aroh",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      },
      "package": "com.anonymous.aroh"
    }
  }
}
```

### package.json Scripts
```bash
npm start          # Dev server
npm run android    # Android device/emulator
npm run ios        # iOS device/simulator
npm run web        # Web preview
```

### tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": false
  }
}
```

---

## 10. TECH STACK SUMMARY

| Layer | Technology |
|-------|-----------|
| **Framework** | React Native (Expo) v56 |
| **Language** | TypeScript |
| **Navigation** | React Navigation (native-stack + bottom-tabs) |
| **State** | Zustand + AsyncStorage |
| **Maps** | MapLibre GL React Native |
| **Location** | Expo Location API |
| **Styling** | React Native StyleSheet (no external CSS-in-JS) |
| **Data** | Mock JSON arrays (future: REST API) |

---

## 11. WHAT HAS BEEN DONE

✅ **Project Setup**
- React Native/Expo project initialized
- TypeScript configured
- Directory structure organized

✅ **Navigation**
- AppNavigator with onboarding flow
- Bottom tab navigation (4 tabs)
- Nested stack navigators for deep linking

✅ **State Management**
- Zustand store with persistence
- AsyncStorage integration
- 10+ state slices for different features

✅ **UI Components**
- 5 reusable components created
- Color system (light/dark modes)
- Typography constants

✅ **Screen Stubs**
- All 13 screens created but mostly empty
- Navigation parameters defined
- Type-safe navigation setup

✅ **Mock Data**
- Trek database with 20+ sample treks
- Season info, routes, costs, permits
- Realistic Himalayan trek data

✅ **Documentation**
- ScreensSummary.md - All 13 screens explained
- Security rules in CLAUDE.md
- AGENTS.md referencing Expo docs

---

## 12. WHAT REMAINS TO BE BUILT

❌ **Screen Implementation**
- Fill all 13 screens with actual UI
- Connect screens to state
- Add form validations

❌ **Backend Integration**
- API endpoints for trek data
- User authentication
- GPS data submission
- Emergency alert sending

❌ **Native Features**
- Real GPS tracking (currently simulated)
- Background location service
- Push notifications
- Offline maps (using MapLibre offline)

❌ **Testing**
- Unit tests
- E2E tests

---

## 13. KEY LIMITATIONS & NOTES

### Current Limitations
1. **GPS Tracking is Simulated** - Uses mock data, not real coordinates
2. **No Real Backend** - All data is mocked locally
3. **Screens are Empty** - UI skeleton exists but no implementation
4. **No Authentication** - No user login/signup system yet
5. **No API Integration** - Frontend ready but backend not connected
6. **Maps Not Functional** - MapLibre imported but not displayed
7. **Offline Maps Not Working** - Simulated, not actually cached

### Important Notes
- TypeScript strict mode is OFF (`"strict": false`)
- Expo version is v56 - always check docs at https://docs.expo.dev/versions/v56.0.0/
- Android package: `com.anonymous.aroh`
- Light mode is in settings but dark theme is default

---

## 14. FILE LOCATIONS & READABILITY

### Files I Can Read (✅ Verified)
- ✅ CLAUDE.md
- ✅ README.txt
- ✅ ScreensSummary.md
- ✅ aroh/App.tsx
- ✅ aroh/index.ts
- ✅ aroh/package.json
- ✅ aroh/app.json
- ✅ aroh/tsconfig.json
- ✅ aroh/src/store/useAppStore.ts
- ✅ aroh/src/constants/colors.ts
- ✅ aroh/src/constants/mockData.ts
- ✅ aroh/src/navigation/AppNavigator.tsx
- ✅ aroh/src/screens/* (all 13 screen files)
- ✅ aroh/src/components/* (all 5 component files)

### Folders I Can Access
- ✅ aroh/src/ (all subdirectories)
- ✅ aroh/assets/ (image/icon files)
- ✅ aroh/android/ (build configs)

### What I Can Do
1. **Read & Analyze** - Any file in the src/ or root directories
2. **Edit Files** - Modify any TypeScript/JSON/config file
3. **Create Files** - Add new components, screens, utilities
4. **Show Code** - Display full or partial file contents
5. **Find Issues** - Syntax check, type errors, missing imports
6. **Suggest Improvements** - Refactoring, best practices, security fixes
7. **Search Across** - Find all usages of a component, function, or variable

### What I Cannot Do
- ✗ Build/compile the app myself
- ✗ Run the app on device
- ✗ Install native dependencies
- ✗ Access node_modules (too large)
- ✗ Modify Android native code (Java/Kotlin)
- ✗ Access your local environment variables

---

## 15. QUICK REFERENCE - HOW TO SHARE THIS DOCUMENT

**This document contains:**
- ✅ Complete project overview
- ✅ All security rules and guidelines
- ✅ Full project structure diagram
- ✅ All installed dependencies with versions
- ✅ Key source code snippets
- ✅ State management structure
- ✅ All 13 screen descriptions
- ✅ Tech stack details
- ✅ What's been done vs what remains
- ✅ File accessibility information

**To share with another AI:**
1. Copy this entire file
2. Share alongside the actual source files (zip src/ folder)
3. AI can now understand full context
4. AI can read all provided files directly
5. AI can make changes and improvements

---

## 16. QUESTIONS TO CLARIFY (For Next AI or Future Development)

1. **Backend Ready?** Is there a Node.js/Express API ready to integrate?
2. **API Base URL?** Where should the app hit? (Should go in app.config.js)
3. **Authentication?** How should user login work? (JWT? OAuth?)
4. **Real GPS?** Should GPS use actual device location or stay simulated?
5. **Maps Tiles?** What map provider? (MapTiler? OpenStreetMap? Google Maps?)
6. **Push Notifications?** For emergency alerts?
7. **Offline Maps?** Which format? (MBTiles? Custom?)
8. **Web Version?** Build a web-compatible version?
9. **Testing Framework?** Jest? React Native Testing Library?
10. **CI/CD?** GitHub Actions? EAS Build?

---

## SUMMARY

This is a **React Native trek tracking app (AROH) in early development stage**. The project structure is clean, navigation is set up, state management is ready, and components are scaffolded. However, all screen implementations are empty and need to be filled in. No backend integration has been done yet. The app is designed with security-first principles for user privacy and high-altitude safety tracking.

**Ready for:** Next phase of implementation (screen UI building, API integration, native feature implementation)

---

**Document Version:** 1.0  
**Last Updated:** June 2, 2026  
**Created By:** GitHub Copilot AI Assistant

