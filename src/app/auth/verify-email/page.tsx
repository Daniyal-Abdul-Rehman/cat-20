'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, CheckCircle, ArrowRight, Sparkles, XCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, resendVerificationEmail, error, isLoading, clearError, user, success, clearSuccess } = useAuthStore();
  const { addToast } = useToastStore();
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  const token = searchParams.get('token');

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (token && !isVerified && !isVerifying) {
      handleVerifyEmail();
    }
  }, [token]);

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

  const handleVerifyEmail = async () => {
    if (!token) return;

    try {
      setIsVerifying(true);
      clearError();
      await verifyEmail(token);
      setIsVerified(true);
      addToast('success', 'Email verified successfully!');

      // Check if there's a guest assessment to assign
      const guestAssessmentId = localStorage.getItem('guest_assessment_id');

      // Redirect after 2 seconds
      setTimeout(() => {
        if (guestAssessmentId) {
          router.push(`/assessment/result?assessmentId=${guestAssessmentId}`);
        } else {
          router.push('/account');
        }
      }, 2000);
    } catch (error) {
      console.error('Verification error:', error);
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (!canResend) return;

    try {
      clearError();
      setCanResend(false);
      setCountdown(30); // 30 seconds cooldown
      
      // Show email input if user is not logged in
      if (!user?.email) {
        setShowEmailInput(true);
        setCanResend(true);
        setCountdown(0);
        return;
      }
      
      await resendVerificationEmail(user.email);
      addToast('success', 'Verification email resent!');
    } catch (error) {
      console.error('Resend email error:', error);
      setCanResend(true);
      setCountdown(0);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    try {
      clearError();
      setCanResend(false);
      setCountdown(30);
      await resendVerificationEmail(emailInput);
      addToast('success', 'Verification email resent!');
      setShowEmailInput(false);
      setEmailInput('');
    } catch (error) {
      console.error('Resend email error:', error);
      setCanResend(true);
      setCountdown(0);
    }
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  const handleGoToAccount = () => {
    router.push('/account');
  };

  // Loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: '#4B3B8C' }} />
            <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: '#1a1a1a' }}>
              Verifying your email...
            </h2>
            <p className="text-sm" style={{ color: '#666666' }}>
              Please wait while we verify your account.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Success state
  if (isVerified) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(75, 59, 140, 0.1)' }}>
              <CheckCircle className="w-10 h-10" style={{ color: '#4B3B8C' }} />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: '#1a1a1a' }}>
              Email Verified Successfully!
            </h2>
            <p className="text-lg mb-6" style={{ color: '#666666' }}>
              Your account has been verified. You can now access your account and start using CAT-20.
            </p>
            <button
              onClick={handleGoToAccount}
              className="w-full py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-white shadow-lg"
              style={{ backgroundColor: '#4B3B8C' }}
            >
              Go to Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && !token) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
              <XCircle className="w-10 h-10" style={{ color: '#dc2626' }} />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: '#1a1a1a' }}>
              Verification Failed
            </h2>
            <p className="text-lg mb-6" style={{ color: '#666666' }}>
              {error || 'Invalid or expired verification link.'}
            </p>
            <button
              onClick={handleGoToHome}
              className="w-full py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 border-2"
              style={{ 
                borderColor: '#D0D0D0',
                color: '#1a1a1a'
              }}
            >
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default state - email sent confirmation
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
                      
                      {showEmailInput ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                          <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C4A747]"
                            required
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="flex-1 py-2 rounded-lg font-medium text-white disabled:opacity-50"
                              style={{ backgroundColor: '#4B3B8C' }}
                            >
                              {isLoading ? 'Sending...' : 'Send'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowEmailInput(false);
                                setEmailInput('');
                              }}
                              className="px-4 py-2 rounded-lg font-medium border-2"
                              style={{ 
                                borderColor: '#D0D0D0',
                                color: '#1a1a1a'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
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
                      )}
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

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center" style={{ color: '#1a1a1a' }}>
        <Loader2 className="w-16 h-16 animate-spin" style={{ color: '#4B3B8C' }} />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}