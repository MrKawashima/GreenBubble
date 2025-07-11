import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [scrollViewRef, setScrollViewRef] = useState<ScrollView | null>(null);
  const { signUp, loading } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) newErrors.password = 'Password must include upper and lowercase letters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    try {
      setErrors({});
      await signUp(formData.email, formData.password, formData.name);
      router.replace('/(auth)/onboarding');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (error.message?.includes('User already registered')) errorMessage = 'Email already in use';
      else if (error.message?.includes('Password')) errorMessage = 'Password too short';
      else if (error.message?.includes('Invalid email')) errorMessage = 'Invalid email format';
      Alert.alert('Signup Failed', errorMessage);
      setErrors({ general: errorMessage });
      scrollViewRef?.scrollTo({ y: 0, animated: true });
    }
  };

  const passwordStrength = (() => {
    const p = formData.password;
    if (!p) return { strength: 0, label: '', color: '#E5E7EB' };
    let s = 0;
    if (p.length >= 6) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#EF4444', '#F59E0B', '#F59E0B', '#10B981', '#059669'];
    return { strength: (s / 5) * 100, label: labels[s - 1] || '', color: colors[s - 1] || '#E5E7EB' };
  })();

  return (
    <LinearGradient colors={['#10B981', '#059669']} style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" color="#ffffff" size={24} />
        </Pressable>
        <Text style={styles.title}>Join GreenBubble</Text>
        <Text style={styles.subtitle}>Create your account and start making an impact</Text>
      </View>

      <ScrollView ref={setScrollViewRef} style={styles.form} showsVerticalScrollIndicator={false}>
        {errors.general && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.general}</Text>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={[styles.inputContainer, errors.name && styles.inputError]}>
            <Ionicons name="person" color={errors.name ? '#EF4444' : '#10B981'} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={formData.name}
              onChangeText={(t) => setFormData(p => ({ ...p, name: t }))}
            />
          </View>
          {errors.name && <Text style={styles.fieldError}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.inputContainer, errors.email && styles.inputError]}>
            <Ionicons name="mail" color={errors.email ? '#EF4444' : '#10B981'} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(t) => setFormData(p => ({ ...p, email: t }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={[styles.inputContainer, errors.password && styles.inputError]}>
            <Ionicons name="lock-closed" color={errors.password ? '#EF4444' : '#10B981'} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              value={formData.password}
              onChangeText={(t) => setFormData(p => ({ ...p, password: t }))}
              secureTextEntry={!showPassword}
            />
            <Pressable style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} color="#6B7280" size={20} />
            </Pressable>
          </View>
          <View style={styles.passwordStrength}>
            <View style={styles.strengthBar}>
              <View style={[styles.strengthFill, { width: `${passwordStrength.strength}%`, backgroundColor: passwordStrength.color }]} />
            </View>
            {passwordStrength.label && <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>{passwordStrength.label}</Text>}
          </View>
          {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
            <Ionicons name="lock-closed" color={errors.confirmPassword ? '#EF4444' : '#10B981'} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              value={formData.confirmPassword}
              onChangeText={(t) => setFormData(p => ({ ...p, confirmPassword: t }))}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} color="#6B7280" size={20} />
            </Pressable>
          </View>
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <View style={styles.matchIndicator}>
              <Ionicons name="checkmark-circle" color="#10B981" size={16} />
              <Text style={styles.matchText}>Passwords match</Text>
            </View>
          )}
          {errors.confirmPassword && <Text style={styles.fieldError}>{errors.confirmPassword}</Text>}
        </View>

        <Text style={styles.termsText}>
          By creating an account, you agree to our <Text style={styles.termsLink}>Terms</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

        <Pressable style={[styles.signupButton, loading && styles.disabledButton]} onPress={handleSignup} disabled={loading}>
          <Text style={styles.signupButtonText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
        </Pressable>

        <View style={styles.linkContainer}>
          <Text style={styles.linkQuestion}>Already have an account?</Text>
          <Pressable onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.linkText}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 32, fontFamily: 'Poppins-Bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, fontFamily: 'Inter-Regular', color: '#fff', opacity: 0.9 },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  errorText: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#DC2626', textAlign: 'center' },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 16, fontFamily: 'Inter-SemiBold', color: '#374151', marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: { borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  input: { flex: 1, marginLeft: 12, fontSize: 16, fontFamily: 'Inter-Regular', color: '#111827' },
  eyeButton: { padding: 4 },
  fieldError: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#EF4444', marginTop: 4 },
  passwordStrength: { marginTop: 8 },
  strengthBar: { height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  strengthFill: { height: '100%', borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontFamily: 'Inter-SemiBold' },
  matchIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  matchText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginLeft: 4, // fixed: no 'gap'
  },
  termsContainer: { marginBottom: 32 },
  termsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: { color: '#10B981', fontFamily: 'Inter-SemiBold' },
  signupButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: { opacity: 0.6, shadowOpacity: 0.1 },
  signupButtonText: { fontSize: 18, fontFamily: 'Inter-SemiBold', color: '#fff' },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  linkQuestion: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginRight: 4,
  },
  linkText: {
    color: '#10B981',
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
  },
  bottomSpacing: { height: 40 },
});
