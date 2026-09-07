'use client';

import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function AdminHeader() {
  const { user } = useAuthStore();

  return (
    <header className="bg-[#FAF6EF] shadow-sm border-b border-[#E8E8E8] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#999999' }} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A747] focus:border-transparent"
              style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-white/50 transition-colors">
            <Bell className="w-5 h-5" style={{ color: '#1a1a1a' }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C4A747' }}></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium" style={{ color: '#1a1a1a', fontFamily: 'Montserrat, sans-serif' }}>{user?.name || 'Admin'}</p>
              <p className="text-sm" style={{ color: '#666666', fontFamily: 'Montserrat, sans-serif' }}>Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}