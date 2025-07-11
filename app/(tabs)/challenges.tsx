import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';
import { Challenge, Bubble } from '@/types';
import { TextInput } from 'react-native';

export default function ChallengesScreen() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [activeBubble, setActiveBubble] = useState<Bubble | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [userCompleted, setUserCompleted] = useState(false);
  const [showBubbleFilter, setShowBubbleFilter] = useState(false);
  const [selectedBubbleFilter, setSelectedBubbleFilter] = useState<string | null>(null);
  const [bubbleNames, setBubbleNames] = useState<Record<string, string>>({});
  const { user, userBubbles, switchActiveBubble } = useAuth();

  useEffect(() => {
    loadChallenge();
  }, [user?.activeBubbleId, selectedBubbleFilter]);

  useEffect(() => {
    if (userBubbles.length > 0) {
      loadBubbleNames();
    }
  }, [userBubbles]);

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

  const loadChallenge = async () => {
    try {
      const challenge = await SupabaseService.getActiveChallenge();
      setActiveChallenge(challenge);

      if (challenge && user?.id) {
        // If filtering by specific bubble, use that bubble, otherwise use active bubble
        const targetBubbleId = selectedBubbleFilter || user.activeBubbleId;
        
        if (targetBubbleId) {
          const [bubbleData, completions] = await Promise.all([
            SupabaseService.getBubble(targetBubbleId),
            selectedBubbleFilter 
              ? SupabaseService.getChallengeCompletions(selectedBubbleFilter, challenge.id)
              : SupabaseService.getChallengeCompletions(user.activeBubbleId!, challenge.id)
          ]);
          
          setActiveBubble(bubbleData);
          
          // Check if user completed in the filtered bubble or any bubble
          if (selectedBubbleFilter) {
            setUserCompleted(completions.some(c => c.userId === user.id));
          } else {
            // Check across all user's bubbles
            let hasCompleted = false;
            for (const userBubble of userBubbles) {
              const bubbleCompletions = await SupabaseService.getChallengeCompletions(userBubble.bubbleId, challenge.id);
              if (bubbleCompletions.some(c => c.userId === user.id)) {
                hasCompleted = true;
                break;
              }
            }
            setUserCompleted(hasCompleted);
          }
        }
      }
    } catch (error) {
      console.error('Error loading challenge:', error);
    }
  };


  const getFilteredBubbleName = () => {
    if (!selectedBubbleFilter) return 'All Bubbles';
    return bubbleNames[selectedBubbleFilter] || 'Unknown Bubble';
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCompleteChallenge = async () => {
    if (!activeChallenge || !user?.activeBubbleId || !user?.id) return;

    if (!selectedImage && !comment.trim()) {
      Alert.alert('Required', 'Please add a photo or comment to complete the challenge');
      return;
    }

    // Always complete in the user's active bubble, regardless of filter
    const completionBubbleId = user.activeBubbleId;

    setLoading(true);
    try {
      let photoUrl = '';
      
      if (selectedImage) {
        photoUrl = await SupabaseService.uploadImage(
          selectedImage,
          `challenges/${user.id}/${Date.now()}.jpg`
        );
      }

      await SupabaseService.completeChallenge({
        userId: user.id,
        challengeId: activeChallenge.id,
        bubbleId: completionBubbleId,
        photo: photoUrl,
        comment: comment.trim() || undefined,
        points: activeChallenge.points,
        co2Saved: activeChallenge.co2Impact
      });

      // Update user points
      await SupabaseService.updateUser(user.id, {
        points: (user.points || 0) + activeChallenge.points
      });

      Alert.alert('Success!', 'Challenge completed! You earned ' + activeChallenge.points + ' points.');
      setUserCompleted(true);
      setSelectedImage(null);
      setComment('');
      
      // Reload challenge data to reflect completion
      await loadChallenge();
    } catch (error) {
      Alert.alert('Error', 'Failed to complete challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user?.activeBubbleId || userBubbles.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Challenges</Text>
          
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
        
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle" color="#6B7280" size={64} />
          <Text style={styles.emptyTitle}>No Active Bubble</Text>
          <Text style={styles.emptyText}>
            Join a bubble to participate in environmental challenges!
          </Text>
        </View>
      </View>
    );
  }

  if (!activeChallenge) {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Challenges</Text>
          
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
        
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle" color="#6B7280" size={64} />
          <Text style={styles.emptyTitle}>No Active Challenge</Text>
          <Text style={styles.emptyText}>
            Check back soon for this week's environmental challenge!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={['#10B981', '#059669']} 
        style={styles.header}
      >
        <Text style={styles.headerTitle}>This Week's Challenge</Text>
        
        {/* Bubble Selector */}
        {userBubbles.length > 1 && (
          <Pressable 
            style={styles.bubbleSelector}
            onPress={() => setShowBubbleSelector(true)}
          >
            <View style={styles.bubbleInfo}>
              <Ionicons name="people" color="#ffffff" size={16} />
              <Text style={styles.bubbleName}>
                {getFilteredBubbleName()}
              </Text>
            </View>
            <Ionicons name="chevron-down" color="#ffffff" size={16} />
          </Pressable>
        )}
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>{activeChallenge.title}</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>+{activeChallenge.points} pts</Text>
            </View>
          </View>
          
          <Text style={styles.challengeDescription}>
            {activeChallenge.description}
          </Text>
          
          <View style={styles.impactInfo}>
            <Text style={styles.impactText}>
              💚 Save {activeChallenge.co2Impact}kg CO₂ by completing this challenge
            </Text>
          </View>
        </View>

        {userCompleted ? (
          <View style={styles.completedCard}>
            <Ionicons name="checkmark-circle" color="#10B981" size={48} />
            <Text style={styles.completedTitle}>Challenge Completed!</Text>
            <Text style={styles.completedText}>
              Great job! You've earned {activeChallenge.points} points and helped save the environment.
            </Text>
          </View>
        ) : (
          <View style={styles.completionCard}>
            <Text style={styles.completionTitle}>Complete the Challenge</Text>
            
            {selectedBubbleFilter && (
              <View style={styles.filterNotice}>
                <Ionicons name="information-circle" color="#3B82F6" size={16} />
                <Text style={styles.filterNoticeText}>
                  Viewing {bubbleNames[selectedBubbleFilter] || 'filtered bubble'}. 
                  Completion will be added to your active bubble: {bubbleNames[user?.activeBubbleId || ''] || 'Unknown'}.
                </Text>
              </View>
            )}
            
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <Pressable 
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <Ionicons name="close" color="#ffffff" size={20} />
                </Pressable>
              </View>
            ) : (
              <View style={styles.photoSection}>
                <Text style={styles.photoTitle}>Add a Photo (Optional)</Text>
                <View style={styles.photoButtons}>
                  <Pressable style={styles.photoButton} onPress={takePhoto}>
                    <Ionicons name="camera" color="#10B981" size={24} />
                    <Text style={styles.photoButtonText}>Take Photo</Text>
                  </Pressable>
                  
                  <Pressable style={styles.photoButton} onPress={pickImage}>
                    <Ionicons name="cloud-upload" color="#10B981" size={24} />
                    <Text style={styles.photoButtonText}>Upload</Text>
                  </Pressable>
                </View>
              </View>
            )}
            
            <View style={styles.commentSection}>
              <Text style={styles.commentTitle}>Add a Comment</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Share your experience or how you completed the challenge..."
                placeholderTextColor="#9CA3AF"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <Pressable 
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleCompleteChallenge}
              disabled={loading}
            >
              <Ionicons name="checkmark-circle" color="#ffffff" size={20} />
              <Text style={styles.submitButtonText}>
                {loading ? 'Submitting...' : 'Complete Challenge'}
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Tips for Success</Text>
          <Text style={styles.tipText}>
            • Take a clear photo showing your completed action
          </Text>
          <Text style={styles.tipText}>
            • Share your experience to inspire your Bubble members
          </Text>
          <Text style={styles.tipText}>
            • Complete challenges early in the week for maximum impact
          </Text>
        </View>
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
              <View style={styles.filterOptionContent}>
                <Text style={styles.filterOptionText}>All Bubbles</Text>
              </View>
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
                    <Ionicons name="people" color="#10B981" size={24} />
                  </View>
                  <View style={styles.filterOptionInfo}>
                    <Text style={styles.filterOptionText}>
                      {bubbleNames[userBubble.bubbleId] || 'Loading...'}
                    </Text>
                    <Text style={styles.filterOptionStats}>
                      {userBubble.points} points • {userBubble.co2Saved}kg CO₂
                    </Text>
                  </View>
                </View>
                {selectedBubbleFilter === userBubble.bubbleId && (
                  <Ionicons name="checkmark-circle" color="#10B981" size={20} />
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
  bubbleFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  challengeTitle: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginRight: 16,
  },
  pointsBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  challengeDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  impactInfo: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  impactText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
  },
  completedCard: {
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
  completedTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  completionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 24,
  },
  filterNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  filterNoticeText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
  photoSection: {
    marginBottom: 24,
  },
  photoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 12,
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#D1FAE5',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  photoButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentSection: {
    marginBottom: 24,
  },
  commentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 12,
  },
  commentInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginBottom: 4,
    lineHeight: 20,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  filterOptionInfo: {
    flex: 1,
  },
  filterOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  filterOptionStats: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});