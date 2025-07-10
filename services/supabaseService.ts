import { supabase } from '@/config/supabase';
import { Platform } from 'react-native';
import { User, Bubble, Challenge, ChallengeCompletion, UserBubble } from '@/types';

export const SupabaseService = {
  // Auth operations
  async signUp(email: string, password: string, name: string) {
    try {
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
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('SignOut error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async createUserProfile(userId: string, email: string, name: string) {
    const { error } = await supabase
      .from('users')
      .insert({
        id: userId,
        name,
        email,
        points: 0,
        level: 1,
        badges: [],
      });

    if (error) throw error;
  },

  // User operations
  async getUser(userId: string): Promise<User | null> {
    try {
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
        activeBubbleId: data.bubble_id,
        createdAt: new Date(data.created_at),
      } as User;
    } catch (error) {
      console.error('GetUser error:', error);
      throw error;
    }
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        bubble_id: updates.activeBubbleId,
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
      inviteCode: data.invite_code,
      members: data.members,
      totalPoints: data.total_points,
      totalCO2Saved: data.total_co2_saved,
      createdBy: data.created_by,
      createdAt: new Date(data.created_at),
    } as Bubble;
  },

  async getBubbleByInviteCode(inviteCode: string): Promise<Bubble | null> {
    const { data, error } = await supabase
      .from('bubbles')
      .select('*')
      .eq('invite_code', inviteCode.toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      inviteCode: data.invite_code,
      members: data.members,
      totalPoints: data.total_points,
      totalCO2Saved: data.total_co2_saved,
      createdBy: data.created_by,
      createdAt: new Date(data.created_at),
    } as Bubble;
  },

  async getUserBubbles(userId: string): Promise<UserBubble[]> {
    try {
      const { data, error } = await supabase
        .from('user_bubbles')
        .select('*')
        .eq('user_id', userId)
        .order('joined_at', { ascending: false });

      if (error) throw error;

      return data.map(item => ({
        id: item.id,
        userId: item.user_id,
        bubbleId: item.bubble_id,
        joinedAt: new Date(item.joined_at),
        role: item.role,
        points: item.points,
        co2Saved: item.co2_saved,
      })) as UserBubble[];
    } catch (error) {
      console.error('GetUserBubbles error:', error);
      // Return empty array instead of crashing
      return [];
    }
  },

  async joinBubble(bubbleId: string, userId: string) {
    // First check if user is already a member
    const { data: existingMembership } = await supabase
      .from('user_bubbles')
      .select('id')
      .eq('user_id', userId)
      .eq('bubble_id', bubbleId)
      .single();

    if (existingMembership) {
      throw new Error('You are already a member of this bubble');
    }

    // Add user to user_bubbles table
    const { error: membershipError } = await supabase
      .from('user_bubbles')
      .insert({
        user_id: userId,
        bubble_id: bubbleId,
        role: 'member',
        points: 0,
        co2_saved: 0,
      });

    if (membershipError) throw membershipError;

    // Update bubble members array
    const bubble = await this.getBubble(bubbleId);
    if (!bubble) throw new Error('Bubble not found');

    if (!bubble.members.includes(userId)) {
      const { error } = await supabase
        .from('bubbles')
        .update({
          members: [...bubble.members, userId]
        })
        .eq('id', bubbleId);

      if (error) throw error;
    }

    // Set as active bubble if user doesn't have one
    const user = await this.getUser(userId);
    if (user && !user.activeBubbleId) {
      await this.updateUser(userId, { activeBubbleId: bubbleId });
    }
  },

  async leaveBubble(bubbleId: string, userId: string) {
    // Remove from user_bubbles
    const { error: membershipError } = await supabase
      .from('user_bubbles')
      .delete()
      .eq('user_id', userId)
      .eq('bubble_id', bubbleId);

    if (membershipError) throw membershipError;

    // Update bubble members array
    const bubble = await this.getBubble(bubbleId);
    if (bubble) {
      const { error } = await supabase
        .from('bubbles')
        .update({
          members: bubble.members.filter(id => id !== userId)
        })
        .eq('id', bubbleId);

      if (error) throw error;
    }

    // If this was the active bubble, switch to another one or clear it
    const user = await this.getUser(userId);
    if (user && user.activeBubbleId === bubbleId) {
      const userBubbles = await this.getUserBubbles(userId);
      const newActiveBubbleId = userBubbles.length > 0 ? userBubbles[0].bubbleId : undefined;
      await this.updateUser(userId, { activeBubbleId: newActiveBubbleId });
    }
  },

  async switchActiveBubble(userId: string, bubbleId: string) {
    await this.updateUser(userId, { activeBubbleId: bubbleId });
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

  async getUserChallengeHistory(userId: string, bubbleId?: string): Promise<ChallengeCompletion[]> {
    let query = supabase
      .from('challenge_completions')
      .select('*')
      .eq('user_id', userId);

    if (bubbleId) {
      query = query.eq('bubble_id', bubbleId);
    }

    const { data, error } = await query.order('completed_at', { ascending: false });

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