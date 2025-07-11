import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, Modal, TextInput, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';
import { Challenge, Bubble, ChallengeCompletion } from '@/types';

export default function HomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentBubble, setCurrentBubble] = useState<Bubble | null>(null);
  const [recentCompletions, setRecentCompletions] = useState<ChallengeCompletion[]>([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBubbleName, setNewBubbleName] = useState('');
  const [newBubbleDescription, setNewBubbleDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentInviteCode, setCurrentInviteCode] = useState('');
  const [currentBubbleName, setCurrentBubbleName] = useState('');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const userData = await SupabaseService.getUser(user!.id);
      const activeChallengeData = await SupabaseService.getActiveChallenge();
      
      let bubbleData = null;
      if (userData?.activeBubbleId || userData?.bubble_id) {
        const bubbleId = userData.activeBubbleId || userData.bubble_id;
        bubbleData = await SupabaseService.getBubble(bubbleId);
      }
      
      const completionsData = await SupabaseService.getUserChallengeHistory(user!.id);
      
      const [, ,] = await Promise.all([
        SupabaseService.getActiveChallenge(),
        Promise.resolve(bubbleData),
        Promise.resolve(completionsData)
      ]);

      setChallenges(activeChallengeData ? [activeChallengeData] : []); // Show active challenge
      setCurrentBubble(bubbleData);
      setRecentCompletions(completionsData.slice(0, 5)); // Show last 5 completions
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleJoinBubble = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }

    try {
      const bubble = await SupabaseService.getBubbleByInviteCode(inviteCode.trim());
      
      if (!bubble) {
        Alert.alert('Error', 'Invalid invite code. Please check and try again.');
        return;
      }

      await SupabaseService.joinBubble(bubble.id, user!.id);
      setShowJoinModal(false);
      setInviteCode('');
      await loadData();
      Alert.alert('Success', 'Successfully joined the bubble!');
    } catch (error) {
      console.error('Error joining bubble:', error);
      if (error.message?.includes('already a member')) {
        Alert.alert('Already a Member', 'You are already a member of this bubble.');
      } else {
        Alert.alert('Error', 'Failed to join bubble. Please check the invite code.');
      }
    }
  };

  const handleCreateBubble = async () => {
    if (!newBubbleName.trim()) {
      Alert.alert('Error', 'Please enter a bubble name');
      return;
    }

    try {
      const bubbleId = await SupabaseService.createBubble({
        name: newBubbleName.trim(),
        description: newBubbleDescription.trim(),
        inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        members: [user!.id],
        totalPoints: 0,
        totalCO2Saved: 0,
        createdBy: user!.id
      });
      
      setShowCreateModal(false);
      setNewBubbleName('');
      setNewBubbleDescription('');
      setIsPrivate(false);
      await loadData();
      Alert.alert('Success', 'Bubble created successfully!');
    } catch (error) {
      console.error('Error creating bubble:', error);
      Alert.alert('Error', 'Failed to create bubble');
    }
  };

  const handleShowInviteCode = async () => {
    if (currentBubble?.invite_code) {
      setCurrentInviteCode(currentBubble.invite_code);
      setCurrentBubbleName(currentBubble.name);
      setShowInviteModal(true);
    }
  };

  const handleShareInviteCode = async () => {
    const shareMessage = `Join my GreenBubble "${currentBubbleName}"! Use invite code: ${currentInviteCode}`;
    
    try {
      if (Platform.OS === 'web') {
        // For web, copy to clipboard
        await Clipboard.setStringAsync(shareMessage);
        Alert.alert('Copied!', 'Invite message copied to clipboard');
      } else {
        const { Share } = require('react-native');
        await Share.share({
          message: shareMessage,
          title: `Join ${currentBubbleName} on GreenBubble`,
        });
      }
    } catch (error) {
      console.error('Error sharing invite code:', error);
      Alert.alert('Error', 'Failed to share invite code');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return 'car-outline';
      case 'food': return 'restaurant-outline';
      case 'energy': return 'flash-outline';
      case 'waste': return 'trash-outline';
      default: return 'leaf-outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport': return '#3B82F6';
      case 'food': return '#10B981';
      case 'energy': return '#F59E0B';
      case 'waste': return '#EF4444';
      default: return '#8B5CF6';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Hello, {user?.name || 'Green Hero'}! 🌱</Text>
        <Text style={styles.subtitle}>Ready to make a difference today?</Text>
      </LinearGradient>

      {/* Quick Actions Card */}
      <View style={styles.section}>
        <View style={styles.quickActionsCard}>
          <View style={styles.quickActionsHeader}>
            <Ionicons name="flash" size={24} color="#10B981" />
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          </View>
          <Text style={styles.quickActionsSubtitle}>
            Expand your green network or start a new community
          </Text>
          
          <View style={styles.quickActionButtons}>
            <Pressable 
              style={[styles.quickActionButton, styles.joinQuickButton]}
              onPress={() => setShowJoinModal(true)}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="add-circle" size={20} color="#10B981" />
              </View>
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>Join Bubble</Text>
                <Text style={styles.quickActionDesc}>Enter invite code</Text>
              </View>
            </Pressable>
            
            <Pressable 
              style={[styles.quickActionButton, styles.createQuickButton]}
              onPress={() => setShowCreateModal(true)}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="people" size={20} color="#ffffff" />
              </View>
              <View style={styles.quickActionContent}>
                <Text style={[styles.quickActionTitle, styles.createQuickText]}>Create Bubble</Text>
                <Text style={[styles.quickActionDesc, styles.createQuickText]}>Start new community</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Bubble Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Green Bubble</Text>
        {currentBubble ? (
          <View style={styles.bubbleCard}>
            <View style={styles.bubbleHeader}>
              <View style={styles.bubbleInfo}>
                <Text style={styles.bubbleName}>{currentBubble.name}</Text>
                <Text style={styles.bubbleDescription}>{currentBubble.description}</Text>
                <Text style={styles.bubbleStats}>
                  {currentBubble.members?.length || 0} members • {currentBubble.total_points} points
                </Text>
              </View>
              <Pressable 
                style={styles.inviteButton}
                onPress={handleShowInviteCode}
              >
                <Ionicons name="share-outline" size={20} color="#10B981" />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.noBubbleCard}>
            <Ionicons name="people-outline" size={48} color="#9CA3AF" />
            <Text style={styles.noBubbleText}>You're not in a bubble yet</Text>
            <Text style={styles.noBubbleSubtext}>Join or create a bubble to connect with others!</Text>
            <Text style={styles.noBubbleAction}>Use the Quick Actions above to get started!</Text>
          </View>
        )}
      </View>

      {/* Featured Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Challenges</Text>
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(challenge.category) + '20' }]}>
                <Ionicons 
                  name={getCategoryIcon(challenge.category) as any} 
                  size={24} 
                  color={getCategoryColor(challenge.category)} 
                />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription} numberOfLines={2}>
                  {challenge.description}
                </Text>
              </View>
              <View style={styles.challengeReward}>
                <Text style={styles.pointsText}>{challenge.points}pts</Text>
                <Text style={styles.co2Text}>{challenge.co2_impact}kg CO₂</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      {recentCompletions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentCompletions.map((completion) => (
            <View key={completion.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Challenge Completed!</Text>
                <Text style={styles.activityDescription}>
                  +{completion.points} points • {completion.co2_saved}kg CO₂ saved
                </Text>
                <Text style={styles.activityDate}>
                  {new Date(completion.completed_at!).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Join Bubble Modal */}
      <Modal
        visible={showJoinModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowJoinModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join a Bubble</Text>
            <Text style={styles.modalSubtitle}>Enter the invite code to join a bubble</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter invite code"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="characters"
            />
            
            <View style={styles.modalActions}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowJoinModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleJoinBubble}
              >
                <Text style={styles.confirmButtonText}>Join</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Create Bubble Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a Bubble</Text>
            <Text style={styles.modalSubtitle}>Start your own green community</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Bubble name"
              value={newBubbleName}
              onChangeText={setNewBubbleName}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={newBubbleDescription}
              onChangeText={setNewBubbleDescription}
              multiline
              numberOfLines={3}
            />
            
            <Pressable 
              style={styles.checkboxContainer}
              onPress={() => setIsPrivate(!isPrivate)}
            >
              <View style={[styles.checkbox, isPrivate && styles.checkboxChecked]}>
                {isPrivate && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <Text style={styles.checkboxLabel}>Private bubble (invite only)</Text>
            </Pressable>
            
            <View style={styles.modalActions}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCreateBubble}
              >
                <Text style={styles.confirmButtonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Invite Code Modal */}
      <Modal
        visible={showInviteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInviteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite Friends</Text>
            <Text style={styles.modalSubtitle}>Share this code to invite others to "{currentBubbleName}"</Text>
            
            <View style={styles.inviteCodeContainer}>
              <Text style={styles.inviteCodeText}>{currentInviteCode}</Text>
              <Pressable 
                style={styles.copyButton}
                onPress={async () => {
                  try {
                    await Clipboard.setStringAsync(currentInviteCode);
                    Alert.alert('Copied!', 'Invite code copied to clipboard');
                  } catch (error) {
                    Alert.alert('Error', 'Failed to copy invite code');
                  }
                }}
              >
                <Ionicons name="copy-outline" size={20} color="#10B981" />
              </Pressable>
            </View>
            
            <View style={styles.modalActions}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowInviteModal(false)}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleShareInviteCode}
              >
                <Text style={styles.confirmButtonText}>Share</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  bubbleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bubbleInfo: {
    flex: 1,
  },
  bubbleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  bubbleDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  bubbleStats: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  inviteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
  },
  noBubbleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noBubbleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noBubbleSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  noBubbleAction: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  quickActionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  quickActionsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  quickActionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  joinQuickButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  createQuickButton: {
    backgroundColor: '#10B981',
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  quickActionDesc: {
    fontSize: 12,
    color: '#6B7280',
  },
  createQuickText: {
    color: '#ffffff',
  },
  bubbleActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  joinButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  createButton: {
    backgroundColor: '#10B981',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
    marginRight: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  challengeReward: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  co2Text: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: '#10B981',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: '#10B981',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  inviteCodeText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    letterSpacing: 2,
  },
  copyButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
  },
});