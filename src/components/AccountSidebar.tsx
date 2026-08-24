'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

type IconName =
  | 'dashboard'
  | 'user'
  | 'users'
  | 'history'
  | 'settings'
  | 'bell'
  | 'info'
  | 'brain'
  | 'searcher'
  | 'heart'
  | 'chart'
  | 'spark'
  | 'leaf'
  | 'compass'
  | 'calendar'
  | 'arrow-right';

function Icon({ name, size = 24, strokeWidth = 1.8 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'dashboard':
      return <svg {...common}><path d="M4 12 12 5l8 7" /><path d="M6 10v9h12v-9" /><path d="M9 19v-5h6v5" /></svg>;
    case 'user':
      return <svg {...common}><circle cx="12" cy="7.5" r="3.5" /><path d="M4.5 20c.8-3.3 3.4-5.2 7.5-5.2s6.7 1.9 7.5 5.2" /></svg>;
    case 'users':
      return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.6-2.7 2.4-4.2 5.5-4.2s4.9 1.5 5.5 4.2" /><path d="M15.5 5.4a3 3 0 0 1 0 5.7M17 14.7c1.9.6 3.1 2 3.5 4.3" /></svg>;
    case 'history':
      return <svg {...common}><path d="M3.5 12a8.5 8.5 0 1 0 2.3-5.8" /><path d="M3.5 5v4.7h4.7" /><path d="M12 7.5V12l3 2" /></svg>;
    case 'settings':
      return <svg {...common}><path d="m12 3 1.1 2.2 2.4.6 2-1.2 1.9 1.9-1.2 2 .6 2.4L21 12l-2.2 1.1-.6 2.4 1.2 2-1.9 1.9-2-1.2-2.4.6L12 21l-1.1-2.2-2.4-.6-2 1.2-1.9-1.9 1.2-2-.6-2.4L3 12l2.2-1.1.6-2.4-1.2-2 1.9-1.9 2 1.2 2.4-.6L12 3Z" /><circle cx="12" cy="12" r="3" /></svg>;
    case 'bell':
      return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /><circle cx="18.5" cy="5" r="2.5" fill="currentColor" stroke="none" /></svg>;
    case 'info':
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 10.8v5" /><path d="M12 7.8h.01" strokeWidth="2.4" /></svg>;
    case 'brain':
      return <svg {...common}><path d="M9.5 4.2a3 3 0 0 0-5 2.3 3.2 3.2 0 0 0 .3 1.3 3.4 3.4 0 0 0 .5 6.5A3 3 0 0 0 8 19.5c.7.3 1.3.4 2 .2V5.8a2.7 2.7 0 0 0-.5-1.6Z" /><path d="M14.5 4.2a3 3 0 0 1 5 2.3 3.2 3.2 0 0 1-.3 1.3 3.4 3.4 0 0 1-.5 6.5 3 3 0 0 1-2.7 5.2c-.7.3-1.3.4-2 .2V5.8c0-.6.2-1.2.5-1.6Z" /><path d="M9.5 8H8m1.5 4H7.8m6.7-4H16m-1.5 4h1.7" /></svg>;
    case 'searcher':
      return <svg {...common}><circle cx="9" cy="9" r="4" /><circle cx="16" cy="15" r="4" /><path d="m12 11 1.2 1.2M6 17.5l-1.6 1.6M18.5 18.5l1.3 1.3" /></svg>;
    case 'heart':
      return <svg {...common}><path d="M12 19.5S4 15.2 4 9.6A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 8 2.6c0 5.6-8 9.9-8 9.9Z" /><path d="M12 10.2v5M9.5 12.7h5" /></svg>;
    case 'chart':
      return <svg {...common}><path d="M4 19V5M4 19h16" /><rect x="7" y="12" width="2.5" height="4" rx=".5" /><rect x="11" y="9" width="2.5" height="7" rx=".5" /><rect x="15" y="6" width="2.5" height="10" rx=".5" /></svg>;
    case 'spark':
      return <svg {...common}><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" /><circle cx="12" cy="12" r="3.2" /></svg>;
    case 'leaf':
      return <svg {...common}><path d="M20 4C11 4 5 7 5 13c0 4 3.5 7 7.5 7C18 20 20 13 20 4Z" /><path d="M4 21 16 9M10 15l-3-3M14 11l-1-3" /></svg>;
    case 'compass':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4 5.4-2.2Z" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" /></svg>;
    case 'calendar':
      return <svg {...common}><rect x="4" y="5.5" width="16" height="14" rx="1.5" /><path d="M8 3.5v4M16 3.5v4M4 9.5h16" /><path d="M8 13h.01M12 13h.01M16 13h.01M8 16h.01M12 16h.01" strokeWidth="2.5" /></svg>;
    case 'arrow-right':
      return <svg {...common}><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
  }
}

const navigation = [
  { label: 'Dashboard', icon: 'dashboard' as IconName, active: true, href: '/account' },
  { label: 'My Profile', icon: 'user' as IconName, href: '/profile' },
  { label: 'Compare Patterns', icon: 'users' as IconName, href: '/compare' },
  { label: 'Test History', icon: 'history' as IconName, href: '/history' },
  { label: 'Account Settings', icon: 'settings' as IconName, href: '/account/settings' },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const isActive = (href: string) => pathname === href || (href !== '/account' && pathname.startsWith(href));

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[272px] flex-col border-r border-[#e7e1dc] bg-[#FAF6EF] lg:flex">
      <div className="px-7 pb-8 pt-7">
        <div className="text-[60px] font-bold leading-[.82] tracking-[-.07em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
          CAT<span style={{ color: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>-20</span>
        </div>
        <div className="mt-3 text-[11px] font-semibold tracking-[-.01em]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          COGNITIVE ARCHETYPE TAXONOMY
        </div>
      </div>

      <nav className="px-5" aria-label="Primary navigation">
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-[66px] items-center gap-5 rounded-[14px] px-5 text-[16px] font-semibold transition-colors ${
                isActive(item.href)
                  ? 'bg-[#f0eaf4] text-[#38217c]'
                  : 'text-[#1a1a1a] hover:bg-[#f5f0ed]'
              }`}
              style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              <Icon name={item.icon} size={27} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto overflow-hidden px-8 pb-8 pt-10">
        <div className="mb-7 text-4xl" style={{ color: '#4B3B8C' }}>✦</div>
        <h2 className="max-w-[170px] text-[20px] font-bold leading-[1.15]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>CAT-20 is always evolving.</h2>
        <p className="mt-3 max-w-[170px] text-[15px] leading-6" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>More insights, tools, and connections are on the way.</p>
        <div className="relative -ml-1 mt-3 h-[122px] w-[220px] opacity-45">
          {[0, 1, 2, 3, 4].map((ring) => (
            <div key={ring} className="absolute rounded-full border border-[#d5cfd2]" style={{ inset: `${ring * 17}px ${ring * 18}px` }} />
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-[#e7e1dc]">
          <div className="text-sm mb-3" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            Signed in as <span style={{ color: '#1a1a1a', fontWeight: '600' }}>{user?.name || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold hover:opacity-80 transition"
            style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}