import {
    collection,
    doc,
    setDoc,
    addDoc,
    writeBatch
} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { db, auth } from '../lib/firebase';

export const seedService = {
    async seedDemoData() {
        const user = auth.currentUser;
        if (!user) throw new Error("No user logged in to seed data for.");

        const batch = writeBatch(db);
        const userId = user.uid;

        // 1. Seed Dashboard Summary
        const summaryRef = doc(db, 'users', userId, 'summaries', '2025-2026');
        batch.set(summaryRef, {
            totalIncome: 1250000,
            totalDeductions: 250000,
            taxableIncome: 1000000,
            estimatedTax: 187500,
            gstPayable: 425000,
            refundEstimate: 25000,
            filingStatus: 'draft',
            financialYear: '2025-2026'
        });

        // 2. Seed Income Data
        const incomeRef = collection(db, 'users', userId, 'income');
        const sampleIncomes = [
            { sourceType: 'salary', amount: 800000, description: 'Annual Salary', financialYear: '2025-2026', createdAt: new Date().toISOString() },
            { sourceType: 'business', amount: 350000, description: 'Freelance Projects', financialYear: '2025-2026', createdAt: new Date().toISOString() },
            { sourceType: 'other', amount: 100000, description: 'Interest Income', financialYear: '2025-2026', createdAt: new Date().toISOString() }
        ];

        sampleIncomes.forEach(income => {
            const newDocRef = doc(incomeRef);
            batch.set(newDocRef, income);
        });

        // 3. Seed Deductions
        const deductionsRef = collection(db, 'users', userId, 'deductions');
        const sampleDeductions = [
            { sectionType: '80C', amount: 150000, description: 'PPF & LIC', financialYear: '2025-2026', createdAt: new Date().toISOString() },
            { sectionType: '80D', amount: 25000, description: 'Health Insurance', financialYear: '2025-2026', createdAt: new Date().toISOString() }
        ];

        sampleDeductions.forEach(deduction => {
            const newDocRef = doc(deductionsRef);
            batch.set(newDocRef, deduction);
        });

        // 4. Seed Notifications
        const notificationsRef = collection(db, 'users', userId, 'notifications');
        const sampleNotifications = [
            { title: 'Welcome to SmartTax', message: 'Your account has been successfully set up.', type: 'success', isRead: false, createdAt: new Date().toISOString() },
            { title: 'ITR Deadline', message: 'Don\'t forget to file your ITR by July 31st.', type: 'warning', isRead: false, createdAt: new Date().toISOString() }
        ];

        sampleNotifications.forEach(notif => {
            const newDocRef = doc(notificationsRef);
            batch.set(newDocRef, notif);
        });

        await batch.commit();
        console.log("Demo data seeded successfully!");
    },

    async createDemoUser() {
        const demoEmail = 'karishma@gmail.com';
        const demoPassword = 'password123';

        try {
            // Try to create the user, ignore if they already exist
            await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
        } catch (error: any) {
            if (error.code !== 'auth/email-already-in-use') {
                throw error;
            }
        }

        // Login
        await signInWithEmailAndPassword(auth, demoEmail, demoPassword);

        // Seed data
        await this.seedDemoData();
    }
};
