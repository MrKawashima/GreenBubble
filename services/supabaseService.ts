import { createClient } from '@supabase/supabase-js';
import { User, Bubble, Challenge, ChallengeCompletion } from '@/types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SupabaseService = {
  // User operations
  async createUser(userData: Omit<User, 'id' | 'createdAt'>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUser(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // No rows returned
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async updateUser(userId: string, updates: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Bubble operations
  async createBubble(bubbleData: Omit<Bubble, 'id' | 'createdAt'>) {
    try {
      const { data, error } = await supabase
        .from('bubbles')
        .insert([bubbleData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating bubble:', error);
      throw error;
    }
  },

  async getBubble(bubbleId: string): Promise<Bubble | null> {
    try {
      const { data, error } = await supabase
        .from('bubbles')
        .select('*')
        .eq('id', bubbleId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error getting bubble:', error);
      throw error;
    }
  },

  async joinBubble(bubbleId: string, userId: string) {
    try {
      // First get the current bubble
      const bubble = await this.getBubble(bubbleId);
      if (!bubble) throw new Error('Bubble not found');

      // Add user to members array if not already there
      const updatedMembers = bubble.members.includes(userId) 
        ? bubble.members 
        : [...bubble.members, userId];

      const { data, error } = await supabase
        .from('bubbles')
        .update({ members: updatedMembers })
        .eq('id', bubbleId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error joining bubble:', error);
      throw error;
    }
  },

  // Challenge operations
  async getActiveChallenge(): Promise<Challenge | null> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return {
        ...data,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date)
      };
    } catch (error) {
      console.error('Error getting active challenge:', error);
      throw error;
    }
  },

  async completeChallenge(completionData: Omit<ChallengeCompletion, 'id' | 'completedAt'>) {
    try {
      const { data, error } = await supabase
        .from('challenge_completions')
        .insert([completionData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error completing challenge:', error);
      throw error;
    }
  },

  async getChallengeCompletions(bubbleId: string, challengeId: string): Promise<ChallengeCompletion[]> {
    try {
      const { data, error } = await supabase
        .from('challenge_completions')
        .select('*')
        .eq('bubble_id', bubbleId)
        .eq('challenge_id', challengeId)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      return data.map(item => ({
        ...item,
        completedAt: new Date(item.completed_at)
      }));
    } catch (error) {
      console.error('Error getting challenge completions:', error);
      throw error;
    }
  },

  // File upload (using Supabase Storage)
  async uploadImage(uri: string, path: string): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const { data, error } = await supabase.storage
        .from('challenge-photos')
        .upload(path, blob);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('challenge-photos')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};