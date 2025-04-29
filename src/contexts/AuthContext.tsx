
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService, User } from '../services/authService';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for existing user on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
  
  const login = (email: string, password: string): boolean => {
    const success = authService.login(email, password);
    if (success) {
      setUser(authService.getCurrentUser());
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    return success;
  };
  
  const register = (email: string, password: string, name: string): boolean => {
    const success = authService.register(email, password, name);
    if (success) {
      setUser(authService.getCurrentUser());
      toast({
        title: "Registration successful",
        description: "Welcome to our store!",
      });
    } else {
      toast({
        title: "Registration failed",
        description: "Email already exists",
        variant: "destructive",
      });
    }
    return success;
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
