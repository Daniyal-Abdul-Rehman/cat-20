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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F3F3', color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="px-6 lg:px-12 pt-20 pb-12 lg:pt-28 lg:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: '#C4A747' }}>
                How It Works
              </span>
              <div className="w-8 h-[2px] mt-2" style={{ backgroundColor: '#C4A747' }}></div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                Understanding yourself
                <br />
                <span className="italic" style={{ color: '#4B3B8C' }}>shouldn't feel complicated.</span>
              </h1>
              {/* Decorative wave illustration placeholder */}
              <div className="hidden lg:block w-[350px] h-[200px] opacity-40">
                <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 100 Q50 60, 100 80 Q150 100, 200 70 Q250 40, 300 90 Q350 140, 400 100" stroke="#4B3B8C" strokeWidth="1" fill="none" opacity="0.5"/>
                  <path d="M0 120 Q50 80, 100 100 Q150 120, 200 90 Q250 60, 300 110 Q350 160, 400 120" stroke="#C4A747" strokeWidth="1" fill="none" opacity="0.4"/>
                  <path d="M0 110 Q50 70, 100 90 Q150 110, 200 80 Q250 50, 300 100 Q350 150, 400 110" stroke="#4B3B8C" strokeWidth="0.5" fill="none" opacity="0.3"/>
                  {[...Array(30)].map((_, i) => (
                    <circle key={i} cx={10 + (i * 13)} cy={60 + Math.sin(i * 0.7) * 40} r="1.5" fill={i % 2 === 0 ? '#4B3B8C' : '#C4A747'} opacity="0.6"/>
                  ))}
                </svg>
              </div>
            </div>

            <p className="text-base lg:text-lg max-w-md" style={{ color: '#555555' }}>
              CAT-20 is simple to take and deeply meaningful.
              <br />
              Here's what the experience looks like.
            </p>
          </div>
        </section>

        {/* Before You Begin Section */}
        <section ref={beforeBeginRef} className="px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
              {[
                { title: '8–10 Minutes', desc: 'Most people finish in under 10 minutes.' },
                { title: '20 Questions', desc: 'Short, everyday situations with no trick questions.' },
                { title: 'Instant Results', desc: 'Your cognitive profile appears right away.' },
                { title: 'Any Device', desc: 'Complete the assessment on your phone, tablet, or computer.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`text-center ${index < 3 ? 'lg:border-r' : ''}`}
                  style={{ borderColor: '#E5E0D8' }}
                >
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <hr className="border-0" style={{ borderTop: '1px solid #E5E0D8' }} />
        </div>

        {/* Why Only 20 Questions Section */}
        <section ref={whyQuestionsRef} className="px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: '#C4A747' }}>
                Why Only 20 Questions?
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold text-center mb-12 leading-snug"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              It's not about more questions.
              <br />
              It's about <span className="italic" style={{ color: '#4B3B8C' }}>better understanding.</span>
            </h2>

            <div className="space-y-8">
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
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C4A747"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">{item.title}</h3>
                    <p className="text-sm" style={{ color: '#666666' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Answer Naturally Section */}
        <section ref={answerNaturallyRef} className="px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: '#C4A747' }}>
                Answer Naturally
              </span>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-[1px]" style={{ backgroundColor: '#C4A747' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                <div className="w-6 h-[1px]" style={{ backgroundColor: '#C4A747' }}></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-center">
              <div className="flex-1 max-w-[200px]">
                <h3 className="text-sm font-bold mb-2">Go with your first instinct.</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>
                  It's usually the most accurate choice.
                </p>
              </div>

              <div className="hidden sm:flex flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#C4A747"/>
                </svg>
              </div>

              <div className="flex-1 max-w-[200px]">
                <h3 className="text-sm font-bold mb-2">There are no good or bad answers.</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>
                  CAT-20 isn't measuring success or failure.
                </p>
              </div>

              <div className="hidden sm:flex flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#C4A747"/>
                </svg>
              </div>

              <div className="flex-1 max-w-[200px]">
                <h3 className="text-sm font-bold mb-2">If two answers fit, choose the more natural one.</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>
                  Trust what feels most like you in the moment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section ref={ctaRef} className="px-6 lg:px-12 pb-8 lg:pb-12">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative rounded-xl border overflow-hidden"
              style={{ borderColor: '#E5E0D8', backgroundColor: '#FAF9F7' }}
            >
              <div className="px-8 py-12 lg:px-12 lg:py-16 lg:pr-[400px] relative">
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  You <span className="italic" style={{ color: '#4B3B8C' }}>already</span> know yourself.
                </h2>
                <p className="text-base mb-8 max-w-md" style={{ color: '#555555' }}>
                  CAT-20 simply helps you recognize the patterns that have been there all along.
                </p>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg text-white shadow-lg hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0L8.7 5.3L14 7L8.7 8.7L7 14L5.3 8.7L0 7L5.3 5.3L7 0Z" fill="#FFFFFF"/>
                  </svg>
                  Discover Your Pattern
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                {/* Decorative wave on the right */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[350px]">
                  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
                    <path d="M50 80 Q100 40, 150 70 Q200 100, 250 60 Q300 20, 350 80 Q380 120, 400 100" stroke="#4B3B8C" strokeWidth="1" fill="none" opacity="0.5"/>
                    <path d="M50 100 Q100 60, 150 90 Q200 120, 250 80 Q300 40, 350 100 Q380 140, 400 120" stroke="#C4A747" strokeWidth="1" fill="none" opacity="0.4"/>
                    <path d="M50 120 Q100 80, 150 110 Q200 140, 250 100 Q300 60, 350 120 Q380 160, 400 140" stroke="#4B3B8C" strokeWidth="0.5" fill="none" opacity="0.3"/>
                    <path d="M50 140 Q100 100, 150 130 Q200 160, 250 120 Q300 80, 350 140 Q380 180, 400 160" stroke="#C4A747" strokeWidth="0.5" fill="none" opacity="0.3"/>
                    {[...Array(50)].map((_, i) => (
                      <circle
                        key={i}
                        cx={60 + (i * 6.5)}
                        cy={70 + Math.sin(i * 0.5) * 50}
                        r="1.5"
                        fill={i % 2 === 0 ? '#4B3B8C' : '#C4A747'}
                        opacity="0.5"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer tagline */}
        <div className="text-center pb-12 px-6">
          <p className="text-sm" style={{ color: '#666666' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline mr-1" style={{ verticalAlign: 'middle' }}>
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#C4A747"/>
            </svg>
            Your patterns. Your clarity. A clearer understanding of <span className="font-semibold" style={{ color: '#4B3B8C' }}>what makes you, you.</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
