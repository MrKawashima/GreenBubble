import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Plus, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [bubbleName, setBubbleName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, updateUserData } = useAuth();

  const handleCreateBubble = async () => {
    if (!bubbleName.trim()) {
      Alert.alert('Error', 'Please enter a bubble name');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }

    setLoading(true);
    try {
      const bubbleId = await SupabaseService.createBubble({
        name: bubbleName,
        description: `${bubbleName} - Making a green impact together`,
        isPrivate,
        inviteCode: isPrivate ? Math.random().toString(36).substring(2, 8).toUpperCase() : undefined,
        members: [user.id],
        totalPoints: 0,
        totalCO2Saved: 0,
        createdBy: user.id
      });

      await updateUserData({ bubbleId });
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
      // In a real app, you'd search for the bubble by invite code
      // For now, we'll create a demo bubble join
      Alert.alert('Feature Coming Soon', 'Joining bubbles by invite code will be available soon!');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to join bubble. Please check the invite code.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.bubble}>
              <Users color="#ffffff" size={40} />
            </View>
          </View>
          
          <Text style={styles.title}>Join Your First Bubble</Text>
          <Text style={styles.subtitle}>
            Bubbles are small groups where you'll complete environmental challenges together
          </Text>
          
          <View style={styles.buttonContainer}>
            <Pressable 
              style={styles.primaryButton}
              onPress={() => setStep(2)}
            >
              <Plus color="#047857" size={24} />
              <Text style={styles.primaryButtonText}>Create a New Bubble</Text>
            </Pressable>
            
            <Pressable 
              style={styles.secondaryButton}
              onPress={() => setStep(3)}
            >
              <Users color="#ffffff" size={24} />
              <Text style={styles.secondaryButtonText}>Join with Invite Code</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (step === 2) {
    return (
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.container}
      >
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
            
            <View style={styles.privacyContainer}>
              <Pressable 
                style={[styles.privacyOption, !isPrivate && styles.privacySelected]}
                onPress={() => setIsPrivate(false)}
              >
                <Text style={[styles.privacyText, !isPrivate && styles.privacyTextSelected]}>
                  Public
                </Text>
                <Text style={styles.privacyDescription}>
                  Anyone can join
                </Text>
              </Pressable>
              
              <Pressable 
                style={[styles.privacyOption, isPrivate && styles.privacySelected]}
                onPress={() => setIsPrivate(true)}
              >
                <Text style={[styles.privacyText, isPrivate && styles.privacyTextSelected]}>
                  Private
                </Text>
                <Text style={styles.privacyDescription}>
                  Invite only
                </Text>
              </Pressable>
            </View>
            
            <Pressable 
              style={[styles.createButton, loading && styles.disabledButton]}
              onPress={handleCreateBubble}
              disabled={loading}
            >
              <Text style={styles.createButtonText}>
                {loading ? 'Creating...' : 'Create Bubble'}
              </Text>
              <ArrowRight color="#ffffff" size={20} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient 
      colors={['#10B981', '#059669']} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Join a Bubble</Text>
        <Text style={styles.subtitle}>
          Enter the invite code from your friends
        </Text>
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Invite code"
            placeholderTextColor="#6B7280"
            value={inviteCode}
            onChangeText={setInviteCode}
            autoCapitalize="characters"
          />
          
          <Pressable 
            style={[styles.createButton, loading && styles.disabledButton]}
            onPress={handleJoinBubble}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Joining...' : 'Join Bubble'}
            </Text>
            <ArrowRight color="#ffffff" size={20} />
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
  privacyContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  privacyOption: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  privacySelected: {
    backgroundColor: '#ffffff',
  },
  privacyText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  privacyTextSelected: {
    color: '#047857',
  },
  privacyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
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