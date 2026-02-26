import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Notification } from '../types';

export const notificationService = {
  async getAll(params?: {
    isRead?: boolean;
    type?: string;
  }): Promise<Notification[]> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const notificationsRef = collection(db, 'users', user.uid, 'notifications');
    let q = query(notificationsRef, orderBy('createdAt', 'desc'));

    if (params?.isRead !== undefined) {
      q = query(q, where('isRead', '==', params.isRead));
    }
    if (params?.type) {
      q = query(q, where('type', '==', params.type));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as unknown as Notification));
  },

  async markAsRead(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'notifications', id);
    await updateDoc(docRef, { isRead: true });
  },

  async markAllAsRead(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const notificationsRef = collection(db, 'users', user.uid, 'notifications');
    const q = query(notificationsRef, where('isRead', '==', false));
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);
    querySnapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { isRead: true });
    });

    await batch.commit();
  },

  async delete(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'notifications', id);
    await deleteDoc(docRef);
  },
};

