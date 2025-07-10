import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';
import { ChallengeCompletion, Challenge, Bubble } from '@/types';

interface HistoryItem extends ChallengeCompletion {
  challengeTitle: string;
  challengeCategory: string;
  bubbleName?: string;
}

export default function HistoryScreen() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBubbleFilter, setShowBubbleFilter] = useState(false);
  const [selectedBubbleFilter, setSelectedBubbleFilter] = useState<string | null>(null);
  const { user, userBubbles } = useAuth();

  useEffect(() => {
    loadHistory();
  }, [user?.id, selectedBubbleFilter]);

  const loadHistory = async () => {
    if (!user?.id || userBubbles.length === 0) {
      setLoading(false);
      return;
    }

    try {
      // Get user's challenge history
      const completions = await SupabaseService.getUserChallengeHistory(
        user.id, 
        selectedBubbleFilter || undefined
      );

      // For demo purposes, we'll create some mock history data with proper bubble context
      const mockHistory: HistoryItem[] = [];
      
      // Add some sample data for each bubble the user is in
      for (const userBubble of userBubbles.slice(0, 3)) {
        const sampleCompletions = [
          {
            id: `${userBubble.bubbleId}-1`,
            userId: user.id,
            challengeId: 'challenge1',
            bubbleId: userBubble.bubbleId,
            completedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
            photo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800',
            comment: 'Biked to work today instead of driving! Felt great to get some exercise and help the environment.',
            points: 50,
            co2Saved: 2.5,
            challengeTitle: 'Bike to Work Day',
            challengeCategory: 'transport',
            bubbleName: `Bubble ${userBubble.bubbleId.slice(0, 8)}`
          },
          {
            id: `${userBubble.bubbleId}-2`,
            userId: user.id,
            challengeId: 'challenge2',
            bubbleId: userBubble.bubbleId,
            completedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
            photo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
            comment: 'Made a delicious vegetarian pasta dish! My family loved it.',
            points: 30,
            co2Saved: 1.8,
            challengeTitle: 'Meatless Monday',
            challengeCategory: 'food',
            bubbleName: `Bubble ${userBubble.bubbleId.slice(0, 8)}`
          }
        ];

        if (!selectedBubbleFilter || selectedBubbleFilter === userBubble.bubbleId) {
          mockHistory.push(...sampleCompletions);
        }
      }

      // Sort by completion date
      mockHistory.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
      
      setHistoryItems(mockHistory);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return '🚲';
      case 'food':
        return '🥗';
      case 'waste':
        return '♻️';
      case 'energy':
        return '💡';
      default:
        return '🌱';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return '#3B82F6';
      case 'food':
        return '#F59E0B';
      case 'waste':
        return '#10B981';
      case 'energy':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getFilteredBubbleName = () => {
    if (!selectedBubbleFilter) return 'All Bubbles';
    const bubble = userBubbles.find(ub => ub.bubbleId === selectedBubbleFilter);
    return bubble ? `Bubble ${bubble.bubbleId.slice(0, 8)}` : 'Unknown Bubble';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>History</Text>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your history...</Text>
        </View>
      </View>
    );
  }

  if (historyItems.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>History</Text>
          <Text style={styles.headerSubtitle}>Your environmental journey</Text>
          
          {/* Bubble Filter */}
          {userBubbles.length > 1 && (
            <Pressable 
              style={styles.bubbleFilter}
              onPress={() => setShowBubbleFilter(true)}
            >
              <View style={styles.filterInfo}>
                <Filter color="#ffffff" size={16} />
                <Text style={styles.filterText}>{getFilteredBubbleName()}</Text>
              </View>
              <ChevronDown color="#ffffff" size={16} />
            </Pressable>
          )}
        </LinearGradient>
        
        <View style={styles.emptyContainer}>
          <Ionicons name="time" color="#6B7280" size={64} />
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptyText}>
            Complete your first challenge to start building your environmental impact history!
          </Text>
        </View>
      </View>
    );
  }

  const totalPoints = historyItems.reduce((sum, item) => sum + item.points, 0);
  const totalCO2 = historyItems.reduce((sum, item) => sum + item.co2Saved, 0);

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.header}
      >
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.headerSubtitle}>Your environmental journey</Text>
        
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
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{historyItems.length}</Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalCO2.toFixed(1)}kg</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {historyItems.map((item) => (
          <Pressable
            key={item.id}
            style={styles.historyCard}
            onPress={() => setSelectedItem(item)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardLeft}>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.challengeCategory) }]}>
                  <Text style={styles.categoryEmoji}>{getCategoryIcon(item.challengeCategory)}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.challengeTitle}>{item.challengeTitle}</Text>
                  <View style={styles.dateRow}>
                    <Ionicons name="calendar" color="#6B7280" size={14} />
                    <Text style={styles.dateText}>{formatDate(item.completedAt)}</Text>
                  </View>
                  {userBubbles.length > 1 && (
                    <View style={styles.bubbleRow}>
                      <Ionicons name="people" color="#6B7280" size={14} />
                      <Text style={styles.bubbleText}>{item.bubbleName}</Text>
                    </View>
                  <Ionicons name="camera" color="#ffffff" size={20} />
                </View>
              </View>
              
              {item.photo && (
                <Image source={{ uri: item.photo }} style={styles.thumbnailImage} />
              )}
            </View>

            <View style={styles.cardStats}>
              <View style={styles.statBadge}>
                <Ionicons name="trophy" color="#F59E0B" size={16} />
                <Text style={styles.statBadgeText}>+{item.points} pts</Text>
              </View>
              <View style={styles.statBadge}>
                <Ionicons name="leaf" color="#10B981" size={16} />
                <Text style={styles.statBadgeText}>{item.co2Saved}kg CO₂</Text>
              </View>
              {item.comment && (
                <View style={styles.statBadge}>
                  <Ionicons name="chatbubble" color="#6B7280" size={16} />
                  <Text style={styles.statBadgeText}>Comment</Text>
                </View>
              )}
            </View>

            {item.comment && (
              <Text style={styles.commentPreview} numberOfLines={2}>
                "{item.comment}"
              </Text>
            )}
          </Pressable>
        ))}
      </ScrollView>

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
                <Ionicons name="checkmark-circle" color="#10B981" size={20} />
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
                  <Ionicons name="checkmark-circle" color="#10B981" size={20} />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {/* Detail Modal */}
      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedItem && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedItem.challengeTitle}</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedItem(null)}
              >
                <X color="#6B7280" size={24} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {selectedItem.photo && (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedItem.photo }} style={styles.fullImage} />
                  <View style={styles.imageOverlay}>
                    <Camera color="#ffffff" size={20} />
                  </View>
                </View>
              )}

              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(selectedItem.challengeCategory) }]}>
                    <Text style={styles.categoryEmoji}>{getCategoryIcon(selectedItem.challengeCategory)}</Text>
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailTitle}>{selectedItem.challengeTitle}</Text>
                    <Text style={styles.detailDate}>
                      Completed {formatDate(selectedItem.completedAt)}
                    </Text>
                    {userBubbles.length > 1 && (
                      <Text style={styles.detailBubble}>
                        In {selectedItem.bubbleName}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.impactStats}>
                  <View style={styles.impactItem}>
                    <View style={styles.impactIcon}>
                      <Ionicons name="trophy" color="#F59E0B" size={24} />
                    </View>
                    <Text style={styles.impactNumber}>+{selectedItem.points}</Text>
                    <Text style={styles.impactLabel}>Points Earned</Text>
                  </View>
                  <View style={styles.impactItem}>
                    <View style={styles.impactIcon}>
                      <Ionicons name="leaf" color="#10B981" size={24} />
                    </View>
                    <Text style={styles.impactNumber}>{selectedItem.co2Saved}kg</Text>
                    <Text style={styles.impactLabel}>CO₂ Saved</Text>
                  </View>
                </View>

                {selectedItem.comment && (
                  <View style={styles.commentSection}>
                    <Text style={styles.commentTitle}>Your Experience</Text>
                    <Text style={styles.commentText}>"{selectedItem.comment}"</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
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
    marginBottom: 4,
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
    marginBottom: 16,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  cardInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bubbleText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  commentPreview: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
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
    flex: 1,
    marginRight: 16,
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
  },
  filterOption: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
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
  imageContainer: {
    position: 'relative',
    margin: 24,
    marginBottom: 0,
  },
  fullImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailCard: {
    backgroundColor: '#ffffff',
    margin: 24,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  detailInfo: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  detailDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  detailBubble: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  impactStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
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
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  commentSection: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  commentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});