import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi } from './api';
import * as SessionStorage from './session-storage';

// Define the shape of the context value
interface AuthContextValue {
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  user?: { _id: string; email: string; role: 'student' | 'teacher' } | null;
  isLoading: boolean;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Create the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextValue['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionToken = await SessionStorage.getSession();
        if (sessionToken) {
          setSession(sessionToken);
        }
        const userData = await SessionStorage.getUser();
        if (userData) setUser(userData);
      } catch (e) {
        console.error('Failed to load session', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const authContextValue: AuthContextValue = {
    signIn: async (data: { email: string; password: string }) => {
      try {
        const { token, user } = await loginApi(data);
        await SessionStorage.saveSession(token);
        if (user) {
          console.log('Saving user:', user);
          await SessionStorage.saveUser(user);
          setUser(user);
        } else {
          console.warn('No user data received from loginApi');
        }
        setSession(token);
      } catch (error) {
        throw error; // Re-throw the error to be handled by the UI
      }
    },
    signOut: async () => {
      await SessionStorage.deleteSession();
      await SessionStorage.deleteUser();
      setSession(null);
      setUser(null);
    },
    session,
    user,
    isLoading,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

// Create a custom hook to consume the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};