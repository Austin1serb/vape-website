import React from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    logout: (attempt?: number) => Promise<void>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    deleteUser: () => Promise<void>;
    customerId: string | null;
    setCustomerId: React.Dispatch<React.SetStateAction<string | null>>;
    isAdmin: boolean;
  }
  
  const AuthContext = React.createContext<AuthContextType | null>(null);

export default AuthContext;
