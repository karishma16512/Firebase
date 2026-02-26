import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { User } from '../types';

export const authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    role: 'individual' | 'sme';
    phone?: string;
  }): Promise<any> {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await updateProfile(userCredential.user, {
      displayName: data.name
    });
    // In a full-scale app, you'd store additional info (role, phone) in Firestore
    return userCredential.user;
  },

  async login(email: string, password: string): Promise<any> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logout(): Promise<void> {
    await firebaseSignOut(auth);
  },

  async getProfile(): Promise<any> {
    return auth.currentUser;
  },

  getCurrentUser(): any {
    return auth.currentUser;
  },

  isAuthenticated(): boolean {
    return !!auth.currentUser;
  },
};

