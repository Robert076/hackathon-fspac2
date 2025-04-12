'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, db } from './models';

interface AuthContextType {
    user: User | null;
    login: (email: string, name: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, name: string) => {
        // In a real app, you'd verify credentials with a backend
        const newUser = await db.createUser({ email, name, debts: [] });
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 