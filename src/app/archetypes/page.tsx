'use client'
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { archetypes } from '@/data/archetypes';
import { useState, useEffect, useRef } from 'react';
import { Brain, Compass, Hammer, Heart, Zap, Globe } from 'lucide-react';
import gsap from 'gsap';

const archetypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  thinkers: Brain,
  seekers: Compass,
  builders: Hammer,
  nurturers: Heart,
  sparks: Zap,
  wanderers: Globe,
};

const archetypeColors: Record<string, string> = {
  thinkers: '#6B4C9A',
  seekers: '#C4A747',
  builders: '#4A7FB5',
  nurturers: '#C46B6B',
  sparks: '#6B4C9A',
  wanderers: '#C4A747',
};

// Lighter background images for each card (using light/nature scenic backgrounds)
const archetypeBgImages: Record<string, string> = {
  thinkers: '/thinker-bg.png',
  seekers: '/seeker-bg.png',
  builders: '/builder-bg.png',
  nurturers: '/nurturer-bg.png',
  sparks: '/spark-bg.png',
  wanderers: '/wanderer-bg.png',
};

const archetypeExploreColors: Record<string, string> = {
  thinkers: '#6B4C9A',
  seekers: '#C4A747',
  builders: '#4A7FB5',
  nurturers: '#C46B6B',
  sparks: '#6B4C9A',
  wanderers: '#C4A747',
};

const cognitiveProfiles = [
  { initials: 'TS', name: 'The Interpreter', combo: 'Thinker + Seeker', color: '#6B4C9A' },
  { initials: 'BT', name: 'The Strategist', combo: 'Builder + Thinker', color: '#4A7FB5' },
  { initials: 'SN', name: 'The Gentle Explorer', combo: 'Spark + Nurturer', color: '#C46B6B' },
  { initials: 'KN', name: 'The Encourager', combo: 'Seeker + Nurturer', color: '#C4A747' },
  { initials: 'BW', name: 'The Steady Builder', combo: 'Builder + Wanderer', color: '#4A7FB5' },
  { initials: 'NT', name: 'The Reflector', combo: 'Nurturer + Thinker', color: '#C46B6B' },
  { initials: 'KS', name: 'The Inspirer', combo: 'Spark + Seeker', color: '#6B4C9A' },
  { initials: 'TB', name: 'The Architect', combo: 'Thinker + Builder', color: '#4A7FB5' },
  { initials: 'NW', name: 'The Haven', combo: 'Nurturer + Wanderer', color: '#C46B6B' },
  { initials: 'KT', name: 'The Innovator', combo: 'Seeker + Thinker', color: '#C4A747' },
  { initials: 'SB', name: 'The Pathfinder', combo: 'Spark + Builder', color: '#6B4C9A' },
  { initials: 'TW', name: 'The Grounded', combo: 'Thinker + Wanderer', color: '#4A7FB5' },
];

export default function Archetypes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const maxIndex = Math.max(0, cognitiveProfiles.length - cardsPerView);
  const heroBgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Subtle floating animation for hero background
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        y: 15,
        x: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      gsap.killTweensOf(heroBgRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-24 lg:py-32 relative overflow-hidden">
          {/* Background flowing graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              ref={heroBgRef}
              src="/hero-bg.png"
              alt="Hero Background"
              className="absolute right-0 top-0 w-[85%] h-full object-cover "
            />
            {/* Fade overlay for text blending - stronger fade on left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    to right,
                    #FAF6EF 35%,
                    rgba(250,246,239,0.9) 45%,
                    rgba(250,246,239,0.5) 60%,
                    transparent 75%
                  ),
                  linear-gradient(
                    to bottom,
                    #FAF6EF 8%,
                    rgba(250,246,239,0.85) 18%,
                    rgba(250,246,239,0.5) 35%,
                    transparent 55%
                  ),
                  linear-gradient(
                    to top,
                    #FAF6EF 8%,
                    rgba(250,246,239,0.85) 18%,
                    rgba(250,246,239,0.5) 35%,
                    transparent 55%
                  )
                `,
              }}
            />
          </div>

          <div className="relative max-w-9xl mx-auto z-10">
            <div className="grid lg:grid-cols-7 gap-4 items-start">
              {/* Left Content */}
              <div className="col-span-4 lg:pl-0 pl-0">
                <div className="mb-8 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-[1px] bg-[#C4A747]"></div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#C4A747]">
                      The Six Cognitive Archetypes
                    </span>
                  </div>
                </div>

                <h1 className="text-5xl lg:text-5xl font-serif leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  Six ways the mind
                  <br />
                  <span className="italic" style={{ color: '#4B3B8C' }}>makes sense</span> of the world.
                </h1>

                <div className="flex items-start gap-4 text-lg lg:text-xl leading-relaxed" style={{ color: '#444444', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  <div className="w-12 h-[1px] bg-[#C4A747] mt-3 hidden lg:block"></div>
                  <p className="max-w-lg">
                    We all think, feel, and act in our own way.
                    <br />
                    <br />
                    These six archetypes describe the natural patterns behind how we see the world and respond to it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Archetype Cards Grid */}
        <section className="px-6 lg:px-8 py-16 lg:py-6">
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {archetypes.map((archetype) => (
              <Link
                key={archetype.id}
                href={`/archetypes/${archetype.id}`}
                className="relative group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url('${archetypeBgImages[archetype.id] || archetypeBgImages.thinkers}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '280px',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  {/* Icon circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border-2 border-white/30"
                    style={{ backgroundColor: archetypeColors[archetype.id] || '#6B4C9A' }}
                  >
                    {(() => {
                      const Icon = archetypeIcons[archetype.id];
                      return Icon ? <Icon className="w-7 h-7 text-white" /> : <span className="text-white text-2xl">✦</span>;
                    })()}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-white mb-2 font-serif">
                    {archetype.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-white/90 text-sm mb-4">
                    {archetype.tagline}
                  </p>

                  {/* Explore link - animated on hover */}
                  <div
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out relative z-20"
                    style={{
                      color: archetypeExploreColors[archetype.id] || '#C4A747',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Blur overlay on hover */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>
          </div>
        </section>

        {/* Cognitive Profiles Section */}
        <section className="px-6 lg:px-8 py-16 lg:py-6">
          <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl border p-8 lg:p-10"
            style={{ borderColor: '#E8E4DD', backgroundColor: '#FFFFFF' }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Left text */}
              <div className="lg:w-2/5">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: '#4B3B8C' }}>✦</span>
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: '#4B3B8C' }}
                  >
                    From 6 Archetypes To
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif mb-3" style={{ color: '#1a1a1a' }}>
                  Countless <span className="text-sm font-normal" style={{ color: '#555' }}>unique</span>
                  <br />
                  cognitive profiles.
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#666666' }}>
                  CAT-20 combines these archetypes in
                  <br />
                  meaningful ways to reveal how your
                  <br />
                  mind naturally works.
                  <br />
                  Which profile feels most like you?
                </p>
                <Link
                  href="/profiles"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  View All 20 Profiles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Right - Profile cards carousel */}
              <div className="lg:w-3/5 relative">
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                  >
                    {cognitiveProfiles.map((profile) => (
                      <div
                        key={profile.initials}
                        className="flex-shrink-0 px-2"
                        style={{ width: `${100 / cardsPerView}%` }}
                      >
                        <div
                          className="rounded-xl border p-4 text-center h-full flex flex-col justify-center"
                          style={{ borderColor: '#E8E4DD', backgroundColor: '#FAFAFA', minHeight: '200px' }}
                        >
                          <div className="text-2xl font-bold mb-1" style={{ color: profile.color }}>
                            {profile.initials}
                          </div>
                          <div className="text-xs mb-2" style={{ color: '#C4A747' }}>✦</div>
                          <div className="text-sm font-semibold mb-1" style={{ color: '#1a1a1a' }}>
                            {profile.name}
                          </div>
                          <div className="text-xs mb-2" style={{ color: '#888888' }}>
                            {profile.combo}
                          </div>
                          <div className="text-xs mb-2">
                            <span style={{ color: profile.color }}>●</span>
                            <span className="mx-1" style={{ color: '#C4A747' }}>+</span>
                            <span style={{ color: profile.color }}>●</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Bottom tagline */}
        <section className="px-6 lg:px-8 py-16 lg:py-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ backgroundColor: '#C4A747' }} />
            <span style={{ color: '#C4A747' }}>✦</span>
            <p className="text-lg font-serif italic" style={{ color: '#4B3B8C' }}>
              No two minds <em>are the same.</em>
            </p>
            <span style={{ color: '#C4A747' }}>✦</span>
            <div className="h-px w-16" style={{ backgroundColor: '#C4A747' }} />
          </div>
        </section>
      </main>

    </div>
  );
}
