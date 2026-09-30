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

export default function ComparePage() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [history, setHistory] = useState<any[]>([]);
  const [selectedId1, setSelectedId1] = useState<string>('');
  const [selectedId2, setSelectedId2] = useState<string>('');
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    setAuthChecked(true);
  }, [checkAuth]);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await assessmentApi.getUserHistory();
        setHistory(data);
        
        // Auto-select the two most recent assessments
        if (data.length >= 2) {
          setSelectedId1(data[0].assessmentId || data[0].id);
          setSelectedId2(data[1].assessmentId || data[1].id);
        }
      } catch (err) {
        console.error('Failed to fetch assessment history:', err);
        setError('Failed to load assessment history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isAuthenticated, router, authChecked]);

  const handleCompare = async () => {
    if (!selectedId1 || !selectedId2 || selectedId1 === selectedId2) {
      setError('Please select two different assessments to compare');
      return;
    }

    try {
      setComparing(true);
      setError(null);
      const result = await assessmentApi.compareAssessments(selectedId1, selectedId2);
      setComparison(result);
    } catch (err) {
      console.error('Failed to compare assessments:', err);
      setError('Failed to compare assessments');
    } finally {
      setComparing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPrimaryPattern = (assessment: any) => {
    if (assessment.primaryRoles && assessment.primaryRoles.length > 0) {
      return assessment.primaryRoles[0];
    }
    if (assessment.roles && assessment.roles.primary && assessment.roles.primary.length > 0) {
      return assessment.roles.primary[0];
    }
    return 'Unknown';
  };

  const getArchetype = (assessment: any) => {
    if (assessment.primaryRoles && assessment.primaryRoles.length > 0) {
      return assessment.primaryRoles.join(' × ');
    }
    if (assessment.roles && assessment.roles.primary && assessment.roles.primary.length > 0) {
      return assessment.roles.primary.join(' × ');
    }
    return 'Unknown';
  };

  const getPercentages = (assessment: any) => {
    if (assessment.percentages) {
      return assessment.percentages;
    }
    if (assessment.scores) {
      return assessment.scores;
    }
    return {};
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-lg" style={{ color: '#666666' }}>Loading assessments...</div>
      </div>
    );
  }

  if (history.length < 2) {
    return (
      <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
        <AccountHeader />
        
        <div className="flex">
          <AccountSidebar />
          
          <main className="flex-1 lg:ml-[272px] p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-12 text-center shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
                <div className="text-6xl mb-4" style={{ color: '#4B3B8C' }}>✦</div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                  Need More Assessments
                </h2>
                <p className="text-lg mb-6" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  You need at least 2 completed assessments to compare your patterns.
                </p>
                <button
                  onClick={() => router.push('/assessment')}
                  className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-white font-semibold hover:opacity-90 transition"
                  style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  Take Another Assessment <Icon name="arrow-right" size={20} />
                </button>
              </section>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const assessment1 = history.find(a => (a.assessmentId || a.id) === selectedId1);
  const assessment2 = history.find(a => (a.assessmentId || a.id) === selectedId2);

  return (
    <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <AccountHeader />
      
      <div className="flex">
        <AccountSidebar />
        
        <main className="flex-1 lg:ml-[272px] p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                Compare Patterns
              </h1>
              <p className="text-lg" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                See how your cognitive pattern has evolved over time
              </p>
            </div>

            {/* Selection */}
            <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 mb-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
                Select Assessments to Compare
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assessment 1 */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    First Assessment
                  </label>
                  <select
                    value={selectedId1}
                    onChange={(e) => setSelectedId1(e.target.value)}
                    className="w-full rounded-lg border border-[#e5e0dc] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3B8C]"
                    style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                  >
                    {history.map((assessment) => (
                      <option key={assessment.assessmentId || assessment.id} value={assessment.assessmentId || assessment.id}>
                        {getArchetype(assessment)} - {formatDate(assessment.completedAt || assessment.createdAt)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assessment 2 */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Second Assessment
                  </label>
                  <select
                    value={selectedId2}
                    onChange={(e) => setSelectedId2(e.target.value)}
                    className="w-full rounded-lg border border-[#e5e0dc] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3B8C]"
                    style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                  >
                    {history.map((assessment) => (
                      <option key={assessment.assessmentId || assessment.id} value={assessment.assessmentId || assessment.id}>
                        {getArchetype(assessment)} - {formatDate(assessment.completedAt || assessment.createdAt)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCompare}
                  disabled={comparing || !selectedId1 || !selectedId2 || selectedId1 === selectedId2}
                  className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  {comparing ? 'Comparing...' : 'Compare Patterns'} <Icon name="arrow-right" size={20} />
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </section>

            {/* Comparison Results */}
            {comparison && assessment1 && assessment2 && (
              <div className="space-y-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Assessment 1 Card */}
                  <section className="rounded-[18px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: patternColors[getPrimaryPattern(assessment1)] || '#4B3B8C' }}>
                        <Icon name={patternIcons[getPrimaryPattern(assessment1)] || 'brain'} size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                          Assessment 1
                        </div>
                        <h3 className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                          {getArchetype(assessment1)}
                        </h3>
                      </div>
                    </div>
                    <div className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      <span className="inline mr-1"><Icon name="calendar" size={14} /></span>
                      {formatDate(assessment1.completedAt || assessment1.createdAt)}
                    </div>
                  </section>

                  {/* Assessment 2 Card */}
                  <section className="rounded-[18px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: patternColors[getPrimaryPattern(assessment2)] || '#4B3B8C' }}>
                        <Icon name={patternIcons[getPrimaryPattern(assessment2)] || 'brain'} size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                          Assessment 2
                        </div>
                        <h3 className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                          {getArchetype(assessment2)}
                        </h3>
                      </div>
                    </div>
                    <div className="text-sm" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      <span className="inline mr-1"><Icon name="calendar" size={14} /></span>
                      {formatDate(assessment2.completedAt || assessment2.createdAt)}
                    </div>
                  </section>
                </div>

                {/* Pattern Comparison */}
                <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
                  <h2 className="text-xl font-bold mb-6" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
                    Pattern Comparison
                  </h2>

                  <div className="space-y-5">
                    {Object.keys(patternColors).map((pattern) => {
                      const color = patternColors[pattern];
                      const icon = patternIcons[pattern];
                      const scores1 = getPercentages(assessment1);
                      const scores2 = getPercentages(assessment2);
                      const value1 = (scores1[pattern] || 0) * 100;
                      const value2 = (scores2[pattern] || 0) * 100;
                      const diff = value2 - value1;
                      const isIncrease = diff > 0;

                      return (
                        <div key={pattern} className="rounded-lg border border-[#e5e0dc] bg-white p-4">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
                              <Icon name={icon} size={20} strokeWidth={1.6} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-base font-semibold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{pattern}</span>
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                                    {Math.round(value1)}%
                                  </span>
                                  <span style={{ color: '#666666' }}><Icon name="arrow-right" size={16} /></span>
                                  <span className="text-lg font-bold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                                    {Math.round(value2)}%
                                  </span>
                                  <span className={`text-sm font-semibold ${isIncrease ? 'text-green-600' : 'text-red-600'}`} style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                                    {isIncrease ? '+' : ''}{Math.round(diff)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <div className="h-[6px] overflow-hidden rounded-full bg-[#e8e5e5]">
                                <div className="h-full rounded-full" style={{ width: `${value1}%`, backgroundColor: color }} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="h-[6px] overflow-hidden rounded-full bg-[#e8e5e5]">
                                <div className="h-full rounded-full" style={{ width: `${value2}%`, backgroundColor: color }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Insights */}
                <section className="rounded-[18px] border border-[#e5dfe7] bg-[#f3eff6] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: '#C4A747' }}>
                      <Icon name="info" size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                        Pattern Evolution Insights
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                        Your cognitive patterns can shift over time based on life experiences, personal growth, and changing circumstances. 
                        This comparison shows how your dominant traits have evolved between these two assessments. 
                        Small fluctuations are normal, while significant changes may indicate meaningful personal development.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
