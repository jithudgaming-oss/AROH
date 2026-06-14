# AROH - QUICK REFERENCE CARD

**Print this out or bookmark it!**

---

## 📱 APP AT A GLANCE

| Aspect | Details |
|--------|---------|
| **What is it?** | React Native app for safe high-altitude trek tracking in India |
| **Status** | Phase 1 Complete (Frontend MVP) ✅ |
| **Screens** | 13 total (3 onboarding + 4 main tabs + 6 trek flow) |
| **Components** | 5 reusable (Button, Checkbox, Chip, Badge, Card) |
| **Treks** | 20+ mock data included (Roopkund, Valley of Flowers, etc.) |
| **Lines of Code** | 3,600+ TypeScript |
| **Build Time** | 6 months (solo developer) |

---

## 📂 FOLDER STRUCTURE

```
aroh/
├── src/screens/          ← 13 screen files
├── src/components/       ← 5 component files
├── src/constants/        ← colors, typography, mockData
├── src/navigation/       ← AppNavigator (routes)
├── src/store/           ← useAppStore (Zustand)
├── package.json         ← Dependencies (14 packages)
├── app.json             ← Expo config
└── tsconfig.json        ← TypeScript config
```

---

## 🚀 GET STARTED IN 5 MINUTES

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Choose platform
# Press 'a' for Android
# Press 'i' for iOS (Mac only)
# Press 'w' for web preview
```

**App opens in emulator automatically!**

---

## 🎯 13 SCREENS QUICK MAP

```
Onboarding (shown once at install):
  1. OnboardingAge.tsx         → "You must be 18+"
  2. OnboardingTerms.tsx       → "5 safety checkboxes"
  3. OnboardingEmergency.tsx   → "Emergency contact number"

Main App (after onboarding):
  4. HomeScreen.tsx            → Trek list + active session
  5. SearchScreen.tsx          → Text search + difficulty filter
  6. MyTreksScreen.tsx         → Downloaded & completed treks
  7. SettingsScreen.tsx        → Profile, toggle, reset

Trek Execution (when user starts a trek):
  8. SeasonPickerScreen.tsx    → Choose season filter
  9. TrekDetailScreen.tsx      → All trek information
  10. HealthCheckScreen.tsx    → 4 health verification checks
  11. OfflineDownloadScreen.tsx → Download maps (simulated)
  12. GPSTrackingScreen.tsx    → Live tracking with metrics
  13. TrekStatusScreen.tsx     → Completion summary
```

---

## 🧩 5 COMPONENTS

| Component | Purpose | Variants |
|-----------|---------|----------|
| **PrimaryButton** | Main call-to-action | primary, secondary, danger, outline |
| **SafetyCheckbox** | Custom checkbox | checked/unchecked + description |
| **SeasonChip** | Season filter | 5 seasons (Spring/Summer/Monsoon/Autumn/Winter) |
| **StatusBadge** | Status indicator | success, warning, error, info, neutral |
| **TrekCard** | Trek preview | with/without offline ready badge |

---

## 💾 STATE MANAGEMENT (Zustand)

```typescript
// Read from state
const age = useAppStore((s) => s.age);

// Write to state
const { setOnboardingData } = useAppStore();
setOnboardingData({ age: 25, emergencyContact: '9876543210', termsAccepted: true });

// All state is automatically saved to device storage!
```

### What's Persisted (Saved to Device)
- ✅ Onboarding status (age, emergency, terms)
- ✅ Downloaded trek IDs
- ✅ Completed trek IDs
- ✅ GPS tracked path (coordinates)
- ✅ Season filter selection
- ✅ Health verification status
- ✅ Dark mode preference

---

## 🗺️ NAVIGATION STRUCTURE

```
Root Navigator
├── OnboardingStack (if NOT onboarded)
│   ├── OnboardingAge
│   ├── OnboardingTerms
│   └── OnboardingEmergency
└── MainApp (if onboarded)
    └── Tab Navigator
        ├── Home Stack
        │   ├── HomeScreen
        │   ├── TrekDetail
        │   ├── SeasonPicker
        │   ├── HealthCheck
        │   ├── OfflineDownload
        │   ├── GPSTracking
        │   └── TrekStatus
        ├── Search (SearchScreen)
        ├── MyTreks (MyTreksScreen)
        └── Settings (SettingsScreen)
```

---

## 📊 MOCK DATA INCLUDED

Each trek has:
- Title, difficulty (Easy/Moderate/Challenging/Expert)
- Distance (km), duration (days), elevation (m)
- State, district, description
- Status (Open/Closed/Weather Lock)
- Permit info (required? fee?)
- Cost breakdown (transport, stay, guide, food)
- Day-wise route (days, from→to, elevation, distance)
- 5 seasons (name, months, what to see, crowd, danger)
- Safety tips (3-5 per trek)
- Recommended gear (3-5 items)
- Health requirements

**20+ treks included:** Roopkund, Valley of Flowers, Hampta Pass, Kedarkantha, Stok Kangri, etc.

---

## 🔧 TECH STACK

| Layer | Tech | Version |
|-------|------|---------|
| Framework | React Native | 0.85.3 |
| Language | TypeScript | 6.0.3 |
| State | Zustand | 5.0.13 |
| Storage | AsyncStorage | 2.2.0 |
| Navigation | React Navigation | 7.2.5 |
| Runtime | Expo | 56.0.5 |
| Maps | MapLibre | 11.2.1 |
| Location | Expo Location | 56.0.14 |

**All FREE and open source!**

---

## 📈 PROJECT ROADMAP

```
Phase 1: Frontend MVP (DONE ✅) - 6 months
  └─ 13 screens, components, state management

Phase 2: Backend + APIs (6-9 months next)
  └─ Spring Boot backend, PostgreSQL, real data

Phase 3: Advanced Safety (6-8 months)
  └─ AMS detection, SOS, wearables, group sharing

Phase 4: Community + Monetization (Ongoing)
  └─ Guide marketplace, user uploads, flora ID, etc.

Total: 18-25 months to full product
```

---

## ✅ WHAT'S DONE

- ✅ All 13 screens fully implemented
- ✅ Navigation between all screens
- ✅ State management with persistence
- ✅ 20+ treks in mock database
- ✅ Season filtering system
- ✅ Health verification flow
- ✅ Legal compliance screens (age, terms, emergency)
- ✅ Beautiful UI with colors + typography
- ✅ Offline-capable architecture
- ✅ GPS simulation (demo only)

---

## ❌ NOT YET DONE

- ❌ Backend API
- ❌ Real GPS tracking (currently simulated)
- ❌ Real weather data
- ❌ User authentication
- ❌ Community features
- ❌ Advanced safety (AMS, SOS, etc.)
- ❌ Guide marketplace
- ❌ Payment system
- ❌ Tests (unit/E2E)

---

## 🎨 COLORS (Theme)

```
Primary Green:    #1E6B3C (trek/action)
Accent Orange:    #E07B2A (warnings/alerts)
Danger Red:       #C62828 (critical)
Success Teal:     #4CAF8A (confirmations)
Text Primary:     #1A1A1A (dark text)
Text Secondary:   #6B7280 (gray text)
Border:           #E0E4E0 (light border)
Background:       #FFFFFF (white)
```

---

## 📱 HOW TO RUN

### Option 1: Android Emulator
```bash
npm start
# Press 'a'
# Wait for emulator to boot
# App launches automatically
```

### Option 2: iOS Simulator (Mac only)
```bash
npm start
# Press 'i'
# App launches in Xcode
```

### Option 3: Real Device
```bash
npm start
# Scan QR code with Expo Go app
# App opens on your phone
```

---

## 📦 DEPENDENCIES (14 Total)

**Production:**
- @maplibre/maplibre-react-native
- @react-native-async-storage/async-storage
- @react-navigation/bottom-tabs
- @react-navigation/native
- @react-navigation/native-stack
- expo
- expo-location
- expo-status-bar
- expo-system-ui
- expo-task-manager
- react
- react-native
- react-native-safe-area-context
- react-native-screens
- zustand

**Development:**
- @types/react
- typescript

**Run `npm install` to get all!**

---

## 🔐 SECURITY FEATURES BUILT

✅ Age verification (18+)  
✅ Terms of Service acceptance  
✅ Safety disclaimer with checkboxes  
✅ Emergency contact collection  
✅ Health pre-checks (4 mandatory)  
✅ All agreements logged with timestamps  
✅ Data validation (GPS, phone, inputs)  
✅ No hardcoded secrets  
✅ Offline-first (no data sent without permission)  

---

## 💰 COST BREAKDOWN

| Stage | Monthly | One-time |
|-------|---------|----------|
| Development (free tier) | Rs. 0 | Rs. 0 |
| After Play Store | Rs. 500-1,500 | Rs. 2,000 |
| At 1,000 users | Rs. 3,000-8,000 | — |
| At 10,000 users | Rs. 15,000-50,000 | — |

**Legal costs:**
- Free: Self-written disclaimers (already in app)
- Lawyer review: Rs. 10,000-30,000 (before monetization)

---

## 🎯 NEXT STEPS

### Immediate (This Week)
- [ ] Test app on real Android device
- [ ] Verify all 13 screens work
- [ ] Check legal screens appear
- [ ] Share with 3-5 beta testers

### Short Term (Next Month)
- [ ] Start backend (Spring Boot)
- [ ] Setup PostgreSQL database
- [ ] Create API endpoints
- [ ] Connect weather API

### Medium Term (3 Months)
- [ ] Implement real GPS tracking
- [ ] Migrate mock data to database
- [ ] Setup user authentication
- [ ] Launch Play Store beta

### Long Term (6+ Months)
- [ ] Advanced safety features
- [ ] Community platform
- [ ] Monetization

---

## 🆘 COMMON ISSUES & FIXES

| Problem | Solution |
|---------|----------|
| **App won't start** | Delete node_modules, run `npm install` |
| **Map doesn't render** | MapLibre needs setup (Phase 2) |
| **GPS shows fake coordinates** | It's simulated - real GPS in Phase 2 |
| **AsyncStorage not persisting** | Check device storage permissions |
| **Hot reload not working** | Kill server, run `npm start` again |

---

## 📞 CONTACT & SUPPORT

For issues:
1. Check the AROH_COMPLETE_PROJECT_GUIDE.md (detailed documentation)
2. Search the project for similar screens
3. Check React Navigation docs: reactnavigation.org
4. Check Zustand docs: zustand-demo.vercel.app

---

## 📄 DOCUMENT FILES

| File | Purpose |
|------|---------|
| **AROH_COMPLETE_PROJECT_GUIDE.md** | Full documentation (15,000+ words) |
| **COMPLETE_PROJECT_DOCUMENTATION.md** | All source code included |
| **PROJECT_CONTEXT_FOR_AI.md** | Overview for AI assistants |
| **Trek_India_App_Master_Document.txt** | Original concept & planning |
| **CLAUDE.md** | Security rules |
| **This file** | Quick reference (print it!) |

---

## 🎓 LEARNING PATH

1. **Read This File** (5 min) - Get overview
2. **Read AROH_COMPLETE_PROJECT_GUIDE.md** (30 min) - Understand project
3. **Run the App** (5 min) - See it working
4. **Explore src/screens/HomeScreen.tsx** (10 min) - See a screen
5. **Explore src/components/PrimaryButton.tsx** (5 min) - See a component
6. **Explore src/store/useAppStore.ts** (10 min) - Understand state
7. **Make a small change** - Add a button, change a color
8. **Celebrate!** - You understand the codebase

**Total time: ~75 minutes to full understanding**

---

## 📊 PROJECT STATISTICS

| Metric | Value |
|--------|-------|
| Total TypeScript files | 28 |
| Total lines of code | 3,600+ |
| Screens | 13 |
| Components | 5 |
| State management lines | 250+ |
| Navigation lines | 300+ |
| Constant/data lines | 500+ |
| Build time (solo dev) | 6 months |
| Team size to build | 1 developer |
| Time to read docs | 2-3 hours |

---

## 🏆 QUALITY METRICS

✅ **Code Quality**
- TypeScript (fully typed)
- React hooks (functional components)
- Proper state management
- Reusable components
- Clean architecture

❌ **Not Yet Included**
- Unit tests
- E2E tests
- Automated testing
- CI/CD pipeline

---

## 🚀 READY TO LAUNCH?

### To Play Store:
```bash
# 1. Create Play Store account (Rs. 2,000)
# 2. Build release APK:
npm run android -- --release

# 3. Sign APK

# 4. Upload to Play Store

# 5. Submit for review (24-48 hours)
```

**Wait for Phase 2 real data before real launch!**

---

## 📝 LAST CHECKLIST

Before Phase 2:
- [ ] Tested all 13 screens
- [ ] Got feedback from beta testers
- [ ] Reviewed security rules
- [ ] Understood state management
- [ ] Know how to add new screens
- [ ] Know how to modify components
- [ ] Read the full documentation
- [ ] Decided on backend stack

---

**PRINT THIS CARD & BOOKMARK THIS GUIDE!**

**Questions?** See AROH_COMPLETE_PROJECT_GUIDE.md

**Ready to code?** Open VS Code and explore src/ folder!

---

**Last Updated:** June 2, 2026  
**Version:** 1.0

