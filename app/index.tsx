import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function IndexScreen() {
  const { session, authLoading } = useAuth();

  useEffect(() => {
    console.log('IndexScreen: Auth loading:', authLoading, 'Session:', session ? 'exists' : 'none');
    
    if (!authLoading) {
      if (session) {
        console.log('IndexScreen: Redirecting to tabs');
        router.replace('/(tabs)');
      } else {
        console.log('IndexScreen: Redirecting to welcome');
        router.replace('/(auth)/welcome');
      }
    }
  }, [session, authLoading]);

  return (
    <LinearGradient 
      colors={['#10B981', '#059669']} 
      style={styles.container} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});