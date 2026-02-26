import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { DashboardSummary, ChartData } from '../types';

export const dashboardService = {
  async getSummary(financialYear: string): Promise<DashboardSummary | null> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const summaryRef = doc(db, 'users', user.uid, 'summaries', financialYear);
    const summarySnap = await getDoc(summaryRef);

    if (summarySnap.exists()) {
      return summarySnap.data() as DashboardSummary;
    }
    return null;
  },

  async getChartData(financialYear: string): Promise<ChartData[]> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const chartsRef = collection(db, 'users', user.uid, 'charts');
    const q = query(chartsRef, where('financialYear', '==', financialYear));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as ChartData);
  },
};

