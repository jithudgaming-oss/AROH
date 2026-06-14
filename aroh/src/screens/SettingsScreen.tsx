import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';
import { PrimaryButton } from '../components/PrimaryButton';

export const SettingsScreen: React.FC = () => {
  const { age, emergencyContact, resetOnboarding } = useAppStore();
  const [notifications, setNotifications] = React.useState(true);
  const [offlineAlerts, setOfflineAlerts] = React.useState(true);

  const handleResetProfile = () => {
    Alert.alert(
      'Reset Profile',
      'Are you sure you want to clear your age and emergency contact? You will have to redo the onboarding process.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetOnboarding();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[TYPOGRAPHY.h1, styles.title]}>Settings</Text>

        {/* Profile Card */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.caption, styles.sectionHeader]}>Safety Profile</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={[TYPOGRAPHY.bodyMedium, styles.infoLabel]}>Age profile</Text>
              <Text style={[TYPOGRAPHY.bodyMedium, styles.infoValue]}>{age ? `${age} years` : 'Not configured'}</Text>
            </View>
            <View style={[styles.infoRow, styles.borderTop]}>
              <Text style={[TYPOGRAPHY.bodyMedium, styles.infoLabel]}>Emergency contact</Text>
              <Text style={[TYPOGRAPHY.bodyMedium, styles.infoValue]}>{emergencyContact || 'Not configured'}</Text>
            </View>
          </View>
        </View>

        {/* Alert Toggles */}
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.caption, styles.sectionHeader]}>Safety Notifications</Text>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLabelCol}>
                <Text style={[TYPOGRAPHY.bodyMedium, styles.toggleLabel]}>Local weather warnings</Text>
                <Text style={[TYPOGRAPHY.bodySmall, styles.toggleDesc]}>Pings you when sudden pressure drops occur.</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={[styles.toggleRow, styles.borderTop]}>
              <View style={styles.toggleLabelCol}>
                <Text style={[TYPOGRAPHY.bodyMedium, styles.toggleLabel]}>Automatic SMS Beacon</Text>
                <Text style={[TYPOGRAPHY.bodySmall, styles.toggleDesc]}>Sends coordinates offline when connection is lost.</Text>
              </View>
              <Switch
                value={offlineAlerts}
                onValueChange={setOfflineAlerts}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Reset Actions */}
        <View style={styles.section}>
          <PrimaryButton
            title="Reset Onboarding & Profile"
            onPress={handleResetProfile}
            variant="danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  infoLabel: {
    color: COLORS.textSecondary,
  },
  infoValue: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  toggleLabelCol: {
    flex: 1,
    paddingRight: 16,
  },
  toggleLabel: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  toggleDesc: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
});
export default SettingsScreen;
