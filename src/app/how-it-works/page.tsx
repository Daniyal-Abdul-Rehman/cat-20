'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Clock, MessageSquare, Zap, Smartphone, Brain } from 'lucide-react';
import Navigation from '@/components/Navigation';
// Note: Navigation and Footer are assumed to be existing components.
// If they need to be updated as well, they should follow the design's header/footer style.

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
            gsap.fromTo(beforeBeginRef.current.querySelectorAll('.animate-item'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === whyQuestionsRef.current) {
            gsap.fromTo(whyQuestionsRef.current.children,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
            );
          }
          if (entry.target === answerNaturallyRef.current) {
            gsap.fromTo(answerNaturallyRef.current.querySelectorAll('.step-card'),
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }
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
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]"  >
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="px-6 lg:px-8 py-20 relative overflow-hidden">
          {/* Background flowing graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/graphics.png"
              alt=""
              className="absolute -right-20 -top-20 w-[80%] h-[150%] object-cover opacity-60"
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C4A747]">How It Works</span>
              </div>
              <div className="w-12 h-[1px] bg-[#C4A747] mb-8"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">
              Understanding yourself <br />
              <span className="text-[#2D2A6E]">shouldn't feel complicated.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-lg text-gray-600 font-serif italic">
              <div className="w-8 h-[1px] bg-[#C4A747] hidden md:block"></div>
              <p>
                CAT-20 is simple to take and deeply meaningful. <br />
                Here's what the experience looks like.
              </p>
            </div>
          </div>
        </section>

        {/* Before You Begin Section */}
        <section ref={beforeBeginRef} className="px-6 lg:px-8 py-16 lg:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 animate-item">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-12 h-[1px] bg-[#C4A747]"></div>
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C4A747]">Before You Begin</span>
                <div className="w-12 h-[1px] bg-[#C4A747]"></div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="w-2 h-2 rotate-45 bg-[#C4A747]"></div>
              </div>
              <p className="text-gray-600">Everything you need to know before you begin the assessment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <Clock className="w-8 h-8 text-[#C4A747] stroke-[1.5]" />, title: '8–10 minutes', desc: 'Most people finish in under 10 minutes.' },
                { icon: <MessageSquare className="w-8 h-8 text-[#C4A747] stroke-[1.5]" />, title: '20 Questions', desc: 'Short, everyday situations with no trick questions.' },
                { icon: <Zap className="w-8 h-8 text-[#C4A747] stroke-[1.5]" />, title: 'Instant Results', desc: 'Your cognitive profile appears right away.' },
                { icon: <Smartphone className="w-8 h-8 text-[#C4A747] stroke-[1.5]" />, title: 'Any Device', desc: 'Complete the assessment on your phone, tablet, or computer.' }
              ].map((item, i) => (
                <div key={i} className="animate-item flex flex-col items-center text-center px-4 relative">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-base font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-20 bg-gray-200"></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Only 20 Questions Section */}
        <section ref={whyQuestionsRef} className="px-6 lg:px-8 py-16 lg:py-6 overflow-hidden relative">
          {/* Background image for left side */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              src="/graphics.png" 
              alt="" 
              className="absolute left-0 top-0 w-1/2 h-full object-cover opacity-30"
            />
            {/* Fade overlay for blending */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    to right,
                    transparent 40%,
                    rgba(250,246,239,0.8) 60%,
                    #FAF6EF 80%
                  )
                `,
              }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            {/* Left: Circular wave graphic */}
            <div className="w-full md:w-1/2 relative flex justify-center">
              <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
                {/* Circular wave graphic placeholder */}
                <div className="absolute inset-0 border border-[#D8C8F0] rounded-full opacity-30 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-[#D8C8F0] rounded-full opacity-40 animate-[spin_25s_linear_infinite_reverse]"></div>
                <div className="absolute inset-8 border border-[#D8C8F0] rounded-full opacity-50 animate-[spin_30s_linear_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#2D2A6E] rotate-45 flex items-center justify-center">
                     <div className="w-4 h-4 bg-white rotate-45"></div>
                  </div>
                </div>
                {/* Particle dots */}
                <div className="absolute top-10 right-20 w-1.5 h-1.5 rounded-full bg-[#C4A747]"></div>
                <div className="absolute bottom-20 left-10 w-1 h-1 rounded-full bg-[#2D2A6E]"></div>
                <div className="absolute top-1/2 -left-4 w-2 h-2 rounded-full bg-[#D8C8F0]"></div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2">
              <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C4A747] mb-4 block">Why Only 20 Questions?</span>
              <h2 className="text-4xl lg:text-4xl font-serif font-bold mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                It's not about <br />
                more questions. <br />
                It's about <br />
                <span className="italic italic text-[#2D2A6E]">better understanding.</span>
              </h2>

              <div className="space-y-10 relative">
                {/* Connecting vertical line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-[#C4A747]/30"></div>
                
                {[
                  { title: 'Each question reveals more than one pattern.', desc: 'Every question is designed to contribute to multiple cognitive insights at once.' },
                  { title: "Patterns repeat when they're real.", desc: 'As you progress, true patterns naturally reinforce themselves.' },
                  { title: 'Repeating patterns create clarity.', desc: 'These repetitions—not isolated answers—shape your final cognitive profile.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 relative z-10">
                    <div className="w-[19px] h-[19px] rounded-full border-2 border-[#C4A747] bg-[#FAF6EF] flex-shrink-0 mt-1"></div>
                    <div>
                      <h3 className="text-base font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Answer Naturally Section */}
        <section ref={answerNaturallyRef} className="px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-12 h-[1px] bg-[#C4A747]"></div>
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C4A747]">Answer Naturally</span>
                <div className="w-12 h-[1px] bg-[#C4A747]"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-2 h-2 rotate-45 bg-[#C4A747]"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Dotted Line for Desktop */}
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[1px] border-t-2 border-dotted border-[#C4A747]/40 z-0"></div>
              
              {[
                { num: 1, title: 'Go with your first instinct.', desc: "It's usually the most accurate choice." },
                { num: 2, title: 'There are no good or bad answers.', desc: "CAT-20 isn't measuring success or failure." },
                { num: 3, title: 'If two answers fit, choose the more natural one.', desc: "Trust what feels most like you in the moment." }
              ].map((item, i) => (
                <div key={i} className="step-card bg-white p-10 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] text-center relative z-10">
                  <div className="w-12 h-12 bg-[#2D2A6E] text-white rounded-full flex items-center justify-center mx-auto mb-8 font-bold text-lg">
                    {item.num}
                  </div>
                  {/* Small diamond above card title */}
                  <div className="w-2 h-2 rotate-45 bg-[#C4A747] mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold mb-4 leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  
                  {/* Decorative star on the connecting line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-6 top-10 -translate-y-1/2 z-20">
                      <div className="w-3 h-3 rotate-45 bg-[#C4A747]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section ref={ctaRef} className="px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#FAF6EF] border border-gray-100 rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-sm">
              {/* Background Graphic */}
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-[500px] pointer-events-none opacity-40">
                <img src="/graphics.png" alt="Decorative graphic" className="w-full h-full object-contain md:object-right" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#2D2A6E] rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-12 h-12 md:w-16 md:h-16 text-[#C4A747] stroke-[1]" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                    You <span className="italic text-[#2D2A6E]">already</span> know yourself.
                  </h2>
                  <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                    <div className="w-8 h-[1px] bg-[#C4A747] hidden md:block"></div>
                    <p className="text-lg text-gray-600">
                      CAT-20 simply helps you recognize the patterns <br className="hidden md:block" />
                      that have been there all along.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Tagline */}
      <footer className="py-12 px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-3 h-3 rotate-45 bg-[#C4A747]"></div>
          <p>
            Your patterns. Your clarity. A clearer understanding of <span className="font-bold text-[#2D2A6E]">what makes you, you.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
