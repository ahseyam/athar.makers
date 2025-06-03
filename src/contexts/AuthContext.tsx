
// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, type DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { Loader2 } from 'lucide-react';

export interface UserProfile extends DocumentData {
  uid: string;
  email: string | null;
  fullName?: string;
  role?: string;
  createdAt?: any; // Consider using Firestore Timestamp type if manipulating
  lastSignInTime?: string | null;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  initialLoadComplete: boolean;
  updateUserProfile: (updatedFields: Partial<UserProfile>) => void; // Added
  refreshUserProfile: () => Promise<void>; // Added for explicit refresh
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchUserProfile = async (firebaseUser: FirebaseUser) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    let userProfileData: UserProfile;

    if (userDocSnap.exists()) {
      const firestoreData = userDocSnap.data();
      userProfileData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: firestoreData.fullName,
        role: firestoreData.role,
        createdAt: firebaseUser.metadata.creationTime,
        lastSignInTime: firebaseUser.metadata.lastSignInTime,
        avatarUrl: firestoreData.avatarUrl || `https://avatar.iran.liara.run/public/boy?username=${firebaseUser.uid}`,
      };
    } else {
      // User exists in Auth but not in Firestore (should ideally not happen with proper signup)
      userProfileData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        createdAt: firebaseUser.metadata.creationTime,
        lastSignInTime: firebaseUser.metadata.lastSignInTime,
        avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${firebaseUser.uid}`,
      };
      console.warn("User profile not found in Firestore for UID:", firebaseUser.uid);
    }
    setUser(userProfileData);
    return userProfileData;
  };
  
  const refreshUserProfile = async () => {
    const currentFirebaseUser = auth.currentUser;
    if (currentFirebaseUser) {
      setLoading(true);
      await fetchUserProfile(currentFirebaseUser);
      setLoading(false);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      setInitialLoadComplete(true);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...updatedFields } : null);
  };

  if (loading && !initialLoadComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="ms-4 text-lg text-muted-foreground">جاري تحميل بيانات المستخدم...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, initialLoadComplete, updateUserProfile, refreshUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
