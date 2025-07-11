import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function IndexScreen() {
  const { session, authLoading } = useAuth();

  useEffect(() => {
    // Add a small delay to prevent race conditions
    const timer = setTimeout(() => {
      if (!authLoading) {
        if (session) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/welcome');
        }
      }
    }, 5000); // Slightly longer delay to show splash screen

    return () => clearTimeout(timer);
  }, [session, authLoading]);

  // Show splash screen while determining where to navigate
  return (
    <LinearGradient 
      colors={['#10B981', '#059669', '#047857']} 
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBubble}>
            <Ionicons name="leaf" color="#ffffff" size={48} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>GreenBubble</Text>
          <Text style={styles.appSubtitle}>Making environmental impact social</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoBubble: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  titleContainer: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 42,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});