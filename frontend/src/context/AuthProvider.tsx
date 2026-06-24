import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/api';
import type{ User } from '../provider/AuthContext';
import { AuthContext } from '../provider/AuthContext';


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
                setLoading(false);
            }
        };
        fetchUser();
    }, []);  //don't put user in the dependency array, otherwise it will cause an infinite loop

    const clearUser=()=>{
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,setUser,loading,clearUser}}>
            {children}
        </AuthContext.Provider>
    )
}