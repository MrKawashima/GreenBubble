import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/firebase';
import { User, Bubble, Challenge, ChallengeCompletion } from '@/types';

export const FirebaseService = {
  // User operations
  async createUser(userData: Omit<User, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUser(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return {
          id: userDoc.id,
          ...userDoc.data(),
          createdAt: userDoc.data().createdAt.toDate()
        } as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async updateUser(userId: string, updates: Partial<User>) {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Bubble operations
  async createBubble(bubbleData: Omit<Bubble, 'id' | 'createdAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'bubbles'), {
        ...bubbleData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating bubble:', error);
      throw error;
    }
  },

  async getBubble(bubbleId: string): Promise<Bubble | null> {
    try {
      const bubbleDoc = await getDoc(doc(db, 'bubbles', bubbleId));
      if (bubbleDoc.exists()) {
        return {
          id: bubbleDoc.id,
          ...bubbleDoc.data(),
          createdAt: bubbleDoc.data().createdAt.toDate()
        } as Bubble;
      }
      return null;
    } catch (error) {
      console.error('Error getting bubble:', error);
      throw error;
    }
  },

  async joinBubble(bubbleId: string, userId: string) {
    try {
      const bubbleRef = doc(db, 'bubbles', bubbleId);
      const bubbleDoc = await getDoc(bubbleRef);
      
      if (bubbleDoc.exists()) {
        const bubble = bubbleDoc.data() as Bubble;
        if (!bubble.members.includes(userId)) {
          await updateDoc(bubbleRef, {
            members: [...bubble.members, userId]
          });
        }
      }
    } catch (error) {
      console.error('Error joining bubble:', error);
      throw error;
    }
  },

  async getBubblesByUser(userId: string): Promise<Bubble[]> {
    try {
      const q = query(
        collection(db, 'bubbles'),
        where('members', 'array-contains', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Bubble[];
    } catch (error) {
      console.error('Error getting user bubbles:', error);
      throw error;
    }
  },

  // Challenge operations
  async getActiveChallenge(): Promise<Challenge | null> {
    try {
      const q = query(
        collection(db, 'challenges'),
        where('isActive', '==', true),
        orderBy('startDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.docs.length > 0) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate.toDate()
        } as Challenge;
      }
      return null;
    } catch (error) {
      console.error('Error getting active challenge:', error);
      throw error;
    }
  },

  async completeChallenge(completionData: Omit<ChallengeCompletion, 'id' | 'completedAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'challengeCompletions'), {
        ...completionData,
        completedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error completing challenge:', error);
      throw error;
    }
  },

  async getChallengeCompletions(bubbleId: string, challengeId: string): Promise<ChallengeCompletion[]> {
    try {
      const q = query(
        collection(db, 'challengeCompletions'),
        where('bubbleId', '==', bubbleId),
        where('challengeId', '==', challengeId),
        orderBy('completedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: doc.data().completedAt.toDate()
      })) as ChallengeCompletion[];
    } catch (error) {
      console.error('Error getting challenge completions:', error);
      throw error;
    }
  },

  // File upload
  async uploadImage(uri: string, path: string): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, blob);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};