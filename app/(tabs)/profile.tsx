import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Modal, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, LogOut, Share, Users, Award, Leaf, Trophy, Star, X, Crown } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { BadgeService, LEVELS } from '@/services/badgeService';
import { Badge, Level } from '@/types';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    loadUserBadges();
  }, [user]);

  const loadUserBadges = async () => {
    // For demo purposes, we'll simulate some earned badges
    // In a real app, you'd load this from Firestore
    const mockCompletions = [
      { challengeId: 'food1', co2Saved: 2.5, photo: 'photo1' },
      { challengeId: 'transport1', co2Saved: 3.0, photo: 'photo2' },
      { challengeId: 'waste1', co2Saved: 1.5, photo: null },
    ] as any[];

    const badges = BadgeService.getUserBadges(mockCompletions);
    setUserBadges(badges);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/(auth)/welcome');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  const currentLevel = BadgeService.getUserLevel(user?.points || 0);
  const nextLevel = BadgeService.getNextLevel(currentLevel.level);
  const progress = BadgeService.getProgressToNextLevel(user?.points || 0);
  const earnedBadges = userBadges.filter(b => b.earned);
  const availableBadges = userBadges.filter(b => !b.earned);

  const animateBadgePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const menuItems = [
    {
      icon: <Share color="#6B7280" size={20} />,
      title: 'Invite Friends',
      subtitle: 'Share your Bubble with others',
      onPress: () => Alert.alert('Coming Soon', 'Invite feature will be available soon!')
    },
    {
      icon: <Settings color="#6B7280" size={20} />,
      title: 'Settings',
      subtitle: 'Notifications, privacy, and more',
      onPress: () => Alert.alert('Coming Soon', 'Settings will be available soon!')
    },
    {
      icon: <LogOut color="#EF4444" size={20} />,
      title: 'Logout',
      subtitle: 'Sign out of your account',
      onPress: handleLogout
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={[currentLevel.color, currentLevel.color + 'CC']} 
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User color={currentLevel.color} size={32} />
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          
          <View style={[styles.levelBadge, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
            <Text style={styles.levelIcon}>{currentLevel.icon}</Text>
            <Text style={styles.levelText}>{currentLevel.name}</Text>
          </View>

          {/* Level Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>
                {user?.points || 0} / {nextLevel ? nextLevel.minPoints : 'MAX'} points
              </Text>
              {nextLevel && (
                <Text style={styles.nextLevelText}>
                  Next: {nextLevel.name} {nextLevel.icon}
                </Text>
              )}
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress.percentage}%` }
                ]} 
              />
            </View>
            {nextLevel && (
              <Text style={styles.pointsToNext}>
                {nextLevel.minPoints - (user?.points || 0)} points to next level
              </Text>
            )}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: currentLevel.color + '20' }]}>
              <Award color={currentLevel.color} size={24} />
            </View>
            <Text style={styles.statNumber}>{user?.points || 0}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Leaf color="#10B981" size={24} />
            </View>
            <Text style={styles.statNumber}>12.5kg</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Trophy color="#F59E0B" size={24} />
            </View>
            <Text style={styles.statNumber}>{earnedBadges.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <View style={styles.badgesSection}>
            <View style={styles.sectionHeader}>
              <Trophy color="#F59E0B" size={20} />
              <Text style={styles.sectionTitle}>Your Badges</Text>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.badgesScroll}
            >
              {earnedBadges.map((badge) => (
                <Pressable
                  key={badge.id}
                  style={[styles.badgeCard, styles.earnedBadge]}
                  onPress={() => {
                    animateBadgePress();
                    setSelectedBadge(badge);
                  }}
                >
                  <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <View style={styles.badgeIconContainer}>
                      <Text style={styles.badgeIcon}>{badge.icon}</Text>
                      <View style={styles.earnedIndicator}>
                        <Star color="#F59E0B" size={12} fill="#F59E0B" />
                      </View>
                    </View>
                    <Text style={styles.badgeName}>{badge.name}</Text>
                  </Animated.View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Available Badges */}
        {availableBadges.length > 0 && (
          <View style={styles.badgesSection}>
            <View style={styles.sectionHeader}>
              <Crown color="#6B7280" size={20} />
              <Text style={styles.sectionTitle}>Available Badges</Text>
            </View>
            
            <View style={styles.badgesGrid}>
              {availableBadges.slice(0, 6).map((badge) => (
                <Pressable
                  key={badge.id}
                  style={[styles.badgeCard, styles.lockedBadge]}
                  onPress={() => setSelectedBadge(badge)}
                >
                  <View style={styles.badgeIconContainer}>
                    <Text style={[styles.badgeIcon, styles.lockedIcon]}>{badge.icon}</Text>
                  </View>
                  <Text style={[styles.badgeName, styles.lockedText]}>{badge.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <Pressable style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Share color="#10B981" size={20} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Share Your Impact</Text>
              <Text style={styles.actionSubtitle}>Show friends your progress</Text>
            </View>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Users color="#3B82F6" size={20} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Create New Bubble</Text>
              <Text style={styles.actionSubtitle}>Start a new environmental group</Text>
            </View>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {menuItems.map((item, index) => (
            <Pressable 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIcon}>
                {item.icon}
              </View>
              <View style={styles.menuContent}>
                <Text style={[
                  styles.menuTitle,
                  item.title === 'Logout' && styles.logoutText
                ]}>
                  {item.title}
                </Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>GreenBubble v1.0.0</Text>
          <Text style={styles.appInfoText}>Making environmental impact social</Text>
        </View>
      </View>

      {/* Badge Detail Modal */}
      <Modal
        visible={selectedBadge !== null}
        animationType="fade"
        transparent={true}
      >
        {selectedBadge && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalBadgeIcon}>{selectedBadge.icon}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setSelectedBadge(null)}
                >
                  <X color="#6B7280" size={20} />
                </Pressable>
              </View>
              
              <Text style={styles.modalBadgeName}>{selectedBadge.name}</Text>
              <Text style={styles.modalBadgeDescription}>{selectedBadge.description}</Text>
              
              <View style={styles.modalRequirement}>
                <Text style={styles.requirementLabel}>Requirement:</Text>
                <Text style={styles.requirementText}>{selectedBadge.requirement}</Text>
              </View>

              {selectedBadge.earned ? (
                <View style={styles.earnedStatus}>
                  <Star color="#F59E0B" size={20} fill="#F59E0B" />
                  <Text style={styles.earnedText}>Badge Earned!</Text>
                </View>
              ) : (
                <View style={styles.lockedStatus}>
                  <Text style={styles.lockedStatusText}>Keep going to earn this badge!</Text>
                </View>
              )}
            </View>
          </View>
        )}
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
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    marginBottom: 24,
  },
  levelIcon: {
    fontSize: 16,
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  progressContainer: {
    width: '100%',
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  nextLevelText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  pointsToNext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  badgesSection: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },
  badgesScroll: {
    paddingVertical: 8,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  earnedBadge: {
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  lockedBadge: {
    opacity: 0.6,
    flex: 1,
    minWidth: '30%',
  },
  badgeIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  badgeIcon: {
    fontSize: 32,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  earnedIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeName: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'center',
  },
  lockedText: {
    opacity: 0.6,
  },
  quickActions: {
    gap: 16,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  menuSection: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  logoutText: {
    color: '#EF4444',
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  appInfo: {
    alignItems: 'center',
    paddingTop: 24,
    gap: 4,
  },
  appInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  modalBadgeIcon: {
    fontSize: 48,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBadgeName: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalBadgeDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalRequirement: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  requirementLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  earnedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  earnedText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
  },
  lockedStatus: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  lockedStatusText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});