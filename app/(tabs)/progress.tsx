import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Leaf, TrendingUp, Users, Calendar } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { FirebaseService } from '@/services/firebaseService';
import { Bubble, ChallengeCompletion } from '@/types';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export default function ProgressScreen() {
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [userCompletions, setUserCompletions] = useState<ChallengeCompletion[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadProgressData();
  }, [user?.bubbleId]);

  const loadProgressData = async () => {
    if (!user?.bubbleId) return;

    try {
      const bubbleData = await FirebaseService.getBubble(user.bubbleId);
      setBubble(bubbleData);

      // Load user's challenge completions (simplified for demo)
      // In a real app, you'd have a more sophisticated query
      setUserCompletions([]);

      // Demo badges
      setBadges([
        {
          id: '1',
          name: 'First Step',
          description: 'Complete your first challenge',
          icon: '🌱',
          earned: (user.points || 0) > 0
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
          earned: !!user.bubbleId
        },
        {
          id: '5',
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

  const earnedBadges = badges.filter(b => b.earned);
  const availableBadges = badges.filter(b => !b.earned);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Track your environmental impact</Text>
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
              <Leaf color="#10B981" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {bubble?.totalCO2Saved || 0}kg
            </Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar color="#3B82F6" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {userCompletions.length}
            </Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Users color="#F59E0B" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {bubble?.members.length || 0}
            </Text>
            <Text style={styles.statLabel}>Bubble Size</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp color="#EF4444" size={24} />
            </View>
            <Text style={styles.statNumber}>
              {earnedBadges.length}
            </Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

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

        {/* Bubble Impact */}
        {bubble && (
          <View style={styles.bubbleCard}>
            <Text style={styles.bubbleTitle}>{bubble.name} Impact</Text>
            <View style={styles.bubbleStats}>
              <View style={styles.bubbleStat}>
                <Text style={styles.bubbleStatNumber}>{bubble.totalPoints}</Text>
                <Text style={styles.bubbleStatLabel}>Total Points</Text>
              </View>
              <View style={styles.bubbleStat}>
                <Text style={styles.bubbleStatNumber}>{bubble.totalCO2Saved}kg</Text>
                <Text style={styles.bubbleStatLabel}>CO₂ Saved</Text>
              </View>
              <View style={styles.bubbleStat}>
                <Text style={styles.bubbleStatNumber}>{bubble.members.length}</Text>
                <Text style={styles.bubbleStatLabel}>Members</Text>
              </View>
            </View>
          </View>
        )}
      </View>
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
  badgesSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
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
  bubbleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  bubbleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bubbleStat: {
    alignItems: 'center',
  },
  bubbleStatNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  bubbleStatLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});