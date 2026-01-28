import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useUser, useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  jobTitle?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signIn, isLoaded: signInLoaded, setActive: setSignInActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signOut } = useClerk();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync Clerk user to local user state
  useEffect(() => {
    if (isLoaded && clerkUser) {
      const formattedUser: User = {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.username || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        avatar: clerkUser.imageUrl,
      };
      setUser(formattedUser);
      localStorage.setItem('webwhisper_user', JSON.stringify(formattedUser));
    } else if (isLoaded && !clerkUser) {
      setUser(null);
      localStorage.removeItem('webwhisper_user');
    }
  }, [clerkUser, isLoaded]);

  const login = useCallback(async (email: string, password: string) => {
    if (!signInLoaded || !signIn || !setSignInActive) {
      return { success: false, error: 'Sign in not ready' };
    }

    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        // Activate the session
        await setSignInActive({ session: result.createdSessionId });
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: 'Sign in incomplete' };
      }
    } catch (err: any) {
      setIsLoading(false);
      return {
        success: false,
        error: err?.errors?.[0]?.message || 'Invalid credentials'
      };
    }
  }, [signIn, signInLoaded, setSignInActive]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    if (!signUpLoaded || !signUp) {
      return { success: false, error: 'Sign up not ready' };
    }

    setIsLoading(true);

    try {
      // Split name into first and last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || name;
      const lastName = nameParts.slice(1).join(' ') || '';

      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Send email verification
      await result.prepareEmailAddressVerification({ strategy: 'email_code' });

      setIsLoading(false);
      // Return success to allow navigation to verification page
      return { success: true, needsVerification: true };
    } catch (err: any) {
      setIsLoading(false);
      return {
        success: false,
        error: err?.errors?.[0]?.message || 'Sign up failed'
      };
    }
  }, [signUp, signUpLoaded]);

  const logout = useCallback(() => {
    signOut();
    setUser(null);
    localStorage.removeItem('webwhisper_user');
  }, [signOut]);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('webwhisper_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading || !isLoaded,
        isAuthenticated: !!clerkUser,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
