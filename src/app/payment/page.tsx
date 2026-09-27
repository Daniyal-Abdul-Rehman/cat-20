'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Lock, CreditCard, ShieldCheck, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, checkAuth, tokens } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    const id = searchParams.get('assessmentId');
    setAssessmentId(id);
    
    // Debug authentication state
    console.log('Payment page - Auth state:', { isAuthenticated, user, tokens });
  }, [searchParams]);

  const handlePayment = async () => {
    if (!isAuthenticated || !user) {
      router.push(`/auth/signin?redirect=/payment&assessmentId=${assessmentId}`);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      const successUrl = `${window.location.origin}/payment/success`;
      const cancelUrl = `${window.location.origin}/payment/cancelled`;

      const token = tokens?.access?.token;

      if (!token) {
        console.error('Token not found, tokens:', tokens);
        console.error('User state:', { isAuthenticated, user });
        throw new Error('Authentication token not found. Please try logging in again.');
      }

      console.log('Creating checkout session with token:', token.substring(0, 20) + '...');
      console.log('User ID:', user._id);
      console.log('Is authenticated:', isAuthenticated);
      console.log('Assessment ID:', assessmentId);

      // Store assessment ID in localStorage before redirecting to Stripe
      if (assessmentId) {
        localStorage.setItem('pending_assessment_id', assessmentId);
        console.log('Stored assessment ID in localStorage:', assessmentId);
      }

      const response = await fetch(`${API_BASE_URL}/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: 10,
          assessmentId: assessmentId || '',
          successUrl,
          cancelUrl,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Payment error response:', errorData);
        throw new Error(errorData.message || 'Failed to create payment session');
      }

      const data = await response.json();
      console.log('Checkout session created:', data);
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initiate payment');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: '#4B3B8C' }} />
          <p style={{ color: '#1a1a1a' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navbar />

      <main className="flex-1">
        <section className="px-6 lg:px-8 py-24 lg:py-10 relative overflow-hidden">
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
                    <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#C4A747]">Premium Access</span>
                  </div>
                </div>

                <h1 className="text-5xl lg:text-5xl font-serif leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Unlock Your
                  <br />
                  <span className="italic" style={{ color: '#4B3B8C' }}>Full Cognitive Profile</span>
                </h1>

                <div className="flex items-start gap-4 text-lg lg:text-xl leading-relaxed" style={{ color: '#444444', fontFamily: 'Playfair Display, Georgia, serif' }}>
                  <div className="w-12 h-[1px] bg-[#C4A747] mt-3 hidden lg:block"></div>
                  <p className="max-w-lg">
                    Dive deeper into your cognitive pattern with premium insights about your relationships, career direction, and social communication style.
                  </p>
                </div>

                {/* Premium Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#C4A747] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Love & Relationships</h3>
                      <p className="text-sm text-gray-600">Discover how your cognitive pattern influences your romantic connections and friendships.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#C4A747] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Career & Direction</h3>
                      <p className="text-sm text-gray-600">Get personalized career guidance based on your natural strengths and preferences.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#C4A747] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Social & Communication</h3>
                      <p className="text-sm text-gray-600">Learn how to communicate effectively with different personality types.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Payment Card */}
              <div className="col-span-3 lg:pr-0 pr-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5" style={{ color: '#C4A747' }} />
                    <p className="text-sm font-semibold" style={{ color: '#C4A747' }}>
                      Premium Profile
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2" style={{ color: '#4B3B8C' }}>
                      $10
                    </div>
                    <p className="text-sm text-gray-600">One-time payment</p>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span>Secure Stripe payment</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <span>Encrypted transaction</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <span>All major cards accepted</span>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 mb-6">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Authentication State */}
                  {!isAuthenticated && (
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 mb-6">
                      <p className="text-sm text-yellow-800 mb-3">
                        Please sign in to purchase premium access
                      </p>
                      <button
                        onClick={() => router.push(`/auth/signin?redirect=/payment&assessmentId=${assessmentId}`)}
                        className="w-full py-2 rounded-lg font-semibold text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: '#4B3B8C' }}
                      >
                        Sign In to Continue
                      </button>
                    </div>
                  )}

                  {/* Payment Button */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing || !isAuthenticated}
                    className="w-full py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ backgroundColor: '#4B3B8C' }}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Pay $10 with Stripe
                      </>
                    )}
                  </button>

                  {/* Terms */}
                  <p className="mt-4 text-xs text-center text-gray-500">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
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