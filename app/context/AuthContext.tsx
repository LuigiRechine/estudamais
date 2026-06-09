'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Professor {
  id: number;
  nome: string;      // ← Use "nome" para combinar com o dashboard
  email: string;
}

interface AuthContextType {
  professor: Professor | null;
  login: (professorData: Professor) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [professor, setProfessor] = useState<Professor | null>(null);

  useEffect(() => {
    // Recupera do localStorage (ou cookies)
    const stored = localStorage.getItem('professor');
    if (stored) {
      setProfessor(JSON.parse(stored));
    }
  }, []);

  const login = (professorData: Professor) => {
    setProfessor(professorData);
    localStorage.setItem('professor', JSON.stringify(professorData));
  };

  const logout = () => {
    setProfessor(null);
    localStorage.removeItem('professor');
  };

  return (
    <AuthContext.Provider value={{ professor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};