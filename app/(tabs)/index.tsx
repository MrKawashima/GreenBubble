import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, Modal, TextInput, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import * as Clipboard from 'expo-clipboard';
import { SupabaseService } from '@/services/supabaseService';
import { Challenge, Bubble, ChallengeCompletion, User } from '@/types';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [activeBubble, setActiveBubble] = useState<Bubble | null>(null);
  const [bubbleMembers, setBubbleMembers] = useState<User[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showBubbleSelector, setShowBubbleSelector] = useState(false);
  const [bubbleNames, setBubbleNames] = useState<Record<string, string>>({});
  const [showBubbleSettings, setShowBubbleSettings] = useState(false);
  const [selectedBubbleForSettings, setSelectedBubbleForSettings] = useState<string | null>(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newBubbleName, setNewBubbleName] = useState('');
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [showInviteCodeModal, setShowInviteCodeModal] = useState(false);
  const [currentInviteCode, setCurrentInviteCode] = useState('');
  const [currentBubbleName, setCurrentBubbleName] = useState('');
  const { user, userBubbles, switchActiveBubble, refreshUserBubbles } = useAuth();

  const loadData = async () => {
    if (!user?.activeBubbleId || userBubbles.length === 0) return;

    try {
      const bubbleData = await SupabaseService.getBubble(user.activeBubbleId);
      setActiveBubble(bubbleData);

      if (bubbleData) {
        // Load bubble members
        const members = await SupabaseService.getBubbleMembers(bubbleData.id);
        setBubbleMembers(members);

        // Create some mock recent activity for demo
        const mockActivity = [
          {
            id: '1',
            type: 'challenge_completed',
            userName: members[0]?.name || 'Someone',
            action: 'completed a transport challenge',
            time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            points: 50
          },
          {
            id: '2',
            type: 'member_joined',
            userName: members[1]?.name || 'Someone',
            action: 'joined the bubble',
            time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          },
          {
            id: '3',
            type: 'challenge_completed',
            userName: user.name,
            action: 'completed a food challenge',
            time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            points: 30
          }
        ];
        setRecentActivity(mockActivity);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadBubbleOverview = async () => {
    try {
      // Load overview data for all user's bubbles
      const bubbleData = await Promise.all(
        userBubbles.map(async (userBubble) => {
          const bubble = await SupabaseService.getBubble(userBubble.bubbleId);
          return { userBubble, bubble };
        })
      );
      
      // Update bubble names
      const names: Record<string, string> = {};
      bubbleData.forEach(({ bubble }) => {
        if (bubble) {
          names[bubble.id] = bubble.name;
        }
      });
      setBubbleNames(names);
    } catch (error) {
      console.error('Error loading bubble overview:', error);
    }
  };

  const loadBubbleNames = async () => {
    try {
      const names: Record<string, string> = {};
      for (const userBubble of userBubbles) {
        const bubble = await SupabaseService.getBubble(userBubble.bubbleId);
        if (bubble) {
          names[userBubble.bubbleId] = bubble.name;
        }
      }
      setBubbleNames(names);
    } catch (error) {
      console.error('Error loading bubble names:', error);
    }
  };

  const loadActiveBubbleData = async () => {
    if (!user?.activeBubbleId) return;

    try {
      const bubbleData = await SupabaseService.getBubble(user.activeBubbleId);
      setActiveBubble(bubbleData);

      if (bubbleData) {
        // Load bubble members
        const members = await SupabaseService.getBubbleMembers(bubbleData.id);
        setBubbleMembers(members);
      }
    } catch (error) {
      console.error('Error loading active bubble data:', error);
    }
  };

  const loadOldData = async () => {
    if (!user?.activeBubbleId) return;

    try {
      const [challenge, bubbleData] = await Promise.all([
        SupabaseService.getActiveChallenge(),
        SupabaseService.getBubble(user.activeBubbleId)
      ]);

      setActiveChallenge(challenge);
      setActiveBubble(bubbleData);

      if (challenge && bubbleData) {
        const challengeCompletions = await SupabaseService.getChallengeCompletions(
          bubbleData.id, 
          challenge.id
        );
        setCompletions(challengeCompletions);
        setUserCompleted(challengeCompletions.some(c => c.userId === user.id));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
    loadBubbleOverview();
  }, [user?.activeBubbleId]);

  useEffect(() => {
    if (userBubbles.length > 0) {
      loadBubbleNames();
    }
  }, [userBubbles]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadData(), loadBubbleOverview(), refreshUserBubbles()]);
    setRefreshing(false);
  };

  const handleViewChallenges = () => {
    router.push('/(tabs)/challenges');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'challenge_completed':
        return 'checkmark-circle';
      case 'member_joined':
        return 'person-add';
      default:
        return 'flash';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'challenge_completed':
        return '#10B981';
      case 'member_joined':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const handleSwitchBubble = async (bubbleId: string) => {
    try {
      await switchActiveBubble(bubbleId);
      setShowBubbleSelector(false);
      await loadData();
      await loadActiveBubbleData();
    } catch (error) {
      console.error('Error switching bubble:', error);
    }
  };

  const handleJoinNewBubble = () => {
    setShowBubbleSelector(false);
    router.push('/(auth)/onboarding');
  };

  const handleBubbleSettings = (bubbleId: string) => {
    setSelectedBubbleForSettings(bubbleId);
    setShowBubbleSelector(false);
    setShowBubbleSettings(true);
  };

  const handleRenameBubble = async () => {
    if (!selectedBubbleForSettings || !newBubbleName.trim()) {
      Alert.alert('Error', 'Please enter a valid bubble name');
      return;
    }

    try {
      await SupabaseService.updateBubble(selectedBubbleForSettings, {
        name: newBubbleName.trim()
      });
      
      // Update local bubble names
      setBubbleNames(prev => ({
        ...prev,
        [selectedBubbleForSettings]: newBubbleName.trim()
      }));
      
      // Refresh data if this is the active bubble
      if (user?.activeBubbleId === selectedBubbleForSettings) {
        await loadData();
      }
      
      setShowRenameModal(false);
      setShowBubbleSettings(false);
      setNewBubbleName('');
      Alert.alert('Success', 'Bubble renamed successfully!');
    } catch (error) {
      console.error('Error renaming bubble:', error);
      Alert.alert('Error', 'Failed to rename bubble. You might not have permission.');
    }
  };

  const handleDeleteBubble = () => {
    if (!selectedBubbleForSettings) return;

    const bubbleName = bubbleNames[selectedBubbleForSettings] || 'this bubble';
    
    Alert.alert(
      'Delete Bubble',
      `Are you sure you want to delete "${bubbleName}"? This action cannot be undone and will remove all data associated with this bubble.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await SupabaseService.deleteBubble(selectedBubbleForSettings);
              await refreshUserBubbles();
              
              // If this was the active bubble, switch to another one
              if (user?.activeBubbleId === selectedBubbleForSettings) {
                const remainingBubbles = userBubbles.filter(ub => ub.bubbleId !== selectedBubbleForSettings);
                if (remainingBubbles.length > 0) {
                  await switchActiveBubble(remainingBubbles[0].bubbleId);
                } else {
                  // No bubbles left, redirect to onboarding
                  router.push('/(auth)/onboarding');
                }
              }
              
              setShowBubbleSettings(false);
              Alert.alert('Success', 'Bubble deleted successfully');
            } catch (error) {
              console.error('Error deleting bubble:', error);
              Alert.alert('Error', 'Failed to delete bubble. You might not have permission.');
            }
          }
        }
      ]
    );
  };

  const handleViewMembers = async () => {
    if (!selectedBubbleForSettings) return;

    setLoadingMembers(true);
    try {
      const members = await SupabaseService.getBubbleMembers(selectedBubbleForSettings);
      setBubbleMembers(members);
      setShowMembersModal(true);
    } catch (error) {
      console.error('Error loading members:', error);
      Alert.alert('Error', 'Failed to load bubble members');
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleLeaveBubble = () => {
    if (!selectedBubbleForSettings) return;

    const bubbleName = bubbleNames[selectedBubbleForSettings] || 'this bubble';
    
    Alert.alert(
      'Leave Bubble',
      `Are you sure you want to leave "${bubbleName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: async () => {
            try {
              await SupabaseService.leaveBubble(selectedBubbleForSettings, user!.id);
              await refreshUserBubbles();
              
              // If this was the active bubble, switch to another one
              if (user?.activeBubbleId === selectedBubbleForSettings) {
                const remainingBubbles = userBubbles.filter(ub => ub.bubbleId !== selectedBubbleForSettings);
                if (remainingBubbles.length > 0) {
                  await switchActiveBubble(remainingBubbles[0].bubbleId);
                } else {
                  // No bubbles left, redirect to onboarding
                  router.push('/(auth)/onboarding');
                }
              }
              
              setShowBubbleSettings(false);
              Alert.alert('Success', 'Left bubble successfully');
            } catch (error) {
              console.error('Error leaving bubble:', error);
              Alert.alert('Error', 'Failed to leave bubble');
            }
          }
        }
      ]
    );
  };

  const handleViewInviteCode = async () => {
    if (!selectedBubbleForSettings) return;

    try {
      const bubble = await SupabaseService.getBubble(selectedBubbleForSettings);
      if (bubble?.inviteCode) {
        setCurrentInviteCode(bubble.inviteCode);
        setCurrentBubbleName(bubble.name);
        setShowBubbleSettings(false);
        setShowInviteCodeModal(true);
      } else {
        Alert.alert('Error', 'Could not retrieve invite code for this bubble');
      }
    } catch (error) {
      console.error('Error getting invite code:', error);
      Alert.alert('Error', 'Failed to retrieve invite code');
    }
  };

  const handleShareInviteCode = async () => {
    const shareMessage = `Join my GreenBubble "${currentBubbleName}"! Use invite code: ${currentInviteCode}`;
    
    try {
      if (Platform.OS === 'web') {
        // For web, copy to clipboard
        await navigator.clipboard.writeText(shareMessage);
        Alert.alert('Copied!', 'Invite message copied to clipboard');
      } else {
        // For mobile, use native sharing
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

  if (userBubbles.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.emptyGradient}
        >
          <Text style={styles.emptyTitle}>Welcome to GreenBubble!</Text>
          <Text style={styles.emptySubtitle}>
            You need to join a Bubble to start your environmental journey
          </Text>
          <Pressable 
            style={styles.emptyButton}
            onPress={() => router.push('/(auth)/onboarding')}
          >
            <Text style={styles.emptyButtonText}>Join a Bubble</Text>
          </Pressable>
        </LinearGradient>
      </View>
    );
  }

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
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back, {user?.name}!</Text>
          
          {/* Bubble Selector */}
          <Pressable 
            style={styles.bubbleSelector}
            onPress={() => setShowBubbleSelector(true)}
          >
            <View style={styles.bubbleInfo}>
              <Ionicons name="people" color="#ffffff" size={20} />
              <Text style={styles.bubbleName}>
                {activeBubble?.name || 'Select Bubble'}
              </Text>
            </View>
            <Ionicons name="chevron-down" color="#ffffff" size={20} />
          </Pressable>
          
          {userBubbles.length > 1 && (
            <Text style={styles.bubbleCount}>
              {userBubbles.length} bubbles joined
            </Text>
          )}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <Pressable style={styles.quickActionButton} onPress={handleViewChallenges}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="trophy" color="#F59E0B" size={24} />
              </View>
              <Text style={styles.quickActionText}>View Challenges</Text>
            </Pressable>
            
            <Pressable style={styles.quickActionButton} onPress={() => router.push('/(tabs)/progress')}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="trending-up" color="#3B82F6" size={24} />
              </View>
              <Text style={styles.quickActionText}>Your Progress</Text>
            </Pressable>
            
            <Pressable style={styles.quickActionButton} onPress={() => router.push('/(tabs)/history')}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="time" color="#8B5CF6" size={24} />
              </View>
              <Text style={styles.quickActionText}>History</Text>
            </Pressable>
            
            <Pressable style={styles.quickActionButton} onPress={handleJoinNewBubble}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="add" color="#10B981" size={24} />
              </View>
              <Text style={styles.quickActionText}>Join Bubble</Text>
            </Pressable>
          </View>
        </View>

        {/* Active Bubble Overview */}
        {activeBubble && (
          <View style={styles.activeBubbleCard}>
            <View style={styles.bubbleCardHeader}>
              <View style={styles.bubbleIconLarge}>
                <Ionicons name="people" color="#10B981" size={28} />
              </View>
              <View style={styles.bubbleHeaderInfo}>
                <Text style={styles.bubbleCardTitle}>{activeBubble.name}</Text>
                <Text style={styles.bubbleCardSubtitle}>
                  {activeBubble.members.length} members • Active bubble
                </Text>
              </View>
            </View>
            
            <View style={styles.bubbleStatsRow}>
              <View style={styles.bubbleStatItem}>
                <View style={styles.bubbleStatIcon}>
                  <Ionicons name="trophy" color="#F59E0B" size={20} />
                </View>
                <Text style={styles.bubbleStatNumber}>{activeBubble.totalPoints}</Text>
                <Text style={styles.bubbleStatLabel}>Total Points</Text>
              </View>
              
              <View style={styles.bubbleStatItem}>
                <View style={styles.bubbleStatIcon}>
                  <Ionicons name="leaf" color="#10B981" size={20} />
                </View>
                <Text style={styles.bubbleStatNumber}>{activeBubble.totalCO2Saved}kg</Text>
                <Text style={styles.bubbleStatLabel}>CO₂ Saved</Text>
              </View>
              
              <View style={styles.bubbleStatItem}>
                <View style={styles.bubbleStatIcon}>
                  <Ionicons name="people" color="#3B82F6" size={20} />
                </View>
                <Text style={styles.bubbleStatNumber}>{bubbleMembers.length}</Text>
                <Text style={styles.bubbleStatLabel}>Members</Text>
              </View>
            </View>
            
            {/* Recent Members */}
            {bubbleMembers.length > 0 && (
              <View style={styles.membersPreview}>
                <Text style={styles.membersPreviewTitle}>Recent Members</Text>
                <View style={styles.membersAvatars}>
                  {bubbleMembers.slice(0, 4).map((member, index) => (
                    <View key={member.id} style={[styles.memberAvatar, { marginLeft: index > 0 ? -8 : 0 }]}>
                      <Text style={styles.memberInitial}>
                        {member.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  ))}
                  {bubbleMembers.length > 4 && (
                    <View style={[styles.memberAvatar, styles.moreMembers, { marginLeft: -8 }]}>
                      <Text style={styles.moreMembersText}>+{bubbleMembers.length - 4}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        )}

        {/* All Bubbles Overview */}
        {userBubbles.length > 1 && (
          <View style={styles.allBubblesCard}>
            <View style={styles.cardHeaderWithAction}>
              <Text style={styles.cardTitle}>Your Bubbles</Text>
              <Pressable onPress={() => setShowBubbleSelector(true)}>
                <Text style={styles.viewAllText}>View All</Text>
              </Pressable>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bubblesScroll}>
              {userBubbles.slice(0, 5).map((userBubble) => (
                <Pressable
                  key={userBubble.id}
                  style={[
                    styles.bubblePreviewCard,
                    user?.activeBubbleId === userBubble.bubbleId && styles.activeBubblePreview
                  ]}
                  onPress={() => handleSwitchBubble(userBubble.bubbleId)}
                >
                  <View style={styles.bubblePreviewIcon}>
                    <Ionicons name="people" color="#10B981" size={20} />
                  </View>
                  <Text style={styles.bubblePreviewName}>
                    {bubbleNames[userBubble.bubbleId] || 'Loading...'}
                  </Text>
                  <Text style={styles.bubblePreviewStats}>
                    {userBubble.points} pts • {userBubble.co2Saved}kg CO₂
                  </Text>
                  {user?.activeBubbleId === userBubble.bubbleId && (
                    <View style={styles.activeIndicator}>
                      <Text style={styles.activeIndicatorText}>Active</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <View style={styles.recentActivityCard}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            {recentActivity.slice(0, 3).map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons 
                    name={getActivityIcon(activity.type)} 
                    color={getActivityColor(activity.type)} 
                    size={16} 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.activityUserName}>{activity.userName}</Text> {activity.action}
                  </Text>
                  {activity.points && (
                    <Text style={styles.activityPoints}>+{activity.points} points</Text>
                  )}
                </View>
                <Text style={styles.activityTime}>
                  {formatTimeAgo(activity.time)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Bubble Selector Modal */}
      <Modal
        visible={showBubbleSelector}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Bubble</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowBubbleSelector(false)}
            >
              <Ionicons name="checkmark-circle" color="#10B981" size={20} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            {userBubbles.map((userBubble) => (
              <Pressable
                key={userBubble.bubbleId}
                style={[
                  styles.bubbleOption,
                  user?.activeBubbleId === userBubble.bubbleId && styles.activeBubbleOption
                ]}
                onPress={() => handleSwitchBubble(userBubble.bubbleId)}
              >
                <View style={styles.bubbleOptionContent}>
                  <View style={styles.bubbleOptionIcon}>
                    <Ionicons name="people" color="#10B981" size={24} />
                  </View>
                  <View style={styles.bubbleOptionInfo}>
                    <Text style={styles.bubbleOptionName}>
                      {bubbleNames[userBubble.bubbleId] || 'Loading...'}
                    </Text>
                    <Text style={styles.bubbleOptionStats}>
                      {userBubble.points} points • {userBubble.co2Saved}kg CO₂
                    </Text>
                  </View>
                </View>
                {user?.activeBubbleId === userBubble.bubbleId && (
                  <Ionicons name="checkmark-circle" color="#10B981" size={20} />
                )}
                <Pressable
                  style={styles.settingsButton}
                  onPress={() => handleBubbleSettings(userBubble.bubbleId)}
                >
                  <Ionicons name="settings" color="#6B7280" size={16} />
                </Pressable>
              </Pressable>
            ))}

            <Pressable style={styles.joinNewBubble} onPress={handleJoinNewBubble}>
              <Ionicons name="add" color="#10B981" size={24} />
              <Text style={styles.joinNewBubbleText}>Join Another Bubble</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>

      {/* Bubble Settings Modal */}
      <Modal
        visible={showBubbleSettings}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedBubbleForSettings ? bubbleNames[selectedBubbleForSettings] || 'Bubble Settings' : 'Bubble Settings'}
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowBubbleSettings(false)}
            >
              <Ionicons name="close" color="#6B7280" size={20} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Rename Bubble */}
            <Pressable
              style={styles.settingsOption}
              onPress={() => {
                setNewBubbleName(selectedBubbleForSettings ? bubbleNames[selectedBubbleForSettings] || '' : '');
                setShowRenameModal(true);
              }}
            >
              <View style={styles.settingsOptionIcon}>
                <Ionicons name="create" color="#3B82F6" size={20} />
              </View>
              <View style={styles.settingsOptionContent}>
                <Text style={styles.settingsOptionTitle}>Rename Bubble</Text>
                <Text style={styles.settingsOptionSubtitle}>Change the bubble name</Text>
              </View>
              <Ionicons name="chevron-forward" color="#6B7280" size={16} />
            </Pressable>

            {/* View Members */}
            <Pressable
              style={styles.settingsOption}
              onPress={handleViewMembers}
              disabled={loadingMembers}
            >
              <View style={styles.settingsOptionIcon}>
                <Ionicons name="people" color="#10B981" size={20} />
              </View>
              <View style={styles.settingsOptionContent}>
                <Text style={styles.settingsOptionTitle}>View Members</Text>
                <Text style={styles.settingsOptionSubtitle}>See who's in this bubble</Text>
              </View>
              {loadingMembers ? (
                <Text style={styles.loadingText}>Loading...</Text>
              ) : (
                <Ionicons name="chevron-forward" color="#6B7280" size={16} />
              )}
            </Pressable>

            {/* Invite Code */}
            <Pressable
              style={styles.settingsOption}
              onPress={() => {
                handleViewInviteCode();
              }}
            >
              <View style={styles.settingsOptionIcon}>
                <Ionicons name="key" color="#F59E0B" size={20} />
              </View>
              <View style={styles.settingsOptionContent}>
                <Text style={styles.settingsOptionTitle}>Invite Code</Text>
                <Text style={styles.settingsOptionSubtitle}>Share with friends</Text>
              </View>
              <Ionicons name="chevron-forward" color="#6B7280" size={16} />
            </Pressable>

            {/* Danger Zone */}
            <View style={styles.dangerZone}>
              <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
              
              <Pressable
                style={styles.dangerOption}
                onPress={handleLeaveBubble}
              >
                <View style={[styles.settingsOptionIcon, styles.dangerIcon]}>
                  <Ionicons name="exit" color="#EF4444" size={20} />
                </View>
                <View style={styles.settingsOptionContent}>
                  <Text style={[styles.settingsOptionTitle, styles.dangerText]}>Leave Bubble</Text>
                  <Text style={styles.settingsOptionSubtitle}>Remove yourself from this bubble</Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.dangerOption}
                onPress={handleDeleteBubble}
              >
                <View style={[styles.settingsOptionIcon, styles.dangerIcon]}>
                  <Ionicons name="trash" color="#EF4444" size={20} />
                </View>
                <View style={styles.settingsOptionContent}>
                  <Text style={[styles.settingsOptionTitle, styles.dangerText]}>Delete Bubble</Text>
                  <Text style={styles.settingsOptionSubtitle}>Permanently delete this bubble</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Rename Modal */}
      <Modal
        visible={showRenameModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.renameModalContainer}>
            <Text style={styles.renameModalTitle}>Rename Bubble</Text>
            
            <TextInput
              style={styles.renameInput}
              placeholder="Enter new bubble name"
              placeholderTextColor="#9CA3AF"
              value={newBubbleName}
              onChangeText={setNewBubbleName}
              autoFocus
            />
            
            <View style={styles.renameModalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setShowRenameModal(false);
                  setNewBubbleName('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable
                style={styles.saveButton}
                onPress={handleRenameBubble}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Members Modal */}
      <Modal
        visible={showMembersModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bubble Members</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowMembersModal(false)}
            >
              <Ionicons name="close" color="#6B7280" size={20} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            {bubbleMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberAvatar}>
                  <Ionicons name="person" color="#10B981" size={20} />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberEmail}>{member.email}</Text>
                  <Text style={styles.memberStats}>
                    {member.points} points • Level {member.level}
                  </Text>
                </View>
                {member.id === user?.id && (
                  <View style={styles.youBadge}>
                    <Text style={styles.youBadgeText}>You</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Invite Code Modal */}
      <Modal
        visible={showInviteCodeModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.inviteCodeModalContainer}>
            <View style={styles.inviteCodeHeader}>
              <View style={styles.inviteCodeIcon}>
                <Ionicons name="key" color="#F59E0B" size={32} />
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={() => setShowInviteCodeModal(false)}
              >
                <Ionicons name="close" color="#6B7280" size={20} />
              </Pressable>
            </View>
            
            <Text style={styles.inviteCodeTitle}>Invite Friends</Text>
            <Text style={styles.inviteCodeSubtitle}>
              Share this code to invite friends to join "{currentBubbleName}"
            </Text>
            
            <View style={styles.inviteCodeContainer}>
              <Text style={styles.inviteCodeText}>{currentInviteCode}</Text>
            </View>
            
            <View style={styles.inviteCodeActions}>
              <Pressable
                style={styles.shareButton}
                onPress={handleShareInviteCode}
              >
                <Ionicons name="share" color="#ffffff" size={20} />
                <Text style={styles.shareButtonText}>Share Code</Text>
              </Pressable>
              
              <Pressable
                style={styles.copyButton}
                onPress={async () => {
                  try {
                    if (Platform.OS === 'web') {
                      await navigator.clipboard.writeText(currentInviteCode);
                    } else {
                      await Clipboard.setStringAsync(currentInviteCode);
                    }
                    Alert.alert('Copied!', 'Invite code copied to clipboard');
                  } catch (error) {
                    Alert.alert('Error', 'Failed to copy invite code');
                  }
                }}
              >
                <Ionicons name="copy" color="#10B981" size={20} />
                <Text style={styles.copyButtonText}>Copy Code</Text>
              </Pressable>
            </View>
            
            <Text style={styles.inviteCodeNote}>
              💡 Friends can use this code when joining a new bubble in the app
            </Text>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerContent: {
    gap: 8,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  bubbleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  bubbleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bubbleName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  bubbleCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  challengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickActionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    textAlign: 'center',
  },
  activeBubbleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bubbleIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  bubbleHeaderInfo: {
    flex: 1,
  },
  bubbleCardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  bubbleCardSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  bubbleStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  bubbleStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  bubbleStatIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bubbleStatNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  bubbleStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  membersPreview: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  membersPreviewTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 12,
  },
  membersAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  memberInitial: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  moreMembers: {
    backgroundColor: '#6B7280',
  },
  moreMembersText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  allBubblesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeaderWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  bubblesScroll: {
    marginHorizontal: -4,
  },
  bubblePreviewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    minWidth: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeBubblePreview: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  bubblePreviewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bubblePreviewName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  bubblePreviewStats: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  activeIndicator: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeIndicatorText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  recentActivityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  challengePoints: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  challengeName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  completeButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  completedButton: {
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completedButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  noChallengeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noChallengeTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  noChallengeText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  bubbleStatsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  impactGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  impactItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  impactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  impactNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  recentActivity: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginBottom: 2,
  },
  activityUserName: {
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  activityPoints: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
  },
  activityTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
  },
  emptyGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    opacity: 0.9,
  },
  emptyButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  emptyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#047857',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  bubbleOption: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activeBubbleOption: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  bubbleOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bubbleOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  bubbleOptionInfo: {
    flex: 1,
  },
  bubbleOptionName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  bubbleOptionStats: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  joinNewBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#D1FAE5',
    borderStyle: 'dashed',
  },
  joinNewBubbleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  settingsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  settingsOption: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingsOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingsOptionContent: {
    flex: 1,
  },
  settingsOptionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingsOptionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  dangerZone: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#FEE2E2',
  },
  dangerZoneTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    marginBottom: 16,
  },
  dangerOption: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  dangerIcon: {
    backgroundColor: '#FEE2E2',
  },
  dangerText: {
    color: '#DC2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  renameModalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  renameModalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  renameInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  renameModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  memberCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  memberEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  memberStats: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  youBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  youBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  inviteCodeModalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    maxWidth: 360,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  inviteCodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  inviteCodeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteCodeTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  inviteCodeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  inviteCodeContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  inviteCodeText: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#10B981',
    letterSpacing: 2,
    textAlign: 'center',
  },
  inviteCodeActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 20,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  copyButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  copyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  inviteCodeNote: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});