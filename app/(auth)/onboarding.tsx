import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [bubbleName, setBubbleName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateUserData, refreshUserBubbles } = useAuth();

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateBubble = async () => {
    if (!bubbleName.trim()) {
      Alert.alert('Error', 'Please enter a bubble name');
      return;
    }

    setLoading(true);
    try {
      // Get current user from Supabase auth
      const currentUser = await SupabaseService.getCurrentUser();
      if (!currentUser) {
        Alert.alert('Error', 'Please log in again');
        return;
      }

      // Ensure user profile exists in database
      let userData = await SupabaseService.getUser(currentUser.id);
      if (!userData) {
        // Create user profile if it doesn't exist
        await SupabaseService.createUserProfile(currentUser.id, currentUser.email || '', user?.name || 'User');
        userData = await SupabaseService.getUser(currentUser.id);
      }

      const bubbleId = await SupabaseService.createBubble({
        name: bubbleName,
        description: `${bubbleName} - Making a green impact together`,
        inviteCode: generateInviteCode(),
        members: [currentUser.id],
        totalPoints: 0,
        totalCO2Saved: 0,
        createdBy: currentUser.id
      });

      // Join the bubble
      await SupabaseService.joinBubble(bubbleId, currentUser.id);
      await refreshUserBubbles();
      
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Error creating bubble:', error);
      Alert.alert('Error', 'Failed to create bubble. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinBubble = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }

    setLoading(true);
    try {
      // Get current user from Supabase auth
      const currentUser = await SupabaseService.getCurrentUser();
      if (!currentUser) {
        Alert.alert('Error', 'Please log in again');
        return;
      }

      // Ensure user profile exists in database
      let userData = await SupabaseService.getUser(currentUser.id);
      if (!userData) {
        // Create user profile if it doesn't exist
        await SupabaseService.createUserProfile(currentUser.id, currentUser.email || '', user?.name || 'User');
        userData = await SupabaseService.getUser(currentUser.id);
      }

      const bubble = await SupabaseService.getBubbleByInviteCode(inviteCode.trim());
      
      if (!bubble) {
        Alert.alert('Error', 'Invalid invite code. Please check and try again.');
        return;
      }

      await SupabaseService.joinBubble(bubble.id, currentUser.id);
      await refreshUserBubbles();
      
      Alert.alert('Success!', `You've joined ${bubble.name}!`);
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Error joining bubble:', error);
      if (error.message.includes('already a member')) {
        Alert.alert('Already a Member', 'You are already a member of this bubble.');
      } else {
        Alert.alert('Error', 'Failed to join bubble. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <LinearGradient colors={['#10B981', '#059669']} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.bubble}>
              <Ionicons name="people" color="#ffffff" size={40} />
            </View>
          </View>
          
          <Text style={styles.title}>Join Your First Bubble</Text>
          <Text style={styles.subtitle}>
            Bubbles are private groups where you'll complete environmental challenges together
          </Text>
          
          <View style={styles.buttonContainer}>
            <Pressable style={styles.primaryButton} onPress={() => setStep(2)}>
              <Ionicons name="add" color="#047857" size={24} />
              <Text style={styles.primaryButtonText}>Create a New Bubble</Text>
            </Pressable>
            
            <Pressable style={styles.secondaryButton} onPress={() => setStep(3)}>
              <Ionicons name="key" color="#ffffff" size={24} />
              <Text style={styles.secondaryButtonText}>Join with Invite Code</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (step === 2) {
    return (
      <LinearGradient colors={['#10B981', '#059669']} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Create Your Bubble</Text>
          <Text style={styles.subtitle}>
            Give your environmental group a name
          </Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Bubble name (e.g., Green Warriors)"
              placeholderTextColor="#6B7280"
              value={bubbleName}
              onChangeText={setBubbleName}
            />
            
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>🔒 Private Bubble</Text>
              <Text style={styles.infoText}>
                Your bubble will be private and require an invite code to join. You'll get a unique code to share with friends.
              </Text>
            </View>
            
            <Pressable 
              style={[styles.createButton, loading && styles.disabledButton]}
              onPress={handleCreateBubble}
              disabled={loading}
            >
              <Text style={styles.createButtonText}>
                {loading ? 'Creating...' : 'Create Bubble'}
              </Text>
              <Ionicons name="arrow-forward" color="#ffffff" size={20} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#10B981', '#059669']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Join a Bubble</Text>
        <Text style={styles.subtitle}>
          Enter the invite code from your friends
        </Text>
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter invite code"
            placeholderTextColor="#6B7280"
            value={inviteCode}
            onChangeText={setInviteCode}
            autoCapitalize="characters"
            maxLength={6}
          />
          
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Need an invite code?</Text>
            <Text style={styles.infoText}>
              Ask a friend who's already in a bubble to share their invite code with you.
            </Text>
          </View>
          
          <Pressable 
            style={[styles.createButton, loading && styles.disabledButton]}
            onPress={handleJoinBubble}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Joining...' : 'Join Bubble'}
            </Text>
            <Ionicons name="arrow-forward" color="#ffffff" size={20} />
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
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
    opacity: 0.9,
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#047857',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: 20,
  },
  createButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  createButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});