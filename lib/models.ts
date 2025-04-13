import { Debt } from '@/types';

export interface User {
    id: string;
    email: string;
    name: string;
    debts: Debt[];
}

// This is a simple in-memory database for demonstration
// In a real app, you'd use a proper database like MongoDB, PostgreSQL, etc.
export const db = {
    users: new Map<string, User>(),
    
    async getUser(userId: string): Promise<User | undefined> {
        return this.users.get(userId);
    },
    
    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const id = Math.random().toString(36).substring(7);
        const newUser = { ...user, id };
        this.users.set(id, newUser);
        return newUser;
    },
    
    async updateUserDebts(userId: string, debts: Debt[]): Promise<void> {
        const user = this.users.get(userId);
        if (user) {
            this.users.set(userId, { ...user, debts });
        }
    }
}; 