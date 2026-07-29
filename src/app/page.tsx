'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
  {
    number: 1,
    title: "Answer 20 Questions",
    description: "Simple questions designed to reveal your patterns."
  },
  {
    number: 2,
    title: "Discover Your Pattern",
    description: "Receive your cognitive blueprint instantly."
  },
  {
    number: 3,
    title: "Explore Your Results",
    description: "Understand how your mind naturally works."
  },
  {
    number: 4,
    title: "Keep Learning",
    description: "Use insights to grow and make better decisions."
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroContentRef.current) {
      gsap.fromTo(heroContentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }

    if (heroImageRef.current) {
      gsap.fromTo(heroImageRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }

    // How It Works section animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === howItWorksRef.current) {
            gsap.fromTo(howItWorksRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
          }
          if (entry.target === stepsRef.current) {
            gsap.fromTo(stepsRef.current.children,
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

    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (stepsRef.current) observer.observe(stepsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3F3] text-gray-900">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="bg-[#F5F3F3]">
          <div className="max-w-7xl mx-auto  w-full">
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              {/* Left Content */}
              <div ref={heroContentRef} className="flex flex-col justify-center lg:pl-8 pl-6 pt-16">
                {/* Label */}
                <div className="flex items-center gap-2 mb-12">
                  <Sparkles className="w-5 h-5" style={{ color: "#C4A747" }} />
                  <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C4A747" }}>
                    DISCOVER YOUR PATTERN
                  </p>
                </div>

                {/* Secondary Headline */}
                <p className="text-xl leading-relaxed mb-8" style={{ color: "#444444", fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  You've probably spent your whole life saying...
                </p>

                {/* Primary Quote - Main Focus */}
                <h1 className="text-5xl italic font-handwriting lg:text-6xl font-bold mb-10 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  "I've always been like that."
                </h1>

                {/* Divider */}
                <div className="w-24 h-1 mb-4" style={{ backgroundColor: "#C4A747" }} />

                {/* Third Focus */}
                <p className="text-xl lg:text-2xl font-semibold mb-8" style={{ color: "#C4A747" }}>
                  CAT-20 helps you understand why.
                </p>

                {/* Fourth Focus - Supporting */}
                <p className="text-md max-w-lg leading-8 mb-8" style={{ color: "#444444" }}>
                  Every person experiences the world a little differently. CAT-20 helps you discover the patterns that make your perspective uniquely yours.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/assessment"
                    className="rounded-lg px-12 py-4 font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-white shadow-lg"
                    style={{ backgroundColor: "#4B3B8C" }}
                  >
                    Discover Your Pattern
                    <span className="text-lg">→</span>
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="rounded-lg border-2 px-10 py-4 font-medium hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                    style={{ borderColor: "#D0D0D0", color: "#1a1a1a", backgroundColor: "transparent" }}
                  >
                    <span className="text-sm">▶</span>
                    How It Works
                  </Link>
                </div>
              </div>

              <div ref={heroImageRef} className="relative flex justify-center items-center overflow-hidden bg-[#F5F3F3]">
                <img
                  src="/hero_image.png"
                  alt="Person standing on mountain peak"
                  className="w-full max-w-xl"
                />

                {/* Smooth left, top, and bottom fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
        linear-gradient(
          to right,
          #F5F3F3 5%,
          rgba(245,243,243,0.8) 15%,
          rgba(245,243,243,0.4) 30%,
          transparent 50%
        ),
        linear-gradient(
          to bottom,
          #F5F3F3 5%,
          rgba(245,243,243,0.8) 15%,
          rgba(245,243,243,0.4) 30%,
          transparent 50%
        ),
        linear-gradient(
          to top,
          #F5F3F3 5%,
          rgba(245,243,243,0.8) 15%,
          rgba(245,243,243,0.4) 30%,
          transparent 50%
        )
      `,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} id="how-it-works" className="mt-5" >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#C4A747" }}>
                SIMPLE. PRIVATE. POWERFUL.
              </p>
              <h2 className="text-xl lg:text-4xl font-bold mb-4" style={{ color: "#1a1a1a" }}>How CAT-20 Works</h2>
              <div className="w-24 h-0.5 rounded-full mx-auto" style={{ backgroundColor: "#C4A747" }} />
            </div>

            {/* Steps Grid */}
            <div ref={stepsRef} className="grid md:grid-cols-4 gap-12">
              {steps.map((step, idx) => (
                <div key={step.title} className="relative">
                  {/* Dotted connection line */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[55%] right-[-50%] h-px border-t-2 border-dashed" style={{ borderColor: "#C4A747" }} />
                  )}

                  <div className="text-center relative z-10">
                    {/* Circle with number */}
                    <div className="mx-auto w-14 h-14 rounded-full border-2 flex items-center justify-center mb-8 transition-all duration-300 hover:scale-110 hover:shadow-xl" style={{ borderColor: "#C4A747", backgroundColor: "#FFFFFF", boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                      <span className="text-3xl font-bold" style={{ color: "#C4A747" }}>
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-4" style={{ color: "#1a1a1a" }}>{step.title}</h3>
                    <p className="text-base leading-7" style={{ color: "#444444" }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section ref={ctaRef} className="py-32 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <div
              className="rounded-2xl overflow-hidden relative shadow-2xl"
              style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            >
              {/* Background Image */}
              <img
                src="/hero_second.jpeg"
                alt="Person reflecting in natural environment"
                className="absolute inset-y-0 right-0 w-1/2 h-full object-cover"
              />

              {/* Smooth Image Fade */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 right-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #F5F3F3 0%, rgba(245,243,243,0.95) 20%, rgba(245,243,243,0.5) 45%, rgba(245,243,243,0) 70%)",
                }}
              />

              {/* Content */}
              <div className="relative p-6 lg:p-6 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="max-w-sm">
                  <h2
                    className="text-xl lg:text-3xl font-bold"
                    style={{ color: "#1a1a1a" }}
                  >
                    Maybe you've been searching for this.
                  </h2>

                  <div
                    className="w-16 rounded-full h-0.5 my-5"
                    style={{ backgroundColor: "#C4A747" }}
                  />

                  <p
                    className="text-md leading-8"
                    style={{ color: "#444444" }}
                  >
                    Join thousands unlocking the power of self-awareness through
                    cognitive pattern recognition.
                  </p>
                </div>

                {/* Right CTA Button */}
                <Link
                  href="/assessment"
                  className="rounded-lg absolute right-6 bottom-6 px-12 py-4 font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-white whitespace-nowrap shadow-lg text-lg"
                  style={{ backgroundColor: "#4B3B8C" }}
                >
                  Discover Your Pattern
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
