'use client';

import { useEffect, useState } from 'react';
import { Plus, RefreshCw, Edit, Trash2, Power, PowerOff, Settings, Layers } from 'lucide-react';
import { 
  getProfileClusters, 
  getActiveProfileClusters, 
  createProfileCluster, 
  updateProfileCluster, 
  deleteProfileCluster, 
  activateProfileCluster, 
  deactivateProfileCluster,
  initializeDefaultClusters,
  ProfileCluster 
} from '@/lib/api/scoring';
import { useAuthStore } from '@/store/authStore';

export default function ProfileClustersManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const [clusters, setClusters] = useState<ProfileCluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCluster, setEditingCluster] = useState<ProfileCluster | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    displayName: '',
    code: '',
    isActive: true,
    order: 0,
    description: '',
    influenceThreshold: 15.0,
    tags: [] as string[],
    color: '#4B3B8C'
  });

  useEffect(() => {
    if (isAuthenticated && tokens?.access?.token) {
      fetchClusters();
    }
  }, [isAuthenticated, tokens, showActiveOnly]);

  const fetchClusters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = showActiveOnly ? await getActiveProfileClusters() : await getProfileClusters();
      setClusters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile clusters');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const newCluster = await createProfileCluster({
        id: formData.id,
        displayName: formData.displayName,
        code: formData.code,
        isActive: formData.isActive,
        order: formData.order,
        description: formData.description,
        influenceThreshold: formData.influenceThreshold,
        tags: formData.tags,
        color: formData.color
      });
      await fetchClusters();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile cluster');
    }
  };

  const handleUpdate = async () => {
    if (!editingCluster) return;
    try {
      await updateProfileCluster(editingCluster.id, formData);
      await fetchClusters();
      setIsModalOpen(false);
      setEditingCluster(null);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile cluster');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this profile cluster? This action cannot be undone.')) {
      try {
        await deleteProfileCluster(id);
        await fetchClusters();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete profile cluster');
      }
    }
  };

  const handleToggleActive = async (cluster: ProfileCluster) => {
    try {
      if (cluster.isActive) {
        await deactivateProfileCluster(cluster.id);
      } else {
        await activateProfileCluster(cluster.id);
      }
      await fetchClusters();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle cluster status');
    }
  };

  const handleInitializeDefaults = async () => {
    if (confirm('This will initialize the default profile clusters. Continue?')) {
      try {
        await initializeDefaultClusters();
        await fetchClusters();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize default clusters');
      }
    }
  };

  const openCreateModal = () => {
    resetForm();
    setEditingCluster(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cluster: ProfileCluster) => {
    setEditingCluster(cluster);
    setFormData({
      id: cluster.id,
      displayName: cluster.displayName,
      code: cluster.code,
      isActive: cluster.isActive,
      order: cluster.order,
      description: cluster.description || '',
      influenceThreshold: cluster.influenceThreshold,
      tags: cluster.tags || [],
      color: cluster.color || '#4B3B8C'
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      displayName: '',
      code: '',
      isActive: true,
      order: 0,
      description: '',
      influenceThreshold: 15.0,
      tags: [],
      color: '#4B3B8C'
    });
  };

  if (isLoading) {
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
            Profile Clusters Management
          </h1>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
            Manage CAT-20 profile clusters (Thinker, Seeker, Builder, etc.)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowActiveOnly(!showActiveOnly)}
            className="px-4 py-2 rounded-lg font-medium border border-[#E8E8E8] hover:bg-[#FAF6EF] transition-colors flex items-center gap-2"
            style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
          >
            {showActiveOnly ? <Layers className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            {showActiveOnly ? 'Active Only' : 'All Clusters'}
          </button>
          <button
            onClick={handleInitializeDefaults}
            className="px-4 py-2 rounded-lg font-medium border border-[#E8E8E8] hover:bg-[#FAF6EF] transition-colors flex items-center gap-2"
            style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
          >
            <RefreshCw className="w-4 h-4" />
            Initialize Defaults
          </button>
          <button
            onClick={() => fetchClusters()}
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            style={{ backgroundColor: '#C4A747', fontFamily: 'Montserrat, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Add Cluster
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {error}
          </p>
          <button
            onClick={() => setError(null)}
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
                Total Clusters
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {clusters.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C20' }}>
              <Layers className="w-6 h-6" style={{ color: '#4B3B8C' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Active Clusters
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {clusters.filter(c => c.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4A74720' }}>
              <Power className="w-6 h-6" style={{ color: '#C4A747' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Inactive Clusters
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {clusters.filter(c => !c.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <PowerOff className="w-6 h-6" style={{ color: '#8862c7' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Clusters Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAF6EF]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Cluster
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Code
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Order
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Influence Threshold
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Tags
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Color
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {clusters.map((cluster) => (
              <tr key={cluster.id} className="border-b border-[#E8E8E8] hover:bg-[#FAF6EF]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: cluster.color || '#4B3B8C' }}>
                      {cluster.code}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                        {cluster.displayName}
                      </p>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                        {cluster.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: '#E8E8E8', color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    {cluster.code}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {cluster.isActive ? (
                      <Power className="w-5 h-5" style={{ color: '#C4A747' }} />
                    ) : (
                      <PowerOff className="w-5 h-5" style={{ color: '#999999' }} />
                    )}
                    <span className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                      {cluster.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                  {cluster.order}
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                  {cluster.influenceThreshold}%
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {cluster.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{ backgroundColor: '#E8E8E8', color: '#666666', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: cluster.color || '#4B3B8C' }}
                    />
                    <span className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                      {cluster.color || '#4B3B8C'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(cluster)}
                      className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                      title="Edit Cluster"
                    >
                      <Edit className="w-4 h-4" style={{ color: '#4B3B8C' }} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(cluster)}
                      className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                      title={cluster.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {cluster.isActive ? (
                        <PowerOff className="w-4 h-4" style={{ color: '#999999' }} />
                      ) : (
                        <Power className="w-4 h-4" style={{ color: '#C4A747' }} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(cluster.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Cluster"
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
        {clusters.length === 0 && (
          <div className="p-12 text-center">
            <Layers className="w-12 h-12 mx-auto mb-4" style={{ color: '#E8E8E8' }} />
            <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No profile clusters found. Click "Initialize Defaults" to set up the standard CAT-20 clusters.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-[#E8E8E8]">
              <h2 className="text-xl font-bold" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
                {editingCluster ? 'Edit Profile Cluster' : 'Add Profile Cluster'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Cluster ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={!!editingCluster}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent disabled:bg-gray-100"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="e.g., thinker"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="e.g., Thinker"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Code (Single Letter)
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  maxLength={1}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="e.g., T"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Influence Threshold (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.influenceThreshold}
                    onChange={(e) => setFormData({ ...formData, influenceThreshold: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="Optional description of this cluster"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-12 h-12 rounded border border-[#E8E8E8] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                    placeholder="#4B3B8C"
                    maxLength={7}
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-[#E8E8E8]"
                  />
                  <span className="text-sm font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Active
                  </span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-[#E8E8E8] flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg font-medium border border-[#E8E8E8] hover:bg-[#FAF6EF] transition-colors"
                style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={editingCluster ? handleUpdate : handleCreate}
                className="px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
                style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
              >
                {editingCluster ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}