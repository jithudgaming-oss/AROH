# AROH App - Screens Summary

This document provides a concise summary of the 13 React Native screens in the `src/screens` directory. This can be used as context for any AI assistant working on the codebase.

1. **GPSTrackingScreen.tsx**
   The active live-tracking interface. It handles simulated GPS coordinate polling, a live timer, live metrics (elevation, distance), records path points, and includes a critical emergency SOS beacon button with location payload.

2. **HealthCheckScreen.tsx**
   A mandatory pre-trek safety checklist. It requires the user to acknowledge readiness (oxygen levels, hydration, AMS kit, acclimatization rules) before they are allowed to initiate a GPS tracking session.

3. **HomeScreen.tsx**
   The main app dashboard. It displays a curated list of treks, highlights any currently active live tracking session at the top, and provides quick access to season-based filtering.

4. **MyTreksScreen.tsx**
   The user's personal trek library. It uses a custom tab switcher to display two distinct lists: "Offline Ready" (treks downloaded for offline use) and "Completed" (historical logged treks).

5. **OfflineDownloadScreen.tsx**
   A dedicated UI for simulating the caching of offline maps, route vectors, and hazard alerts. It displays a loading spinner and a progress bar that completes automatically before returning.

6. **OnboardingAge.tsx**
   The first step of user onboarding. Captures the user's age with validation to tailor route difficulty and safety thresholds for high altitude.

7. **OnboardingEmergency.tsx**
   The second step of onboarding. Captures an emergency contact phone number that will be utilized by the SOS beacon during active tracking.

8. **OnboardingTerms.tsx**
   The final onboarding step. Requires the user to explicitly accept personal liability, altitude risks, and grant permission for background GPS tracking before the app unlocks.

9. **SearchScreen.tsx**
   A dedicated search interface allowing users to find specific trails by text input. It includes horizontal filter chips to narrow down results by difficulty level (Easy, Moderate, Challenging, Expert).

10. **SeasonPickerScreen.tsx**
   A filter screen containing chips for the 5 supported microclimates/seasons (Spring, Summer, Monsoon, Autumn, Winter). Selecting a season filters the main list on the HomeScreen.

11. **SettingsScreen.tsx**
   The user preferences dashboard. Displays the configured age and emergency contact, provides toggle switches for safety notifications, and includes a destructive action to reset the entire onboarding profile.

12. **TrekDetailScreen.tsx**
   A comprehensive information view for a specific selected trek. It displays key stats (distance, duration, max elevation), safety protocols, recommended gear, and provides the actions to either "Download Offline Map" or "Start Trek Session".

13. **TrekStatusScreen.tsx**
   The success/completion screen displayed immediately after finishing a live tracking session. It summarizes the completed trek's title, difficulty, and the total number of GPS coordinates successfully logged.
