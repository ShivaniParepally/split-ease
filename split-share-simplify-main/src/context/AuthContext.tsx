
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api, { UserData } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await api.auth.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login({ email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.auth.register({ name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!user, 
      user, 
      loading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
