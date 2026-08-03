'use client'

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import archetypeContent from './archetype-explorer-content.json';
import { useParams } from 'next/navigation';

const archetypeBgImages: Record<string, string> = {
  thinkers: '/thinker-bg.png',
  seekers: '/seeker-bg.png',
  builders: '/builder-bg.png',
  nurturers: '/nurturer-bg.png',
  sparks: '/spark-bg.png',
  wanderers: '/wanderer-bg.png',
};

interface ArchetypeContent {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  content: {
    intro: string[];
    highlight: string;
    continuation: string[];
    closing: string;
  };
  accentColor: string;
}

export default function ArchetypePage() {
  const params = useParams();
  const archetypeId = params.id as string;
  
  // Normalize the ID to handle case sensitivity and trailing slashes
  const normalizedId = archetypeId?.toLowerCase().replace(/\/$/, '') || '';
  const archetype = archetypeContent.archetypes.find((a: ArchetypeContent) => a.id === normalizedId);

  if (!archetype) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">Archetype Not Found</h1>
            <Link href="/archetypes" className="text-[#4B3B8C] hover:underline">
              Back to Archetypes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero / Main Section - Split Layout */}
        <section className="bg-[#FAF6EF] relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
          {/* Background flowing image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={archetypeBgImages[normalizedId] || archetypeBgImages.thinkers}
              alt=""
              className="absolute right-0 top-0 w-[70%] h-full object-cover"
            />
            {/* Fade overlay for text blending - stronger fade on left */}
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
                  ),
                  linear-gradient(
                    to bottom,
                    #FAF6EF 5%,
                    rgba(250,246,239,0.8) 15%,
                    rgba(250,246,239,0.4) 30%,
                    transparent 50%
                  ),
                  linear-gradient(
                    to top,
                    #FAF6EF 5%,
                    rgba(250,246,239,0.8) 15%,
                    rgba(250,246,239,0.4) 30%,
                    transparent 50%
                  )
                `,
              }}
            />
          </div>

          <div className="max-w-9xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-7 gap-4 items-start">
              {/* Left Content */}
              <div className="flex flex-col justify-center col-span-4 lg:pl-8 pl-6 pt-6 pb-16">
              {/* Archetype label */}
              <div className="flex items-center gap-3 mb-6">
                {/* Sacred geometry icon */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
                  <circle cx="14" cy="14" r="13" stroke={archetype.accentColor} strokeWidth="1" />
                  <circle cx="14" cy="14" r="8" stroke={archetype.accentColor} strokeWidth="1" />
                  <polygon points="14,3 18,10 14,14 10,10" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                  <polygon points="14,25 18,18 14,14 10,18" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                  <polygon points="3,14 10,10 14,14 10,18" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                  <polygon points="25,14 18,10 14,14 18,18" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                </svg>
                <span
                  className="text-sm font-semibold uppercase tracking-[0.2em]"
                  style={{ color: archetype.accentColor }}
                >
                  {archetype.name}
                </span>
              </div>

              {/* Main Title */}
              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 leading-tight"
                style={{ color: '#1a1a1a' }}
              >
                {archetype.name}
              </h1>

              {/* Decorative line */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-12" style={{ backgroundColor: archetype.accentColor }} />
                <span style={{ color: archetype.accentColor, fontSize: '10px' }}>✦</span>
                <div className="h-px w-12" style={{ backgroundColor: archetype.accentColor }} />
              </div>

              {/* Tagline */}
              <p
                className="text-xl lg:text-2xl font-serif mb-8 leading-snug"
                style={{ color: archetype.accentColor }}
              >
                {archetype.tagline}
              </p>

              {/* Content paragraphs */}
              <div className="space-y-5 text-base lg:text-lg " style={{ color: '#444444' }}>
                {archetype.content.intro.map((paragraph, index) => (
                  <p key={`intro-${index}`}>{paragraph}</p>
                ))}
                <p className="text-xl lg:text-2xl font-serif italic" style={{ color: archetype.accentColor }}>
                  {archetype.content.highlight}
                </p>
                {archetype.content.continuation.map((paragraph, index) => (
                  <p key={`continuation-${index}`}>{paragraph}</p>
                ))}
              </div>

              {/* Closing */}
              <blockquote
                className="mt-8 text-lg lg:text-xl font-serif italic"
                style={{ color: archetype.accentColor }}
              >
                {archetype.content.closing}
              </blockquote>
            </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Bar */}
        <div
          className="border-t"
          style={{ borderColor: '#E8E4DD' }}
        >
          <div className="container mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left side - CTA info */}
              <div className="flex items-center gap-5">
                {/* Sacred geometry icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FAF6EF', border: '1.5px solid ' + archetype.accentColor }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" stroke={archetype.accentColor} strokeWidth="1" />
                    <circle cx="14" cy="14" r="8" stroke={archetype.accentColor} strokeWidth="1" />
                    <polygon points="14,3 18,10 14,14 10,10" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                    <polygon points="14,25 18,18 14,14 10,18" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                    <polygon points="3,14 10,10 14,14 10,18" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                    <polygon points="25,14 18,10 14,14 18,18" stroke={archetype.accentColor} strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-serif font-semibold" style={{ color: '#1a1a1a' }}>
                    Discover Your Full Pattern
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#666666' }}>
                    One archetype is only part of the picture.
                    <br />
                    Take CAT-20 to discover how your patterns combine.
                  </p>
                </div>
              </div>

              {/* Right side - CTA Button */}
              <Link
                href="/assessment"
                className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:opacity-90 transition-opacity flex-shrink-0"
                style={{ backgroundColor: '#4B3B8C' }}
              >
                Take the CAT-20 Test
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}