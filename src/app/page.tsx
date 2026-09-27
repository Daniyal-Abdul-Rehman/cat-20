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
                <div className="flex items-center gap-2 mb-12">
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

        {/* CTA Banner Section */}
        <section ref={ctaRef} className="py-24 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <div
              className="rounded-2xl overflow-hidden relative shadow-2xl"
              style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            >
              {/* Background Image */}
              <img
                src="/hero_footer.png"
                alt="Person reflecting in natural environment"
                className="absolute inset-y-0 right-0 w-1/2 h-full object-cover"
              />

              {/* Smooth Image Fade */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 right-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #FAF6EF 0%, rgba(250,246,239,0.95) 20%, rgba(250,246,239,0.5) 45%, rgba(250,246,239,0) 70%)",
                }}
              />

              {/* Content */}
              <div className="relative p-6 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="max-w-sm">
                  <h2
                    className="text-xl lg:text-3xl font-bold"
                    style={{ color: "#1a1a1a" }}
                  >
                    This is what you've been looking for.
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
      <Footer />
    </div>
  );
}