import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { Platform } from 'react-native';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/config/supabase';
import { SupabaseService } from '@/services/supabaseService';
import { User, UserBubble } from '@/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userBubbles: UserBubble[];
  loading: boolean;
  authLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (updates: Partial<User>) => Promise<void>;
  refreshUserBubbles: () => Promise<void>;
  switchActiveBubble: (bubbleId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userBubbles, setUserBubbles] = useState<UserBubble[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    
    // Get initial session with error handling
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          setAuthLoading(false);
          return;
        }
        
        if (mounted.current) {
          setSession(session);
          if (session?.user) {
            await loadUserData(session.user.id);
          } else {
            setAuthLoading(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted.current) {
          setAuthLoading(false);
        }
      }
    };
    
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted.current) return;
        
        // Handle refresh token errors by clearing invalid session
        if (event === 'TOKEN_REFRESHED') {
          // Token was successfully refreshed, continue normally
        } else if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESH_ERROR') {
          // Clear invalid session data
          setSession(null);
          setUser(null);
          setUserBubbles([]);
          setAuthLoading(false);
          return;
        }
        
        setSession(session);
        
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setUser(null);
          setUserBubbles([]);
          setAuthLoading(false);
        }
      }
    );

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout loading user data')), 15000);
      });
      
      const loadPromise = async () => {
        // Add a small delay on iOS to prevent race conditions
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Load user data first, then bubbles to avoid race conditions
        const userData = await SupabaseService.getUser(userId);
        const bubbles = await SupabaseService.getUserBubbles(userId);
        
        return { userData, bubbles };
      };
      
      const { userData, bubbles } = await Promise.race([
        loadPromise(),
        timeoutPromise
      ]) as { userData: any, bubbles: any[] };
      
      if (mounted.current) {
        setUser(userData);
        setUserBubbles(bubbles);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Don't crash the app on auth errors - set safe defaults
      if (mounted.current) {
        setUser(null);
        setUserBubbles([]);
      }
    } finally {
      if (mounted.current) {
        setAuthLoading(false);
      }
    }
  };

  const refreshUserBubbles = async () => {
    if (user) {
      try {
        const bubbles = await SupabaseService.getUserBubbles(user.id);
        setUserBubbles(bubbles);
      } catch (error) {
        console.error('Error refreshing user bubbles:', error);
      }
    }
  };

  const switchActiveBubble = async (bubbleId: string) => {
    if (user) {
      try {
        await SupabaseService.switchActiveBubble(user.id, bubbleId);
        setUser({ ...user, activeBubbleId: bubbleId });
      } catch (error) {
        console.error('Error switching active bubble:', error);
        throw error;
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await SupabaseService.signIn(email, password);
      if (!result) {
        throw new Error('Sign in failed');
      }
    } catch (error) {
      console.error('SignIn error in context:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const result = await SupabaseService.signUp(email, password, name);
      if (!result) {
        throw new Error('Sign up failed');
      }
    } catch (error) {
      console.error('SignUp error in context:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await SupabaseService.signOut();
      // Clear state immediately
      setSession(null);
      setUser(null);
      setUserBubbles([]);
    } catch (error) {
      console.error('Logout error in context:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (updates: Partial<User>) => {
    if (session?.user && user) {
      try {
        // Update the database
        await SupabaseService.updateUser(session.user.id, updates);
        // Update the local context immediately
        setUser({ ...user, ...updates });
      } catch (error) {
        throw error;
      }
    }
  };

  const value = {
    session,
    user,
    userBubbles,
    loading,
    authLoading,
    signIn,
    signUp,
    logout,
    updateUserData,
    refreshUserBubbles,
    switchActiveBubble
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}