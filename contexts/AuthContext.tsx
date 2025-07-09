import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { SupabaseService } from '@/services/supabaseService';
import { User } from '@/types';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  authLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted.current) return;
      
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          let userData = await SupabaseService.getUser(firebaseUser.uid);
          
          // If user doesn't exist in Supabase, create them
          if (!userData) {
            userData = await SupabaseService.createUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email!,
              bubbleId: null,
              points: 0,
              level: 1,
              badges: []
            });
          }
          
          if (mounted.current) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        if (mounted.current) {
          setUser(null);
        }
      }
      
      if (mounted.current) {
        setLoading(false);
        setAuthLoading(false);
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Supabase
      await SupabaseService.createUser({
        id: userCredential.user.uid,
        name,
        email,
        bubbleId: null,
        points: 0,
        level: 1,
        badges: []
      });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const updateUserData = async (updates: Partial<User>) => {
    if (firebaseUser && user) {
      try {
        const updatedUser = await SupabaseService.updateUser(firebaseUser.uid, updates);
        setUser(updatedUser);
      } catch (error) {
        throw error;
      }
    }
  };

  const value = {
    firebaseUser,
    user,
    loading,
    authLoading,
    signIn,
    signUp,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}