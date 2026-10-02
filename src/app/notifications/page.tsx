'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AccountHeader from '@/components/AccountHeader';
import AccountSidebar from '@/components/AccountSidebar';
import { useAuthStore } from '@/store/authStore';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteReadNotifications,
  Notification,
  NotificationType,
} from '@/lib/api/notifications';

type IconName = 'bell' | 'check' | 'trash' | 'brain' | 'crown' | 'user';

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'bell':
      return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /><circle cx="18.5" cy="5" r="2.5" fill="currentColor" stroke="none" /></svg>;
    case 'check':
      return <svg {...common}><polyline points="20 6 9 17 4 12" /></svg>;
    case 'trash':
      return <svg {...common}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;
    case 'brain':
      return <svg {...common}><path d="M9.5 4.2a3 3 0 0 0-5 2.3 3.2 3.2 0 0 0 .3 1.3 3.4 3.4 0 0 0 .5 6.5A3 3 0 0 0 8 19.5c.7.3 1.3.4 2 .2V5.8a2.7 2.7 0 0 0-.5-1.6Z" /><path d="M14.5 4.2a3 3 0 0 1 5 2.3 3.2 3.2 0 0 1-.3 1.3 3.4 3.4 0 0 1-.5 6.5 3 3 0 0 1-2.7 5.2c-.7.3-1.3.4-2 .2V5.8c0-.6.2-1.2.5-1.6Z" /></svg>;
    case 'crown':
      return <svg {...common}><path d="m2 4 3 12 5-12 5 12 3-12-3-4-3 4z" /><path d="M12 4v12" /></svg>;
    case 'user':
      return <svg {...common}><circle cx="12" cy="7.5" r="3.5" /><path d="M4.5 20c.8-3.3 3.4-5.2 7.5-5.2s6.7 1.9 7.5 5.2" /></svg>;
  }
}

function getNotificationIcon(type: NotificationType): IconName {
  switch (type) {
    case NotificationType.ASSESSMENT_COMPLETED:
      return 'brain';
    case NotificationType.SUBSCRIPTION_UPDATED:
      return 'crown';
    case NotificationType.PROFILE_UPDATED:
      return 'user';
    default:
      return 'bell';
  }
}

function getNotificationColor(type: NotificationType): string {
  switch (type) {
    case NotificationType.ASSESSMENT_COMPLETED:
      return '#4B3B8C';
    case NotificationType.SUBSCRIPTION_UPDATED:
      return '#C4A747';
    case NotificationType.PROFILE_UPDATED:
      return '#8862c7';
    default:
      return '#666666';
  }
}

function NotificationItem({ notification, onMarkRead, onDelete }: { notification: Notification; onMarkRead: (id: string) => void; onDelete: (id: string) => void }) {
  const icon = getNotificationIcon(notification.type);
  const color = getNotificationColor(notification.type);
  const timeAgo = new Date(notification.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={`relative rounded-lg border p-4 transition-all ${notification.isRead ? 'border-[#e5e0dc] bg-[#fdfbf8]' : 'border-[#4B3B8C] bg-[#f1ecf6]'}`}>
      <div className="flex gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${notification.isRead ? 'bg-[#e8e5e5]' : 'bg-white'}`} style={{ color }}>
          <Icon name={icon} size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold ${notification.isRead ? 'text-[#666666]' : 'text-[#1a1a1a]'}`}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#4B3B8C]" />
            )}
          </div>
          <p className="mt-1 text-sm text-[#666666]">{notification.message}</p>
          <p className="mt-2 text-xs text-[#999999]">{timeAgo}</p>
          {notification.actionUrl && (
            <Link
              href={notification.actionUrl}
              className="mt-3 inline-block text-sm font-semibold text-[#4B3B8C] hover:underline"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
      <div className="absolute right-4 top-4 flex gap-2">
        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="rounded p-1 text-[#666666] transition hover:bg-[#e8e5e5]"
            title="Mark as read"
          >
            <Icon name="check" size={16} />
          </button>
        )}
        <button
          onClick={() => onDelete(notification.id)}
          className="rounded p-1 text-[#666666] transition hover:bg-[#e8e5e5]"
          title="Delete"
        >
          <Icon name="trash" size={16} />
        </button>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      const [data, count] = await Promise.all([
        getNotifications(),
        getUnreadCount(),
      ]);
      setNotifications(data);
      setUnreadCount(count.count);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (notifications.find((n) => n.id === id)?.isRead === false) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleDeleteRead = async () => {
    try {
      await deleteReadNotifications();
      setNotifications((prev) => prev.filter((n) => !n.isRead));
    } catch (error) {
      console.error('Failed to delete read notifications:', error);
    }
  };

  // Check authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center" style={{ color: '#1a1a1a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#4B3B8C' }}></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <AccountHeader />
      <AccountSidebar />

      <main className="md:pl-[272px]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-5 pb-10 pt-7 md:px-8 xl:px-10">
          <header className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-5">
            <div>
              <h1 className="text-3xl sm:text-[37px] font-bold leading-tight tracking-[-.045em] md:text-[43px]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Notifications
              </h1>
              <p className="mt-1 text-[15px] sm:text-[17px] md:text-[19px] text-[#666666]">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  Mark All as Read
                </button>
              )}
              {notifications.some((n) => n.isRead) && (
                <button
                  onClick={handleDeleteRead}
                  className="rounded-lg border border-[#4B3B8C] px-4 py-2 text-sm font-semibold text-[#4B3B8C] transition hover:bg-[#f1ecf6]"
                >
                  Clear Read
                </button>
              )}
            </div>
          </header>

          {isLoadingNotifications ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#4B3B8C' }}></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-lg border border-[#e5e0dc] bg-[#fdfbf8] p-12 text-center">
              <div className="mx-auto text-[#999999]">
                <Icon name="bell" size={48} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#1a1a1a]">No notifications yet</h3>
              <p className="mt-2 text-[#666666]">We'll notify you when there's something new.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
