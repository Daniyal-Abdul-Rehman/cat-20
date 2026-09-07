'use client';

import { useEffect, useState } from 'react';
import { Save, Bell, Shield, Palette, Database, Globe, User, Mail } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'CAT-20',
    siteDescription: 'Cognitive Archetype Taxonomy - Discover your unique patterns',
    supportEmail: 'support@cat20.com',
    maxUsers: 10000,
    enableRegistration: true,
    requireEmailVerification: true,
    defaultSubscriptionTier: 'free',
    emailNotifications: true,
  });
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          Settings
        </h1>
        <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
          Configure platform settings and preferences
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8]">
        <div className="p-6 border-b border-[#E8E8E8]">
          <h2 className="text-xl font-bold mb-1" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            General Settings
          </h2>
          <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
            Basic platform configuration
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
              Site Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
              style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Max Users
              </label>
              <input
                type="number"
                value={settings.maxUsers}
                onChange={(e) => setSettings({ ...settings, maxUsers: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Default Subscription Tier
              </label>
              <select
                value={settings.defaultSubscriptionTier}
                onChange={(e) => setSettings({ ...settings, defaultSubscriptionTier: e.target.value })}
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
                style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* User Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8]">
        <div className="p-6 border-b border-[#E8E8E8]">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            <User className="w-5 h-5" style={{ color: '#4B3B8C' }} />
            User Settings
          </h2>
          <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
            User registration and authentication preferences
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#E8E8E8]">
            <div>
              <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Enable Registration
              </p>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                Allow new users to register on the platform
              </p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, enableRegistration: !settings.enableRegistration })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.enableRegistration ? 'bg-[#4B3B8C]' : 'bg-[#E8E8E8]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  settings.enableRegistration ? 'translate-x-6 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#E8E8E8]">
            <div>
              <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Require Email Verification
              </p>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                Users must verify their email before accessing the platform
              </p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, requireEmailVerification: !settings.requireEmailVerification })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.requireEmailVerification ? 'bg-[#4B3B8C]' : 'bg-[#E8E8E8]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  settings.requireEmailVerification ? 'translate-x-6 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8]">
        <div className="p-6 border-b border-[#E8E8E8]">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            <Mail className="w-5 h-5" style={{ color: '#4B3B8C' }} />
            Email Settings
          </h2>
          <p style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
            Email configuration and notifications
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#E8E8E8]">
            <div>
              <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
                Email Notifications
              </p>
              <p className="text-sm" style={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}>
                Send email notifications for important events
              </p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-[#4B3B8C]' : 'bg-[#E8E8E8]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  settings.emailNotifications ? 'translate-x-6 bg-white' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: '#4B3B8C', fontFamily: "'Montserrat', sans-serif" }}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Settings
            </>
          )}
        </button>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-700 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Settings saved successfully!
          </p>
        </div>
      )}
    </div>
  );
}