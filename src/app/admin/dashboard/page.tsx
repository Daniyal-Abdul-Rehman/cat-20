'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Users, CreditCard, TrendingUp, Activity, RefreshCw, FileText, Plus, ArrowRight } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';

export default function AdminDashboard() {
  const { isAuthenticated, tokens } = useAuthStore();
  const { addToast } = useToastStore();
  const {
    dashboardStats,
    dashboardLoading,
    dashboardError,
    fetchDashboardStats,
    clearDashboardError,
    questions,
    fetchQuestions,
  } = useAdminStore();

  // Show login success toast if user just signed in
  useEffect(() => {
    const loginSuccess = localStorage.getItem('login_success');
    if (loginSuccess === 'true') {
      addToast('success', 'Login successful!');
      localStorage.removeItem('login_success');
    }
  }, [addToast]);

  useEffect(() => {
    // Only fetch data when authenticated and token is available
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[AdminDashboard] Auth ready, fetching dashboard data');
      fetchDashboardStats();
      fetchQuestions();
    }
  }, [isAuthenticated, tokens]);

  const statCards = [
    {
      title: 'Total Users',
      value: dashboardStats?.totalUsers || 0,
      icon: Users,
      color: '#4B3B8C',
      change: '+12%',
    },
    {
      title: 'Active Users',
      value: dashboardStats?.activeUsers || 0,
      icon: Activity,
      color: '#C4A747',
      change: '+8%',
    },
    {
      title: 'Subscriptions',
      value: dashboardStats?.totalSubscriptions || 0,
      icon: CreditCard,
      color: '#8862c7',
      change: '+15%',
    },
    {
      title: 'Revenue',
      value: `$${(dashboardStats?.totalRevenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: '#1b5dc9',
      change: '+23%',
    },
  ];

  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#4B3B8C' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            Dashboard
          </h1>
          <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
            Welcome back! Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          style={{ backgroundColor: '#4B3B8C', fontFamily: "'Montserrat', sans-serif" }}
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {dashboardError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {dashboardError}
          </p>
          <button
            onClick={clearDashboardError}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-full" style={{ 
                  backgroundColor: `${stat.color}20`, 
                  color: stat.color 
                }}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </h3>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      <section className="relative overflow-hidden border border-[#D9D0C0] bg-white p-6 shadow-sm md:p-8" aria-labelledby="question-workspace-heading">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-[#C4A747]/20" />
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#F1ECF6] text-[#4B3B8C]"><FileText className="h-7 w-7" /></div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#C4A747]">Assessment content</p>
              <h2 id="question-workspace-heading" className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Question workspace</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#666666]">Add questions manually or import a PDF or Word file. Imported content opens as editable drafts before publication.</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/admin/questions" className="inline-flex items-center justify-center gap-2 border border-[#D9D0C0] px-5 py-3 text-sm font-semibold text-[#4B3B8C] transition hover:border-[#4B3B8C] hover:bg-[#FFFCF6]"><FileText className="h-4 w-4" /> Import PDF / Word</Link>
            <Link href="/admin/questions?action=add" className="inline-flex items-center justify-center gap-2 bg-[#4B3B8C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3C2E72]"><Plus className="h-4 w-4" /> Add question</Link>
          </div>
        </div>
        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-6 border-t border-[#EEE8DD] pt-5 text-sm text-[#666666]"><span><strong className="text-xl text-[#1a1a1a]">{questions.length}</strong> questions in library</span><span><strong className="text-xl text-[#C4A747]">{questions.filter((question) => question.isActive).length}</strong> published</span><Link href="/admin/questions" className="ml-auto inline-flex items-center gap-2 font-semibold text-[#4B3B8C]">Open question library <ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'Completed assessment', time: '2 hours ago' },
            { user: 'Jane Smith', action: 'Upgraded to Premium', time: '4 hours ago' },
            { user: 'Mike Johnson', action: 'Started trial', time: '6 hours ago' },
            { user: 'Sarah Williams', action: 'Renewed subscription', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-[#E8E8E8] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
                  <span className="text-white font-semibold text-sm">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                    {activity.user}
                  </p>
                  <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                    {activity.action}
                  </p>
                </div>
              </div>
              <span className="text-sm" style={{ color: '#999999', fontFamily: "'Montserrat', sans-serif" }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}