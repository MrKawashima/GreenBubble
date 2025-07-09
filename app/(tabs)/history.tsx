import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Award, Leaf, X, Calendar, MessageCircle, Camera } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { FirebaseService } from '@/services/firebaseService';
import { ChallengeCompletion, Challenge } from '@/types';

interface HistoryItem extends ChallengeCompletion {
  challengeTitle: string;
  challengeCategory: string;
}

export default function HistoryScreen() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, [user?.id]);

  const loadHistory = async () => {
    if (!user?.id || !user?.bubbleId) {
      setLoading(false);
      return;
    }

    try {
      // For demo purposes, we'll create some mock history data
      // In a real app, you'd query Firestore for user's completed challenges
      const mockHistory: HistoryItem[] = [
        {
          id: '1',
          userId: user.id,
          challengeId: 'challenge1',
          bubbleId: user.bubbleId,
          completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          photo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800',
          comment: 'Biked to work today instead of driving! Felt great to get some exercise and help the environment.',
          points: 50,
          co2Saved: 2.5,
          challengeTitle: 'Bike to Work Day',
          challengeCategory: 'transport'
        },
        {
          id: '2',
          userId: user.id,
          challengeId: 'challenge2',
          bubbleId: user.bubbleId,
          completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          photo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
          comment: 'Made a delicious vegetarian pasta dish! My family loved it.',
          points: 30,
          co2Saved: 1.8,
          challengeTitle: 'Meatless Monday',
          challengeCategory: 'food'
        },
        {
          id: '3',
          userId: user.id,
          challengeId: 'challenge3',
          bubbleId: user.bubbleId,
          completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
          photo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800',
          comment: 'Collected 8 pieces of litter during my morning walk. Every little bit helps!',
          points: 40,
          co2Saved: 0.5,
          challengeTitle: 'Litter Cleanup',
          challengeCategory: 'waste'
        },
        {
          id: '4',
          userId: user.id,
          challengeId: 'challenge4',
          bubbleId: user.bubbleId,
          completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          photo: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800',
          comment: 'Turned off all unnecessary lights and unplugged devices. Small changes make a difference!',
          points: 25,
          co2Saved: 1.2,
          challengeTitle: 'Energy Saving Day',
          challengeCategory: 'energy'
        },
        {
          id: '5',
          userId: user.id,
          challengeId: 'challenge5',
          bubbleId: user.bubbleId,
          completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
          photo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800',
          comment: 'Repurposed old jars into planters for herbs. They look amazing on my windowsill!',
          points: 35,
          co2Saved: 0.8,
          challengeTitle: 'Upcycle Challenge',
          challengeCategory: 'waste'
        }
      ];

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
        </LinearGradient>
        
        <View style={styles.emptyContainer}>
          <Clock color="#6B7280" size={64} />
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptyText}>
            Complete your first challenge to start building your environmental impact history!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.header}
      >
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.headerSubtitle}>Your environmental journey</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{historyItems.length}</Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {historyItems.reduce((sum, item) => sum + item.points, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {historyItems.reduce((sum, item) => sum + item.co2Saved, 0).toFixed(1)}kg
            </Text>
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
                    <Calendar color="#6B7280" size={14} />
                    <Text style={styles.dateText}>{formatDate(item.completedAt)}</Text>
                  </View>
                </View>
              </View>
              
              {item.photo && (
                <Image source={{ uri: item.photo }} style={styles.thumbnailImage} />
              )}
            </View>

            <View style={styles.cardStats}>
              <View style={styles.statBadge}>
                <Award color="#F59E0B" size={16} />
                <Text style={styles.statBadgeText}>+{item.points} pts</Text>
              </View>
              <View style={styles.statBadge}>
                <Leaf color="#10B981" size={16} />
                <Text style={styles.statBadgeText}>{item.co2Saved}kg CO₂</Text>
              </View>
              {item.comment && (
                <View style={styles.statBadge}>
                  <MessageCircle color="#6B7280" size={16} />
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
                  </View>
                </View>

                <View style={styles.impactStats}>
                  <View style={styles.impactItem}>
                    <View style={styles.impactIcon}>
                      <Award color="#F59E0B" size={24} />
                    </View>
                    <Text style={styles.impactNumber}>+{selectedItem.points}</Text>
                    <Text style={styles.impactLabel}>Points Earned</Text>
                  </View>
                  <View style={styles.impactItem}>
                    <View style={styles.impactIcon}>
                      <Leaf color="#10B981" size={24} />
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
    marginBottom: 24,
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
  },
  dateText: {
    fontSize: 14,
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