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
import { Deduction } from '../types';

export const deductionService = {
  async create(data: {
    sectionType: string;
    amount: number;
    description?: string;
    financialYear: string;
  }): Promise<Deduction> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const deductionRef = collection(db, 'users', user.uid, 'deductions');
    const docData = {
      ...data,
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(deductionRef, docData);

    return { _id: docRef.id, ...docData } as unknown as Deduction;
  },

  async getAll(params?: {
    financialYear?: string;
    sectionType?: string;
  }): Promise<Deduction[]> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const deductionRef = collection(db, 'users', user.uid, 'deductions');
    let q = query(deductionRef);

    if (params?.financialYear) {
      q = query(q, where('financialYear', '==', params.financialYear));
    }
    if (params?.sectionType) {
      q = query(q, where('sectionType', '==', params.sectionType));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as unknown as Deduction));
  },

  async getById(id: string): Promise<Deduction> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'deductions', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Deduction record not found");
    return { _id: docSnap.id, ...docSnap.data() } as unknown as Deduction;
  },

  async update(id: string, data: Partial<Deduction>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'deductions', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'deductions', id);
    await deleteDoc(docRef);
  },
};

