import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and validate it
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // For hardcoded credentials, we can just check if the token is our specific one
      if (token === 'valid-token-for-deepak') {
        setUser({
          _id: 'user123',
          email: 'deepak@skct.edu.in',
          name: 'Deepak'
        });
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Check for the specific hardcoded credentials
      if (email === 'deepak@skct.edu.in' && password === '12345') {
        // Create a hardcoded token and user object
        const token = 'valid-token-for-deepak';
        const userData = {
          _id: 'user123',
          email: 'deepak@skct.edu.in',
          name: 'Deepak'
        };
        
        localStorage.setItem('token', token);
        setUser(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}