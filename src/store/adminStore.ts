import { create } from 'zustand';
import { User, useAuthStore } from './authStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Helper function to get auth token from authStore
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const authStore = useAuthStore.getState();
    const token = authStore.tokens?.access?.token;
    
    if (token) {
      console.log('[adminStore] Token found in authStore');
      return token;
    }
    
    // Fallback to localStorage if authStore doesn't have token yet
    const storedAuth = localStorage.getItem('auth-storage');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      const storedToken = parsed.state?.tokens?.access?.token;
      if (storedToken) {
        console.log('[adminStore] Token found in localStorage');
        return storedToken;
      }
    }
  } catch (error) {
    console.error('[adminStore] Failed to get token:', error);
  }
  
  console.warn('[adminStore] No token found in authStore or localStorage');
  return null;
};

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  if (!token) {
    console.error('[adminStore] No authentication token available for', endpoint);
  }

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    console.log(`[adminStore] Making request to ${endpoint}`, { hasToken: !!token });
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      console.error(`[adminStore] API error ${response.status}:`, error);
      
      // Handle 401 by logging out
      if (response.status === 401) {
        console.warn('[adminStore] Received 401, clearing auth state');
        useAuthStore.getState().setTokens(null);
        useAuthStore.getState().setUser(null);
      }
      
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[adminStore] API request failed:', error);
    throw error;
  }
}

// Types
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalSubscriptions: number;
  totalRevenue: number;
}

interface Question {
  _id: string;
  id: number;
  text: string;
  minValue: number;
  maxValue: number;
  category?: string;
  order: number;
  isActive: boolean;
  answers: { value: string; text: string; scores: Record<string, number> }[];
}

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  isActive: boolean;
  order: number;
  stripePriceId?: string;
}

interface Subscription {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  package: {
    _id: string;
    name: string;
    price: number;
    features: string[];
  };
  status: string;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
}

interface UserProfile {
  _id: string;
  user: User;
  assessmentResults?: {
    completedAt: string;
    pattern: string;
    scores: Record<string, number>;
    archetype: string;
  };
}

interface Payment {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  assessmentId?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
}

interface PaymentStats {
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalRevenue: number;
}

interface RevenueStats {
  totalRevenue: number;
  revenueByMonth: Array<{
    _id: { year: number; month: number };
    total: number;
    count: number;
  }>;
  recentPayments: Payment[];
}

// Admin Store State
interface AdminState {
  // Dashboard
  dashboardStats: DashboardStats | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  // Users
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
  usersTotal: number;
  usersPage: number;
  usersTotalPages: number;

  // Questions
  questions: Question[];
  questionsLoading: boolean;
  questionsError: string | null;

  // Packages
  packages: Package[];
  packagesLoading: boolean;
  packagesError: string | null;

  // Subscriptions
  subscriptions: Subscription[];
  subscriptionsLoading: boolean;
  subscriptionsError: string | null;
  subscriptionsTotal: number;
  subscriptionsPage: number;
  subscriptionsTotalPages: number;

  // Profiles
  profiles: UserProfile[];
  profilesLoading: boolean;
  profilesError: string | null;

  // Payments
  payments: Payment[];
  paymentsLoading: boolean;
  paymentsError: string | null;
  paymentsTotal: number;
  paymentsPage: number;
  paymentsTotalPages: number;

  // Revenue Stats
  revenueStats: RevenueStats | null;
  revenueStatsLoading: boolean;
  revenueStatsError: string | null;

  // Payment Stats
  paymentStats: PaymentStats | null;
  paymentStatsLoading: boolean;
  paymentStatsError: string | null;
}

// Admin Store Actions
interface AdminActions {
  // Dashboard actions
  fetchDashboardStats: () => Promise<void>;

  // User actions
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  updateUserRole: (id: string, role: 'user' | 'admin') => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  // Question actions
  fetchQuestions: () => Promise<void>;
  createQuestion: (data: Partial<Question>) => Promise<void>;
  updateQuestion: (id: string, data: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;

  // Package actions
  fetchPackages: () => Promise<void>;
  createPackage: (data: Partial<Package>) => Promise<void>;
  updatePackage: (id: string, data: Partial<Package>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;

  // Subscription actions
  fetchSubscriptions: (page?: number, limit?: number) => Promise<void>;
  cancelSubscription: (id: string) => Promise<void>;

  // Profile actions
  fetchProfiles: () => Promise<void>;

  // Payment actions
  fetchPayments: (page?: number, limit?: number) => Promise<void>;
  fetchRevenueStats: () => Promise<void>;
  fetchPaymentStats: () => Promise<void>;

  // Clear errors
  clearDashboardError: () => void;
  clearUsersError: () => void;
  clearQuestionsError: () => void;
  clearPackagesError: () => void;
  clearSubscriptionsError: () => void;
  clearProfilesError: () => void;
  clearPaymentsError: () => void;
  clearRevenueStatsError: () => void;
  clearPaymentStatsError: () => void;
}

type AdminStore = AdminState & AdminActions;

export const useAdminStore = create<AdminStore>((set, get) => ({
  // Initial state
  dashboardStats: null,
  dashboardLoading: false,
  dashboardError: null,

  users: [],
  usersLoading: false,
  usersError: null,
  usersTotal: 0,
  usersPage: 1,
  usersTotalPages: 1,

  questions: [],
  questionsLoading: false,
  questionsError: null,

  packages: [],
  packagesLoading: false,
  packagesError: null,

  subscriptions: [],
  subscriptionsLoading: false,
  subscriptionsError: null,
  subscriptionsTotal: 0,
  subscriptionsPage: 1,
  subscriptionsTotalPages: 1,

  profiles: [],
  profilesLoading: false,
  profilesError: null,

  // Payments
  payments: [],
  paymentsLoading: false,
  paymentsError: null,
  paymentsTotal: 0,
  paymentsPage: 1,
  paymentsTotalPages: 1,

  // Revenue Stats
  revenueStats: null,
  revenueStatsLoading: false,
  revenueStatsError: null,

  // Payment Stats
  paymentStats: null,
  paymentStatsLoading: false,
  paymentStatsError: null,

  // Dashboard actions
  fetchDashboardStats: async () => {
    set({ dashboardLoading: true, dashboardError: null });
    try {
      const stats = await apiRequest<DashboardStats>('/admin/dashboard/stats');
      set({ dashboardStats: stats, dashboardLoading: false });
    } catch (error) {
      set({
        dashboardError: error instanceof Error ? error.message : 'Failed to fetch dashboard stats',
        dashboardLoading: false,
      });
    }
  },

  // User actions
  fetchUsers: async (page = 1, limit = 10) => {
    set({ usersLoading: true, usersError: null });
    try {
      const response = await apiRequest<{ users: User[]; total: number; page: number; totalPages: number }>(
        `/admin/users?page=${page}&limit=${limit}`
      );
      set({
        users: response.users,
        usersTotal: response.total,
        usersPage: response.page,
        usersTotalPages: response.totalPages,
        usersLoading: false,
      });
    } catch (error) {
      set({
        usersError: error instanceof Error ? error.message : 'Failed to fetch users',
        usersLoading: false,
      });
    }
  },

  updateUserRole: async (id: string, role: 'user' | 'admin') => {
    try {
      await apiRequest(`/admin/users/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      });
      // Refresh users list
      get().fetchUsers(get().usersPage);
    } catch (error) {
      set({
        usersError: error instanceof Error ? error.message : 'Failed to update user role',
      });
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      await apiRequest(`/admin/users/${id}`, { method: 'DELETE' });
      // Refresh users list
      get().fetchUsers(get().usersPage);
    } catch (error) {
      set({
        usersError: error instanceof Error ? error.message : 'Failed to delete user',
      });
      throw error;
    }
  },

  // Question actions
  fetchQuestions: async () => {
    set({ questionsLoading: true, questionsError: null });
    try {
      const questions = await apiRequest<Question[]>('/admin/questions');
      set({ questions, questionsLoading: false });
    } catch (error) {
      set({
        questionsError: error instanceof Error ? error.message : 'Failed to fetch questions',
        questionsLoading: false,
      });
    }
  },

  createQuestion: async (data: Partial<Question>) => {
    try {
      await apiRequest('/admin/questions', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      // Refresh questions list
      get().fetchQuestions();
    } catch (error) {
      set({
        questionsError: error instanceof Error ? error.message : 'Failed to create question',
      });
      throw error;
    }
  },

  updateQuestion: async (id: string, data: Partial<Question>) => {
    try {
      await apiRequest(`/admin/questions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      // Refresh questions list
      get().fetchQuestions();
    } catch (error) {
      set({
        questionsError: error instanceof Error ? error.message : 'Failed to update question',
      });
      throw error;
    }
  },

  deleteQuestion: async (id: string) => {
    try {
      await apiRequest(`/admin/questions/${id}`, { method: 'DELETE' });
      // Refresh questions list
      get().fetchQuestions();
    } catch (error) {
      set({
        questionsError: error instanceof Error ? error.message : 'Failed to delete question',
      });
      throw error;
    }
  },

  // Package actions
  fetchPackages: async () => {
    set({ packagesLoading: true, packagesError: null });
    try {
      const packages = await apiRequest<Package[]>('/admin/packages');
      set({ packages, packagesLoading: false });
    } catch (error) {
      set({
        packagesError: error instanceof Error ? error.message : 'Failed to fetch packages',
        packagesLoading: false,
      });
    }
  },

  createPackage: async (data: Partial<Package>) => {
    try {
      await apiRequest('/admin/packages', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      // Refresh packages list
      get().fetchPackages();
    } catch (error) {
      set({
        packagesError: error instanceof Error ? error.message : 'Failed to create package',
      });
      throw error;
    }
  },

  updatePackage: async (id: string, data: Partial<Package>) => {
    try {
      await apiRequest(`/admin/packages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      // Refresh packages list
      get().fetchPackages();
    } catch (error) {
      set({
        packagesError: error instanceof Error ? error.message : 'Failed to update package',
      });
      throw error;
    }
  },

  deletePackage: async (id: string) => {
    try {
      await apiRequest(`/admin/packages/${id}`, { method: 'DELETE' });
      // Refresh packages list
      get().fetchPackages();
    } catch (error) {
      set({
        packagesError: error instanceof Error ? error.message : 'Failed to delete package',
      });
      throw error;
    }
  },

  // Subscription actions
  fetchSubscriptions: async (page = 1, limit = 10) => {
    set({ subscriptionsLoading: true, subscriptionsError: null });
    try {
      const response = await apiRequest<{
        subscriptions: Subscription[];
        total: number;
        page: number;
        totalPages: number;
      }>(`/admin/subscriptions?page=${page}&limit=${limit}`);
      set({
        subscriptions: response.subscriptions,
        subscriptionsTotal: response.total,
        subscriptionsPage: response.page,
        subscriptionsTotalPages: response.totalPages,
        subscriptionsLoading: false,
      });
    } catch (error) {
      set({
        subscriptionsError: error instanceof Error ? error.message : 'Failed to fetch subscriptions',
        subscriptionsLoading: false,
      });
    }
  },

  cancelSubscription: async (id: string) => {
    try {
      await apiRequest(`/admin/subscriptions/${id}/cancel`, { method: 'PUT' });
      // Refresh subscriptions list
      get().fetchSubscriptions(get().subscriptionsPage);
    } catch (error) {
      set({
        subscriptionsError: error instanceof Error ? error.message : 'Failed to cancel subscription',
      });
      throw error;
    }
  },

  // Profile actions
  fetchProfiles: async () => {
    set({ profilesLoading: true, profilesError: null });
    try {
      // For now, fetch users with assessment results
      const users = await apiRequest<User[]>('/admin/users');
      const profiles: UserProfile[] = users
        .filter(user => user.assessmentResults)
        .map(user => ({
          _id: user._id,
          user,
          assessmentResults: user.assessmentResults,
        }));
      set({ profiles, profilesLoading: false });
    } catch (error) {
      set({
        profilesError: error instanceof Error ? error.message : 'Failed to fetch profiles',
        profilesLoading: false,
      });
    }
  },

  // Payment actions
  fetchPayments: async (page = 1, limit = 20) => {
    set({ paymentsLoading: true, paymentsError: null });
    try {
      const response = await apiRequest<{
        payments: Payment[];
        total: number;
        page: number;
        totalPages: number;
      }>(`/admin/payments?page=${page}&limit=${limit}`);
      set({
        payments: response.payments,
        paymentsTotal: response.total,
        paymentsPage: response.page,
        paymentsTotalPages: response.totalPages,
        paymentsLoading: false,
      });
    } catch (error) {
      set({
        paymentsError: error instanceof Error ? error.message : 'Failed to fetch payments',
        paymentsLoading: false,
      });
    }
  },

  fetchRevenueStats: async () => {
    set({ revenueStatsLoading: true, revenueStatsError: null });
    try {
      const stats = await apiRequest<RevenueStats>('/admin/payments/revenue');
      set({ revenueStats: stats, revenueStatsLoading: false });
    } catch (error) {
      set({
        revenueStatsError: error instanceof Error ? error.message : 'Failed to fetch revenue stats',
        revenueStatsLoading: false,
      });
    }
  },

  fetchPaymentStats: async () => {
    set({ paymentStatsLoading: true, paymentStatsError: null });
    try {
      const stats = await apiRequest<PaymentStats>('/admin/payments/stats');
      set({ paymentStats: stats, paymentStatsLoading: false });
    } catch (error) {
      set({
        paymentStatsError: error instanceof Error ? error.message : 'Failed to fetch payment stats',
        paymentStatsLoading: false,
      });
    }
  },

  // Clear errors
  clearDashboardError: () => set({ dashboardError: null }),
  clearUsersError: () => set({ usersError: null }),
  clearQuestionsError: () => set({ questionsError: null }),
  clearPackagesError: () => set({ packagesError: null }),
  clearSubscriptionsError: () => set({ subscriptionsError: null }),
  clearProfilesError: () => set({ profilesError: null }),
  clearPaymentsError: () => set({ paymentsError: null }),
  clearRevenueStatsError: () => set({ revenueStatsError: null }),
  clearPaymentStatsError: () => set({ paymentStatsError: null }),
}));
