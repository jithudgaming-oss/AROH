import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';

export const OnboardingAge: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    if (!confirmed) return;
    navigation.navigate('OnboardingTerms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Text style={styles.stepLabel}>Step 1 of 3</Text>
          <Text style={[TYPOGRAPHY.h1, styles.title]}>Age verification</Text>
          <Text style={[TYPOGRAPHY.bodyLarge, styles.subtitle]}>
            AROH is intended for adult trekkers only. Please confirm your age before continuing.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.shieldRow}>
            <Text style={styles.shieldIcon}>🛡</Text>
            <Text style={styles.cardTitle}>Verification required</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            Trekking involves serious physical risks. This app is designed for adults aged 18 and above.
          </Text>

          <Pressable
            onPress={() => setConfirmed(!confirmed)}
            style={styles.checkboxRow}
          >
            <View style={[styles.checkbox, confirmed && styles.checkboxChecked]}>
              {confirmed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              I confirm I am 18 years of age or older
            </Text>
          </Pressable>

          <View style={styles.secureRow}>
            <Text style={styles.secureText}>🔒  Secure verification</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            onPress={handleNext}
            style={[
              styles.continueBtn,
              { backgroundColor: confirmed ? COLORS.primary : COLORS.border },
            ]}
          >
            <Text style={[styles.continueBtnText, { color: confirmed ? '#fff' : COLORS.textSecondary }]}>
              Continue
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
  header: { marginTop: 20, marginBottom: 32 },
  stepLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  title: { color: COLORS.textPrimary, marginBottom: 12 },
  subtitle: { color: COLORS.textSecondary, lineHeight: 22 },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 32,
  },
  shieldRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  shieldIcon: { fontSize: 24 },
  cardTitle: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary },
  cardSubtitle: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 24 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 16,
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
  checkboxLabel: { fontSize: 14, color: COLORS.textPrimary, flex: 1, lineHeight: 20 },
  secureRow: {
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    alignItems: 'center',
  },
  secureText: { fontSize: 12, color: COLORS.textSecondary },
  footer: { marginBottom: 16 },
  continueBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueBtnText: { fontSize: 15, fontWeight: '500' },
});

export default OnboardingAge;