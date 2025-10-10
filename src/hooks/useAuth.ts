import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user';
import { api } from '@/lib/api';

/**
 * Custom hook for authentication
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Verify token and get user data
          const userData = await api.auth.me();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.auth.login({ email, password });
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  }, []);

  // Register function
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const response = await api.auth.register({ name, email, password });
        localStorage.setItem('auth_token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.response?.data?.message || 'Registration failed',
        };
      }
    },
    []
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      const updatedUser = await api.user.updateProfile(data);
      setUser(updatedUser);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Profile update failed',
      };
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };
}

