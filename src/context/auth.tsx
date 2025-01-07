'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  age: number;
}

interface AuthContextType {
  isAuthenticated: string;
  user: User | null;

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tokenfauth`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData.user);
        setIsAuthenticated("true");
      } else if (res.status === 401) {
        // Tratar erro 401 silenciosamente
        setIsAuthenticated("false");
        setUser(null);
      } else {
        setIsAuthenticated("false");
        setUser(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro no checkAuth:', error.message);
      }
      setIsAuthenticated("false");
      setUser(null);
    }
  };

  // Functional case
  // useEffect(() => {
  //   checkAuth();
  //   const interval = setInterval(checkAuth, 1000 * 60 * 0.02); // 1.0 segundos
  //   return () => clearInterval(interval);
  // }, []);

  // Case that should work aff
  useEffect(() => {
    checkAuth();
  },[])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }
  return context;
};
