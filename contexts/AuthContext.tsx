import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { FirebaseService } from '@/services/firebaseService';
import { User } from '@/types';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
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
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted.current) return;
      
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const userData = await FirebaseService.getUser(firebaseUser.uid);
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
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document
      await FirebaseService.createUser({
        name,
        email,
        bubbleId: '',
        points: 0,
        level: 1,
        badges: []
      });
    } catch (error) {
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
        await FirebaseService.updateUser(firebaseUser.uid, updates);
        setUser({ ...user, ...updates });
      } catch (error) {
        throw error;
      }
    }
  };

  const value = {
    firebaseUser,
    user,
    loading,
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