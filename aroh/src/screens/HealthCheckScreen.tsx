import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';
import { SafetyCheckbox } from '../components/SafetyCheckbox';
import { PrimaryButton } from '../components/PrimaryButton';

export const HealthCheckScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { currentTrek, setHealthVerified, setTracking, clearTrackedPath } = useAppStore();

  const [checkedO2, setCheckedO2] = useState(false);
  const [checkedWater, setCheckedWater] = useState(false);
  const [checkedKit, setCheckedKit] = useState(false);
  const [checkedAms, setCheckedAms] = useState(false);

  const totalChecked = [checkedO2, checkedWater, checkedKit, checkedAms].filter(Boolean).length;
  const canStart = totalChecked === 4;

  const handleStartTrek = () => {
    if (!canStart) return;
    setHealthVerified(true);
    clearTrackedPath();
    setTracking(true);
    navigation.replace('GPSTracking');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.accentLabel}>Pre-trek checklist</Text>
          <Text style={[TYPOGRAPHY.h1, styles.title]}>Safety Readiness</Text>
          <Text style={[TYPOGRAPHY.bodyLarge, styles.subtitle]}>
            Confirm safety conditions for {currentTrek?.title || 'this trek'} before starting GPS tracking.
          </Text>
        </View>

        {/* Checkboxes */}
        <View style={styles.checksContainer}>
          <SafetyCheckbox
            label="Oxygen Saturation Check"
            description="My resting blood SpO2 level is above 92% (mandatory for high elevation ascents)."
            checked={checkedO2}
            onToggle={() => setCheckedO2(!checkedO2)}
          />
          <SafetyCheckbox
            label="Water and Hydration"
            description="I have at least 3 litres of drinkable water and hydration salts packed."
            checked={checkedWater}
            onToggle={() => setCheckedWater(!checkedWater)}
          />
          <SafetyCheckbox
            label="First Aid and AMS Kit"
            description="I have altitude pills (Diamox or equivalent), emergency thermal blanket, and personal meds."
            checked={checkedKit}
            onToggle={() => setCheckedKit(!checkedKit)}
          />
          <SafetyCheckbox
            label="Acclimatization Plan"
            description="I have reviewed campsite elevations and will not climb more than 600m in a single day."
            checked={checkedAms}
            onToggle={() => setCheckedAms(!checkedAms)}
          />
        </View>

        {/* Counter */}
        <Text style={styles.counter}>{totalChecked} of 4 confirmed</Text>

        {/* Buttons */}
        <View style={styles.footer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleStartTrek}
            style={[
              styles.startBtn,
              { backgroundColor: canStart ? COLORS.primary : COLORS.border },
            ]}
          >
            <Text style={[styles.startText, { color: canStart ? '#fff' : COLORS.textSecondary }]}>
              Start Trek
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 10, marginBottom: 8 },
  accentLabel: {
    color: COLORS.accent,
    fontWeight: '500',
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  title: { color: COLORS.textPrimary, marginBottom: 12 },
  subtitle: { color: COLORS.textSecondary, lineHeight: 22 },
  checksContainer: { marginVertical: 20 },
  counter: {
    textAlign: 'right',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontSize: 15,
  },
  startBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    fontWeight: '500',
    fontSize: 15,
  },
});

export default HealthCheckScreen;