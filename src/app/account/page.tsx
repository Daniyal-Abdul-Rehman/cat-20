'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AccountHeader from '@/components/AccountHeader';
import AccountSidebar from '@/components/AccountSidebar';
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

function ArchetypeIllustration() {
  return (
    <div className="relative mx-auto h-[295px] w-[178px]" aria-label="Illustration of the Interpreter archetype">
      <svg viewBox="0 0 180 300" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="characterBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b48bd0" />
            <stop offset="1" stopColor="#8968ae" />
          </linearGradient>
          <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <ellipse cx="91" cy="282" rx="48" ry="7" fill="#18265c" opacity=".12" filter="url(#softShadow)" />
        <path d="M62 263c-1 9 0 17-2 21-4 3-12 1-15 5 8 4 26 3 28-2 2-7 0-16 2-24" fill="#10235f" />
        <path d="M108 263c3 9 4 18 8 21 5 1 10 2 12 5-7 4-23 2-27-3-3-6-4-16-5-24" fill="#10235f" />
        <path d="M55 66c-1-20 10-39 23-45 2 12 4 15 10 2 10 5 16 18 18 32 3 24 4 91 0 153-18 11-62 9-77-1-4-47-1-112 3-141 4-7 9-10 17-9Z" fill="url(#characterBody)" stroke="#17235e" strokeWidth="2.3" strokeDasharray="3 4" />
        <path d="M67 68c-6-7-14-4-17 5-2 8 2 18 9 20M103 70c7-6 14-2 16 6 2 8-1 16-8 18" fill="#b48bd0" stroke="#17235e" strokeWidth="2" />
        <path d="M57 92c-2-9 2-18 10-18 9 0 14 9 13 19-1 10-6 17-15 16-7-1-7-8-8-17ZM93 93c-1-10 4-19 13-19 8 0 12 8 11 18-1 10-7 17-15 17-7 0-8-7-9-16Z" fill="#fffdf9" stroke="#17235e" strokeWidth="2.1" />
        <ellipse cx="70" cy="94" rx="4.2" ry="7" fill="#18265c" /><ellipse cx="101" cy="94" rx="4.2" ry="7" fill="#18265c" />
        <circle cx="69" cy="91" r="1.3" fill="white" /><circle cx="100" cy="91" r="1.3" fill="white" />
        <path d="M85 100c-5 1-6 9-1 10 5 0 7-4 5-7" fill="none" stroke="#17235e" strokeWidth="1.4" />
        <path d="M77 121c4 3 10 3 15 0" fill="none" stroke="#17235e" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M55 132c-10 8-17 20-26 28-5 4-4 10 2 10 11-2 20-13 29-24M116 141c11 5 18 16 17 25-1 6-7 7-10 2-4-7-8-13-14-16" fill="none" stroke="#10235f" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 143c11 3 39 3 54-1M59 161c14 3 38 3 55-1M58 180c16 3 37 3 57-1M59 200c13 3 35 3 54-1M61 221c13 2 32 2 49-1" fill="none" stroke="#6d4b95" strokeWidth="1.2" opacity=".8" />
        <path d="m29 57 3 6 6 3-6 3-3 7-3-7-6-3 6-3 3-6ZM145 38l2 5 5 2-5 2-2 6-2-6-5-2 5-2 2-5ZM153 159l2 5 5 2-5 2-2 6-2-6-5-2 5-2 2-5Z" fill="none" stroke="#4e238f" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

const patternRows: { label: string; value: number; color: string; icon: IconName }[] = [
  { label: 'Thinker', value: 34, color: '#4B3B8C', icon: 'brain' },
  { label: 'Seeker', value: 28, color: '#C4A747', icon: 'searcher' },
  { label: 'Nurturer', value: 22, color: '#8862c7', icon: 'heart' },
  { label: 'Builder', value: 8, color: '#1b5dc9', icon: 'chart' },
  { label: 'Spark', value: 15, color: '#efad10', icon: 'spark' },
  { label: 'Wanderer', value: 3, color: '#11978c', icon: 'leaf' },
];

function PatternCard() {
  return (
    <section className="rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7" aria-labelledby="pattern-heading">
      <div className="flex items-center justify-between gap-4">
        <h2 id="pattern-heading" className="text-[17px] font-bold tracking-[-.02em]" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>YOUR CAT-20 PATTERN</h2>
        <Link href="/about#cat-20-pattern" className="flex items-center gap-2 text-[14px] hover:opacity-80" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          What&apos;s This? <Icon name="info" size={19} />
        </Link>
      </div>

      <div className="mt-6 space-y-5">
        {patternRows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: row.color }}>
              <Icon name={row.icon} size={25} strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[16px] font-semibold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{row.label}</span>
                <span className="text-[25px] font-bold tracking-[-.04em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{row.value}%</span>
              </div>
              <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#e8e5e5]">
                <div className="h-full rounded-full" style={{ width: `${Math.min(row.value * 2.3, 100)}%`, backgroundColor: row.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 border-t border-[#e7e2df] pt-5 text-center">
        <Link href="/profile#breakdown" className="inline-flex items-center gap-4 text-[15px] font-semibold hover:opacity-80" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          View Full Breakdown <Icon name="arrow-right" size={22} />
        </Link>
      </div>
    </section>
  );
}

function ExplorerBanner() {
  return (
    <section className="relative flex flex-col gap-6 overflow-hidden rounded-[18px] border border-[#e5dfe7] bg-[#f3eff6] px-6 py-5 md:flex-row md:items-center md:px-7" aria-label="Continue exploring">
      <div className="relative z-10 flex h-[102px] w-[102px] shrink-0 items-center justify-center rounded-full border border-[#e0d5e8] bg-[#eee7f3] shadow-inner" style={{ color: '#4B3B8C' }}>
        <Icon name="compass" size={65} strokeWidth={1.15} />
      </div>
      <div className="relative z-10 flex-1">
        <h2 className="text-[29px] font-bold leading-tight tracking-[-.03em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>Keep Exploring Your Pattern</h2>
        <p className="mt-2 max-w-[580px] text-[15px] leading-6" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Dive deeper into your strengths, your natural tendencies,<br className="hidden md:block" /> and how you show up in the world.</p>
      </div>
      <Link href="/profile" className="relative z-10 inline-flex items-center gap-4 whitespace-nowrap text-[16px] font-semibold hover:opacity-80 md:mr-4" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Continue Exploring <Icon name="arrow-right" size={23} /></Link>
      <div className="pointer-events-none absolute -right-4 -top-10 h-[190px] w-[220px] opacity-55">
        {[0, 1, 2, 3, 4].map((line) => <div key={line} className="absolute h-[220px] w-[220px] rounded-[45%] border border-[#d6cbdc]" style={{ right: `${line * 19}px`, top: `${line * 9}px` }} />)}
      </div>
    </section>
  );
}

function LatestTest() {
  return (
    <section className="flex flex-col gap-5 rounded-[18px] border border-[#e5e0dc] bg-[#fdfbf8] px-6 py-5 md:flex-row md:items-center md:justify-between md:px-7">
      <div className="flex items-center gap-4">
        <div className="-mt-8 text-3xl" style={{ color: '#4B3B8C' }}>✦</div>
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#f1ecf6]" style={{ color: '#4B3B8C' }}><Icon name="brain" size={32} strokeWidth={1.45} /></div>
        <div>
          <div className="text-[15px] font-bold uppercase tracking-[-.01em]" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>YOUR LATEST TEST</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}><Icon name="calendar" size={17} /> Completed on May 17, 2026</div>
          <div className="mt-2 inline-flex rounded-full bg-[#efebf2] px-4 py-1 text-[14px] font-semibold" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Primary: The Interpreter (TS)</div>
        </div>
      </div>
      <Link href="/results" className="inline-flex items-center gap-4 whitespace-nowrap text-[15px] font-semibold hover:opacity-80 md:mr-2" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>View Full Results <Icon name="arrow-right" size={22} /></Link>
    </section>
  );
}

export default function Account() {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center" style={{ color: '#1a1a1a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#4B3B8C' }}></div>
          <p className="mt-4" style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <AccountHeader />
      <AccountSidebar />

      <main className="lg:pl-[272px]">
        <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-7 md:px-8 xl:px-10">
          <header className="mb-6 flex items-start justify-between gap-5">
            <div>
              <h1 className="text-[37px] font-bold leading-tight tracking-[-.045em] md:text-[43px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>Welcome back, {user?.name || 'User'}. <span className="text-[33px]" style={{ fontFamily: 'sans-serif' }}>👋</span></h1>
              <p className="mt-1 text-[17px] md:text-[19px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Here&apos;s your pattern. Keep exploring.</p>
            </div>
            <div className="hidden items-center gap-7 pt-2 lg:flex" style={{ color: '#1a1a1a' }}>
              <Link href="/notifications" aria-label="Notifications" className="transition-colors hover:opacity-80"><Icon name="bell" size={30} /></Link>
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full font-serif text-[27px] font-bold text-white" style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
            </div>
          </header>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(390px,.95fr)]">
            <section className="relative overflow-hidden rounded-[20px] border border-[#e5e0dc] bg-[#fdfbf8] p-6 shadow-[0_2px_8px_rgba(24,22,55,0.02)] md:p-7" aria-labelledby="archetype-heading">
              <div className="relative z-10 flex items-center gap-3 text-[17px] font-bold tracking-[-.02em]" style={{ color: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}><Icon name="brain" size={31} strokeWidth={1.35} /> YOUR COGNITIVE ARCHETYPE</div>
              <div className="mt-7 grid items-center md:grid-cols-[minmax(0,1fr)_185px] md:gap-1">
                <div className="relative z-10">
                  <h2 id="archetype-heading" className="text-[67px] font-bold leading-[.88] tracking-[-.06em] md:text-[76px]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>The<br />Interpreter <span className="text-[22px] font-semibold tracking-[-.04em] md:text-[24px]" style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>(TS)</span></h2>
                  <p className="mt-5 text-[30px] italic leading-none tracking-[-.04em]" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}><span>Thinker</span><span className="px-2" style={{ color: '#4B3B8C' }}>×</span><span style={{ color: '#C4A747' }}>Seeker</span></p>
                  <div className="mt-5 h-[2px] w-10" style={{ backgroundColor: '#4B3B8C' }} />
                  <p className="mt-4 max-w-[390px] text-[15px] leading-[1.58] md:text-[16px]" style={{ color: '#666666', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>You naturally look for understanding before moving on, often thinking things through until they finally make sense. But even once you&apos;ve found clarity, your curiosity rarely stays still for long. Looking beyond the obvious and exploring what else might be true simply comes <strong className="font-bold" style={{ color: '#4B3B8C' }}>naturally to you.</strong></p>
                  <Link href="/profile" className="mt-5 inline-flex items-center gap-7 rounded-[7px] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(84,32,165,.2)] transition hover:opacity-90" style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Explore Your Profile <Icon name="arrow-right" size={23} /></Link>
                </div>
                <div className="relative z-10 mt-8 md:mt-16"><ArchetypeIllustration /></div>
              </div>
              <div className="pointer-events-none absolute -right-12 top-16 h-[310px] w-[200px] opacity-60">
                <div className="absolute inset-0 rounded-full border border-[#d8c7cb]" />
                <div className="absolute inset-[30px] rounded-full border border-[#d8c7cb]" />
                <div className="absolute inset-[61px] rounded-full border border-[#d8c7cb]" />
                <div className="absolute right-[90px] top-[108px] h-3 w-3 rounded-full" style={{ backgroundColor: '#C4A747' }} />
                <div className="absolute right-[110px] top-[230px] h-3 w-3 rounded-full" style={{ backgroundColor: '#4B3B8C' }} />
              </div>
            </section>

            <PatternCard />
          </div>

          <div className="mt-5"><ExplorerBanner /></div>
          <div className="mt-5"><LatestTest /></div>
        </div>
      </main>
    </div>
  );
}

