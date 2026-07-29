'use client';

import { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "What is CAT-20?",
      answer: "CAT-20 is a cognitive framework designed to help people discover the recurring mental patterns their minds naturally return to. Unlike traditional personality tests, it focuses on patterns rather than labels."
    },
    {
      question: "How long does the assessment take?",
      answer: "The CAT-20 assessment consists of 20 questions and typically takes about 10-15 minutes to complete."
    },
    {
      question: "Is CAT-20 a personality test?",
      answer: "No. CAT-20 is not a personality test. It's a cognitive framework that identifies recurring patterns in how you think and process information, rather than assigning you a fixed personality type."
    },
    {
      question: "How are the results calculated?",
      answer: "Your results are calculated based on your responses to the 20 assessment questions, which reveal your cognitive patterns across different clusters. The exact scoring algorithm will be implemented in future phases."
    },
    {
      question: "Can I retake the assessment?",
      answer: "Yes, you can retake the assessment at any time. Your cognitive patterns may evolve over time, so retaking can provide updated insights."
    },
    {
      question: "Is CAT-20 based on scientific research?",
      answer: "CAT-20 is built on principles from cognitive science and psychology. The framework is designed to be empirically grounded while remaining accessible and practical."
    },
    {
      question: "Will my results be saved?",
      answer: "Currently, results are not saved. In future phases, we plan to introduce user accounts and the ability to save and compare your results over time."
    },
    {
      question: "Is CAT-20 free?",
      answer: "Yes, the basic CAT-20 assessment is free. Future premium features may be introduced, but the core assessment will remain accessible."
    }
  ];

  const toggleFAQ = (index: number) => {
    const newIndex = openIndex === index ? null : index;
    
    // Animate closing the previously open item
    if (openIndex !== null && contentRefs.current[openIndex]) {
      gsap.to(contentRefs.current[openIndex], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    // Animate opening the new item
    if (newIndex !== null && contentRefs.current[newIndex]) {
      gsap.fromTo(contentRefs.current[newIndex],
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }

    setOpenIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block border px-4 py-2 text-sm font-semibold uppercase tracking-widest" style={{ borderColor: '#C4A747', color: '#C4A747' }}>
                Got Questions?
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg" style={{ color: '#666666' }}>
                Common questions about CAT-20
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border transition hover:shadow-lg" style={{ borderColor: '#E8E8E8' }}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center font-medium cursor-pointer p-6 text-left"
                    style={{ color: '#1a1a1a' }}
                  >
                    <span className="text-lg">{faq.question}</span>
                    <span
                      className={`transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      style={{ color: '#C4A747' }}
                    >
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </button>
                  <div
                    ref={(el) => { contentRefs.current[index] = el; }}
                    className="overflow-hidden"
                    style={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                  >
                    <div className="mt-4 px-6 pb-6" style={{ color: '#666666' }}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
