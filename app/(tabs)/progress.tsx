import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';
import { Bubble, ChallengeCompletion, UserBubble } from '@/types';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface BubbleProgress {
  bubble: Bubble;
  userBubble: UserBubble;
  completions: ChallengeCompletion[];
}

export default function ProgressScreen() {
  const [bubbleProgresses, setBubbleProgresses] = useState<BubbleProgress[]>([]);
  const [selectedBubbleFilter, setSelectedBubbleFilter] = useState<string | null>(null);
  const [showBubbleFilter, setShowBubbleFilter] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const { user, userBubbles } = useAuth();

  useEffect(() => {
    loadProgressData();
  }, [userBubbles, selectedBubbleFilter]);

  const loadProgressData = async () => {
    if (userBubbles.length === 0) return;

    try {
      const progresses: BubbleProgress[] = [];
      
      for (const userBubble of userBubbles) {
        if (selectedBubbleFilter && selectedBubbleFilter !== userBubble.bubbleId) {
          continue;
        }

        const bubble = await SupabaseService.getBubble(userBubble.bubbleId);
        if (bubble) {
          // For demo, create some mock completions
          const mockCompletions: ChallengeCompletion[] = [];
          progresses.push({
            bubble,
            userBubble,
            completions: mockCompletions
          });
        }
      }

      setBubbleProgresses(progresses);

      // Demo badges
      setBadges([
        {
          id: '1',
          name: 'First Step',
          description: 'Complete your first challenge',
          icon: '🌱',
          earned: (user?.points || 0) > 0
        },
        {
          id: '2',
          name: 'Green Warrior',
          description: 'Complete 5 challenges',
          icon: '⚔️',
          earned: false
        },
        {
          id: '3',
          name: 'Eco Champion',
          description: 'Save 10kg CO₂',
          icon: '🏆',
          earned: false
        },
        {
          id: '4',
          name: 'Team Player',
          description: 'Join a Bubble',
          icon: '👥',
          earned: userBubbles.length > 0
        },
        {
          id: '5',
          name: 'Multi-Bubble Master',
          description: 'Join 3 different bubbles',
          icon: '🌐',
          earned: userBubbles.length >= 3
        },
        {
          id: '6',
          name: 'Consistency King',
          description: 'Complete challenges 3 weeks in a row',
          icon: '👑',
          earned: false
        }
      ]);
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  };

  const getUserLevel = (points: number) => {
    if (points < 100) return 1;
    if (points < 300) return 2;
    if (points < 600) return 3;
    if (points < 1000) return 4;
    return 5;
  };

  const getPointsToNextLevel = (points: number) => {
    const level = getUserLevel(points);
    const thresholds = [0, 100, 300, 600, 1000, 2000];
    if (level >= 5) return 0;
    return thresholds[level] - points;
  };

  const getFilteredBubbleName = () => {
    if (!selectedBubbleFilter) return 'All Bubbles';
    const bubble = userBubbles.find(ub => ub.bubbleId === selectedBubbleFilter);
    return bubble ? `Bubble ${bubble.bubbleId.slice(0, 8)}` : 'Unknown Bubble';
  };

  const earnedBadges = badges.filter(b => b.earned);
  const availableBadges = badges.filter(b => !b.earned);

  // Calculate totals based on filter
  const totalCompletions = bubbleProgresses.reduce((sum, bp) => sum + bp.completions.length, 0);
  const totalBubblePoints = bubbleProgresses.reduce((sum, bp) => sum + bp.userBubble.points, 0);
  const totalBubbleCO2 = bubbleProgresses.reduce((sum, bp) => sum + bp.userBubble.co2Saved, 0);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Track your environmental impact</Text>
        
        {/* Bubble Filter */}
        {userBubbles.length > 1 && (
          <Pressable 
            style={styles.bubbleFilter}
            onPress={() => setShowBubbleFilter(true)}
          >
            <View style={styles.filterInfo}>
              <Ionicons name="filter" color="#ffffff" size={16} />
              <Text style={styles.filterText}>{getFilteredBubbleName()}</Text>
            </View>
            <Ionicons name="chevron-down" color="#ffffff" size={16} />
          </Pressable>
        )}
      </LinearGradient>

      <View style={styles.content}>
        {/* Level and Points */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {getUserLevel(user?.points || 0)}</Text>
            </View>
            <Text style={styles.pointsText}>{user?.points || 0} points</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(100, ((user?.points || 0) % 100) * 2)}%` 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {getPointsToNextLevel(user?.points || 0) > 0 
                ? `${getPointsToNextLevel(user?.points || 0)} points to next level`
                : 'Max level reached!'
              }
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="leaf" color="#10B981" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {totalBubbleCO2.toFixed(1)}kg
            </Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="calendar" color="#3B82F6" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {totalCompletions}
            </Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="people" color="#F59E0B" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {userBubbles.length}
            </Text>
            <Text style={styles.statLabel}>Bubbles</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="trending-up" color="#EF4444" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {earnedBadges.length}
            </Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Bubble Progress Cards */}
        {bubbleProgresses.length > 0 && (
          <View style={styles.bubblesSection}>
            <Text style={styles.sectionTitle}>
              {selectedBubbleFilter ? 'Bubble Progress' : 'Your Bubbles'}
            </Text>
            {bubbleProgresses.map((progress) => (
              <View key={progress.bubble.id} style={styles.bubbleCard}>
                <View style={styles.bubbleHeader}>
                  <View style={styles.bubbleIcon}>
                    <Ionicons name="people" color="#10B981" size={24} />
                  </View>
                  <View style={styles.bubbleInfo}>
                    <Text style={styles.bubbleTitle}>{progress.bubble.name}</Text>
                    <Text style={styles.bubbleMembers}>
                      {progress.bubble.members.length} members
                    </Text>
                  </View>
                </View>
                
                <View style={styles.bubbleStats}>
                  <View style={styles.bubbleStat}>
                    <Text style={styles.bubbleStatNumber}>{progress.userBubble.points}</Text>
                    <Text style={styles.bubbleStatLabel}>Your Points</Text>
                  </View>
                  <View style={styles.bubbleStat}>
                    <Text style={styles.bubbleStatNumber}>{progress.userBubble.co2Saved}kg</Text>
                    <Text style={styles.bubbleStatLabel}>Your CO₂</Text>
                  </View>
                  <View style={styles.bubbleStat}>
                    <Text style={styles.bubbleStatNumber}>{progress.bubble.totalPoints}</Text>
                    <Text style={styles.bubbleStatLabel}>Total Points</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>🏆 Earned Badges</Text>
            <View style={styles.badgesGrid}>
              {earnedBadges.map((badge) => (
                <View key={badge.id} style={[styles.badgeCard, styles.earnedBadge]}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>{badge.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Available Badges */}
        {availableBadges.length > 0 && (
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>🎯 Available Badges</Text>
            <View style={styles.badgesGrid}>
              {availableBadges.map((badge) => (
                <View key={badge.id} style={[styles.badgeCard, styles.lockedBadge]}>
                  <Text style={[styles.badgeIcon, styles.lockedIcon]}>{badge.icon}</Text>
                  <Text style={[styles.badgeName, styles.lockedText]}>{badge.name}</Text>
                  <Text style={[styles.badgeDescription, styles.lockedText]}>
                    {badge.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Bubble Filter Modal */}
      <Modal
        visible={showBubbleFilter}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter by Bubble</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowBubbleFilter(false)}
            >
              <Ionicons name="close" color="#6B7280" size={24} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            <Pressable
              style={[
                styles.filterOption,
                !selectedBubbleFilter && styles.activeFilterOption
              ]}
              onPress={() => {
                setSelectedBubbleFilter(null);
                setShowBubbleFilter(false);
              }}
            >
              <Text style={styles.filterOptionText}>All Bubbles</Text>
              {!selectedBubbleFilter && (
                <Ionicons name="trophy" color="#10B981" size={20} />
              )}
            </Pressable>

            {userBubbles.map((userBubble) => (
              <Pressable
                key={userBubble.bubbleId}
                style={[
                  styles.filterOption,
                  selectedBubbleFilter === userBubble.bubbleId && styles.activeFilterOption
                ]}
                onPress={() => {
                  setSelectedBubbleFilter(userBubble.bubbleId);
                  setShowBubbleFilter(false);
                }}
              >
                <View style={styles.filterOptionContent}>
                  <View style={styles.filterOptionIcon}>
                    <Ionicons name="people" color="#10B981" size={20} />
                  </View>
                  <Text style={styles.filterOptionText}>
                    Bubble {userBubble.bubbleId.slice(0, 8)}
                  </Text>
                </View>
                {selectedBubbleFilter === userBubble.bubbleId && (
                  <Ionicons name="trophy" color="#10B981" size={20} />
                )}
              </Pressable>
            ))}
          </ScrollView>
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
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
  },
  bubbleFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  levelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  pointsText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
  },
  progressBarContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  bubblesSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },
  bubbleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bubbleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  bubbleInfo: {
    flex: 1,
  },
  bubbleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  bubbleMembers: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  bubbleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bubbleStat: {
    alignItems: 'center',
  },
  bubbleStatNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  bubbleStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  badgesSection: {
    gap: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  badgeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  earnedBadge: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  badgeName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  lockedText: {
    opacity: 0.6,
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
  filterOption: {
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
  activeFilterOption: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  filterOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  filterOptionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
});