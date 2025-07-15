import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi } from './api';
import * as SessionStorage from './session-storage';

// Define the shape of the context value
interface AuthContextValue {
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Create the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionToken = await SessionStorage.getSession();
        if (sessionToken) {
          setSession(sessionToken);
        }
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
        const sessionToken = await loginApi(data);
        await SessionStorage.saveSession(sessionToken);
        setSession(sessionToken);
      } catch (error) {
        throw error; // Re-throw the error to be handled by the UI
      }
    },
    signOut: async () => {
      await SessionStorage.deleteSession();
      setSession(null);
    },
    session,
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