'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, tokens, checkAuth, refreshUserData } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    const session = searchParams.get('session_id');
    const assessmentIdParam = searchParams.get('assessmentId');
    
    // Try to get assessment ID from localStorage first (most reliable)
    const storedAssessmentId = localStorage.getItem('pending_assessment_id');
    
    setSessionId(session);
    
    // Use assessment ID from localStorage first, then URL, then null
    const finalAssessmentId = storedAssessmentId || assessmentIdParam || null;
    setAssessmentId(finalAssessmentId);
    
    console.log('Assessment ID sources:', {
      localStorage: storedAssessmentId,
      urlParam: assessmentIdParam,
      final: finalAssessmentId
    });
    
    // Update subscription status
    if (session && isAuthenticated && tokens?.access?.token) {
      updateSubscriptionStatus(session);
    } else {
      setIsLoading(false);
    }
  }, [searchParams, isAuthenticated, tokens, checkAuth]);

  const updateSubscriptionStatus = async (session_id: string) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      const token = tokens?.access?.token;

      if (!token) {
        throw new Error('Authentication token not found');
      }

      console.log('Updating subscription with session_id:', session_id);
      console.log('Assessment ID from localStorage:', localStorage.getItem('pending_assessment_id'));
      console.log('Assessment ID from state:', assessmentId);

      const response = await fetch(`${API_BASE_URL}/payment/update-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId: session_id }),
      });

      console.log('Update subscription response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update subscription error:', errorData);
        throw new Error(errorData.message || 'Failed to update subscription status');
      }

      // Try to get assessment ID from the response as backup
      const responseData = await response.json();
      console.log('Update subscription response data:', responseData);
      if (responseData.assessmentId && !assessmentId) {
        setAssessmentId(responseData.assessmentId);
      }

      // Refresh auth state to get updated subscription tier
      console.log('Refreshing user data...');
      await refreshUserData();
      console.log('User data refreshed. Current purchasedAssessments:', user?.purchasedAssessments);

      // Clean up localStorage after successful payment
      localStorage.removeItem('pending_assessment_id');
    } catch (error) {
      console.error('Subscription update error:', error);
      setUpdateError(error instanceof Error ? error.message : 'Failed to update subscription');
    } finally {
      setIsUpdating(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: '#4B3B8C' }} />
          <p style={{ color: '#1a1a1a' }}>
            {isUpdating ? 'Updating your subscription...' : 'Processing your payment...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
              Payment Successful!
            </h1>

            <p className="text-gray-600 mb-8">
              Your premium profile has been unlocked. You now have access to detailed insights about your cognitive pattern.
            </p>

            {updateError && (
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 mb-6">
                <p className="text-sm text-yellow-800">
                  {updateError}. Your payment was successful, but please contact support if premium access doesn't appear.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Link
                href="/premium"
                className="block w-full py-4 rounded-lg font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: '#4B3B8C' }}
              >
                View Your Premium Profile
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/account"
                className="block w-full py-4 rounded-lg font-semibold border-2 transition-colors hover:bg-gray-50"
                style={{ color: '#4B3B8C', borderColor: '#4B3B8C' }}
              >
                Go to Dashboard
              </Link>
            </div>

            {sessionId && (
              <p className="mt-6 text-xs text-gray-400">
                Session ID: {sessionId}
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}