'use client'
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { archetypes } from '@/data/archetypes';
import { useState, useEffect } from 'react';

const archetypeIcons: Record<string, string> = {
  thinker: '🧠',
  seeker: '🧭',
  builder: '🔷',
  nurturer: '❤️',
  spark: '✨',
  wanderer: '🌊',
};

const archetypeColors: Record<string, string> = {
  thinker: '#6B4C9A',
  seeker: '#C4A747',
  builder: '#4A7FB5',
  nurturer: '#C46B6B',
  spark: '#6B4C9A',
  wanderer: '#C4A747',
};

// Lighter background images for each card (using light/nature scenic backgrounds)
const archetypeBgImages: Record<string, string> = {
  thinker: '/thinker-bg.png',
  seeker: '/seeker-bg.png',
  builder: '/builder-bg.png',
  nurturer: '/nurturer-bg.png',
  spark: '/spark-bg.png',
  wanderer: '/wanderer-bg.png',
};

const archetypeExploreColors: Record<string, string> = {
  thinker: '#6B4C9A',
  seeker: '#C4A747',
  builder: '#4A7FB5',
  nurturer: '#C46B6B',
  spark: '#6B4C9A',
  wanderer: '#C4A747',
};

const cognitiveProfiles = [
  { initials: 'TS', name: 'The Insight Reader', combo: 'Thinker + Seeker', color: '#6B4C9A' },
  { initials: 'TB', name: 'The System Architect', combo: 'Thinker + Builder', color: '#4A7FB5' },
  { initials: 'SN', name: 'The Meaning Connector', combo: 'Spark + Nurturer', color: '#C46B6B' },
  { initials: 'BW', name: 'The Path Builder', combo: 'Builder + Wanderer', color: '#C4A747' },
  { initials: 'NS', name: 'The Empathic Guide', combo: 'Nurturer + Seeker', color: '#C46B6B' },
];

export default function Archetypes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const maxIndex = Math.max(0, cognitiveProfiles.length - cardsPerView);

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
        <section className="px-6 lg:px-8 py-20 relative overflow-hidden">
          {/* Background flowing graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/hero-bg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            {/* Fade overlay for text blending */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    to right,
                    #FAF6EF 25%,
                    rgba(250,246,239,0.95) 35%,
                    rgba(250,246,239,0.6) 50%,
                    transparent 70%
                  )
                `,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
            <div className="mb-6 flex flex-col items-center md:items-start">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-8" style={{ color: '#C4A747' }}>
                The Six Cognitive Archetypes
              </span>
            </div>

            <h1 className="text-5xl lg:text-4xl font-bold leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Six ways the mind
              <br />
              <span className="italic" style={{ color: '#4B3B8C' }}>makes sense</span> of the world.
            </h1>

            <p className="text-md lg:text-lg mb-10" style={{ color: '#444444', lineHeight: '1.8', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              We all think, feel, and act in our own way.
              <br />
              These six archetypes describe the natural patterns behind how we see the world and respond to it.
            </p>
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
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url('${archetypeBgImages[archetype.id] || archetypeBgImages.thinker}')`,
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
                    <span className="text-white text-2xl">
                      {archetypeIcons[archetype.id] || '✦'}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-white mb-2 font-serif">
                    The {archetype.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-white/90 text-sm mb-4">
                    {archetype.tagline}
                  </p>

                  {/* Explore link */}
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: archetypeExploreColors[archetype.id] || '#C4A747' }}>
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4"
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
                    From Six Archetypes To
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif mb-3" style={{ color: '#1a1a1a' }}>
                  20 <span className="text-sm font-normal" style={{ color: '#555' }}>unique</span>
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
                          <Link
                            href={`/profiles/${profile.initials.toLowerCase()}`}
                            className="text-xs font-medium hover:underline"
                            style={{ color: '#4B3B8C' }}
                          >
                            View Profile →
                          </Link>
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
