// API utility functions for backend communication

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  // Get token from localStorage (or Zustand store)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Dashboard API
export const dashboardApi = {
  getStats: () => apiRequest('/admin/dashboard/stats'),
};

// User Management API
export const userApi = {
  getAllUsers: (page: number = 1, limit: number = 10) =>
    apiRequest(`/admin/users?page=${page}&limit=${limit}`),
  getUserById: (id: string) => apiRequest(`/admin/users/${id}`),
  updateUserRole: (id: string, role: 'user' | 'admin') =>
    apiRequest(`/admin/users/${id}/role`, { method: 'PUT', body: { role } }),
  deleteUser: (id: string) => apiRequest(`/admin/users/${id}`, { method: 'DELETE' }),
};

// Questions Management API
export const questionApi = {
  getAllQuestions: () => apiRequest('/admin/questions'),
  createQuestion: (data: any) => apiRequest('/admin/questions', { method: 'POST', body: data }),
  updateQuestion: (id: string, data: any) =>
    apiRequest(`/admin/questions/${id}`, { method: 'PUT', body: data }),
  deleteQuestion: (id: string) => apiRequest(`/admin/questions/${id}`, { method: 'DELETE' }),
};

// Packages Management API
export const packageApi = {
  getAllPackages: () => apiRequest('/admin/packages'),
  createPackage: (data: any) => apiRequest('/admin/packages', { method: 'POST', body: data }),
  updatePackage: (id: string, data: any) =>
    apiRequest(`/admin/packages/${id}`, { method: 'PUT', body: data }),
  deletePackage: (id: string) => apiRequest(`/admin/packages/${id}`, { method: 'DELETE' }),
};

// Subscriptions Management API
export const subscriptionApi = {
  getAllSubscriptions: (page: number = 1, limit: number = 10) =>
    apiRequest(`/admin/subscriptions?page=${page}&limit=${limit}`),
  getSubscriptionById: (id: string) => apiRequest(`/admin/subscriptions/${id}`),
  cancelSubscription: (id: string) =>
    apiRequest(`/admin/subscriptions/${id}/cancel`, { method: 'PUT' }),
};
