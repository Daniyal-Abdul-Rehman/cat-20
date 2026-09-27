'use client';

import { useEffect, useState } from 'react';
import { Search, Shield, Mail, Calendar, Check, X, RefreshCw, UserPlus, Trash2, Edit } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';

export default function UsersManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const {
    users,
    usersLoading,
    usersError,
    usersTotal,
    usersPage,
    usersTotalPages,
    fetchUsers,
    updateUserRole,
    deleteUser,
    clearUsersError,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Only fetch users when authenticated and token is available
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[UsersManagement] Auth ready, fetching users');
      fetchUsers(currentPage);
    }
  }, [isAuthenticated, tokens, currentPage]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleRoleChange = async (id: string, newRole: 'user' | 'admin') => {
    try {
      await updateUserRole(id, newRole);
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (usersLoading) {
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
            Users Management
          </h1>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => fetchUsers(currentPage)}
          className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {usersError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {usersError}
          </p>
          <button
            onClick={clearUsersError}
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
                Total Users
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {usersTotal}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C20' }}>
              <UserPlus className="w-6 h-6" style={{ color: '#4B3B8C' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Admin Users
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4A74720' }}>
              <Shield className="w-6 h-6" style={{ color: '#C4A747' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Verified Users
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {users.filter(u => u.isEmailVerified).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <Check className="w-6 h-6" style={{ color: '#8862c7' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                New This Month
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {users.filter(u => {
                  const createdAt = new Date(u.createdAt || '');
                  const now = new Date();
                  const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                  return createdAt >= monthAgo;
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1b5dc920' }}>
              <Calendar className="w-6 h-6" style={{ color: '#1b5dc9' }} />
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
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
              style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
            style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAF6EF]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                User
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Role
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Joined
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Subscription
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-[#E8E8E8] hover:bg-[#FAF6EF]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
                      <span className="text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                        {user.name}
                      </p>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                        {user.email}
                      </p>
                      {user.username && (
                        <p className="text-xs" style={{ color: '#999999', fontFamily: 'Montserrat, sans-serif' }}>
                          @{user.username}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                    className="px-3 py-1 rounded-lg border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.isEmailVerified ? (
                      <Check className="w-5 h-5" style={{ color: '#C4A747' }} />
                    ) : (
                      <X className="w-5 h-5" style={{ color: '#999999' }} />
                    )}
                    <span className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                      {user.isEmailVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                  {formatDate(user.createdAt || '')}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                    style={{
                      backgroundColor: user.subscriptionTier === 'premium' ? '#C4A747' : '#E8E8E8',
                      color: user.subscriptionTier === 'premium' ? '#FFFFFF' : '#666666',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {user.subscriptionTier}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 mx-auto mb-4" style={{ color: '#E8E8E8' }} />
            <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No users found
            </p>
          </div>
        )}

        {/* Pagination */}
        {usersTotal > 0 && (
          <div className="px-6 py-4 border-t border-[#E8E8E8] flex items-center justify-between">
            <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              Showing {filteredUsers.length} of {usersTotal} users
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
                Page {currentPage} of {usersTotalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(usersTotalPages, currentPage + 1))}
                disabled={currentPage === usersTotalPages}
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