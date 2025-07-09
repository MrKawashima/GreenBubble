import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CircleCheck as CheckCircle, Upload, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { SupabaseService } from '@/services/supabaseService';
import { Challenge } from '@/types';
import { TextInput } from 'react-native';

export default function ChallengesScreen() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [userCompleted, setUserCompleted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadChallenge();
  }, []);

  const loadChallenge = async () => {
    try {
      const challenge = await SupabaseService.getActiveChallenge();
      setActiveChallenge(challenge);

      if (challenge && user?.bubbleId) {
        const completions = await SupabaseService.getChallengeCompletions(
          user.bubbleId,
          challenge.id
        );
        setUserCompleted(completions.some(c => c.userId === user.id));
      }
    } catch (error) {
      console.error('Error loading challenge:', error);
    }
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
    if (!activeChallenge || !user?.bubbleId) return;

    if (!selectedImage && !comment.trim()) {
      Alert.alert('Required', 'Please add a photo or comment to complete the challenge');
      return;
    }

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
        bubbleId: user.bubbleId,
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
    } catch (error) {
      Alert.alert('Error', 'Failed to complete challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!activeChallenge) {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#10B981', '#059669']} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Challenges</Text>
        </LinearGradient>
        
        <View style={styles.emptyContainer}>
          <CheckCircle color="#6B7280" size={64} />
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
            <CheckCircle color="#10B981" size={48} />
            <Text style={styles.completedTitle}>Challenge Completed!</Text>
            <Text style={styles.completedText}>
              Great job! You've earned {activeChallenge.points} points and helped save the environment.
            </Text>
          </View>
        ) : (
          <View style={styles.completionCard}>
            <Text style={styles.completionTitle}>Complete the Challenge</Text>
            
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <Pressable 
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <X color="#ffffff" size={20} />
                </Pressable>
              </View>
            ) : (
              <View style={styles.photoSection}>
                <Text style={styles.photoTitle}>Add a Photo (Optional)</Text>
                <View style={styles.photoButtons}>
                  <Pressable style={styles.photoButton} onPress={takePhoto}>
                    <Camera color="#10B981" size={24} />
                    <Text style={styles.photoButtonText}>Take Photo</Text>
                  </Pressable>
                  
                  <Pressable style={styles.photoButton} onPress={pickImage}>
                    <Upload color="#10B981" size={24} />
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
              <CheckCircle color="#ffffff" size={20} />
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
});