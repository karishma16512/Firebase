import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Income, PaginatedResponse } from '../types';

export const incomeService = {
  async create(data: {
    sourceType: string;
    amount: number;
    description?: string;
    financialYear: string;
  }): Promise<Income> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const incomeRef = collection(db, 'users', user.uid, 'income');
    const docData = {
      ...data,
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(incomeRef, docData);

    return { _id: docRef.id, ...docData } as unknown as Income;
  },

  async getAll(params?: {
    financialYear?: string;
    sourceType?: string;
  }): Promise<Income[]> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const incomeRef = collection(db, 'users', user.uid, 'income');
    let q = query(incomeRef);

    if (params?.financialYear) {
      q = query(q, where('financialYear', '==', params.financialYear));
    }
    if (params?.sourceType) {
      q = query(q, where('sourceType', '==', params.sourceType));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as unknown as Income));
  },

  async getById(id: string): Promise<Income> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'income', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Income record not found");
    return { _id: docSnap.id, ...docSnap.data() } as unknown as Income;
  },


  async update(id: string, data: Partial<Income>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'income', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'income', id);
    await deleteDoc(docRef);
  },
};

