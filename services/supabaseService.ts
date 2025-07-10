import { supabase } from '@/config/supabase';
import { User, Bubble, Challenge, ChallengeCompletion } from '@/types';

export const SupabaseService = {
  // Auth operations
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          name,
          email,
          points: 0,
          level: 1,
          badges: [],
        });

      if (profileError) throw profileError;
    }

    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // User operations
  async getUser(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) return null; // No user found

    return {
      ...data,
      createdAt: new Date(data.created_at),
    } as User;
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        bubble_id: updates.bubbleId,
        points: updates.points,
        level: updates.level,
        badges: updates.badges,
        avatar: updates.avatar,
      })
      .eq('id', userId);

    if (error) throw error;
  },

  // Bubble operations
  async createBubble(bubbleData: Omit<Bubble, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('bubbles')
      .insert({
        name: bubbleData.name,
        description: bubbleData.description,
        is_private: bubbleData.isPrivate,
        invite_code: bubbleData.inviteCode,
        members: bubbleData.members,
        total_points: bubbleData.totalPoints,
        total_co2_saved: bubbleData.totalCO2Saved,
        created_by: bubbleData.createdBy,
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },

  async getBubble(bubbleId: string): Promise<Bubble | null> {
    const { data, error } = await supabase
      .from('bubbles')
      .select('*')
      .eq('id', bubbleId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      isPrivate: data.is_private,
      inviteCode: data.invite_code,
      members: data.members,
      totalPoints: data.total_points,
      totalCO2Saved: data.total_co2_saved,
      createdBy: data.created_by,
      createdAt: new Date(data.created_at),
    } as Bubble;
  },

  async joinBubble(bubbleId: string, userId: string) {
    // First get the current bubble
    const bubble = await this.getBubble(bubbleId);
    if (!bubble) throw new Error('Bubble not found');

    // Add user to members array if not already there
    if (!bubble.members.includes(userId)) {
      const { error } = await supabase
        .from('bubbles')
        .update({
          members: [...bubble.members, userId]
        })
        .eq('id', bubbleId);

      if (error) throw error;

      // Update user's bubble_id
      await this.updateUser(userId, { bubbleId });
    }
  },

  // Challenge operations
  async getActiveChallenge(): Promise<Challenge | null> {
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
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      co2Impact: data.co2_impact,
      points: data.points,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      isActive: data.is_active,
    } as Challenge;
  },

  async completeChallenge(completionData: Omit<ChallengeCompletion, 'id' | 'completedAt'>) {
    const { data, error } = await supabase
      .from('challenge_completions')
      .insert({
        user_id: completionData.userId,
        challenge_id: completionData.challengeId,
        bubble_id: completionData.bubbleId,
        photo: completionData.photo,
        comment: completionData.comment,
        points: completionData.points,
        co2_saved: completionData.co2Saved,
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },

  async getChallengeCompletions(bubbleId: string, challengeId: string): Promise<ChallengeCompletion[]> {
    const { data, error } = await supabase
      .from('challenge_completions')
      .select('*')
      .eq('bubble_id', bubbleId)
      .eq('challenge_id', challengeId)
      .order('completed_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      userId: item.user_id,
      challengeId: item.challenge_id,
      bubbleId: item.bubble_id,
      completedAt: new Date(item.completed_at),
      photo: item.photo,
      comment: item.comment,
      points: item.points,
      co2Saved: item.co2_saved,
    })) as ChallengeCompletion[];
  },

  // File upload (using Supabase Storage)
  async uploadImage(uri: string, path: string): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const { data, error } = await supabase.storage
        .from('challenge-photos')
        .upload(path, blob, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('challenge-photos')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};