import React, { createContext, useContext, useState } from 'react';

type UserRole = 'citizen' | 'admin' | null;

interface AuthContextType {
  role: UserRole;
  isAuthenticated: boolean;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
  userName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');

  const login = (userRole: UserRole, name: string) => {
    setRole(userRole);
    setUserName(name);
  };

  const logout = () => {
    setRole(null);
    setUserName('');
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated: !!role,
        login,
        logout,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
