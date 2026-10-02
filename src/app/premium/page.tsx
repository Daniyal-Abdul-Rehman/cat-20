'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccountHeader from '@/components/AccountHeader';
import AccountSidebar from '@/components/AccountSidebar';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { authApi } from '@/lib/api';
import { parsePattern, CLUSTER_DISPLAY_NAMES } from '@/lib/clusterColors';

type TabKey = 'love' | 'social' | 'career';

type Insight = {
  number: string;
  title: string;
  paragraphs: string[];
  accent?: 'purple' | 'gold';
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'love', label: 'Love & Relationships' },
  { key: 'social', label: 'Social Dynamics' },
  { key: 'career', label: 'Career & Direction' },
];

// Dynamic insight generation based on cognitive pattern
const generateLoveInsights = (pattern: string, scores: Record<string, number>): Insight[] => {
  const primaryPattern = pattern.split(' × ')[0];
  const thinkerScore = scores.thinker || 0;
  const seekerScore = scores.seeker || 0;
  const nurturerScore = scores.nurturer || 0;
  const builderScore = scores.builder || 0;
  const sparkScore = scores.spark || 0;
  const wandererScore = scores.wanderer || 0;

  // Base insights with pattern-specific variations
  const baseInsights: Insight[] = [
    {
      number: '01',
      title: 'What Draws You Deeper',
      paragraphs: [
        'Someone can hold your interest when they continue surprising you beyond your first impression. Maybe there\'s more complexity to the way they think than you expected, an unusual perspective you hadn\'t considered, or sides of them that only become visible with time.',
        'Sometimes knowing someone longer doesn\'t make them feel more predictable—it simply gives you more pieces of them to notice.',
      ],
    },
    {
      number: '02',
      title: 'How Your Pattern Shows Up in Love',
      paragraphs: [
        'When someone matters to you, they can naturally become part of your inner world. A conversation might come back to you hours later. Something small they said can connect with something you noticed weeks ago. You may privately turn situations over before deciding whether they\'re even worth bringing up.',
        'You can also want room for the relationship to have substance. Not every moment needs to be serious, but constantly staying at the level of small talk, routine, or "don\'t think about it that much" can eventually leave part of you unstimulated.',
        'And because so much processing can happen privately, someone may not always realize how much thought you\'ve actually given to them or the relationship.',
      ],
    },
    {
      number: '03',
      title: 'Where Love Can Get Complicated',
      paragraphs: [
        'Your ability to keep looking at something from another angle can become much less helpful when feelings are involved.',
        'Mixed signals can generate several explanations. A disagreement can continue in your head after it\'s technically over. You may reconsider whether you interpreted something correctly, notice a new detail, and reopen a question you thought you\'d settled.',
        'That can be useful when there\'s genuinely more to the story. But sometimes relationships don\'t provide a perfectly satisfying conclusion. There are moments when choosing what you believe, saying what you need, or accepting what someone has shown you matters more than finding one final interpretation that makes every piece fit.',
      ],
    },
  ];

  // Add pattern-specific customization
  if (thinkerScore > 30) {
    baseInsights[1].paragraphs.push(
      'Your analytical mind means you tend to process relationship dynamics through understanding and logic. You may find yourself trying to "solve" relationship challenges the same way you approach complex problems.'
    );
  }

  if (seekerScore > 25) {
    baseInsights[0].paragraphs.push(
      'Your seeking nature makes you naturally curious about what makes people tick. You\'re drawn to depth and authenticity in relationships, often asking questions that others might not think to ask.'
    );
  }

  if (nurturerScore > 20) {
    baseInsights[2].paragraphs.push(
      'Your nurturing side means you care deeply about emotional connection and harmony. When conflicts arise, you may find yourself focusing on how everyone feels rather than just the logical resolution.'
    );
  }

  return baseInsights;
};

const generateSocialInsights = (pattern: string, scores: Record<string, number>): Insight[] => {
  const sparkScore = scores.spark || 0;
  const wandererScore = scores.wanderer || 0;
  const nurturerScore = scores.nurturer || 0;

  return [
    {
      number: '01',
      title: 'Your Social Energy',
      paragraphs: [
        sparkScore > 25 
          ? 'You naturally bring energy and enthusiasm to social situations. Your presence can light up a room, and people are often drawn to your vitality and optimism.'
          : 'You approach social interactions with a more measured energy. You prefer quality over quantity in your connections, and you often find yourself being the observer rather than the center of attention.',
        'Your social style isn\'t about being the most outgoing person in the room—it\'s about how you authentically connect with others in a way that feels natural to you.',
      ],
    },
    {
      number: '02',
      title: 'Communication Style',
      paragraphs: [
        'You tend to communicate in ways that reflect your cognitive pattern. You might notice patterns in conversations that others miss, or you might be particularly good at reading between the lines.',
        'Your communication style can be both a strength and a challenge. You excel at depth and meaningful conversation, but sometimes you might overthink social dynamics or interpret things more deeply than intended.',
      ],
    },
    {
      number: '03',
      title: 'Building Connections',
      paragraphs: [
        wandererScore > 20
          ? 'You value freedom and independence in your social connections. You\'re likely to have a diverse range of friends from different walks of life, and you appreciate relationships that give you space to explore and grow.'
          : 'You tend to build deeper, more focused connections with fewer people. You value consistency and depth in your relationships, and you\'re often the person friends turn to for thoughtful advice.',
        'The key is finding connections that honor your natural tendencies while still challenging you to grow.',
      ],
    },
  ];
};

const generateCareerInsights = (pattern: string, scores: Record<string, number>): Insight[] => {
  const builderScore = scores.builder || 0;
  const thinkerScore = scores.thinker || 0;
  const sparkScore = scores.spark || 0;

  return [
    {
      number: '01',
      title: 'Your Natural Strengths',
      paragraphs: [
        builderScore > 25
          ? 'You have a natural talent for building and creating. You\'re likely to excel in roles where you can see projects through from conception to completion, and you take pride in tangible results.'
          : 'You excel in roles that require deep thinking and analysis. You\'re at your best when you can dive deep into complex problems and emerge with well-reasoned solutions.',
        'Your cognitive pattern gives you unique advantages in certain work environments. The key is identifying roles that leverage these natural strengths.',
      ],
    },
    {
      number: '02',
      title: 'Ideal Work Environment',
      paragraphs: [
        'You thrive in environments that respect your need for depth and meaning. Superficial work or constant interruption can drain your energy, while focused, meaningful work can be deeply fulfilling.',
        'You likely prefer environments where you have autonomy and the space to think deeply. Micromanagement and excessive structure can feel particularly constraining to your natural way of working.',
      ],
    },
    {
      number: '03',
      title: 'Growth and Development',
      paragraphs: [
        sparkScore > 25
          ? 'You\'re naturally inclined toward innovation and creative problem-solving. You may find yourself drawn to entrepreneurial ventures or roles that allow you to bring new ideas to life.'
          : 'You grow best through systematic learning and deep expertise. You may find satisfaction in becoming a subject matter expert or in roles that require specialized knowledge.',
        'Your development path should honor both your strengths and your need for intellectual stimulation. The right environment will provide both challenges and support for your growth.',
      ],
    },
  ];
};

function ArrowLeft({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12H4M10 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComingSoonTab({ tab }: { tab: 'social' | 'career' }) {
  const title = tab === 'social' ? 'Social Dynamics' : 'Career & Direction';
  const description = tab === 'social'
    ? 'Your Social Dynamics interpretation will appear here once its design and insight content are ready.'
    : 'Your Career & Direction interpretation will appear here once its design and insight content are ready.';

  return (
    <section className="py-12 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Premium Profile</p>
        <h2 className="mt-4 text-[37px] font-bold leading-tight tracking-[-.045em] md:text-[43px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.58] md:text-[16px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{description}</p>
        <div className="mx-auto mt-6 h-[2px] w-10" style={{ backgroundColor: '#C4A747' }} />
      </div>
    </section>
  );
}

function InsightBlock({ insight, index }: { insight: Insight; index: number }) {
  const accent = insight.accent ?? (index === 1 ? 'gold' : 'purple');
  return (
    <article className="pb-8">
      <div className="flex items-start gap-4">
        <div className={`flex shrink-0 h-12 w-12 items-center justify-center rounded-full text-white md:h-14 md:w-14 ${accent === 'gold' ? 'bg-[#C4A747]' : 'bg-[#4B3B8C]'}`}>
          <span className="text-[20px] font-bold md:text-[24px]" style={{ fontFamily: 'var(--font-playfair), serif' }}>{insight.number}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-[22px] font-bold leading-tight tracking-[-.045em] md:text-[28px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>{insight.title}</h2>
          <div className="mt-4 space-y-3 text-[15px] leading-[1.58] md:text-[16px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {insight.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
      <div className="relative mt-6 flex items-center">
        <div className="flex-1 h-px" style={{ backgroundColor: '#e5e0dc' }} />
        <div className="mx-4 h-2 w-2 rounded-full" style={{ backgroundColor: accent === 'gold' ? '#C4A747' : '#4B3B8C' }} />
        <div className="flex-1 h-px" style={{ backgroundColor: '#e5e0dc' }} />
      </div>
    </article>
  );
}

export default function PremiumProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, checkAuth, refreshUserData } = useAuthStore();
  const { theme } = useThemeStore();
  const [activeTab, setActiveTab] = useState<TabKey>('love');
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [dynamicInsights, setDynamicInsights] = useState<Record<TabKey, Insight[]>>({
    love: [],
    social: [],
    career: [],
  });
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);

  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
  const nextTab = tabs[(activeIndex + 1) % tabs.length];

  // Check authentication and premium access
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin?redirect=/premium');
      return;
    }

    // Only refresh user data once to prevent infinite loop
    if (!hasRefreshed) {
      setHasRefreshed(true);
      
      // Force refresh user data to get latest subscription status
      refreshUserData().then(() => {
        const { user: refreshedUser } = useAuthStore.getState();
        const hasPremium = refreshedUser?.subscriptionTier === 'premium';
        setHasPremiumAccess(hasPremium);
        
        console.log('Premium access check:', {
          subscriptionTier: refreshedUser?.subscriptionTier,
          hasPremiumAccess: hasPremium,
          user: refreshedUser,
          assessmentResults: refreshedUser?.assessmentResults
        });
        
        // Force set premium access to true for debugging if subscription tier is premium
        if (refreshedUser?.subscriptionTier === 'premium') {
          console.log('Setting premium access to true based on subscription tier');
          setHasPremiumAccess(true);
        }

        // Generate dynamic insights based on assessment results
        if (refreshedUser?.assessmentResults?.pattern && refreshedUser?.assessmentResults?.scores) {
          const pattern = refreshedUser.assessmentResults.pattern;
          const scores = refreshedUser.assessmentResults.scores;

          setDynamicInsights({
            love: generateLoveInsights(pattern, scores),
            social: generateSocialInsights(pattern, scores),
            career: generateCareerInsights(pattern, scores),
          });
        }
      }).catch(error => {
        console.error('Failed to refresh user data:', error);
        // Fallback to current user data
        const hasPremium = user?.subscriptionTier === 'premium';
        setHasPremiumAccess(hasPremium);
      });
    }
  }, [isAuthenticated, refreshUserData, hasRefreshed]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center" style={{ color: '#1a1a1a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#4B3B8C' }}></div>
          <p className="mt-4" style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Loading premium profile...</p>
        </div>
      </div>
    );
  }

  // Show upgrade prompt if no premium access
  // Temporary override: show premium content if user has assessment results
  const hasAssessmentResults = user?.assessmentResults?.pattern && user?.assessmentResults?.scores;
  const shouldShowPremium = hasPremiumAccess || hasAssessmentResults;
  
  if (!shouldShowPremium) {
    return (
      <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
        <AccountHeader />
        <AccountSidebar />
        <main className="lg:pl-[272px]">
          <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-7 md:px-8 xl:px-10">
            <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7 text-center py-16">
              <div className="mx-auto max-w-2xl">
                <div className="flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-6" style={{ backgroundColor: '#C4A747' }}>
                  <svg width={40} height={40} viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="m2 4 3 12 5-12 5 12 3-12-3-4-3 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-[37px] font-bold leading-tight tracking-[-.045em] md:text-[43px] mb-4" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                  Unlock Your Premium Profile
                </h2>
                <p className="text-[15px] leading-[1.58] md:text-[16px] mb-8" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Get detailed insights about your relationships, career direction, and social communication style based on your unique cognitive pattern.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#4B3B8C' }} />
                    <span className="text-[15px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>In-depth Love & Relationships analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#C4A747' }} />
                    <span className="text-[15px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Social Dynamics insights</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#8862c7' }} />
                    <span className="text-[15px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Career & Direction guidance</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/payment')}
                  className="mt-8 inline-flex items-center gap-3 rounded-[7px] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(196,167,71,.3)] transition hover:opacity-90"
                  style={{ backgroundColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  Unlock for $10 <ArrowRight size={18} />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  // Show no assessment data prompt
  if (!user?.assessmentResults?.pattern || !user?.assessmentResults?.scores) {
    return (
      <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
        <AccountHeader />
        <AccountSidebar />
        <main className="lg:pl-[272px]">
          <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-7 md:px-8 xl:px-10">
            <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7 text-center py-16">
              <div className="mx-auto max-w-2xl">
                <div className="flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-6" style={{ backgroundColor: '#4B3B8C' }}>
                  <svg width={40} height={40} viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9.5 4.2a3 3 0 0 0-5 2.3 3.2 3.2 0 0 0 .3 1.3 3.4 3.4 0 0 0 .5 6.5A3 3 0 0 0 8 19.5c.7.3 1.3.4 2 .2V5.8a2.7 2.7 0 0 0-.5-1.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.5 4.2a3 3 0 0 1 5 2.3 3.2 3.2 0 0 1-.3 1.3 3.4 3.4 0 0 1-.5 6.5 3 3 0 0 1-2.7 5.2c-.7.3-1.3.4-2 .2V5.8c0-.6.2-1.2.5-1.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-[37px] font-bold leading-tight tracking-[-.045em] md:text-[43px] mb-4" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                  Complete Your Assessment
                </h2>
                <p className="text-[15px] leading-[1.58] md:text-[16px] mb-8" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  You need to complete the CAT-20 assessment first to access your premium profile insights.
                </p>
                <button
                  onClick={() => router.push('/assessment')}
                  className="inline-flex items-center gap-3 rounded-[7px] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(84,32,165,.2)] transition hover:opacity-90"
                  style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  Take Assessment <ArrowRight size={18} />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  const pattern = user.assessmentResults.pattern;
  const archetype = user.assessmentResults.archetype || 'Your Pattern';

  // Parse pattern to get cluster colors
  const { primaryColor, secondaryColor, archetypeName, profileCode } = parsePattern(pattern);

  const handleShare = async () => {
    try {
      const response = await authApi.generateShareToken();
      const token = response.shareToken;
      setShareToken(token);
      setShareUrl(`${window.location.origin}/public/premium/${token}`);
      setShowShareModal(true);
    } catch (error) {
      console.error('Failed to generate share token:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <AccountHeader />
      <AccountSidebar />

      <main className="lg:pl-[272px]">
        <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-7 md:px-8 xl:px-10">
          {/* Back to Account */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/account')}
              className="inline-flex items-center gap-2 text-[15px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: theme.primary, fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              <ArrowLeft size={18} />
              <span>Back to Account</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-[15px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: theme.secondary, fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 6l-4-4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Share Profile</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex items-center gap-6 overflow-x-auto whitespace-nowrap pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative shrink-0 py-2 text-[15px] font-semibold transition-colors ${
                  activeTab === tab.key
                    ? 'text-[var(--theme-primary)]'
                    : 'text-[#666666] hover:text-[var(--theme-primary)]'
                }`}
                style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                {tab.label}
                {activeTab === tab.key && <span className="absolute -bottom-[2px] left-0 right-0 h-[2px]" style={{ backgroundColor: theme.primary }} />}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-5">
            {activeTab === 'love' ? (
              <>
                <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.secondary, fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Premium Profile</p>
                  <h1 className="mt-3 text-[54px] font-bold leading-[0.91] tracking-[-.06em] md:text-[76px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    {archetype}<br />
                    <span style={{ color: theme.primary }}>in Love &amp; Relationships</span>
                  </h1>
                  <p className="mt-4 text-[30px] italic leading-none tracking-[-.04em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    {pattern}
                  </p>
                  <div className="mt-5 h-[2px] w-10" style={{ backgroundColor: theme.primary }} />
                </section>
                
                <section aria-label="Love and relationship insights" className="space-y-5">
                  {dynamicInsights.love.map((insight, index) => <InsightBlock key={insight.number} insight={insight} index={index} />)}
                </section>
              </>
            ) : activeTab === 'social' ? (
              <>
                <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.secondary, fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Premium Profile</p>
                  <h1 className="mt-3 text-[54px] font-bold leading-[0.91] tracking-[-.06em] md:text-[76px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    {archetype}<br />
                    <span style={{ color: theme.primary }}>in Social Dynamics</span>
                  </h1>
                  <p className="mt-4 text-[30px] italic leading-none tracking-[-.04em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    {pattern}
                  </p>
                  <div className="mt-5 h-[2px] w-10" style={{ backgroundColor: theme.primary }} />
                </section>

                <section aria-label="Social dynamics insights" className="space-y-5">
                  {dynamicInsights.social.map((insight, index) => <InsightBlock key={insight.number} insight={insight} index={index} />)}
                </section>
              </>
            ) : (
              <>
                <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.secondary, fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Premium Profile</p>
                  <h1 className="mt-3 text-[54px] font-bold leading-[0.91] tracking-[-.06em] md:text-[76px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    {archetype}<br />
                    <span style={{ color: theme.primary }}>in Career &amp; Direction</span>
                  </h1>
                  <p className="mt-4 text-[30px] italic leading-none tracking-[-.04em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
                    {pattern}
                  </p>
                  <div className="mt-5 h-[2px] w-10" style={{ backgroundColor: theme.primary }} />
                </section>
                
                <section aria-label="Career insights" className="space-y-5">
                  {dynamicInsights.career.map((insight, index) => <InsightBlock key={insight.number} insight={insight} index={index} />)}
                </section>
              </>
            )}

            {/* Footer Navigation */}
            <footer className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <button 
                  type="button" 
                  onClick={() => router.push('/account')} 
                  className="inline-flex items-center gap-3 text-[15px] font-semibold transition-opacity hover:opacity-80"
                  style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  <ArrowLeft size={18} /> Back to Account
                </button>
                <div className="hidden h-px flex-1 bg-[#e5e0dc] md:block" />
                <button 
                  type="button" 
                  onClick={() => setActiveTab(nextTab.key)} 
                  className="inline-flex items-center gap-3 rounded-[7px] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(84,32,165,.2)] transition hover:opacity-90"
                  style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  Next: {nextTab.label} <ArrowRight size={18} />
                </button>
              </div>
            </footer>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowShareModal(false)}>
          <div 
            className="mx-4 max-w-md rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[22px] font-bold leading-tight tracking-[-.045em] md:text-[28px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>
              Share Your Profile
            </h3>
            <p className="mt-3 text-[15px] leading-[1.58] md:text-[16px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Share your premium profile with others using this link:
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 rounded-[7px] border border-[#e5e0dc] bg-[#fff] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#4B3B8C]"
                style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              />
              <button
                type="button"
                onClick={copyToClipboard}
                className="rounded-[7px] bg-[#4B3B8C] px-4 py-3 text-[15px] font-semibold text-white transition hover:opacity-90"
                style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                Copy
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full rounded-[7px] border border-[#e5e0dc] px-4 py-3 text-[15px] font-semibold transition hover:bg-[#f5f0e8]"
              style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}