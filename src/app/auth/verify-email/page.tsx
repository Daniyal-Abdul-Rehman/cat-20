'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';

export default function VerifyEmail() {
  const router = useRouter();
  const { sendVerificationEmail, error, isLoading, clearError, user, success, clearSuccess } = useAuthStore();
  const { addToast } = useToastStore();
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Show success toast when success state changes
  useEffect(() => {
    if (success) {
      addToast('success', success);
      clearSuccess();
    }
  }, [success, addToast, clearSuccess]);

  // Show error toast when error state changes
  useEffect(() => {
    if (error) {
      addToast('error', error);
    }
  }, [error, addToast]);

  // Countdown timer for resend delay
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!canResend) return;

    try {
      clearError();
      setCanResend(false);
      setCountdown(30); // 30 seconds cooldown
      await sendVerificationEmail();
    } catch (error) {
      console.error('Resend email error:', error);
      setCanResend(true);
      setCountdown(0);
    }
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-24 lg:py-32 relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/edited_image.png"
              alt=""
              className="absolute right-0 top-0 w-[85%] h-full object-cover"
            />
            {/* Fade overlay for text blending */}
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
              {/* Left Content */}
              <div className="col-span-4 lg:pl-0 pl-0">
                <div className="mb-8 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-[1px] bg-[#C4A747]"></div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#C4A747]">Check Your Inbox</span>
                  </div>
                </div>

                <h1 className="text-5xl lg:text-5xl font-serif leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  Verification
                  <br />
                  <span className="italic" style={{ color: '#4B3B8C' }}>email sent</span>.
                </h1>

                <div className="flex items-start gap-4 text-lg lg:text-xl leading-relaxed" style={{ color: '#444444', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  <div className="w-12 h-[1px] bg-[#C4A747] mt-3 hidden lg:block"></div>
                  <p className="max-w-lg">
                    We've sent a verification link to your email address.
                    <br />
                    <br />
                    Please check your inbox and click the link to verify your account and begin your journey of self-discovery.
                  </p>
                </div>
              </div>

              {/* Right Content - Confirmation Card */}
              <div className="col-span-3 lg:pr-0 pr-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(75, 59, 140, 0.1)' }}>
                      <Mail className="w-10 h-10" style={{ color: '#4B3B8C' }} />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5" style={{ color: '#C4A747' }} />
                      <p className="text-sm font-semibold" style={{ color: '#C4A747' }}>
                        Email Sent Successfully
                      </p>
                    </div>

                    <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#1a1a1a' }}>
                      Check your email
                    </h2>

                    <p className="text-sm mb-6" style={{ color: '#666666' }}>
                      We've sent a verification link to your email address. Please check your inbox (and spam folder) to verify your account.
                    </p>

                    {/* Error Display */}
                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 mb-4">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    {/* Resend Link */}
                    <div className="w-full border-t border-gray-200 pt-6 mt-2">
                      <p className="text-sm mb-3" style={{ color: '#666666' }}>
                        Didn't receive the email?
                      </p>
                      <button
                        onClick={handleResendEmail}
                        disabled={isLoading || !canResend}
                        className="text-sm font-semibold hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: '#4B3B8C' }}
                      >
                        {isLoading ? 'Sending...' : 
                         !canResend ? `Resend verification email (${countdown}s)` : 
                         'Resend verification email'}
                      </button>
                    </div>

                    {/* Back to Home */}
                    <div className="w-full border-t border-gray-200 pt-6 mt-6">
                      <button
                        onClick={handleGoToHome}
                        className="w-full py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 border-2"
                        style={{ 
                          borderColor: '#D0D0D0',
                          color: '#1a1a1a'
                        }}
                      >
                        Back to Home
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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