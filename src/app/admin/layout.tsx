'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [authLoaded, setAuthLoaded] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    // Only run once
    if (initRef.current) return;
    initRef.current = true;

    // Restore auth state from localStorage
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth-storage');
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          if (parsed.state?.user && parsed.state?.tokens) {
            // Update store with persisted state
            useAuthStore.setState({
              user: parsed.state.user,
              tokens: parsed.state.tokens,
              isAuthenticated: true,
            });
            console.log('[AdminLayout] Auth restored from localStorage, role:', parsed.state.user?.role);
          }
        } catch (error) {
          console.error('[AdminLayout] Failed to restore auth:', error);
        }
      }
    }
    
    // Mark that auth loading is complete
    setAuthLoaded(true);
  }, []);

  // Handle redirects based on auth state
  useEffect(() => {
    if (!authLoaded) return;

    console.log('[AdminLayout] Auth check - authenticated:', isAuthenticated, 'role:', user?.role);

    if (!isAuthenticated) {
      console.log('[AdminLayout] Not authenticated, redirecting to signin');
      router.push('/auth/signin');
      return;
    }

    if (user?.role !== 'admin') {
      console.log('[AdminLayout] Not admin role, redirecting to home');
      router.push('/');
      return;
    }
  }, [authLoaded, isAuthenticated, user?.role, router]);

  // Show loading while checking auth
  if (!authLoaded || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center" style={{ color: '#1a1a1a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#4B3B8C' }}></div>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>Checking admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex" style={{ color: '#1a1a1a' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}