import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Notification, NotificationType, getNotifications, getUnreadCount } from '@/lib/api/notifications';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

interface NotificationActions {
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  setNotifications: (notifications: Notification[]) => void;
  setUnreadCount: (count: number) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  deleteReadNotifications: () => void;
  clearError: () => void;
}

type NotificationStore = NotificationState & NotificationActions;

export const useNotificationStore = create<NotificationStore>()(
  (set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    fetchNotifications: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await getNotifications();
        set({ notifications: data, isLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to fetch notifications',
          isLoading: false,
        });
      }
    },

    fetchUnreadCount: async () => {
      try {
        const data = await getUnreadCount();
        set({ unreadCount: data.count });
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    },

    setNotifications: (notifications) => set({ notifications }),

    setUnreadCount: (count) => set({ unreadCount: count }),

    markAsRead: (id) => {
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    },

    markAllAsRead: () => {
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    },

    deleteNotification: (id) => {
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id);
        return {
          notifications: state.notifications.filter((n) => n.id !== id),
          unreadCount: notification && !notification.isRead
            ? Math.max(0, state.unreadCount - 1)
            : state.unreadCount,
        };
      });
    },

    deleteReadNotifications: () => {
      set((state) => ({
        notifications: state.notifications.filter((n) => !n.isRead),
      }));
    },

    clearError: () => set({ error: null }),
  })
);
