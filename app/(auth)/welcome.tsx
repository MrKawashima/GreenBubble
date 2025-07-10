import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Users, Target } from 'lucide-react-native';
import { useRouter } from 'expo-router'; // Use `useRouter` for routing

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient 
      colors={['#10B981', '#059669', '#047857']} 
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Icon Section */}
        <View style={styles.iconContainer}>
          <View style={styles.bubble}>
            <Leaf color="#ffffff" size={40} />
          </View>
        </View>
        
        {/* Title and Subtitle */}
        <Text style={styles.title}>GreenBubble</Text>
        <Text style={styles.subtitle}>
          Join your friends in weekly environmental challenges and make a positive impact together
        </Text>
        
        {/* Feature List */}
        <View style={styles.featuresContainer}>
          <Feature icon={<Users color="#ffffff" size={24} />} text="Create or join Bubbles" />
          <Feature icon={<Target color="#ffffff" size={24} />} text="Complete weekly challenges" />
          <Feature icon={<Leaf color="#ffffff" size={24} />} text="Track your CO2 impact" />
        </View>
        
        {/* Buttons */}
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

// A reusable Feature component to avoid redundancy
const Feature = ({ icon, text }) => (
  <View style={styles.feature}>
    {icon}
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold', // Ensure the font is loaded
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular', // Ensure the font is loaded
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
    opacity: 0.9,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 48,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular', // Ensure the font is loaded
    color: '#ffffff',
    marginLeft: 16,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold', // Ensure the font is loaded
    color: '#047857',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular', // Ensure the font is loaded
    color: '#ffffff',
  },
});
