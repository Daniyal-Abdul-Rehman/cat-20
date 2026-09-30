'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountHeader from '@/components/AccountHeader';
import AccountSidebar from '@/components/AccountSidebar';
import { useAuthStore } from '@/store/authStore';
import { assessmentApi } from '@/lib/api';

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
  | 'arrow-right'
  | 'lock'
  | 'crown'
  | 'star';

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
    case 'lock':
      return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case 'crown':
      return <svg {...common}><path d="m2 4 3 12 5-12 5 12 3-12-3-4-3 4z" /><path d="M12 4v12" /></svg>;
    case 'star':
      return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
  }
}

const patternColors: Record<string, string> = {
  Thinker: '#4B3B8C',
  Seeker: '#C4A747',
  Nurturer: '#8862c7',
  Builder: '#1b5dc9',
  Spark: '#efad10',
  Wanderer: '#11978c',
};

const patternIcons: Record<string, IconName> = {
  Thinker: 'brain',
  Seeker: 'searcher',
  Nurturer: 'heart',
  Builder: 'chart',
  Spark: 'spark',
  Wanderer: 'leaf',
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [latestAssessment, setLatestAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    setAuthChecked(true);
  }, [checkAuth]);

  useEffect(() => {
    // Only redirect after auth has been checked
    if (authChecked && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!isAuthenticated) {
      return; // Still loading auth state
    }

    const fetchLatestAssessment = async () => {
      try {
        setLoading(true);
        const data = await assessmentApi.getLatestAssessment();
        setLatestAssessment(data);
      } catch (err) {
        console.error('Failed to fetch latest assessment:', err);
        // Don't set error - just means no assessment exists yet
        setLatestAssessment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAssessment();
  }, [isAuthenticated, router, authChecked]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-lg" style={{ color: '#666666' }}>Loading profile...</div>
      </div>
    );
  }

  const userPattern = latestAssessment?.primaryRoles?.[0] || user?.assessmentResults?.pattern || 'Unknown';
  const userScores = latestAssessment?.percentages || user?.assessmentResults?.scores || {};
  const userArchetype = latestAssessment?.primaryRoles?.join(' × ') || user?.assessmentResults?.archetype || 'Unknown';

  const patternEntries = Object.entries(userScores).sort(([, a], [, b]) => (b as number) - (a as number));

  const hasAssessmentData = latestAssessment || (user?.assessmentResults?.pattern && Object.keys(user?.assessmentResults?.scores || {}).length > 0);

  return (
    <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <AccountHeader />
      
      <div className="flex">
        <AccountSidebar />
        
        <main className="flex-1 lg:ml-[272px] p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                My Profile
              </h1>
              <p className="text-lg" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                Your cognitive archetype and assessment insights
              </p>
            </div>

            {/* User Info Card */}
            <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 mb-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full text-white text-3xl font-bold" style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    {user?.name || 'User'}
                  </h2>
                  <p className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    {user?.email || ''}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#efebf2] px-4 py-1.5 text-sm font-semibold" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    <Icon name="crown" size={16} />
                    {user?.subscriptionTier || 'Free'} Plan
                  </div>
                </div>
              </div>
            </section>

            {/* Pattern Breakdown */}
            <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 mb-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
                  YOUR CAT-20 PATTERN BREAKDOWN
                </h2>
                <div className="text-3xl" style={{ color: '#C4A747' }}>✦</div>
              </div>

              {!hasAssessmentData ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4" style={{ color: '#4B3B8C' }}>✦</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    No Assessment Data Yet
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Complete your first CAT-20 assessment to discover your cognitive pattern
                  </p>
                  <button
                    onClick={() => router.push('/assessment')}
                    className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-white font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                  >
                    Take Assessment <Icon name="arrow-right" size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#f0eaf4' }}>
                    <div className="text-center">
                      <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                        Primary Archetype
                      </div>
                      <div className="text-3xl font-bold mb-1" style={{ color: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>
                        {userArchetype}
                      </div>
                      <div className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                        {userPattern}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {patternEntries.map(([pattern, value]) => {
                      const color = patternColors[pattern] || '#4B3B8C';
                      const icon = patternIcons[pattern] || 'brain';
                      // The API returns percentages as 0-100, so just round them
                      const percentage = Math.round(value as number);
                      
                      return (
                        <div key={pattern} className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
                            <Icon name={icon} size={24} strokeWidth={1.6} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-base font-semibold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{pattern}</span>
                              <span className="text-2xl font-bold tracking-[-.04em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{percentage}%</span>
                            </div>
                            <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#e8e5e5]">
                              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: color }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>

            {/* Quick Actions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/history')}
                className="rounded-[18px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 text-left hover:border-[#4B3B8C] transition-colors shadow-[0_2px_8px_rgba(24,22,55,0.02)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: '#4B3B8C' }}>
                    <Icon name="history" size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Test History
                    </h3>
                    <p className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      View all your past assessments
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => router.push('/compare')}
                className="rounded-[18px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 text-left hover:border-[#4B3B8C] transition-colors shadow-[0_2px_8px_rgba(24,22,55,0.02)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: '#C4A747' }}>
                    <Icon name="users" size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Compare Patterns
                    </h3>
                    <p className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Compare your results over time
                    </p>
                  </div>
                </div>
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
