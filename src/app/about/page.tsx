'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, Globe, Map } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const finalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroContentRef.current) {
      gsap.fromTo(heroContentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }

    // Parallax and fade effect for hero image
    const handleScroll = () => {
      if (heroImageRef.current && heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Parallax effect - move image slower than scroll throughout entire page
        gsap.to(heroImageRef.current, {
          y: scrollY * 0.5,
          duration: 0.1,
          ease: "none"
        });
        
        // Fade effect after hero section
        if (scrollY > heroHeight * 0.5) {
          const fadeProgress = Math.min((scrollY - heroHeight * 0.5) / (heroHeight * 0.5), 1);
          gsap.to(heroImageRef.current, {
            opacity: 1 - fadeProgress * 0.7,
            duration: 0.1,
            ease: "none"
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

    // Scroll-triggered animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === section1Ref.current) {
            gsap.fromTo(section1Ref.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === section2Ref.current) {
            gsap.fromTo(section2Ref.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === section3Ref.current) {
            gsap.fromTo(section3Ref.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
          }
          if (entry.target === cardsRef.current) {
            gsap.fromTo(cardsRef.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          if (entry.target === finalSectionRef.current) {
            gsap.fromTo(finalSectionRef.current.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (section1Ref.current) observer.observe(section1Ref.current!);
    if (section2Ref.current) observer.observe(section2Ref.current!);
    if (section3Ref.current) observer.observe(section3Ref.current!);
    if (cardsRef.current) observer.observe(cardsRef.current!);
    if (finalSectionRef.current) observer.observe(finalSectionRef.current!);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div ref={heroRef} className="relative overflow-hidden max-w-9xl mx-auto bg-[#FAF6EF]">
          {/* Background flowing image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              ref={heroImageRef}
              src="/dots.png" 
              alt="" 
              className="absolute right-0 top-0 w-[80%] h-[120%] object-cover"
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

          <div ref={heroContentRef} className=" mx-auto pl-6 lg:pl-8 py-20 lg:py-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-8" style={{ color: '#C4A747' }}>
                About CAT-20
              </span>
              <h1 className="text-5xl lg:text-4xl font-bold leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Everyone has <span className="italic" style={{ color: '#4B3B8C' }}>patterns.</span>
                <br />
                <span className="italic">Few people ever have them explained.</span>
              </h1>
              <div className="w-20 h-1 mb-10" style={{ backgroundColor: '#C4A747' }}></div>
              <p className="text-md lg:text-lg mb-10" style={{ color: '#444444', lineHeight: '1.8', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                CAT-<span className='text-[24px] font-light'>20</span> was created to help you finally understand the recurring ways your mind naturally thinks, notices, questions, connects, and experiences the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-white shadow-lg"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <span className="mr-2">✦</span> Discover Your Pattern
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
                  style={{ borderColor: "#D0D0D0", color: "#1a1a1a", backgroundColor: "transparent" }}
                >
                  <span className="mr-2">▶</span> How CAT-20 Works
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: What is CAT-20? */}
        <div ref={section1Ref} className="py-16 lg:py-6 max-w-9xl mx-auto">
          <div className=" mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             
              <div className="flex justify-center">
                <div className="relative w-full max-w-xs">
                  <Image
                    src="/brain_landscape.png"
                    alt="Brain illustration - cognitive patterns"
                    width={320}
                    height={320}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
               <div>
                <span className="border-b border-[] text-sm font-semibold uppercase tracking-widest" style={{ color: '#C4A747' }}>
                  01
                </span>
                <h2 className="text-4xl lg:text-4xl font-bold mt-4 mb-6" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  What is CAT-<span className='text-[50px] font-medium'>20</span>?
                </h2>
                <p className="text-lg mb-6" style={{ color: '#4B3B8C', fontWeight: '600' }}>
                  CAT-20 is a cognitive framework designed to help you understand the recurring ways your mind naturally works.
                </p>
                <p className="text-lg mb-6" style={{ color: '#444444', lineHeight: '1.8' }}>
                  It's not about putting you in a box. It's about revealing the patterns you've always felt but never had the right words for.
                </p>
                <p className="text-lg" style={{ color: '#444444', lineHeight: '1.8' }}>
                  It connects the dots between how you think, how you feel, how you react, and the choices you make — so you can finally see yourself more clearly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why was it created? */}
        <div ref={section2Ref} className="py-16 lg:py-6 max-w-9xl mx-auto">
          <div className=" mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              <div className="">
                <span className="border-b border-[] text-sm font-semibold uppercase tracking-widest" style={{ color: '#C4A747' }}>
                  02
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  Why was it created?
                </h2>
                <p className="text-lg mb-4" style={{ color: '#444444', lineHeight: '1.8' }}>
                  Everyone experiences the world differently. Yet many of us grow up believing those differences are flaws.
                </p>
                <p className="text-lg mb-4" style={{ color: '#444444', lineHeight: '1.8' }}>
                  You might be told you're overthinking. Too quiet. Too emotional. Too intense. Or somehow not enough.
                </p>
                <p className="text-lg mb-6" style={{ color: '#444444', lineHeight: '1.8' }}>
                  Over time, those labels can become the story you tell yourself.
                </p>

                {/* Highlighted Quote */}
                <div
                  className="pl-5 mb-8 border-l-4 rounded-r-lg"
                  style={{ borderColor: '#C4A747' }}
                >
                  <p className="text-lg leading-relaxed" style={{ color: '#4B3B8C' }}>
                    Sometimes the difference between feeling lost and finally moving forward isn't changing who you are — it's finally understanding who you've been all along.
                  </p>
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/tree.png"
                    alt="Brain illustatin - understanding and growth"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: What makes it different? */}
        <div ref={section3Ref} className="py-16 lg:py-6 max-w-9xl mx-auto">
          <div className=" mx-auto px-6 lg:px-8">
            <div className=" mb-2">
              <span className="border-b border-[] text-sm font-semibold uppercase tracking-widest" style={{ color: '#C4A747' }}>
                03
              </span>
              <div className=''>
                <h2 className="text-4xl lg:text-4xl font-bold mt-4 mb-4" style={{ color: '#1a1a1a' }}>
                  What makes it different?
                </h2>
                <p className="text-lg" style={{ color: '#C4A747' }}>
                  Designed with real-world patterns, not theories.
                </p>
              </div>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div
                className="p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-start space-x-3"
                style={{
                  
                  border: '1px solid #E8E8E8',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                }}
              >
                <div className="mb-6" style={{ color: '#C4A747' }}>
                  <Users className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    Same behavior.<br />Different reasons.
                  </h3>
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                  <p style={{ color: '#444444', lineHeight: '1.8' }} className='text-sm'>
                    Two people can do the exact same thing for completely different reasons. CAT-20 looks beyond behavior to understand the patterns behind it.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-start space-x-3"
                style={{
                  
                  border: '1px solid #E8E8E8',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                }}
              >
                <div className="mb-6" style={{ color: '#C4A747' }}>
                  <Globe className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    Built from<br />the real world.
                  </h3>
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                  <p style={{ color: '#444444', lineHeight: '1.8' }} className='text-sm'>
                    Not created from theory alone. It was shaped and refined through hundreds of real participant experiences, making it clearer and more accurate over time.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-start space-x-3"
                style={{
                  
                  border: '1px solid #E8E8E8',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                }}
              >
                <div className="mb-6" style={{ color: '#C4A747' }}>
                  <Map className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    A map,<br />not a label.
                  </h3>
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                  <p style={{ color: '#444444', lineHeight: '1.8' }} className='text-sm'>
                    CAT-20 isn't designed to define who you are. It's designed to give you a clearer understanding of how your mind naturally operates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div ref={finalSectionRef} className="py-16 lg:py-6 max-w-9xl mx-auto">
          <div className=" mx-auto pl-6 lg:pl-8">
            <div className="grid grid-cols-1 lg:grid-cols-10 relative items-stretch">
  {/* Content */}
  <div className="col-span-7 relative z-10">
    <span
      className="border-b border-[#C4A747] text-sm font-semibold uppercase tracking-widest"
      style={{ color: '#C4A747' }}
    >
      04
    </span>

    <h2
      className="text-4xl lg:text-4xl font-bold mb-6"
      style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}
    >
      A deeper understanding changes{' '}
      <span style={{ color: '#4B3B8C' }}>everything.</span>
    </h2>

    <p
      className="text-lg mb-8"
      style={{ color: '#444444', lineHeight: '1.8' }}
    >
      Sometimes the most meaningful discoveries aren't about becoming someone
      new. They're about finally understanding who you've been all along.
    </p>

    <Link
      href="/assessment"
      className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-white shadow-lg"
      style={{ backgroundColor: '#4B3B8C' }}
    >
      <span className="mr-2">✦</span>
      Discover Your Pattern
    </Link>
  </div>

  {/* Image */}
  <div className="col-span-3 relative overflow-hidden">
    <Image
      src="/hero_second.jpeg"
      alt="Person reflecting on personal growth in natural environment"
      fill
      className="object-cover"
    />

    {/* Gradient ON TOP OF IMAGE */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(to right, #FAF6EF 0%, rgba(250,246,239,0.95) 10%, rgba(250,246,239,0.7) 25%, rgba(250,246,239,0.3) 45%, rgba(250,246,239,0) 70%)',
      }}
    />
  </div>
</div>
          </div>
        </div>

      </main>
    </div>
  );
}
