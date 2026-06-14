import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { useAppStore } from '../store/useAppStore';

const CHECKBOXES = [
  {
    id: 'risk',
    label: 'I understand trekking involves serious physical risks including injury and death',
  },
  {
    id: 'data',
    label: 'I understand route data in this app may be inaccurate or outdated',
  },
  {
    id: 'verify',
    label: 'I will verify conditions with local authorities before any trek',
  },
  {
    id: 'guide',
    label: 'I understand this app does not replace a certified local guide',
  },
  {
    id: 'responsibility',
    label: 'I accept full responsibility for my safety during any trek',
  },
];

export const OnboardingTerms: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const setOnboardingData = useAppStore((s) => s.setOnboardingData);

  const [checked, setChecked] = useState<Record<string, boolean>>({
    risk: false,
    data: false,
    verify: false,
    guide: false,
    responsibility: false,
  });

  const totalChecked = Object.values(checked).filter(Boolean).length;
  const allChecked = totalChecked === 5;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleFinish = () => {
    if (!allChecked) return;
    setOnboardingData({
      age: 18,
      emergencyContact: '',
      termsAccepted: true,
    });
    navigation.navigate('OnboardingEmergency');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Text style={styles.stepLabel}>Step 2 of 3</Text>
          <Text style={[TYPOGRAPHY.h1, styles.title]}>Safety and terms</Text>
          <Text style={[TYPOGRAPHY.bodyLarge, styles.subtitle]}>
            Review the safety information and confirm each item before proceeding.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>High altitude risks</Text>
          <Text style={styles.infoText}>
            Trekking above 2,500 metres introduces serious risks including Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and High Altitude Cerebral Edema (HACE). Immediate descent is mandatory if severe symptoms occur.
          </Text>
          <Text style={[styles.infoTitle, { marginTop: 14 }]}>Connectivity</Text>
          <Text style={styles.infoText}>
            AROH operates primarily offline. GPS may be intermittent in deep gorges or heavy tree cover. Do not rely solely on digital navigation.
          </Text>
          <Text style={[styles.infoTitle, { marginTop: 14 }]}>User liability</Text>
          <Text style={styles.infoText}>
            By using AROH, you acknowledge that trekking is inherently dangerous. You assume full responsibility for your personal safety and decisions.
          </Text>
        </View>

        <View style={styles.checksContainer}>
          {CHECKBOXES.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggle(item.id)}
              style={styles.checkboxRow}
            >
              <View style={[styles.checkbox, checked[item.id] && styles.checkboxChecked]}>
                {checked[item.id] && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.counter}>{totalChecked} of 5 confirmed</Text>

        <View style={styles.footer}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Back</Text>
          </Pressable>
          <Pressable
            onPress={handleFinish}
            style={[
              styles.proceedBtn,
              { backgroundColor: allChecked ? COLORS.primary : COLORS.border },
            ]}
          >
            <Text style={[styles.proceedBtnText, { color: allChecked ? '#fff' : COLORS.textSecondary }]}>
              Agree and proceed
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, padding: 24 },
  header: { marginTop: 20, marginBottom: 20 },
  stepLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  title: { color: COLORS.textPrimary, marginBottom: 12 },
  subtitle: { color: COLORS.textSecondary, lineHeight: 22 },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  checksContainer: { marginBottom: 12 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: COLORS.background,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '500' },
  checkboxLabel: { fontSize: 13, color: COLORS.textPrimary, flex: 1, lineHeight: 20 },
  counter: {
    textAlign: 'right',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  footer: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  backBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: { fontSize: 15, fontWeight: '500', color: COLORS.textSecondary },
  proceedBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedBtnText: { fontSize: 15, fontWeight: '500' },
});

export default OnboardingTerms;