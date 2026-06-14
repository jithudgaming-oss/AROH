import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants/legacyColors';
import { TYPOGRAPHY } from '../constants/typography';
import { PrimaryButton } from '../components/PrimaryButton';

export const OnboardingEmergency: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<any>();
  const { age } = route.params || { age: 25 };

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!phone || phone.length < 8) {
      setError('Please enter a valid emergency contact number.');
      return;
    }
    setError('');
    navigation.navigate('OnboardingTerms', { age, emergencyContact: phone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[TYPOGRAPHY.h1, styles.title]}>Emergency Contact</Text>
            <Text style={[TYPOGRAPHY.bodyLarge, styles.subtitle]}>
              This number will be pinged with your offline coordinates via SMS if a rescue beacon is triggered.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (error) setError('');
              }}
              autoFocus
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.footer}>
            <PrimaryButton
              title="Back"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.backButton}
            />
            <PrimaryButton title="Continue" onPress={handleNext} style={styles.nextButton} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  inputContainer: {
    marginVertical: 40,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    padding: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 2,
    marginLeft: 8,
  },
});
export default OnboardingEmergency;
