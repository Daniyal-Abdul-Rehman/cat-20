'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, CreditCard, DollarSign, Check, X, RefreshCw } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';

export default function PackagesManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const {
    packages,
    packagesLoading,
    packagesError,
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
    clearPackagesError,
  } = useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    currency: 'USD',
    durationDays: 30,
    features: [] as string[],
    isActive: true,
    order: 1,
    stripePriceId: '',
  });

  useEffect(() => {
    // Only fetch packages when authenticated and token is available
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[PackagesManagement] Auth ready, fetching packages');
      fetchPackages();
    }
  }, [isAuthenticated, tokens, fetchPackages]);

  const handleToggleActive = async (id: string) => {
    const pkg = packages.find(p => p._id === id);
    if (pkg) {
      try {
        await updatePackage(id, { isActive: !pkg.isActive });
      } catch (error) {
        console.error('Failed to toggle package status:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
      } catch (error) {
        console.error('Failed to delete package:', error);
      }
    }
  };

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      currency: pkg.currency,
      durationDays: pkg.durationDays,
      features: pkg.features,
      isActive: pkg.isActive,
      order: pkg.order,
      stripePriceId: pkg.stripePriceId || '',
    });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      currency: 'USD',
      durationDays: 30,
      features: [],
      isActive: true,
      order: packages.length + 1,
      stripePriceId: '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await updatePackage(editingPackage._id, formData);
      } else {
        await createPackage(formData);
      }
      setIsModalOpen(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        currency: 'USD',
        durationDays: 30,
        features: [],
        isActive: true,
        order: 1,
        stripePriceId: '',
      });
    } catch (error) {
      console.error('Failed to save package:', error);
    }
  };

  if (packagesLoading) {
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
            Packages Management
          </h1>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
            Manage subscription packages and pricing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPackages}
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
          <button
            onClick={handleCreateNew}
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            style={{ backgroundColor: '#C4A747', fontFamily: 'Montserrat, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        </div>
      </div>

      {/* Error Message */}
      {packagesError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {packagesError}
          </p>
          <button
            onClick={clearPackagesError}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Total Packages
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {packages.length}
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
                Active Packages
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {packages.filter(pkg => pkg.isActive).length}
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
                Average Price
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                ${Math.round(packages.reduce((sum, pkg) => sum + pkg.price, 0) / packages.length) || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <DollarSign className="w-6 h-6" style={{ color: '#8862c7' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive ? 'text-white' : 'text-[#1a1a1a]'
                    }`}
                    style={{
                      backgroundColor: pkg.isActive ? '#C4A747' : '#E8E8E8',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                      {pkg.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs" style={{ color: '#999999', fontFamily: 'Montserrat, sans-serif' }}>
                      Order: {pkg.order}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {pkg.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                    {pkg.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(pkg._id)}
                    className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                    title={pkg.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {pkg.isActive ? (
                      <X className="w-4 h-4" style={{ color: '#C4A747' }} />
                    ) : (
                      <Check className="w-4 h-4" style={{ color: '#4B3B8C' }} />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" style={{ color: '#4B3B8C' }} />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold" style={{ color: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}>
                    ${pkg.price}
                  </span>
                  <span className="text-sm ml-1" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                    /{pkg.durationDays} days
                  </span>
                </div>
                <p className="text-xs" style={{ color: '#999999', fontFamily: 'Montserrat, sans-serif' }}>
                  {pkg.currency}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Features:
                </p>
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C4A747' }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.stripePriceId && (
                <div className="mt-4 pt-4 border-t border-[#E8E8E8]">
                  <p className="text-xs" style={{ color: '#999999', fontFamily: 'Montserrat, sans-serif' }}>
                    Stripe Price ID: {pkg.stripePriceId}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Package Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  placeholder="Enter package name..."
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  rows={2}
                  placeholder="Enter package description..."
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    placeholder="9.99"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    placeholder="30"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Features (comma separated)
                </label>
                <textarea
                  value={formData.features.join(', ')}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()) })}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  rows={2}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Stripe Price ID (optional)
                </label>
                <input
                  type="text"
                  value={formData.stripePriceId}
                  onChange={(e) => setFormData({ ...formData, stripePriceId: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  placeholder="price_1234567890"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="isActive" className="text-sm" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Active
                </label>
              </div>
            </form>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg border border-[#E8E8E8] hover:bg-[#FAF6EF] transition-colors"
                style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg text-white hover:scale-105 transition-transform"
                style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
              >
                {editingPackage ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}