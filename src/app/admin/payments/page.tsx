'use client';

import { useEffect, useState } from 'react';
import { Search, RefreshCw, DollarSign, TrendingUp, CreditCard, CheckCircle, Clock, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';

export default function PaymentsManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const {
    payments,
    paymentsLoading,
    paymentsError,
    paymentsTotal,
    paymentsPage,
    paymentsTotalPages,
    revenueStats,
    revenueStatsLoading,
    paymentStats,
    paymentStatsLoading,
    fetchPayments,
    fetchRevenueStats,
    fetchPaymentStats,
    clearPaymentsError,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[PaymentsManagement] Auth ready, fetching payment data');
      fetchPayments(currentPage);
      fetchRevenueStats();
      fetchPaymentStats();
    }
  }, [isAuthenticated, tokens, currentPage]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.stripeSessionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#C4A74720', text: '#C4A747', icon: CheckCircle };
      case 'pending':
        return { bg: '#8862c720', text: '#8862c7', icon: Clock };
      case 'failed':
        return { bg: '#dc262620', text: '#dc2626', icon: XCircle };
      case 'refunded':
        return { bg: '#1b5dc920', text: '#1b5dc9', icon: ArrowDownRight };
      default:
        return { bg: '#E8E8E8', text: '#666666', icon: Clock };
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  if (paymentsLoading || revenueStatsLoading || paymentStatsLoading) {
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
            Payments & Revenue
          </h1>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
            Track payment history and analyze revenue trends
          </p>
        </div>
        <button
          onClick={() => {
            fetchPayments(currentPage);
            fetchRevenueStats();
            fetchPaymentStats();
          }}
          className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {paymentsError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {paymentsError}
          </p>
          <button
            onClick={clearPaymentsError}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Total Revenue
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {formatCurrency(revenueStats?.totalRevenue || 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C20' }}>
              <DollarSign className="w-6 h-6" style={{ color: '#4B3B8C' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Total Payments
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {paymentStats?.totalPayments || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4A74720' }}>
              <CreditCard className="w-6 h-6" style={{ color: '#C4A747' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Completed
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {paymentStats?.completedPayments || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4A74720' }}>
              <CheckCircle className="w-6 h-6" style={{ color: '#C4A747' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Pending
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {paymentStats?.pendingPayments || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <Clock className="w-6 h-6" style={{ color: '#8862c7' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by Month Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
          Revenue Trends (Last 12 Months)
        </h2>
        <div className="space-y-3">
          {revenueStats?.revenueByMonth?.length > 0 ? (
            revenueStats.revenueByMonth.map((monthData) => {
              const maxRevenue = Math.max(...revenueStats.revenueByMonth.map(m => m.total));
              const percentage = (monthData.total / maxRevenue) * 100;
              
              return (
                <div key={`${monthData._id.year}-${monthData._id.month}`} className="flex items-center gap-4">
                  <div className="w-24 text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                    {getMonthName(monthData._id.month)} {monthData._id.year}
                  </div>
                  <div className="flex-1 bg-[#E8E8E8] rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: '#4B3B8C',
                        minWidth: percentage > 0 ? '60px' : '0'
                      }}
                    >
                      <span className="text-xs font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {formatCurrency(monthData.total)}
                      </span>
                    </div>
                  </div>
                  <div className="w-20 text-sm text-right" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                    {monthData.count} payments
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-8" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No revenue data available yet
            </p>
          )}
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
          Recent Completed Payments
        </h2>
        <div className="space-y-3">
          {revenueStats?.recentPayments?.length > 0 ? (
            revenueStats.recentPayments.map((payment) => {
              const statusConfig = getStatusColor(payment.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={payment._id} className="flex items-center justify-between py-3 border-b border-[#E8E8E8] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
                      <span className="text-white font-semibold text-sm">
                        {payment.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                        {payment.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                        {payment.user?.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-sm" style={{ color: '#999999', fontFamily: 'Montserrat, sans-serif' }}>
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-8" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No recent payments
            </p>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E8E8]">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#999999' }} />
            <input
              type="text"
              placeholder="Search by user name, email, or session ID..."
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAF6EF]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                User
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Amount
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Session ID
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => {
              const statusConfig = getStatusColor(payment.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <tr key={payment._id} className="border-b border-[#E8E8E8] hover:bg-[#FAF6EF]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
                        <span className="text-white font-semibold text-sm">
                          {payment.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                          {payment.user?.name || 'Unknown User'}
                        </p>
                        <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                          {payment.user?.email || 'No email'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: statusConfig.bg }}>
                        <StatusIcon className="w-4 h-4" style={{ color: statusConfig.text }} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                        style={{
                          backgroundColor: statusConfig.bg,
                          color: statusConfig.text,
                          fontFamily: 'Montserrat, sans-serif'
                        }}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs px-2 py-1 bg-[#FAF6EF] rounded" style={{ color: '#666666', fontFamily: 'monospace' }}>
                      {payment.stripeSessionId?.slice(0, 20)}...
                    </code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: '#E8E8E8' }} />
            <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No payments found
            </p>
          </div>
        )}

        {/* Pagination */}
        {paymentsTotal > 0 && (
          <div className="px-6 py-4 border-t border-[#E8E8E8] flex items-center justify-between">
            <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              Showing {filteredPayments.length} of {paymentsTotal} payments
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
                Page {currentPage} of {paymentsTotalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(paymentsTotalPages, currentPage + 1))}
                disabled={currentPage === paymentsTotalPages}
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