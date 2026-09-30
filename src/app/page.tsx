'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroContentRef.current) {
      gsap.fromTo(heroContentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }

    // CTA section animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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

    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-gray-900">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="bg-[#FAF6EF] relative overflow-hidden">
          {/* Background flowing image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/hero_image.png"
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
              <div
                ref={heroContentRef}
                className="flex flex-col justify-center col-span-4 lg:pl-8 pl-6 pt-16"
              >
                {/* Label */}
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles
                    className="w-5 h-5"
                    style={{ color: "#C4A747" }}
                  />
                  <p
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: "#C4A747" }}
                  >
                    DISCOVER YOUR PATTERN
                  </p>
                </div>

                {/* Tagline */}
                <p
                  className="text-lg font-semibold mb-8 tracking-wider"
                  style={{ color: "#C4A747" }}
                >
                  SIMPLE. FREE. PRIVATE.
                </p>

                <p
                  className="text-xl leading-relaxed mb-8"
                  style={{
                    color: "#444444",
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                  }}
                >
                  You've probably spent your whole life saying...
                </p>

                <h1
                  className="text-5xl italic font-handwriting lg:text-6xl font-bold mb-10 leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                  }}
                >
                  "I've always been like that."
                </h1>

                <div
                  className="w-24 h-1 mb-4"
                  style={{ backgroundColor: "#C4A747" }}
                />

                <p
                  className="text-xl lg:text-2xl font-semibold mb-8"
                  style={{ color: "#C4A747" }}
                >
                  CAT-20 helps you understand why.
                </p>

                <p
                  className="text-md max-w-lg leading-8 mb-8"
                  style={{ color: "#444444" }}
                >
                  Every person experiences the world a little differently. CAT-20
                  helps you discover the patterns that make your perspective uniquely
                  yours.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/assessment"
                    className="rounded-lg px-12 py-4 font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-white shadow-lg"
                    style={{ backgroundColor: "#4B3B8C" }}
                  >
                    Discover Your Pattern
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How CAT-20 Works Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: "#1a1a1a", fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                How CAT-20 Works
              </h2>
              <div
                className="w-20 h-1 mx-auto"
                style={{ backgroundColor: "#C4A747" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 01 */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#4B3B8C" }}
                >
                  <span className="text-2xl font-bold text-white">01</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#1a1a1a", fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Take the Assessment
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#444444" }}>
                  20 questions built around everyday situations. Choose what feels most natural to you — not what sounds best.
                </p>
              </div>

              {/* Step 02 */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#C4A747" }}
                >
                  <span className="text-2xl font-bold text-white">02</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#1a1a1a", fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  See Your Pattern
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#444444" }}>
                  Your answers come together to show which CAT-20 patterns stand out most strongly in the way you naturally move through situations.
                </p>
              </div>

              {/* Step 03 */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#4B3B8C" }}
                >
                  <span className="text-2xl font-bold text-white">03</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#1a1a1a", fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Understand Why
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#444444" }}>
                  Your result doesn't stop at telling you what you do. It goes beneath the surface to explore what may be pulling you toward those patterns in the first place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section ref={ctaRef} className="py-16 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <div
              className="rounded-2xl overflow-hidden relative shadow-2xl"
              style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            >
              {/* Background Image */}
              <img
                src="/hero_footer.png"
                alt="Person reflecting in natural environment"
                className="absolute inset-y-0 right-0 w-1/2 h-full object-cover hidden lg:block"
              />

              {/* Smooth Image Fade */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 right-0 pointer-events-none hidden lg:block"
                style={{
                  background:
                    "linear-gradient(to right, #FAF6EF 0%, rgba(250,246,239,0.95) 20%, rgba(250,246,239,0.5) 45%, rgba(250,246,239,0) 70%)",
                }}
              />

              {/* Content */}
              <div className="relative p-6 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                <div className="max-w-sm w-full">
                  <h2
                    className="text-xl lg:text-3xl font-bold"
                    style={{ color: "#1a1a1a" }}
                  >
                    Ready to see your pattern?
                  </h2>

                  <div
                    className="w-16 rounded-full h-0.5 my-5"
                    style={{ backgroundColor: "#C4A747" }}
                  />

                  <p
                    className="text-md leading-8"
                    style={{ color: "#444444" }}
                  >
                    20 questions. Your CAT-20 profile starts here.
                  </p>
                </div>

                {/* Right CTA Button */}
                <Link
                  href="/assessment"
                  className="rounded-lg px-12 py-4 font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-white whitespace-nowrap shadow-lg text-lg lg:absolute lg:right-6 lg:bottom-6"
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
      <Footer />
    </div>
  );
}