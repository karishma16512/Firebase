import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    User as FirebaseUser,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
    user: FirebaseUser | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        await firebaseSignOut(auth);
    };

    const value = {
        user,
        loading,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
