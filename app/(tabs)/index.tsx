import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Award, Leaf, Camera, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';
import { Challenge, Bubble, ChallengeCompletion } from '@/types';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [completions, setCompletions] = useState<ChallengeCompletion[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userCompleted, setUserCompleted] = useState(false);
  const { user } = useAuth();

  const loadData = async () => {
    if (!user?.bubbleId) return;

    try {
      const [challenge, bubbleData] = await Promise.all([
        SupabaseService.getActiveChallenge(),
        SupabaseService.getBubble(user.bubbleId)
      ]);

      setActiveChallenge(challenge);
      setBubble(bubbleData);

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
  }, [user?.bubbleId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCompleteChallenge = () => {
    if (activeChallenge) {
      router.push({
        pathname: '/(tabs)/challenges',
        params: { challengeId: activeChallenge.id }
      });
    }
  };

  if (!user?.bubbleId) {
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
          <View style={styles.bubbleInfo}>
            <Users color="#ffffff" size={20} />
            <Text style={styles.bubbleName}>{bubble?.name}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {activeChallenge ? (
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeTitle}>This Week's Challenge</Text>
              <View style={styles.challengeBadge}>
                <Leaf color="#10B981" size={16} />
                <Text style={styles.challengePoints}>+{activeChallenge.points} pts</Text>
              </View>
            </View>
            
            <Text style={styles.challengeName}>{activeChallenge.title}</Text>
            <Text style={styles.challengeDescription}>{activeChallenge.description}</Text>
            
            <View style={styles.challengeStats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{completions.length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{bubble?.members.length || 0}</Text>
                <Text style={styles.statLabel}>Members</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{activeChallenge.co2Impact}kg</Text>
                <Text style={styles.statLabel}>CO₂ Saved</Text>
              </View>
            </View>

            {userCompleted ? (
              <View style={styles.completedButton}>
                <CheckCircle color="#10B981" size={20} />
                <Text style={styles.completedButtonText}>Challenge Completed!</Text>
              </View>
            ) : (
              <Pressable 
                style={styles.completeButton}
                onPress={handleCompleteChallenge}
              >
                <Camera color="#ffffff" size={20} />
                <Text style={styles.completeButtonText}>Complete Challenge</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.noChallengeCard}>
            <Award color="#6B7280" size={48} />
            <Text style={styles.noChallengeTitle}>No Active Challenge</Text>
            <Text style={styles.noChallengeText}>
              Check back soon for this week's environmental challenge!
            </Text>
          </View>
        )}

        <View style={styles.bubbleStatsCard}>
          <Text style={styles.cardTitle}>Bubble Impact</Text>
          <View style={styles.impactGrid}>
            <View style={styles.impactItem}>
              <View style={styles.impactIcon}>
                <Leaf color="#10B981" size={24} />
              </View>
              <Text style={styles.impactNumber}>{bubble?.totalCO2Saved || 0}kg</Text>
              <Text style={styles.impactLabel}>CO₂ Saved</Text>
            </View>
            <View style={styles.impactItem}>
              <View style={styles.impactIcon}>
                <Award color="#F59E0B" size={24} />
              </View>
              <Text style={styles.impactNumber}>{bubble?.totalPoints || 0}</Text>
              <Text style={styles.impactLabel}>Total Points</Text>
            </View>
          </View>
        </View>

        {completions.length > 0 && (
          <View style={styles.recentActivity}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            {completions.slice(0, 3).map((completion) => (
              <View key={completion.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <CheckCircle color="#10B981" size={16} />
                </View>
                <Text style={styles.activityText}>
                  Challenge completed
                </Text>
                <Text style={styles.activityTime}>
                  {completion.completedAt.toLocaleDateString()}
                </Text>
              </View>
            ))}
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
  bubbleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bubbleName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
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
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  activityTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
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
});