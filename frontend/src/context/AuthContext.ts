import { createContext } from 'react';
export interface User {
    fullName: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    clearUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

