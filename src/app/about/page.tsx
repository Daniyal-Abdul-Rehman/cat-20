'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, Globe, Map, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Head from 'next/head';

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ceoSectionRef = useRef<HTMLDivElement>(null);
  const finalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroContentRef.current) {
      gsap.fromTo(heroContentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }

    // Parallax and fade effect for hero image with subtle floating
    const handleScroll = () => {
      if (heroImageRef.current && heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Very subtle parallax - move image slower than scroll
        gsap.to(heroImageRef.current, {
          y: scrollY * 0.2,
          duration: 0.5,
          ease: "power1.out"
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

    // Subtle floating animation for dots
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        y: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(heroImageRef.current);
    };

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
          if (entry.target === ceoSectionRef.current) {
            gsap.fromTo(ceoSectionRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
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
    if (ceoSectionRef.current) observer.observe(ceoSectionRef.current!);
    if (finalSectionRef.current) observer.observe(finalSectionRef.current!);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>About CAT-20 - Chris Dixon, CEO | Cognitive Archetype Framework</title>
        <meta name="description" content="Learn about CAT-20, a cognitive framework founded by Chris Dixon. Discover the six core archetypes and 30 directional profiles that help you understand your unique cognitive patterns." />
        <meta name="keywords" content="CAT-20, Chris Dixon, CEO, cognitive framework, personality assessment, cognitive archetypes, self-discovery, psychological patterns" />
        <meta name="author" content="Chris Dixon" />
        <meta property="og:title" content="About CAT-20 - Chris Dixon, CEO" />
        <meta property="og:description" content="Discover CAT-20, a cognitive framework founded by Chris Dixon. Understand your unique cognitive patterns and build deeper connections." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About CAT-20 - Chris Dixon, CEO" />
        <meta name="twitter:description" content="Learn about CAT-20's cognitive framework and founder Chris Dixon's vision for self-discovery." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CAT-20",
              "description": "CAT-20 is a cognitive framework built around six core archetypes and 30 directional profiles to help people understand their unique cognitive patterns.",
              "url": "https://cat-20.com/about",
              "founder": {
                "@type": "Person",
                "name": "Chris Dixon",
                "jobTitle": "CEO",
                "description": "Founder and CEO of CAT-20, leading the vision for cognitive pattern discovery and self-understanding."
              },
              "sameAs": []
            })
          }}
        />
      </Head>
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
                You probably already recognize pieces of how you operate. CAT-20 helps connect those pieces into a clearer pattern — how you tend to think, notice, question, connect, and move through the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-white shadow-lg"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <span className="mr-2">✦</span> Discover Your Pattern
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
                  CAT-20 is a cognitive framework built around six core archetypes and 30 directional profiles.
                </p>
                <p className="text-lg mb-6" style={{ color: '#444444', lineHeight: '1.8' }}>
                  Your result shows which archetype leads, which one follows, and the profile created by that combination.
                </p>
                <p className="text-lg" style={{ color: '#444444', lineHeight: '1.8' }}>
                  It's not meant to capture everything about you. It's a structured way of describing one part of how you tend to operate.
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
                  The same behavior doesn't always come from the same place.
                </p>
                <p className="text-lg mb-4" style={{ color: '#444444', lineHeight: '1.8' }}>
                  Someone who stays quiet might be thinking everything through, protecting their energy, observing the room, or simply waiting until they have something worth saying. From the outside, those people can look similar. Internally, they may be nothing alike.
                </p>
                <p className="text-lg mb-6" style={{ color: '#444444', lineHeight: '1.8' }}>
                  CAT-20 was built to explore that difference — not just what someone does, but what tends to lead them there.
                </p>
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
                    DIRECTION MATTERS.
                  </h3>
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                  <p style={{ color: '#444444', lineHeight: '1.8' }} className='text-sm'>
                    Thinker + Seeker isn't treated the same as Seeker + Thinker. Which pattern leads changes the profile.
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
                    BUILT WITH REAL PEOPLE.
                  </h3>
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                  <p style={{ color: '#444444', lineHeight: '1.8' }} className='text-sm'>
                    CAT-20 has been shaped and refined through hundreds of participant results and feedback, with the framework adjusted as recurring patterns became clearer.
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
                    ROOM FOR COMPLEXITY.
                  </h3>
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: '#C4A747' }}></div>
                  <p style={{ color: '#444444', lineHeight: '1.8' }} className='text-sm'>
                    Your main profile is the starting point, not a claim that every part of you fits neatly inside two letters. Other patterns can still be present without replacing the ones that lead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CEO Section */}
        <div ref={ceoSectionRef} className="py-16 lg:py-24 max-w-9xl mx-auto">
          <div className="px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
              <div className="grid lg:grid-cols-2">
                {/* Left - CEO Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" style={{ color: "#C4A747" }} />
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C4A747" }}>
                      LEADERSHIP
                    </p>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1a1a1a", fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    Chris Dixon
                  </h2>

                  <div className="w-20 h-0.5 mb-6" style={{ backgroundColor: "#C4A747" }} />

                  <p className="text-xl font-semibold mb-4" style={{ color: "#4B3B8C" }}>
                    CEO, CAT-20
                  </p>

                  <p className="text-base leading-relaxed mb-6" style={{ color: "#444444" }}>
                    "Understanding how people think and process information is the key to building better connections. CAT-20 isn't just a test — it's a tool for self-discovery and meaningful communication."
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-[#4B3B8C] flex items-center justify-center text-white font-bold text-sm">
                        CD
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>
                        Chris Dixon
                      </p>
                      <p className="text-xs" style={{ color: "#666666" }}>
                        Founder & CEO
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right - Visual Element */}
                <div className="relative bg-gradient-to-br from-[#4B3B8C] to-[#4B3B8C]/80 flex items-center justify-center p-8 lg:p-12">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border-2 border-white/20">
                      <span className="text-5xl" style={{ color: "#C4A747" }}>✦</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                      Vision
                    </p>
                    <p className="text-sm text-white/80 max-w-xs mx-auto">
                      To help everyone understand their unique cognitive pattern and use that knowledge to build deeper, more authentic connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div ref={finalSectionRef} className="py-12 lg:py-6 max-w-9xl mx-auto">
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
      Curious where you land?
    </h2>

    <p
      className="text-lg mb-8"
      style={{ color: '#444444', lineHeight: '1.8' }}
    >
      20 questions. See which CAT-20 profile comes back as yours.
    </p>

    <Link
      href="/assessment"
      className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-white shadow-lg w-full sm:w-auto"
      style={{ backgroundColor: '#4B3B8C' }}
    >
      <span className="mr-2">✦</span>
      Discover Your Pattern
    </Link>
  </div>

  {/* Image */}
  <div className="col-span-3 relative overflow-hidden hidden lg:block">
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
      <Footer />
    </div>
    </>
  );
}
