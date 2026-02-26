import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { TaxReturn } from '../types';

export const taxReturnService = {
  async create(data: {
    financialYear: string;
    taxPaid?: number;
  }): Promise<TaxReturn> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const returnsRef = collection(db, 'users', user.uid, 'taxReturns');
    const docData: Partial<TaxReturn> = {
      financialYear: data.financialYear,
      taxPaid: data.taxPaid || 0,
      totalIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      estimatedTax: 0,
      refundAmount: 0,
      filingStatus: 'draft',
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(returnsRef, docData);

    return { _id: docRef.id, ...docData } as unknown as TaxReturn;
  },

  async getAll(params?: {
    financialYear?: string;
    filingStatus?: string;
  }): Promise<TaxReturn[]> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const returnsRef = collection(db, 'users', user.uid, 'taxReturns');
    let q = query(returnsRef);

    if (params?.financialYear) {
      q = query(q, where('financialYear', '==', params.financialYear));
    }
    if (params?.filingStatus) {
      q = query(q, where('filingStatus', '==', params.filingStatus));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as unknown as TaxReturn));
  },

  async getById(id: string): Promise<TaxReturn> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'taxReturns', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Tax return record not found");
    return { _id: docSnap.id, ...docSnap.data() } as unknown as TaxReturn;
  },

  async update(id: string, data: Partial<TaxReturn>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'taxReturns', id);
    await updateDoc(docRef, data);
  },

  async submit(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, 'users', user.uid, 'taxReturns', id);
    await updateDoc(docRef, {
      filingStatus: 'submitted',
      filedDate: new Date().toISOString(),
      acknowledgementNumber: `ACK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
  },

  async downloadPDF(id: string): Promise<Blob> {
    // In a real Firebase app, this would probably be a Cloud Function that generates a PDF
    // or we fetch a pre-generated PDF from Firebase Storage.
    // For now, let's return a dummy blob.
    return new Blob(['Tax Return PDF Content'], { type: 'application/pdf' });
  },
};

