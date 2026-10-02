/**
 * API client for notification endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export enum NotificationType {
  ASSESSMENT_COMPLETED = 'assessment_completed',
  SUBSCRIPTION_UPDATED = 'subscription_updated',
  PROFILE_UPDATED = 'profile_updated',
  SYSTEM = 'system',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all notifications for the authenticated user
 */
export async function getNotifications(): Promise<Notification[]> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get notifications: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get unread notifications for the authenticated user
 */
export async function getUnreadNotifications(): Promise<Notification[]> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications/unread`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get unread notifications: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(): Promise<{ count: number }> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications/count`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get unread count: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string): Promise<Notification> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
    method: 'POST',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to mark notification as read: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead(): Promise<{ success: boolean }> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
    method: 'POST',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to mark all notifications as read: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string): Promise<void> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
    method: 'DELETE',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete notification: ${response.statusText}`);
  }
}

/**
 * Delete all read notifications
 */
export async function deleteReadNotifications(): Promise<void> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.tokens?.access?.token;
    } catch (error) {
      console.error('Failed to parse auth storage:', error);
    }
  }

  const response = await fetch(`${API_BASE_URL}/notifications/read`, {
    method: 'DELETE',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete read notifications: ${response.statusText}`);
  }
}
