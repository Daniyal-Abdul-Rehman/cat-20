'use client';

import { useEffect, useState } from 'react';
import { Search, Brain, Calendar, Eye, Download, TrendingUp, Filter } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { User, useAuthStore } from '@/store/authStore';

interface UserProfile {
  _id: string;
  user: User;
  assessmentResults?: {
    completedAt: string;
    pattern: string;
    scores: Record<string, number>;
    archetype: string;
  };
}

export default function ProfilesManagement() {
  const { isAuthenticated, tokens } = useAuthStore();
  const {
    profiles,
    profilesLoading,
    profilesError,
    fetchProfiles,
    clearProfilesError,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [archetypeFilter, setArchetypeFilter] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Only fetch profiles when authenticated and token is available
    if (isAuthenticated && tokens?.access?.token) {
      console.log('[ProfilesManagement] Auth ready, fetching profiles');
      fetchProfiles();
    }
  }, [isAuthenticated, tokens]);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       profile.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchetype = !archetypeFilter || 
                            profile.assessmentResults?.archetype === archetypeFilter;
    return matchesSearch && matchesArchetype;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleViewProfile = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const archetypes = Array.from(new Set(profiles.map(p => p.assessmentResults?.archetype).filter(Boolean)));

  if (profilesLoading) {
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
            Profiles Management
          </h1>
          <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
            View and manage user assessment results and profiles
          </p>
        </div>
        <button
          onClick={fetchProfiles}
          className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          style={{ backgroundColor: '#4B3B8C', fontFamily: "'Montserrat', sans-serif" }}
        >
          <TrendingUp className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                Total Profiles
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                {profiles.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C20' }}>
              <Brain className="w-6 h-6" style={{ color: '#4B3B8C' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                Unique Archetypes
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                {archetypes.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C4A74720' }}>
              <Filter className="w-6 h-6" style={{ color: '#C4A747' }} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                Completed Today
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                {profiles.filter(p => {
                  const completedDate = new Date(p.assessmentResults?.completedAt || '');
                  const today = new Date();
                  return completedDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8862c720' }}>
              <Calendar className="w-6 h-6" style={{ color: '#8862c7' }} />
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
              style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>
          <select
            value={archetypeFilter}
            onChange={(e) => setArchetypeFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
            style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
          >
            <option value="">All Archetypes</option>
            {archetypes.map(archetype => (
              <option key={archetype} value={archetype}>{archetype}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {profilesError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {profilesError}
          </p>
          <button
            onClick={clearProfilesError}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Profiles Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAF6EF]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                User
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Archetype
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Pattern
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Completed
              </th>
              <th className="px-6 py-4 text-left font-semibold" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((profile) => (
              <tr key={profile._id} className="border-b border-[#E8E8E8] hover:bg-[#FAF6EF]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
                      <span className="text-white font-semibold text-sm">
                        {profile.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                        {profile.user.name}
                      </p>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                        {profile.user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: '#4B3B8C20',
                      color: '#4B3B8C',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    {profile.assessmentResults?.archetype || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                  {profile.assessmentResults?.pattern || 'N/A'}
                </td>
                <td className="px-6 py-4" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                  {profile.assessmentResults?.completedAt ? formatDate(profile.assessmentResults.completedAt) : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewProfile(profile)}
                      className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" style={{ color: '#4B3B8C' }} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-[#FAF6EF] transition-colors"
                      title="Download Results"
                    >
                      <Download className="w-4 h-4" style={{ color: '#C4A747' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredProfiles.length === 0 && (
          <div className="p-12 text-center">
            <Brain className="w-12 h-12 mx-auto mb-4" style={{ color: '#E8E8E8' }} />
            <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
              No profiles found
            </p>
          </div>
        )}
      </div>

      {/* Profile Detail Modal */}
      {isModalOpen && selectedProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Profile Details
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* User Information */}
              <div className="bg-[#FAF6EF] rounded-lg p-4">
                <h3 className="font-semibold mb-3" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                  User Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Name</p>
                    <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                      {selectedProfile.user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Email</p>
                    <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                      {selectedProfile.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Role</p>
                    <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                      {selectedProfile.user.role}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Joined</p>
                    <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                      {formatDate(selectedProfile.user.createdAt || '')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Assessment Results */}
              {selectedProfile.assessmentResults && (
                <div className="bg-[#FAF6EF] rounded-lg p-4">
                  <h3 className="font-semibold mb-3" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                    Assessment Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Archetype</p>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                        {selectedProfile.assessmentResults.archetype}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Pattern</p>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                        {selectedProfile.assessmentResults.pattern}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>Completed</p>
                      <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                        {formatDate(selectedProfile.assessmentResults.completedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                      Pattern Scores
                    </p>
                    <div className="space-y-2">
                      {Object.entries(selectedProfile.assessmentResults.scores).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm capitalize" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                            {key}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(value as number) * 20}%`,
                                  backgroundColor: '#4B3B8C'
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                              {value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg border border-[#E8E8E8] hover:bg-[#FAF6EF] transition-colors"
                style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
              >
                Close
              </button>
              <button
                className="px-6 py-2 rounded-lg text-white hover:scale-105 transition-transform flex items-center gap-2"
                style={{ backgroundColor: '#4B3B8C', fontFamily: "'Montserrat', sans-serif" }}
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
