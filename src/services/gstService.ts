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
import { GST } from '../types';

export const gstService = {
  async create(data: {
    gstin: string;
    outwardSupplies: number;
    inwardSupplies: number;
    returnPeriod: string;
    financialYear: string;
  }): Promise<GST> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const gstRef = collection(db, 'users', user.uid, 'gst');
    const docData = {
      ...data,
      gstPayable: Math.max(0, (data.outwardSupplies - data.inwardSupplies) * 0.18), // Example calculation
      returnStatus: 'pending' as const,
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(gstRef, docData);

    return { _id: docRef.id, ...docData } as unknown as GST;
  },

  async getAll(params?: {
    financialYear?: string;
    returnStatus?: string;
  }): Promise<GST[]> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const gstRef = collection(db, 'users', user.uid, 'gst');
    let q = query(gstRef);

    if (params?.financialYear) {
      q = query(q, where('financialYear', '==', params.financialYear));
    }
    if (params?.returnStatus) {
      q = query(q, where('returnStatus', '==', params.returnStatus));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as unknown as GST));
  },

  async getById(id: string): Promise<GST> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'gst', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("GST record not found");
    return { _id: docSnap.id, ...docSnap.data() } as unknown as GST;
  },

  async update(id: string, data: Partial<GST>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'gst', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'gst', id);
    await deleteDoc(docRef);
  },
};

