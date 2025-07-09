import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Users, Target, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <LinearGradient 
      colors={['#0F766E', '#10B981', '#34D399']} 
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <View style={styles.mainIcon}>
              <Leaf color="#ffffff" size={48} strokeWidth={2.5} />
            </View>
            <View style={[styles.floatingIcon, styles.floatingIcon1]}>
              <Users color="#ffffff" size={24} strokeWidth={2} />
            </View>
            <View style={[styles.floatingIcon, styles.floatingIcon2]}>
              <Target color="#ffffff" size={20} strokeWidth={2} />
            </View>
            <View style={[styles.floatingIcon, styles.floatingIcon3]}>
              <TrendingUp color="#ffffff" size={22} strokeWidth={2} />
            </View>
          </View>
          
          <Text style={styles.title}>GreenBubble</Text>
          <Text style={styles.subtitle}>
            Join your friends in weekly environmental challenges and create lasting positive impact together
          </Text>
        </View>
        
        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Users color="#10B981" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.featureTitle}>Create Bubbles</Text>
              <Text style={styles.featureText}>Form eco-groups with friends</Text>
            </View>
            
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Target color="#10B981" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.featureTitle}>Weekly Challenges</Text>
              <Text style={styles.featureText}>Fun environmental tasks</Text>
            </View>
          </View>
          
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Leaf color="#10B981" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.featureTitle}>Track Impact</Text>
              <Text style={styles.featureText}>See your CO₂ savings</Text>
            </View>
            
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <TrendingUp color="#10B981" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.featureTitle}>Earn Rewards</Text>
              <Text style={styles.featureText}>Unlock badges & levels</Text>
            </View>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>
          
          <Pressable 
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 32,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  floatingIcon: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingIcon1: {
    width: 40,
    height: 40,
    top: 10,
    right: 0,
  },
  floatingIcon2: {
    width: 36,
    height: 36,
    bottom: 15,
    left: 5,
  },
  floatingIcon3: {
    width: 38,
    height: 38,
    top: 35,
    left: -10,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.95,
    paddingHorizontal: 8,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 16,
  },
  feature: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 32,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#0F766E',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
});