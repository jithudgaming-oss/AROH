import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { useAppStore } from '../store/useAppStore';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyTreksScreen from '../screens/MyTreksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TrekDetailScreen from '../screens/TrekDetailScreen';
import OnboardingAge from '../screens/OnboardingAge';
import OnboardingTerms from '../screens/OnboardingTerms';
import OnboardingEmergency from '../screens/OnboardingEmergency';
import GPSTrackingScreen from '../screens/GPSTrackingScreen';
import SeasonPickerScreen from '../screens/SeasonPickerScreen';
import HealthCheckScreen from '../screens/HealthCheckScreen';
import OfflineDownloadScreen from '../screens/OfflineDownloadScreen';
import TrekStatusScreen from '../screens/TrekStatusScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};

export type OnboardingStackParamList = {
  OnboardingAge: undefined;
  OnboardingTerms: undefined;
  OnboardingEmergency: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  MyTreks: undefined;
  Emergency: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  TrekDetail: { trekId: string };
  SeasonPicker: { trekId: string };
  HealthCheck: { trekId: string };
  OfflineDownload: { trekId: string };
  TrekStatus: { trekId: string };
  GPSTracking: { trekId: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator id="Onboarding" screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="OnboardingAge" component={OnboardingAge} />
      <OnboardingStack.Screen name="OnboardingTerms" component={OnboardingTerms} />
      <OnboardingStack.Screen name="OnboardingEmergency" component={OnboardingEmergency} />
    </OnboardingStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator id="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="TrekDetail" component={TrekDetailScreen} />
      <HomeStack.Screen name="SeasonPicker" component={SeasonPickerScreen} />
      <HomeStack.Screen name="HealthCheck" component={HealthCheckScreen} />
      <HomeStack.Screen name="OfflineDownload" component={OfflineDownloadScreen} />
      <HomeStack.Screen name="TrekStatus" component={TrekStatusScreen} />
      <HomeStack.Screen name="GPSTracking" component={GPSTrackingScreen} />
    </HomeStack.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const isDarkMode = useAppStore((s) => s.isDarkMode);
  const C = isDarkMode ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'Home', label: 'Home', icon: '⌂' },
    { name: 'Explore', label: 'Explore', icon: '◎' },
    { name: 'MyTreks', label: 'My Treks', icon: '☰' },
    { name: 'Emergency', label: 'Emergency', icon: '✛' },
  ];

  return (
    <View style={[
      styles.tabBar,
      {
        backgroundColor: C.background,
        borderTopColor: C.border,
        paddingBottom: insets.bottom || 12,
        height: 60 + (insets.bottom || 12),
      }
    ]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const tab = tabs[index];
        const isEmergency = route.name === 'Emergency';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabIcon,
                {
                  color: isEmergency
                    ? C.danger
                    : isFocused
                      ? C.primary
                      : C.textSecondary,
                },
              ]}
            >
              {tab.icon}
            </Text>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isEmergency
                    ? C.danger
                    : isFocused
                      ? C.primary
                      : C.textSecondary,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      id="Tab"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Explore" component={SearchScreen} />
      <Tab.Screen name="MyTreks" component={MyTreksScreen} />
      <Tab.Screen name="Emergency" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const onboarded = useAppStore((s) => s.onboarded);

  return (
    <NavigationContainer>
      <RootStack.Navigator id="Root" screenOptions={{ headerShown: false }}>
        {!onboarded ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="MainApp" component={MainTabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});