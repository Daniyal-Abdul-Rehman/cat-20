'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  HelpCircle, 
  CreditCard, 
  UserCircle,
  Settings,
  LogOut,
  Menu,
  Brain,
  Layers,
  FileText,
  DollarSign
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const menuItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/users', icon: Users, label: 'User Management' },
  { href: '/admin/profiles', icon: Brain, label: 'Profiles' },
  { href: '/admin/profile-clusters', icon: Layers, label: 'Profile Clusters' },
  { href: '/admin/profile-configs', icon: FileText, label: 'Scoring Configs' },
  { href: '/admin/questions', icon: HelpCircle, label: 'Questions' },
  { href: '/admin/packages', icon: CreditCard, label: 'Packages' },
  { href: '/admin/subscriptions', icon: UserCircle, label: 'Subscriptions' },
  { href: '/admin/payments', icon: DollarSign, label: 'Payments' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <aside className="w-64 bg-[#FAF6EF] shadow-lg flex flex-col fixed h-full z-20">
      {/* Logo */}
      <div className="p-6 border-b border-[#E8E8E8]">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4B3B8C' }}>
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>CAT-20</h1>
            <p className="text-xs" style={{ color: '#666666' }}>Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'hover:bg-white/50'
              }`}
              style={{
                color: isActive ? '#FFFFFF' : '#1a1a1a',
                backgroundColor: isActive ? '#4B3B8C' : 'transparent'
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#E8E8E8]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/50 transition-all duration-200 w-full"
          style={{ color: '#1a1a1a' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}