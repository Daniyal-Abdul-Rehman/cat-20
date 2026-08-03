'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const FAQ_HERO_IMAGE = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663287467113/uiaLBrsJkupjFPtN.png';

const faqs = [
  {
    id: 1,
    question: 'Is CAT-20 a personality test?',
    answer: 'Not exactly. CAT-20 isn\'t designed to define your entire personality. Instead, it looks for the recurring mental patterns your mind naturally tends to return to—patterns that can influence how you think, make decisions, solve problems, and experience the world.',
  },
  {
    id: 2,
    question: 'How long does the assessment take?',
    answer: 'Most people finish the assessment in around 5–10 minutes. There are no trick questions, and there are no right or wrong answers.',
  },
  {
    id: 3,
    question: 'Can my results change over time?',
    answer: 'Your life experiences, skills, and perspectives can all change over time. CAT-20 focuses on the patterns you naturally tend to return to, so while your results are often fairly consistent, the way you express those patterns can grow and develop throughout your life.',
  },
  {
    id: 4,
    question: 'Is there a right or wrong answer?',
    answer: 'No. The most accurate results come from answering honestly rather than choosing the answer you think sounds best. Try to answer based on what comes most naturally to you, not who you wish you were.',
  },
  {
    id: 5,
    question: 'What if my results don\'t feel accurate?',
    answer: 'No assessment is perfect. If something doesn\'t feel quite right, we encourage you to look through your full results before deciding. Sometimes people connect more with the descriptions than the archetype name itself. If you still feel something was off, we\'d love your feedback. CAT-20 is continually improving, and thoughtful feedback helps make the framework better for everyone.',
  },
  {
    id: 6,
    question: 'Why are some profiles still unavailable?',
    answer: 'CAT-20 is actively growing. Some profile combinations are still being developed and written. If your exact profile isn\'t available yet, you\'ll be notified, and it will be added as the framework continues to expand.',
  },
  {
    id: 7,
    question: 'Is CAT-20 based on psychology?',
    answer: 'CAT-20 is an original cognitive framework. It draws inspiration from observing recurring human patterns, but it is not intended to diagnose, evaluate, or replace professional psychological assessment. Its purpose is to encourage self-reflection and help people better understand the ways their minds naturally approach the world.',
  },
  {
    id: 8,
    question: 'Will CAT-20 continue to grow?',
    answer: 'Yes. CAT-20 is designed as an evolving framework. New profiles, features, and improvements will continue to be added as the project develops and more people contribute feedback.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-8 relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={FAQ_HERO_IMAGE}
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

          <div className="relative max-w-7xl mx-auto z-10">
            <div className="mb-6 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C4A747]">Frequently Asked Questions</span>
              </div>
              <div className="w-12 h-[1px] bg-[#C4A747]"></div>
            </div>

            <h1 className="text-5xl md:text-5xl font-serif italic mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Questions come
              <br />
              <span style={{ color: '#4B3B8C' }}>naturally.</span>
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-4 text-lg text-gray-600 font-serif italic" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              <div className="w-8 h-[1px] bg-[#C4A747] hidden md:block"></div>
              <p>
                Answers should too.
                <br />
                If you're wondering about something, you're probably not the first.
                <br />
                Here are the questions we hear most often.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="px-6 lg:px-8 py-16 lg:py-6">
          <div className=" mx-auto">
            <div className="">
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: '#E8E4DD', backgroundColor: '#FFFFFF' }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Question mark icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                        style={{ borderColor: '#4B3B8C', color: '#4B3B8C' }}
                      >
                        <span className="text-sm font-bold">?</span>
                      </div>
                      <span className="text-base lg:text-lg font-semibold" style={{ color: '#1a1a1a' }}>
                        {faq.question}
                      </span>
                    </div>
                    {/* Plus/Minus icon */}
                    <span
                      className="text-2xl font-light flex-shrink-0 ml-4"
                      style={{ color: '#4B3B8C' }}
                    >
                      {openId === faq.id ? '−' : '+'}
                    </span>
                  </button>

                  {/* Answer */}
                  {openId === faq.id && (
                    <div className="px-6 pb-5 pl-16">
                      <p className="text-base leading-relaxed" style={{ color: '#555555' }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* CTA Section - Didn't find your answer */}
        <section className="px-6 lg:px-8 py-16 lg:py-6">
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-2xl p-8 lg:p-12 relative overflow-hidden"
              style={{
                backgroundColor: '#F5F0E8',
                borderColor: '#E8E4DD',
              }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                {/* Left - Text */}
                <div className="max-w-lg">
                  {/* Decorative line */}
                  <div className="h-1 w-12 mb-4" style={{ backgroundColor: '#C4A747' }} />
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-3" style={{ color: '#1a1a1a' }}>
                    Didn't find your answer?
                  </h3>
                  <p className="text-base mb-6" style={{ color: '#555555' }}>
                    We're always improving CAT-20 and we'd
                    <br />
                    love to hear from you.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#4B3B8C' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Us
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                {/* Right - Chat illustration placeholder */}
                <div className="hidden lg:block opacity-60">
                  <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
                    {/* Chat bubble 1 */}
                    <ellipse cx="70" cy="70" rx="50" ry="35" stroke="#4B3B8C" strokeWidth="1.5" fill="none" opacity="0.3" />
                    <ellipse cx="130" cy="100" rx="40" ry="28" stroke="#4B3B8C" strokeWidth="1.5" fill="none" opacity="0.2" />
                    {/* Three dots in each bubble */}
                    <circle cx="55" cy="70" r="4" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="70" cy="70" r="4" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="85" cy="70" r="4" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="115" cy="100" r="3" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="128" cy="100" r="3" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="141" cy="100" r="3" fill="#4B3B8C" opacity="0.3" />
                    {/* Flowing lines */}
                    <path d="M10 140 Q50 120 100 135 T190 110" stroke="#4B3B8C" strokeWidth="1" fill="none" opacity="0.2" />
                    <path d="M20 145 Q60 125 110 140 T185 115" stroke="#4B3B8C" strokeWidth="1" fill="none" opacity="0.15" />
                    <path d="M30 150 Q70 130 120 145 T180 120" stroke="#4B3B8C" strokeWidth="1" fill="none" opacity="0.1" />
                    {/* Small decorative dots */}
                    <circle cx="170" cy="30" r="5" fill="#4B3B8C" opacity="0.15" />
                    <circle cx="180" cy="50" r="3" fill="#C4A747" opacity="0.2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
