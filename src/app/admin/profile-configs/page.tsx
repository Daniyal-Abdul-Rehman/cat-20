'use client';

import { useEffect, useState } from 'react';
import { Plus, RefreshCw, Edit, Trash2, Power, PowerOff, Layers, FileText, Copy, Check } from 'lucide-react';
import { 
  getProfileConfigs, 
  getCurrentProfileConfig, 
  createProfileConfig, 
  updateProfileConfig, 
  deleteProfileConfig, 
  activateProfileConfig, 
  deactivateProfileConfig,
  initializeDefaultConfig,
  ProfileConfig 
} from '@/lib/api/scoring';
import { useAuthStore } from '@/store/authStore';

export default function ProfileConfigManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const [configs, setConfigs] = useState<ProfileConfig[]>([]);
  const [currentConfig, setCurrentConfig] = useState<ProfileConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ProfileConfig | null>(null);
  const [formData, setFormData] = useState({
    version: '',
    isActive: false,
    clusterIds: [] as string[],
    questionScoring: [] as Array<{ questionId: number; answer: string; awards: Record<string, number> }>,
    defaultInfluenceThreshold: 15.0,
    description: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    expiresAt: ''
  });

  useEffect(() => {
    if (isAuthenticated && tokens?.access?.token) {
      fetchConfigs();
      fetchCurrentConfig();
    }
  }, [isAuthenticated, tokens]);

  const fetchConfigs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProfileConfigs();
      setConfigs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile configurations');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentConfig = async () => {
    try {
      const data = await getCurrentProfileConfig();
      setCurrentConfig(data);
    } catch (err) {
      // It's okay if there's no current config
      setCurrentConfig(null);
    }
  };

  const handleCreate = async () => {
    try {
      const newConfig = await createProfileConfig({
        isActive: formData.isActive,
        clusterIds: formData.clusterIds,
        questionScoring: formData.questionScoring,
        defaultInfluenceThreshold: formData.defaultInfluenceThreshold,
        description: formData.description,
        effectiveDate: formData.effectiveDate,
        expiresAt: formData.expiresAt || undefined
      });
      await fetchConfigs();
      await fetchCurrentConfig();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile configuration');
    }
  };

  const handleUpdate = async () => {
    if (!editingConfig) return;
    try {
      await updateProfileConfig(editingConfig.version, formData);
      await fetchConfigs();
      await fetchCurrentConfig();
      setIsModalOpen(false);
      setEditingConfig(null);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile configuration');
    }
  };

  const handleDelete = async (version: string) => {
    if (confirm('Are you sure you want to delete this profile configuration? This action cannot be undone.')) {
      try {
        await deleteProfileConfig(version);
        await fetchConfigs();
        await fetchCurrentConfig();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete profile configuration');
      }
    }
  };

  const handleToggleActive = async (config: ProfileConfig) => {
    try {
      if (config.isActive) {
        await deactivateProfileConfig(config.version);
      } else {
        await activateProfileConfig(config.version);
      }
      await fetchConfigs();
      await fetchCurrentConfig();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle configuration status');
    }
  };

  const handleInitializeDefaults = async () => {
    if (confirm('This will initialize the default profile configuration. Continue?')) {
      try {
        await initializeDefaultConfig();
        await fetchConfigs();
        await fetchCurrentConfig();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize default configuration');
      }
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openCreateModal = () => {
    resetForm();
    setEditingConfig(null);
    setIsModalOpen(true);
  };

  const openEditModal = (config: ProfileConfig) => {
    setEditingConfig(config);
    setFormData({
      version: config.version,
      isActive: config.isActive,
      clusterIds: config.clusterIds,
      questionScoring: config.questionScoring,
      defaultInfluenceThreshold: config.defaultInfluenceThreshold,
      description: config.description || '',
      effectiveDate: config.effectiveDate.split('T')[0],
      expiresAt: config.expiresAt ? config.expiresAt.split('T')[0] : ''
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      version: '',
      isActive: false,
      clusterIds: [],
      questionScoring: [],
      defaultInfluenceThreshold: 15.0,
      description: '',
      effectiveDate: new Date().toISOString().split('T')[0],
      expiresAt: ''
    });
  };

  const questionScoringPlaceholder = `[
  {
    "questionId": 1,
    "answer": "A",
    "awards": {"thinker": 1}
  }
]`;

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
            Profile Configuration Management
          </h1>
          <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
            Manage CAT-20 scoring configurations and question mappings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleInitializeDefaults}
            className="px-4 py-2 rounded-lg font-medium border border-[#E8E8E8] hover:bg-[#FAF6EF] transition-colors flex items-center gap-2"
            style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
          >
            <RefreshCw className="w-4 h-4" />
            Initialize Defaults
          </button>
          <button
            onClick={() => fetchConfigs()}
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
            Add Configuration
          </button>
        </div>
      </div>

      {/* Current Configuration */}
      {currentConfig && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6" style={{ color: '#C4A747' }} />
              <h2 className="text-xl font-bold" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
                Current Active Configuration
              </h2>
            </div>
            <button
              onClick={() => handleCopyToClipboard(currentConfig.version)}
              className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
              title="Copy Version"
            >
              <Copy className="w-4 h-4" style={{ color: '#4B3B8C' }} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Version
              </p>
              <p className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {currentConfig.version}
              </p>
            </div>
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Clusters
              </p>
              <p className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {currentConfig.clusterIds.join(', ')}
              </p>
            </div>
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Influence Threshold
              </p>
              <p className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {currentConfig.defaultInfluenceThreshold}%
              </p>
            </div>
          </div>
          {currentConfig.description && (
            <div className="mt-4 p-4 bg-[#FAF6EF] rounded-lg">
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                {currentConfig.description}
              </p>
            </div>
          )}
        </div>
      )}

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
                Total Configurations
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {configs.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C20' }}>
              <FileText className="w-6 h-6" style={{ color: '#4B3B8C' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                Active Configurations
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {configs.filter(c => c.isActive).length}
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
                Total Questions Configured
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                {currentConfig ? currentConfig.questionScoring.length : 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <Layers className="w-6 h-6" style={{ color: '#8862c7' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Configurations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAF6EF]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Version
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Clusters
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Questions
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Effective Date
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {configs.map((config) => (
              <tr key={config.version} className="border-b border-[#E8E8E8] hover:bg-[#FAF6EF]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#4B3B8C' }}>
                      {config.version.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                        {config.version}
                      </p>
                      {config.description && (
                        <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                          {config.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {config.isActive ? (
                      <Power className="w-5 h-5" style={{ color: '#C4A747' }} />
                    ) : (
                      <PowerOff className="w-5 h-5" style={{ color: '#999999' }} />
                    )}
                    <span className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                      {config.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {config.clusterIds.map((clusterId, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{ backgroundColor: '#E8E8E8', color: '#666666', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {clusterId}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                  {config.questionScoring.length}
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                  {new Date(config.effectiveDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(config)}
                      className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                      title="Edit Configuration"
                    >
                      <Edit className="w-4 h-4" style={{ color: '#4B3B8C' }} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(config)}
                      className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                      title={config.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {config.isActive ? (
                        <PowerOff className="w-4 h-4" style={{ color: '#999999' }} />
                      ) : (
                        <Power className="w-4 h-4" style={{ color: '#C4A747' }} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(config.version)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Configuration"
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
        {configs.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#E8E8E8' }} />
            <p style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
              No profile configurations found. Click "Initialize Defaults" to set up the standard CAT-20 configuration.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8E8E8]">
              <h2 className="text-xl font-bold" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
                {editingConfig ? 'Edit Profile Configuration' : 'Add Profile Configuration'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Version
                  </label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    disabled={!!editingConfig}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent disabled:bg-gray-100"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                    placeholder="e.g., 1.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Influence Threshold (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.defaultInfluenceThreshold}
                    onChange={(e) => setFormData({ ...formData, defaultInfluenceThreshold: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Cluster IDs (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.clusterIds.join(', ')}
                  onChange={(e) => setFormData({ ...formData, clusterIds: e.target.value.split(',').map(id => id.trim()) })}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                  style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  placeholder="e.g., thinker, seeker, builder, nurturer, spark, wanderer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                    style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                    Expiration Date (optional)
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
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
                  placeholder="Optional description of this configuration"
                />
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
                    Active (will deactivate others)
                  </span>
                </label>
              </div>
              <div className="bg-[#FAF6EF] p-4 rounded-lg">
                <p className="text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>
                  Question Scoring Format (JSON)
                </p>
                <p className="text-xs mb-2" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>
                  Enter as JSON array with question scoring mappings
                </p>
                <textarea
                  value={JSON.stringify(formData.questionScoring, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setFormData({ ...formData, questionScoring: parsed });
                    } catch (err) {
                      // Invalid JSON, don't update state
                    }
                  }}
                  rows={8}
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent font-mono text-sm"
                  style={{ color: '#1a1a1a', fontFamily: 'monospace' }}
                  placeholder={questionScoringPlaceholder}
                />
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
                onClick={editingConfig ? handleUpdate : handleCreate}
                className="px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
                style={{ backgroundColor: '#4B3B8C', fontFamily: 'Montserrat, sans-serif' }}
              >
                {editingConfig ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}