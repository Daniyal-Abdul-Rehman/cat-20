import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Helper function to parse error messages
const parseErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  
  if (error?.message) {
    const message = error.message;
    
    // Handle MongoDB duplicate key errors
    if (message.includes('E11000 duplicate key error')) {
      if (message.includes('email')) return 'An account with this email already exists';
      if (message.includes('username')) return 'This username is already taken';
      return 'A record with this information already exists';
    }
    
    // Handle validation errors
    if (message.includes('validation')) return 'Please check your input and try again';
    
    // Handle network errors
    if (message.includes('fetch') || message.includes('network')) return 'Network error. Please check your connection';
    
    return message;
  }
  
  if (error?.error) return parseErrorMessage(error.error);
  
  return 'An unexpected error occurred. Please try again';
};

export interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  isEmailVerified?: boolean;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  subscriptionTier?: string;
  assessmentResults?: {
    completedAt: string;
    pattern: string;
    scores: Record<string, number>;
    archetype: string;
  };
}

interface AuthTokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  // Auth actions
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<{ user: User; tokens: AuthTokens }>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  checkAuth: () => void;
  refreshUserData: () => Promise<void>;
  
  // Password reset actions
  forgotPassword: (email: string) => Promise<void>;
  forgotPasswordOTP: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  resetPasswordWithOTP: (otp: string, newPassword: string) => Promise<void>;
  
  // Email verification actions
  sendVerificationEmail: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  
  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setSuccess: (success: string | null) => void;
  clearSuccess: () => void;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  (set, get) => ({
    // Initial state
    user: null,
    tokens: null,
    isLoading: false,
    error: null,
    success: null,
    isAuthenticated: false,

    // Auth actions
    register: async (name: string, email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        const authState = {
          user: {
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
            isEmailVerified: data.user.isEmailVerified,
            role: data.user.role,
            subscriptionTier: data.user.subscriptionTier,
            assessmentResults: data.user.assessmentResults,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            __v: data.user.__v,
          },
          tokens: data.tokens,
          isAuthenticated: true,
          isLoading: false,
        };
        set(authState);
        localStorage.setItem('auth-storage', JSON.stringify({ state: authState }));
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null, success: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login response data:', data);
        const authState = {
          user: {
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
            isEmailVerified: data.user.isEmailVerified,
            role: data.user.role,
            subscriptionTier: data.user.subscriptionTier,
            assessmentResults: data.user.assessmentResults,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            __v: data.user.__v,
          },
          tokens: data.tokens,
          isAuthenticated: true,
          isLoading: false,
          success: 'Login successful!',
        };
        set(authState);
        localStorage.setItem('auth-storage', JSON.stringify({ state: authState }));
        console.log('Auth state saved to localStorage');
        return data;
      } catch (error) {
        console.error('Login error:', error);
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    logout: async () => {
      const { tokens } = get();
      set({ isLoading: true, error: null });
      
      try {
        if (tokens?.refresh.token) {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: tokens.refresh.token }),
          });
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        localStorage.removeItem('auth-storage');
      }
    },

    refreshTokens: async () => {
      const { tokens } = get();
      if (!tokens?.refresh.token) {
        throw new Error('No refresh token available');
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh-tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: tokens.refresh.token }),
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        const data = await response.json();
        set({ tokens: data });
      } catch (error) {
        // If refresh fails, logout the user
        get().logout();
        throw error;
      }
    },

    // Password reset actions
    forgotPassword: async (email: string) => {
      set({ isLoading: true, error: null, success: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send reset email');
        }

        set({ isLoading: false, success: 'Password reset email sent successfully!' });
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    forgotPasswordOTP: async (email: string) => {
      set({ isLoading: true, error: null, success: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({ email }),
          });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send OTP');
        }

        set({ isLoading: false, success: 'OTP sent successfully to your email!' });
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    resetPassword: async (token: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password?token=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Password reset failed');
        }

        set({ isLoading: false });
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    resetPasswordWithOTP: async (otp: string, newPassword: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp, newPassword }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Password reset failed');
        }

        set({ isLoading: false });
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    // Email verification actions
    sendVerificationEmail: async () => {
      const { tokens } = get();
      if (!tokens?.access.token) {
        throw new Error('No access token available');
      }

      set({ isLoading: true, error: null, success: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/send-verification-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send verification email');
        }

        set({ isLoading: false, success: 'Verification email sent successfully!' });
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    verifyEmail: async (token: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Email verification failed');
        }

        // Update user verification status
        const { user } = get();
        if (user) {
          set({ user: { ...user, isEmailVerified: true, assessmentResults: user.assessmentResults }, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    resendVerificationEmail: async (email: string) => {
      set({ isLoading: true, error: null, success: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/resend-verification-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to resend verification email');
        }

        set({ isLoading: false, success: 'Verification email sent successfully!' });
      } catch (error) {
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },

    // State management
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setError: (error: string | null) => set({ error }),
    clearError: () => set({ error: null }),
    setSuccess: (success: string | null) => set({ success }),
    clearSuccess: () => set({ success: null }),
    setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
    setTokens: (tokens: AuthTokens | null) => set({ tokens }),
    checkAuth: () => {
      if (typeof window === 'undefined') return;
      
      const currentState = get();
      const storedUser = localStorage.getItem('auth-storage');
      console.log('Auth storage check:', storedUser);
      
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          console.log('Parsed auth storage:', parsed);
          
          // Only update state if it's different from current state
          if (parsed.state?.user && parsed.state?.tokens) {
            const needsUpdate = 
              !currentState.isAuthenticated ||
              !currentState.user ||
              !currentState.tokens ||
              JSON.stringify(currentState.user) !== JSON.stringify(parsed.state.user) ||
              JSON.stringify(currentState.tokens) !== JSON.stringify(parsed.state.tokens);
            
            if (needsUpdate) {
              set({
                user: parsed.state.user,
                tokens: parsed.state.tokens,
                isAuthenticated: parsed.state.isAuthenticated || true,
              });
              console.log('Auth state restored from localStorage');
            } else {
              console.log('Auth state already up to date, skipping update');
            }
          }
        } catch (error) {
          console.error('Failed to parse auth storage:', error);
        }
      }
    },

    refreshUserData: async () => {
      const { tokens } = get();
      if (!tokens?.access.token) {
        throw new Error('No access token available');
      }

      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokens.access.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        set({
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
            username: data.username,
            isEmailVerified: data.isEmailVerified,
            role: data.role,
            subscriptionTier: data.subscriptionTier,
            assessmentResults: data.assessmentResults,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            __v: data.__v,
          },
          isLoading: false,
        });
        
        // Update localStorage
        const currentState = get();
        localStorage.setItem('auth-storage', JSON.stringify({ state: currentState }));
      } catch (error) {
        console.error('Failed to refresh user data:', error);
        set({
          error: parseErrorMessage(error),
          isLoading: false,
        });
        throw error;
      }
    },
  })
);