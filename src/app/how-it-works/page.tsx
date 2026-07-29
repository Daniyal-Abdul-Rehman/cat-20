'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HowItWorks() {
  const heroRef = useRef<HTMLDivElement>(null);
  const beforeBeginRef = useRef<HTMLDivElement>(null);
  const whyQuestionsRef = useRef<HTMLDivElement>(null);
  const answerNaturallyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }

    // Scroll-triggered animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === beforeBeginRef.current) {
            gsap.fromTo(beforeBeginRef.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === whyQuestionsRef.current) {
            gsap.fromTo(whyQuestionsRef.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === answerNaturallyRef.current) {
            gsap.fromTo(answerNaturallyRef.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === ctaRef.current) {
            gsap.fromTo(ctaRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (beforeBeginRef.current) observer.observe(beforeBeginRef.current);
    if (whyQuestionsRef.current) observer.observe(whyQuestionsRef.current);
    if (answerNaturallyRef.current) observer.observe(answerNaturallyRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF6EF', color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="px-6 lg:px-8 py-16 lg:py-6 relative overflow-hidden">
          {/* Background flowing graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/graphics.png"
              alt=""
              className="absolute -right-20 -top-20 w-[80%] h-[150%] object-cover"
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

          <div className="max-w-6xl mx-auto relative z-10">


            <div className="flex flex-col lg:flex-row  lg:justify-between  mb-8">

              <div className='pt-10'>
                <div className="mb-6">
                  <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: '#C4A747' }}>
                    How It Works
                  </span>
                  <div className="w-8 h-[2px] mt-2" style={{ backgroundColor: '#C4A747' }}></div>
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  <span className="italic">Understanding yourself</span>
                  <br />
                  <span className="italic" style={{ color: '#4B3B8C' }}>shouldn't feel complicated.</span>
                </h1>
                <p className="text-lg max-w-md" style={{ color: '#555555', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  CAT-<span className='text-[24px]'>20</span> is simple to take and deeply meaningful.
                  <br />
                  Here's what the experience looks like.
                </p>
              </div>
            </div>


          </div>
        </section>

        {/* Before You Begin Section */}
        <section ref={beforeBeginRef} className="px-6 lg:px-8 py-12 lg:py-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: '#C4A747' }}>
                Before You Begin
              </span>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-[1px]" style={{ backgroundColor: '#C4A747' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                <div className="w-6 h-[1px]" style={{ backgroundColor: '#C4A747' }}></div>
              </div>
              <p className="text-base" style={{ color: '#555555' }}>
                Everything you need to know before you begin the assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: (
                    <>
                      <span className="text-[18px]">8–10</span> minutes
                    </>
                  ),
                  desc: 'Most people finish in under 10 minutes.'
                },
                {
                  title: (
                    <>
                      <span className="text-[18px]">20</span> Questions
                    </>
                  ),
                  desc: 'Short, everyday situations with no trick questions.'
                },
                {
                  title: 'Instant Results',
                  desc: 'Your cognitive profile appears right away.'
                },
                {
                  title: 'Any Device',
                  desc: 'Complete the assessment on your phone, tablet, or computer.'
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <hr className="border-0" style={{ borderTop: '1px solid #E5E0D8' }} />
        </div>

        {/* Why Only 20 Questions Section */}
        <section ref={whyQuestionsRef} className="px-6 lg:px-8 py-12 lg:py-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: '#C4A747' }}>
                Why Only 20 Questions?
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold text-center mb-8 leading-snug"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              It's not about more questions.
              <br />
              It's about <span className="italic" style={{ color: '#4B3B8C' }}>better understanding.</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: 'Each question reveals more than one pattern.',
                  desc: 'Every question is designed to contribute to multiple cognitive insights at once.',
                },
                {
                  title: "Patterns repeat when they're real.",
                  desc: "As you progress, true patterns naturally reinforce themselves.",
                },
                {
                  title: 'Repeating patterns create clarity.',
                  desc: 'These repetitions—not isolated answers—shape your final cognitive profile.',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-0.5 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C4A747" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#666666' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Answer Naturally Section */}
        <section ref={answerNaturallyRef} className="px-6 lg:px-8 py-12 lg:py-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: '#C4A747' }}>
                Answer Naturally
              </span>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-[1px]" style={{ backgroundColor: '#C4A747' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                <div className="w-6 h-[1px]" style={{ backgroundColor: '#C4A747' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="text-center p-8 rounded-xl border shadow-sm" style={{ borderColor: '#E5E0D8', backgroundColor: '#FAF6EF' }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#C4A747' }}>
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-base font-bold mb-3 leading-tight">Go with your first instinct.</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                  It's usually the most accurate choice.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl border shadow-sm" style={{ borderColor: '#E5E0D8', backgroundColor: '#FAF6EF' }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#C4A747' }}>
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-base font-bold mb-3 leading-tight">There are no good or bad answers.</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                  CAT-20 isn't measuring success or failure.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl border shadow-sm" style={{ borderColor: '#E5E0D8', backgroundColor: '#FAF6EF' }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#C4A747' }}>
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-base font-bold mb-3 leading-tight">If two answers fit, choose the more natural one.</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                  Trust what feels most like you in the moment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section ref={ctaRef} className="px-6 lg:px-8 pb-12 lg:pb-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative rounded-xl border overflow-hidden shadow-md"
              style={{ borderColor: '#E5E0D8', backgroundColor: '#FAF6EF' }}
            >
              <div className="px-10 py-16 lg:px-16 lg:py-12 lg:pr-[400px] relative">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-snug"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  You <span className="italic" style={{ color: '#4B3B8C' }}>already</span> know yourself.
                </h2>
                <p className="text-lg mb-10 max-w-md leading-relaxed" style={{ color: '#555555' }}>
                  CAT-20 simply helps you recognize the patterns that have been there all along.
                </p>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg text-white shadow-lg hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0L8.7 5.3L14 7L8.7 8.7L7 14L5.3 8.7L0 7L5.3 5.3L7 0Z" fill="#FFFFFF" />
                  </svg>
                  Discover Your Pattern
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Decorative graphic on the right */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[500px]">
                  <img src="/graphics.png" alt="Decorative graphic" className="w-full h-full object-contain opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer tagline */}
        <div className="text-center pb-10 px-6">
          <p className="text-sm" style={{ color: '#666666' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline mr-1" style={{ verticalAlign: 'middle' }}>
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#C4A747" />
            </svg>
            Your patterns. Your clarity. A clearer understanding of <span className="font-semibold" style={{ color: '#4B3B8C' }}>what makes you, you.</span>
          </p>
        </div>
      </main>
    </div>
  );
}
