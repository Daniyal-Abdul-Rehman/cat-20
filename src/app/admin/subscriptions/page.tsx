'use client';

import { useEffect, useState } from 'react';
import { Search, Calendar, User, CreditCard, Check, X, RefreshCw, DollarSign } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';

export default function SubscriptionsManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const {
    subscriptions,
    subscriptionsLoading,
    subscriptionsError,
    subscriptionsTotal,
    subscriptionsPage,
    subscriptionsTotalPages,
    fetchSubscriptions,
    cancelSubscription,
    clearSubscriptionsError,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Only fetch subscriptions when authenticated and token is available
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[SubscriptionsManagement] Auth ready, fetching subscriptions');
      fetchSubscriptions(currentPage);
    }
  }, [isAuthenticated, tokens, currentPage]);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       sub.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCancelSubscription = async (id: string) => {
    if (confirm('Are you sure you want to cancel this subscription?')) {
      try {
        await cancelSubscription(id);
      } catch (error) {
        console.error('Failed to cancel subscription:', error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#C4A747', text: '#FFFFFF' };
      case 'canceled':
        return { bg: '#E8E8E8', text: '#666666' };
      case 'past_due':
        return { bg: '#ef4444', text: '#FFFFFF' };
      default:
        return { bg: '#E8E8E8', text: '#666666' };
    }
  };

  if (subscriptionsLoading) {
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
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
            Subscriptions Management
          </h1>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
            Monitor and manage user subscriptions
          </p>
        </div>
        <button
          onClick={() => fetchSubscriptions(currentPage)}
          className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {subscriptionsError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {subscriptionsError}
          </p>
          <button
            onClick={clearSubscriptionsError}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Total Subscriptions
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {subscriptions.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C20' }}>
              <CreditCard className="w-6 h-6" style={{ color: '#4B3B8C' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Active Subscriptions
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {subscriptions.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4A74720' }}>
              <Check className="w-6 h-6" style={{ color: '#C4A747' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Monthly Revenue
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                ${subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.package.price, 0).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <DollarSign className="w-6 h-6" style={{ color: '#8862c7' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Auto-Renewals
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {subscriptions.filter(s => s.autoRenew).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1b5dc920' }}>
              <RefreshCw className="w-6 h-6" style={{ color: '#1b5dc9' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E8E8]">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#999999' }} />
            <input
              type="text"
              placeholder="Search by user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
              style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
            style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
            <option value="past_due">Past Due</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAF6EF]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                User
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Package
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Period
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Auto-Renew
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((subscription) => {
              const statusColors = getStatusColor(subscription.status);
              return (
                <tr key={subscription._id} className="border-b border-[#E8E8E8] hover:bg-[#FAF6EF]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
                        <span className="text-white font-semibold text-sm">
                          {subscription.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                          {subscription.user.name}
                        </p>
                        <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                          {subscription.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                        {subscription.package.name}
                      </p>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                        ${subscription.package.price}/month
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                      style={{
                        backgroundColor: statusColors.bg,
                        color: statusColors.text,
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                    <div className="flex flex-col">
                      <span>{formatDate(subscription.startDate)}</span>
                      {subscription.endDate && (
                        <span className="text-xs">- {formatDate(subscription.endDate)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {subscription.autoRenew ? (
                      <Check className="w-5 h-5" style={{ color: '#C4A747' }} />
                    ) : (
                      <X className="w-5 h-5" style={{ color: '#999999' }} />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCancelSubscription(subscription._id)}
                        disabled={subscription.status === 'canceled'}
                        className="px-4 py-2 rounded-lg border border-[#E8E8E8] hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                        style={{ color: subscription.status === 'canceled' ? '#999999' : '#dc2626', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredSubscriptions.length === 0 && (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: '#E8E8E8' }} />
            <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No subscriptions found
            </p>
          </div>
        )}

        {/* Pagination */}
        {subscriptionsTotal > 0 && (
          <div className="px-6 py-4 border-t border-[#E8E8E8] flex items-center justify-between">
            <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              Showing {filteredSubscriptions.length} of {subscriptionsTotal} subscriptions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-[#E8E8E8] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FAF6EF] transition-colors"
                style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
              >
                Previous
              </button>
              <span className="px-4 py-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Page {currentPage} of {subscriptionsTotalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(subscriptionsTotalPages, currentPage + 1))}
                disabled={currentPage === subscriptionsTotalPages}
                className="px-4 py-2 rounded-lg border border-[#E8E8E8] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FAF6EF] transition-colors"
                style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}