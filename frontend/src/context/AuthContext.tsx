import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/api';

interface User {
    fullName: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchCurrentUser();  
                setUser(response.user);
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    )
}