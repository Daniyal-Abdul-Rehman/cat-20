'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAssessmentStore } from '@/store/assessmentStore';
import { gsap } from 'gsap';

export default function Assessment() {
  const { 
    currentQuestion, 
    answers, 
    questions, 
    isLoading, 
    error, 
    setCurrentQuestion, 
    setAnswer, 
    completeAssessment, 
    fetchQuestions,
    submitAssessment 
  } = useAssessmentStore();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  
  const questionCardRef = useRef<HTMLDivElement>(null);
  const answerButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const currentQ = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleAnswer = (value: number) => {
    setSelectedValue(value);
    if (currentQ) {
      setAnswer(currentQ.id, value);
    }
  };

  const handleNext = async () => {
    if (selectedValue === null) return;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedValue(null);
    } else {
      await submitAssessment();
      window.location.href = '/results';
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(a => a.questionId === questions[currentQuestion - 1].id);
      setSelectedValue(previousAnswer?.value || null);
    }
  };

  // Animate question card and answer buttons when question changes
  useEffect(() => {
    if (questionCardRef.current) {
      // Animate question card
      gsap.fromTo(questionCardRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    // Animate answer buttons with stagger
    answerButtonsRef.current.forEach((btn, index) => {
      if (btn) {
        gsap.fromTo(btn,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, delay: 0.1 + (index * 0.05), ease: 'power2.out' }
        );
      }
    });
  }, [currentQuestion]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-t-4 rounded-full animate-spin mb-4" style={{ borderColor: '#E8E8E8', borderTopColor: '#4B3B8C' }}></div>
            <p style={{ color: '#666666' }}>Loading questions...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchQuestions}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: '#4B3B8C' }}
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p style={{ color: '#666666' }}>No questions available.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <div className="flex justify-between text-sm mb-3 font-semibold">
                <span style={{ color: '#666666' }}>Question {currentQuestion + 1} of {questions.length}</span>
                <span style={{ color: '#C4A747' }}>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full rounded-full h-2" style={{ backgroundColor: '#E8E8E8' }}>
                <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: '#C4A747' }}></div>
              </div>
            </div>

            <div ref={questionCardRef} className="rounded-lg border p-10 transition hover:shadow-lg" style={{ borderColor: '#E8E8E8' }}>
              <h2 className="text-2xl font-bold mb-8">{currentQ.text}</h2>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    ref={(el) => { answerButtonsRef.current[value - 1] = el; }}
                    onClick={() => handleAnswer(value)}
                    className={`w-full py-4 px-6 border-2 rounded-lg transition-all duration-200 ${
                      selectedValue === value
                        ? 'text-white shadow-lg'
                        : 'hover:border-gray-400'
                    }`}
                    style={{
                      borderColor: selectedValue === value ? '#4B3B8C' : '#E8E8E8',
                      backgroundColor: selectedValue === value ? '#4B3B8C' : '#FFFFFF',
                      color: selectedValue === value ? '#FFFFFF' : '#1a1a1a'
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-8 py-3 rounded-lg transition-all duration-200 font-medium ${
                    currentQuestion === 0
                      ? 'cursor-not-allowed'
                      : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: currentQuestion === 0 ? '#F5F5F5' : '#FFFFFF',
                    color: currentQuestion === 0 ? '#999999' : '#1a1a1a',
                    border: '2px solid #E8E8E8'
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedValue === null}
                  className={`px-8 py-3 rounded-lg transition-all duration-200 font-semibold ${
                    selectedValue === null ? 'cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: selectedValue === null ? '#F5F5F5' : '#4B3B8C',
                    color: selectedValue === null ? '#999999' : '#FFFFFF'
                  }}
                >
                  {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
