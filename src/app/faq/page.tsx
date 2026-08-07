'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
import { Clock, User, Shield, LucideIcon } from 'lucide-react';

const FAQ_HERO_IMAGE = '/edited_image.png';

interface FAQItem {
  id: number;
  category: string;
  question: string | ReactNode;
  answer: string | ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: 'Assessment',
    question: <>Is CAT-<span className="text-[32px] font-medium">20</span> a personality test?</>,
    answer: <>CAT-<span className="text-[24px] font-light">20</span> is more than a personality test. It\'s a cognitive archetype assessment designed to reveal the natural patterns that shape how you think, decide, and make sense of the world.</>,
  },
  {
    id: 2,
    category: 'Assessment',
    question: 'How long does the assessment take?',
    answer: 'Most people finish the assessment in around 5–10 minutes. There are no trick questions, and there are no right or wrong answers.',
  },
  {
    id: 3,
    category: 'Assessment',
    question: 'Can my results change over time?',
    answer: <>Your life experiences, skills, and perspectives can all change over time. CAT-<span className="text-[24px] font-light">20</span> focuses on the patterns you naturally tend to return to, so while your results are often fairly consistent, the way you express those patterns can grow and develop throughout your life.</>,
  },
  {
    id: 4,
    category: 'Assessment',
    question: 'What if my results don\'t feel accurate?',
    answer: 'No assessment is perfect. If something doesn\'t feel quite right, we encourage you to look through your full results before deciding. Sometimes people connect more with the descriptions than the archetype name itself. If you still feel something was off, we\'d love your feedback. CAT-20 is continually improving, and thoughtful feedback helps make the framework better for everyone.',
  },
  {
    id: 5,
    category: 'Assessment',
    question: 'Why are some profiles still unavailable?',
    answer: <>CAT-<span className="text-[24px] font-light">20</span> is actively growing. Some profile combinations are still being developed and written. If your exact profile isn\'t available yet, you\'ll be notified, and it will be added as the framework continues to expand.</>,
  },
  {
    id: 6,
    category: 'Results & Profiles',
    question: <>Is CAT-<span className="text-[32px] font-light">20</span> based on psychology?</>,
    answer: <>CAT-<span className="text-[24px] font-light">20</span> is an original cognitive framework. It draws inspiration from observing recurring human patterns, but it is not intended to diagnose, evaluate, or replace professional psychological assessment. Its purpose is to encourage self-reflection and help people better understand the ways their minds naturally approach the world.</>,
  },
  {
    id: 7,
    category: 'Results & Profiles',
    question: <>Will CAT-<span className="text-[32px] font-light">20</span> continue to grow?</>,
    answer: <>Yes. CAT-<span className="text-[24px] font-light">20</span> is designed as an evolving framework. New profiles, features, and improvements will continue to be added as the project develops and more people contribute feedback.</>,
  },
  {
    id: 8,
    category: 'Results & Profiles',
    question: <>How is CAT-<span className="text-[32px] font-light">20</span> different from other systems?</>,
    answer: <>CAT-<span className="text-[24px] font-light">20</span> focuses on cognitive archetypes rather than personality types. It\'s designed to reveal the natural patterns that shape how you think and make decisions, offering a fresh perspective on self-understanding.</>,
  },
];

const categoryInfo: Record<string, { icon: LucideIcon; title: string; description: string }> = {
  Assessment: {
    icon: Clock,
    title: 'Assessment',
    description: 'Everything about taking the CAT-20 assessment.',
  },
  'Results & Profiles': {
    icon: User,
    title: 'Results & Profiles',
    description: 'Understanding your results and profile.',
  },
  'The Framework': {
    icon: Shield,
    title: 'The Framework',
    description: 'Learn more about the science and structure behind CAT-20.',
  },
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-24 lg:py-32 relative overflow-hidden">
          {/* Background image - more prominent */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={FAQ_HERO_IMAGE}
              alt=""
              className="absolute right-0 top-0 w-[85%] h-full object-cover"
            />
            {/* Fade overlay for text blending - stronger fade on left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    to right,
                    #FAF6EF 35%,
                    rgba(250,246,239,0.9) 45%,
                    rgba(250,246,239,0.5) 60%,
                    transparent 75%
                  ),
                  linear-gradient(
                    to bottom,
                    #FAF6EF 8%,
                    rgba(250,246,239,0.85) 18%,
                    rgba(250,246,239,0.5) 35%,
                    transparent 55%
                  ),
                  linear-gradient(
                    to top,
                    #FAF6EF 8%,
                    rgba(250,246,239,0.85) 18%,
                    rgba(250,246,239,0.5) 35%,
                    transparent 55%
                  )
                `,
              }}
            />
          </div>

          <div className="relative max-w-9xl mx-auto z-10">
            <div className="grid lg:grid-cols-7 gap-4 items-start">
              {/* Left Content - pushed to left */}
              <div className="col-span-4 lg:pl-0 pl-0">
                <div className="mb-8 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-[1px] bg-[#C4A747]"></div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#C4A747]">Frequently Asked Questions</span>
                  </div>
                </div>

                <h1 className="text-5xl lg:text-5xl font-serif leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  Questions come
                  <br />
                  <span className="italic" style={{ color: '#4B3B8C' }}>naturally.</span>
                </h1>

                <div className="flex items-start gap-4 text-lg lg:text-xl leading-relaxed" style={{ color: '#444444', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  <div className="w-12 h-[1px] bg-[#C4A747] mt-3 hidden lg:block"></div>
                  <p className="max-w-lg">
                    Answers should too.
                    <br />
                    <br />
                    Whether you're curious about the assessment, your results, how CAT-20 works, or what comes next, we've gathered the questions people ask most often—all in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section with Category Headers */}
        <section className="px-6 lg:px-8 py-16 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {Object.entries(groupedFaqs).map((entry) => {
              const [categoryName, categoryFaqs] = entry;
              const info = categoryInfo[categoryName as keyof typeof categoryInfo];

              return (
                <div key={categoryName} className="mb-16">
                  {/* Category Header - Left Aligned */}
                  <div className="flex gap-8 mb-8">
                    {/* Category Icon and Info */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: '#E8E4DD',
                          color: '#4B3B8C'
                        }}
                      >
                        <info.icon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Category Title and Description */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-serif font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                        {info.title}
                      </h2>
                      <p className="text-base" style={{ color: '#666666' }}>
                        {info.description}
                      </p>
                    </div>
                  </div>

                  {/* FAQ Items for this Category */}
                  <div className="space-y-4 ml-0 lg:ml-24">
                    {categoryFaqs.map((faq, index) => (
                      <div
                        key={faq.id}
                        className="relative"
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full text-left group"
                        >
                          <div className="flex items-start gap-6">
                            {/* Number */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-serif text-lg transition-colors"
                              style={{
                                borderColor: openId === faq.id ? '#4B3B8C' : '#C4A747',
                                color: openId === faq.id ? '#4B3B8C' : '#C4A747',
                                backgroundColor: openId === faq.id ? '#FAF6EF' : 'transparent'
                              }}
                            >
                              {faq.id}
                            </div>
                            
                            {/* Question text */}
                            <div className="flex-1 pt-2">
                              <h3 className="text-xl lg:text-2xl font-serif font-semibold leading-tight transition-colors"
                                style={{ color: openId === faq.id ? '#4B3B8C' : '#1a1a1a' }}
                              >
                                {faq.question}
                              </h3>
                            </div>

                            {/* Plus/Minus */}
                            <div className="flex-shrink-0 pt-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                style={{
                                  backgroundColor: openId === faq.id ? '#4B3B8C' : 'transparent',
                                  border: openId === faq.id ? 'none' : '1px solid #C4A747'
                                }}
                              >
                                <span className="text-xl font-light transition-colors"
                                  style={{ color: openId === faq.id ? '#FAF6EF' : '#C4A747' }}
                                >
                                  {openId === faq.id ? '−' : '+'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Answer */}
                        <div
                          className="ml-16 pr-12 overflow-hidden transition-all duration-500 ease-out"
                          style={{
                            maxHeight: openId === faq.id ? '500px' : '0',
                            opacity: openId === faq.id ? '1' : '0',
                            marginTop: openId === faq.id ? '1.5rem' : '0'
                          }}
                        >
                          <div className="border-l-2 pl-6 py-2"
                            style={{ borderColor: '#C4A747' }}
                          >
                            <div className="text-lg leading-relaxed font-serif" style={{ color: '#555555' }}>
                              {faq.answer}
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        {index < categoryFaqs.length - 1 && (
                          <div className="ml-16 mt-8 h-px"
                            style={{ background: 'linear-gradient(to right, #E8E4DD, transparent)' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Divider between categories */}
                  {categoryName !== Object.keys(groupedFaqs)[Object.keys(groupedFaqs).length - 1] && (
                    <div className="mt-16 h-px" style={{ background: 'linear-gradient(to right, #E8E4DD, transparent)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section - Didn't find your answer */}
        <section className="px-6 lg:px-8 py-20 lg:py-12">
          <div className="max-w-9xl mx-auto">
            <div
              className="rounded-3xl p-12 lg:p-12 relative overflow-hidden"
              style={{
                backgroundColor: '#F5F0E8',
                borderColor: '#E8E4DD',
              }}
            >
              {/* Background decorative elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
                  style={{ backgroundColor: '#4B3B8C', transform: 'translate(30%, -30%)' }}
                />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
                  style={{ backgroundColor: '#C4A747', transform: 'translate(-30%, 30%)' }}
                />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
                {/* Left - Text */}
                <div className="flex-1">
                  {/* Decorative elements */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-[1px]" style={{ backgroundColor: '#C4A747' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#C4A747' }}>
                      Still have questions?
                    </span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight" style={{ color: '#1a1a1a' }}>
                    Didn't find <span className="italic" style={{ color: '#4B3B8C' }}>your answer?</span>
                  </h3>
                  <div className="text-lg lg:text-xl mb-8 leading-relaxed font-serif" style={{ color: '#555555' }}>
                    <>
                      We're always improving CAT-<span className="text-[28px] font-light">20</span> and we'd love to hear from you.
                      <br />
                      Reach out and we'll get back to you as soon as we can.
                    </>
                  </div>
                  
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-base font-semibold hover:opacity-90 transition-all hover:scale-105"
                    style={{ backgroundColor: '#4B3B8C' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Us
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                {/* Right - Decorative illustration */}
                <div className="hidden lg:block flex-shrink-0">
                  <svg width="280" height="220" viewBox="0 0 280 220" fill="none" className="opacity-40">
                    {/* Chat bubble 1 */}
                    <ellipse cx="100" cy="90" rx="70" ry="50" stroke="#4B3B8C" strokeWidth="2" fill="none" opacity="0.4" />
                    <ellipse cx="180" cy="130" rx="55" ry="40" stroke="#4B3B8C" strokeWidth="2" fill="none" opacity="0.3" />
                    {/* Three dots in each bubble */}
                    <circle cx="75" cy="90" r="5" fill="#4B3B8C" opacity="0.4" />
                    <circle cx="100" cy="90" r="5" fill="#4B3B8C" opacity="0.4" />
                    <circle cx="125" cy="90" r="5" fill="#4B3B8C" opacity="0.4" />
                    <circle cx="160" cy="130" r="4" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="180" cy="130" r="4" fill="#4B3B8C" opacity="0.3" />
                    <circle cx="200" cy="130" r="4" fill="#4B3B8C" opacity="0.3" />
                    {/* Decorative wavy lines */}
                    <path d="M20 180 Q80 150 140 170 T260 140" stroke="#4B3B8C" strokeWidth="1.5" fill="none" opacity="0.25" />
                    <path d="M30 190 Q90 160 150 180 T250 150" stroke="#4B3B8C" strokeWidth="1.5" fill="none" opacity="0.2" />
                    <path d="M40 200 Q100 170 160 190 T240 160" stroke="#4B3B8C" strokeWidth="1.5" fill="none" opacity="0.15" />
                    {/* Small decorative dots */}
                    <circle cx="240" cy="40" r="8" fill="#4B3B8C" opacity="0.2" />
                    <circle cx="260" cy="70" r="5" fill="#C4A747" opacity="0.3" />
                    <circle cx="50" cy="50" r="4" fill="#C4A747" opacity="0.25" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
